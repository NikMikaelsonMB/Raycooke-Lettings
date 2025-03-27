
import { BERRating } from "@/types/property";

// Format currency for displaying prices
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(amount);
};

// Generate random image indices for properties
export const getRandomImageIndex = (): number => {
  return Math.floor(Math.random() * 20) + 1; // Assuming 20 property images are available
};

// Define common property features
const commonFeatures = [
  "Parking",
  "Garden",
  "Central Heating",
  "Double Glazing",
  "Alarm System",
  "Furnished",
  "Pets Allowed",
  "Washer/Dryer",
  "Dishwasher",
  "Balcony",
  "Patio",
  "Garage",
  "Storage",
  "High Ceilings",
  "Wooden Floors",
  "Fireplace",
  "CCTV",
  "Gym",
  "Swimming Pool",
  "Concierge",
  "Elevator",
  "Wheelchair Access",
  "Electric Vehicle Charging",
  "Solar Panels",
  "Roof Terrace",
  "Home Office",
  "Smart Home System"
];

// Select a random subset of features for a property
export const selectRandomFeatures = (): string[] => {
  const features: string[] = [];
  const numFeatures = Math.floor(Math.random() * 6) + 3; // 3-8 features
  
  // Create a copy of the commonFeatures array to avoid modifying the original
  const availableFeatures = [...commonFeatures];
  
  for (let i = 0; i < numFeatures; i++) {
    if (availableFeatures.length === 0) break;
    
    const index = Math.floor(Math.random() * availableFeatures.length);
    features.push(availableFeatures[index]);
    availableFeatures.splice(index, 1); // Remove the feature to avoid duplicates
  }
  
  return features;
};

// Generate a random BER (Building Energy Rating)
export const getRandomBERRating = (): BERRating => {
  const ratings: BERRating[] = [
    'A1', 'A2', 'A3', 
    'B1', 'B2', 'B3', 
    'C1', 'C2', 'C3', 
    'D1', 'D2', 
    'E1', 'E2', 
    'F', 
    'G', 
    'Exempt'
  ];
  
  // Weighted distribution - more likely to get B, C, or D ratings
  const weights = [
    1, 2, 3,     // A ratings (less common)
    10, 15, 20,  // B ratings
    20, 15, 10,  // C ratings
    10, 8,       // D ratings
    5, 3,        // E ratings
    2,           // F rating
    1,           // G rating
    3            // Exempt
  ];
  
  // Calculate total weight
  const totalWeight = weights.reduce((acc, weight) => acc + weight, 0);
  
  // Generate a random number between 0 and totalWeight
  let random = Math.floor(Math.random() * totalWeight);
  
  // Find the corresponding rating based on the weights
  for (let i = 0; i < weights.length; i++) {
    random -= weights[i];
    if (random < 0) {
      return ratings[i];
    }
  }
  
  // Default fallback
  return 'C1';
};
