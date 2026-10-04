"use client";

import React from "react";
import { SERVICES } from "@/data/portfolioData";
import { soundManager } from "@/utils/sound";
import { Globe, Bot, BookOpen, CreditCard, Sparkles, Check } from "lucide-react";

export default function ServicesSection() {
  const iconMap: Record<string, React.ElementType> = {
    globe: Globe,
    bot: Bot,
    book: BookOpen,
    "credit-card": CreditCard,
  };

  return (
    <section id="services" className="bg-[#0f172a] text-white py-16 px-4 sm:px-6 lg:px-8 border-b-4 border-black relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#1e293b] border-2 border-[#3b82f6] text-sky-300 px-3.5 py-1 rounded-lg text-xs font-pixel shadow-pixel-sm">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>SOLUTIONS & EXPERTISE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-pixel text-white">
            WHAT I CAN <span className="text-yellow-300">BUILD FOR YOU</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-sans">
            Specialized engineering for ambitious digital products, high-concurrency systems, and intuitive user experiences.
          </p>
        </div>

        {/* 4 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((srv, idx) => {
            const Icon = iconMap[srv.icon] || Globe;
            return (
              <div
                key={idx}
                onClick={() => soundManager.playBlip()}
                className="bg-[#1e293b] hover:bg-[#27354f] border-2 border-[#334155] hover:border-yellow-400 rounded-2xl p-6 shadow-pixel transition-all duration-200 transform hover:-translate-y-1.5 flex flex-col justify-between group cursor-default"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-600/30 border-2 border-blue-500/50 flex items-center justify-center mb-4 text-yellow-300 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-pixel text-sm text-white mb-2 group-hover:text-yellow-300 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">
                    {srv.description}
                  </p>
                </div>

                <ul className="space-y-2 pt-3 border-t border-slate-700">
                  {srv.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-center gap-2 text-[11px] text-slate-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
