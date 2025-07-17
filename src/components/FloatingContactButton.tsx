import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Phone, X } from 'lucide-react';

// Add D365 Form Capture type definition
declare global {
  interface Window {
    d365mktformcapture?: {
      serializeForm: (form: HTMLFormElement, mappings: any[]) => any;
      submitForm: (config: any, payload: any) => Promise<any>;
    };
  }
}

const FloatingContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    phoneNumber: '+48'
  });
  
  // Load D365 Form Capture script
  useEffect(() => {
    // Skip if script is already loaded
    if (window.d365mktformcapture || document.getElementById('d365-form-capture-script')) {
      setScriptLoaded(true);
      return;
    }
    
    const script = document.createElement('script');
    script.id = 'd365-form-capture-script';
    script.src = 'https://mktdplp102cdn.azureedge.net/public/latest/js/form-loader.js?v=' + new Date().getTime();
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      console.log('D365 Form Capture script loaded successfully');
      setScriptLoaded(true);
    };
    
    script.onerror = () => {
      console.error('Failed to load D365 Form Capture script');
      setScriptError(true);
    };
    
    document.head.appendChild(script);
    
    return () => {
      // Cleanup if component unmounts during loading
      if (document.getElementById('d365-form-capture-script')) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // Close popup when ESC key is pressed
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Special validation for phone number (Polish cell phone number)
    if (name === 'phoneNumber') {
      // Handle Polish phone number format (+48XXXXXXXXX)
      let sanitizedValue = value;
      
      // If the user is typing and hasn't added +48 yet, add it for them
      if (!value.startsWith('+48') && value.length > 0 && !value.includes('+')) {
        // If they're entering just digits, prepend +48
        if (/^[0-9]+$/.test(value)) {
          sanitizedValue = '+48' + value;
        }
      }
      
      // Ensure only valid characters for phone number (+, digits)
      sanitizedValue = sanitizedValue.replace(/[^\+0-9]/g, '');
      
      // Limit to +48 plus 9 digits (total 12 characters)
      if (sanitizedValue.startsWith('+48')) {
        const digitsAfterPrefix = sanitizedValue.substring(3);
        if (digitsAfterPrefix.length > 9) {
          sanitizedValue = '+48' + digitsAfterPrefix.slice(0, 9);
        }
      } else if (sanitizedValue.startsWith('+')) {
        // If they're typing a different prefix, limit appropriately
        if (sanitizedValue.length > 12) {
          sanitizedValue = sanitizedValue.slice(0, 12);
        }
      }
      
      setFormData(prev => ({
        ...prev,
        [name]: sanitizedValue
      }));
      
      // Validate phone number format
      if (sanitizedValue.length > 0) {
        // Check if it's in the correct format: +48 followed by 9 digits
        const isValidFormat = /^\+48[0-9]{9}$/.test(sanitizedValue);
        
        if (!isValidFormat) {
          if (sanitizedValue.length >= 12) {
            // If they've entered enough characters but format is wrong
            setPhoneError('Nieprawidłowy format numeru telefonu. Powinien być w formacie +48 i 9 cyfr.');
          } else if (sanitizedValue.length > 3) {
            // If they're still typing but format is wrong
            setPhoneError('Numer telefonu powinien być w formacie +48 i 9 cyfr.');
          } else {
            setPhoneError(null);
          }
        } else {
          setPhoneError(null);
        }
      } else {
        setPhoneError(null);
      }
    } else {
      // For other fields, just update the value
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Prevent body scrolling when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      // Reset form submitted state when closing the popup
      setFormSubmitted(false);
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Load D365 Form Capture script when popup is opened
  useEffect(() => {
    if (isOpen && !formSubmitted) {
      // Create a script element for the D365 Form Capture library
      const script = document.createElement('script');
      script.src = 'https://cxppusa1formui01cdnsa01-endpoint.azureedge.net/eur/FormCapture/FormCapture.bundle.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, [isOpen, formSubmitted]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate phone number before submission
    if (formData.phoneNumber.length > 0 && !/^\+48[0-9]{9}$/.test(formData.phoneNumber)) {
      setPhoneError('Nieprawidłowy format numeru telefonu. Powinien być w formacie +48 i 9 cyfr.');
      return; // Prevent submission if phone number is invalid
    }
    
    const form = e.currentTarget;
    
    // Check if D365 Form Capture API is loaded
    if (!scriptLoaded || scriptError || typeof window.d365mktformcapture === 'undefined') {
      console.error('D365 Form Capture API not loaded or error occurred');
      alert('Wystąpił błąd podczas ładowania formularza. Prosimy odświeżyć stronę i spróbować ponownie.');
      return;
    }

    // Define field mappings for D365
    const mappings = [
      { FormFieldName: "firstName", DataverseFieldName: "firstname" },
      { FormFieldName: "lastName", DataverseFieldName: "lastname" },
      { FormFieldName: "companyName", DataverseFieldName: "an_an_companyname" },
      { FormFieldName: "phoneNumber", DataverseFieldName: "mobilephone" },
      // Static values for bazaWiedzy and sourceFile as requested
      { FormFieldName: "bazaWiedzy", DataverseFieldName: "cr8b4_bazawiedzy", StaticValue: "DEMO-CALL-ME-BACK" },
      { FormFieldName: "sourceFile", DataverseFieldName: "an_sourcefile", StaticValue: "DEMO-IMPEL" },
    ];

    try {
      // Serialize form data using D365 Form Capture API
      const serializedForm = window.d365mktformcapture.serializeForm(form, mappings);
      const payload = serializedForm.SerializedForm.build();
      
      // Log the payload for debugging
      console.log('D365 payload:', payload);

      // Configure D365 Form Capture submission
      const captureConfig = {
        FormId: "9c07ac8d-275e-f011-bec2-7c1e5237d071",
        FormApiUrl: "https://public-eur.mkt.dynamics.com/api/v1.0/orgs/1e5b64c1-c132-4237-9477-532bcddae3fd/landingpageforms"
      };

      // Submit form to D365
      window.d365mktformcapture.submitForm(captureConfig, payload)
        .then(() => {
          console.log('Form submitted successfully to D365');
          setFormSubmitted(true);
        })
        .catch(error => {
          console.error('Form submission error:', error);
          alert('Wystąpił błąd podczas wysyłania formularza. Prosimy spróbować ponownie.');
        });
    } catch (error) {
      console.error('Error processing form:', error);
      alert('Wystąpił błąd podczas przetwarzania formularza. Prosimy spróbować ponownie.');
    }
  };

  return (
    <>
      {/* Floating button - positioned on the right side */}
      <div className="fixed bottom-24 right-8 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-16 w-16 rounded-full bg-accent-red hover:bg-accent-red/90 shadow-lg flex items-center justify-center"
          aria-label="Skontaktuj się telefonicznie"
        >
          <Phone className="h-8 w-8 text-white" />
        </Button>
      </div>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[100] flex items-start justify-center p-4 pt-16"
          onClick={(e) => {
            // Close popup when clicking outside the form area
            if (e.target === e.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Popup header */}
            <div className="flex flex-col items-center p-6 border-b relative bg-gradient-to-r from-primary/10 to-primary/5">
              <h2 className="text-2xl font-bold text-center mx-auto text-primary">Wypełnij formularz</h2>
              <p className="text-gray-600 text-center mt-2">Oddzwonimy w ciągu 30 minut</p>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                aria-label="Zamknij"
                className="absolute right-2 top-2 hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            {/* Popup content */}
            <div className="p-6 overflow-y-auto">
              <div className="form-container">
                {!formSubmitted ? (
                  <form id="contactForm" onSubmit={handleSubmit} className="space-y-4">
                    <div className="form-group">
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">Imię <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        id="firstName" 
                        name="firstName" 
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" 
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Jan"
                        required 
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Nazwisko <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        id="lastName" 
                        name="lastName" 
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" 
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Kowalski"
                        required 
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">Nazwa firmy</label>
                      <input 
                        type="text" 
                        id="companyName" 
                        name="companyName" 
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" 
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="Impel Group"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Telefon komórkowy <span className="text-red-500">*</span></label>
                      <input 
                        type="tel" 
                        id="phoneNumber" 
                        name="phoneNumber" 
                        className={`w-full p-3 border ${phoneError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 ${phoneError ? 'focus:ring-red-300 focus:border-red-500' : 'focus:ring-primary/30 focus:border-primary'} transition-all`}
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="+48 500 000 000"
                        required 
                      />
                      {phoneError && (
                        <p className="text-red-500 text-sm mt-1">{phoneError}</p>
                      )}
                    </div>
                    
                    <input type="hidden" id="bazaWiedzy" name="bazaWiedzy" value="DEMO-CALL-ME-BACK" />
                    <input type="hidden" id="sourceFile" name="sourceFile" value="DEMO-IMPEL" />
                    
                    <div className="mt-8">
                      <button 
                        type="submit" 
                        className="w-full bg-primary text-white py-3 px-6 rounded-md hover:bg-primary/90 transition-colors font-medium text-lg shadow-md hover:shadow-lg"
                      >
                        WYŚLIJ ZGŁOSZENIE
                      </button>
                    </div>
                  </form>
                ) : (
                  <div id="thank-you-message" className="text-center py-8 px-4">
                    <div className="mb-6">
                      <svg className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-3">Dziękujemy za wypełnienie formularza</h3>
                    <p className="text-gray-600 mb-8 text-lg">Nasz zespół skontaktuje się z Tobą w ciągu 30 minut.</p>
                    <button 
                      onClick={() => setIsOpen(false)}
                      className="bg-primary text-white py-3 px-6 rounded-md hover:bg-primary/90 transition-colors font-medium shadow-md hover:shadow-lg"
                    >
                      Zamknij
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingContactButton;
