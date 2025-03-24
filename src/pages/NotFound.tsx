
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center">
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-9xl font-bold text-estate-primary mb-8">404</h1>
          <h2 className="text-3xl font-medium mb-6">Page Not Found</h2>
          <p className="text-xl text-estate-medium max-w-md mx-auto mb-10">
            Sorry, we couldn't find the page you're looking for. The page might have been removed or the URL might be incorrect.
          </p>
          <Link
            to="/"
            className="inline-block bg-estate-primary hover:bg-estate-primary-light text-white font-medium px-8 py-3 rounded-lg transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
