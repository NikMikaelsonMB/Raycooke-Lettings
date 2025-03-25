
import { Property, PropertyType } from "@/types/property";
import { getRandomFutureDate, getRandomPastDate } from "@/utils/dateUtils";
import { 
  getRandomImageIndex, 
  selectRandomFeatures, 
  getRandomBERRating 
} from "@/utils/propertyUtils";

// Function to generate a property with sensible defaults
export const generateProperty = (
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
