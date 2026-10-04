"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { soundManager } from "@/utils/sound";
import { Volume2, VolumeX, RotateCcw, ArrowLeft } from "lucide-react";

interface Obstacle {
  x: number;
  type: "cactus_small" | "cactus_tall" | "cactus_double" | "bird_low" | "bird_high";
  width: number;
  height: number;
  yOffset: number; // offset from ground
  passed: boolean;
  frame: number;
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

interface DinoHeroGameProps {
  onScoreUpdate?: (score: number, best: number) => void;
  isActive?: boolean;
  onGameStateChange?: (state: "idle" | "playing" | "gameover") => void;
  onExitGame?: () => void;
  onSwitchToFlappy?: () => void;
}

export default function DinoHeroGame({
  onScoreUpdate,
  isActive = false,
  onGameStateChange,
  onExitGame,
  onSwitchToFlappy,
}: DinoHeroGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">("idle");
  const [score, setScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(100);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  const stateRef = useRef({
    gameState: "idle" as "idle" | "playing" | "gameover",
    score: 0,
    bestScore: 100,
    dinoX: 140,
    dinoY: 0, // calculated from ground
    dinoVy: 0,
    isJumping: false,
    isDucking: false,
    gravity: 0.72,
    jumpForce: -13.2,
    speed: 6.2,
    baseSpeed: 6.2,
    maxSpeed: 13.0,
    groundY: 530,
    groundOffset: 0,
    obstacles: [] as Obstacle[],
    particles: [] as Particle[],
    clouds: [] as Cloud[],
    frameCount: 0,
    lastObstacleFrame: 0,
    minObstacleInterval: 80,
    canvasWidth: 1200,
    canvasHeight: 650,
    isNight: false,
    nightAlpha: 0,
  });

  // Load high score
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("zalt_dino_best");
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
      { x: 150, y: 70, speed: 0.4, scale: 1.1 },
      { x: 480, y: 110, speed: 0.3, scale: 0.9 },
      { x: 820, y: 60, speed: 0.45, scale: 1.3 },
      { x: 1150, y: 95, speed: 0.25, scale: 1.0 },
    ];
  }, []);

  // Sync external state changes
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

  // Jump handler
  const jump = useCallback(() => {
    const s = stateRef.current;
    setHasInteracted(true);

    if (s.gameState === "idle") {
      updateGameState("playing");
      s.dinoVy = s.jumpForce;
      s.isJumping = true;
      s.score = 0;
      setScore(0);
      s.obstacles = [];
      s.speed = s.baseSpeed;
      soundManager.playDinoJump();
      return;
    }

    if (s.gameState === "gameover") {
      updateGameState("playing");
      s.dinoVy = s.jumpForce;
      s.isJumping = true;
      s.score = 0;
      setScore(0);
      s.obstacles = [];
      s.particles = [];
      s.speed = s.baseSpeed;
      s.dinoY = 0;
      soundManager.playDinoJump();
      return;
    }

    if (s.gameState === "playing" && !s.isJumping && s.dinoY <= 1) {
      s.dinoVy = s.jumpForce;
      s.isJumping = true;
      soundManager.playDinoJump();

      // Jump dust cloud particles
      for (let i = 0; i < 6; i++) {
        s.particles.push({
          x: s.dinoX - 10 + Math.random() * 20,
          y: s.groundY - 4,
          vx: -(1 + Math.random() * 2),
          vy: -(Math.random() * 1.5),
          size: 3 + Math.random() * 3,
          color: "#94a3b8",
          alpha: 0.8,
          life: 14,
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

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        jump();
      } else if (e.code === "ArrowDown") {
        e.preventDefault();
        stateRef.current.isDucking = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "ArrowDown") {
        stateRef.current.isDucking = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [jump]);

  const toggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
    soundManager.playBlip();
  };

  const handleExploreWebsite = () => {
    soundManager.playBlip();
    updateGameState("idle");
    if (onExitGame) {
      onExitGame();
    }
  };

  // Main Canvas render loop
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

      ctx.imageSmoothingEnabled = false;

      const s = stateRef.current;
      s.canvasWidth = rect.width;
      s.canvasHeight = rect.height;
      s.groundY = rect.height - (rect.width < 500 ? 65 : 75);
      s.dinoX = rect.width < 500 ? Math.max(55, Math.round(rect.width * 0.2)) : 140;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // DRAW FUNCTIONS
    const drawSky = (s: typeof stateRef.current, width: number, height: number) => {
      // Smooth Day / Night transition based on nightAlpha
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      if (s.nightAlpha > 0.05) {
        grad.addColorStop(0, "#090d16");
        grad.addColorStop(0.5, "#0f172a");
        grad.addColorStop(1, "#1e293b");
      } else {
        grad.addColorStop(0, "#0284c7");
        grad.addColorStop(0.4, "#38bdf8");
        grad.addColorStop(0.8, "#7dd3fc");
        grad.addColorStop(1, "#bae6fd");
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Celestial body (Sun in day, Moon in night)
      if (s.nightAlpha > 0.4) {
        // Pixel Moon
        const mx = width - 180;
        const my = 70;
        ctx.fillStyle = "#fef08a";
        ctx.beginPath();
        ctx.arc(mx, my, 22, 0, Math.PI * 2);
        ctx.fill();
        // Moon crater pixels
        ctx.fillStyle = "#eab308";
        ctx.fillRect(mx - 8, my - 6, 6, 6);
        ctx.fillRect(mx + 4, my + 4, 8, 8);
        ctx.fillRect(mx - 4, my + 8, 4, 4);

        // Pixel Stars
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(100, 40, 2, 2);
        ctx.fillRect(260, 65, 3, 3);
        ctx.fillRect(450, 35, 2, 2);
        ctx.fillRect(680, 50, 3, 3);
        ctx.fillRect(920, 30, 2, 2);
        ctx.fillRect(1050, 75, 3, 3);
      } else {
        // Pixel Sun
        const sx = width - 180;
        const sy = 70;
        ctx.fillStyle = "#facc15";
        ctx.beginPath();
        ctx.arc(sx, sy, 26, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#fef08a";
        ctx.beginPath();
        ctx.arc(sx, sy, 20, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawClouds = (s: typeof stateRef.current) => {
      s.clouds.forEach((cloud) => {
        cloud.x -= cloud.speed + (s.gameState === "playing" ? s.speed * 0.08 : 0);
        if (cloud.x < -160 * cloud.scale) {
          cloud.x = s.canvasWidth + 60;
        }

        const cx = cloud.x;
        const cy = cloud.y;
        const sc = cloud.scale;

        ctx.fillStyle = s.nightAlpha > 0.4 ? "#334155" : "#ffffff";
        ctx.fillRect(cx, cy + 10 * sc, 110 * sc, 18 * sc);
        ctx.fillRect(cx + 12 * sc, cy, 45 * sc, 22 * sc);
        ctx.fillRect(cx + 45 * sc, cy - 6 * sc, 40 * sc, 25 * sc);
        ctx.fillRect(cx + 75 * sc, cy + 4 * sc, 25 * sc, 18 * sc);
      });
    };

    const drawDistantMountains = (s: typeof stateRef.current) => {
      const baseY = s.groundY;
      ctx.fillStyle = s.nightAlpha > 0.4 ? "#1e293b" : "#0284c7";
      ctx.globalAlpha = 0.4;

      const step = 110;
      for (let x = -40; x < s.canvasWidth + 140; x += step) {
        ctx.beginPath();
        ctx.moveTo(x - 70, baseY);
        ctx.lineTo(x, baseY - 90);
        ctx.lineTo(x + 70, baseY);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;
    };

    const drawGround = (s: typeof stateRef.current) => {
      const y = s.groundY;
      const width = s.canvasWidth;
      const height = s.canvasHeight - y;

      // Ground horizontal line
      ctx.fillStyle = s.nightAlpha > 0.4 ? "#38bdf8" : "#0f172a";
      ctx.fillRect(0, y, width, 3);

      // Pixel desert surface / cyber bumps
      ctx.fillStyle = s.nightAlpha > 0.4 ? "#64748b" : "#475569";
      for (let x = -(s.groundOffset % 32); x < width + 32; x += 32) {
        ctx.fillRect(x, y + 6, 12, 2);
        ctx.fillRect(x + 16, y + 10, 8, 2);
        ctx.fillRect(x + 6, y + 14, 16, 2);
      }

      // Earth base
      ctx.fillStyle = s.nightAlpha > 0.4 ? "#090d16" : "#0b111e";
      ctx.fillRect(0, y + 18, width, height - 18);
    };

    const drawDino = (s: typeof stateRef.current) => {
      const x = s.dinoX;
      const y = s.groundY - s.dinoY;
      const px = s.canvasWidth < 500 ? 1.9 : 2.4; // responsive pixel scaling unit
      const isDucking = s.isDucking && !s.isJumping;
      const legFrame = Math.floor(s.frameCount / 6) % 2;

      ctx.save();
      ctx.translate(x, y);

      if (isDucking) {
        // DUCKING DINO SPRITE
        // Body (Extended horizontally)
        ctx.fillStyle = "#10b981"; // Emerald Green Pixel Dino
        ctx.fillRect(-18 * px, -14 * px, 32 * px, 12 * px);

        // Head Low
        ctx.fillRect(10 * px, -16 * px, 18 * px, 12 * px);

        // Eye
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(20 * px, -14 * px, 4 * px, 4 * px);
        ctx.fillStyle = "#0f172a";
        ctx.fillRect(22 * px, -13 * px, 2 * px, 2 * px);

        // Tail
        ctx.fillStyle = "#059669";
        ctx.fillRect(-22 * px, -12 * px, 6 * px, 6 * px);

        // Legs while ducking
        ctx.fillStyle = "#047857";
        if (legFrame === 0) {
          ctx.fillRect(-8 * px, -2 * px, 4 * px, 4 * px);
          ctx.fillRect(4 * px, -4 * px, 4 * px, 4 * px);
        } else {
          ctx.fillRect(-8 * px, -4 * px, 4 * px, 4 * px);
          ctx.fillRect(4 * px, -2 * px, 4 * px, 4 * px);
        }
      } else {
        // STANDING / JUMPING DINO SPRITE
        // Tail
        ctx.fillStyle = "#059669";
        ctx.fillRect(-16 * px, -26 * px, 4 * px, 12 * px);
        ctx.fillRect(-14 * px, -22 * px, 4 * px, 12 * px);

        // Main Body
        ctx.fillStyle = "#10b981";
        ctx.fillRect(-10 * px, -28 * px, 16 * px, 20 * px);

        // Dino Cyber Vest / Belly highlight
        ctx.fillStyle = "#34d399";
        ctx.fillRect(-6 * px, -24 * px, 8 * px, 14 * px);

        // Dino Head
        ctx.fillStyle = "#10b981";
        ctx.fillRect(-4 * px, -38 * px, 20 * px, 14 * px);
        ctx.fillRect(6 * px, -32 * px, 14 * px, 8 * px); // Snout/Jaw

        // Dino Teeth
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(10 * px, -26 * px, 2 * px, 3 * px);
        ctx.fillRect(14 * px, -26 * px, 2 * px, 3 * px);

        // Eye (Blinks periodically)
        const isBlinking = s.frameCount % 90 < 6;
        if (!isBlinking) {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(4 * px, -35 * px, 4 * px, 4 * px);
          ctx.fillStyle = "#0f172a";
          ctx.fillRect(6 * px, -34 * px, 2 * px, 2 * px);
        } else {
          ctx.fillStyle = "#065f46";
          ctx.fillRect(4 * px, -33 * px, 4 * px, 2 * px);
        }

        // Tiny Front Arms
        ctx.fillStyle = "#047857";
        ctx.fillRect(8 * px, -18 * px, 5 * px, 3 * px);
        ctx.fillRect(11 * px, -16 * px, 2 * px, 3 * px);

        // Legs & Feet
        ctx.fillStyle = "#047857";
        if (s.isJumping) {
          // Bent legs in air
          ctx.fillRect(-6 * px, -8 * px, 4 * px, 6 * px);
          ctx.fillRect(-6 * px, -3 * px, 6 * px, 3 * px);
          ctx.fillRect(2 * px, -8 * px, 4 * px, 6 * px);
          ctx.fillRect(2 * px, -3 * px, 6 * px, 3 * px);
        } else {
          // Running animation alternating legs
          if (legFrame === 0) {
            // Left leg down, Right leg back
            ctx.fillRect(-6 * px, -8 * px, 4 * px, 8 * px);
            ctx.fillRect(-6 * px, 0, 7 * px, 3 * px);
            ctx.fillRect(2 * px, -8 * px, 4 * px, 5 * px);
            ctx.fillRect(4 * px, -4 * px, 4 * px, 3 * px);
          } else {
            // Left leg back, Right leg down
            ctx.fillRect(-6 * px, -8 * px, 4 * px, 5 * px);
            ctx.fillRect(-4 * px, -4 * px, 4 * px, 3 * px);
            ctx.fillRect(2 * px, -8 * px, 4 * px, 8 * px);
            ctx.fillRect(2 * px, 0, 7 * px, 3 * px);
          }
        }
      }

      ctx.restore();
    };

    const drawObstacles = (s: typeof stateRef.current) => {
      s.obstacles.forEach((obs) => {
        const x = obs.x;
        const y = s.groundY - obs.yOffset - obs.height;
        const w = obs.width;
        const h = obs.height;

        if (obs.type.startsWith("cactus")) {
          // PIXEL CACTUS
          ctx.fillStyle = "#22c55e"; // bright pixel cactus green
          ctx.fillRect(x + w / 2 - 4, y, 8, h); // Main trunk

          // Cactus ribs / thorns
          ctx.fillStyle = "#15803d";
          ctx.fillRect(x + w / 2 + 1, y, 3, h);

          // Arms based on type
          if (obs.type === "cactus_small") {
            ctx.fillStyle = "#22c55e";
            ctx.fillRect(x, y + 10, 6, 12);
            ctx.fillRect(x, y + 10, w / 2, 4);
          } else if (obs.type === "cactus_tall" || obs.type === "cactus_double") {
            // Left arm
            ctx.fillStyle = "#22c55e";
            ctx.fillRect(x, y + 12, 5, 14);
            ctx.fillRect(x, y + 22, w / 2, 4);
            // Right arm
            ctx.fillRect(x + w - 5, y + 6, 5, 14);
            ctx.fillRect(x + w / 2, y + 16, w / 2, 4);
          }

          // Top rounded cap
          ctx.fillStyle = "#86efac";
          ctx.fillRect(x + w / 2 - 3, y - 2, 6, 2);
        } else {
          // PTERODACTYL (Flying Dinosaur)
          const wingFrame = Math.floor(s.frameCount / 8) % 2;
          ctx.fillStyle = "#f97316"; // Cyber pterodactyl orange
          // Body
          ctx.fillRect(x + 10, y + 10, 20, 8);
          // Head & Beak
          ctx.fillRect(x + 2, y + 8, 10, 6);
          ctx.fillStyle = "#facc15";
          ctx.fillRect(x - 6, y + 10, 8, 4);
          // Eye
          ctx.fillStyle = "#0f172a";
          ctx.fillRect(x + 4, y + 9, 2, 2);

          // Wings flapping
          ctx.fillStyle = "#ea580c";
          if (wingFrame === 0) {
            // Wing UP
            ctx.fillRect(x + 14, y - 8, 8, 18);
            ctx.fillRect(x + 18, y - 14, 6, 10);
          } else {
            // Wing DOWN
            ctx.fillRect(x + 14, y + 14, 8, 16);
            ctx.fillRect(x + 18, y + 22, 6, 10);
          }
        }
      });
    };

    const drawParticles = (s: typeof stateRef.current) => {
      s.particles.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });
      ctx.globalAlpha = 1.0;
    };

    // GAME LOOP
    const loop = () => {
      animId = requestAnimationFrame(loop);
      const s = stateRef.current;
      s.frameCount++;

      const width = s.canvasWidth;
      const height = s.canvasHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Night / Day cycle logic (toggles every 250 points)
      const cycleScore = Math.floor(s.score / 250);
      s.isNight = cycleScore % 2 === 1;
      if (s.isNight && s.nightAlpha < 1.0) {
        s.nightAlpha = Math.min(1.0, s.nightAlpha + 0.02);
      } else if (!s.isNight && s.nightAlpha > 0.0) {
        s.nightAlpha = Math.max(0.0, s.nightAlpha - 0.02);
      }

      // 1. UPDATE STATE
      if (s.gameState === "idle") {
        s.groundOffset += 2.0;
        s.dinoY = 0;
      } else if (s.gameState === "playing") {
        // Dino Physics
        if (s.isJumping) {
          s.dinoVy += s.gravity;
          s.dinoY -= s.dinoVy;

          if (s.dinoY <= 0) {
            s.dinoY = 0;
            s.dinoVy = 0;
            s.isJumping = false;
          }
        }

        // Increase speed gradually
        if (s.speed < s.maxSpeed) {
          s.speed += 0.0015;
        }

        s.groundOffset += s.speed;

        // Periodic running dust particles
        if (!s.isJumping && s.frameCount % 5 === 0) {
          s.particles.push({
            x: s.dinoX - 16,
            y: s.groundY - 2,
            vx: -(s.speed * 0.4 + Math.random()),
            vy: -(Math.random() * 0.8),
            size: 2 + Math.random() * 2,
            color: s.nightAlpha > 0.4 ? "#475569" : "#cbd5e1",
            alpha: 0.7,
            life: 12,
          });
        }

        // Increment Score
        if (s.frameCount % 5 === 0) {
          s.score += 1;
          setScore(s.score);

          // Milestone beep every 100 points
          if (s.score > 0 && s.score % 100 === 0) {
            soundManager.playScore();
          }

          if (s.score > s.bestScore) {
            s.bestScore = s.score;
            setBestScore(s.score);
            if (typeof window !== "undefined") {
              localStorage.setItem("zalt_dino_best", s.score.toString());
            }
          }

          if (onScoreUpdate) {
            onScoreUpdate(s.score, s.bestScore);
          }
        }

        // Obstacle Spawning
        const framesSinceLast = s.frameCount - s.lastObstacleFrame;
        const currentInterval = Math.max(
          55,
          s.minObstacleInterval - Math.floor(s.score / 50) * 4
        );

        if (framesSinceLast > currentInterval && Math.random() < 0.35) {
          s.lastObstacleFrame = s.frameCount;

          // Pick obstacle type
          const isHighLevel = s.score > 120;
          const rand = Math.random();

          let type: Obstacle["type"] = "cactus_small";
          let obsW = 24;
          let obsH = 42;
          let yOffset = 0;

          if (isHighLevel && rand > 0.7) {
            // Flying Pterodactyl!
            if (Math.random() > 0.5) {
              type = "bird_low"; // must jump over
              obsW = 34;
              obsH = 26;
              yOffset = 22;
            } else {
              type = "bird_high"; // can duck or run under
              obsW = 34;
              obsH = 26;
              yOffset = 65;
            }
          } else if (rand > 0.4) {
            type = "cactus_tall";
            obsW = 28;
            obsH = 55;
            yOffset = 0;
          } else if (rand > 0.2) {
            type = "cactus_double";
            obsW = 44;
            obsH = 46;
            yOffset = 0;
          } else {
            type = "cactus_small";
            obsW = 22;
            obsH = 36;
            yOffset = 0;
          }

          s.obstacles.push({
            x: width + 20,
            type,
            width: obsW,
            height: obsH,
            yOffset,
            passed: false,
            frame: 0,
          });
        }

        // Obstacle Movement & Collision
        const px = 2.4;
        const dinoHitbox = s.isDucking
          ? {
              left: s.dinoX - 14 * px,
              right: s.dinoX + 18 * px,
              top: s.groundY - s.dinoY - 14 * px,
              bottom: s.groundY - s.dinoY,
            }
          : {
              left: s.dinoX - 8 * px,
              right: s.dinoX + 10 * px,
              top: s.groundY - s.dinoY - 32 * px,
              bottom: s.groundY - s.dinoY,
            };

        for (let i = s.obstacles.length - 1; i >= 0; i--) {
          const obs = s.obstacles[i];
          obs.x -= s.speed;

          // Collision Box
          const obsLeft = obs.x + 4;
          const obsRight = obs.x + obs.width - 4;
          const obsTop = s.groundY - obs.yOffset - obs.height + 4;
          const obsBottom = s.groundY - obs.yOffset;

          // Check AABB collision
          if (
            dinoHitbox.right > obsLeft &&
            dinoHitbox.left < obsRight &&
            dinoHitbox.bottom > obsTop &&
            dinoHitbox.top < obsBottom
          ) {
            // CRASH!
            updateGameState("gameover");
            soundManager.playHit();

            // Crash explosion particles
            for (let k = 0; k < 20; k++) {
              s.particles.push({
                x: s.dinoX,
                y: s.groundY - s.dinoY - 15,
                vx: (Math.random() - 0.5) * 7,
                vy: (Math.random() - 0.5) * 7,
                size: 4 + Math.random() * 3,
                color: ["#10b981", "#ef4444", "#f59e0b", "#ffffff"][k % 4],
                alpha: 1.0,
                life: 25,
              });
            }
            break;
          }

          // Offscreen removal
          if (obs.x < -80) {
            s.obstacles.splice(i, 1);
          }
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
      drawSky(s, width, height);
      drawClouds(s);
      drawDistantMountains(s);
      drawGround(s);
      drawObstacles(s);
      drawParticles(s);
      drawDino(s);
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
        {/* Left: Back / Exit Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleExploreWebsite();
          }}
          className="flex items-center gap-1.5 px-3 py-2 bg-[#0b111e]/90 hover:bg-[#1a253d] border-2 border-[#203152] rounded-xl text-xs font-pixel text-slate-200 shadow-pixel transition-all hover:scale-105 active:scale-95"
          title="Back to Portfolio"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-emerald-400" />
          <span>Exit Game</span>
        </button>

        {/* Right: Score HUD & Sound Toggle */}
        <div className="flex items-center gap-3">
          <div className="bg-[#0b111e]/90 border-2 border-[#203152] rounded-xl px-4 py-2 text-center shadow-pixel backdrop-blur-sm min-w-[90px]">
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-pixel">
              SCORE
            </div>
            <div className="text-2xl font-pixel text-emerald-400 drop-shadow">
              {score.toString().padStart(5, "0")}
            </div>
            <div className="border-t border-[#203152] my-1"></div>
            <div className="text-[9px] uppercase tracking-wider text-slate-400 font-pixel">
              BEST
            </div>
            <div className="text-sm font-pixel text-white">
              {bestScore.toString().padStart(5, "0")}
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSound();
            }}
            className="p-2.5 bg-[#0b111e]/90 hover:bg-[#1a253d] border-2 border-[#203152] rounded-xl text-emerald-400 shadow-pixel transition-all hover:scale-105 active:scale-95"
            title={isMuted ? "Unmute Sound" : "Mute Sound"}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-slate-400" />
            ) : (
              <Volume2 className="w-5 h-5 text-emerald-400" />
            )}
          </button>
        </div>
      </div>

      {/* Space to Jump Prompt (Idle state) */}
      {gameState === "idle" && (
        <div className="absolute top-[28%] left-[54%] md:left-[58%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 animate-bounce">
          <div className="bg-[#0b111e]/90 border-2 border-[#10b981] text-white px-4 py-2 rounded-lg shadow-pixel text-center">
            <p className="text-[11px] md:text-xs font-pixel text-emerald-400">
              Press{" "}
              <span className="text-white bg-emerald-600 px-1.5 py-0.5 rounded text-[10px]">
                SPACE
              </span>{" "}
              or{" "}
              <span className="text-white bg-emerald-600 px-1.5 py-0.5 rounded text-[10px]">
                ↑
              </span>
            </p>
            <p className="text-[10px] font-pixel text-slate-300 mt-1">
              or Tap to Jump! (↓ Duck)
            </p>
          </div>
        </div>
      )}

      {/* Game Over Banner */}
      {gameState === "gameover" && (
        <div className="absolute inset-0 bg-black/55 backdrop-blur-[3px] flex items-center justify-center z-40">
          <div
            className="bg-[#0b111e] border-4 border-red-500 rounded-2xl p-6 text-center shadow-pixel-lg max-w-sm mx-4 transform animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-xs font-pixel text-red-400 uppercase tracking-widest mb-1">
              🦖 CACTUS SMASH!
            </div>
            <h3 className="text-2xl md:text-3xl font-pixel text-white mb-4">
              GAME OVER
            </h3>

            <div className="grid grid-cols-2 gap-3 bg-[#131b2e] p-3 rounded-xl border border-slate-700 mb-4">
              <div>
                <span className="text-[10px] font-pixel text-slate-400 block">
                  SCORE
                </span>
                <span className="text-xl font-pixel text-emerald-400">
                  {score.toString().padStart(5, "0")}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-pixel text-slate-400 block">
                  BEST
                </span>
                <span className="text-xl font-pixel text-yellow-300">
                  {bestScore.toString().padStart(5, "0")}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <button
                onClick={restartGame}
                className="w-full flex items-center justify-center gap-2 bg-[#10b981] hover:bg-[#34d399] text-black font-pixel text-xs py-3 px-4 rounded-xl border-2 border-black shadow-pixel active:translate-y-1 transition-all"
              >
                <RotateCcw className="w-4 h-4" /> PLAY AGAIN [SPACE]
              </button>

              <button
                onClick={handleExploreWebsite}
                className="w-full flex items-center justify-center gap-2 bg-[#1e293b] hover:bg-[#334155] text-white font-pixel text-xs py-2.5 px-4 rounded-xl border-2 border-slate-600 shadow-pixel active:translate-y-1 transition-all"
              >
                🌐 EXPLORE WEBSITE
              </button>

              {onSwitchToFlappy && (
                <button
                  onClick={onSwitchToFlappy}
                  className="w-full flex items-center justify-center gap-2 bg-[#1d4ed8]/70 hover:bg-[#1d4ed8] text-yellow-300 font-pixel text-[11px] py-2 px-3 rounded-xl border border-blue-400/50 shadow-pixel active:translate-y-1 transition-all"
                >
                  🦸 SWITCH TO FLAPPY HERO
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Badge */}
      <div className="absolute bottom-20 right-4 hidden md:flex flex-col items-center bg-[#0b111e]/90 border-2 border-[#203152] rounded-xl px-3 py-2 text-center shadow-pixel z-20 pointer-events-none">
        <span className="text-[10px] font-pixel text-slate-300">Run</span>
        <span className="text-[10px] font-pixel text-emerald-400">Jump</span>
        <span className="text-[10px] font-pixel text-yellow-300">Survive</span>
        <span className="text-base font-pixel text-emerald-400 mt-0.5">🦖</span>
      </div>

      {/* Mobile tap hint when idle */}
      {!hasInteracted && gameState === "idle" && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 md:hidden bg-black/75 px-3 py-1.5 rounded-full border border-emerald-400/50 text-[10px] font-pixel text-emerald-400 pointer-events-none">
          👆 Tap anywhere to jump!
        </div>
      )}

      {/* Mobile Gaming Touch Action Controls (Left Duck, Right Jump) */}
      {gameState === "playing" && (
        <div className="absolute bottom-4 left-3 right-3 flex items-center justify-between md:hidden z-30 pointer-events-auto">
          {/* Duck Button on Left Thumb */}
          <button
            onTouchStart={(e) => {
              e.preventDefault();
              e.stopPropagation();
              stateRef.current.isDucking = true;
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              e.stopPropagation();
              stateRef.current.isDucking = false;
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
              stateRef.current.isDucking = true;
            }}
            onMouseUp={(e) => {
              e.stopPropagation();
              stateRef.current.isDucking = false;
            }}
            className="flex items-center gap-1 px-4 py-2.5 bg-[#0b111e]/90 active:bg-emerald-600/70 border-2 border-emerald-500/80 rounded-xl text-emerald-300 font-pixel text-xs shadow-pixel select-none touch-manipulation active:scale-95"
          >
            <span>⬇</span> DUCK
          </button>

          {/* Jump Button on Right Thumb */}
          <button
            onTouchStart={(e) => {
              e.preventDefault();
              e.stopPropagation();
              jump();
            }}
            onClick={(e) => {
              e.stopPropagation();
              jump();
            }}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-emerald-500 active:bg-emerald-400 text-slate-950 font-pixel text-xs rounded-xl border-2 border-white shadow-pixel select-none touch-manipulation active:scale-95"
          >
            <span>⬆</span> JUMP
          </button>
        </div>
      )}
    </div>
  );
}
