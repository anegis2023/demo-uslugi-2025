import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const BhpEventForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nip: '',
    companyName: '',
    firstName: '',
    lastName: '',
    jobTitle: '',
    email: '',
    phone: '',
    marketingConsent: false,
    privacyPolicy: false,
    eventForm: 'Szkolenie BHP dla Managerów',
    sourceFile: window.location.href
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission is handled by the D365 Form Capture script
    // The script is added in the component's useEffect
  };

  return (
    <form id="bhp-event-registration-form" onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="nip">NIP *</Label>
          <Input 
            id="nip" 
            name="nip"
            value={formData.nip}
            onChange={handleChange}
            placeholder="Podaj NIP firmy"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="companyName">Nazwa firmy *</Label>
          <Input 
            id="companyName" 
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Podaj nazwę firmy"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">Imię *</Label>
            <Input 
              id="firstName" 
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Podaj imię"
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName">Nazwisko *</Label>
            <Input 
              id="lastName" 
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Podaj nazwisko"
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="jobTitle">Stanowisko *</Label>
          <Input 
            id="jobTitle" 
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            placeholder="Podaj stanowisko"
            required
          />
        </div>

        <div>
          <Label htmlFor="email">Email *</Label>
          <Input 
            id="email" 
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Podaj adres email"
            required
          />
        </div>

        <div>
          <Label htmlFor="phone">Telefon *</Label>
          <Input 
            id="phone" 
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Podaj numer telefonu"
            required
          />
        </div>

        <div className="flex items-start space-x-2 mb-2">
          <input
            type="checkbox"
            id="marketingConsent"
            name="marketingConsent"
            checked={formData.marketingConsent}
            onChange={(e) => handleCheckboxChange('marketingConsent', e.target.checked)}
            className="h-4 w-4 mt-1 rounded border-gray-300 text-primary focus:ring-primary"
            required
          />
          <label htmlFor="marketingConsent" className="text-sm leading-tight cursor-pointer">
            Wyrażam zgodę na otrzymywanie informacji marketingowych drogą elektroniczną (email, SMS) *
          </label>
        </div>

        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            id="privacyPolicy"
            name="privacyPolicy"
            checked={formData.privacyPolicy}
            onChange={(e) => handleCheckboxChange('privacyPolicy', e.target.checked)}
            className="h-4 w-4 mt-1 rounded border-gray-300 text-primary focus:ring-primary"
            required
          />
          <label htmlFor="privacyPolicy" className="text-sm leading-tight cursor-pointer">
            Zapoznałem/am się z <a href="/privacy-policy" className="text-primary underline" target="_blank">polityką prywatności</a> i wyrażam zgodę na przetwarzanie moich danych osobowych *
          </label>
        </div>

        <input type="hidden" id="eventForm" name="eventForm" value={formData.eventForm} />
        <input type="hidden" id="sourceFile" name="sourceFile" value={formData.sourceFile} />
      </div>

      <Button type="submit" className="w-full bg-accent-red hover:bg-accent-red/90">
        Wyślij zgłoszenie
      </Button>
    </form>
  );
};

export default BhpEventForm;
