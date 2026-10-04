"use client";

import React, { useState } from "react";
import { soundManager } from "@/utils/sound";
import { X, Play, Pause, RotateCcw, Sparkles } from "lucide-react";
import ProjectMockup from "./ProjectMockup";
import { PROJECTS } from "@/data/portfolioData";

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShowreelModal({ isOpen, onClose }: ShowreelModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  if (!isOpen) return null;

  const currentProject = PROJECTS[currentSlide];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#0b111e] border-4 border-[#3b82f6] rounded-2xl max-w-3xl w-full p-6 text-white shadow-pixel-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-700 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>
            <h3 className="font-pixel text-sm sm:text-base text-yellow-300">
              PORTFOLIO SHOWREEL 2026
            </h3>
          </div>
          <button
            onClick={() => {
              soundManager.playBlip();
              onClose();
            }}
            className="p-1.5 bg-[#172554] hover:bg-[#1e3a8a] rounded-lg border border-slate-600 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video / Presentation Player Display */}
        <div className="relative rounded-xl overflow-hidden border-2 border-slate-700 bg-slate-950 p-2 shadow-inner">
          <div className="h-64 sm:h-80 w-full flex flex-col justify-between">
            <ProjectMockup type={currentProject.imageType} title={currentProject.title} />
          </div>

          {/* Overlay info tag */}
          <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-3 rounded-xl border border-white/10 flex items-center justify-between">
            <div>
              <div className="text-xs font-pixel text-yellow-300">
                {currentProject.title}
              </div>
              <div className="text-[11px] text-slate-300 font-sans">
                {currentProject.subtitle}
              </div>
            </div>
            <span className="text-[10px] font-mono bg-blue-600/50 text-blue-200 px-2.5 py-1 rounded">
              0{currentSlide + 1} / 0{PROJECTS.length}
            </span>
          </div>
        </div>

        {/* Player Controls Bar */}
        <div className="flex items-center justify-between pt-4 mt-2">
          <div className="flex items-center gap-2">
            {PROJECTS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  soundManager.playBlip();
                  setCurrentSlide(idx);
                }}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === idx ? "w-8 bg-yellow-400" : "w-3 bg-slate-700"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundManager.playBlip();
                setCurrentSlide((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
              }}
              className="px-3 py-1.5 bg-[#172554] hover:bg-[#1e3a8a] text-xs font-pixel rounded-lg border border-slate-600"
            >
              PREV
            </button>
            <button
              onClick={() => {
                soundManager.playBlip();
                setCurrentSlide((prev) => (prev + 1) % PROJECTS.length);
              }}
              className="px-3 py-1.5 bg-[#ffce00] hover:bg-[#ffd83b] text-black text-xs font-pixel rounded-lg border border-black shadow-pixel-sm"
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
