"use client";

import React from "react";
import ThreePixelScene from "./ThreePixelScene";
import { soundManager } from "@/utils/sound";
import { Rocket, Users, Zap, Trophy, Heart, Sparkles, Terminal } from "lucide-react";
import { SKILLS_DATA } from "@/data/portfolioData";

export default function AboutSection() {
  const stats = [
    {
      label: "Products Built",
      value: "10+",
      icon: Rocket,
      color: "text-amber-500",
      bg: "bg-amber-50 border-amber-200",
    },
    {
      label: "Users Impacted",
      value: "100K+",
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-50 border-blue-200",
    },
    {
      label: "Years Experience",
      value: "8+",
      icon: Zap,
      color: "text-yellow-600",
      bg: "bg-yellow-50 border-yellow-200",
    },
    {
      label: "Happy Clients",
      value: "50+",
      icon: Trophy,
      color: "text-emerald-500",
      bg: "bg-emerald-50 border-emerald-200",
    },
  ];

  return (
    <section id="about" className="relative bg-[#f8f6f0] text-slate-900 py-16 px-4 sm:px-6 lg:px-8 border-b-4 border-slate-900 overflow-hidden">
      
      {/* Decorative Pixel Grass Ground Fringe at Top */}
      <div className="absolute top-0 inset-x-0 h-4 bg-[#70c042] border-b-2 border-[#54b937]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Heading, Bio, Character with Speech Bubble & Hearts */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Top Badge matching "[ ABOUT ME ]" */}
            <div className="inline-flex items-center gap-2 bg-[#ffce00] border-2 border-black text-slate-900 px-3.5 py-1 rounded-lg text-xs font-pixel shadow-pixel-sm">
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>ABOUT ME</span>
            </div>

            {/* Headline matching "A BUILDER AT HEART" */}
            <h2 className="text-3xl sm:text-5xl font-pixel text-slate-900 tracking-tight leading-tight">
              A BUILDER <br />
              <span className="text-blue-600">AT HEART</span>
            </h2>

            {/* Bio text */}
            <p className="text-base sm:text-lg text-slate-700 font-sans leading-relaxed">
              I&apos;m passionate about using technology to solve real problems,
              especially in education, productivity, and community impact. Combining
              engineering rigor with creative pixel-perfect craft to turn complex ideas into smooth, high-impact products.
            </p>

            {/* Pixel Character + Speech Bubble + Hearts matching reference image */}
            <div className="pt-2 flex flex-col sm:flex-row items-center sm:items-end gap-6 bg-white/70 p-4 rounded-2xl border-2 border-slate-300 shadow-sm">
              
              {/* Pixel Avatar Boy matching image with backpack */}
              <div className="relative group cursor-pointer" onClick={() => soundManager.playVictory()}>
                <div className="w-28 h-32 relative flex items-center justify-center">
                  <svg viewBox="0 0 32 36" className="w-24 h-28" shapeRendering="crispEdges">
                    {/* Backpack on side */}
                    <rect x="3" y="14" width="6" height="12" fill="#0284c7" />
                    <rect x="2" y="16" width="2" height="8" fill="#0369a1" />
                    {/* Hair */}
                    <rect x="10" y="2" width="14" height="6" fill="#0f172a" />
                    <rect x="8" y="4" width="3" height="8" fill="#0f172a" />
                    <rect x="23" y="4" width="3" height="8" fill="#0f172a" />
                    <rect x="13" y="1" width="8" height="2" fill="#0f172a" />
                    {/* Face */}
                    <rect x="10" y="8" width="13" height="10" fill="#fed7aa" />
                    {/* Eyes */}
                    <rect x="12" y="11" width="2" height="3" fill="#0f172a" />
                    <rect x="19" y="11" width="2" height="3" fill="#0f172a" />
                    {/* Cheeks */}
                    <rect x="10" y="14" width="2" height="2" fill="#fb7185" />
                    <rect x="21" y="14" width="2" height="2" fill="#fb7185" />
                    {/* Smile */}
                    <rect x="15" y="15" width="3" height="1" fill="#b91c1c" />
                    {/* Jacket (Blue) */}
                    <rect x="9" y="18" width="15" height="10" fill="#2563eb" />
                    <rect x="15" y="18" width="3" height="10" fill="#ffffff" />
                    {/* Pants */}
                    <rect x="10" y="28" width="5" height="6" fill="#1e293b" />
                    <rect x="18" y="28" width="5" height="6" fill="#1e293b" />
                    {/* Shoes */}
                    <rect x="9" y="33" width="7" height="3" fill="#0284c7" />
                    <rect x="17" y="33" width="7" height="3" fill="#0284c7" />
                  </svg>
                </div>
              </div>

              {/* Speech bubble & health hearts */}
              <div className="space-y-3 text-center sm:text-left">
                {/* Speech Bubble matching "Still building... Level up! 🚀" */}
                <div className="relative bg-white border-2 border-black rounded-xl px-4 py-2 shadow-pixel text-xs font-pixel text-slate-800 inline-block">
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 hidden sm:block w-0 h-0 border-t-6 border-t-transparent border-r-8 border-r-white border-b-6 border-b-transparent"></div>
                  <span>Still building... Level up! 🚀</span>
                </div>

                {/* Health Hearts matching ❤️❤️❤️🤍 */}
                <div className="flex items-center justify-center sm:justify-start gap-1.5 pt-1">
                  <Heart className="w-5 h-5 fill-red-500 text-red-600 animate-pulse" />
                  <Heart className="w-5 h-5 fill-red-500 text-red-600 animate-pulse" />
                  <Heart className="w-5 h-5 fill-red-500 text-red-600 animate-pulse" />
                  <Heart className="w-5 h-5 text-slate-300" />
                  <span className="text-[10px] font-pixel text-slate-600 ml-2">LVL 88</span>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: 4 Stats Cards + Three.js 3D Voxel Scene */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* 4 Stat Cards in 2x2 grid matching reference image */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, idx) => {
                const IconComponent = s.icon;
                return (
                  <div
                    key={idx}
                    onClick={() => soundManager.playBlip()}
                    className={`bg-white border-2 border-black rounded-2xl p-4 shadow-pixel hover:shadow-pixel-lg transition-all duration-200 transform hover:-translate-y-1 cursor-default`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`p-2 rounded-lg bg-slate-100 border border-slate-300 ${s.color}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="text-2xl sm:text-3xl font-pixel text-slate-900 mb-1">
                      {s.value}
                    </div>
                    <div className="text-xs sm:text-sm font-sans font-medium text-slate-600">
                      {s.label}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Three.js 3D Interactive Pixel Voxel Box */}
            <div className="bg-[#0b111e] border-3 border-black rounded-2xl p-4 shadow-pixel text-white relative overflow-hidden h-44 sm:h-48 flex items-center justify-between">
              
              <div className="relative z-10 max-w-[55%] space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-pixel text-yellow-300">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>3D VOXEL ENGINE</span>
                </div>
                <div className="text-sm sm:text-base font-pixel text-white">
                  Three.js Powered Realtime Assets
                </div>
                <p className="text-xs text-slate-300 font-sans">
                  Move your mouse to tilt the 3D pixel coin & crystal matrix!
                </p>
              </div>

              {/* Three.js Canvas Container */}
              <div className="absolute right-0 top-0 w-1/2 h-full">
                <ThreePixelScene interactive={true} />
              </div>

            </div>

          </div>

        </div>

        {/* Tech Stack Power Meters */}
        <div className="mt-14 pt-10 border-t-2 border-slate-300">
          <div className="text-center mb-8">
            <span className="text-xs font-pixel text-blue-600 uppercase tracking-widest block mb-1">
              CHARACTER STATS & SKILLS
            </span>
            <h3 className="text-2xl sm:text-3xl font-pixel text-slate-900">
              ARSENAL & PROFICIENCIES
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SKILLS_DATA.map((group, idx) => (
              <div
                key={idx}
                className="bg-white border-2 border-black rounded-xl p-5 shadow-pixel"
              >
                <div className="text-xs font-pixel text-slate-900 mb-3 pb-2 border-b border-slate-200">
                  {group.category}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] font-mono bg-slate-100 text-slate-800 border border-slate-300 px-2 py-1 rounded hover:bg-yellow-200 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}
