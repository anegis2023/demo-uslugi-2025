
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <img 
                src="/images/impuls-services-white.png" 
                alt="Impuls Services" 
                className="h-16 w-auto"
              />
            </div>
            <p className="text-primary-foreground/80 mb-4">
              Profesjonalna firma outsourcingowa świadcząca kompleksowe usługi biznesowe 
              w całym kraju. Twój sukces to nasza misja.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-foreground/80 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Nasze usługi</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-white transition-colors">Usługi ochrony</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Usługi sprzątania</a></li>
              <li><a href="#" className="hover:text-white transition-colors">BHP</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Procesy biznesowe</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Usługi cateringowe</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Usługi techniczne</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Szybkie linki</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-white transition-colors">O nas</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Jak pracujemy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Aktualności</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kariera</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Polityka prywatności</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Regulamin</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
            <div className="space-y-3 text-primary-foreground/80">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4" />
                <span>+48 800 190 911</span>
              </div>
              {/* Email removed as requested */}
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 mt-1" />
                <span>Centrum Biznesowe<br />Warszawa, Polska</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/80">
          <p>&copy; {currentYear} Impuls Services. Wszelkie prawa zastrzeżone. Profesjonalne usługi biznesowe.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
