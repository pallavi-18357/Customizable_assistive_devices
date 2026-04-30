import React from "react";

const HeroSection = () => (
  <section className="bg-[#faf8e3] py-16 px-0 flex flex-col items-center text-center">
    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight text-black">
      Empowering Independence
    </h1>
    <p className="text-lg md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
      Discover customizable assistive devices designed to elevate your daily life. Shop innovative solutions or explore our services to find the perfect fit for your needs.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-center">
      <a href="/devices" className="bg-gray-800 text-white px-8 py-3 rounded font-semibold text-lg hover:bg-black transition">
        Shop Devices
      </a>
      <a href="/services" className="border-2 border-gray-800 text-gray-800 px-8 py-3 rounded font-semibold text-lg hover:bg-gray-100 transition">
        Explore Services
      </a>
    </div>
    <div className="w-full flex justify-center">
      <img
        src="/images/assistive-hero.jpg"
        alt="Assistive devices"
        className="w-full max-w-5xl h-[480px] md:h-[520px] object-cover object-[center_top] rounded-lg shadow-lg"
      />
    </div>
  </section>
);

export default HeroSection;
