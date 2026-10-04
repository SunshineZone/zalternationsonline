"use client";

import React, { useState } from "react";
import { PROJECTS, Project } from "@/data/portfolioData";
import ProjectMockup from "./ProjectMockup";
import ProjectModal from "./ProjectModal";
import { soundManager } from "@/utils/sound";
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from "lucide-react";

export default function FeaturedProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    soundManager.playBlip();
    setActiveIndex((prev) => (prev + 1) % PROJECTS.length);
  };

  const handlePrev = () => {
    soundManager.playBlip();
    setActiveIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  };

  const handleProjectClick = (p: Project) => {
    soundManager.playCoin();
    setSelectedProject(p);
  };

  return (
    <section id="projects" className="relative bg-[#0b111e] py-16 px-4 sm:px-6 lg:px-8 border-b-4 border-[#0f172a] overflow-hidden">
      
      {/* Background Pixel Stars & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header matching reference image */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-3 max-w-2xl">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 bg-[#172554] border-2 border-[#2563eb] text-blue-300 px-3 py-1 rounded-lg text-xs font-pixel shadow-pixel-sm">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>FEATURED PROJECTS</span>
            </div>

            {/* Title & Subtitle */}
            <h2 className="text-2xl sm:text-4xl font-pixel text-white tracking-wide">
              SOME THINGS <span className="text-yellow-300">I&apos;VE BUILT</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 font-sans">
              A selection of products, platforms, and solutions I&apos;ve worked on —
              from education, AI, to business tools.
            </p>
          </div>

          {/* View All Projects Button matching reference image */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundManager.playBlip();
                setSelectedProject(PROJECTS[0]);
              }}
              className="inline-flex items-center gap-2 bg-[#1e293b] hover:bg-[#334155] border-2 border-[#3b82f6] text-white font-pixel text-xs px-5 py-3 rounded-xl shadow-pixel active:translate-y-1 transition-all"
            >
              View All Projects <ArrowRight className="w-3.5 h-3.5 text-yellow-300" />
            </button>

            {/* Carousel navigation arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2.5 bg-[#172554] hover:bg-[#1e3a8a] text-white rounded-lg border-2 border-[#2563eb] shadow-pixel-sm active:scale-95 transition-all"
                aria-label="Previous Project"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 bg-[#172554] hover:bg-[#1e3a8a] text-white rounded-lg border-2 border-[#2563eb] shadow-pixel-sm active:scale-95 transition-all"
                aria-label="Next Project"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Projects Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {PROJECTS.map((proj, idx) => (
            <div
              key={proj.id}
              onClick={() => handleProjectClick(proj)}
              className="group cursor-pointer bg-[#111a2e] hover:bg-[#16223b] border-2 border-[#203152] hover:border-[#3b82f6] rounded-2xl p-3.5 shadow-pixel hover:shadow-pixel-lg transition-all duration-200 transform hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                {/* Mockup screen inside card */}
                <div className="rounded-xl overflow-hidden mb-3 border border-[#203152] group-hover:border-[#3b82f6]/50 transition-colors">
                  <ProjectMockup type={proj.imageType} title={proj.title} />
                </div>

                {/* Card Title & Subtitle */}
                <h3 className="font-pixel text-sm text-white group-hover:text-yellow-300 transition-colors mb-1 line-clamp-1">
                  {proj.title}
                </h3>
                <p className="text-xs text-slate-400 font-sans line-clamp-2 mb-3">
                  {proj.subtitle}
                </p>
              </div>

              {/* Tag Badges matching reference image (e.g. Web, LMS, Education) */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#1e293b]">
                {proj.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-pixel bg-[#172554] text-sky-300 border border-sky-800/60 px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Pagination Dots matching reference image */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {PROJECTS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                soundManager.playBlip();
                setActiveIndex(idx);
              }}
              className={`h-2.5 rounded-full transition-all ${
                activeIndex === idx
                  ? "w-8 bg-yellow-400"
                  : "w-2.5 bg-slate-600 hover:bg-slate-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>

      {/* Interactive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
