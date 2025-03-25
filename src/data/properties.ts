import { Property, PropertyType } from "@/types/property";

// Function to generate a property with sensible defaults
const generateProperty = (
  id: number,
  title: string,
  type: PropertyType,
  area: string,
  county: string,
  price: number,
  bedrooms: number,
  bathrooms: number,
  size: number,
  isFeatured: boolean = false,
  isNew: boolean = false
): Property => {
  // Get a random date between 1-60 days from now
  const getRandomFutureDate = () => {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + Math.floor(Math.random() * 60) + 1);
    return futureDate.toISOString();
  };

  // Get a random date between 1-30 days ago
  const getRandomPastDate = () => {
    const today = new Date();
    const pastDate = new Date();
    pastDate.setDate(today.getDate() - Math.floor(Math.random() * 30) - 1);
    return pastDate.toISOString();
  };

  // Get random image index for property
  const getRandomImageIndex = () => {
    return Math.floor(Math.random() * 5) + 1;
  };

  // Create a list of common features
  const commonFeatures = [
    'Gas Central Heating',
    'Double Glazed Windows',
    'Private Parking',
    'Garden/Patio',
    'Dishwasher',
    'Washing Machine',
    'Dryer',
    'Furnished',
    'Security System',
    'High-Speed Internet',
    'Cable TV',
    'Pet Friendly',
    'Recently Renovated',
    'Close to Public Transport',
    'Built-in Wardrobes',
    'Wooden Floors',
    'Smart Home Features',
    'Gym Access',
    'Bicycle Storage',
    'Concierge Service'
  ];

  // Select random features
  const selectRandomFeatures = () => {
    const numFeatures = Math.floor(Math.random() * 8) + 3; // 3-10 features
    const shuffled = [...commonFeatures].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numFeatures);
  };

  // BER ratings with weighted distribution (more common ones appear more frequently)
  const berRatings = [
    'A1', 'A2', 'A2', 'A3', 'A3', 'A3',
    'B1', 'B1', 'B1', 'B2', 'B2', 'B2', 'B2', 'B3', 'B3', 'B3', 'B3',
    'C1', 'C1', 'C1', 'C1', 'C1', 'C2', 'C2', 'C2', 'C2', 'C3', 'C3', 'C3',
    'D1', 'D1', 'D1', 'D2', 'D2',
    'E1', 'E2',
    'F',
    'G',
    'Exempt'
  ];

  // Select random BER rating
  const getRandomBERRating = () => {
    const index = Math.floor(Math.random() * berRatings.length);
    return berRatings[index] as Property['bER'];
  };

  return {
    id: `prop-${id.toString().padStart(3, '0')}`,
    title,
    type,
    address: {
      street: `${Math.floor(Math.random() * 100) + 1} ${['Main', 'Oak', 'Maple', 'Cedar', 'Park', 'Hill', 'River', 'Lake', 'Forest', 'Valley', 'Mountain', 'Ocean', 'Bay', 'Harbor', 'Port'][Math.floor(Math.random() * 15)]} ${['Street', 'Avenue', 'Road', 'Lane', 'Drive', 'Boulevard', 'Way', 'Place', 'Court', 'Terrace'][Math.floor(Math.random() * 10)]}`,
      area,
      county,
      eircode: `D${Math.floor(Math.random() * 24) + 1} ${['AB', 'CD', 'EF', 'GH', 'IJ', 'KL', 'MN', 'OP', 'QR', 'ST', 'UV', 'WX', 'YZ'][Math.floor(Math.random() * 13)]}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`
    },
    price,
    bedrooms,
    bathrooms,
    propertySize: size,
    description: `Beautiful ${bedrooms} bedroom ${type} located in the heart of ${area}, ${county}. This property offers spacious accommodation throughout and is presented in excellent condition. ${Math.random() > 0.5 ? 'Recently renovated with modern finishes.' : 'Featuring classic architectural elements with plenty of character.'} ${Math.random() > 0.5 ? 'Close to local amenities including shops, schools, and public transport.' : 'Situated in a quiet neighborhood with easy access to the city center.'} ${Math.random() > 0.5 ? 'The property benefits from ample natural light and generous proportions.' : 'Cozy and well-insulated, perfect for Irish weather conditions.'} Available for immediate viewing.`,
    features: selectRandomFeatures(),
    availableFrom: getRandomFutureDate(),
    status: 'available',
    images: Array(Math.floor(Math.random() * 3) + 3).fill(0).map(() => `/property-${getRandomImageIndex()}.jpg`),
    bER: getRandomBERRating(),
    isFeatured,
    isNew,
    virtualTour: Math.random() > 0.7 ? 'https://my.matterport.com/show/?m=soLR3BK6STT' : undefined,
    createdAt: getRandomPastDate()
  };
};

// Popular Dublin areas
const dublinAreas = [
  'Ballsbridge', 'Blackrock', 'Clontarf', 'Dalkey', 'Dun Laoghaire', 
  'Howth', 'Malahide', 'Raheny', 'Ranelagh', 'Rathgar', 'Rathmines', 
  'Sandymount', 'Stepaside', 'Sutton', 'Castleknock', 'Lucan', 'Swords'
];

// Popular areas in other Irish counties
const otherAreas = {
  'Cork': ['Douglas', 'Ballincollig', 'Carrigaline', 'Cobh', 'Midleton'],
  'Galway': ['Salthill', 'Oranmore', 'Barna', 'Knocknacarra'],
  'Limerick': ['Castletroy', 'Dooradoyle', 'Raheen', 'Ennis Road'],
  'Kildare': ['Naas', 'Newbridge', 'Celbridge', 'Maynooth'],
  'Wicklow': ['Bray', 'Greystones', 'Wicklow Town', 'Arklow'],
  'Meath': ['Navan', 'Ashbourne', 'Dunboyne', 'Trim'],
  'Louth': ['Dundalk', 'Drogheda', 'Ardee'],
  'Wexford': ['Wexford Town', 'Gorey', 'Enniscorthy', 'New Ross'],
  'Waterford': ['Waterford City', 'Tramore', 'Dungarvan', 'Dunmore East']
};

// Property types with weighted distribution (more common types appear more frequently)
const propertyTypes: PropertyType[] = [
  'apartment', 'apartment', 'apartment', 'apartment',
  'house', 'house', 'house', 'house', 'house',
  'studio', 'studio',
  'duplex', 'duplex',
  'penthouse',
  'bungalow', 'bungalow',
  'cottage',
  'farmhouse',
  'villa',
  'land'
];

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

  // Override the 27th property with specific details
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
    description: "Beautiful 3 bedroom house located in Lindisfarne Green, Clondalkin, Dublin 22. This property offers spacious accommodation throughout and is presented in excellent condition. Features include a modern kitchen, comfortable living areas, and a well-maintained garden. Close to local amenities including shops, schools, and public transport. Available for immediate viewing."
  };

  return properties;
};

export const properties = generateProperties();
