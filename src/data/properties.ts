
import { Property, PropertyType } from "@/types/property";
import { generateProperty } from "@/utils/propertyGenerator";
import { dublinAreas, otherAreas } from "@/data/propertyLocations";
import { propertyTypes } from "@/data/propertyTypes";

// Generate 70 properties
const generateProperties = (): Property[] => {
  const properties: Property[] = [];

  for (let i = 1; i <= 70; i++) {
    // Decide if it's in Dublin (60% chance) or another county
    const isInDublin = Math.random() < 0.6;
    
    let area, county;
    if (isInDublin) {
      county = 'Dublin';
      area = dublinAreas[Math.floor(Math.random() * dublinAreas.length)];
    } else {
      // Select a random county
      const counties = Object.keys(otherAreas);
      county = counties[Math.floor(Math.random() * counties.length)];
      // Select a random area within that county
      const areas = otherAreas[county as keyof typeof otherAreas];
      area = areas[Math.floor(Math.random() * areas.length)];
    }

    // Generate random property attributes
    const propertyType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
    const bedrooms = propertyType === 'studio' ? 0 : Math.floor(Math.random() * 4) + 1;
    const bathrooms = Math.max(1, Math.floor(bedrooms * 0.7) + (Math.random() > 0.7 ? 1 : 0));
    
    // Price range based on property type and location (in euros per month)
    let basePrice = 0;
    if (propertyType === 'apartment') basePrice = 1800;
    else if (propertyType === 'house') basePrice = 2200;
    else if (propertyType === 'studio') basePrice = 1400;
    else if (propertyType === 'duplex') basePrice = 2000;
    else if (propertyType === 'penthouse') basePrice = 3500;
    else if (propertyType === 'bungalow') basePrice = 2300;
    else if (propertyType === 'cottage') basePrice = 1900;
    else if (propertyType === 'farmhouse') basePrice = 2400;
    else if (propertyType === 'villa') basePrice = 3000;
    else if (propertyType === 'land') basePrice = 1000;
    
    // Adjust price based on bedrooms and location
    let price = basePrice + (bedrooms * 300);
    if (county === 'Dublin') price *= 1.3;
    if (area === 'Ballsbridge' || area === 'Dalkey' || area === 'Blackrock') price *= 1.2;
    
    // Add some randomness to price (±10%)
    price = Math.round(price * (0.9 + Math.random() * 0.2));
    
    // Property size in square meters
    let size;
    if (propertyType === 'studio') size = Math.floor(Math.random() * 20) + 35;
    else if (propertyType === 'apartment') size = Math.floor(Math.random() * 30) + 60;
    else if (propertyType === 'house') size = Math.floor(Math.random() * 50) + 100;
    else if (propertyType === 'penthouse') size = Math.floor(Math.random() * 40) + 120;
    else if (propertyType === 'land') size = Math.floor(Math.random() * 5000) + 1000;
    else size = Math.floor(Math.random() * 40) + 80;
    
    // Featured properties (10% chance)
    const isFeatured = Math.random() < 0.1;
    
    // New listings (15% chance)
    const isNew = Math.random() < 0.15;
    
    // Generate property title
    const titlePrefix = [
      'Charming', 'Luxurious', 'Modern', 'Spacious', 'Cozy', 'Elegant', 
      'Stylish', 'Beautiful', 'Stunning', 'Delightful', 'Impressive'
    ][Math.floor(Math.random() * 11)];
    
    let title;
    if (propertyType === 'studio') {
      title = `${titlePrefix} Studio Apartment in ${area}`;
    } else {
      title = `${titlePrefix} ${bedrooms} Bedroom ${propertyType.charAt(0).toUpperCase() + propertyType.slice(1)} in ${area}`;
    }
    
    // Create the property
    const property = generateProperty(
      i,
      title,
      propertyType,
      area,
      county,
      price,
      bedrooms,
      bathrooms,
      size,
      isFeatured,
      isNew
    );
    
    properties.push(property);
  }

  // Override the 27th property with specific details and uploaded images
  const currentDate = new Date();
  properties[26] = {
    ...properties[26],
    title: "3 Bedroom House in Lindisfarne Green",
    address: {
      street: "Lindisfarne Green",
      area: "Clondalkin",
      county: "Dublin",
      eircode: "D22 XY12"
    },
    price: 2062,
    bedrooms: 3,
    bathrooms: 2,
    images: [
      "/lovable-uploads/ec691cde-8649-4615-ad19-d1d2b7aeb70d.png",
      "/lovable-uploads/49be0573-126b-48ab-99bf-8f0b9bb456dc.png",
      "/lovable-uploads/9da60255-cd39-400c-81a9-395a2980f29f.png",
      "/lovable-uploads/2c020fb7-da9a-4f72-9ec6-41d24addde9b.png",
      "/lovable-uploads/dcb4c550-3a0d-482c-960e-16ad3108af0b.png",
      "/lovable-uploads/3fad96f6-aabf-4670-be15-b7dc07f436ed.png",
      "/lovable-uploads/79b5d8d0-9e9d-4181-be9c-bd87eee1534d.png",
      "/lovable-uploads/9a39ba61-85e5-42cf-b690-3cef6487fdd0.png",
      "/lovable-uploads/3daf9873-08e3-4eb1-920c-d71cdd4863d7.png"
    ],
    availableFrom: currentDate.toISOString(), // Set to today's date to make it available now
    description: "Beautiful 3 bedroom house located in Lindisfarne Green, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a well-maintained garden. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };

  return properties;
};

export const properties = generateProperties();
