"use client";

import React, { useState } from "react";
import { soundManager } from "@/utils/sound";
import { Menu, X, Gamepad2, Volume2, VolumeX } from "lucide-react";

interface NavbarProps {
  onOpenContact: () => void;
}

export default function Navbar({ onOpenContact }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const toggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
    soundManager.playBlip();
  };

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact", onClick: onOpenContact },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    soundManager.playBlip();
    if (link.onClick) {
      e.preventDefault();
      link.onClick();
      setMobileMenuOpen(false);
      return;
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#172554]/90 backdrop-blur-md border-b-4 border-[#0f172a] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo with Pixel Avatar (matching reference image) */}
          <a
            href="#hero"
            onClick={() => soundManager.playBlip()}
            className="flex items-center gap-3.5 group text-left"
          >
            {/* Pixel Character Head Avatar */}
            <div className="relative w-12 h-12 bg-[#2563eb] rounded-xl border-3 border-black shadow-pixel-sm overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform">
              {/* Mini pixel avatar rendered via SVG */}
              <svg viewBox="0 0 16 16" className="w-10 h-10" shapeRendering="crispEdges">
                {/* Hair */}
                <rect x="3" y="1" width="10" height="5" fill="#0f172a" />
                <rect x="2" y="3" width="2" height="6" fill="#0f172a" />
                <rect x="12" y="3" width="2" height="5" fill="#0f172a" />
                {/* Face */}
                <rect x="4" y="5" width="8" height="7" fill="#fed7aa" />
                {/* Eyes */}
                <rect x="5" y="7" width="2" height="2" fill="#0f172a" />
                <rect x="9" y="7" width="2" height="2" fill="#0f172a" />
                {/* Cheeks */}
                <rect x="4" y="9" width="1" height="1" fill="#f43f5e" />
                <rect x="11" y="9" width="1" height="1" fill="#f43f5e" />
                {/* Mouth */}
                <rect x="7" y="10" width="2" height="1" fill="#b91c1c" />
                {/* Shirt Collar */}
                <rect x="4" y="12" width="8" height="4" fill="#3b82f6" />
                <rect x="7" y="12" width="2" height="2" fill="#ffffff" />
              </svg>
            </div>

            <div>
              <div className="font-pixel text-sm sm:text-base text-white tracking-wider group-hover:text-yellow-300 transition-colors drop-shadow">
                Zalternations.Online
              </div>
              <div className="text-[10px] sm:text-xs text-blue-200 tracking-widest font-mono uppercase font-semibold">
                BUILDER • DESIGNER • CREATOR
              </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className="text-sm font-medium text-slate-200 hover:text-yellow-300 transition-colors font-mono tracking-wide relative py-1 hover:-translate-y-0.5 transform inline-block"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Buttons: Sound & Let's Talk */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleSound}
              className="p-2 text-slate-300 hover:text-yellow-300 bg-[#0f172a]/60 hover:bg-[#0f172a] rounded-lg border-2 border-slate-700 transition-all"
              title={isMuted ? "Unmute Sound" : "Mute Sound"}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-yellow-400" />}
            </button>

            {/* Let's Talk Button matching yellow pixel button in reference image */}
            <button
              onClick={() => {
                soundManager.playCoin();
                onOpenContact();
              }}
              className="flex items-center gap-2 bg-[#ffce00] hover:bg-[#ffd83b] text-slate-900 font-pixel text-xs px-5 py-2.5 rounded-xl border-2 border-black shadow-pixel active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
            >
              <Gamepad2 className="w-4 h-4" />
              Let&apos;s Talk
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleSound}
              className="p-2 text-slate-300 bg-[#0f172a]/60 rounded-lg border border-slate-700"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-yellow-400" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white bg-[#0f172a] rounded-lg border-2 border-black"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0f172a] border-b-4 border-black px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link)}
              className="block text-base font-pixel text-slate-200 hover:text-yellow-300 py-2 border-b border-slate-800"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={() => {
              soundManager.playCoin();
              onOpenContact();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 bg-[#ffce00] text-black font-pixel text-xs py-3 rounded-xl border-2 border-black shadow-pixel mt-4"
          >
            <Gamepad2 className="w-4 h-4" />
            Let&apos;s Talk
          </button>
        </div>
      )}
    </header>
  );
}
