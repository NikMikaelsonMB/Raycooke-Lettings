
import React, { useState } from "react";
import { Search, X, Download } from "lucide-react";
import { toast } from "sonner";

interface ImageSearchProps {
  onSelectImage?: (imageUrl: string) => void;
  showSelector?: boolean;
}

const ImageSearch = ({ onSelectImage, showSelector = true }: ImageSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Array<{ link: string; title: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // For demo purposes, we're using a mock search function
  const searchImages = async (query: string) => {
    setIsLoading(true);
    
    // Simulating API call with timeout
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock data (in a real app, you would call an actual API)
    const mockResults = [
      { 
        link: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&q=80", 
        title: "Modern Property Interior" 
      },
      { 
        link: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80", 
        title: "House in Dublin" 
      },
      { 
        link: "https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&q=80", 
        title: "Apartment Building" 
      },
      { 
        link: "https://images.unsplash.com/photo-1494526585095-c41caaa0bbe9?auto=format&fit=crop&q=80", 
        title: "Living Room Interior" 
      },
      { 
        link: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80", 
        title: "Kitchen Design" 
      },
      { 
        link: "https://images.unsplash.com/photo-1560440021-33f9b867899d?auto=format&fit=crop&q=80", 
        title: "Modern Bathroom" 
      }
    ];
    
    setSearchResults(mockResults);
    setIsLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      toast.error("Please enter a search term");
      return;
    }
    
    searchImages(searchQuery);
  };

  const handleSelectImage = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    if (onSelectImage) {
      onSelectImage(imageUrl);
      toast.success("Image selected");
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setSelectedImage(null);
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Image Search</h2>
      
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for property images..."
            className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-estate-primary focus:border-estate-primary"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="mt-2 w-full bg-estate-primary text-white py-2 rounded-lg hover:bg-estate-primary-light transition-colors"
        >
          Search Images
        </button>
      </form>

      {isLoading && (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-estate-primary"></div>
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-3">Search Results</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {searchResults.map((image, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-lg cursor-pointer aspect-square group ${
                  selectedImage === image.link ? "ring-2 ring-estate-primary" : ""
                }`}
                onClick={() => handleSelectImage(image.link)}
              >
                <img
                  src={image.link}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
                  {showSelector && (
                    <button
                      className="bg-white text-estate-primary p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      title="Select image"
                    >
                      <Download size={18} />
                    </button>
                  )}
                </div>
                {selectedImage === image.link && (
                  <div className="absolute inset-0 bg-estate-primary bg-opacity-20 border-2 border-estate-primary rounded-lg"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSearch;
