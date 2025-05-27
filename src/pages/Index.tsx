
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { DeviceGrid } from "@/components/DeviceGrid";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Devices
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our most popular assistive devices, designed with care and customized for independence.
            </p>
          </div>
          <DeviceGrid />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
