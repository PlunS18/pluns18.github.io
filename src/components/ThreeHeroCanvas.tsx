import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Smartphone, RotateCw, Eye } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

interface ScreenOption {
  id: string;
  nameVi: string;
  nameEn: string;
  url: string;
  tagVi: string;
  tagEn: string;
}

const SCREEN_OPTIONS: ScreenOption[] = [
  {
    id: 'ai-design',
    nameVi: 'Kiến trúc sư trưởng Agentic AI',
    nameEn: 'Agentic AI Chief Architect',
    url: './assets/hc_web_hero_design.webp',
    tagVi: 'One Sentence One Home',
    tagEn: 'One Sentence One Home'
  },
  {
    id: 'satellite',
    nameVi: 'Đo đạc Vệ tinh & Sơn hướng',
    nameEn: 'Satellite & Orientation Measurement',
    url: './assets/hc_web_satellite_measure.webp',
    tagVi: 'GPS • 24 Sơn Hướng',
    tagEn: 'GPS • 24-Mountain Compass'
  },
  {
    id: 'cad-digitize',
    nameVi: 'Số hoá & Dựng bản vẽ CAD 2D/3D',
    nameEn: '2D/3D CAD Floorplan Digitizer',
    url: './assets/hc_web_cad_digitize.webp',
    tagVi: 'Canvas 2D • Laser BLE',
    tagEn: 'Canvas 2D • Laser BLE'
  },
  {
    id: 'fengshui',
    nameVi: 'Thẩm định Phong thuỷ Khoa học',
    nameEn: 'Scientific Feng Shui Evaluation',
    url: './assets/hc_web_fengshui_analysis.webp',
    tagVi: '9 Chuyên đề Phong thuỷ',
    tagEn: '9 Feng Shui Domains'
  }
];

export const ThreeHeroCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const [activeScreen, setActiveScreen] = useState<string>('ai-design');
  const [isInteracting, setIsInteracting] = useState(false);
  const phoneGroupRef = useRef<THREE.Group | null>(null);
  const screenMeshRef = useRef<THREE.Mesh | null>(null);
  const textureLoaderRef = useRef<THREE.TextureLoader | null>(null);
  const textureCacheRef = useRef<Map<string, THREE.Texture>>(new Map());

  // Switch screen texture instantly with zero ghosting and crisp filtering
  const handleSwitchScreen = (screen: ScreenOption) => {
    setActiveScreen(screen.id);
    if (!screenMeshRef.current) return;

    const cachedTexture = textureCacheRef.current.get(screen.id);
    if (cachedTexture) {
      const mat = screenMeshRef.current.material as THREE.MeshBasicMaterial;
      mat.map = cachedTexture;
      mat.needsUpdate = true;
      return;
    }

    if (textureLoaderRef.current) {
      textureLoaderRef.current.load(
        screen.url,
        (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.generateMipmaps = true;
          texture.minFilter = THREE.LinearMipmapLinearFilter;
          texture.magFilter = THREE.LinearFilter;
          textureCacheRef.current.set(screen.id, texture);

          if (screenMeshRef.current) {
            const mat = screenMeshRef.current.material as THREE.MeshBasicMaterial;
            mat.map = texture;
            mat.needsUpdate = true;
          }
        }
      );
    }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 7.8);

    // 2. High-performance Antialiased WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 3. Cinematic Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 2.5);
    keyLight.position.set(5, 6, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x6366f1, 2.8);
    rimLight.position.set(-6, -4, -4);
    scene.add(rimLight);

    // Dynamic mouse specular light that follows cursor for realistic titanium glint
    const mouseLight = new THREE.PointLight(0xffffff, 2.0, 15);
    mouseLight.position.set(0, 0, 5);
    scene.add(mouseLight);

    // 4. Main Phone Object Group
    const phoneGroup = new THREE.Group();
    phoneGroupRef.current = phoneGroup;
    scene.add(phoneGroup);

    // Dimensions for a modern flagship smartphone
    const phoneWidth = 2.45;
    const phoneHeight = 5.0;
    const phoneThickness = 0.22;
    const cornerRadius = 0.28;

    // --- A. Titanium Outer Frame (Realistic metallic bevel) ---
    const frameGeom = new THREE.BoxGeometry(phoneWidth, phoneHeight, phoneThickness);
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x1f2937,
      metalness: 0.95,
      roughness: 0.22,
      envMapIntensity: 1.5
    });
    const frameMesh = new THREE.Mesh(frameGeom, frameMat);
    phoneGroup.add(frameMesh);

    // Titanium Chamfer Edge Accents (Side antenna bands & polished edge)
    const edgeBevelGeom = new THREE.BoxGeometry(phoneWidth + 0.03, phoneHeight + 0.03, phoneThickness - 0.04);
    const edgeBevelMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.8,
      roughness: 0.3,
      transparent: true,
      opacity: 0.3
    });
    const edgeBevelMesh = new THREE.Mesh(edgeBevelGeom, edgeBevelMat);
    phoneGroup.add(edgeBevelMesh);

    // --- B. Back Matte Glass Plate ---
    const backGlassGeom = new THREE.PlaneGeometry(phoneWidth - 0.08, phoneHeight - 0.08);
    const backGlassMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.4,
      metalness: 0.5
    });
    const backGlass = new THREE.Mesh(backGlassGeom, backGlassMat);
    backGlass.rotation.y = Math.PI;
    backGlass.position.z = -phoneThickness / 2 - 0.002;
    phoneGroup.add(backGlass);

    // HomeCheck Logo on back of phone
    const logoGeom = new THREE.PlaneGeometry(0.5, 0.5);
    const logoTex = new THREE.TextureLoader().load('./assets/logo-homecheck.png');
    logoTex.colorSpace = THREE.SRGBColorSpace;
    const logoMat = new THREE.MeshBasicMaterial({
      map: logoTex,
      transparent: true,
      opacity: 0.6
    });
    const backLogo = new THREE.Mesh(logoGeom, logoMat);
    backLogo.rotation.y = Math.PI;
    backLogo.position.set(0, 0, -phoneThickness / 2 - 0.005);
    phoneGroup.add(backLogo);

    // --- C. Camera Module Bump (Triple Lens System on back) ---
    const bumpGeom = new THREE.BoxGeometry(0.95, 0.95, 0.08);
    const bumpMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      metalness: 0.9,
      roughness: 0.2
    });
    const cameraBump = new THREE.Mesh(bumpGeom, bumpMat);
    cameraBump.position.set(-0.55, 1.8, -phoneThickness / 2 - 0.04);
    phoneGroup.add(cameraBump);

    // 3 Sapphire Camera Lenses with glowing optic rings
    const lensPositions = [
      [-0.72, 2.02],
      [-0.72, 1.58],
      [-0.38, 1.8]
    ];
    lensPositions.forEach(([lx, ly]) => {
      const ringGeom = new THREE.CylinderGeometry(0.14, 0.14, 0.03, 32);
      const ringMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.95, roughness: 0.1 });
      const ring = new THREE.Mesh(ringGeom, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.set(lx, ly, -phoneThickness / 2 - 0.085);
      phoneGroup.add(ring);

      const glassGeom = new THREE.CircleGeometry(0.11, 32);
      const glassMat = new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        roughness: 0.05,
        metalness: 0.9
      });
      const glass = new THREE.Mesh(glassGeom, glassMat);
      glass.rotation.y = Math.PI;
      glass.position.set(lx, ly, -phoneThickness / 2 - 0.101);
      phoneGroup.add(glass);
    });

    // --- D. Front OLED Screen Display ---
    const screenWidth = phoneWidth - 0.12;
    const screenHeight = phoneHeight - 0.14;
    const screenGeom = new THREE.PlaneGeometry(screenWidth, screenHeight);

    const textureLoader = new THREE.TextureLoader();
    textureLoaderRef.current = textureLoader;

    // OLED black backing plane to eliminate any alpha transparency bleed
    const backingGeom = new THREE.PlaneGeometry(screenWidth, screenHeight);
    const backingMat = new THREE.MeshBasicMaterial({ color: 0x020617 });
    const backingMesh = new THREE.Mesh(backingGeom, backingMat);
    backingMesh.position.z = phoneThickness / 2 + 0.001;
    phoneGroup.add(backingMesh);

    const initialScreen = SCREEN_OPTIONS[0];
    const screenTexture = textureLoader.load(initialScreen.url, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.generateMipmaps = true;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      textureCacheRef.current.set(initialScreen.id, tex);
    });

    // Clean OLED material without emissiveMap (eliminates double-exposure ghosting completely)
    const screenMat = new THREE.MeshBasicMaterial({
      map: screenTexture,
      toneMapped: false
    });

    const screenMesh = new THREE.Mesh(screenGeom, screenMat);
    screenMesh.position.z = phoneThickness / 2 + 0.002;
    phoneGroup.add(screenMesh);
    screenMeshRef.current = screenMesh;

    // Preload remaining screens into cache in the background for 0ms latency switching
    SCREEN_OPTIONS.slice(1).forEach((opt) => {
      textureLoader.load(opt.url, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.generateMipmaps = true;
        tex.minFilter = THREE.LinearMipmapLinearFilter;
        tex.magFilter = THREE.LinearFilter;
        textureCacheRef.current.set(opt.id, tex);
      });
    });

    // --- E. Dynamic Island Pill Notch on front screen ---
    const islandGeom = new THREE.BoxGeometry(0.58, 0.16, 0.015);
    const islandMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const dynamicIsland = new THREE.Mesh(islandGeom, islandMat);
    dynamicIsland.position.set(0, phoneHeight / 2 - 0.25, phoneThickness / 2 + 0.004);
    phoneGroup.add(dynamicIsland);

    // Front sensor lens dot
    const sensorGeom = new THREE.CircleGeometry(0.035, 16);
    const sensorMat = new THREE.MeshBasicMaterial({ color: 0x1e3a8a });
    const sensor = new THREE.Mesh(sensorGeom, sensorMat);
    sensor.position.set(0.16, phoneHeight / 2 - 0.25, phoneThickness / 2 + 0.013);
    phoneGroup.add(sensor);

    // --- F. 3D Floating Holographic Badges Orbiting the Device ---
    const badgesGroup = new THREE.Group();
    scene.add(badgesGroup);

    // Floating 3D AI Chip marker
    const chipGeom = new THREE.BoxGeometry(0.42, 0.42, 0.04);
    const chipMat = new THREE.MeshStandardMaterial({
      color: 0x0369a1,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.35
    });
    const chipMesh = new THREE.Mesh(chipGeom, chipMat);
    chipMesh.position.set(-2.0, 1.8, 0.5);
    badgesGroup.add(chipMesh);

    // Floating 3D Compass ring
    const compassRingGeom = new THREE.RingGeometry(0.35, 0.42, 32);
    const compassRingMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8
    });
    const compassRing = new THREE.Mesh(compassRingGeom, compassRingMat);
    compassRing.position.set(2.0, -1.2, 0.4);
    badgesGroup.add(compassRing);

    // Holographic Orbit Ring
    const orbitRingGeom = new THREE.TorusGeometry(3.6, 0.012, 16, 100);
    const orbitRingMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35
    });
    const orbitRing = new THREE.Mesh(orbitRingGeom, orbitRingMat);
    orbitRing.rotation.x = Math.PI / 2.3;
    orbitRing.rotation.y = 0.2;
    scene.add(orbitRing);

    // Second intersecting orbit ring
    const orbitRing2 = new THREE.Mesh(
      new THREE.TorusGeometry(3.9, 0.008, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0x818cf8, transparent: true, opacity: 0.25 })
    );
    orbitRing2.rotation.x = Math.PI / 1.7;
    orbitRing2.rotation.z = 0.4;
    scene.add(orbitRing2);

    // Background Particle Starfield
    const starCount = 180;
    const starGeom = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 16;
      starPositions[i + 1] = (Math.random() - 0.5) * 16;
      starPositions[i + 2] = (Math.random() - 0.5) * 8 - 2;
    }
    starGeom.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.04,
      transparent: true,
      opacity: 0.6
    });
    const stars = new THREE.Points(starGeom, starMat);
    scene.add(stars);

    // Initial angled display pose
    phoneGroup.rotation.y = 0.25;
    phoneGroup.rotation.x = 0.08;

    // 5. Interactive Drag & Natural Orbit (FIXED INVERSION BUG)
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let targetRotationY = 0.25;
    let targetRotationX = 0.08;
    let currentRotationY = 0.25;
    let currentRotationX = 0.08;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      setIsInteracting(true);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevX = clientX;
      prevY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      // Update dynamic mouse specular light position
      const rect = container.getBoundingClientRect();
      const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -((clientY - rect.top) / rect.height) * 2 + 1;
      mouseLight.position.set(normX * 4, normY * 4, 4);

      if (!isDragging) return;

      const deltaX = clientX - prevX;
      const deltaY = clientY - prevY;

      // NATURAL TRACKBALL DRAG (Dragging left rotates left, dragging down tilts toward user)
      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.006;

      // Clamp vertical tilt to prevent unnatural flipping
      targetRotationX = Math.max(-0.65, Math.min(0.65, targetRotationX));

      prevX = clientX;
      prevY = clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    container.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // 6. Smooth Physics Dampening Loop (60 FPS)
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle auto-idle floating rotation when user is not dragging
      if (!isDragging) {
        targetRotationY += 0.0018;
      }

      // Smooth spring interpolation (LERP)
      currentRotationY += (targetRotationY - currentRotationY) * 0.07;
      currentRotationX += (targetRotationX - currentRotationX) * 0.07;

      phoneGroup.rotation.y = currentRotationY;
      phoneGroup.rotation.x = currentRotationX;

      // Subtle levitation bobbing
      phoneGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.08;

      // Orbit holographic accessories
      orbitRing.rotation.z = elapsedTime * 0.15;
      orbitRing2.rotation.z = -elapsedTime * 0.12;

      chipMesh.rotation.y = elapsedTime * 0.8;
      chipMesh.rotation.x = elapsedTime * 0.4;
      chipMesh.position.y = 1.8 + Math.sin(elapsedTime * 2) * 0.06;

      compassRing.rotation.z = -elapsedTime * 0.6;
      compassRing.position.y = -1.2 + Math.cos(elapsedTime * 1.8) * 0.06;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Responsive Resizer
    const onResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      window.removeEventListener('resize', onResize);

      // Clean disposal
      renderer.dispose();
      frameGeom.dispose();
      frameMat.dispose();
      screenGeom.dispose();
      screenMat.dispose();
      backingGeom.dispose();
      backingMat.dispose();
      orbitRingGeom.dispose();
      orbitRingMat.dispose();
      starGeom.dispose();
      starMat.dispose();

      textureCacheRef.current.forEach((tex) => tex.dispose());
      textureCacheRef.current.clear();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const activeOption = SCREEN_OPTIONS.find((s) => s.id === activeScreen) || SCREEN_OPTIONS[0];

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* 3D WebGL Canvas Card */}
      <div className="relative w-full h-[460px] sm:h-[500px] lg:h-[540px] rounded-3xl overflow-hidden glass-panel border border-cyan-500/30 shadow-2xl shadow-cyan-950/40">
        {/* Top Floating Badge */}
        <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center pointer-events-none">
          <div className="flex items-center gap-2 bg-slate-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-cyan-500/30 text-xs font-semibold text-cyan-300 pointer-events-auto shadow-lg">
            <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
            <span>THREE.JS WEBGL FLAGSHIP CHASSIS</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700/60 text-[11px] text-slate-300 font-mono pointer-events-auto">
            <RotateCw className={`w-3.5 h-3.5 text-cyan-400 ${isInteracting ? 'animate-spin' : ''}`} />
            <span>{language === 'vi' ? 'Kéo chuột xoay 360°' : 'Drag mouse to rotate 360°'}</span>
          </div>
        </div>

        {/* 3D Three.js Container */}
        <div
          ref={mountRef}
          className="w-full h-full cursor-grab active:cursor-grabbing"
          title={language === 'vi' ? 'Kéo & Rê chuột để xoay thiết bị 3D tự nhiên' : 'Drag mouse to rotate 3D device naturally'}
        />

        {/* Floating live indicator at bottom of 3D canvas */}
        <div className="absolute bottom-4 left-4 right-4 z-10 flex justify-between items-center pointer-events-none">
          <div className="bg-slate-950/90 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-800 text-[11px] text-slate-300 flex items-center gap-2 pointer-events-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold text-white">
              {language === 'vi' ? activeOption.nameVi : activeOption.nameEn}
            </span>
            <span className="text-cyan-400 text-[10px] px-1.5 py-0.2 rounded bg-cyan-950/60 border border-cyan-800/60 font-mono">
              {language === 'vi' ? activeOption.tagVi : activeOption.tagEn}
            </span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono hidden sm:block bg-slate-950/80 px-2.5 py-1 rounded border border-slate-800">
            PBR Titanium • 60 FPS
          </div>
        </div>
      </div>

      {/* Screen Switcher Bar Below 3D Device */}
      <div className="w-full mt-4 bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-3 shadow-xl">
        <div className="text-[11px] text-slate-400 font-mono uppercase tracking-wider mb-2.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-cyan-400">
            <Eye className="w-3.5 h-3.5" />
            <span className="font-semibold">
              {language === 'vi' ? 'Chọn màn hình thực tế từ web myhomecheck.ai:' : 'Select official screen from myhomecheck.ai:'}
            </span>
          </div>
          <span className="text-slate-500 hidden sm:inline">
            {language === 'vi' ? 'Texture WebP • Tự động ánh xạ vào 3D' : 'WebP Texture • Realtime 3D Mapping'}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {SCREEN_OPTIONS.map((screen) => {
            const isSelected = activeScreen === screen.id;
            return (
              <button
                key={screen.id}
                onClick={() => handleSwitchScreen(screen)}
                className={`p-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-950/50 border-cyan-400/80 text-white shadow-lg shadow-cyan-500/20 scale-[1.02]'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                    isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {language === 'vi' ? screen.tagVi : screen.tagEn}
                  </span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                </div>
                <div className="text-xs font-bold truncate text-slate-100">
                  {language === 'vi' ? screen.nameVi : screen.nameEn}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
