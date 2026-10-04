"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { soundManager } from "@/utils/sound";
import { Volume2, VolumeX, RotateCcw, Play, ArrowLeft } from "lucide-react";

interface Pipe {
  x: number;
  topHeight: number;
  bottomHeight: number;
  gap: number;
  passed: boolean;
  hasCoin: boolean;
  coinCollected: boolean;
  coinY: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
}

interface Cloud {
  x: number;
  y: number;
  speed: number;
  scale: number;
}

interface FlappyHeroGameProps {
  onScoreUpdate?: (score: number, best: number) => void;
  isActive?: boolean;
  onGameStateChange?: (state: "idle" | "playing" | "gameover") => void;
  onExitGame?: () => void;
  onSwitchToDino?: () => void;
}

export default function FlappyHeroGame({
  onScoreUpdate,
  isActive = false,
  onGameStateChange,
  onExitGame,
  onSwitchToDino,
}: FlappyHeroGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">("idle");
  const [score, setScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(56);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  // Game state references for loop stability
  const stateRef = useRef({
    gameState: "idle" as "idle" | "playing" | "gameover",
    score: 0,
    bestScore: 56,
    heroY: 200,
    heroX: 180,
    velocity: 0,
    gravity: 0.38,
    jumpPower: -7.2,
    angle: 0,
    pipes: [] as Pipe[],
    particles: [] as Particle[],
    clouds: [] as Cloud[],
    groundOffset: 0,
    cityOffset: 0,
    mountainOffset: 0,
    frameCount: 0,
    lastPipeFrame: 0,
    canvasWidth: 1200,
    canvasHeight: 650,
    groundY: 530,
  });

  // Load high score from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("zalt_flappy_best");
      if (saved) {
        const val = parseInt(saved, 10);
        if (!isNaN(val)) {
          setBestScore(val);
          stateRef.current.bestScore = val;
        }
      }
    }
  }, []);

  // Initialize clouds
  useEffect(() => {
    const s = stateRef.current;
    s.clouds = [
      { x: 100, y: 70, speed: 0.3, scale: 1.2 },
      { x: 420, y: 110, speed: 0.25, scale: 0.9 },
      { x: 780, y: 55, speed: 0.35, scale: 1.4 },
      { x: 1100, y: 90, speed: 0.2, scale: 1.0 },
    ];
  }, []);

  const updateGameState = useCallback(
    (newState: "idle" | "playing" | "gameover") => {
      setGameState(newState);
      stateRef.current.gameState = newState;
      if (onGameStateChange) {
        onGameStateChange(newState);
      }
    },
    [onGameStateChange]
  );

  const jump = useCallback(() => {
    const s = stateRef.current;
    setHasInteracted(true);

    if (s.gameState === "idle") {
      updateGameState("playing");
      s.velocity = s.jumpPower;
      s.pipes = [];
      s.score = 0;
      setScore(0);
      soundManager.playFlap();
      return;
    }

    if (s.gameState === "gameover") {
      updateGameState("playing");
      s.heroY = 220;
      s.velocity = s.jumpPower;
      s.pipes = [];
      s.score = 0;
      setScore(0);
      s.particles = [];
      soundManager.playFlap();
      return;
    }

    if (s.gameState === "playing") {
      s.velocity = s.jumpPower;
      soundManager.playFlap();

      // Spawn jetpack flame particles
      for (let i = 0; i < 6; i++) {
        s.particles.push({
          x: s.heroX - 16,
          y: s.heroY + 8 + (Math.random() - 0.5) * 6,
          vx: -(1.5 + Math.random() * 2.5),
          vy: (Math.random() - 0.5) * 1.5,
          size: 4 + Math.random() * 4,
          color: Math.random() > 0.4 ? "#ffaa00" : "#ff3b30",
          alpha: 1,
          life: 18,
        });
      }
    }
  }, [updateGameState]);

  // If activated externally, trigger start immediately
  useEffect(() => {
    if (isActive && gameState === "idle") {
      jump();
    }
  }, [isActive, gameState, jump]);

  const handleExploreWebsite = () => {
    soundManager.playBlip();
    updateGameState("idle");
    if (onExitGame) {
      onExitGame();
    }
  };

  // Keyboard handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        // Prevent default space scroll only if focused on hero
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [jump]);

  const toggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
    soundManager.playBlip();
  };

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.imageSmoothingEnabled = false; // Pixel art crispness!

      const s = stateRef.current;
      s.canvasWidth = rect.width;
      s.canvasHeight = rect.height;
      s.groundY = rect.height - (rect.width < 500 ? 65 : 75); // adaptive ground height
      s.heroX = rect.width < 500 ? Math.max(65, Math.round(rect.width * 0.22)) : 180; // responsive hero position
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // DRAW FUNCTIONS
    const drawSky = (width: number, height: number) => {
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, "#2563eb");
      grad.addColorStop(0.35, "#3b82f6");
      grad.addColorStop(0.7, "#60a5fa");
      grad.addColorStop(1, "#93c5fd");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Distant pixel stars / sparkles
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.fillRect(80, 40, 3, 3);
      ctx.fillRect(240, 25, 2, 2);
      ctx.fillRect(520, 60, 3, 3);
      ctx.fillRect(850, 35, 2, 2);
      ctx.fillRect(1040, 50, 3, 3);
    };

    const drawClouds = (s: typeof stateRef.current) => {
      ctx.fillStyle = "#ffffff";
      s.clouds.forEach((cloud) => {
        cloud.x -= cloud.speed;
        if (cloud.x < -160 * cloud.scale) {
          cloud.x = s.canvasWidth + 50;
        }

        const cx = cloud.x;
        const cy = cloud.y;
        const sc = cloud.scale;

        // Pixel cloud base
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(cx, cy + 12 * sc, 120 * sc, 20 * sc);
        ctx.fillRect(cx + 15 * sc, cy, 50 * sc, 25 * sc);
        ctx.fillRect(cx + 50 * sc, cy - 8 * sc, 45 * sc, 28 * sc);
        ctx.fillRect(cx + 80 * sc, cy + 4 * sc, 30 * sc, 20 * sc);

        // Cloud shadow bottom rim (pixel blue shadow)
        ctx.fillStyle = "#cbd5e1";
        ctx.fillRect(cx + 5 * sc, cy + 28 * sc, 110 * sc, 5 * sc);
      });
    };

    const drawMountains = (s: typeof stateRef.current) => {
      const baseY = s.groundY;
      ctx.fillStyle = "#3b82f6";
      ctx.globalAlpha = 0.45;

      // Far pixel mountain peaks
      const step = 90;
      for (let x = -20; x < s.canvasWidth + 120; x += step) {
        ctx.beginPath();
        ctx.moveTo(x - 60, baseY);
        ctx.lineTo(x, baseY - 120);
        ctx.lineTo(x + 60, baseY);
        ctx.fill();
      }

      // Nearer darker mountain peaks
      ctx.fillStyle = "#1d4ed8";
      ctx.globalAlpha = 0.55;
      for (let x = 30; x < s.canvasWidth + 120; x += 110) {
        ctx.beginPath();
        ctx.moveTo(x - 55, baseY);
        ctx.lineTo(x, baseY - 90);
        ctx.lineTo(x + 55, baseY);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;
    };

    const drawCitySkyline = (s: typeof stateRef.current) => {
      const baseY = s.groundY;

      // Distant city silhouette
      ctx.fillStyle = "#1e3a8a";
      ctx.globalAlpha = 0.65;

      const buildings = [
        { x: 120, w: 45, h: 95 },
        { x: 180, w: 35, h: 140 },
        { x: 230, w: 50, h: 110 },
        { x: 300, w: 60, h: 80 },
        { x: 480, w: 55, h: 130 },
        { x: 550, w: 40, h: 100 },
        { x: 610, w: 65, h: 155 },
        { x: 740, w: 45, h: 115 },
        { x: 810, w: 70, h: 135 },
      ];

      buildings.forEach((b) => {
        const drawX = (b.x + s.cityOffset * 0.4) % (s.canvasWidth + 300) - 100;
        ctx.fillRect(drawX, baseY - b.h, b.w, b.h);

        // Windows (tiny glowing pixels)
        ctx.fillStyle = "#fef08a";
        for (let wy = baseY - b.h + 15; wy < baseY - 10; wy += 14) {
          for (let wx = drawX + 8; wx < drawX + b.w - 8; wx += 10) {
            if ((wx + wy) % 3 === 0) {
              ctx.fillRect(wx, wy, 4, 6);
            }
          }
        }
        ctx.fillStyle = "#1e3a8a";
      });

      // Iconic National Monument (Monas) silhouette with golden flame tip
      const monasX = s.canvasWidth - 160;
      if (monasX > 500) {
        // Obelisk base
        ctx.fillStyle = "#e2e8f0";
        ctx.globalAlpha = 0.9;
        ctx.fillRect(monasX - 25, baseY - 35, 50, 35);
        ctx.fillRect(monasX - 18, baseY - 45, 36, 12);
        // Tower shaft
        ctx.fillRect(monasX - 6, baseY - 170, 12, 130);
        // Platform top cup
        ctx.fillRect(monasX - 14, baseY - 182, 28, 14);
        // Golden Flame tip
        ctx.fillStyle = "#eab308";
        ctx.fillRect(monasX - 5, baseY - 204, 10, 22);
        ctx.fillStyle = "#facc15";
        ctx.fillRect(monasX - 3, baseY - 200, 6, 15);
      }

      ctx.globalAlpha = 1.0;
    };

    const drawPipes = (s: typeof stateRef.current) => {
      const pipeWidth = 64;
      const rimHeight = 26;
      const rimOverhang = 6;

      s.pipes.forEach((p) => {
        // TOP PIPE
        if (p.topHeight > 0) {
          // Pipe body
          ctx.fillStyle = "#22c55e"; // bright green
          ctx.fillRect(p.x, 0, pipeWidth, p.topHeight);

          // Pipe highlight line
          ctx.fillStyle = "#86efac";
          ctx.fillRect(p.x + 6, 0, 8, p.topHeight);

          // Pipe dark shadow side
          ctx.fillStyle = "#15803d";
          ctx.fillRect(p.x + pipeWidth - 12, 0, 12, p.topHeight);

          // Pipe border
          ctx.strokeStyle = "#052e16";
          ctx.lineWidth = 3;
          ctx.strokeRect(p.x, -2, pipeWidth, p.topHeight + 2);

          // Pipe Bottom Rim (collar)
          const rimY = p.topHeight - rimHeight;
          ctx.fillStyle = "#22c55e";
          ctx.fillRect(p.x - rimOverhang, rimY, pipeWidth + rimOverhang * 2, rimHeight);

          ctx.fillStyle = "#86efac";
          ctx.fillRect(p.x - rimOverhang + 6, rimY, 8, rimHeight);

          ctx.fillStyle = "#15803d";
          ctx.fillRect(p.x + pipeWidth + rimOverhang - 12, rimY, 12, rimHeight);

          ctx.strokeRect(p.x - rimOverhang, rimY, pipeWidth + rimOverhang * 2, rimHeight);
        }

        // BOTTOM PIPE
        const bottomY = p.topHeight + p.gap;
        const bottomHeight = s.groundY - bottomY;

        if (bottomHeight > 0) {
          // Pipe Top Rim (collar)
          ctx.fillStyle = "#22c55e";
          ctx.fillRect(p.x - rimOverhang, bottomY, pipeWidth + rimOverhang * 2, rimHeight);

          ctx.fillStyle = "#86efac";
          ctx.fillRect(p.x - rimOverhang + 6, bottomY, 8, rimHeight);

          ctx.fillStyle = "#15803d";
          ctx.fillRect(p.x + pipeWidth + rimOverhang - 12, bottomY, 12, rimHeight);

          ctx.strokeStyle = "#052e16";
          ctx.lineWidth = 3;
          ctx.strokeRect(p.x - rimOverhang, bottomY, pipeWidth + rimOverhang * 2, rimHeight);

          // Pipe body
          ctx.fillStyle = "#22c55e";
          ctx.fillRect(p.x, bottomY + rimHeight, pipeWidth, bottomHeight - rimHeight);

          ctx.fillStyle = "#86efac";
          ctx.fillRect(p.x + 6, bottomY + rimHeight, 8, bottomHeight - rimHeight);

          ctx.fillStyle = "#15803d";
          ctx.fillRect(p.x + pipeWidth - 12, bottomY + rimHeight, 12, bottomHeight - rimHeight);

          ctx.strokeRect(p.x, bottomY + rimHeight, pipeWidth, bottomHeight - rimHeight);
        }

        // COIN in gap
        if (p.hasCoin && !p.coinCollected) {
          const coinPulse = Math.sin(s.frameCount * 0.15) * 3;
          const cx = p.x + pipeWidth / 2;
          const cy = p.coinY + coinPulse;

          // Golden Coin
          ctx.fillStyle = "#facc15";
          ctx.beginPath();
          ctx.arc(cx, cy, 12, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#ca8a04";
          ctx.beginPath();
          ctx.arc(cx, cy, 9, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#fef08a";
          ctx.fillRect(cx - 3, cy - 3, 6, 6);

          ctx.strokeStyle = "#713f12";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(cx, cy, 12, 0, Math.PI * 2);
          ctx.stroke();
        }
      });
    };

    const drawHero = (s: typeof stateRef.current) => {
      ctx.save();
      ctx.translate(s.heroX, s.heroY);
      ctx.rotate(s.angle);

      const px = s.canvasWidth < 500 ? 1.9 : 2.4; // responsive pixel scaling unit

      // Red Cape billowing behind hero
      const capeWave = Math.sin(s.frameCount * 0.3) * 3;
      ctx.fillStyle = "#dc2626"; // Cape red
      ctx.fillRect(-14 * px, (-4 + capeWave) * px, 8 * px, 14 * px);
      ctx.fillStyle = "#b91c1c";
      ctx.fillRect(-16 * px, (-2 + capeWave) * px, 4 * px, 10 * px);

      // Jetpack trail / sparks
      if (s.gameState === "playing") {
        ctx.fillStyle = "#f97316"; // Jetpack orange flame
        const flamePulse = (s.frameCount % 4) * 2;
        ctx.fillRect(-12 * px, 4 * px, (-6 - flamePulse) * px, 4 * px);
        ctx.fillStyle = "#fef08a"; // Jetpack yellow core
        ctx.fillRect(-10 * px, 5 * px, (-4 - flamePulse / 2) * px, 2 * px);
      }

      // Jetpack metal pack
      ctx.fillStyle = "#475569";
      ctx.fillRect(-8 * px, -2 * px, 5 * px, 10 * px);
      ctx.fillStyle = "#94a3b8";
      ctx.fillRect(-7 * px, -1 * px, 2 * px, 8 * px);

      // Hero Body (Blue Suit)
      ctx.fillStyle = "#2563eb";
      ctx.fillRect(-4 * px, -2 * px, 10 * px, 12 * px);

      // Suit Belt (Yellow)
      ctx.fillStyle = "#eab308";
      ctx.fillRect(-4 * px, 5 * px, 10 * px, 3 * px);

      // Legs
      ctx.fillStyle = "#1e40af";
      ctx.fillRect(-3 * px, 10 * px, 4 * px, 5 * px);
      ctx.fillRect(2 * px, 10 * px, 4 * px, 5 * px);

      // Shoes (Red boots)
      ctx.fillStyle = "#dc2626";
      ctx.fillRect(-3 * px, 14 * px, 5 * px, 3 * px);
      ctx.fillRect(2 * px, 14 * px, 5 * px, 3 * px);

      // Head / Skin
      ctx.fillStyle = "#fed7aa";
      ctx.fillRect(-3 * px, -11 * px, 10 * px, 9 * px);

      // Black Anime Hair (Pixel tufts)
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(-5 * px, -14 * px, 13 * px, 5 * px);
      ctx.fillRect(-5 * px, -11 * px, 3 * px, 5 * px);
      ctx.fillRect(3 * px, -12 * px, 5 * px, 4 * px);
      ctx.fillRect(7 * px, -10 * px, 2 * px, 4 * px);

      // Eye & Cheek
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(3 * px, -7 * px, 2 * px, 3 * px);
      ctx.fillStyle = "#fb7185"; // Rosy cheek
      ctx.fillRect(1 * px, -5 * px, 2 * px, 2 * px);

      // Hero Fist flying forward
      ctx.fillStyle = "#fed7aa";
      ctx.fillRect(6 * px, -1 * px, 4 * px, 4 * px);

      ctx.restore();
    };

    const drawParticles = (s: typeof stateRef.current) => {
      s.particles.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });
      ctx.globalAlpha = 1.0;
    };

    const drawGround = (s: typeof stateRef.current) => {
      const y = s.groundY;
      const width = s.canvasWidth;
      const height = s.canvasHeight - y;

      // Top grass fringe (Green)
      ctx.fillStyle = "#4ade80"; // Bright pixel green
      ctx.fillRect(0, y, width, 14);

      // Grass blades pattern
      ctx.fillStyle = "#22c55e";
      for (let x = -(s.groundOffset % 16); x < width + 16; x += 16) {
        ctx.fillRect(x, y + 8, 8, 6);
        ctx.fillRect(x + 4, y + 14, 8, 4);
      }

      // Earth / Soil (Brown)
      ctx.fillStyle = "#854d0e";
      ctx.fillRect(0, y + 18, width, height - 18);

      // Soil texture stones / bricks
      ctx.fillStyle = "#713f12";
      for (let row = 0; row < height; row += 16) {
        const offset = (row % 32 === 0 ? 0 : 12) + (s.groundOffset % 24);
        for (let x = -offset; x < width + 24; x += 24) {
          ctx.fillRect(x, y + 22 + row, 14, 8);
        }
      }

      // Top dark divider line
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(0, y - 2, width, 3);
    };

    // GAME LOOP
    const loop = () => {
      animId = requestAnimationFrame(loop);
      const s = stateRef.current;
      s.frameCount++;

      const width = s.canvasWidth;
      const height = s.canvasHeight;

      // Scale context for DPR
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // 1. UPDATE STATE
      if (s.gameState === "idle") {
        // Hovering floating hero
        s.heroY = 220 + Math.sin(s.frameCount * 0.08) * 12;
        s.angle = Math.sin(s.frameCount * 0.08) * 0.08;
        s.groundOffset += 1.5;
        s.cityOffset += 0.5;

        // Periodic idle particle trail
        if (s.frameCount % 10 === 0) {
          s.particles.push({
            x: s.heroX - 16,
            y: s.heroY + 8,
            vx: -1,
            vy: (Math.random() - 0.5) * 0.5,
            size: 3,
            color: "#fde047",
            alpha: 0.8,
            life: 14,
          });
        }
      } else if (s.gameState === "playing") {
        // Physics
        s.velocity += s.gravity;
        s.heroY += s.velocity;
        s.angle = Math.min(Math.PI / 4, Math.max(-Math.PI / 5, s.velocity * 0.07));
        s.groundOffset += 2.8;
        s.cityOffset += 1.0;

        // Pipe spawning
        const pipeInterval = 140; // frames between pipes
        if (s.frameCount - s.lastPipeFrame > pipeInterval) {
          s.lastPipeFrame = s.frameCount;

          const gap = 165;
          const minHeight = 70;
          const maxHeight = s.groundY - gap - minHeight;
          const topH = Math.floor(minHeight + Math.random() * (maxHeight - minHeight));

          s.pipes.push({
            x: width + 20,
            topHeight: topH,
            bottomHeight: s.groundY - (topH + gap),
            gap: gap,
            passed: false,
            hasCoin: Math.random() > 0.3,
            coinCollected: false,
            coinY: topH + gap / 2,
          });
        }

        // Pipe movement & collision
        const heroRadius = 14;
        const heroBox = {
          left: s.heroX - heroRadius,
          right: s.heroX + heroRadius,
          top: s.heroY - heroRadius,
          bottom: s.heroY + heroRadius,
        };

        // Ground collision
        if (s.heroY + heroRadius >= s.groundY) {
          s.heroY = s.groundY - heroRadius;
          updateGameState("gameover");
          soundManager.playHit();
        }

        // Ceiling collision
        if (s.heroY - heroRadius <= 0) {
          s.heroY = heroRadius;
          s.velocity = 0;
        }

        // Pipe collision & passing
        for (let i = s.pipes.length - 1; i >= 0; i--) {
          const p = s.pipes[i];
          p.x -= 2.8;

          const pipeW = 64;
          const pipeColX = p.x;

          // Check pass for score
          if (!p.passed && p.x + pipeW < s.heroX) {
            p.passed = true;
            s.score += 1;
            setScore(s.score);
            soundManager.playScore();

            if (s.score > s.bestScore) {
              s.bestScore = s.score;
              setBestScore(s.score);
              if (typeof window !== "undefined") {
                localStorage.setItem("zalt_flappy_best", s.score.toString());
              }
            }
            if (onScoreUpdate) {
              onScoreUpdate(s.score, s.bestScore);
            }
          }

          // Check Coin collection
          if (p.hasCoin && !p.coinCollected) {
            const coinX = p.x + pipeW / 2;
            const coinY = p.coinY;
            const dist = Math.hypot(s.heroX - coinX, s.heroY - coinY);
            if (dist < 26) {
              p.coinCollected = true;
              s.score += 3; // +3 bonus points for coin!
              setScore(s.score);
              soundManager.playCoin();

              // Coin collect sparkle burst
              for (let c = 0; c < 10; c++) {
                s.particles.push({
                  x: coinX,
                  y: coinY,
                  vx: (Math.random() - 0.5) * 4,
                  vy: (Math.random() - 0.5) * 4,
                  size: 4,
                  color: "#facc15",
                  alpha: 1,
                  life: 20,
                });
              }
            }
          }

          // Pipe collision boxes
          const pipeLeft = pipeColX - 6;
          const pipeRight = pipeColX + pipeW + 6;
          const topPipeBottom = p.topHeight;
          const bottomPipeTop = p.topHeight + p.gap;

          if (heroBox.right > pipeLeft && heroBox.left < pipeRight) {
            if (heroBox.top < topPipeBottom || heroBox.bottom > bottomPipeTop) {
              // Hit!
              updateGameState("gameover");
              soundManager.playHit();

              // Crash explosion particles
              for (let k = 0; k < 20; k++) {
                s.particles.push({
                  x: s.heroX,
                  y: s.heroY,
                  vx: (Math.random() - 0.5) * 6,
                  vy: (Math.random() - 0.5) * 6,
                  size: 5,
                  color: ["#ef4444", "#f59e0b", "#3b82f6", "#ffffff"][k % 4],
                  alpha: 1,
                  life: 30,
                });
              }
              break;
            }
          }

          // Remove offscreen pipes
          if (p.x < -100) {
            s.pipes.splice(i, 1);
          }
        }
      } else if (s.gameState === "gameover") {
        // Fall to ground if in air
        if (s.heroY + 14 < s.groundY) {
          s.velocity += s.gravity;
          s.heroY += s.velocity;
          s.angle = Math.PI / 2; // Face plant
        }
      }

      // Update particles
      for (let i = s.particles.length - 1; i >= 0; i--) {
        const pt = s.particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.alpha -= 1 / pt.life;
        if (pt.alpha <= 0) {
          s.particles.splice(i, 1);
        }
      }

      // 2. RENDER SCENE
      ctx.clearRect(0, 0, width, height);
      drawSky(width, height);
      drawClouds(s);
      drawMountains(s);
      drawCitySkyline(s);
      drawPipes(s);
      drawGround(s);
      drawParticles(s);
      drawHero(s);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [onScoreUpdate, updateGameState]);

  const restartGame = () => {
    jump();
  };

  return (
    <div
      className="relative w-full h-[520px] md:h-[620px] select-none overflow-hidden cursor-pointer group touch-manipulation"
      onClick={jump}
      onTouchStart={(e) => {
        if (gameState === "playing") {
          e.preventDefault();
        }
        jump();
      }}
    >
      {/* Game Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ imageRendering: "pixelated" }}
      />

      {/* Top Controls / HUD */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-30 pointer-events-auto">
        {/* Left: Exit Game Button when active */}
        {isActive ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleExploreWebsite();
            }}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#0b111e]/90 hover:bg-[#1a253d] border-2 border-[#203152] rounded-xl text-xs font-pixel text-slate-200 shadow-pixel transition-all hover:scale-105 active:scale-95"
            title="Back to Portfolio"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-yellow-400" />
            <span>Exit Game</span>
          </button>
        ) : (
          <div />
        )}

        {/* Right: Retro Score HUD & Sound Toggle */}
        <div className="flex items-center gap-3">
          <div className="bg-[#0b111e]/90 border-2 border-[#203152] rounded-xl px-4 py-2 text-center shadow-pixel backdrop-blur-sm min-w-[90px]">
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-pixel">
              SCORE
            </div>
            <div className="text-2xl font-pixel text-yellow-300 drop-shadow">
              {score}
            </div>
            <div className="border-t border-[#203152] my-1"></div>
            <div className="text-[9px] uppercase tracking-wider text-slate-400 font-pixel">
              BEST
            </div>
            <div className="text-sm font-pixel text-white">
              {bestScore}
            </div>
          </div>

          {/* Audio Mute Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSound();
            }}
            className="p-2.5 bg-[#0b111e]/90 hover:bg-[#1a253d] border-2 border-[#203152] rounded-xl text-yellow-300 shadow-pixel transition-all hover:scale-105 active:scale-95"
            title={isMuted ? "Unmute Sound" : "Mute Sound"}
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-slate-400" /> : <Volume2 className="w-5 h-5 text-yellow-400" />}
          </button>
        </div>
      </div>

      {/* Space to Play Prompt Banner (matching reference image) */}
      {gameState === "idle" && (
        <div className="absolute top-[28%] left-[54%] md:left-[58%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 animate-bounce">
          <div className="bg-[#0b111e]/90 border-2 border-[#3b82f6] text-white px-4 py-2 rounded-lg shadow-pixel text-center">
            <p className="text-[11px] md:text-xs font-pixel text-yellow-300">
              Press <span className="text-white bg-blue-600 px-1.5 py-0.5 rounded text-[10px]">SPACE</span>
            </p>
            <p className="text-[10px] font-pixel text-slate-300 mt-1">
              or Tap to play!
            </p>
          </div>
        </div>
      )}

      {/* Game Over Banner */}
      {gameState === "gameover" && (
        <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px] flex items-center justify-center z-40">
          <div
            className="bg-[#0b111e] border-4 border-red-500 rounded-2xl p-6 text-center shadow-pixel-lg max-w-sm mx-4 transform animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-xs font-pixel text-red-400 uppercase tracking-widest mb-1">
              💥 OUCH!
            </div>
            <h3 className="text-2xl md:text-3xl font-pixel text-white mb-4">
              GAME OVER
            </h3>

            <div className="grid grid-cols-2 gap-3 bg-[#131b2e] p-3 rounded-xl border border-slate-700 mb-4">
              <div>
                <span className="text-[10px] font-pixel text-slate-400 block">SCORE</span>
                <span className="text-xl font-pixel text-yellow-300">{score}</span>
              </div>
              <div>
                <span className="text-[10px] font-pixel text-slate-400 block">BEST</span>
                <span className="text-xl font-pixel text-emerald-400">{bestScore}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <button
                onClick={restartGame}
                className="w-full flex items-center justify-center gap-2 bg-[#ffce00] hover:bg-[#ffd83b] text-black font-pixel text-xs py-3 px-4 rounded-xl border-2 border-black shadow-pixel active:translate-y-1 transition-all"
              >
                <RotateCcw className="w-4 h-4" /> PLAY AGAIN [SPACE]
              </button>

              <button
                onClick={handleExploreWebsite}
                className="w-full flex items-center justify-center gap-2 bg-[#1e293b] hover:bg-[#334155] text-white font-pixel text-xs py-2.5 px-4 rounded-xl border-2 border-slate-600 shadow-pixel active:translate-y-1 transition-all"
              >
                🌐 EXPLORE WEBSITE
              </button>

              {onSwitchToDino && (
                <button
                  onClick={onSwitchToDino}
                  className="w-full flex items-center justify-center gap-2 bg-[#064e3b]/80 hover:bg-[#065f46] text-emerald-300 font-pixel text-[11px] py-2 px-3 rounded-xl border border-emerald-500/50 shadow-pixel active:translate-y-1 transition-all"
                >
                  🦖 SWITCH TO DINO JUMP
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Badge in bottom right corner matching reference image */}
      <div className="absolute bottom-20 right-4 hidden md:flex flex-col items-center bg-[#0b111e]/90 border-2 border-[#203152] rounded-xl px-3 py-2 text-center shadow-pixel z-20 pointer-events-none">
        <span className="text-[10px] font-pixel text-slate-300">Ideas</span>
        <span className="text-[10px] font-pixel text-yellow-300">Products</span>
        <span className="text-[10px] font-pixel text-emerald-400">Impact</span>
        <span className="text-base font-pixel text-blue-400 mt-0.5">∞</span >
      </div>

      {/* Click / Tap hint for touch screens */}
      {!hasInteracted && gameState === "idle" && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 md:hidden bg-black/75 px-3 py-1.5 rounded-full border border-yellow-400/50 text-[10px] font-pixel text-yellow-300 pointer-events-none">
          👆 Tap anywhere to fly!
        </div>
      )}
    </div>
  );
}
