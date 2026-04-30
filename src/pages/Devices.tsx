import HeroSection from "@/components/HeroSection";
import { Navigation } from "@/components/Navigation";
import { DeviceGrid } from "@/components/DeviceGrid";

const Devices = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <HeroSection />
      <main className="container mx-auto px-4 py-8 min-h-screen">
        <DeviceGrid />
      </main>
    </div>
  );
};

export default Devices;





// import HeroSection from "@/components/HeroSection";
// import { Navigation } from "@/components/Navigation";
// import { DeviceGrid } from "@/components/DeviceGrid";

// const Devices = () => {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navigation />
//       <HeroSection />
//       <main className="container mx-auto px-4 py-8 min-h-screen">
//         <DeviceGrid />
//       </main>
//     </div>
//   );
// };

// export default Devices;
