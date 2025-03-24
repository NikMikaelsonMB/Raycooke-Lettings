
import React from "react";
import { Property } from "@/types/property";
import { Bed, Bath, Square, CalendarDays, ArrowUpRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IE", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  // BER color mapping
  const getBerColor = (rating: string) => {
    if (rating.startsWith("A")) return "bg-green-500";
    if (rating.startsWith("B")) return "bg-emerald-500";
    if (rating.startsWith("C")) return "bg-teal-500";
    if (rating.startsWith("D")) return "bg-yellow-500";
    if (rating.startsWith("E")) return "bg-orange-500";
    if (rating.startsWith("F")) return "bg-red-500";
    if (rating === "G") return "bg-red-600";
    return "bg-gray-500"; // Exempt
  };

  return (
    <div className="property-card group">
      {/* Image container */}
      <div className="relative h-48 md:h-60 overflow-hidden">
        <img
          src={property.images[0] || "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80"}
          alt={property.title}
          className="property-image"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {property.isNew && (
            <span className="property-badge bg-estate-primary text-white">
              New
            </span>
          )}
          {property.isFeatured && (
            <span className="property-badge bg-amber-500 text-white">
              Featured
            </span>
          )}
          <span className={`property-badge text-white ${getBerColor(property.bER)}`}>
            BER {property.bER}
          </span>
        </div>

        {/* Price badge */}
        <div className="absolute bottom-3 left-3">
          <div className="bg-white rounded-lg shadow-md px-3 py-1.5 font-semibold text-estate-primary">
            {formatPrice(property.price)}<span className="text-sm font-normal">/month</span>
          </div>
        </div>

        {/* Quick view button */}
        <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white/90 hover:bg-white rounded-full p-2 text-estate-primary shadow-md transition-all duration-200">
            <ArrowUpRight size={18} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-medium text-lg text-estate-dark line-clamp-1 mb-1">
          {property.title}
        </h3>
        <p className="text-estate-medium text-sm mb-3 flex items-center">
          <MapPin size={14} className="inline mr-1 text-estate-primary" />
          {property.address.area}, {property.address.county}
        </p>

        {/* Features */}
        <div className="flex items-center justify-between text-sm text-estate-medium mb-3">
          <div className="flex items-center">
            <Bed size={16} className="mr-1" />
            <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
          </div>
          <div className="flex items-center">
            <Bath size={16} className="mr-1" />
            <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
          </div>
          <div className="flex items-center">
            <Square size={16} className="mr-1" />
            <span>{property.propertySize} m²</span>
          </div>
        </div>

        {/* Available from */}
        <div className="flex items-center text-sm text-estate-medium mt-3 pt-3 border-t border-gray-100">
          <CalendarDays size={16} className="mr-2 text-estate-primary" />
          <span>Available {formatDate(property.availableFrom)}</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
