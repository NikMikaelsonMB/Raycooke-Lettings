
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Property, PropertyStatus } from "@/types/property";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { formatCurrency } from "@/utils/propertyUtils";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const mainImage = property.images[0] || "/placeholder.svg";

  const getStatusBadge = (status: PropertyStatus) => {
    switch (status) {
      case "available":
        return <Badge className="absolute top-2 right-2 bg-green-500">Available</Badge>;
      case "reserved":
        return <Badge className="absolute top-2 right-2 bg-amber-500">Reserved</Badge>;
      case "rented":
        return <Badge className="absolute top-2 right-2 bg-blue-500">Rented</Badge>;
      case "unavailable":
        return <Badge className="absolute top-2 right-2 bg-red-500">Unavailable</Badge>;
      default:
        return null;
    }
  };

  return (
    <Link to={`/property/${property.id}`}>
      <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative">
          <AspectRatio ratio={16 / 9}>
            <img
              src={mainImage}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </AspectRatio>
          {getStatusBadge(property.status)}
          {property.isFeatured && (
            <Badge className="absolute top-2 left-2 bg-primary">Featured</Badge>
          )}
          {property.isNew && (
            <Badge
              className="absolute bottom-2 left-2 bg-black text-white"
              variant="outline"
            >
              New
            </Badge>
          )}
        </div>
        <CardContent className="pt-4">
          <h3 className="text-lg font-semibold line-clamp-1">{property.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
            {property.address.street}, {property.address.area}
          </p>
          <div className="mt-3 font-bold text-xl">{formatCurrency(property.price)}</div>
          <div className="flex items-center mt-3 text-sm text-muted-foreground">
            <div className="flex items-center mr-4">
              <span className="font-medium mr-1">{property.bedrooms}</span> beds
            </div>
            <div className="flex items-center mr-4">
              <span className="font-medium mr-1">{property.bathrooms}</span> baths
            </div>
            <div className="flex items-center">
              <span className="font-medium mr-1">{property.propertySize}</span> m²
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <div className="flex justify-between items-center w-full text-sm text-muted-foreground">
            <div className="capitalize">{property.type}</div>
            <Badge variant="outline">{property.bER}</Badge>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PropertyCard;
