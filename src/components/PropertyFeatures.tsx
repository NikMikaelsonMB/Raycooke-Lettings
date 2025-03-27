
import React from "react";
import { Badge } from "@/components/ui/badge";
import { BERRating } from "@/types/property";

interface PropertyFeaturesProps {
  bedrooms: number;
  bathrooms: number;
  propertySize: number;
  features: string[];
  bER: BERRating;
}

const PropertyFeatures = ({
  bedrooms,
  bathrooms,
  propertySize,
  features,
  bER,
}: PropertyFeaturesProps) => {
  // Function to get BER rating color
  const getBERColor = (rating: BERRating): string => {
    if (rating.startsWith("A")) return "bg-green-500";
    if (rating.startsWith("B")) return "bg-lime-500";
    if (rating.startsWith("C")) return "bg-yellow-500";
    if (rating.startsWith("D")) return "bg-orange-500";
    if (rating.startsWith("E")) return "bg-red-400";
    if (rating.startsWith("F")) return "bg-red-500";
    if (rating === "G") return "bg-red-600";
    return "bg-gray-500"; // For "Exempt" or any other value
  };

  return (
    <div className="mt-4 space-y-4">
      <div className="flex flex-wrap gap-3">
        <Badge variant="outline" className="flex items-center gap-1">
          <span className="font-semibold">{bedrooms}</span> Bedroom{bedrooms !== 1 ? "s" : ""}
        </Badge>
        <Badge variant="outline" className="flex items-center gap-1">
          <span className="font-semibold">{bathrooms}</span> Bathroom{bathrooms !== 1 ? "s" : ""}
        </Badge>
        <Badge variant="outline">
          {propertySize} m²
        </Badge>
        <Badge className={`${getBERColor(bER)} text-white`}>
          BER {bER}
        </Badge>
      </div>
      
      {features.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Features</h3>
          <div className="flex flex-wrap gap-2">
            {features.map((feature, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyFeatures;
