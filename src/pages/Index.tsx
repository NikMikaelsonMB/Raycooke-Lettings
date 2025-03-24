
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PropertyGrid from "@/components/PropertyGrid";
import Footer from "@/components/Footer";
import { properties } from "@/data/properties";
import { PropertyFilters, PropertyType } from "@/types/property";

const Index = () => {
  const [filters, setFilters] = useState<Partial<PropertyFilters>>({
    search: "",
    priceMin: 0,
    priceMax: 10000,
    bedrooms: null,
    propertyType: null,
    area: null,
  });

  // Handle hero search
  const handleHeroSearch = (heroFilters: {
    search: string;
    propertyType: PropertyType | null;
    bedrooms: number | null;
    priceMax: number;
  }) => {
    setFilters({
      ...filters,
      search: heroFilters.search,
      propertyType: heroFilters.propertyType,
      bedrooms: heroFilters.bedrooms,
      priceMax: heroFilters.priceMax,
    });

    // Scroll to properties
    document.getElementById("properties")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSection onSearch={handleHeroSearch} />
        <PropertyGrid properties={properties} initialFilters={filters} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
