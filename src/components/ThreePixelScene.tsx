"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreePixelSceneProps {
  className?: string;
  interactive?: boolean;
}

export default function ThreePixelScene({ className = "", interactive = true }: ThreePixelSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 300;
    let height = container.clientHeight || 200;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xfff5c0, 2.5);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 1.5);
    dirLight2.position.set(-5, -5, 5);
    scene.add(dirLight2);

    // Group for all 3D floating items
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Create a 3D Voxel Pixel Coin (Cylinder with retro pixel edges)
    const coinGeometry = new THREE.CylinderGeometry(2.2, 2.2, 0.45, 16);
    const coinMaterial = new THREE.MeshStandardMaterial({
      color: 0xffce00,
      metalness: 0.6,
      roughness: 0.2,
      emissive: 0xaa7700,
      emissiveIntensity: 0.2,
      flatShading: true,
    });
    const coin = new THREE.Mesh(coinGeometry, coinMaterial);
    coin.rotation.x = Math.PI / 2;
    coin.position.set(4, 1.5, 0);
    mainGroup.add(coin);

    // Coin inner pixel star/symbol
    const starGeom = new THREE.BoxGeometry(0.5, 1.4, 0.5);
    const starMat = new THREE.MeshStandardMaterial({ color: 0xfff085, roughness: 0.1, flatShading: true });
    const starMesh = new THREE.Mesh(starGeom, starMat);
    starMesh.position.set(4, 1.5, 0.1);
    mainGroup.add(starMesh);

    // 2. Create Floating 3D Pixel Cubes (Tech Crystals)
    const cubes: THREE.Mesh[] = [];
    const colors = [0x3b82f6, 0x10b981, 0xf59e0b, 0xec4899, 0x8b5cf6];
    
    for (let i = 0; i < 18; i++) {
      const size = 0.35 + Math.random() * 0.45;
      const cubeGeom = new THREE.BoxGeometry(size, size, size);
      const cubeMat = new THREE.MeshStandardMaterial({
        color: colors[i % colors.length],
        roughness: 0.3,
        metalness: 0.4,
        flatShading: true,
      });
      const cube = new THREE.Mesh(cubeGeom, cubeMat);
      
      const angle = (i / 18) * Math.PI * 2;
      const radius = 6 + Math.random() * 5;
      cube.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6
      );
      cube.userData = {
        speedX: (Math.random() - 0.5) * 0.02,
        speedY: (Math.random() - 0.5) * 0.02,
        rotSpeed: 0.01 + Math.random() * 0.03,
        baseY: cube.position.y,
        floatSpeed: 0.8 + Math.random() * 1.2,
      };
      mainGroup.add(cube);
      cubes.push(cube);
    }

    // 3. Floating 3D Voxel Trophy / Diamond on the other side
    const diamondGeom = new THREE.OctahedronGeometry(1.6, 0);
    const diamondMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.7,
      roughness: 0.1,
      emissive: 0x0284c7,
      emissiveIntensity: 0.3,
      flatShading: true,
    });
    const diamond = new THREE.Mesh(diamondGeom, diamondMat);
    diamond.position.set(-5, -0.5, 0);
    mainGroup.add(diamond);

    // Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 0.6;
      targetY = -y * 0.6;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 300;
      height = container.clientHeight || 200;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse tilt
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;
      mainGroup.rotation.y = mouseX;
      mainGroup.rotation.x = mouseY;

      // Rotate coin
      coin.rotation.z += 0.035;
      coin.position.y = 1.5 + Math.sin(elapsedTime * 2.5) * 0.35;
      starMesh.rotation.z += 0.035;
      starMesh.position.y = coin.position.y;

      // Rotate diamond
      diamond.rotation.y += 0.02;
      diamond.rotation.x = Math.sin(elapsedTime * 1.5) * 0.2;
      diamond.position.y = -0.5 + Math.sin(elapsedTime * 2.0 + 1.2) * 0.3;

      // Floating cubes
      cubes.forEach((cube) => {
        cube.rotation.x += cube.userData.rotSpeed;
        cube.rotation.y += cube.userData.rotSpeed * 0.8;
        cube.position.y = cube.userData.baseY + Math.sin(elapsedTime * cube.userData.floatSpeed) * 0.5;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [interactive]);

  return <div ref={mountRef} className={`w-full h-full pointer-events-none ${className}`} />;
}
