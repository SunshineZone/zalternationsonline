"use client";

import React, { useState } from "react";
import { soundManager } from "@/utils/sound";
import { X, Send, Mail, Check, MessageSquare, Copy, Sparkles } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    service: "Web App Development",
  });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playVictory();
    setSubmitted(true);
    setTimeout(() => {
      // Auto close after victory
    }, 2500);
  };

  const handleCopyEmail = () => {
    soundManager.playCoin();
    navigator.clipboard.writeText("contact@zalternations.online");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#0b111e] border-4 border-[#ffce00] rounded-2xl max-w-lg w-full p-6 text-white shadow-pixel-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playBlip();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 bg-[#172554] hover:bg-[#1e3a8a] rounded-lg border border-slate-600 text-slate-300 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title matching RPG Quest Dialogue */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#2563eb] border-2 border-black flex items-center justify-center">
            <span className="text-lg">🎮</span>
          </div>
          <div>
            <div className="text-[10px] font-pixel text-yellow-300 uppercase">
              NEW QUEST INCOMING
            </div>
            <h3 className="text-xl font-pixel text-white">LET&apos;S TALK</h3>
          </div>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border-2 border-emerald-400 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-pixel text-emerald-400">
              QUEST ACCEPTED!
            </h4>
            <p className="text-xs text-slate-300 font-sans max-w-sm mx-auto">
              Thank you for reaching out! I&apos;ll review your requirements and get back to you within 24 hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="bg-[#ffce00] text-black font-pixel text-xs px-6 py-2.5 rounded-xl border-2 border-black shadow-pixel mt-4"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-pixel text-slate-300 mb-1">
                YOUR NAME / TEAM
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Satoshi Nakamoto"
                className="w-full bg-[#111a2e] border-2 border-[#203152] focus:border-yellow-400 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] font-pixel text-slate-300 mb-1">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@company.com"
                className="w-full bg-[#111a2e] border-2 border-[#203152] focus:border-yellow-400 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] font-pixel text-slate-300 mb-1">
                PROJECT TYPE
              </label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full bg-[#111a2e] border-2 border-[#203152] focus:border-yellow-400 rounded-xl px-3 py-2 text-sm text-white outline-none"
              >
                <option value="Web App Development">Web App Development (Next.js)</option>
                <option value="AI & Automation">AI Integration & Assessment Engine</option>
                <option value="EdTech / LMS">EdTech & Student Information Portal</option>
                <option value="Payment Gateway">Payment Gateway & Financial ERP</option>
                <option value="Other">Consultation / Other</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-pixel text-slate-300 mb-1">
                PROJECT DETAILS
              </label>
              <textarea
                required
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell me about your idea, timeline, and goals..."
                className="w-full bg-[#111a2e] border-2 border-[#203152] focus:border-yellow-400 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 outline-none transition-colors"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#ffce00] hover:bg-[#ffd83b] text-slate-950 font-pixel text-xs py-3 rounded-xl border-2 border-black shadow-pixel active:translate-y-1 transition-all"
            >
              <Send className="w-4 h-4" /> SEND TRANSMISSION [START QUEST]
            </button>

            {/* Quick Email Copy */}
            <div className="pt-3 border-t border-[#1e293b] flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono">contact@zalternations.online</span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 text-yellow-300 hover:text-yellow-200"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied!" : "Copy Email"}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
