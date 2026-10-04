"use client";

import React, { useState } from "react";
import FlappyHeroGame from "./FlappyHeroGame";
import DinoHeroGame from "./DinoHeroGame";
import { soundManager } from "@/utils/sound";
import { Play, Sparkles, Code2, Smartphone, Bot, BookOpen, Gamepad2 } from "lucide-react";

interface HeroSectionProps {
  onOpenShowreel: () => void;
}

export default function HeroSection({ onOpenShowreel }: HeroSectionProps) {
  const [activeGame, setActiveGame] = useState<"flappy" | "dino">("flappy");
  const [isGamePlaying, setIsGamePlaying] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerEasterEgg = (game: "flappy" | "dino") => {
    soundManager.playEasterEgg();
    setActiveGame(game);
    setIsGamePlaying(true);

    const title = game === "flappy" ? "🕹️ Easter Egg Unlocked: Flappy Hero!" : "🦖 Easter Egg Unlocked: Dino Jump!";
    setToastMessage(title);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleExitGame = () => {
    soundManager.playBlip();
    setIsGamePlaying(false);
  };

  const handleExploreWebsite = () => {
    soundManager.playBlip();
    setIsGamePlaying(false);
    setTimeout(() => {
      const elem = document.getElementById("projects");
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

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
      
      {/* Interactive Arcade Mini-Game Container */}
      <div className="relative w-full h-[580px] sm:h-[640px] lg:h-[700px]">
        {activeGame === "flappy" ? (
          <FlappyHeroGame
            isActive={isGamePlaying}
            onGameStateChange={(state) => {
              if (state === "playing") {
                setIsGamePlaying(true);
              }
            }}
            onExitGame={handleExitGame}
            onSwitchToDino={() => {
              soundManager.playEasterEgg();
              setActiveGame("dino");
              setIsGamePlaying(true);
            }}
          />
        ) : (
          <DinoHeroGame
            isActive={isGamePlaying}
            onGameStateChange={(state) => {
              if (state === "playing") {
                setIsGamePlaying(true);
              }
            }}
            onExitGame={handleExitGame}
            onSwitchToFlappy={() => {
              soundManager.playEasterEgg();
              setActiveGame("flappy");
              setIsGamePlaying(true);
            }}
          />
        )}

        {/* Easter Egg Toast Notification */}
        {toastMessage && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-bounce">
            <div className="bg-[#0b111e]/95 border-2 border-yellow-400 text-yellow-300 font-pixel text-xs px-4 py-2 rounded-xl shadow-pixel flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-400 animate-spin" />
              <span>{toastMessage}</span>
            </div>
          </div>
        )}

        {/* Hero Overlay Content (Smoothly slides off-screen when playing!) */}
        <div
          className={`absolute inset-0 z-10 flex flex-col justify-between p-4 sm:p-8 lg:p-12 max-w-7xl mx-auto transition-all duration-700 ease-in-out ${
            isGamePlaying
              ? "-translate-x-[150%] opacity-0 pointer-events-none"
              : "translate-x-0 opacity-100 pointer-events-none"
          }`}
        >
          {/* Main Hero Copy */}
          <div className="max-w-2xl mt-4 sm:mt-8 space-y-4 sm:space-y-5">
            
            {/* Top Badge */}
            <div className="inline-flex flex-wrap items-center gap-1.5 sm:gap-2 bg-[#0b111e]/85 backdrop-blur-sm border-2 border-[#38bdf8] text-sky-300 px-3 py-1.5 rounded-lg shadow-pixel pointer-events-auto">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin shrink-0" />
              <span className="font-pixel text-[9px] sm:text-[11px] tracking-wider uppercase text-yellow-300">
                WELCOME TO MY PORTFOLIO
              </span>
              <span className="text-[10px] text-slate-400 font-pixel">|</span>
              <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] text-emerald-400 font-pixel animate-pulse">
                <Gamepad2 className="w-3 h-3 shrink-0" /> 2 Games in Title
              </span>
            </div>

            {/* Main Brand Title with 2 Hidden Easter Egg Buttons */}
            <div className="space-y-1">
              <h1 className="text-[26px] xs:text-3xl sm:text-5xl lg:text-6xl font-pixel text-white drop-shadow-[0_4px_0_#0f172a] tracking-tight leading-tight flex flex-wrap items-baseline gap-x-0.5">
                <span className="inline-flex items-baseline">
                  <span>Z</span>
                  
                  {/* EASTER EGG #1: Flappy Hero (hidden inside 'alt') */}
                  <span className="relative inline-block group/flappy pointer-events-auto touch-manipulation">
                    <button
                      onClick={() => triggerEasterEgg("flappy")}
                      className="relative text-white hover:text-yellow-300 transition-colors focus:outline-none cursor-pointer py-1 select-none active:scale-95"
                      title="Easter Egg #1: Click to play Flappy Hero!"
                    >
                      <span>alt</span>
                      {/* Animated floating superhero wings indicator */}
                      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[11px] sm:text-xs animate-bounce opacity-85 group-hover/flappy:opacity-100 group-hover/flappy:scale-125 transition-all">
                        🦸
                      </span>
                      {/* Underline pulse indicator */}
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400/70 group-hover/flappy:h-1 group-hover/flappy:bg-yellow-400 transition-all rounded-full" />
                    </button>

                    {/* Tooltip on hover */}
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 hidden group-hover/flappy:flex items-center gap-1 bg-[#0b111e] border border-yellow-400 text-yellow-300 text-[9px] font-pixel px-2 py-0.5 rounded shadow-pixel whitespace-nowrap z-50 pointer-events-none">
                      🕹️ Play Flappy Hero
                    </span>
                  </span>

                  <span>ernati</span>

                  {/* EASTER EGG #2: Dino Jump (hidden inside 'on') */}
                  <span className="relative inline-block group/dino pointer-events-auto touch-manipulation">
                    <button
                      onClick={() => triggerEasterEgg("dino")}
                      className="relative text-white hover:text-emerald-300 transition-colors focus:outline-none cursor-pointer py-1 select-none active:scale-95"
                      title="Easter Egg #2: Click to play Dino Jump!"
                    >
                      <span>on</span>
                      {/* Animated floating dino indicator */}
                      <span
                        className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[11px] sm:text-xs animate-bounce opacity-85 group-hover/dino:opacity-100 group-hover/dino:scale-125 transition-all"
                        style={{ animationDelay: "0.3s" }}
                      >
                        🦖
                      </span>
                      {/* Underline pulse indicator */}
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400/70 group-hover/dino:h-1 group-hover/dino:bg-emerald-400 transition-all rounded-full" />
                    </button>

                    {/* Tooltip on hover */}
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 hidden group-hover/dino:flex items-center gap-1 bg-[#0b111e] border border-emerald-400 text-emerald-300 text-[9px] font-pixel px-2 py-0.5 rounded shadow-pixel whitespace-nowrap z-50 pointer-events-none">
                      🦖 Play Dino Jump
                    </span>
                  </span>

                  <span>s</span>
                </span>
                <span className="text-yellow-300">.Online</span>
              </h1>

              <h2 className="text-base sm:text-2xl lg:text-3xl font-pixel text-yellow-300 drop-shadow-[0_2px_0_#000] tracking-wide leading-snug">
                BUILDING DIGITAL IDEAS INTO REAL PRODUCTS
              </h2>
            </div>

            {/* Description Text */}
            <p className="text-xs sm:text-base text-slate-100 font-sans max-w-xl leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] bg-black/30 backdrop-blur-[2px] p-2.5 rounded-xl border border-white/10">
              I design, build, and grow digital products that create real impact,
              from education to AI, from web to mobile — turning ideas into
              solutions.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1 pointer-events-auto">
              <button
                onClick={scrollToProjects}
                className="flex items-center justify-center gap-2 bg-[#ffce00] hover:bg-[#ffd83b] text-slate-950 font-pixel text-[11px] sm:text-xs px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border-3 border-black shadow-pixel active:translate-y-1 transition-all"
              >
                <span>🚀</span> See My Work →
              </button>

              <button
                onClick={() => {
                  soundManager.playBlip();
                  onOpenShowreel();
                }}
                className="flex items-center justify-center gap-2 bg-[#0b111e]/90 hover:bg-[#1a253d] text-white font-pixel text-[11px] sm:text-xs px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border-2 border-slate-600 shadow-pixel active:translate-y-1 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-current text-white" /> Watch Showreel
              </button>
            </div>
          </div>

          {/* Bottom Tech Pills Bar */}
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

