"use client";

import { useEffect, useRef } from "react";
import {
  BackSide,
  BufferGeometry,
  Color,
  Group,
  Line,
  LineBasicMaterial,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  NoToneMapping,
  PerspectiveCamera,
  QuadraticBezierCurve3,
  RingGeometry,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  SRGBColorSpace,
  TextureLoader,
  Vector3,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Satellite imagery
 * - Day: NASA Blue Marble, redistributed as earth-blue-marble.jpg in the
 *   three-globe examples (https://unpkg.com/three-globe@2.45.0/example/img/earth-blue-marble.jpg).
 *   NASA Visible Earth imagery is public domain.
 * - Bump: earth-topology.png from the same example set (public-domain elevation shading).
 * - Local files: /globe/earth-day-2k.webp and earth-day-1k.webp, exposure-lifted so the
 *   map stays bright on the cream page. The static fallback is /globe/earth-placeholder.webp.
 * The globe is unlit, so the visible hemisphere has no dark night side.
 *
 * three.js (MIT). A small scene, not the full globe.gl bundle.
 */

const HOME = { lat: 24.374, lng: 88.604 };

type Anchor = "above" | "left" | "right";
type Destination = { lat: number; lng: number; color: string; anchor: Anchor };

/** Order matches the place-name list passed in from the page locale. */
const DESTINATIONS: Destination[] = [
  { lat: 40.713, lng: -74.006, color: "#7B3FE4", anchor: "above" },
  { lat: 51.507, lng: -0.128, color: "#F7931E", anchor: "left" },
  { lat: 25.204, lng: 55.27, color: "#7B3FE4", anchor: "above" },
  { lat: 43.653, lng: -79.383, color: "#F7931E", anchor: "left" },
  { lat: -33.868, lng: 151.209, color: "#7B3FE4", anchor: "above" },
  { lat: 50.11, lng: 8.682, color: "#F7931E", anchor: "right" },
];

const ARC_MS = 2600;

function latLngToVec(lat: number, lng: number, radius: number) {
  // Matches SphereGeometry: u = 0 at longitude -180, north pole at +Y.
  const theta = ((90 - lat) * Math.PI) / 180;
  const phi = ((lng + 180) * Math.PI) / 180;
  const ring = radius * Math.sin(theta);
  return new Vector3(-ring * Math.cos(phi), radius * Math.cos(theta), ring * Math.sin(phi));
}

/** Point `city` at the camera and keep geographic north upright. */
function faceCityNorthUp(city: Vector3, cameraPosition: Vector3) {
  const camDir = cameraPosition.clone().normalize();
  const screenRight = new Vector3().crossVectors(new Vector3(0, 1, 0), camDir);
  if (screenRight.lengthSq() < 1e-8) screenRight.set(1, 0, 0);
  screenRight.normalize();
  const screenUp = new Vector3().crossVectors(camDir, screenRight).normalize();
  const toward = city.clone().normalize();
  const localUp = new Vector3(0, 1, 0).sub(toward.clone().multiplyScalar(toward.y));
  if (localUp.lengthSq() < 1e-8) localUp.set(0, 0, 1);
  localUp.normalize();
  const localRight = new Vector3().crossVectors(localUp, toward).normalize();
  const localBasis = new Matrix4().makeBasis(localRight, localUp, toward);
  const worldBasis = new Matrix4().makeBasis(screenRight, screenUp, camDir);
  return worldBasis.multiply(localBasis.invert());
}

function makePill(text: string, home: boolean, dotColor: string) {
  const root = document.createElement("div");
  root.style.pointerEvents = "none";
  root.style.position = "absolute";
  root.style.left = "0";
  root.style.top = "0";
  root.style.zIndex = "2";
  root.style.textAlign = "center";

  const label = document.createElement("div");
  label.textContent = text;
  label.style.cssText = home
    ? "background:#F7931E;color:#24202C;font:700 11px/1.1 system-ui,sans-serif;padding:3px 7px;border-radius:999px;white-space:nowrap;box-shadow:0 1px 3px rgba(36,32,44,0.22)"
    : "background:#F7F3F1;color:#24202C;font:700 10px/1.15 system-ui,sans-serif;padding:2px 6px;border-radius:999px;white-space:nowrap;box-shadow:0 1px 2px rgba(36,32,44,0.28)";

  const dot = document.createElement("div");
  dot.style.cssText = home
    ? "width:8px;height:8px;margin:4px auto 0;border-radius:999px;background:#F7931E;box-shadow:0 0 0 3px rgba(247,147,30,0.35)"
    : `width:6px;height:6px;margin:3px auto 0;border-radius:999px;background:${dotColor}`;

  root.append(label, dot);
  return { root, label };
}

function pinTransform(anchor: Anchor, x: number, y: number) {
  if (anchor === "left") return `translate(-108%, -55%) translate(${x}px, ${y}px)`;
  if (anchor === "right") return `translate(8%, -55%) translate(${x}px, ${y}px)`;
  return `translate(-50%, -135%) translate(${x}px, ${y}px)`;
}

export default function HeroGlobeCanvas({
  onReady,
  label,
  places,
}: {
  onReady?: () => void;
  label: string;
  places: readonly string[];
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const onReadyRef = useRef(onReady);
  const labelRef = useRef(label);
  const placesRef = useRef(places);

  useEffect(() => {
    onReadyRef.current = onReady;
    labelRef.current = label;
    placesRef.current = places;
  });

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    let disposed = false;
    let frame = 0;
    const width = () => box.clientWidth || 320;

    const renderer = new WebGLRenderer({
      antialias: width() >= 480,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(width(), width());
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.toneMapping = NoToneMapping;
    const canvas = renderer.domElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    canvas.style.cursor = "grab";
    canvas.tabIndex = 0;
    canvas.setAttribute("aria-label", labelRef.current);
    box.appendChild(canvas);

    const scene = new Scene();
    const camera = new PerspectiveCamera(40, 1, 0.1, 20);
    camera.position.set(0, 0.2, 3.35);

    const controls = new OrbitControls(camera, canvas);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.42;
    controls.target.set(0, 0, 0);
    const pauseSpin = () => {
      controls.autoRotate = false;
      canvas.style.cursor = "grabbing";
    };
    const resumeSpin = () => {
      controls.autoRotate = true;
      canvas.style.cursor = "grab";
    };
    controls.addEventListener("start", pauseSpin);
    controls.addEventListener("end", resumeSpin);
    canvas.style.touchAction = "pan-y";

    const earth = new Group();
    scene.add(earth);

    const compact = width() < 480;
    const loader = new TextureLoader();
    let textured = false;
    const day = loader.load(compact ? "/globe/earth-day-1k.webp" : "/globe/earth-day-2k.webp", () => {
      if (disposed) return;
      textured = true;
      paint();
      onReadyRef.current?.();
    });
    day.colorSpace = SRGBColorSpace;
    const globe = new Mesh(
      new SphereGeometry(1, compact ? 40 : 64, compact ? 28 : 40),
      new MeshBasicMaterial({ map: day, toneMapped: false }),
    );
    earth.add(globe);

    const atmosphere = new Mesh(
      new SphereGeometry(1.1, compact ? 32 : 48, compact ? 24 : 32),
      new ShaderMaterial({
        transparent: true,
        depthWrite: false,
        side: BackSide,
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vView;
          void main() {
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            vView = mv.xyz;
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          varying vec3 vView;
          void main() {
            float fres = pow(1.0 - abs(dot(normalize(-vView), normalize(vNormal))), 2.8);
            gl_FragColor = vec4(0.93, 0.95, 0.98, fres * 0.28);
          }
        `,
      }),
    );
    earth.add(atmosphere);

    const home = latLngToVec(HOME.lat, HOME.lng, 1);
    earth.quaternion.setFromRotationMatrix(faceCityNorthUp(home, camera.position));

    const arcs = DESTINATIONS.map((destination) => {
      const start = latLngToVec(HOME.lat, HOME.lng, 1.01);
      const end = latLngToVec(destination.lat, destination.lng, 1.01);
      const mid = start.clone().add(end).multiplyScalar(0.5);
      mid.normalize().multiplyScalar(1.28 + start.distanceTo(end) * 0.12);
      const curve = new QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(72);
      const line = new Line(
        new BufferGeometry().setFromPoints(points),
        new LineBasicMaterial({ color: new Color(destination.color), transparent: true, opacity: 0.95 }),
      );
      line.visible = false;
      line.userData.curve = curve;
      line.userData.color = destination.color;
      earth.add(line);
      return line;
    });

    const traveler = new Mesh(
      new SphereGeometry(0.018, 12, 12),
      new MeshBasicMaterial({ color: DESTINATIONS[0]!.color }),
    );
    earth.add(traveler);

    const rings = DESTINATIONS.map((destination) => {
      const material = new MeshBasicMaterial({
        color: destination.color,
        transparent: true,
        opacity: 0.7,
        depthWrite: false,
        side: BackSide,
      });
      const ring = new Mesh(new RingGeometry(0.012, 0.02, 40), material);
      const pos = latLngToVec(destination.lat, destination.lng, 1.012);
      ring.position.copy(pos);
      ring.lookAt(pos.clone().multiplyScalar(2));
      earth.add(ring);
      const pin = new Mesh(
        new SphereGeometry(0.014, 10, 10),
        new MeshBasicMaterial({ color: destination.color }),
      );
      pin.position.copy(latLngToVec(destination.lat, destination.lng, 1.02));
      earth.add(pin);
      return ring;
    });

    const homePill = makePill("Marketivity", true, "#F7931E");
    box.appendChild(homePill.root);
    const placePills = DESTINATIONS.map((destination, index) => {
      const pill = makePill(placesRef.current[index] ?? "", false, destination.color);
      box.appendChild(pill.root);
      return {
        ...pill,
        anchor: destination.anchor,
        world: latLngToVec(destination.lat, destination.lng, 1).applyQuaternion(earth.quaternion),
      };
    });
    const homeWorld = home.clone().applyQuaternion(earth.quaternion);

    let arcIndex = 0;
    let arcStarted = performance.now();
    arcs[0]!.visible = true;

    const cycle = window.setInterval(() => {
      arcs[arcIndex]!.visible = false;
      arcIndex = (arcIndex + 1) % arcs.length;
      arcs[arcIndex]!.visible = true;
      (traveler.material as MeshBasicMaterial).color.set(arcs[arcIndex]!.userData.color as string);
      arcStarted = performance.now();
    }, ARC_MS);

    const paint = () => {
      const size = width();
      const progress = ((performance.now() - arcStarted) % ARC_MS) / ARC_MS;
      const curve = arcs[arcIndex]!.userData.curve as QuadraticBezierCurve3;
      traveler.position.copy(curve.getPoint(progress));
      const pulse = (performance.now() % 1500) / 1500;
      rings.forEach((ring) => {
        const scale = 1 + pulse * 3.4;
        ring.scale.setScalar(scale);
        (ring.material as MeshBasicMaterial).opacity = 0.65 * (1 - pulse);
      });

      const camDir = camera.position.clone().normalize();
      const names = placesRef.current;
      const pins = [
        { root: homePill.root, label: homePill.label, world: homeWorld, anchor: "above" as Anchor, text: "Marketivity" },
        ...placePills.map((pill, index) => ({ ...pill, text: names[index] ?? "" })),
      ];
      for (const pin of pins) {
        if (pin.label.textContent !== pin.text) pin.label.textContent = pin.text;
        const facing = pin.world.clone().normalize().dot(camDir) > 0.16;
        const projected = pin.world.clone().project(camera);
        const show = facing && projected.z < 1;
        pin.root.style.visibility = show ? "visible" : "hidden";
        if (!show) continue;
        const x = (projected.x * 0.5 + 0.5) * size;
        const y = (-projected.y * 0.5 + 0.5) * size;
        pin.root.style.transform = pinTransform(pin.anchor, x, y);
      }

      controls.update();
      renderer.render(scene, camera);
    };

    let running = false;
    const loop = () => {
      frame = 0;
      if (!running) return;
      if (textured) paint();
      frame = window.requestAnimationFrame(loop);
    };

    let onScreen = true;
    const sync = () => {
      const next = onScreen && !document.hidden;
      if (next === running) return;
      running = next;
      if (running && !frame) frame = window.requestAnimationFrame(loop);
      if (!running && frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
    };
    const visibility = new IntersectionObserver(([entry]) => {
      onScreen = entry?.isIntersecting ?? false;
      sync();
    });
    visibility.observe(box);
    document.addEventListener("visibilitychange", sync);
    sync();
    frame = window.requestAnimationFrame(loop);

    const onResize = () => {
      const size = width();
      if (!size) return;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(size, size);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    };
    const resize = new ResizeObserver(onResize);
    resize.observe(box);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      controls.autoRotate = false;
      const axis = new Vector3(0, 1, 0);
      camera.position.applyAxisAngle(axis, event.key === "ArrowRight" ? -0.12 : 0.12);
      camera.lookAt(0, 0, 0);
    };
    const onKeyUp = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") controls.autoRotate = true;
    };
    canvas.addEventListener("keydown", onKeyDown);
    canvas.addEventListener("keyup", onKeyUp);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      window.clearInterval(cycle);
      controls.removeEventListener("start", pauseSpin);
      controls.removeEventListener("end", resumeSpin);
      canvas.removeEventListener("keydown", onKeyDown);
      canvas.removeEventListener("keyup", onKeyUp);
      visibility.disconnect();
      resize.disconnect();
      document.removeEventListener("visibilitychange", sync);
      controls.dispose();
      day.dispose();
      scene.traverse((object) => {
        const mesh = object as Mesh;
        mesh.geometry?.dispose?.();
        const material = mesh.material as { dispose?: () => void } | undefined;
        material?.dispose?.();
      });
      renderer.dispose();
      canvas.remove();
      homePill.root.remove();
      placePills.forEach((pill) => pill.root.remove());
    };
  }, []);

  useEffect(() => {
    boxRef.current?.querySelector("canvas")?.setAttribute("aria-label", label);
  }, [label]);

  return <div ref={boxRef} className="relative h-full w-full" style={{ touchAction: "pan-y" }} />;
}
