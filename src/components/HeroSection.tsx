
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { IframePopup } from "@/components/ui/iframe-popup";

const HeroSection = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  const handleConsultationClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/images/header-hearo.jpg?v=2025')` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Profesjonalne usługi
              <span className="block text-accent-red-foreground">dla Twojego biznesu</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl">
              To jest strona demonstracyjna prezentująca możliwości integracji Dynamics 365. 
              Odkryj jak nowoczesne rozwiązania CRM mogą wspierać Twój biznes!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-accent-red hover:bg-accent-red/90 text-white font-semibold px-8 py-4 text-lg shadow-lg border-0"
                onClick={() => {
                  const servicesSection = document.getElementById('services');
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: 'smooth' });
                    // Focus on the services heading for better accessibility
                    const servicesHeading = document.querySelector('#services h2');
                    if (servicesHeading instanceof HTMLElement) {
                      setTimeout(() => servicesHeading.focus(), 800);
                    }
                  }
                }}
              >
                Poznaj usługi
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white bg-white text-primary hover:bg-gray-100 hover:text-primary font-semibold px-8 py-4 text-lg shadow-lg"
                onClick={handleConsultationClick}
              >
                ZAREJESTRUJ SIĘ NA SPOTKANIE ONLINE
              </Button>
            </div>
          </div>

          {/* Stats or features section */}
          <div className="hidden lg:block animate-slide-in-right">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div className="text-white">
                  <div className="text-3xl font-bold mb-2">500+</div>
                  <div className="text-white/80">Zadowolonych klientów</div>
                </div>
                <div className="text-white">
                  <div className="text-3xl font-bold mb-2">15+</div>
                  <div className="text-white/80">lat doświadczenia</div>
                </div>
                <div className="text-white">
                  <div className="text-3xl font-bold mb-2">24/7</div>
                  <div className="text-white/80">Wsparcie</div>
                </div>
                <div className="text-white">
                  <div className="text-3xl font-bold mb-2">99%</div>
                  <div className="text-white/80">Satysfakcji</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      {/* Iframe Popup */}
      <IframePopup 
        isOpen={isPopupOpen} 
        onClose={handleClosePopup} 
        url="https://assets-eur.mkt.dynamics.com/1e5b64c1-c132-4237-9477-532bcddae3fd/digitalassets/standaloneforms/5bc415a8-d25b-f011-bec2-6045bde0a344" 
      />
    </section>
  );
};

export default HeroSection;
