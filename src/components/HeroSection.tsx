"use client";

import React from "react";
import FlappyHeroGame from "./FlappyHeroGame";
import { soundManager } from "@/utils/sound";
import { Play, Sparkles, Code2, Smartphone, Bot, BookOpen } from "lucide-react";

interface HeroSectionProps {
  onOpenShowreel: () => void;
}

export default function HeroSection({ onOpenShowreel }: HeroSectionProps) {
  const scrollToProjects = () => {
    soundManager.playBlip();
    const elem = document.getElementById("projects");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const techBadges = [
    { label: "Web Apps", icon: Code2, symbol: "</>" },
    { label: "Mobile Apps", icon: Smartphone, symbol: "📱" },
    { label: "AI & Automation", icon: Bot, symbol: "🤖" },
    { label: "EdTech Solutions", icon: BookOpen, symbol: "📚" },
  ];

  return (
    <section id="hero" className="relative w-full overflow-hidden bg-[#2563eb]">
      
      {/* Interactive Flappy Bird Game Canvas Container */}
      <div className="relative w-full h-[580px] sm:h-[640px] lg:h-[700px]">
        <FlappyHeroGame />

        {/* Hero Overlay Content */}
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-4 sm:p-8 lg:p-12 max-w-7xl mx-auto">
          
          {/* Main Hero Copy - positioned on the left half matching the image */}
          <div className="max-w-2xl mt-4 sm:mt-8 space-y-4 sm:space-y-5">
            
            {/* Top Badge matching "[ WELCOME TO MY PORTFOLIO ]" in image */}
            <div className="inline-flex items-center gap-2 bg-[#0b111e]/85 backdrop-blur-sm border-2 border-[#38bdf8] text-sky-300 px-3.5 py-1.5 rounded-lg shadow-pixel pointer-events-auto">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" />
              <span className="font-pixel text-[9px] sm:text-[11px] tracking-wider uppercase text-yellow-300">
                WELCOME TO MY PORTFOLIO
              </span>
            </div>

            {/* Main Brand Title & Subtitle matching image */}
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-pixel text-white drop-shadow-[0_4px_0_#0f172a] tracking-tight leading-tight">
                Zalternations<span className="text-yellow-300">.Online</span>
              </h1>
              <h2 className="text-lg sm:text-2xl lg:text-3xl font-pixel text-yellow-300 drop-shadow-[0_2px_0_#000] tracking-wide leading-snug">
                BUILDING DIGITAL IDEAS INTO REAL PRODUCTS
              </h2>
            </div>

            {/* Description Text */}
            <p className="text-sm sm:text-base text-slate-100 font-sans max-w-xl leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] bg-black/30 backdrop-blur-[2px] p-2.5 rounded-xl border border-white/10">
              I design, build, and grow digital products that create real impact,
              from education to AI, from web to mobile — turning ideas into
              solutions.
            </p>

            {/* Action Buttons matching image */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1 pointer-events-auto">
              {/* Primary Yellow CTA Button */}
              <button
                onClick={scrollToProjects}
                className="flex items-center gap-2.5 bg-[#ffce00] hover:bg-[#ffd83b] text-slate-950 font-pixel text-[11px] sm:text-xs px-5 py-3 rounded-xl border-3 border-black shadow-pixel active:translate-y-1 transition-all"
              >
                <span>🚀</span> See My Work →
              </button>

              {/* Secondary Dark CTA Button */}
              <button
                onClick={() => {
                  soundManager.playBlip();
                  onOpenShowreel();
                }}
                className="flex items-center gap-2 bg-[#0b111e]/90 hover:bg-[#1a253d] text-white font-pixel text-[11px] sm:text-xs px-5 py-3 rounded-xl border-2 border-slate-600 shadow-pixel active:translate-y-1 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-current text-white" /> Watch Showreel
              </button>
            </div>
          </div>

          {/* Bottom Tech Pills Bar matching reference image */}
          <div className="pt-4 pb-2 pointer-events-auto overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap sm:flex-nowrap">
              {techBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 bg-[#0b111e]/90 hover:bg-[#172554] border-2 border-[#1e3a8a] text-slate-200 px-3 py-1.5 rounded-lg text-xs font-pixel shadow-pixel-sm transition-all hover:scale-105 cursor-default backdrop-blur-sm"
                >
                  <span className="text-yellow-300 font-mono font-bold text-xs">{badge.symbol}</span>
                  <span className="text-[10px] sm:text-xs">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
