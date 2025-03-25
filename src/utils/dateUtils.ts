
// Utility functions for date generation

// Get a random date between 1-60 days from now
export const getRandomFutureDate = () => {
  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(today.getDate() + Math.floor(Math.random() * 60) + 1);
  return futureDate.toISOString();
};

// Get a random date between 1-30 days ago
export const getRandomPastDate = () => {
  const today = new Date();
  const pastDate = new Date();
  pastDate.setDate(today.getDate() - Math.floor(Math.random() * 30) - 1);
  return pastDate.toISOString();
};
