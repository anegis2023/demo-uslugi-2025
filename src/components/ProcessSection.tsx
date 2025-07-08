
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, FileText, Settings, CheckCircle2 } from "lucide-react";

const ProcessSection = () => {
  const steps = [
    {
      step: "01",
      title: "Wstępna konsultacja",
      description: "Rozpoczynamy od kompleksowej konsultacji, aby zrozumieć potrzeby, wyzwania i cele Twojej firmy.",
      icon: MessageSquare,
      details: [
        "Bezpłatna konsultacja wstępna",
        "Ocena potrzeb biznesowych",
        "Zbieranie wymagań",
        "Planowanie rozwiązań na zamówienie"
      ]
    },
    {
      step: "02",
      title: "Propozycja i planowanie",
      description: "Na podstawie naszej oceny tworzymy szczegółową propozycję z dostosowanymi rozwiązaniami i harmonogramem wdrożenia.",
      icon: FileText,
      details: [
        "Szczegółowa propozycja usług",
        "Przejrzyste ceny",
        "Harmonogram wdrożenia",
        "Plan alokacji zasobów"
      ]
    },
    {
      step: "03",
      title: "Wdrożenie",
      description: "Nasz zespół ekspertów rozpoczyna wdrażanie uzgodnionych rozwiązań z minimalnym zakłóceniem Twoich operacji.",
      icon: Settings,
      details: [
        "Płynne wdrożenie",
        "Wdrożenie profesjonalnego zespołu",
        "Kontrole zapewnienia jakości",
        "Monitorowanie postępów"
      ]
    },
    {
      step: "04",
      title: "Ciągłe wsparcie",
      description: "Zapewniamy ciągłe wsparcie, monitoring i optymalizację, aby zapewnić konsekwentną doskonałość usług.",
      icon: CheckCircle2,
      details: [
        "Dostępność wsparcia 24/7",
        "Regularne przeglądy wydajności",
        "Ciągłe ulepszanie",
        "Monitorowanie satysfakcji klientów"
      ]
    }
  ];

  return (
    <section id="process" className="py-20 bg-gradient-to-b from-secondary/10 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            Jak pracujemy
          </Badge>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Nasz sprawdzony <span className="text-primary">proces</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stosujemy systematyczne podejście, aby zapewnić pomyślną realizację projektu 
            i długoterminową satysfakcję klienta. Oto jak z Tobą pracujemy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card 
              key={index} 
              className="relative group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg"
            >
              {/* Step Number */}
              <div className="absolute -top-4 left-6">
                <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                  {step.step}
                </div>
              </div>

              {/* Connector Line (except for last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-8 w-6 h-0.5 bg-primary/30"></div>
              )}

              <CardHeader className="pt-8">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {step.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {step.description}
                </p>
                <ul className="space-y-2">
                  {step.details.map((detail, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-to-r from-primary/5 via-background to-primary/5 border-primary/20 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-primary mb-4">Gotowy, żeby zacząć?</h3>
              <p className="text-muted-foreground mb-6">
                Skontaktuj się z nami już dziś, aby uzyskać bezpłatną konsultację i odkryć, jak nasz 
                sprawdzony proces może przekształcić operacje Twojej firmy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="#contact" 
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6"
                >
                  Rozpocznij swój projekt
                </a>
                <a 
                  href="#services" 
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-6"
                >
                  Zobacz nasze usługi
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
