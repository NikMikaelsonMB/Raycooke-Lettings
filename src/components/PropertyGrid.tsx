
import React, { useState, useEffect } from "react";
import { Property, PropertyFilters, PropertyType } from "@/types/property";
import PropertyCard from "./PropertyCard";
import { Loader2, Filter, Home, Bed, MapPin, Euro, X } from "lucide-react";

interface PropertyGridProps {
  properties: Property[];
  initialFilters?: Partial<PropertyFilters>;
}

const PropertyGrid = ({ properties, initialFilters }: PropertyGridProps) => {
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState<PropertyFilters>({
    search: initialFilters?.search || "",
    priceMin: initialFilters?.priceMin || 0,
    priceMax: initialFilters?.priceMax || 10000,
    bedrooms: initialFilters?.bedrooms || null,
    propertyType: initialFilters?.propertyType || null,
    area: initialFilters?.area || null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Areas (extracted from properties)
  const uniqueAreas = Array.from(
    new Set(properties.map((p) => p.address.area))
  ).sort();

  // Counties (extracted from properties)
  const uniqueCounties = Array.from(
    new Set(properties.map((p) => p.address.county))
  ).sort();

  // Property types (extracted from properties)
  const uniquePropertyTypes = Array.from(
    new Set(properties.map((p) => p.type))
  ).sort() as PropertyType[];

  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    const timer = setTimeout(() => {
      applyFilters();
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [filters]);

  const applyFilters = () => {
    const filtered = properties.filter((property) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          property.title.toLowerCase().includes(searchLower) ||
          property.address.area.toLowerCase().includes(searchLower) ||
          property.address.county.toLowerCase().includes(searchLower) ||
          property.address.street.toLowerCase().includes(searchLower) ||
          property.type.toLowerCase().includes(searchLower);

        if (!matchesSearch) return false;
      }

      // Price range
      if (
        property.price < filters.priceMin ||
        property.price > filters.priceMax
      ) {
        return false;
      }

      // Bedrooms
      if (filters.bedrooms !== null && property.bedrooms < filters.bedrooms) {
        return false;
      }

      // Property type
      if (
        filters.propertyType !== null &&
        property.type !== filters.propertyType
      ) {
        return false;
      }

      // Area
      if (
        filters.area !== null &&
        property.address.area !== filters.area &&
        property.address.county !== filters.area
      ) {
        return false;
      }

      return true;
    });

    setFilteredProperties(filtered);
  };

  const handleFilterChange = (key: keyof PropertyFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      priceMin: 0,
      priceMax: 10000,
      bedrooms: null,
      propertyType: null,
      area: null,
    });
  };

  const hasActiveFilters = () => {
    return (
      filters.search !== "" ||
      filters.priceMin !== 0 ||
      filters.priceMax !== 10000 ||
      filters.bedrooms !== null ||
      filters.propertyType !== null ||
      filters.area !== null
    );
  };

  return (
    <section id="properties" className="bg-estate-secondary py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-semibold mb-2">Our Properties</h2>
            <p className="text-estate-medium">
              {filteredProperties.length} properties available for rent
            </p>
          </div>

          <div className="flex items-center mt-4 md:mt-0">
            <button
              className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm mr-3 hover:bg-gray-50 transition-colors"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} className="mr-2" />
              Filters
            </button>

            {hasActiveFilters() && (
              <button
                className="flex items-center px-4 py-2 bg-estate-light text-estate-medium rounded-lg hover:bg-gray-200 transition-colors"
                onClick={clearFilters}
              >
                <X size={18} className="mr-2" />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Filters panel */}
        {showFilters && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Property Type */}
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center">
                  <Home size={16} className="mr-2 text-estate-primary" />
                  Property Type
                </label>
                <select
                  className="w-full p-2 border border-gray-200 rounded-md"
                  value={filters.propertyType || ""}
                  onChange={(e) =>
                    handleFilterChange(
                      "propertyType",
                      e.target.value ? (e.target.value as PropertyType) : null
                    )
                  }
                >
                  <option value="">Any Type</option>
                  {uniquePropertyTypes.map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Bedrooms */}
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center">
                  <Bed size={16} className="mr-2 text-estate-primary" />
                  Bedrooms
                </label>
                <select
                  className="w-full p-2 border border-gray-200 rounded-md"
                  value={filters.bedrooms || ""}
                  onChange={(e) =>
                    handleFilterChange(
                      "bedrooms",
                      e.target.value ? parseInt(e.target.value) : null
                    )
                  }
                >
                  <option value="">Any Bedrooms</option>
                  <option value="1">1+ Bedrooms</option>
                  <option value="2">2+ Bedrooms</option>
                  <option value="3">3+ Bedrooms</option>
                  <option value="4">4+ Bedrooms</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center">
                  <MapPin size={16} className="mr-2 text-estate-primary" />
                  Location
                </label>
                <select
                  className="w-full p-2 border border-gray-200 rounded-md"
                  value={filters.area || ""}
                  onChange={(e) =>
                    handleFilterChange(
                      "area",
                      e.target.value ? e.target.value : null
                    )
                  }
                >
                  <option value="">Any Location</option>
                  <optgroup label="Counties">
                    {uniqueCounties.map((county) => (
                      <option key={county} value={county}>
                        {county}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Areas">
                    {uniqueAreas.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center">
                  <Euro size={16} className="mr-2 text-estate-primary" />
                  Price Range
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    className="w-full p-2 border border-gray-200 rounded-md"
                    value={filters.priceMin}
                    onChange={(e) =>
                      handleFilterChange("priceMin", parseInt(e.target.value))
                    }
                  >
                    <option value="0">Min Price</option>
                    <option value="1000">€1,000</option>
                    <option value="1500">€1,500</option>
                    <option value="2000">€2,000</option>
                    <option value="2500">€2,500</option>
                    <option value="3000">€3,000</option>
                  </select>
                  <select
                    className="w-full p-2 border border-gray-200 rounded-md"
                    value={filters.priceMax}
                    onChange={(e) =>
                      handleFilterChange("priceMax", parseInt(e.target.value))
                    }
                  >
                    <option value="10000">Max Price</option>
                    <option value="2000">€2,000</option>
                    <option value="3000">€3,000</option>
                    <option value="4000">€4,000</option>
                    <option value="5000">€5,000</option>
                    <option value="7500">€7,500</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 size={40} className="animate-spin text-estate-primary" />
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-10 text-center">
            <h3 className="text-xl font-medium mb-2">No properties found</h3>
            <p className="text-estate-medium mb-4">
              Try adjusting your search filters to find properties.
            </p>
            <button
              onClick={clearFilters}
              className="bg-estate-primary text-white px-4 py-2 rounded-lg hover:bg-estate-primary-light transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProperties.map((property) => (
              <div key={property.id} className="animate-fade-in">
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyGrid;
