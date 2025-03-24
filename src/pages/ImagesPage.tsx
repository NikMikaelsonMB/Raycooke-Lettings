
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImageSearch from "@/components/ImageSearch";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const ImagesPage = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleAddImage = (imageUrl: string) => {
    if (!selectedImages.includes(imageUrl)) {
      setSelectedImages([...selectedImages, imageUrl]);
    }
  };

  const handleRemoveImage = (imageUrl: string) => {
    setSelectedImages(selectedImages.filter(img => img !== imageUrl));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ImageSearch onSelectImage={handleAddImage} />
          </div>
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-xl font-semibold mb-4">Selected Images</h2>
              {selectedImages.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                  <p className="text-gray-500">No images selected yet. Search and click on images to add them here.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <AspectRatio ratio={16 / 9}>
                        <img 
                          src={image} 
                          alt={`Selected image ${index + 1}`} 
                          className="rounded-lg object-cover w-full h-full"
                        />
                      </AspectRatio>
                      <button
                        onClick={() => handleRemoveImage(image)}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={16} className="text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ImagesPage;
