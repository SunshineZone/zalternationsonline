"use client";

import React from "react";
import { Project } from "@/data/portfolioData";
import ProjectMockup from "./ProjectMockup";
import { soundManager } from "@/utils/sound";
import { X, ExternalLink, Github, CheckCircle2, Award, Zap } from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#0b111e] border-4 border-[#203152] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-pixel-lg text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b-2 border-[#1e293b] sticky top-0 bg-[#0b111e] z-10">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse"></span>
            <h3 className="font-pixel text-base sm:text-lg text-yellow-300">
              {project.title}
            </h3>
            {project.badge && (
              <span className="text-[10px] font-pixel bg-blue-600/40 text-blue-300 border border-blue-500 px-2 py-0.5 rounded">
                {project.badge}
              </span>
            )}
          </div>
          <button
            onClick={() => {
              soundManager.playBlip();
              onClose();
            }}
            className="p-1.5 bg-[#172554] hover:bg-[#1e3a8a] text-slate-300 hover:text-white rounded-lg border border-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Mockup Preview */}
          <div className="overflow-hidden rounded-xl border-2 border-slate-700 shadow-md">
            <ProjectMockup type={project.imageType} title={project.title} />
          </div>

          {/* Subtitle & Tag Pills */}
          <div>
            <h4 className="text-xl font-bold text-white mb-2">{project.subtitle}</h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-[#172554] text-sky-300 border border-sky-600/40 text-xs px-2.5 py-1 rounded font-mono"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="text-sm text-slate-300 leading-relaxed font-sans bg-[#131d31] p-4 rounded-xl border border-slate-800">
            {project.fullDescription}
          </div>

          {/* Key Metrics */}
          <div>
            <div className="flex items-center gap-2 text-xs font-pixel text-yellow-300 mb-3 uppercase tracking-wider">
              <Zap className="w-4 h-4" /> Impact & Performance Metrics
            </div>
            <div className="grid grid-cols-3 gap-3">
              {project.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="bg-[#111927] border-2 border-[#1e293b] p-3 rounded-xl text-center shadow-pixel-sm"
                >
                  <div className="text-lg sm:text-xl font-pixel text-emerald-400">
                    {m.value}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-1">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Features */}
          <div>
            <div className="flex items-center gap-2 text-xs font-pixel text-yellow-300 mb-3 uppercase tracking-wider">
              <Award className="w-4 h-4" /> Key Features & Capabilities
            </div>
            <ul className="space-y-2">
              {project.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-[#1e293b]">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundManager.playBlip()}
                className="flex items-center gap-2 bg-[#1e293b] hover:bg-[#334155] text-white font-pixel text-xs px-4 py-2.5 rounded-xl border border-slate-600 transition-all"
              >
                <Github className="w-4 h-4" /> Code Repository
              </a>
            )}
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundManager.playCoin()}
                className="flex items-center gap-2 bg-[#ffce00] hover:bg-[#ffd83b] text-slate-950 font-pixel text-xs px-5 py-2.5 rounded-xl border-2 border-black shadow-pixel transition-all hover:scale-105 active:scale-95"
              >
                <ExternalLink className="w-4 h-4" /> Launch Platform →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
