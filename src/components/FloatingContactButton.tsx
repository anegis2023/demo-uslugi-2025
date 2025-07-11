import { useState, useEffect } from "react";
import { Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Close popup when ESC key is pressed
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  // Prevent body scrolling when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

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

      {/* Popup overlay */}
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
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] flex flex-col">
            {/* Popup header */}
            <div className="flex flex-col items-center p-4 border-b relative">
              <h2 className="text-2xl font-bold text-center mx-auto">Wypełnij fomularz. Oddzwonimy w ciągu 30 minut.</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                aria-label="Zamknij"
                className="absolute right-2 top-2"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            {/* Popup content */}
            <div className="p-4 flex-grow overflow-auto">
              <iframe 
                src="https://assets-eur.mkt.dynamics.com/1e5b64c1-c132-4237-9477-532bcddae3fd/digitalassets/standaloneforms/9c07ac8d-275e-f011-bec2-7c1e5237d071" 
                width="100%" 
                height="600px" 
                style={{ border: 'none' }}
                title="Formularz kontaktowy"
                sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-top-navigation"
              >
                <p>Twoja przeglądarka nie obsługuje iframe. Prosimy o kontakt telefoniczny.</p>
              </iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingContactButton;
