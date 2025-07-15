import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceContactForm from "@/components/ServiceContactForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Sparkles, Briefcase, ChefHat, Wrench, Factory, Heart, Users } from "lucide-react";

const ServiceDetail = () => {
  const { serviceId } = useParams();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = {
    "ochrona": {
      title: "Usługi ochrony",
      icon: Shield,
      description: "Zapewniamy kompleksowe rozwiązania ochrony dla Twojej firmy, obiektów i wydarzeń. Nasze usługi obejmują profesjonalną ochronę fizyczną, monitoring oraz systemy kontroli dostępu.",
      details: [
        "Monitoring 24/7 z wykorzystaniem nowoczesnych systemów",
        "Wykwalifikowany personel ochrony z licencjami",
        "Systemy kontroli dostępu i identyfikacji",
        "Kompleksowa ocena ryzyka i planowanie bezpieczeństwa",
        "Ochrona obiektów komercyjnych i przemysłowych",
        "Ochrona wydarzeń i imprez masowych"
      ],
      benefits: [
        "Całodobowa ochrona Twojego biznesu",
        "Redukcja ryzyka kradzieży i wandalizmu",
        "Profesjonalne podejście do bezpieczeństwa",
        "Dostosowane rozwiązania do specyfiki branży"
      ]
    },
    "sprzatanie": {
      title: "Usługi sprzątania",
      icon: Sparkles,
      description: "Oferujemy profesjonalne usługi sprzątania i konserwacji dla obiektów komercyjnych, biur oraz przestrzeni przemysłowych. Dbamy o czystość i higienę Twojego miejsca pracy.",
      details: [
        "Codzienne sprzątanie biur i przestrzeni komercyjnych",
        "Sprzątanie głębokie i odświeżające",
        "Konserwacja podłóg, okien i powierzchni",
        "Używanie ekologicznych środków czyszczących",
        "Sprzątanie przemysłowe i specjalistyczne",
        "Utrzymanie czystości w obiektach medycznych"
      ],
      benefits: [
        "Czyste i higieniczne środowisko pracy",
        "Lepsze samopoczucie pracowników",
        "Profesjonalny wizerunek firmy",
        "Oszczędność czasu na sprzątaniu"
      ]
    },
    "bhp": {
      title: "BHP",
      icon: Heart,
      description: "Kompleksowe rozwiązania z zakresu bezpieczeństwa i higieny pracy. Pomagamy w spełnieniu wymogów prawnych i zapewnieniu bezpiecznych warunków pracy dla Twoich pracowników.",
      details: [
        "Szkolenia BHP dla pracowników i pracodawców",
        "Ocena ryzyka zawodowego",
        "Audyty zgodności z przepisami BHP",
        "Planowanie działań awaryjnych i ewakuacyjnych",
        "Dokumentacja BHP i procedury bezpieczeństwa",
        "Doradztwo w zakresie środków ochrony indywidualnej"
      ],
      benefits: [
        "Zgodność z przepisami prawa pracy",
        "Bezpieczne środowisko pracy",
        "Redukcja ryzyka wypadków przy pracy",
        "Ochrona przed karami administracyjnymi"
      ]
    },
    "procesy-biznesowe": {
      title: "Procesy biznesowe",
      icon: Briefcase,
      description: "Optymalizujemy procesy biznesowe w Twojej firmie, aby zwiększyć efektywność i produktywność. Oferujemy analizę, projektowanie i wdrażanie usprawnień organizacyjnych.",
      details: [
        "Analiza i mapowanie procesów biznesowych",
        "Identyfikacja obszarów do optymalizacji",
        "Projektowanie usprawnień i automatyzacji",
        "Zarządzanie jakością i standardami ISO",
        "Wdrażanie systemów zarządzania",
        "Szkolenia z zakresu zarządzania procesami"
      ],
      benefits: [
        "Zwiększenie efektywności operacyjnej",
        "Redukcja kosztów działalności",
        "Lepsza kontrola nad procesami",
        "Wyższa jakość świadczonych usług"
      ]
    },
    "catering": {
      title: "Usługi cateringowe",
      icon: ChefHat,
      description: "Profesjonalne rozwiązania cateringowe dla firm i wydarzeń. Zapewniamy wysokiej jakości posiłki dostosowane do potrzeb Twoich pracowników i gości.",
      details: [
        "Catering firmowy - codzienne posiłki dla pracowników",
        "Catering na wydarzenia biznesowe i konferencje",
        "Zdrowe i zbilansowane menu",
        "Indywidualne projektowanie menu",
        "Obsługa kelnerska na wydarzeniach",
        "Catering dietetyczny i specjalistyczny"
      ],
      benefits: [
        "Zadowoleni i nakarmieniu pracownicy",
        "Profesjonalna obsługa wydarzeń",
        "Oszczędność czasu na organizacji posiłków",
        "Wysoka jakość i świeżość produktów"
      ]
    },
    "techniczne": {
      title: "Usługi techniczne",
      icon: Wrench,
      description: "Kompleksowe wsparcie techniczne dla Twojego wyposażenia i infrastruktury. Oferujemy konserwację, naprawy oraz modernizację systemów technicznych.",
      details: [
        "Konserwacja sprzętu i maszyn przemysłowych",
        "Naprawy i modernizacja systemów",
        "Wsparcie techniczne 24/7",
        "Przeglądy prewencyjne i okresowe",
        "Instalacja nowego wyposażenia",
        "Doradztwo techniczne i optymalizacja"
      ],
      benefits: [
        "Niezawodność działania sprzętu",
        "Minimalizacja przestojów produkcyjnych",
        "Wydłużenie żywotności urządzeń",
        "Szybka reakcja na awarie"
      ]
    },
    "przemyslowe": {
      title: "Rozwiązania przemysłowe",
      icon: Factory,
      description: "Specjalistyczne usługi dla zakładów produkcyjnych i przemysłowych. Wspieramy procesy produkcyjne i zapewniamy efektywne zarządzanie operacjami.",
      details: [
        "Wsparcie procesów produkcyjnych",
        "Zarządzanie sprzętem przemysłowym",
        "Kontrola jakości produkcji",
        "Optymalizacja efektywności operacyjnej",
        "Logistyka wewnętrzna i magazynowanie",
        "Bezpieczeństwo przemysłowe"
      ],
      benefits: [
        "Zwiększenie wydajności produkcji",
        "Lepsza kontrola jakości",
        "Optymalizacja kosztów operacyjnych",
        "Bezpieczne środowisko przemysłowe"
      ]
    },
    "opieka-medyczna": {
      title: "Opieka nad pacjentami",
      icon: Users,
      description: "Profesjonalne wsparcie w zakresie opieki zdrowotnej i usług medycznych. Zapewniamy kompleksową pomoc pacjentom i wsparcie dla placówek medycznych.",
      details: [
        "Wsparcie medyczne i pielęgniarskie",
        "Pomoc w codziennych czynnościach pacjentów",
        "Obsługa sprzętu medycznego",
        "Indywidualne plany opieki",
        "Transport medyczny",
        "Wsparcie administracyjne dla placówek"
      ],
      benefits: [
        "Profesjonalna opieka medyczna",
        "Komfort i bezpieczeństwo pacjentów",
        "Wsparcie dla personelu medycznego",
        "Kompleksowe podejście do zdrowia"
      ]
    }
  };

  const service = services[serviceId as keyof typeof services];

  if (!service) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Usługa nie została znaleziona</h1>
          <Link to="/">
            <Button>Powrót do strony głównej</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const IconComponent = service.icon;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Powrót do strony głównej
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <IconComponent className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-4xl font-bold text-foreground">{service.title}</h1>
              </div>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {service.description}
              </p>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Zakres usług</h2>
                <ul className="space-y-3">
                  {service.details.map((detail, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Korzyści</h2>
                <ul className="space-y-3">
                  {service.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-accent-red rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
                {serviceId === 'sprzatanie' && (
                  <div className="mt-8">
                    <img 
                      src="/images/czystosc.png" 
                      alt="Czystość w miejscu pracy" 
                      className="w-full rounded-lg shadow-md" 
                    />
                  </div>
                )}
                {serviceId === 'ochrona' && (
                  <div className="mt-8">
                    <video 
                      autoPlay={true}
                      loop={true}
                      muted={true}
                      playsInline={true}
                      controls={false}
                      poster="/images/bezpieczenstwo-2.png"
                      preload="auto"
                      aria-label="Bezpieczeństwo Twojego biznesu"
                      className="w-full rounded-lg shadow-md"
                    >
                      <source src="/images/impel-security.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
                {serviceId === 'bhp' && (
                  <div className="mt-8">
                    <img 
                      src="/images/bhp.png" 
                      alt="Bezpieczeństwo i higiena pracy" 
                      className="w-full rounded-lg shadow-md" 
                    />
                  </div>
                )}
                {serviceId === 'procesy-biznesowe' && (
                  <div className="mt-8">
                    <img 
                      src="/images/pb.png" 
                      alt="Procesy biznesowe" 
                      className="w-full rounded-lg shadow-md" 
                    />
                  </div>
                )}
                {serviceId === 'catering' && (
                  <div className="mt-8">
                    <video 
                      autoPlay={true}
                      loop={true}
                      muted={true}
                      playsInline={true}
                      controls={false}
                      poster="/images/cetering.png"
                      preload="auto"
                      aria-label="Usługi cateringowe"
                      className="w-full rounded-lg shadow-md"
                    >
                      <source src="/images/impel-catering.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
                {serviceId === 'techniczne' && (
                  <div className="mt-8">
                    <img 
                      src="/images/serwis.png" 
                      alt="Usługi techniczne" 
                      className="w-full rounded-lg shadow-md" 
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="lg:sticky lg:top-8">
              {serviceId === 'ochrona' ? (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6 bg-primary/5 border-b">
                    <h2 className="text-2xl font-bold text-foreground">Wyślij nam wiadomość</h2>
                  </div>
                  <div className="p-6">
                    <iframe 
                      id="ochrona-form-iframe"
                      src="https://assets-eur.mkt.dynamics.com/1e5b64c1-c132-4237-9477-532bcddae3fd/digitalassets/standaloneforms/df181703-1d5c-f011-bec1-000d3ab763c4" 
                      width="100%" 
                      height="1500px" 
                      style={{ border: 'none' }}
                      title="Formularz kontaktowy ochrona"
                      sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-top-navigation"
                    >
                      <p>Twoja przeglądarka nie obsługuje iframe. Prosimy o kontakt telefoniczny.</p>
                    </iframe>
                  </div>
                </div>
              ) : serviceId === 'sprzatanie' ? (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6 bg-primary/5 border-b">
                    <h2 className="text-2xl font-bold text-foreground">Wyślij nam wiadomość</h2>
                  </div>
                  <div className="p-6">
                    <iframe 
                      id="sprzatanie-form-iframe"
                      src="https://assets-eur.mkt.dynamics.com/1e5b64c1-c132-4237-9477-532bcddae3fd/digitalassets/standaloneforms/861dfa4b-1d5c-f011-bec1-000d3ab763c4" 
                      width="100%" 
                      height="1500px" 
                      style={{ border: 'none' }}
                      title="Formularz kontaktowy sprzątanie"
                      sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-top-navigation"
                    >
                      <p>Twoja przeglądarka nie obsługuje iframe. Prosimy o kontakt telefoniczny.</p>
                    </iframe>
                  </div>
                </div>
              ) : serviceId === 'techniczne' ? (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6 bg-primary/5 border-b">
                    <h2 className="text-2xl font-bold text-foreground">Wyślij nam wiadomość</h2>
                  </div>
                  <div className="p-6">
                    <iframe 
                      id="techniczne-form-iframe"
                      src="https://assets-eur.mkt.dynamics.com/1e5b64c1-c132-4237-9477-532bcddae3fd/digitalassets/standaloneforms/91c7026e-1d5c-f011-bec1-000d3ab763c4" 
                      width="100%" 
                      height="1500px" 
                      style={{ border: 'none' }}
                      title="Formularz kontaktowy usługi techniczne"
                      sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-top-navigation"
                    >
                      <p>Twoja przeglądarka nie obsługuje iframe. Prosimy o kontakt telefoniczny.</p>
                    </iframe>
                  </div>
                </div>
              ) : serviceId === 'catering' ? (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6 bg-primary/5 border-b">
                    <h2 className="text-2xl font-bold text-foreground">Wyślij nam wiadomość</h2>
                  </div>
                  <div className="p-6">
                    <iframe 
                      id="catering-form-iframe"
                      src="https://assets-eur.mkt.dynamics.com/1e5b64c1-c132-4237-9477-532bcddae3fd/digitalassets/standaloneforms/f9d5df95-1d5c-f011-bec1-000d3ab763c4" 
                      width="100%" 
                      height="1500px" 
                      style={{ border: 'none' }}
                      title="Formularz kontaktowy catering"
                      sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-top-navigation"
                    >
                      <p>Twoja przeglądarka nie obsługuje iframe. Prosimy o kontakt telefoniczny.</p>
                    </iframe>
                  </div>
                </div>
              ) : serviceId === 'bhp' ? (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6 bg-primary/5 border-b">
                    <h2 className="text-2xl font-bold text-foreground">Wyślij nam wiadomość</h2>
                  </div>
                  <div className="p-6">
                    <iframe 
                      id="bhp-form-iframe"
                      src="https://assets-eur.mkt.dynamics.com/1e5b64c1-c132-4237-9477-532bcddae3fd/digitalassets/standaloneforms/46e69d98-1f5c-f011-bec1-000d3ab763c4" 
                      width="100%" 
                      height="1500px" 
                      style={{ border: 'none' }}
                      title="Formularz kontaktowy BHP"
                      sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-top-navigation"
                    >
                      <p>Twoja przeglądarka nie obsługuje iframe. Prosimy o kontakt telefoniczny.</p>
                    </iframe>
                  </div>
                </div>
              ) : serviceId === 'procesy-biznesowe' ? (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6 bg-primary/5 border-b">
                    <h2 className="text-2xl font-bold text-foreground">Wyślij nam wiadomość</h2>
                  </div>
                  <div className="p-6">
                    <iframe 
                      id="procesy-biznesowe-form-iframe"
                      src="https://assets-eur.mkt.dynamics.com/1e5b64c1-c132-4237-9477-532bcddae3fd/digitalassets/standaloneforms/3b3938ab-1f5c-f011-bec1-000d3ab763c4" 
                      width="100%" 
                      height="1500px" 
                      style={{ border: 'none' }}
                      title="Formularz kontaktowy procesy biznesowe"
                      sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-top-navigation"
                    >
                      <p>Twoja przeglądarka nie obsługuje iframe. Prosimy o kontakt telefoniczny.</p>
                    </iframe>
                  </div>
                </div>
              ) : (
                <ServiceContactForm serviceName={service.title} />
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
