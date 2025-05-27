
import { Navigation } from "@/components/Navigation";
import { DeviceGrid } from "@/components/DeviceGrid";
import { Footer } from "@/components/Footer";

const Devices = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 min-h-screen">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Assistive Device Library
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse our collection of customizable assistive devices. Find the perfect solution for your needs.
          </p>
        </div>
        
        <DeviceGrid />
      </main>

      <Footer />
    </div>
  );
};

export default Devices;
