import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Smartphone, RotateCw, Sparkles, Layers, Eye } from 'lucide-react';

interface ScreenOption {
  id: string;
  name: string;
  url: string;
  tag: string;
}

const SCREEN_OPTIONS: ScreenOption[] = [
  {
    id: 'home',
    name: 'HomeCheck Mobile App',
    url: './assets/man-trang-chu-app.Br1F0Hab_Z2J0q8.webp',
    tag: 'App Store & Google Play'
  },
  {
    id: 'satellite',
    name: 'Đo đạc Vệ tinh & Mặt bằng',
    url: './assets/man-do-dac-ve-tinh.B-04KL-2_Z1H4mNW.webp',
    tag: 'Offline-First BLE'
  },
  {
    id: 'view3d',
    name: 'Interactive 3D Room',
    url: './assets/tk-3d.CYdajQ7S_1GYWpb.webp',
    tag: 'Three.js 60FPS'
  },
  {
    id: 'cad',
    name: 'Bản vẽ CAD 2D Kiến trúc',
    url: './assets/trace_cropped.png',
    tag: 'Canvas 2D Engine'
  }
];

export const ThreeHeroCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeScreen, setActiveScreen] = useState<string>('home');
  const [isInteracting, setIsInteracting] = useState(false);
  const phoneGroupRef = useRef<THREE.Group | null>(null);
  const screenMeshRef = useRef<THREE.Mesh | null>(null);
  const textureLoaderRef = useRef<THREE.TextureLoader | null>(null);

  // Switch screen texture
  const handleSwitchScreen = (screen: ScreenOption) => {
    setActiveScreen(screen.id);
    if (!screenMeshRef.current || !textureLoaderRef.current) return;

    textureLoaderRef.current.load(
      screen.url,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.generateMipmaps = true;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        if (screenMeshRef.current) {
          const mat = screenMeshRef.current.material as THREE.MeshStandardMaterial;
          mat.map = texture;
          mat.needsUpdate = true;
        }
      },
      undefined,
      (err) => console.warn('Texture load error:', err)
    );
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 3.5);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x818cf8, 2.5);
    fillLight.position.set(-4, -2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xc084fc, 4, 10);
    rimLight.position.set(0, 4, -2);
    scene.add(rimLight);

    // 3. Create 3D Phone Chassis
    const phoneGroup = new THREE.Group();
    phoneGroupRef.current = phoneGroup;
    scene.add(phoneGroup);

    // Phone Body (Titanium curved frame)
    const phoneWidth = 2.4;
    const phoneHeight = 4.9;
    const phoneDepth = 0.22;
    const radius = 0.28;

    // Rounded rectangle shape for phone body
    const shape = new THREE.Shape();
    const x = -phoneWidth / 2;
    const y = -phoneHeight / 2;
    const w = phoneWidth;
    const h = phoneHeight;

    shape.moveTo(x + radius, y);
    shape.lineTo(x + w - radius, y);
    shape.quadraticCurveTo(x + w, y, x + w, y + radius);
    shape.lineTo(x + w, y + h - radius);
    shape.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    shape.lineTo(x + radius, y + h);
    shape.quadraticCurveTo(x, y + h, x, y + h - radius);
    shape.lineTo(x, y + radius);
    shape.quadraticCurveTo(x, y, x + radius, y);

    const extrudeSettings = {
      depth: phoneDepth,
      bevelEnabled: true,
      bevelSegments: 6,
      steps: 1,
      bevelSize: 0.05,
      bevelThickness: 0.05
    };

    const phoneGeom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    phoneGeom.center();

    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.9,
      roughness: 0.2,
      envMapIntensity: 1.5
    });

    const phoneMesh = new THREE.Mesh(phoneGeom, bodyMaterial);
    phoneGroup.add(phoneMesh);

    // Outer Titanium Edge Ring
    const edgeMaterial = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.95,
      roughness: 0.1,
      wireframe: false
    });
    const edgeMesh = new THREE.Mesh(phoneGeom, edgeMaterial);
    edgeMesh.scale.set(1.008, 1.008, 1.008);
    phoneGroup.add(edgeMesh);

    // Screen Geometry & Texture
    const screenGeom = new THREE.PlaneGeometry(2.32, 4.8);
    const textureLoader = new THREE.TextureLoader();
    textureLoaderRef.current = textureLoader;

    const initialTexture = textureLoader.load(SCREEN_OPTIONS[0].url);
    initialTexture.colorSpace = THREE.SRGBColorSpace;
    initialTexture.minFilter = THREE.LinearMipmapLinearFilter;

    const screenMaterial = new THREE.MeshStandardMaterial({
      map: initialTexture,
      roughness: 0.15,
      metalness: 0.05
    });

    const screenMesh = new THREE.Mesh(screenGeom, screenMaterial);
    screenMesh.position.z = phoneDepth / 2 + 0.055;
    screenMeshRef.current = screenMesh;
    phoneGroup.add(screenMesh);

    // Dynamic Island / Camera Notch
    const notchGeom = new THREE.CapsuleGeometry(0.08, 0.35, 4, 8);
    notchGeom.rotateZ(Math.PI / 2);
    const notchMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const notch = new THREE.Mesh(notchGeom, notchMat);
    notch.position.set(0, 2.15, phoneDepth / 2 + 0.057);
    phoneGroup.add(notch);

    // 4. Ambient Holographic Rings & Particles
    const ringGeom = new THREE.TorusGeometry(3.6, 0.015, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35
    });
    const ring = new THREE.Mesh(ringGeom, ringMat);
    ring.rotation.x = Math.PI / 2.8;
    scene.add(ring);

    const ringGeom2 = new THREE.TorusGeometry(4.2, 0.01, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.25
    });
    const ring2 = new THREE.Mesh(ringGeom2, ringMat2);
    ring2.rotation.x = -Math.PI / 3.2;
    ring2.rotation.y = Math.PI / 6;
    scene.add(ring2);

    // Particle Cloud
    const particleCount = 180;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 14;
      particlePositions[i + 1] = (Math.random() - 0.5) * 14;
      particlePositions[i + 2] = (Math.random() - 0.5) * 8 - 2;
    }

    particleGeom.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // Initial Rotation
    phoneGroup.rotation.y = -0.25;
    phoneGroup.rotation.x = 0.1;

    // 5. Mouse / Touch Orbit Controls
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = -0.25;
    let targetRotationX = 0.1;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      setIsInteracting(true);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - prevMouseX;
      const deltaY = clientY - prevMouseY;

      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.008;

      // Clamp X rotation to prevent flipping
      targetRotationX = Math.max(-0.6, Math.min(0.6, targetRotationX));

      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
      setTimeout(() => setIsInteracting(false), 800);
    };

    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    container.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // 6. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Idle gentle float when not dragging
      if (!isDragging) {
        phoneGroup.position.y = Math.sin(elapsed * 1.5) * 0.08;
        phoneGroup.rotation.y += (targetRotationY + Math.sin(elapsed * 0.8) * 0.05 - phoneGroup.rotation.y) * 0.06;
        phoneGroup.rotation.x += (targetRotationX + Math.cos(elapsed * 0.6) * 0.03 - phoneGroup.rotation.x) * 0.06;
      } else {
        phoneGroup.rotation.y += (targetRotationY - phoneGroup.rotation.y) * 0.12;
        phoneGroup.rotation.x += (targetRotationX - phoneGroup.rotation.x) * 0.12;
      }

      // Rotate ambient rings
      ring.rotation.z = elapsed * 0.15;
      ring2.rotation.z = -elapsed * 0.1;
      particles.rotation.y = elapsed * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Responsive Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[460px] md:h-[580px] rounded-2xl overflow-hidden glass-panel border border-cyan-500/20 shadow-2xl flex flex-col justify-between">
      {/* 3D WebGL Canvas Viewport */}
      <div
        ref={mountRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing z-0"
        title="Nhấp &amp; Kéo để xoay thiết bị 3D 360 độ"
      />

      {/* Top Overlay Badge */}
      <div className="relative z-10 p-4 flex justify-between items-center pointer-events-none">
        <div className="neon-badge">
          <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
          <span>Three.js WebGL Interactive Device</span>
        </div>
        <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700/60 text-[11px] text-slate-300">
          <RotateCw className={`w-3 h-3 text-cyan-400 ${isInteracting ? 'animate-spin' : ''}`} />
          <span>Kéo chuột để xoay 360°</span>
        </div>
      </div>

      {/* Bottom Interactive Screen Switcher Bar */}
      <div className="relative z-10 p-3 md:p-4 bg-slate-950/80 backdrop-blur-xl border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs text-slate-300 font-semibold">
          <Eye className="w-4 h-4 text-cyan-400" />
          <span>Chọn màn hình demo:</span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
          {SCREEN_OPTIONS.map((opt) => {
            const isActive = activeScreen === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => handleSwitchScreen(opt)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-800/60 text-slate-400 border border-slate-700/50 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3 h-3" />
                <span>{opt.name}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900/80 text-slate-400 font-mono">
                  {opt.tag}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
