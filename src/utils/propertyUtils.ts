
// Utility functions for property generation

// Get random image index for property
export const getRandomImageIndex = () => {
  return Math.floor(Math.random() * 5) + 1;
};

// Common features for properties
export const commonFeatures = [
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
export const selectRandomFeatures = () => {
  const numFeatures = Math.floor(Math.random() * 8) + 3; // 3-10 features
  const shuffled = [...commonFeatures].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numFeatures);
};

// BER ratings with weighted distribution
export const berRatings = [
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
export const getRandomBERRating = () => {
  const index = Math.floor(Math.random() * berRatings.length);
  return berRatings[index];
};
