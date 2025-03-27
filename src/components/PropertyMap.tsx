
import React from "react";
import { Map } from "lucide-react";

interface PropertyMapProps {
  address: {
    street: string;
    area: string;
    county: string;
    eircode?: string;
  };
}

const PropertyMap = ({ address }: PropertyMapProps) => {
  const addressString = `${address.street}, ${address.area}, ${address.county}${address.eircode ? `, ${address.eircode}` : ''}`;

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6 flex flex-col items-center justify-center min-h-[300px] bg-muted/20">
        <Map className="h-16 w-16 mb-4 text-muted-foreground" />
        <p className="text-center text-sm text-muted-foreground">
          This property is located at:
          <br />
          <span className="font-semibold text-foreground">{addressString}</span>
        </p>
        <p className="mt-4 text-xs text-muted-foreground">
          A more detailed map integration can be added later
        </p>
      </div>
    </div>
  );
};

export default PropertyMap;
