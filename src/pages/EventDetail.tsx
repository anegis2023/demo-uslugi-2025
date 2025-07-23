import { useParams, Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceContactForm from "@/components/ServiceContactForm";
import BhpEventForm from "@/components/BhpEventForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, MapPin, Clock, Users } from "lucide-react";

const EventDetail = () => {
  const { eventId } = useParams();
  const formScriptLoaded = useRef(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Load D365 Form Capture script for events using BhpEventForm
  useEffect(() => {
    if ((eventId === 'szkolenie-bhp' || eventId === 'targi-outsourcingu' || eventId === 'konferencja-bezpieczenstwa') && !formScriptLoaded.current) {
      // Create a script element for the D365 Form Capture library
      const script = document.createElement('script');
      script.src = 'https://cxppusa1formui01cdnsa01-endpoint.azureedge.net/eur/FormCapture/FormCapture.bundle.js';
      script.async = true;
      
      // Create a second script element for our custom D365 form capture implementation
      const implementationScript = document.createElement('script');
      
      script.onload = () => {
        console.log('D365 Form Capture script loaded');
        
        // Set the content of our implementation script
        implementationScript.textContent = `
          // Wait for the form to be available in the DOM
          d365mktformcapture.waitForElement("#bhp-event-registration-form")
          .then(form => {
            console.log('Event form found via waitForElement, attaching D365 Form Capture');
            
            // Set the form ID based on the event
            let formId = "0f99bc54-695d-f011-bec2-000d3ab87efc"; // Default for szkolenie-bhp
            let eventFormFieldName = "ANEGIS-DEMO-IMPEL-WYDARZENIE-3"; // Default for szkolenie-bhp
            
            if (window.location.href.includes('targi-outsourcingu')) {
              formId = "b5fa4f48-695d-f011-bec2-000d3ab87efc";
              eventFormFieldName = "ANEGIS-DEMO-IMPEL-WYDARZENIE-2";
            } else if (window.location.href.includes('konferencja-bezpieczenstwa')) {
              formId = "48345bf8-675d-f011-bec2-000d3ab87efc";
              eventFormFieldName = "ANEGIS-DEMO-IMPEL-WYDARZENIE-1";
            }
            
            const mappings = [
              {
                FormFieldName: "nip",
                DataverseFieldName: "an_an_taxnumber",
              },
              {
                FormFieldName: "companyName",
                DataverseFieldName: "an_an_companyname",
              },
              {
                FormFieldName: "firstName",
                DataverseFieldName: "firstname",
              },
              {
                FormFieldName: "lastName",
                DataverseFieldName: "lastname",
              },
              {
                FormFieldName: "jobTitle",
                DataverseFieldName: "jobtitle",
              },
              {
                FormFieldName: "email",
                DataverseFieldName: "emailaddress1",
              },
              {
                FormFieldName: "phone",
                DataverseFieldName: "mobilephone",
              },
              {
                FormFieldName: "marketingConsent",
                DataverseFieldName: "msdynmkt_purposeid;channels;optinwhenchecked",
                DataverseFieldValue: "aaeecf2e-82fe-ef11-bae7-000d3ab4229f;Email,Text;true",
              },
              {
                FormFieldName: "privacyPolicy",
                DataverseFieldName: "an_privacypolicyaccepted",
                DataverseFieldValue: [
                  { FormValue: true, DataverseValue: "1" }, // Privacy policy accepted
                ],
              },
              {
                FormFieldName: eventFormFieldName,
                DataverseFieldName: "cr8b4_eventform",
              },
              {
                FormFieldName: "DEMO-IMPEL",
                DataverseFieldName: "an_sourcefile",
              },
            ];

            // Add event listener to the form
            form.addEventListener("submit", (e) => {
              e.preventDefault(); // Prevent default form submission
              console.log('Form submit intercepted by D365 Form Capture');
              
              try {
                // Show processing message
                const formContainer = form.closest('.p-6');
                if (formContainer) {
                  const processingMessage = document.createElement('div');
                  processingMessage.className = 'p-4 bg-blue-50 text-blue-700 rounded mb-4';
                  processingMessage.innerHTML = 'Przetwarzanie formularza...';
                  form.parentNode.insertBefore(processingMessage, form);
                }
                
                // Serialize the form data
                const serializedForm = d365mktformcapture.serializeForm(form, mappings);
                console.log('Form serialized:', JSON.stringify(serializedForm)); // For debugging
                const payload = serializedForm.SerializedForm.build();

                // Configure the capture settings
                const captureConfig = {
                  FormId: formId,
                  FormApiUrl: "https://public-eur.mkt.dynamics.com/api/v1.0/orgs/1e5b64c1-c132-4237-9477-532bcddae3fd/landingpageforms"
                };
                
                console.log('Submitting form to D365 with FormId:', formId);
                
                // Submit the form to D365
                d365mktformcapture.submitForm(captureConfig, payload)
                  .then(response => {
                    console.log('D365 form submission successful');
                    
                    // Show success message
                    const formContainer = form.closest('.p-6');
                    if (formContainer) {
                      formContainer.innerHTML = '<div class="p-4 bg-green-50 text-green-700 rounded">Formularz został wysłany pomyślnie. Przekierowujemy...</div>';
                    }
                    
                    // Redirect after a delay
                    setTimeout(() => {
                      window.location.href = '/thank-you.html';
                    }, 3000);
                  })
                  .catch(error => {
                    console.error('D365 form submission failed:', error);
                    console.log('Form ID used:', formId);
                    console.log('Event form field name:', eventFormFieldName);
                    console.log('Form payload:', payload);
                    console.log('Capture config:', captureConfig);
                    
                    // Check if this is a CORS error (common during local development)
                    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
                    const isCorsError = error.toString().includes('CORS') || error.toString().includes('Failed to fetch');
                    
                    if (isLocalhost && isCorsError) {
                      console.log('CORS error detected during local development - this is expected and will work in production');
                      
                      // For local development, simulate successful submission
                      const formContainer = form.closest('.p-6');
                      if (formContainer) {
                        formContainer.innerHTML = '<div class="p-4 bg-yellow-50 text-yellow-700 rounded mb-4">Lokalne środowisko: CORS blokuje wysyłanie do D365.</div>' +
                                               '<div class="p-4 bg-green-50 text-green-700 rounded">Symulacja udanego wysłania formularza. Przekierowujemy...</div>';
                      }
                      
                      // Redirect after a delay
                      setTimeout(() => {
                        window.location.href = '/thank-you.html';
                      }, 3000);
                    } else {
                      // Real error - show alert
                      alert('Wystąpił błąd podczas wysyłania formularza. Prosimy spróbować ponownie.');
                    }
                  });
              } catch (error) {
                console.error('Error in form submission process:', error);
                alert('Wystąpił błąd podczas przetwarzania formularza. Prosimy spróbować ponownie.');
              }
            }, true); // Use capture phase to ensure our handler runs first
            
            console.log('D365 Form Capture successfully attached to form');
          })
          .catch(error => {
            console.error('Failed to find BHP event form:', error);
          });
        `;
        
        // Add the implementation script to the document
        document.head.appendChild(implementationScript);
      };
      
      script.onerror = () => {
        console.error('Failed to load D365 Form Capture script');
      };
      
      // Add the main D365 script to the document
      document.head.appendChild(script);
      formScriptLoaded.current = true;
    }
  }, [eventId]);

  const events = {
    "konferencja-bezpieczenstwa": {
      title: "Konferencja Bezpieczeństwa 2025",
      date: "15 września 2025",
      time: "9:00 - 17:00",
      location: "Warszawa, Hotel Marriott",
      address: "Al. Jerozolimskie 65/79, 00-697 Warszawa",
      description: "Doroczna konferencja poświęcona najnowszym trendom w bezpieczeństwie obiektów i ochronie mienia. Eksperci z branży podzielą się wiedzą na temat innowacyjnych rozwiązań i technologii.",
      image: "/images/bezpieczenstwo-2.png",
      details: [
        "Prezentacje ekspertów z dziedziny bezpieczeństwa",
        "Panele dyskusyjne na temat aktualnych wyzwań",
        "Pokazy najnowszych technologii ochrony",
        "Warsztaty praktyczne dla specjalistów",
        "Networking z liderami branży",
        "Materiały szkoleniowe i certyfikaty uczestnictwa"
      ],
      agenda: [
        { time: "8:30 - 9:00", title: "Rejestracja uczestników" },
        { time: "9:00 - 9:30", title: "Otwarcie konferencji" },
        { time: "9:30 - 11:00", title: "Panel: Trendy w bezpieczeństwie obiektów" },
        { time: "11:00 - 11:30", title: "Przerwa kawowa" },
        { time: "11:30 - 13:00", title: "Warsztaty praktyczne" },
        { time: "13:00 - 14:00", title: "Lunch" },
        { time: "14:00 - 15:30", title: "Prezentacje technologii" },
        { time: "15:30 - 16:30", title: "Panel dyskusyjny z ekspertami" },
        { time: "16:30 - 17:00", title: "Podsumowanie i zakończenie" }
      ]
    },
    "targi-outsourcingu": {
      title: "Targi Outsourcingu Procesów Biznesowych",
      date: "22 października 2025",
      time: "10:00 - 18:00",
      location: "Kraków, Centrum Kongresowe ICE",
      address: "ul. Marii Konopnickiej 17, 30-302 Kraków",
      description: "Największe w Polsce targi poświęcone outsourcingowi usług biznesowych. Poznaj korzyści z outsourcingu i nawiąż kontakty z liderami branży.",
      image: "/images/pb.png",
      details: [
        "Ponad 50 wystawców z branży outsourcingu",
        "Prezentacje case studies i success stories",
        "Konsultacje z ekspertami ds. optymalizacji procesów",
        "Konferencja towarzysząca na temat trendów w outsourcingu",
        "Możliwość nawiązania współpracy biznesowej",
        "Materiały informacyjne i katalog wystawców"
      ],
      agenda: [
        { time: "9:30 - 10:00", title: "Rejestracja wystawców i gości" },
        { time: "10:00 - 10:30", title: "Oficjalne otwarcie targów" },
        { time: "10:30 - 12:30", title: "Sesja prezentacji wystawców" },
        { time: "12:30 - 13:30", title: "Lunch networkingowy" },
        { time: "13:30 - 15:00", title: "Panel: Przyszłość outsourcingu w Polsce" },
        { time: "15:00 - 17:30", title: "Czas na indywidualne spotkania" },
        { time: "17:30 - 18:00", title: "Zakończenie i losowanie nagród" }
      ]
    },
    "szkolenie-bhp": {
      title: "Szkolenie BHP dla Managerów",
      date: "5 listopada 2025",
      time: "9:30 - 16:30",
      location: "Wrocław, Centrum Szkoleniowe Impel",
      address: "ul. Ślężna 118, 53-111 Wrocław",
      description: "Kompleksowe szkolenie z zakresu BHP dla kadry zarządzającej. Dowiedz się, jak skutecznie wdrażać procedury bezpieczeństwa w swojej organizacji.",
      image: "/images/bhp.png",
      details: [
        "Aktualne przepisy BHP dla kadry zarządzającej",
        "Odpowiedzialność prawna pracodawcy i kierowników",
        "Ocena ryzyka zawodowego w praktyce",
        "Organizacja bezpiecznego środowiska pracy",
        "Procedury w sytuacjach awaryjnych",
        "Certyfikat ukończenia szkolenia"
      ],
      agenda: [
        { time: "9:00 - 9:30", title: "Rejestracja i powitalna kawa" },
        { time: "9:30 - 11:00", title: "Moduł 1: Przepisy prawne BHP" },
        { time: "11:00 - 11:15", title: "Przerwa" },
        { time: "11:15 - 12:45", title: "Moduł 2: Ocena ryzyka zawodowego" },
        { time: "12:45 - 13:30", title: "Lunch" },
        { time: "13:30 - 15:00", title: "Moduł 3: Zarządzanie bezpieczeństwem" },
        { time: "15:00 - 15:15", title: "Przerwa" },
        { time: "15:15 - 16:15", title: "Moduł 4: Studia przypadków" },
        { time: "16:15 - 16:30", title: "Podsumowanie i wręczenie certyfikatów" }
      ]
    }
  };

  const event = eventId ? events[eventId as keyof typeof events] : null;

  if (!event) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Wydarzenie nie znalezione</h1>
            <p className="mb-6">Przepraszamy, nie znaleźliśmy wydarzenia o podanym identyfikatorze.</p>
            <Link to="/wydarzenia">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Powrót do listy wydarzeń
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="bg-muted/50">
          <div className="container mx-auto px-4 py-8 md:py-16 grid md:grid-cols-3 gap-8">
            <Link to="/wydarzenia" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Powrót do listy wydarzeń
            </Link>
          </div>
        </div>

        {/* Event header */}
        <section className="bg-primary/5 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{event.title}</h1>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-muted-foreground mb-8">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-primary" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                <span>{event.location}</span>
              </div>
            </div>
            <p className="text-lg max-w-3xl">{event.description}</p>
          </div>
        </section>

        {/* Event details */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-6">O wydarzeniu</h2>
                    <p className="mb-6">{event.description}</p>
                    
                    <h3 className="text-xl font-bold mb-4">Co oferujemy:</h3>
                    <ul className="list-disc pl-5 space-y-2 mb-8">
                      {event.details.map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>


                    <h3 className="text-xl font-bold mb-4">Agenda wydarzenia:</h3>
                    <div className="space-y-4 mb-8">
                      {event.agenda.map((item, index) => (
                        <div key={index} className="flex border-b border-muted pb-3">
                          <div className="w-32 font-medium">{item.time}</div>
                          <div>{item.title}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8">
                      <h3 className="text-xl font-bold mb-4">Lokalizacja:</h3>
                      <p className="mb-2">{event.location}</p>
                      <p>{event.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-1">
                {eventId === 'szkolenie-bhp' || eventId === 'targi-outsourcingu' || eventId === 'konferencja-bezpieczenstwa' ? (
                  <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-4">
                    <div className="p-6 bg-primary/5 border-b">
                      <h2 className="text-2xl font-bold text-foreground">Zapisz się na wydarzenie</h2>
                    </div>
                    <div className="p-6 w-full max-w-full">
                      <p className="mb-6">Wypełnij formularz, aby zarezerwować miejsce na wydarzeniu. Liczba miejsc jest ograniczona.</p>
                      <BhpEventForm />
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-4">
                    <div className="p-6 bg-primary/5 border-b">
                      <h2 className="text-2xl font-bold text-foreground">Zapisz się na wydarzenie</h2>
                    </div>
                    <div className="p-6 w-full max-w-full">
                      <p className="mb-6">Wypełnij formularz, aby zarezerwować miejsce na wydarzeniu. Liczba miejsc jest ograniczona.</p>
                      <ServiceContactForm serviceName={event.title} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EventDetail;
