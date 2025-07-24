
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail } from "lucide-react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const navigation = [
    { name: "Usługi", href: "#services" },
    { name: "Wydarzenia", href: "/wydarzenia" },
    { name: "O nas", href: "#about" },
    { name: "Jak pracujemy", href: "#process" },
    { name: "Kontakt", href: "#contact" },
  ];

  return (
    <header className="bg-background shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="hidden md:flex justify-end items-center py-2 text-sm text-muted-foreground border-b">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>+48 800 190 911</span>
            </div>

          </div>
        </div>

        {/* Main navigation */}
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <img src="/images/logo impulsservice_color.png" alt="Impuls Services" className="h-16 w-auto" />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={isHomePage ? item.href : item.href.startsWith("/") ? item.href : "/"}
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center">
            <Button 
              className="bg-accent-red hover:bg-accent-red/90" 
              size="sm"
              onClick={() => {
                if (isHomePage) {
                  // On homepage, scroll to contact section
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                    // Focus on the form heading for better accessibility
                    const formHeading = document.querySelector('#contact h2');
                    if (formHeading instanceof HTMLElement) {
                      setTimeout(() => formHeading.focus(), 800);
                    }
                  }
                } else {
                  // On subpages, redirect to homepage and scroll to the specific heading
                  window.location.href = '/#contact-form-heading';
                }
              }}
            >
              Skontaktuj się
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={isHomePage ? item.href : item.href.startsWith("/") ? item.href : "/"}
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex flex-col space-y-2 pt-4">
                <Button 
                  className="bg-accent-red hover:bg-accent-red/90" 
                  size="sm"
                  onClick={() => {
                    setIsMenuOpen(false); // Close mobile menu
                    if (isHomePage) {
                      // On homepage, scroll to contact section
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                        // Focus on the form heading for better accessibility
                        const formHeading = document.querySelector('#contact h2');
                        if (formHeading instanceof HTMLElement) {
                          setTimeout(() => formHeading.focus(), 800);
                        }
                      }
                    } else {
                      // On subpages, redirect to homepage and scroll to the specific heading
                      window.location.href = '/#contact-form-heading';
                    }
                  }}
                >
                  Skontaktuj się
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
