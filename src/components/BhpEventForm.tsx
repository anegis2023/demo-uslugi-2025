import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Function to validate Polish NIP (VAT ID) using the official algorithm
const validatePolishNIP = (nip: string): boolean => {
  // Remove any non-digit characters
  const cleanNIP = nip.replace(/[^0-9]/g, '');
  
  // Check if it's exactly 10 digits
  if (cleanNIP.length !== 10) {
    return false;
  }
  
  // Weights used in the NIP validation algorithm
  const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  
  // Calculate the checksum
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanNIP.charAt(i)) * weights[i];
  }
  
  // Calculate the check digit
  const checkDigit = sum % 11;
  
  // If checkDigit is 10, the NIP is invalid
  if (checkDigit === 10) {
    return false;
  }
  
  // Compare the calculated check digit with the last digit of the NIP
  return checkDigit === parseInt(cleanNIP.charAt(9));
};

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
  
  // State for validation errors
  const [nipError, setNipError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Special validation for NIP (Polish VAT ID)
    if (name === 'nip') {
      // Only allow digits and limit to 10 characters
      const sanitizedValue = value.replace(/[^0-9]/g, '').slice(0, 10);
      
      // Update form data
      setFormData(prev => ({
        ...prev,
        [name]: sanitizedValue
      }));
      
      // Validate NIP if it's 10 digits long
      if (sanitizedValue.length === 10) {
        if (!validatePolishNIP(sanitizedValue)) {
          setNipError('Nieprawidłowy NIP. Sprawdź poprawność numeru.');
        } else {
          setNipError(null);
        }
      } else {
        setNipError(null);
      }
    } 
    // Special validation for phone (Polish cell phone number)
    else if (name === 'phone') {
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
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let hasErrors = false;
    
    // Validate NIP before submission
    if (formData.nip.length === 10 && !validatePolishNIP(formData.nip)) {
      setNipError('Nieprawidłowy NIP. Sprawdź poprawność numeru.');
      hasErrors = true;
    }
    
    // Validate phone number before submission
    if (formData.phone.length > 0 && !/^\+48[0-9]{9}$/.test(formData.phone)) {
      setPhoneError('Nieprawidłowy format numeru telefonu. Powinien być w formacie +48 i 9 cyfr.');
      hasErrors = true;
    }
    
    if (hasErrors) {
      e.stopPropagation(); // Prevent form submission
      return false;
    }
    
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
            maxLength={10}
            pattern="[0-9]{10}"
            title="NIP musi składać się z 10 cyfr i być poprawny według algorytmu walidacji"
            required
            className={nipError ? 'border-red-500' : ''}
          />
          {nipError && (
            <div className="text-red-500 text-sm mt-1">{nipError}</div>
          )}
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
            placeholder="+48505000000"
            pattern="\+48[0-9]{9}"
            title="Numer telefonu musi być w formacie +48 i 9 cyfr"
            required
            className={phoneError ? 'border-red-500' : ''}
          />
          {phoneError && (
            <div className="text-red-500 text-sm mt-1">{phoneError}</div>
          )}
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
