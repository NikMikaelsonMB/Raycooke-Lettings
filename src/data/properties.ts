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

  // Override the first property with Kavanagh Hall details and uploaded images
  const currentDate = new Date();
  properties[0] = {
    ...properties[0],
    title: "2 Bedroom Apartment in Kavanagh Hall",
    address: {
      street: "Kavanagh Hall",
      area: "Collegewood",
      county: "Dublin",
      eircode: "D15 XP79"
    },
    price: 2023,
    bedrooms: 2,
    bathrooms: 2,
    type: 'apartment',
    images: [
      "/lovable-uploads/76871a04-8f88-478f-8ac3-7c5dd46c1888.png",
      "/lovable-uploads/35d3494f-ef25-408b-9418-118daf1da1c9.png",
      "/lovable-uploads/19c55451-ef8d-4b20-9b85-dcf29d638e6c.png",
      "/lovable-uploads/374052d5-edaa-4d91-b6cc-4ae42b2418d8.png",
      "/lovable-uploads/f4b0ecc4-6ed8-4643-8d6f-ab4abb964c20.png",
      "/lovable-uploads/35533001-6304-4bce-8bb0-d4c25c95e86a.png",
      "/lovable-uploads/fec65e5e-f685-471e-b30e-91ed97c4ffbe.png",
      "/lovable-uploads/dfe62c87-8e8b-474a-bcf5-300a27ed6667.png",
      "/lovable-uploads/53efe8de-fd5f-429f-9044-5b6af9795ffc.png",
      "/lovable-uploads/1b6d7d13-dbd7-4d1a-a835-a1f2ad6fd87d.png"
    ],
    availableFrom: currentDate.toISOString(), // Set to today's date to make it available now
    description: "Beautiful 2 bedroom apartment located in Kavanagh Hall, Collegewood, Castleknock, Dublin 15. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };

  // Override the second property with Kilworth Road details and uploaded images
const currentDate = new Date();
properties[1] = {
  ...properties[1],
  title: "3 Bedroom Apartment in Kilworth Road",
  address: {
    street: "Kilworth Road",
    area: "Drimnagh",
    county: "Dublin 12",
    eircode: "D15 XP79"
  },
  price: 2285,
  bedrooms: 3,
  bathrooms: 2,
  type: 'apartment',
  images: [
    "/pics/2h1.png",
    "/pics/2h2.png",
    "/pics/2h3.png",
    "/pics/2h4.png",
    "/pics/2h5.png",
    "/pics/2h6.png",
    "/pics/2h7.png",
    "/pics/2h8.png",
  ],
  availableFrom: currentDate.toISOString(), // Set to today's date to make it available now
  description: "Beautiful 3 bedroom apartment located in Kilworth Road, Drimnagh,  Dublin 12. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
};

  // Override the third property with Newhaggard details and uploaded images
const currentDate = new Date();
properties[2] = {
  ...properties[2],
  title: "2 Bedroom Apartment in Newhaggard",
  address: {
    street: "Newhaggard",
    area: "Lusk",
    county: "Co.Dublin",
    eircode: "D15 XP79"
  },
  price: 2100,
  bedrooms: 2,
  bathrooms: 1,
  type: 'apartment',
  images: [
    "/pics/3h1.png",
    "/pics/3h2.png",
    "/pics/3h3.png",
    "/pics/3h4.png",
    "/pics/3h5.png",
    "/pics/3h6.png",
    "/pics/3h7.png",
    "/pics/3h8.png",
    "/pics/3h9.png",
  ],
  availableFrom: currentDate.toISOString(), // Set to today's date to make it available now
  description: "Beautiful 2 bedroom apartment located in Newhaggard, Lusk,  Co.Dublin. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
};

  // Override the fourth property with Mayeston Court details and uploaded images
  const currentDate = new Date();
  properties[3] = {
    ...properties[3],
    title: "2 Bedroom Apartment in Mayeston Court",
    address: {
      street: "Mayeston court",
      area: "Mayeston Hall",
      county: "Dublin 11",
      eircode: "D15 XP79"
    },
    price: 2200,
    bedrooms: 2,
    bathrooms: 2,
    type: 'apartment',
    images: [
      "/pics/4h1.png",
      "/pics/4h2.png",
      "/pics/4h3.png",
      "/pics/4h4.png",
      "/pics/4h5.png",
      "/pics/4h6.png",
      "/pics/4h7.png",
      "/pics/4h8.png",
      "/pics/4h9.png",
      "/pics/4h10.png",
    ],
    availableFrom: currentDate.toISOString(), // Set to today's date to make it available now
    description: "Beautiful 2 bedroom apartment located in Mayeston Court, Mayeston hall, Dublin 11. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
  
  // Override the fifth property with Cherrywood Lawns details and uploaded images
const currentDate = new Date();
properties[4] = {
  ...properties[4],
  title: "3 Bedroom Apartment in Kilworth Road",
  address: {
    street: "Cherrywood Lawns",
    area: "Clondalkin",
    county: "Dublin 22",
    eircode: "D15 XP79"
  },
  price: 2032,
  bedrooms: 3,
  bathrooms: 2,
  type: 'apartment',
  images: [
    "/pics/5h1.png",
    "/pics/5h2.png",
    "/pics/5h3.png",
    "/pics/5h4.png",
    "/pics/5h5.png",
    "/pics/5h6.png",
    "/pics/5h7.png",
    "/pics/5h8.png",
    "/pics/5h9.png",
    "/pics/5h10.png",
    "/pics/5h11.png",
  ],
  availableFrom: currentDate.toISOString(), // Set to today's date to make it available now
  description: "Beautiful 3 bedroom apartment located in Cherrywood Lawns, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
};

  // Override the sixth property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[5] = {
    ...properties[5],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
      "/pics/6h1.png",
      "/pics/6h2.png",
      "/pics/6h3.png",
      "/pics/6h4.png",
      "/pics/6h5.png",
      "/pics/6h6.png",
      "/pics/6h7.png",
      "/pics/6h8.png",
      "/pics/6h9.png",
      "/pics/6h10.png",
    ],
    availableFrom: currentDate.toISOString(), // Set to today's date to make it available now
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
  
  // Override the seventh property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[6] = {
    ...properties[6],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
      "/pics/8h1.png",
      "/pics/8h2.png",
      "/pics/8h3.png",
      "/pics/8h4.png",
      "/pics/8h5.png",
      "/pics/8h6.png",
      "/pics/8h7.png",
      "/pics/8h8.png",
      "/pics/8h9.png",
      "/pics/8h10.png",
      "/pics/8h11.png",
      "/pics/8h12.png",
    ],
    availableFrom: currentDate.toISOString(), // Set to today's date to make it available now
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
   
  // Override the eighth property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[7] = {
    ...properties[7],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
      "/pics/7h1.png",
      "/pics/7h2.png",
      "/pics/7h3.png",
      "/pics/7h4.png",
      "/pics/7h5.png",
      "/pics/7h6.png",
      "/pics/7h7.png",
      "/pics/7h8.png",
      "/pics/7h9.png",
      "/pics/7h10.png",
      "/pics/7h11.png",
      "/pics/7h12.png",
    ],
    availableFrom: currentDate.toISOString(), // Set to today's date to make it available now
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
   
  // Override the ninth property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[8] = {
    ...properties[8],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
      "/pics/9h1.png",
      "/pics/9h2.png",
      "/pics/9h3.png",
      "/pics/9h4.png",
      "/pics/9h5.png",
      "/pics/9h6.png",
      "/pics/9h7.png",
      "/pics/9h8.png",
      "/pics/9h9.png",
      "/pics/9h10.png",
      "/pics/9h11.png",
      "/pics/9h12.png",
    ],
    availableFrom: currentDate.toISOString(), // Set to today's date to make it available now
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
   
  // Override the tenth property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[9] = {
    ...properties[9],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
      "/pics/10h1.png",
      "/pics/10h2.png",
      "/pics/10h3.png",
      "/pics/10h4.png",
      "/pics/10h5.png",
      "/pics/10h6.png",
      "/pics/10h7.png",
      "/pics/10h8.png",
      "/pics/10h9.png",
      "/pics/10h10.png",
      "/pics/10h11.png",
      "/pics/10h12.png",
    ],
    availableFrom: currentDate.toISOString(), // Set to today's date to make it available now
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
   
  // Override the eleventh property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[10] = {
    ...properties[10],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
      "/pics/11h1.png",
      "/pics/11h2.png",
      "/pics/11h3.png",
      "/pics/11h4.png",
      "/pics/11h5.png",
      "/pics/11h6.png",
      "/pics/11h7.png",
      "/pics/11h8.png",
      "/pics/11h9.png",
      "/pics/11h10.png",
      "/pics/11h11.png",
      "/pics/11h12.png",
    ],
    availableFrom: currentDate.toISOString(), // Set to today's date to make it available now
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
     
  // Override the twelveth property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[11] = {
    ...properties[11],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/12h1.png",
        "/pics/12h2.png",
        "/pics/12h3.png",
        "/pics/12h4.png",
        "/pics/12h5.png",
        "/pics/12h6.png",
        "/pics/12h7.png",
        "/pics/12h8.png",
        "/pics/12h9.png",
        "/pics/12h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
       
  // Override the thirteenth property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[12] = {
    ...properties[12],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/13h1.png",
        "/pics/13h2.png",
        "/pics/13h3.png",
        "/pics/13h4.png",
        "/pics/13h5.png",
        "/pics/13h6.png",
        "/pics/13h7.png",
        "/pics/13h8.png",
        "/pics/13h9.png",
        "/pics/13h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
         
  // Override the fourteenth property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[13] = {
    ...properties[13],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/14h1.png",
        "/pics/14h2.png",
        "/pics/14h3.png",
        "/pics/14h4.png",
        "/pics/14h5.png",
        "/pics/14h6.png",
        "/pics/14h7.png",
        "/pics/14h8.png",
        "/pics/14h9.png",
        "/pics/14h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
           
  // Override the fifteenth property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[14] = {
    ...properties[14],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/15h1.png",
        "/pics/15h2.png",
        "/pics/15h3.png",
        "/pics/15h4.png",
        "/pics/15h5.png",
        "/pics/15h6.png",
        "/pics/15h7.png",
        "/pics/15h8.png",
        "/pics/15h9.png",
        "/pics/15h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
           
  // Override the sixteenth property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[15] = {
    ...properties[15],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/16h1.png",
        "/pics/16h2.png",
        "/pics/16h3.png",
        "/pics/16h4.png",
        "/pics/16h5.png",
        "/pics/16h6.png",
        "/pics/16h7.png",
        "/pics/16h8.png",
        "/pics/16h9.png",
        "/pics/16h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
           
  // Override the seventeenthth property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[16] = {
    ...properties[16],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/17h1.png",
        "/pics/17h2.png",
        "/pics/17h3.png",
        "/pics/17h4.png",
        "/pics/17h5.png",
        "/pics/17h6.png",
        "/pics/17h7.png",
        "/pics/17h8.png",
        "/pics/17h9.png",
        "/pics/17h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
           
  // Override the eighteenth property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[17] = {
    ...properties[17],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/18h1.png",
        "/pics/18h2.png",
        "/pics/18h3.png",
        "/pics/18h4.png",
        "/pics/18h5.png",
        "/pics/18h6.png",
        "/pics/18h7.png",
        "/pics/18h8.png",
        "/pics/18h9.png",
        "/pics/18h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
           
  // Override the ninteenth property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[18] = {
    ...properties[18],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/19h1.png",
        "/pics/19h2.png",
        "/pics/19h3.png",
        "/pics/19h4.png",
        "/pics/19h5.png",
        "/pics/19h6.png",
        "/pics/19h7.png",
        "/pics/19h8.png",
        "/pics/19h9.png",
        "/pics/19h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
           
  // Override the twentieth property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[19] = {
    ...properties[19],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/20h1.png",
        "/pics/20h2.png",
        "/pics/20h3.png",
        "/pics/20h4.png",
        "/pics/20h5.png",
        "/pics/20h6.png",
        "/pics/20h7.png",
        "/pics/20h8.png",
        "/pics/20h9.png",
        "/pics/20h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
             
  // Override the twenty-first property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[20] = {
    ...properties[20],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/21h1.png",
        "/pics/21h2.png",
        "/pics/21h3.png",
        "/pics/21h4.png",
        "/pics/21h5.png",
        "/pics/21h6.png",
        "/pics/21h7.png",
        "/pics/21h8.png",
        "/pics/21h9.png",
        "/pics/21h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
               
  // Override the twenty-second property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[21] = {
    ...properties[21],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/22h1.png",
        "/pics/22h2.png",
        "/pics/22h3.png",
        "/pics/22h4.png",
        "/pics/22h5.png",
        "/pics/22h6.png",
        "/pics/22h7.png",
        "/pics/22h8.png",
        "/pics/22h9.png",
        "/pics/22h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
               
  // Override the twenty-third property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[22] = {
    ...properties[22],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/23h1.png",
        "/pics/23h2.png",
        "/pics/23h3.png",
        "/pics/23h4.png",
        "/pics/23h5.png",
        "/pics/23h6.png",
        "/pics/23h7.png",
        "/pics/23h8.png",
        "/pics/23h9.png",
        "/pics/23h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
               
  // Override the twenty-fourth property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[23] = {
    ...properties[23],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/24h1.png",
        "/pics/24h2.png",
        "/pics/24h3.png",
        "/pics/24h4.png",
        "/pics/24h5.png",
        "/pics/24h6.png",
        "/pics/24h7.png",
        "/pics/24h8.png",
        "/pics/24h9.png",
        "/pics/24h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
               
  // Override the twenty-fifth property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[24] = {
    ...properties[24],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/25h1.png",
        "/pics/25h2.png",
        "/pics/25h3.png",
        "/pics/25h4.png",
        "/pics/25h5.png",
        "/pics/25h6.png",
        "/pics/25h7.png",
        "/pics/25h8.png",
        "/pics/25h9.png",
        "/pics/25h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
               
  // Override the twenty-sixth property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[25] = {
    ...properties[25],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/26h1.png",
        "/pics/26h2.png",
        "/pics/26h3.png",
        "/pics/26h4.png",
        "/pics/26h5.png",
        "/pics/26h6.png",
        "/pics/26h7.png",
        "/pics/26h8.png",
        "/pics/26h9.png",
        "/pics/26h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
 
  // Override the 27th property with specific details and uploaded images (keep this as is)
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
               
  // Override the 28th property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[27] = {
    ...properties[27],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/28h1.png",
        "/pics/28h2.png",
        "/pics/28h3.png",
        "/pics/28h4.png",
        "/pics/28h5.png",
        "/pics/28h6.png",
        "/pics/28h7.png",
        "/pics/28h8.png",
        "/pics/28h9.png",
        "/pics/28h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
                
  // Override the 29th property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[28] = {
    ...properties[28],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/29h1.png",
        "/pics/29h2.png",
        "/pics/29h3.png",
        "/pics/29h4.png",
        "/pics/29h5.png",
        "/pics/29h6.png",
        "/pics/29h7.png",
        "/pics/29h8.png",
        "/pics/29h9.png",
        "/pics/29h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
                
  // Override the 30th property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[29] = {
    ...properties[29],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/30h1.png",
        "/pics/30h2.png",
        "/pics/30h3.png",
        "/pics/30h4.png",
        "/pics/30h5.png",
        "/pics/30h6.png",
        "/pics/30h7.png",
        "/pics/30h8.png",
        "/pics/30h9.png",
        "/pics/30h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
                
  // Override the 31st property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[30] = {
    ...properties[30],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/31h1.png",
        "/pics/31h2.png",
        "/pics/31h3.png",
        "/pics/31h4.png",
        "/pics/31h5.png",
        "/pics/31h6.png",
        "/pics/31h7.png",
        "/pics/31h8.png",
        "/pics/31h9.png",
        "/pics/31h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
                
  // Override the 32nd property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[31] = {
    ...properties[31],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/32h1.png",
        "/pics/32h2.png",
        "/pics/32h3.png",
        "/pics/32h4.png",
        "/pics/32h5.png",
        "/pics/32h6.png",
        "/pics/32h7.png",
        "/pics/32h8.png",
        "/pics/32h9.png",
        "/pics/32h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
                
  // Override the 33rd property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[32] = {
    ...properties[32],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/33h1.png",
        "/pics/33h2.png",
        "/pics/33h3.png",
        "/pics/33h4.png",
        "/pics/33h5.png",
        "/pics/33h6.png",
        "/pics/33h7.png",
        "/pics/33h8.png",
        "/pics/33h9.png",
        "/pics/33h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
                
  // Override the 34th property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[33] = {
    ...properties[33],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/34h1.png",
        "/pics/34h2.png",
        "/pics/34h3.png",
        "/pics/34h4.png",
        "/pics/34h5.png",
        "/pics/34h6.png",
        "/pics/34h7.png",
        "/pics/34h8.png",
        "/pics/34h9.png",
        "/pics/34h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
                 
  // Override the 35th property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[34] = {
    ...properties[34],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/35h1.png",
        "/pics/35h2.png",
        "/pics/35h3.png",
        "/pics/35h4.png",
        "/pics/35h5.png",
        "/pics/35h6.png",
        "/pics/35h7.png",
        "/pics/35h8.png",
        "/pics/35h9.png",
        "/pics/35h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
                
  // Override the 36th property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[35] = {
    ...properties[35],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/36h1.png",
        "/pics/36h2.png",
        "/pics/36h3.png",
        "/pics/36h4.png",
        "/pics/36h5.png",
        "/pics/36h6.png",
        "/pics/36h7.png",
        "/pics/36h8.png",
        "/pics/36h9.png",
        "/pics/36h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
                  
  // Override the 37th property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[36] = {
    ...properties[36],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/37h1.png",
        "/pics/37h2.png",
        "/pics/37h3.png",
        "/pics/37h4.png",
        "/pics/37h5.png",
        "/pics/37h6.png",
        "/pics/37h7.png",
        "/pics/37h8.png",
        "/pics/37h9.png",
        "/pics/37h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
                 
  // Override the 38th property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[37] = {
    ...properties[37],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/38h1.png",
        "/pics/38h2.png",
        "/pics/38h3.png",
        "/pics/38h4.png",
        "/pics/38h5.png",
        "/pics/38h6.png",
        "/pics/38h7.png",
        "/pics/38h8.png",
        "/pics/38h9.png",
        "/pics/38h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
                 
  // Override the 39th property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[38] = {
    ...properties[38],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/39h1.png",
        "/pics/39h2.png",
        "/pics/39h3.png",
        "/pics/39h4.png",
        "/pics/39h5.png",
        "/pics/39h6.png",
        "/pics/39h7.png",
        "/pics/39h8.png",
        "/pics/39h9.png",
        "/pics/39h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
                 
  // Override the 40th property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[39] = {
    ...properties[39],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/40h1.png",
        "/pics/40h2.png",
        "/pics/40h3.png",
        "/pics/40h4.png",
        "/pics/40h5.png",
        "/pics/40h6.png",
        "/pics/40h7.png",
        "/pics/40h8.png",
        "/pics/40h9.png",
        "/pics/40h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
                 
  // Override the 41st property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[40] = {
    ...properties[40],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/41h1.png",
        "/pics/41h2.png",
        "/pics/41h3.png",
        "/pics/41h4.png",
        "/pics/41h5.png",
        "/pics/41h6.png",
        "/pics/41h7.png",
        "/pics/41h8.png",
        "/pics/41h9.png",
        "/pics/41h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
                  
  // Override the 42nd property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[41] = {
    ...properties[41],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/42h1.png",
        "/pics/42h2.png",
        "/pics/42h3.png",
        "/pics/42h4.png",
        "/pics/42h5.png",
        "/pics/42h6.png",
        "/pics/42h7.png",
        "/pics/42h8.png",
        "/pics/42h9.png",
        "/pics/42h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
                  
  // Override the 43rd property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[42] = {
    ...properties[42],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/43h1.png",
        "/pics/43h2.png",
        "/pics/43h3.png",
        "/pics/43h4.png",
        "/pics/43h5.png",
        "/pics/43h6.png",
        "/pics/43h7.png",
        "/pics/43h8.png",
        "/pics/43h9.png",
        "/pics/43h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
                  
  // Override the 44th property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[43] = {
    ...properties[43],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/44h1.png",
        "/pics/44h2.png",
        "/pics/44h3.png",
        "/pics/44h4.png",
        "/pics/44h5.png",
        "/pics/44h6.png",
        "/pics/44h7.png",
        "/pics/44h8.png",
        "/pics/44h9.png",
        "/pics/44h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
                  
  // Override the 45th property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[44] = {
    ...properties[44],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/45h1.png",
        "/pics/45h2.png",
        "/pics/45h3.png",
        "/pics/45h4.png",
        "/pics/45h5.png",
        "/pics/45h6.png",
        "/pics/45h7.png",
        "/pics/45h8.png",
        "/pics/45h9.png",
        "/pics/45h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
                  
  // Override the 46th property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[45] = {
    ...properties[45],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/46h1.png",
        "/pics/46h2.png",
        "/pics/46h3.png",
        "/pics/46h4.png",
        "/pics/46h5.png",
        "/pics/46h6.png",
        "/pics/46h7.png",
        "/pics/46h8.png",
        "/pics/46h9.png",
        "/pics/46h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
                  
  // Override the 47th property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[46] = {
    ...properties[46],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/47h1.png",
        "/pics/47h2.png",
        "/pics/47h3.png",
        "/pics/47h4.png",
        "/pics/47h5.png",
        "/pics/47h6.png",
        "/pics/47h7.png",
        "/pics/47h8.png",
        "/pics/47h9.png",
        "/pics/47h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
                  
  // Override the 48th property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[47] = {
    ...properties[47],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/48h1.png",
        "/pics/48h2.png",
        "/pics/48h3.png",
        "/pics/48h4.png",
        "/pics/48h5.png",
        "/pics/48h6.png",
        "/pics/48h7.png",
        "/pics/48h8.png",
        "/pics/48h9.png",
        "/pics/48h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
                  
  // Override the 49th property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[48] = {
    ...properties[48],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/49h1.png",
        "/pics/49h2.png",
        "/pics/49h3.png",
        "/pics/49h4.png",
        "/pics/49h5.png",
        "/pics/49h6.png",
        "/pics/49h7.png",
        "/pics/49h8.png",
        "/pics/49h9.png",
        "/pics/49h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
                  
  // Override the 50th property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[49] = {
    ...properties[49],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/50h1.png",
        "/pics/50h2.png",
        "/pics/50h3.png",
        "/pics/50h4.png",
        "/pics/50h5.png",
        "/pics/50h6.png",
        "/pics/50h7.png",
        "/pics/50h8.png",
        "/pics/50h9.png",
        "/pics/50h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
                  
  // Override the 51st property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[50] = {
    ...properties[50],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/51h1.png",
        "/pics/51h2.png",
        "/pics/51h3.png",
        "/pics/51h4.png",
        "/pics/51h5.png",
        "/pics/51h6.png",
        "/pics/51h7.png",
        "/pics/51h8.png",
        "/pics/51h9.png",
        "/pics/51h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
                  
  // Override the 52nd property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[51] = {
    ...properties[51],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/52h1.png",
        "/pics/52h2.png",
        "/pics/52h3.png",
        "/pics/52h4.png",
        "/pics/52h5.png",
        "/pics/52h6.png",
        "/pics/52h7.png",
        "/pics/52h8.png",
        "/pics/52h9.png",
        "/pics/52h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
                  
  // Override the 53rd property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[52] = {
    ...properties[52],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/53h1.png",
        "/pics/53h2.png",
        "/pics/53h3.png",
        "/pics/53h4.png",
        "/pics/53h5.png",
        "/pics/53h6.png",
        "/pics/53h7.png",
        "/pics/53h8.png",
        "/pics/53h9.png",
        "/pics/53h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
                  
  // Override the 54th property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[53] = {
    ...properties[53],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/54h1.png",
        "/pics/54h2.png",
        "/pics/54h3.png",
        "/pics/54h4.png",
        "/pics/54h5.png",
        "/pics/54h6.png",
        "/pics/54h7.png",
        "/pics/54h8.png",
        "/pics/54h9.png",
        "/pics/54h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
                  
  // Override the 55th property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[54] = {
    ...properties[54],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/55h1.png",
        "/pics/5h2.png",
        "/pics/55h3.png",
        "/pics/55h4.png",
        "/pics/55h5.png",
        "/pics/55h6.png",
        "/pics/55h7.png",
        "/pics/55h8.png",
        "/pics/55h9.png",
        "/pics/55h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
                  
  // Override the 56th property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[55] = {
    ...properties[55],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/56h1.png",
        "/pics/56h2.png",
        "/pics/56h3.png",
        "/pics/56h4.png",
        "/pics/56h5.png",
        "/pics/56h6.png",
        "/pics/56h7.png",
        "/pics/56h8.png",
        "/pics/56h9.png",
        "/pics/56h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
                  
  // Override the 57th property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[56] = {
    ...properties[56],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/57h1.png",
        "/pics/57h2.png",
        "/pics/57h3.png",
        "/pics/57h4.png",
        "/pics/57h5.png",
        "/pics/57h6.png",
        "/pics/57h7.png",
        "/pics/57h8.png",
        "/pics/57h9.png",
        "/pics/57h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
                  
  // Override the 58th property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[57] = {
    ...properties[57],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/58h1.png",
        "/pics/58h2.png",
        "/pics/58h3.png",
        "/pics/58h4.png",
        "/pics/58h5.png",
        "/pics/58h6.png",
        "/pics/58h7.png",
        "/pics/58h8.png",
        "/pics/58h9.png",
        "/pics/58h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
                  
  // Override the 59th property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[58] = {
    ...properties[58],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/59h1.png",
        "/pics/59h2.png",
        "/pics/59h3.png",
        "/pics/59h4.png",
        "/pics/59h5.png",
        "/pics/59h6.png",
        "/pics/59h7.png",
        "/pics/59h8.png",
        "/pics/59h9.png",
        "/pics/59h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
                  
  // Override the 60th property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[59] = {
    ...properties[59],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/60h1.png",
        "/pics/60h2.png",
        "/pics/60h3.png",
        "/pics/60h4.png",
        "/pics/60h5.png",
        "/pics/60h6.png",
        "/pics/60h7.png",
        "/pics/60h8.png",
        "/pics/60h9.png",
        "/pics/60h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
                  
  // Override the 61st property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[60] = {
    ...properties[60],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/61h1.png",
        "/pics/61h2.png",
        "/pics/61h3.png",
        "/pics/61h4.png",
        "/pics/61h5.png",
        "/pics/61h6.png",
        "/pics/61h7.png",
        "/pics/61h8.png",
        "/pics/61h9.png",
        "/pics/61h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
                  
  // Override the 62nd property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[61] = {
    ...properties[61],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/62h1.png",
        "/pics/62h2.png",
        "/pics/62h3.png",
        "/pics/62h4.png",
        "/pics/62h5.png",
        "/pics/62h6.png",
        "/pics/62h7.png",
        "/pics/62h8.png",
        "/pics/62h9.png",
        "/pics/62h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
                  
  // Override the 63rd property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[62] = {
    ...properties[62],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/63h1.png",
        "/pics/63h2.png",
        "/pics/63h3.png",
        "/pics/63h4.png",
        "/pics/63h5.png",
        "/pics/63h6.png",
        "/pics/63h7.png",
        "/pics/63h8.png",
        "/pics/63h9.png",
        "/pics/63h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
                  
  // Override the 64th property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[63] = {
    ...properties[63],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/64h1.png",
        "/pics/64h2.png",
        "/pics/64h3.png",
        "/pics/64h4.png",
        "/pics/64h5.png",
        "/pics/64h6.png",
        "/pics/64h7.png",
        "/pics/64h8.png",
        "/pics/64h9.png",
        "/pics/64h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
                  
  // Override the 65th property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[64] = {
    ...properties[64],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/65h1.png",
        "/pics/65h2.png",
        "/pics/65h3.png",
        "/pics/65h4.png",
        "/pics/65h5.png",
        "/pics/65h6.png",
        "/pics/65h7.png",
        "/pics/65h8.png",
        "/pics/65h9.png",
        "/pics/65h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
                  
  // Override the 66th property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[65] = {
    ...properties[65],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/66h1.png",
        "/pics/66h2.png",
        "/pics/66h3.png",
        "/pics/66h4.png",
        "/pics/66h5.png",
        "/pics/66h6.png",
        "/pics/66h7.png",
        "/pics/66h8.png",
        "/pics/66h9.png",
        "/pics/66h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
                  
  // Override the 67th property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[66] = {
    ...properties[66],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/67h1.png",
        "/pics/67h2.png",
        "/pics/67h3.png",
        "/pics/67h4.png",
        "/pics/67h5.png",
        "/pics/67h6.png",
        "/pics/67h7.png",
        "/pics/67h8.png",
        "/pics/67h9.png",
        "/pics/67h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
                  
  // Override the 68th property with Grange view Road details and uploaded images
  const currentDate = new Date();
  properties[67] = {
    ...properties[67],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/68h1.png",
        "/pics/68h2.png",
        "/pics/68h3.png",
        "/pics/68h4.png",
        "/pics/68h5.png",
        "/pics/68h6.png",
        "/pics/68h7.png",
        "/pics/68h8.png",
        "/pics/68h9.png",
        "/pics/68h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
                  
  // Override the 69th property with Grange view Road details and uploaded images
  const exactDate = new Date(2023, 11, 15);
  properties[68] = {
    ...properties[68],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/69h1.png",
        "/pics/69h2.png",
        "/pics/69h3.png",
        "/pics/69h4.png",
        "/pics/69h5.png",
        "/pics/69h6.png",
        "/pics/69h7.png",
        "/pics/69h8.png",
        "/pics/69h9.png",
        "/pics/69h10.png",
    ],
    availableFrom: exactDate.toISOString(),
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
                  
  // Override the 70th property with Grange view Road details and uploaded images
  const exactDate = new Date(2025, 11, 25, 15, 30, 0, 0);
  properties[69] = {
    ...properties[69],
    title: "3 Bedroom Apartment in Grange view Road",
    address: {
      street: "Grange view Road",
      area: "Clondalkin",
      county: "Dublin 22",
      eircode: "D15 XP79"
    },
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: [
        "/pics/70h1.png",
        "/pics/70h2.png",
        "/pics/70h3.png",
        "/pics/70h4.png",
        "/pics/70h5.png",
        "/pics/70h6.png",
        "/pics/70h7.png",
        "/pics/70h8.png",
        "/pics/70h9.png",
        "/pics/70h10.png",
    ],
    availableFrom: "2023-11-15T12:00:00.000Z",
    description: "Beautiful 3 bedroom apartment located in Grange view Road, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a balcony. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };
 
  return properties;
};

export const properties = generateProperties();
