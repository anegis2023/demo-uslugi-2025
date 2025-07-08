
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Sparkles, Briefcase, ChefHat, Wrench, Factory, Heart, Users } from "lucide-react";
import { Link } from "react-router-dom";

const ServicesSection = () => {
  const services = [
    {
      id: "ochrona",
      title: "Usługi ochrony",
      description: "Profesjonalne rozwiązania ochrony dla Twojej firmy i wydarzeń.",
      icon: Shield,
      features: ["Monitoring 24/7", "Personel ochrony", "Kontrola dostępu", "Ocena ryzyka"]
    },
    {
      id: "sprzatanie",
      title: "Usługi sprzątania",
      description: "Kompleksowe usługi sprzątania i konserwacji nieruchomości komercyjnych.",
      icon: Sparkles,
      features: ["Sprzątanie biur", "Sprzątanie głębokie", "Konserwacja", "Produkty ekologiczne"]
    },
    {
      id: "bhp",
      title: "BHP",
      description: "Kompleksowe rozwiązania bezpieczeństwa i higieny pracy oraz zgodności.",
      icon: Heart,
      features: ["Szkolenia BHP", "Zarządzanie ryzykiem", "Audyty zgodności", "Planowanie awaryjne"]
    },
    {
      id: "procesy-biznesowe",
      title: "Procesy biznesowe",
      description: "Usprawnienie operacji biznesowych dzięki naszym usługom optymalizacji procesów.",
      icon: Briefcase,
      features: ["Analiza procesów", "Optymalizacja", "Automatyzacja", "Zarządzanie jakością"]
    },
    {
      id: "catering",
      title: "Usługi cateringowe",
      description: "Profesjonalne rozwiązania cateringowe na wydarzenia firmowe i codzienne posiłki.",
      icon: ChefHat,
      features: ["Catering firmowy", "Catering eventowy", "Zdrowe posiłki", "Menu na zamówienie"]
    },
    {
      id: "techniczne",
      title: "Usługi techniczne",
      description: "Kompleksowe wsparcie techniczne i konserwacja Twojego wyposażenia.",
      icon: Wrench,
      features: ["Konserwacja sprzętu", "Wsparcie techniczne", "Naprawy", "Opieka prewencyjna"]
    },
    {
      id: "przemyslowe",
      title: "Rozwiązania przemysłowe",
      description: "Specjalistyczne usługi przemysłowe dla zakładów produkcyjnych i wytwórczych.",
      icon: Factory,
      features: ["Wsparcie produkcji", "Zarządzanie sprzętem", "Kontrola jakości", "Efektywność"]
    },
    {
      id: "opieka-medyczna",
      title: "Opieka nad pacjentami",
      description: "Profesjonalne wsparcie opieki zdrowotnej i usługi opieki nad pacjentami.",
      icon: Users,
      features: ["Wsparcie medyczne", "Pomoc pacjentom", "Sprzęt medyczny", "Plany opieki"]
    }
  ];

  return (
    <section id="services" className="pt-12 pb-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Nasze <span className="text-primary">usługi</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Kompleksowe rozwiązania biznesowe dostosowane do Twoich konkretnych potrzeb. 
            Zapewniamy doskonałość we wszystkich obszarach usług z profesjonalną wiedzą.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-card via-card to-secondary/10"
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 mb-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                {service.id === 'przemyslowe' || service.id === 'opieka-medyczna' ? (
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      // You can add custom functionality here if needed
                      console.log(`Clicked on service: ${service.title} (no redirect)`);
                    }}
                  >
                    Dowiedz się więcej
                  </Button>
                ) : (
                  <Link to={`/uslugi/${service.id}`}>
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      Dowiedz się więcej
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Button removed as requested */}
      </div>
    </section>
  );
};

export default ServicesSection;
