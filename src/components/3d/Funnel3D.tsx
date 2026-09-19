"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

export type FunnelStage = "TRAFFIC" | "LEADS" | "SALES" | "SCALE";

type Funnel3DProps = {
  activeStage?: FunnelStage;
};

export default function Funnel3D({ activeStage = "TRAFFIC" }: Funnel3DProps) {
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
  const stageRef = useRef<FunnelStage>(activeStage);

  useEffect(() => {
    stageRef.current = activeStage;
  }, [activeStage]);

  useEffect(() => {
    if (!mountRef.current || !isSupported) return;

    const container = mountRef.current;
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 4, 12); // Isometric look

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const funnelGroup = new THREE.Group();
    funnelGroup.position.y = 5.0; // Moved higher up to clear the text cards below
    scene.add(funnelGroup);

    // Funnel Layers definition
    const layers = [
      { id: "TRAFFIC", name: "TRAFFIC", radius: 3.2, tube: 0.45, yOffset: 1.8, color: 0x00E5FF }, // Cyan
      { id: "LEADS", name: "LEADS", radius: 2.5, tube: 0.45, yOffset: 0.3, color: 0xFFC107 },   // Yellow/Orange
      { id: "SALES", name: "SALES", radius: 1.8, tube: 0.45, yOffset: -1.2, color: 0xE91E63 },  // Magenta/Pink
      { id: "SCALE", name: "SCALE", radius: 1.1, tube: 0.45, yOffset: -2.7, color: 0x8B5FC4 },  // Purple
    ];

    const meshes: { [key: string]: THREE.Mesh } = {};
    const textGroups: { [key: string]: THREE.Group } = {};
    const baseMaterials: { [key: string]: THREE.MeshStandardMaterial } = {};

    layers.forEach((layer) => {
      // TorusGeometry(radius, tube, radialSegments, tubularSegments)
      const geometry = new THREE.TorusGeometry(layer.radius, layer.tube, 32, 100);
      
      const mat = new THREE.MeshStandardMaterial({
        color: layer.color,
        roughness: 0.2,
        metalness: 0.1,
      });
      baseMaterials[layer.id] = mat;

      const mesh = new THREE.Mesh(geometry, mat);
      mesh.rotation.x = Math.PI / 2; // Lay flat
      mesh.position.y = layer.yOffset;
      funnelGroup.add(mesh);
      meshes[layer.id] = mesh;
    });

    // Load 3D Font for Curved Labels
    const loader = new FontLoader();
    loader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
      layers.forEach((layer) => {
        const textGroup = new THREE.Group();
        textGroup.position.y = layer.yOffset + 0.15;
        
        const chars = layer.name.split("");
        const charGeos: TextGeometry[] = [];
        const charWidths: number[] = [];
        let totalWidth = 0;
        const letterSpacing = 0.05;

        // Create individual character geometries
        chars.forEach((char) => {
          const geo = new TextGeometry(char, {
            font: font,
            size: 0.35,
            depth: 0.04,
            curveSegments: 4,
            bevelEnabled: true,
            bevelThickness: 0.01,
            bevelSize: 0.01,
            bevelSegments: 3,
          });
          geo.computeBoundingBox();
          const width = geo.boundingBox ? geo.boundingBox.max.x - geo.boundingBox.min.x : 0;
          charGeos.push(geo);
          charWidths.push(width);
          totalWidth += width + letterSpacing;
        });

        totalWidth -= letterSpacing;
        
        // Curved radius is slightly larger than the torus
        const curveRadius = layer.radius + 0.45;
        const totalAngle = totalWidth / curveRadius;
        
        // Start from left (negative angle) and curve to the right (positive angle)
        let currentAngle = -totalAngle / 2;

        const textMat = new THREE.MeshStandardMaterial({ 
          color: 0x333333, // Softer dark gray
          emissive: 0x000000,
          emissiveIntensity: 0,
          roughness: 0.4, 
          metalness: 0.2 
        });

        chars.forEach((char, i) => {
          const geo = charGeos[i];
          const width = charWidths[i];
          
          // Center the geometry so it rotates around its own center
          geo.translate(-width / 2, 0, 0);

          const charAngle = currentAngle + (width / 2) / curveRadius;
          const mesh = new THREE.Mesh(geo, textMat);
          
          mesh.position.x = Math.sin(charAngle) * curveRadius;
          mesh.position.z = Math.cos(charAngle) * curveRadius;
          mesh.rotation.y = charAngle;
          
          // Slight tilt so it lays nicely on the torus edge
          mesh.rotation.x = -0.3;

          textGroup.add(mesh);
          currentAngle += (width + letterSpacing) / curveRadius;
        });

        funnelGroup.add(textGroup);
        textGroups[layer.id] = textGroup;
      });
    });

    // Floating 3D Elements (Spheres like the image)
    const floatingElements = new THREE.Group();
    scene.add(floatingElements);
    
    const spheresData: { mesh: THREE.Mesh, speed: number, offset: number, radius: number }[] = [];
    const sphereColors = [0xE91E63, 0x00E5FF, 0xFFC107, 0x00E676];
    
    for (let i = 0; i < 8; i++) {
      const radius = Math.random() * 0.3 + 0.15;
      const geo = new THREE.SphereGeometry(radius, 32, 32);
      const mat = new THREE.MeshStandardMaterial({
        color: sphereColors[i % sphereColors.length],
        roughness: 0.2,
        metalness: 0.1,
      });
      const mesh = new THREE.Mesh(geo, mat);
      
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 3 + 2;
      mesh.position.x = Math.cos(angle) * dist;
      mesh.position.z = Math.sin(angle) * dist;
      mesh.position.y = (Math.random() - 0.5) * 8 + 5.0; // matched funnel group offset
      
      floatingElements.add(mesh);
      spheresData.push({
        mesh,
        speed: Math.random() * 0.02 + 0.01,
        offset: Math.random() * Math.PI * 2,
        radius: dist
      });
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);
    
    const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
    backLight.position.set(-5, 5, -7);
    scene.add(backLight);

    // Mouse Interaction
    let targetRotX = 0.25; 
    let targetRotY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / height - 0.5) * 2;

      targetRotY = mouseX * 0.2;
      targetRotX = 0.25 + mouseY * 0.15; 
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Observers
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

    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting;
      }, { threshold: 0.1 }
    );
    intersectionObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;
      const elapsed = clock.getElapsedTime();
      const currentStage = stageRef.current;

      // Update materials and rotations based on active stage
      layers.forEach((layer) => {
        const mesh = meshes[layer.id];
        const textGroup = textGroups[layer.id];
        const mat = baseMaterials[layer.id];
        const isActive = currentStage === layer.id;
        
        // Active layers glow slightly and float higher
        if (isActive) {
          mat.emissive.setHex(layer.color);
          mat.emissiveIntensity = 0.4;
          // Gentle bobbing effect for active layer
          mesh.position.y = layer.yOffset + Math.sin(elapsed * 3) * 0.15;
          if (textGroup) {
             textGroup.position.y = layer.yOffset + 0.15 + Math.sin(elapsed * 3) * 0.15;
             textGroup.children.forEach((child) => {
               const cMat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
               cMat.emissiveIntensity = 0.8;
             });
          }
        } else {
          mat.emissiveIntensity = 0;
          // Dim inactive layers slightly
          mat.color.setHex(layer.color).lerp(new THREE.Color(0xaaaaaa), 0.3);
          mesh.position.y = layer.yOffset;
          if (textGroup) {
             textGroup.position.y = layer.yOffset + 0.15;
             textGroup.children.forEach((child) => {
               const cMat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
               cMat.emissiveIntensity = 0.1;
             });
          }
        }
      });

      // Animate floating spheres
      spheresData.forEach((data) => {
        data.mesh.position.y += Math.sin(elapsed * 2 + data.offset) * 0.01;
        const angle = elapsed * data.speed + data.offset;
        data.mesh.position.x = Math.cos(angle) * data.radius;
        data.mesh.position.z = Math.sin(angle) * data.radius;
      });

      // Mouse damping
      funnelGroup.rotation.y += (targetRotY - funnelGroup.rotation.y) * 0.05;
      funnelGroup.rotation.x += (targetRotX - funnelGroup.rotation.x) * 0.05;
      
      floatingElements.rotation.y = funnelGroup.rotation.y;
      floatingElements.rotation.x = funnelGroup.rotation.x;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
      
      layers.forEach(l => {
        meshes[l.id]?.geometry.dispose();
        baseMaterials[l.id]?.dispose();
        if (textGroups[l.id]) {
            textGroups[l.id].children.forEach((child) => {
              (child as THREE.Mesh).geometry.dispose();
              ((child as THREE.Mesh).material as THREE.Material).dispose();
            });
        }
      });
      spheresData.forEach(d => {
        d.mesh.geometry.dispose();
        (d.mesh.material as THREE.Material).dispose();
      });
    };
  }, [isSupported]);

  if (!isSupported) {
    return (
      <div className="w-full h-full flex items-center justify-center rounded-3xl bg-gradient-to-b from-brand-purple/10 to-brand-orange/10 border border-black/5">
        <div className="h-40 w-40 rounded-full bg-brand-orange/20 blur-2xl animate-pulse" />
      </div>
    );
  }

  return <div ref={mountRef} className="relative w-full h-full min-h-[380px] md:min-h-[460px] flex items-center justify-center cursor-crosshair" />;
}
