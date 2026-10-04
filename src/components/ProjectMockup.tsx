"use client";

import React from "react";

interface ProjectMockupProps {
  type: "academy" | "ai" | "pay" | "simonas" | "edugate" | "nutrilook";
  title: string;
}

export default function ProjectMockup({ type }: ProjectMockupProps) {
  if (type === "nutrilook") {
    return (
      <div className="w-full h-40 sm:h-44 bg-gradient-to-br from-[#062c22] via-[#064e3b] to-[#042f2e] rounded-lg p-2.5 flex flex-col justify-between overflow-hidden relative border border-emerald-400/50">
        {/* Mock browser header */}
        <div className="flex items-center justify-between border-b border-emerald-500/20 pb-1.5">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
            <div className="w-2 h-2 rounded-full bg-teal-400"></div>
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
          </div>
          <div className="text-[9px] font-mono text-emerald-300 bg-black/40 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
            <span>nutri-look.vercel.app</span>
          </div>
          <span className="text-[8px] text-emerald-400 font-mono flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            AI Live
          </span>
        </div>

        {/* Mock Page Content */}
        <div className="flex items-center justify-between px-2 pt-0.5">
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <span className="text-[8px] bg-emerald-400 text-slate-950 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                AI Nutrition
              </span>
              <span className="text-[8px] text-emerald-300 font-mono">Vision v2.1</span>
            </div>
            <div className="text-xs font-bold text-white leading-tight">
              Food & Diet Tracker
            </div>
            <div className="text-[9px] text-emerald-200/90 font-mono">
              Target: <strong className="text-emerald-400">68 kg</strong> • 1900 kcal/day
            </div>
            <div className="flex items-center gap-1 pt-0.5">
              <span className="text-[7px] bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.5 rounded">
                📷 Scan Photo
              </span>
              <span className="text-[7px] bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.5 rounded">
                ⚡ Macro Split
              </span>
            </div>
          </div>

          {/* Pixel Avocado / Healthy Salad Bowl Vector */}
          <div className="w-16 h-16 relative flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-14 h-14" shapeRendering="crispEdges">
              {/* Bowl */}
              <rect x="4" y="13" width="16" height="3" fill="#334155" />
              <rect x="5" y="16" width="14" height="3" fill="#1e293b" />
              <rect x="7" y="19" width="10" height="2" fill="#0f172a" />
              {/* Healthy Greens */}
              <rect x="5" y="10" width="4" height="3" fill="#22c55e" />
              <rect x="9" y="8" width="5" height="5" fill="#10b981" />
              <rect x="14" y="9" width="5" height="4" fill="#15803d" />
              {/* Avocado slice */}
              <rect x="7" y="9" width="4" height="4" fill="#84cc16" />
              <rect x="8" y="10" width="2" height="2" fill="#65a30d" />
              {/* Cherry Tomato */}
              <rect x="15" y="11" width="3" height="3" fill="#ef4444" />
              {/* Salmon / Protein */}
              <rect x="11" y="11" width="3" height="3" fill="#f97316" />
              {/* Sparkles */}
              <rect x="18" y="4" width="2" height="2" fill="#34d399" />
              <rect x="3" y="6" width="2" height="2" fill="#34d399" />
            </svg>
          </div>
        </div>

        {/* Macro Nutrition Pills */}
        <div className="grid grid-cols-3 gap-1 pt-1 border-t border-emerald-500/20">
          <div className="bg-emerald-950/70 border border-emerald-500/30 rounded p-0.5 text-center">
            <span className="text-[7px] text-emerald-400 block font-mono">CALORIES</span>
            <span className="text-[9px] font-bold text-white">480 kcal</span>
          </div>
          <div className="bg-emerald-950/70 border border-emerald-500/30 rounded p-0.5 text-center">
            <span className="text-[7px] text-teal-400 block font-mono">PROTEIN</span>
            <span className="text-[9px] font-bold text-white">38g (High)</span>
          </div>
          <div className="bg-emerald-950/70 border border-emerald-500/30 rounded p-0.5 text-center">
            <span className="text-[7px] text-amber-400 block font-mono">STATUS</span>
            <span className="text-[9px] font-bold text-emerald-300">Healthy ✅</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === "academy") {
    return (
      <div className="w-full h-40 sm:h-44 bg-gradient-to-br from-blue-600 via-sky-600 to-indigo-700 rounded-lg p-2.5 flex flex-col justify-between overflow-hidden relative border border-blue-400/40">
        {/* Mock browser header */}
        <div className="flex items-center justify-between border-b border-white/20 pb-1.5">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-400"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
          </div>
          <div className="text-[9px] font-mono text-white/80 bg-black/25 px-2 py-0.5 rounded">
            academy.zalternations.online
          </div>
          <div className="w-6"></div>
        </div>

        {/* Mock page content matching image with pixel avatar & course cards */}
        <div className="flex items-center justify-between px-2 pt-1">
          <div className="space-y-1">
            <span className="text-[8px] bg-yellow-300 text-black px-1.5 py-0.5 rounded font-bold uppercase">
              New Batch 2026
            </span>
            <div className="text-xs font-bold text-white leading-tight">
              Interactive Web & AI Coding
            </div>
            <div className="text-[9px] text-blue-100">
              120+ video lessons • Live mentor
            </div>
            <div className="inline-block bg-white text-blue-700 text-[8px] font-bold px-2 py-0.5 rounded shadow">
              Enroll Now →
            </div>
          </div>

          {/* Pixel Character in Mockup */}
          <div className="w-16 h-16 relative flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-14 h-14" shapeRendering="crispEdges">
              <rect x="7" y="3" width="10" height="7" fill="#fed7aa" />
              <rect x="6" y="2" width="12" height="3" fill="#1e293b" />
              <rect x="5" y="4" width="3" height="4" fill="#1e293b" />
              <rect x="9" y="5" width="2" height="2" fill="#0f172a" />
              <rect x="14" y="5" width="2" height="2" fill="#0f172a" />
              <rect x="6" y="10" width="12" height="8" fill="#3b82f6" />
              <rect x="10" y="10" width="4" height="2" fill="#ef4444" />
              <rect x="3" y="11" width="3" height="5" fill="#f59e0b" />
              <rect x="18" y="11" width="3" height="5" fill="#f59e0b" />
            </svg>
          </div>
        </div>

        {/* Bottom course preview pills */}
        <div className="grid grid-cols-3 gap-1.5 pt-1">
          <div className="bg-white/15 backdrop-blur-sm rounded p-1 text-[8px] text-white text-center">
            TypeScript 5
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded p-1 text-[8px] text-white text-center">
            Next.js App
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded p-1 text-[8px] text-white text-center">
            AI Prompts
          </div>
        </div>
      </div>
    );
  }

  if (type === "ai") {
    return (
      <div className="w-full h-40 sm:h-44 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#1e3a8a] rounded-lg p-2.5 flex flex-col justify-between overflow-hidden relative border border-cyan-400/40">
        <div className="flex items-center justify-between border-b border-white/20 pb-1.5">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
          </div>
          <div className="text-[9px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
            ai.zalternations.online
          </div>
          <span className="text-[8px] text-emerald-400 font-mono">● Online</span>
        </div>

        <div className="flex items-center justify-between px-2">
          <div className="space-y-1">
            <span className="text-[8px] bg-cyan-400/20 text-cyan-300 border border-cyan-400/40 px-1.5 py-0.5 rounded font-mono">
              AI Psychometric
            </span>
            <div className="text-xs font-bold text-white">
              Career & Major Mapping
            </div>
            <div className="text-[9px] text-slate-300">
              98.4% Match Accuracy
            </div>
            <div className="w-28 bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div className="bg-cyan-400 h-full w-[85%]"></div>
            </div>
          </div>

          {/* AI Robot Mascot in Mockup matching reference image */}
          <div className="w-16 h-16 relative flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-14 h-14" shapeRendering="crispEdges">
              {/* Antenna */}
              <rect x="11" y="2" width="2" height="3" fill="#38bdf8" />
              <rect x="10" y="1" width="4" height="2" fill="#38bdf8" />
              {/* Robot Head */}
              <rect x="5" y="5" width="14" height="10" fill="#e2e8f0" />
              <rect x="7" y="7" width="10" height="5" fill="#0f172a" />
              {/* Glowing Cyan Eyes */}
              <rect x="8" y="8" width="3" height="3" fill="#06b6d4" />
              <rect x="13" y="8" width="3" height="3" fill="#06b6d4" />
              {/* Ears */}
              <rect x="3" y="8" width="2" height="4" fill="#38bdf8" />
              <rect x="19" y="8" width="2" height="4" fill="#38bdf8" />
              {/* Body */}
              <rect x="6" y="16" width="12" height="6" fill="#cbd5e1" />
              <rect x="9" y="18" width="6" height="3" fill="#06b6d4" />
            </svg>
          </div>
        </div>

        <div className="flex items-center justify-between bg-black/40 px-2 py-1 rounded text-[8px] text-slate-300 font-mono">
          <span>Holland Code: RIA</span>
          <span className="text-cyan-400">Software Architect (96%)</span>
        </div>
      </div>
    );
  }

  if (type === "pay") {
    return (
      <div className="w-full h-40 sm:h-44 bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#4338ca] rounded-lg p-2.5 flex flex-col justify-between overflow-hidden relative border border-amber-400/40">
        <div className="flex items-center justify-between border-b border-white/20 pb-1.5">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-amber-400"></div>
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
          </div>
          <div className="text-[9px] font-mono text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
            pay.zalternations.online
          </div>
          <span className="text-[8px] text-emerald-300 font-mono">VA Verified</span>
        </div>

        <div className="flex items-center justify-between px-2">
          <div className="space-y-1">
            <span className="text-[8px] bg-amber-400 text-slate-900 font-bold px-1.5 py-0.5 rounded">
              Multi-Bank Gateway
            </span>
            <div className="text-xs font-bold text-white">
              Instant Tuition Billing
            </div>
            <div className="text-[9px] text-amber-200">
              QRIS • Mandiri • BCA • BNI
            </div>
            <div className="text-xs font-pixel text-yellow-300">
              Rp 1.500.000 <span className="text-[9px] text-slate-300 font-sans">PAID</span>
            </div>
          </div>

          {/* Payment Card & Bank Vector Mockup */}
          <div className="w-16 h-16 relative flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-14 h-14" shapeRendering="crispEdges">
              <rect x="2" y="5" width="20" height="14" rx="2" fill="#f59e0b" />
              <rect x="2" y="8" width="20" height="3" fill="#78350f" />
              <rect x="4" y="13" width="5" height="3" fill="#fef3c7" />
              <rect x="14" y="14" width="6" height="2" fill="#ffffff" />
            </svg>
          </div>
        </div>

        <div className="flex items-center justify-between bg-black/40 px-2 py-1 rounded text-[8px] text-slate-300">
          <span>Reconciliation: 100%</span>
          <span className="text-emerald-400 font-bold">Webhook OK (0.2s)</span>
        </div>
      </div>
    );
  }

  // SIMONAS
  return (
    <div className="w-full h-40 sm:h-44 bg-gradient-to-br from-[#064e3b] via-[#047857] to-[#0f766e] rounded-lg p-2.5 flex flex-col justify-between overflow-hidden relative border border-emerald-400/40">
      <div className="flex items-center justify-between border-b border-white/20 pb-1.5">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-300"></div>
          <div className="w-2 h-2 rounded-full bg-teal-300"></div>
        </div>
        <div className="text-[9px] font-mono text-emerald-200 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
          simonas.dormitory.id
        </div>
        <span className="text-[8px] text-emerald-300 font-mono">18 Blocks Active</span>
      </div>

      <div className="flex items-center justify-between px-2">
        <div className="space-y-1">
          <span className="text-[8px] bg-emerald-300 text-slate-900 font-bold px-1.5 py-0.5 rounded">
            Internal ERP
          </span>
          <div className="text-xs font-bold text-white">
            Dormitory Management
          </div>
          <div className="text-[9px] text-emerald-100">
            Room Allocations & Curfew
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
            <span className="text-[8px] text-white">1,240 Residents In</span>
          </div>
        </div>

        {/* Dormitory / Building Vector Mockup */}
        <div className="w-16 h-16 relative flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-14 h-14" shapeRendering="crispEdges">
            <rect x="5" y="4" width="14" height="17" fill="#10b981" />
            <rect x="4" y="3" width="16" height="2" fill="#047857" />
            {/* Windows */}
            <rect x="7" y="7" width="2" height="2" fill="#fef08a" />
            <rect x="11" y="7" width="2" height="2" fill="#fef08a" />
            <rect x="15" y="7" width="2" height="2" fill="#fef08a" />
            <rect x="7" y="11" width="2" height="2" fill="#fef08a" />
            <rect x="11" y="11" width="2" height="2" fill="#fef08a" />
            <rect x="15" y="11" width="2" height="2" fill="#fef08a" />
            {/* Door */}
            <rect x="10" y="16" width="4" height="5" fill="#064e3b" />
          </svg>
        </div>
      </div>

      <div className="flex items-center justify-between bg-black/40 px-2 py-1 rounded text-[8px] text-slate-300">
        <span>Capacity: 94.8%</span>
        <span className="text-emerald-300 font-bold">Incidents: 0 Pending</span>
      </div>
    </div>
  );
}
