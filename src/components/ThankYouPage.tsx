import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ThankYouPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-primary mb-6">
          Dziękujemy za wypełnienie formularza
        </h1>
        
        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold shrink-0">1</div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Potwierdź swój adres e-mail</h2>
              <p className="text-gray-700">
                Aby wziąć udział w procesie rejestracji, prosimy, abyś potwierdził / potwierdziła swój adres e-mail w wiadomości, którą do Ciebie wysłaliśmy. 
                Pamiętaj także o sprawdzenie folderu SPAM. Jeśli jednak już wcześniej miałeś / miałaś kontakt z naszą firmą, to nie wyślemy Ci ponownej 
                prośby o potwierdzenie, gdyż już znajdujesz się w naszej bazie subskrybentów.
              </p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold shrink-0">2</div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Rozpoczynamy weryfikację</h2>
              <p className="text-gray-700">
                Twoje zgłoszenie zostanie zweryfikowane przez nasz zespół, aby upewnić się, że spełnia wszystkie wymagane kryteria. 
                Proces ten zostanie zakończony w ciągu 24 godzin, o czym Cię poinformujemy.
              </p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold shrink-0">3</div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Poczekaj na potwierdzenie Twojego udziału</h2>
              <p className="text-gray-700">
                Po pomyślnej weryfikacji, wyślemy na Twój adres e-mail wiadomość potwierdzającą Twój dostęp do nagrań!
              </p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold shrink-0">4</div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Masz pytania? Napisz do nas!</h2>
              <p className="text-gray-700">
                W przypadku dodatkowych pytań, prosimy o kontakt na adres e-mail: <a href="mailto:events@anegis.com" className="text-primary hover:underline">events@anegis.com</a>. 
                Jesteśmy do Twojej dyspozycji!
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <Button 
            onClick={() => navigate("/")}
            className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3"
          >
            Powrót do strony głównej
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
