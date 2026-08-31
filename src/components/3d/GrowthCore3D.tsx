"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export type GrowthStage = "AUDIENCE" | "CAMPAIGN" | "LEADS" | "GROWTH";

type GrowthCore3DProps = {
  activeStage?: GrowthStage;
};

export default function GrowthCore3D({ activeStage = "GROWTH" }: GrowthCore3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isSupported] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      const canvas = document.createElement("canvas");
      return Boolean(
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      );
    } catch {
      return false;
    }
  });
  const stageRef = useRef<GrowthStage>(activeStage);

  useEffect(() => {
    stageRef.current = activeStage;
  }, [activeStage]);

  useEffect(() => {
    if (!mountRef.current || !isSupported) return;

    const container = mountRef.current;
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6.8;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for the entire 3D Core
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // ── 1. Inner Luminous Core ───────────────────────────────────────────────
    const coreGeometry = new THREE.IcosahedronGeometry(1.2, 1);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf7931e,
      emissive: 0xe07d0f,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.1,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const innerCore = new THREE.Mesh(coreGeometry, coreMaterial);
    coreGroup.add(innerCore);

    // Solid inner glowing nucleus
    const nucleusGeo = new THREE.SphereGeometry(0.7, 32, 32);
    const nucleusMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xf7931e,
      emissiveIntensity: 0.9,
      roughness: 0.1,
    });
    const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
    coreGroup.add(nucleus);

    // ── 2. Primary Orbital Ring (Orange) ─────────────────────────────────────
    const ring1Geo = new THREE.TorusGeometry(2.1, 0.025, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xf7931e,
      emissive: 0xf7931e,
      emissiveIntensity: 0.7,
      metalness: 0.8,
      roughness: 0.2,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    coreGroup.add(ring1);

    // ── 3. Secondary Orbital Ring (Purple) ───────────────────────────────────
    const ring2Geo = new THREE.TorusGeometry(2.6, 0.02, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x8b5fc4,
      emissive: 0x6f42c1,
      emissiveIntensity: 0.8,
      metalness: 0.8,
      roughness: 0.2,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = -Math.PI / 5;
    coreGroup.add(ring2);

    // ── 4. Outer Strategic Gyro Ring ────────────────────────────────────────
    const ring3Geo = new THREE.TorusGeometry(3.1, 0.015, 16, 100);
    const ring3Mat = new THREE.MeshStandardMaterial({
      color: 0xffaa4d,
      emissive: 0xf7931e,
      emissiveIntensity: 0.4,
      transparent: true,
      opacity: 0.6,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.z = Math.PI / 3;
    coreGroup.add(ring3);

    // ── 5. Orbiting Data Satellite Nodes ────────────────────────────────────
    const nodeCount = 5;
    const satellites: THREE.Mesh[] = [];
    const nodeGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const nodeColors = [0xf7931e, 0x6f42c1, 0xffaa4d, 0x8b5fc4, 0xffffff];

    for (let i = 0; i < nodeCount; i++) {
      const mat = new THREE.MeshStandardMaterial({
        color: nodeColors[i % nodeColors.length],
        emissive: nodeColors[i % nodeColors.length],
        emissiveIntensity: 0.9,
      });
      const sat = new THREE.Mesh(nodeGeo, mat);
      satellites.push(sat);
      coreGroup.add(sat);
    }

    // ── 6. Atmospheric Digital Starfield ────────────────────────────────────
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 12;
      positions[i + 1] = (Math.random() - 0.5) * 12;
      positions[i + 2] = (Math.random() - 0.5) * 8;

      const isOrange = Math.random() > 0.45;
      if (isOrange) {
        colors[i] = 0.97;
        colors[i + 1] = 0.58;
        colors[i + 2] = 0.12;
      } else {
        colors[i] = 0.44;
        colors[i + 1] = 0.26;
        colors[i + 2] = 0.76;
      }
    }

    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ── 7. Studio Lights ────────────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const orangePoint = new THREE.PointLight(0xf7931e, 4, 15);
    orangePoint.position.set(4, 3, 3);
    scene.add(orangePoint);

    const purplePoint = new THREE.PointLight(0x6f42c1, 3.5, 15);
    purplePoint.position.set(-4, -3, 3);
    scene.add(purplePoint);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(0, 5, 5);
    scene.add(keyLight);

    // ── Mouse Parallax State ────────────────────────────────────────────────
    let targetRotX = 0;
    let targetRotY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / height - 0.5) * 2;

      targetRotY = mouseX * 0.45;
      targetRotX = -mouseY * 0.45;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // ── Resize Observer ─────────────────────────────────────────────────────
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    // ── Viewport Observer (Pause when off-screen) ───────────────────────────
    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    intersectionObserver.observe(container);

    // ── Animation Loop ──────────────────────────────────────────────────────
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();
      const currentStage = stageRef.current;

      // Speed boost factor if specific stage is active
      const speedMultiplier = currentStage === "GROWTH" ? 1.3 : 1.0;

      // Smooth core rotation
      innerCore.rotation.x = elapsed * 0.35 * speedMultiplier;
      innerCore.rotation.y = elapsed * 0.5 * speedMultiplier;

      // Nested ring rotations
      ring1.rotation.z = elapsed * 0.4 * speedMultiplier;
      ring2.rotation.z = -elapsed * 0.3 * speedMultiplier;
      ring3.rotation.y = elapsed * 0.2 * speedMultiplier;

      // Orbit satellites along rings
      satellites.forEach((sat, i) => {
        const speed = (0.8 + i * 0.25) * speedMultiplier;
        const radius = 2.1 + (i % 2) * 0.5;
        const angle = elapsed * speed + (i * Math.PI * 2) / nodeCount;
        sat.position.x = Math.cos(angle) * radius;
        sat.position.y = Math.sin(angle) * radius * Math.cos(Math.PI / 4);
        sat.position.z = Math.sin(angle) * radius * Math.sin(Math.PI / 4);
      });

      // Subtle particle drift
      particles.rotation.y = elapsed * 0.03;
      particles.rotation.x = elapsed * 0.02;

      // Mouse damping
      coreGroup.rotation.y += (targetRotY - coreGroup.rotation.y) * 0.06;
      coreGroup.rotation.x += (targetRotX - coreGroup.rotation.x) * 0.06;

      renderer.render(scene, camera);
    };

    animate();

    // ── Cleanup ─────────────────────────────────────────────────────────────
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      cancelAnimationFrame(animationFrameId);

      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }

      coreGeometry.dispose();
      coreMaterial.dispose();
      nucleusGeo.dispose();
      nucleusMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
      nodeGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [isSupported]);

  if (!isSupported) {
    return (
      <div className="w-full h-full flex items-center justify-center rounded-3xl bg-gradient-to-tr from-brand-orange/10 to-brand-purple/10 border border-black/5">
        <div className="h-40 w-40 rounded-full bg-brand-orange/20 blur-2xl animate-pulse" />
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="relative w-full h-full min-h-[380px] md:min-h-[460px] flex items-center justify-center"
    />
  );
}
