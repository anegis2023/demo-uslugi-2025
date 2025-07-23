
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Paperclip, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { validateNIP } from "@/utils/nipValidation";

// Declare global interface for Dynamics 365
declare global {
  interface Window {
    d365mktformcapture?: {
      serializeForm: (form: HTMLFormElement, mappings: any[]) => any;
      submitForm: (config: any, payload: any) => Promise<any>;
    };
  }
}

interface ServiceContactFormProps {
  serviceName: string;
}

const ServiceContactForm = ({ serviceName }: ServiceContactFormProps) => {
  const [formData, setFormData] = useState({
    clientType: "firma",
    company: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nip: "",
    industry: "",
    serviceInterest: serviceName,
    message: "",
    acceptTerms: false,
    marketingConsent: false,
    contactSource: "website",
  });
  const [nipError, setNipError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load the Dynamics 365 form capture script
    const script = document.createElement('script');
    script.src = 'https://cxppusa1formui01cdnsa01-endpoint.azureedge.net/eur/FormCapture/FormCapture.bundle.js';
    document.head.appendChild(script);

    script.onload = () => {
      console.log('Dynamics 365 script loaded successfully');
    };

    script.onerror = () => {
      console.error('Failed to load Dynamics 365 script');
    };

    return () => {
      // Cleanup script on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const submitToDynamics365 = async () => {
    console.log('Starting Dynamics 365 submission...');
    
    if (!window.d365mktformcapture) {
      console.error('Dynamics 365 form capture not loaded');
      toast({
        title: "Błąd",
        description: "Skrypt Dynamics 365 nie został załadowany. Spróbuj odświeżyć stronę.",
        variant: "destructive",
      });
      return false;
    }

    const form = document.getElementById('service-contact-form') as HTMLFormElement;
    if (!form) {
      console.error('Form not found');
      return false;
    }

    const mappings = [
      {
        FormFieldName: "nip",
        DataverseFieldName: "an_an_taxnumber",
      },
      {
        FormFieldName: "company",
        DataverseFieldName: "an_an_companyname",
      },
      {
        FormFieldName: "firstName",
        DataverseFieldName: "firstname",
      },
      {
        FormFieldName: "lastName",
        DataverseFieldName: "lastname",
      },
      {
        FormFieldName: "serviceInterest",
        DataverseFieldName: "jobtitle",
      },
      {
        FormFieldName: "email",
        DataverseFieldName: "emailaddress1",
      },
      {
        FormFieldName: "phone",
        DataverseFieldName: "mobilephone",
      },
      {
        FormFieldName: "marketingConsent",
        DataverseFieldName: "msdynmkt_purposeid;channels;optinwhenchecked",
        DataverseFieldValue: "7744ce7e-e68a-ef11-ac21-000d3ab16d95;Email,Text;true",
      },
      {
        FormFieldName: "acceptTerms",
        DataverseFieldName: "an_privacypolicyaccepted",
        DataverseFieldValue: [
          { FormValue: "true", DataverseValue: "1" },
        ],
      },
      {
        FormFieldName: "acceptTerms",
        DataverseFieldName: "an_roadshowtermsandconditionsaccepted",
        DataverseFieldValue: [
          { FormValue: "true", DataverseValue: "1" },
        ],
      },
      {
        FormFieldName: "industry",
        DataverseFieldName: "cr8b4_bazawiedzy",
      },
      {
        FormFieldName: "contactSource",
        DataverseFieldName: "an_contactsource",
        DataverseFieldValue: [
          { FormValue: "website", DataverseValue: "188040003" }, // FORMULARZ WWW
        ],
      },
      {
        FormFieldName: "message",
        DataverseFieldName: "description",
      },
    ];

    try {
      console.log('Form data being submitted:', formData);
      const serializedForm = window.d365mktformcapture.serializeForm(form, mappings);
      console.log('Serialized form:', serializedForm);
      
      const payload = serializedForm.SerializedForm.build();
      console.log('Payload to be sent:', payload);

      const captureConfig = {
        FormId: "219e852c-dc59-f011-bec2-0022489c8d24",
        FormApiUrl: "https://public-eur.mkt.dynamics.com/api/v1.0/orgs/1e5b64c1-c132-4237-9477-532bcddae3fd/landingpageforms"
      };
      
      console.log('Submitting to Dynamics 365 with config:', captureConfig);
      await window.d365mktformcapture.submitForm(captureConfig, payload);
      
      console.log('Successfully submitted to Dynamics 365');
      return true;
    } catch (error) {
      console.error('Error submitting to Dynamics 365:', error);
      return false;
    }
  };

  const handleNipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      handleInputChange("nip", value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    console.log('Form submission started');
    
    if (formData.clientType === "firma" && formData.nip && !validateNIP(formData.nip)) {
      setNipError("Wprowadzony NIP jest nieprawidłowy. Sprawdź poprawność numeru.");
      setIsSubmitting(false);
      return;
    }

    if (!formData.acceptTerms) {
      toast({
        title: "Błąd",
        description: "Musisz zaakceptować regulamin aby wysłać formularz.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    
    console.log("Dane formularza:", formData);
    
    // Submit to Dynamics 365
    const success = await submitToDynamics365();
    
    if (success) {
      toast({
        title: "Formularz wysłany",
        description: "Dziękujemy za przesłanie formularza. Skontaktujemy się z Państwem wkrótce.",
      });
    } else {
      toast({
        title: "Błąd",
        description: "Wystąpił problem podczas wysyłania formularza. Spróbuj ponownie.",
        variant: "destructive",
      });
    }
    
    setIsSubmitting(false);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === "nip" && nipError) {
      setNipError("");
    }
  };

  const handleClientTypeChange = (value: string) => {
    setFormData(prev => ({ 
      ...prev, 
      clientType: value,
      nip: value === "osoba" ? "" : prev.nip
    }));
    setNipError("");
  };

  const handleNipBlur = () => {
    if (formData.clientType === "firma" && formData.nip && !validateNIP(formData.nip)) {
      setNipError("Wprowadzony NIP jest nieprawidłowy. Sprawdź poprawność numeru.");
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/20">
        <CardTitle className="text-2xl font-bold text-center">
          Uzupełnij formularz
        </CardTitle>
        <p className="text-sm text-muted-foreground text-center">
          Podaj nam więcej szczegółów, co pomoże nam sprawnie odpowiedzieć na Twoje zapytanie
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <form id="service-contact-form" onSubmit={handleSubmit} className="space-y-6">
          {/* Hidden fields for Dynamics 365 */}
          <input type="hidden" name="contactSource" value={formData.contactSource} />
          
          {/* Client Type Selection */}
          <div>
            <RadioGroup
              defaultValue="firma"
              onValueChange={handleClientTypeChange}
              className="flex space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="firma" id="firma" />
                <Label htmlFor="firma">Firma/instytucja</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="osoba" id="osoba" />
                <Label htmlFor="osoba">Osoba fizyczna</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.clientType === "firma" && (
              <div className="md:col-span-2">
                <Label htmlFor="company">* firma/organizacja</Label>
                <Input
                  id="company"
                  name="company"
                  placeholder="Nazwa firmy"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  required
                />
              </div>
            )}
            <div>
              <Label htmlFor="firstName">* Imię</Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="Imię"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">* Nazwisko</Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Nazwisko"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">* e-mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">telefon</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="+48505505505"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.clientType === "firma" && (
              <div>
                <Label htmlFor="nip">* NIP</Label>
                <Input
                  id="nip"
                  name="nip"
                  placeholder="NIP"
                  value={formData.nip}
                  onChange={handleNipChange}
                  onBlur={handleNipBlur}
                  required
                  maxLength={10}
                  className={nipError ? "border-red-500" : ""}
                />
                {nipError && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{nipError}</AlertDescription>
                  </Alert>
                )}
              </div>
            )}
            <div className={formData.clientType === "osoba" ? "md:col-span-2" : ""}>
              <Label htmlFor="serviceInterest">* jaka usługa Cię interesuje?</Label>
              <Input
                id="serviceInterest"
                name="serviceInterest"
                value={formData.serviceInterest}
                onChange={(e) => handleInputChange("serviceInterest", e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="industry">* w jakiej branży działasz?</Label>
            <Select onValueChange={(value) => handleInputChange("industry", value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Wybierz branżę" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="produkcja">Produkcja</SelectItem>
                <SelectItem value="handel">Handel</SelectItem>
                <SelectItem value="uslugi">Usługi</SelectItem>
                <SelectItem value="budownictwo">Budownictwo</SelectItem>
                <SelectItem value="it">IT/Technologie</SelectItem>
                <SelectItem value="medycyna">Medycyna</SelectItem>
                <SelectItem value="edukacja">Edukacja</SelectItem>
                <SelectItem value="finanse">Finanse</SelectItem>
                <SelectItem value="inne">Inne</SelectItem>
              </SelectContent>
            </Select>
            <input type="hidden" name="industry" value={formData.industry} />
          </div>

          {/* File Upload */}
          <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-6 text-center">
            <Paperclip className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <div className="text-sm text-muted-foreground mb-2">
              <Button variant="link" className="p-0 h-auto font-normal">
                Dodaj załącznik
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Możesz dodać pliki z rozszerzeniami PDF, JPG, PNG oraz dokumenty
              programów MS Word i Excel o wadze do 5 MB
            </p>
          </div>

          {/* Message */}
          <div>
            <Label htmlFor="message">
              podaj szczegółowe informacje na temat Twojego zapytania
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Opisz szczegółowo swoje potrzeby..."
              rows={6}
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
            />
          </div>

          {/* Checkboxes */}
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="acceptTerms"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
                required
              />
              <div className="space-y-1 leading-none">
                <Label htmlFor="acceptTerms" className="text-sm font-normal cursor-pointer">
                  Akceptuję regulamin*
                </Label>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Administratorem Państwa danych osobowych jest Impuls Services Sp. z o.o. z siedzibą Powstańców Śląskich 17 D, 53-332 Wrocław. Twoje dane będą przetwarzane wyłącznie w celu obsługi Twojego żądania i tak długo, jak będzie to konieczne do obsługi Twojego żądania. Masz prawo dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, sprzeciwu wobec przetwarzania i przenoszenia danych. Możesz również złożyć skargę do organu nadzorczego. Podanie danych jest opcjonalne, ale niezbędne do obsługi Państwa żądania. Podstawa prawna: art. 6 lit. b) (1) RODO - przetwarzanie jest niezbędne do podjęcia działań na żądanie osoby, której dane dotyczą, przed zawarciem umowy. W razie jakichkolwiek pytań prosimy o kontakt pod adresem: rodo@impelgroup.com.*
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="marketingConsent"
                name="marketingConsent"
                checked={formData.marketingConsent}
                onCheckedChange={(checked) => handleInputChange("marketingConsent", checked as boolean)}
              />
              <div className="space-y-1 leading-none">
                <Label htmlFor="marketingConsent" className="text-sm font-normal cursor-pointer">
                  Wyrażam zgodę na otrzymywanie informacji handlowych
                </Label>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Wyrażam zgodę, o której mowa w art. 398 ust. 1 i 2 ustawy z dnia 12 lipca 2024 r. - Prawo o łączności elektronicznej, aby IMPEL PRO sp. z o.o. na przesyłanie mi informacji handlowych (m.in. ofert promujących usługi i towary), w tym marketingu bezpośredniego - na adres e-mail i numer telefonu komórkowego podany przeze mnie w przesłanym formularzu. W ramach udzielonej zgody IMPEL PRO sp. z o.o. może wykorzystywać automatyczne systemy wywołujące lub telekomunikacyjne urządzenia końcowe w rozumieniu ww. ustawy do przesyłania informacji handlowych, w tym marketingu bezpośredniego.
                </p>
              </div>
            </div>
          </div>

          {/* Required Fields Note */}
          <p className="text-sm text-muted-foreground">
            * pola wymagane
          </p>

          <Button 
            type="submit" 
            className="w-full bg-accent-red hover:bg-accent-red/90 text-white py-3"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Wysyłanie..." : "Wyślij zapytanie"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ServiceContactForm;
