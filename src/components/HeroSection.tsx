
import React, { useState } from "react";
import { Search, Bed, Home, MapPin, Euro } from "lucide-react";
import { PropertyType } from "@/types/property";

interface HeroSectionProps {
  onSearch: (filters: {
    search: string;
    propertyType: PropertyType | null;
    bedrooms: number | null;
    priceMax: number;
  }) => void;
}

const HeroSection = ({ onSearch }: HeroSectionProps) => {
  const [search, setSearch] = useState("");
  const [propertyType, setPropertyType] = useState<PropertyType | null>(null);
  const [bedrooms, setBedrooms] = useState<number | null>(null);
  const [priceMax, setPriceMax] = useState<number>(5000);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      search,
      propertyType,
      bedrooms,
      priceMax,
    });
  };

  return (
    <section className="relative pt-32 pb-20 md:pb-32 overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-estate-primary/90 to-estate-primary-light/80 z-10"></div>
      
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80"
          alt="Dublin property"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16">
          <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-4 animate-fade-in">
            Find Your Perfect Rental Property
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Discover Your Dream Home in Ireland
          </h1>
          <p className="text-lg text-white/90 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Browse our extensive range of properties available for rent across Ireland,
            from cozy apartments to spacious family homes.
          </p>
        </div>

        {/* Search form */}
        <div className="max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-lg p-4 md:p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Location search */}
              <div className="col-span-1 md:col-span-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-estate-medium" size={20} />
                  <input
                    type="text"
                    placeholder="Search by location, property name or keyword..."
                    className="search-input"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              {/* Property type */}
              <div className="relative">
                <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-estate-medium" size={20} />
                <select
                  className="search-input pl-10 appearance-none"
                  value={propertyType || ""}
                  onChange={(e) => 
                    setPropertyType(e.target.value ? e.target.value as PropertyType : null)
                  }
                >
                  <option value="">Any Property Type</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="studio">Studio</option>
                  <option value="duplex">Duplex</option>
                  <option value="penthouse">Penthouse</option>
                  <option value="bungalow">Bungalow</option>
                  <option value="cottage">Cottage</option>
                </select>
              </div>

              {/* Bedrooms */}
              <div className="relative">
                <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-estate-medium" size={20} />
                <select
                  className="search-input pl-10 appearance-none"
                  value={bedrooms || ""}
                  onChange={(e) => 
                    setBedrooms(e.target.value ? parseInt(e.target.value) : null)
                  }
                >
                  <option value="">Any Bedrooms</option>
                  <option value="1">1+ Bedrooms</option>
                  <option value="2">2+ Bedrooms</option>
                  <option value="3">3+ Bedrooms</option>
                  <option value="4">4+ Bedrooms</option>
                </select>
              </div>

              {/* Price */}
              <div className="relative">
                <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 text-estate-medium" size={20} />
                <select
                  className="search-input pl-10 appearance-none"
                  value={priceMax}
                  onChange={(e) => setPriceMax(parseInt(e.target.value))}
                >
                  <option value="1500">Up to €1,500/month</option>
                  <option value="2000">Up to €2,000/month</option>
                  <option value="3000">Up to €3,000/month</option>
                  <option value="4000">Up to €4,000/month</option>
                  <option value="5000">Up to €5,000/month</option>
                  <option value="10000">Any Price</option>
                </select>
              </div>

              {/* Search button */}
              <button
                type="submit"
                className="bg-estate-primary hover:bg-estate-primary-light text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
              >
                Search Properties
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
