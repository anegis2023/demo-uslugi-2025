
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const ContactForm = () => {

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Skontaktuj się <span className="text-primary">z nami</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Gotowy, aby przekształcić swoją firmę? Skontaktuj się z nami już dziś, aby uzyskać 
            bezpłatną konsultację i odkryć, jak nasze usługi mogą pomóc Ci osiągnąć cele.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="relative">
              <Card className="shadow-lg relative z-10">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-primary">Informacje kontaktowe</CardTitle>
                  <CardDescription>
                    Skontaktuj się z nami za pomocą dowolnego z poniższych kanałów
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Telefon</h4>
                      <p className="text-muted-foreground">+48 800 190 911</p>
                      <p className="text-sm text-muted-foreground">Pon-Pt 8:00-18:00</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Adres</h4>
                      <p className="text-muted-foreground">
                        Centrum Biznesowe<br />
                        Warszawa, Polska
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Godziny pracy</h4>
                      <p className="text-muted-foreground">
                        Poniedziałek - Piątek: 8:00 - 18:00<br />
                        Sobota: 9:00 - 14:00<br />
                        Niedziela: Zamknięte
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-8 relative">
                <img 
                  src="/images/firs_section.png" 
                  alt="Profesjonalne usługi" 
                  className="w-full rounded-lg shadow-lg object-cover transform transition-transform duration-300 hover:scale-[1.02]" 
                  style={{ 
                    maxHeight: '280px',
                    objectPosition: 'center',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle id="contact-form-heading" className="text-2xl font-bold text-primary">Wyślij nam wiadomość</CardTitle>
                <CardDescription>
                  Wypełnij poniższy formularz, a skontaktujemy się z Tobą tak szybko, jak to możliwe
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="w-full h-[1100px] relative">
                  <iframe 
                    id="homepage-contact-form-iframe"
                    src="https://assets-eur.mkt.dynamics.com/1e5b64c1-c132-4237-9477-532bcddae3fd/digitalassets/standaloneforms/219e852c-dc59-f011-bec2-0022489c8d24" 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    title="Contact Form"
                    sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-top-navigation"
                    style={{ borderRadius: '0 0 0.5rem 0.5rem' }}
                    loading="eager"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  {/* Fallback content in case iframe fails to load */}
                  <div className="absolute inset-0 flex items-center justify-center bg-white/80 pointer-events-none opacity-0 transition-opacity duration-300" id="iframe-fallback">
                    <div className="text-center p-6">
                      <p className="text-lg font-medium text-gray-700 mb-2">Formularz kontaktowy jest ładowany...</p>
                      <p className="text-sm text-gray-500">Jeśli formularz nie załaduje się w ciągu kilku sekund, odśwież stronę lub skontaktuj się z nami bezpośrednio.</p>
                    </div>
                  </div>
                </div>
                <script dangerouslySetInnerHTML={{ __html: `
                  document.addEventListener('DOMContentLoaded', function() {
                    const iframe = document.querySelector('iframe[title="Contact Form"]');
                    const fallback = document.getElementById('iframe-fallback');
                    
                    if (iframe && fallback) {
                      // Show fallback after 5 seconds if iframe hasn't loaded
                      const timeout = setTimeout(() => {
                        fallback.style.opacity = '1';
                        fallback.style.pointerEvents = 'auto';
                      }, 5000);
                      
                      // Hide fallback if iframe loads successfully
                      iframe.onload = function() {
                        clearTimeout(timeout);
                        fallback.style.opacity = '0';
                      };
                      
                      // Show fallback if iframe fails to load
                      iframe.onerror = function() {
                        fallback.style.opacity = '1';
                        fallback.style.pointerEvents = 'auto';
                      };
                    }
                  });
                `}} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
