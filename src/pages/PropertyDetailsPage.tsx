
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { properties } from "@/data/properties";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyImageCarousel from "@/components/PropertyImageCarousel";
import PropertyMap from "@/components/PropertyMap";
import PropertyFeatures from "@/components/PropertyFeatures";
import { formatCurrency } from "@/utils/propertyUtils";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyStatus } from "@/types/property";

const getStatusBadge = (status: PropertyStatus) => {
  switch (status) {
    case "available":
      return <Badge className="bg-green-500">Available</Badge>;
    case "reserved":
      return <Badge className="bg-amber-500">Reserved</Badge>;
    case "rented":
      return <Badge className="bg-blue-500">Rented</Badge>;
    case "unavailable":
      return <Badge className="bg-red-500">Unavailable</Badge>;
    default:
      return null;
  }
};

const PropertyDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const property = properties.find((p) => p.id === id);

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
            <p className="mb-6">The property you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto py-8 px-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="mb-6"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>

          <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-6">
            <div>
              <h1 className="text-3xl font-bold">{property.title}</h1>
              <p className="text-lg text-muted-foreground mt-1">
                {property.address.street}, {property.address.area}, {property.address.county}
                {property.address.eircode && `, ${property.address.eircode}`}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-3xl font-bold">{formatCurrency(property.price)}</div>
              <div className="text-muted-foreground">per month</div>
              <div className="mt-2">{getStatusBadge(property.status)}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <PropertyImageCarousel images={property.images} title={property.title} />
              
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">About This Property</h2>
                <p className="whitespace-pre-line">{property.description}</p>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Features</h2>
                <PropertyFeatures
                  bedrooms={property.bedrooms}
                  bathrooms={property.bathrooms}
                  propertySize={property.propertySize}
                  features={property.features}
                  bER={property.bER}
                />
              </div>

              {property.virtualTour && (
                <div className="mt-8">
                  <h2 className="text-2xl font-semibold mb-4">Virtual Tour</h2>
                  <Button variant="outline">View Virtual Tour</Button>
                </div>
              )}
            </div>

            <div className="lg:col-span-1 space-y-6">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Property Details</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="font-medium capitalize">{property.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Available From:</span>
                    <span className="font-medium">
                      {format(new Date(property.availableFrom), "dd MMM yyyy")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">BER Rating:</span>
                    <span className="font-medium">
                      {property.bER}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Listed On:</span>
                    <span className="font-medium">
                      {format(new Date(property.createdAt), "dd MMM yyyy")}
                    </span>
                  </div>
                </div>
              </div>

              <PropertyMap address={property.address} />

              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Inquire About This Property</h2>
                <p className="text-muted-foreground mb-4">
                  Interested in this property? Contact our rental specialists for more information or to arrange a viewing.
                </p>
                <Button className="w-full">Contact About This Property</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PropertyDetailsPage;
