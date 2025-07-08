
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Award, Users, Globe } from "lucide-react";

const AboutSection = () => {
  const achievements = [
    {
      icon: Users,
      number: "500+",
      title: "Zadowolonych klientów",
      description: "Firmy ufają naszym profesjonalnym usługom"
    },
    {
      icon: Award,
      number: "15+",
      title: "Lat doświadczenia",
      description: "Sprawdzona historia w rozwiązaniach biznesowych"
    },
    {
      icon: CheckCircle,
      number: "99%",
      title: "Wskaźnik sukcesu",
      description: "Dostarczamy rezultaty przewyższające oczekiwania"
    },
    {
      icon: Globe,
      number: "50+",
      title: "Obsługiwanych miast",
      description: "Ogólnopolski zasięg usług"
    }
  ];

  const features = [
    "Certyfikat ISO 9001:2015 w zarządzaniu jakością",
    "Wsparcie 24/7 i reagowanie awaryjne",
    "Profesjonalny zespół z certyfikatami branżowymi",
    "Dostosowane rozwiązania dla każdej wielkości firmy",
    "Przejrzyste ceny bez ukrytych kosztów",
    "Regularne przeglądy wydajności i ulepszenia"
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <Badge variant="outline" className="mb-4 text-primary border-primary">
              O firmie Impel Group
            </Badge>
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Twój zaufany <span className="text-primary">partner biznesowy</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Od ponad 15 lat Impel Group jest wiodącym dostawcą kompleksowych 
              rozwiązań biznesowych w całej Polsce. Specjalizujemy się w dostarczaniu 
              wysokiej jakości usług outsourcingowych, które pomagają firmom skupić się 
              na ich podstawowej działalności, podczas gdy my zajmujemy się doskonałością operacyjną.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Nasze zaangażowanie w jakość, niezawodność i satysfakcję klienta uczyniło 
              nas preferowanym wyborem dla firm każdej wielkości, od małych przedsiębiorstw 
              po duże korporacje. Rozumiemy, że każda firma jest wyjątkowa, dlatego oferujemy 
              dostosowane rozwiązania spełniające Twoje specyficzne wymagania.
            </p>

            {/* Features List */}
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Stats Cards */}
          <div className="grid grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow border-0 bg-gradient-to-br from-card to-secondary/20">
                <CardContent className="p-0">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <achievement.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {achievement.number}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-primary/5 via-background to-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-primary mb-4">Nasza misja</h3>
              <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                "Wspieranie firm poprzez świadczenie wyjątkowych usług outsourcingowych, które 
                zwiększają efektywność, redukują koszty i umożliwiają naszym klientom skupienie się 
                na tym, co robią najlepiej. Jesteśmy zobowiązani do budowania długoterminowych 
                partnerstw opartych na zaufaniu, jakości i obopólnym sukcesie."
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
