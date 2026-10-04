"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ContactModal from "@/components/ContactModal";
import ShowreelModal from "@/components/ShowreelModal";
import Footer from "@/components/Footer";

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#0b111e] text-white overflow-x-hidden">
      {/* Top Navbar */}
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      {/* Hero Section with Interactive Flappy Bird Game & Overlay */}
      <main className="flex-1">
        <HeroSection onOpenShowreel={() => setIsShowreelOpen(true)} />

        {/* Featured Projects Section */}
        <FeaturedProjects />

        {/* About Me Section matching reference image bottom */}
        <AboutSection />

        {/* Services & Capabilities Section */}
        <ServicesSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <ShowreelModal
        isOpen={isShowreelOpen}
        onClose={() => setIsShowreelOpen(false)}
      />
    </div>
  );
}
