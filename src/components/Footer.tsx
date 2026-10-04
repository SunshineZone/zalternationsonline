"use client";

import React from "react";
import { soundManager } from "@/utils/sound";
import { ArrowUp, Github, Linkedin, Mail, Twitter, Heart } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    soundManager.playFlap();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#080d17] text-white border-t-4 border-black relative overflow-hidden">
      
      {/* Pixel Grass / Ground Transition Top Stripe */}
      <div className="h-3 bg-[#54b937] border-b border-[#2c7219]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
          
          {/* Logo & Subtitle */}
          <div className="text-center md:text-left space-y-1">
            <div className="text-xl font-pixel text-white flex items-center justify-center md:justify-start gap-2">
              <span className="text-yellow-400">🕹️</span> Zalternations<span className="text-yellow-300">.Online</span>
            </div>
            <p className="text-xs text-slate-400 font-mono tracking-widest uppercase">
              BUILDER • DESIGNER • CREATOR
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              onClick={() => soundManager.playBlip()}
              className="p-2.5 bg-[#111a2e] hover:bg-[#1e293b] border-2 border-slate-700 hover:border-yellow-400 rounded-xl transition-all"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 text-slate-300 hover:text-white" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              onClick={() => soundManager.playBlip()}
              className="p-2.5 bg-[#111a2e] hover:bg-[#1e293b] border-2 border-slate-700 hover:border-yellow-400 rounded-xl transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-slate-300 hover:text-white" />
            </a>
            <a
              href="mailto:contact@zalternations.online"
              onClick={() => soundManager.playBlip()}
              className="p-2.5 bg-[#111a2e] hover:bg-[#1e293b] border-2 border-slate-700 hover:border-yellow-400 rounded-xl transition-all"
              aria-label="Email"
            >
              <Mail className="w-5 h-5 text-slate-300 hover:text-white" />
            </a>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 bg-[#ffce00] hover:bg-[#ffd83b] text-slate-950 font-pixel text-[10px] px-3.5 py-2.5 rounded-xl border-2 border-black shadow-pixel active:translate-y-1 transition-all ml-2"
            >
              <ArrowUp className="w-4 h-4" /> TOP
            </button>
          </div>

        </div>

        {/* Bottom credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Zalternations.Online — All Rights Reserved.</p>
          <p className="flex items-center gap-1 text-[11px] font-mono">
            Engineered with <Heart className="w-3.5 h-3.5 text-red-500 fill-current inline" /> using Next.js, Three.js & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
