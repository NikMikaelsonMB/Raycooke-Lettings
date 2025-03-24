
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, Phone, MapPin } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled 
          ? "bg-white shadow-nav py-3" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        {/* Logo */}
        <a 
          href="/" 
          className="flex items-center"
        >
          <div className="font-semibold text-2xl text-estate-primary tracking-tight">
            <span className="mr-1">Raycooke</span>
            <span className="font-light">Lettings</span>
          </div>
        </a>

        {/* Contact info (desktop only) */}
        <div className="hidden md:flex items-center space-x-4 text-sm">
          <div className="flex items-center text-estate-medium">
            <Phone size={16} className="mr-2" />
            <span>+353 1 456 7890</span>
          </div>
          <div className="flex items-center text-estate-medium">
            <MapPin size={16} className="mr-2" />
            <span>Dublin, Ireland</span>
          </div>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a 
            href="/" 
            className="text-estate-dark hover:text-estate-primary transition-colors"
          >
            Home
          </a>
          <a 
            href="#properties" 
            className="text-estate-dark hover:text-estate-primary transition-colors"
          >
            Properties
          </a>
          <a 
            href="#" 
            className="text-estate-dark hover:text-estate-primary transition-colors"
          >
            About
          </a>
          <a 
            href="#" 
            className="text-estate-dark hover:text-estate-primary transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-estate-dark" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-lg animate-fade-in-up">
          <div className="container mx-auto py-5 px-4 flex flex-col space-y-4">
            <a 
              href="/" 
              className="text-estate-dark hover:text-estate-primary py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </a>
            <a 
              href="#properties" 
              className="text-estate-dark hover:text-estate-primary py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Properties
            </a>
            <a 
              href="#" 
              className="text-estate-dark hover:text-estate-primary py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#" 
              className="text-estate-dark hover:text-estate-primary py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>

            {/* Contact info for mobile */}
            <div className="pt-4 border-t border-gray-100 flex flex-col space-y-3 text-sm">
              <div className="flex items-center text-estate-medium">
                <Phone size={16} className="mr-2" />
                <span>+353 1 456 7890</span>
              </div>
              <div className="flex items-center text-estate-medium">
                <MapPin size={16} className="mr-2" />
                <span>Dublin, Ireland</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
