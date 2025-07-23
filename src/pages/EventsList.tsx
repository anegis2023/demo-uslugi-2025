import { Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";

const EventsList = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const events = [
    {
      id: "konferencja-bezpieczenstwa",
      title: "Konferencja Bezpieczeństwa 2025",
      date: "15 września 2025",
      location: "Warszawa, Hotel Marriott",
      description: "Doroczna konferencja poświęcona najnowszym trendom w bezpieczeństwie obiektów i ochronie mienia. Eksperci z branży podzielą się wiedzą na temat innowacyjnych rozwiązań i technologii.",
      image: "/images/bezpieczenstwo-2.png"
    },
    {
      id: "targi-outsourcingu",
      title: "Targi Outsourcingu Procesów Biznesowych",
      date: "22 października 2025",
      location: "Kraków, Centrum Kongresowe ICE",
      description: "Największe w Polsce targi poświęcone outsourcingowi usług biznesowych. Poznaj korzyści z outsourcingu i nawiąż kontakty z liderami branży.",
      image: "/images/pb.png"
    },
    {
      id: "szkolenie-bhp",
      title: "Szkolenie BHP dla Managerów",
      date: "5 listopada 2025",
      location: "Wrocław, Centrum Szkoleniowe Impel",
      description: "Kompleksowe szkolenie z zakresu BHP dla kadry zarządzającej. Dowiedz się, jak skutecznie wdrażać procedury bezpieczeństwa w swojej organizacji.",
      image: "/images/bhp.png"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-primary/5 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6">
              Wydarzenia
            </h1>
            <p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto">
              Zapoznaj się z nadchodzącymi wydarzeniami organizowanymi przez Impuls Services. Konferencje, szkolenia i targi branżowe - dołącz do nas!
            </p>
          </div>
        </section>

        {/* Events list */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
                  <div className="p-4 bg-primary/5 flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span className="font-medium">{event.date}</span>
                  </div>
                  <div className="p-6 flex-grow">
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{event.location}</p>
                    <p className="mb-6">{event.description}</p>
                    <div className="mt-auto">
                      <Link to={`/wydarzenia/${event.id}`}>
                        <Button className="w-full">
                          Szczegóły wydarzenia
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EventsList;
