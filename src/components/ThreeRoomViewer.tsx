import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Box, Rotate3d, Layers, Compass, Sparkles } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export const ThreeRoomViewer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState<'3d' | 'cad' | 'fengshui'>('3d');
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    if (viewMode !== '3d') return;
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x070b14);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // 2. Cinematic Architectural Lighting
    const ambientLight = new THREE.AmbientLight(0x94a3b8, 1.1);
    scene.add(ambientLight);

    // Main Sunlight through panoramic window
    const sunLight = new THREE.DirectionalLight(0xe0f2fe, 2.2);
    sunLight.position.set(8, 12, 6);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 30;
    sunLight.shadow.camera.left = -6;
    sunLight.shadow.camera.right = 6;
    sunLight.shadow.camera.top = 6;
    sunLight.shadow.camera.bottom = -6;
    scene.add(sunLight);

    // Warm Interior Accent Lamp (Floor Lamp PointLight)
    const lampLight = new THREE.PointLight(0xffedd5, 2.5, 9);
    lampLight.position.set(-2.2, 2.4, -2.2);
    lampLight.castShadow = true;
    scene.add(lampLight);

    // Cyan LED Cove Light under TV / Ceiling
    const coveLight = new THREE.PointLight(0x38bdf8, 1.8, 8);
    coveLight.position.set(0, 3.1, -2.6);
    scene.add(coveLight);

    // 3. Architectural Scene Container Group
    const roomGroup = new THREE.Group();
    scene.add(roomGroup);

    // --- A. Luxury Hardwood Parquet Floor ---
    const floorSizeX = 7.0;
    const floorSizeZ = 7.0;
    const floorGeom = new THREE.PlaneGeometry(floorSizeX, floorSizeZ);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.35,
      metalness: 0.15
    });
    const floor = new THREE.Mesh(floorGeom, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    roomGroup.add(floor);

    // Subtle Architectural Floor Grid
    const gridHelper = new THREE.GridHelper(7, 14, 0x38bdf8, 0x1e293b);
    gridHelper.position.y = 0.005;
    roomGroup.add(gridHelper);

    // Plush Geometric Rug under sofa area
    const rugGeom = new THREE.PlaneGeometry(3.6, 2.8);
    const rugMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.9,
      metalness: 0.05
    });
    const rug = new THREE.Mesh(rugGeom, rugMat);
    rug.rotation.x = -Math.PI / 2;
    rug.position.set(0, 0.01, -0.4);
    rug.receiveShadow = true;
    roomGroup.add(rug);

    // --- B. Architectural Cutaway Perimeter Walls ---
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.7
    });

    // Back Main Wall
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(7, 2.4, 0.2), wallMat);
    backWall.position.set(0, 1.2, -3.5);
    backWall.receiveShadow = true;
    backWall.castShadow = true;
    roomGroup.add(backWall);

    // Left Cutaway Wall
    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.2, 2.4, 7), wallMat);
    leftWall.position.set(-3.5, 1.2, 0);
    leftWall.receiveShadow = true;
    leftWall.castShadow = true;
    roomGroup.add(leftWall);

    // Accent Acoustic Wood Slats behind TV
    const slatGroup = new THREE.Group();
    for (let i = -1.6; i <= 1.6; i += 0.14) {
      const slat = new THREE.Mesh(
        new THREE.BoxGeometry(0.06, 2.3, 0.04),
        new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.5 })
      );
      slat.position.set(i, 1.2, -3.38);
      slatGroup.add(slat);
    }
    roomGroup.add(slatGroup);

    // --- C. Modern Living Room Furniture ---
    // Sectional L-Sofa (Chic Navy Fabric)
    const sofaFabric = new THREE.MeshStandardMaterial({
      color: 0x0369a1,
      roughness: 0.8
    });

    // Sofa Main Base
    const sofaMain = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.42, 1.0), sofaFabric);
    sofaMain.position.set(0, 0.25, -1.5);
    sofaMain.castShadow = true;
    sofaMain.receiveShadow = true;
    roomGroup.add(sofaMain);

    // Sofa L-Return (Chaise lounge)
    const sofaChaise = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.42, 1.4), sofaFabric);
    sofaChaise.position.set(1.4, 0.25, -0.3);
    sofaChaise.castShadow = true;
    sofaChaise.receiveShadow = true;
    roomGroup.add(sofaChaise);

    // Sofa Backrest
    const sofaBack = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.55, 0.28), sofaFabric);
    sofaBack.position.set(0, 0.7, -1.9);
    sofaBack.castShadow = true;
    roomGroup.add(sofaBack);

    // Sofa Side Armrest
    const sofaArm = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.5, 1.0), sofaFabric);
    sofaArm.position.set(-1.45, 0.6, -1.5);
    sofaArm.castShadow = true;
    roomGroup.add(sofaArm);

    // Decorative Accent Cushions
    const cushionColors = [0x38bdf8, 0xf59e0b, 0x6366f1];
    [-0.9, 0, 0.9].forEach((cx, idx) => {
      const cushion = new THREE.Mesh(
        new THREE.BoxGeometry(0.42, 0.38, 0.18),
        new THREE.MeshStandardMaterial({ color: cushionColors[idx], roughness: 0.7 })
      );
      cushion.position.set(cx, 0.6, -1.7);
      cushion.rotation.x = -0.15;
      cushion.castShadow = true;
      roomGroup.add(cushion);
    });

    // Glass Coffee Table
    const tableTop = new THREE.Mesh(
      new THREE.CylinderGeometry(0.7, 0.7, 0.04, 32),
      new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        metalness: 0.2,
        roughness: 0.1,
        transparent: true,
        opacity: 0.75
      })
    );
    tableTop.position.set(0, 0.38, 0.2);
    tableTop.castShadow = true;
    roomGroup.add(tableTop);

    // Black Metal Coffee Table Base
    const tableBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.45, 0.6, 0.36, 16, 1, true),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9, roughness: 0.2 })
    );
    tableBase.position.set(0, 0.18, 0.2);
    tableBase.castShadow = true;
    roomGroup.add(tableBase);

    // Ultra-thin OLED TV (75 inch)
    const tvScreen = new THREE.Mesh(
      new THREE.BoxGeometry(2.3, 1.3, 0.04),
      new THREE.MeshStandardMaterial({ color: 0x020617, roughness: 0.1, metalness: 0.9 })
    );
    tvScreen.position.set(0, 1.45, -3.3);
    roomGroup.add(tvScreen);

    // TV Glowing Display (HomeCheck Architectural UI)
    const tvDisplay = new THREE.Mesh(
      new THREE.PlaneGeometry(2.2, 1.22),
      new THREE.MeshBasicMaterial({ color: 0x0ea5e9 })
    );
    tvDisplay.position.set(0, 1.45, -3.27);
    roomGroup.add(tvDisplay);

    // TV Media Console Cabinet
    const consoleCabinet = new THREE.Mesh(
      new THREE.BoxGeometry(2.8, 0.35, 0.45),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.5, roughness: 0.3 })
    );
    consoleCabinet.position.set(0, 0.25, -3.15);
    consoleCabinet.castShadow = true;
    roomGroup.add(consoleCabinet);

    // Floor Arc Lamp
    const lampPole = new THREE.Mesh(
      new THREE.TorusGeometry(1.6, 0.03, 16, 32, Math.PI / 1.3),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9, roughness: 0.15 })
    );
    lampPole.position.set(-2.5, 1.2, -2.0);
    lampPole.rotation.y = Math.PI / 3;
    roomGroup.add(lampPole);

    // Glowing Lamp Shade
    const lampShade = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 32, 16),
      new THREE.MeshStandardMaterial({
        color: 0xffedd5,
        emissive: 0xf59e0b,
        emissiveIntensity: 1.2,
        roughness: 0.2
      })
    );
    lampShade.position.set(-2.2, 2.4, -2.2);
    roomGroup.add(lampShade);

    // Ceramic Planter & Indoor Tropical Plant
    const pot = new THREE.Mesh(
      new THREE.CylinderGeometry(0.35, 0.26, 0.65, 24),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 })
    );
    pot.position.set(2.4, 0.35, -2.4);
    pot.castShadow = true;
    roomGroup.add(pot);

    // Plant foliage leaves
    for (let l = 0; l < 7; l++) {
      const leaf = new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 12, 12),
        new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.6 })
      );
      leaf.scale.set(1.5, 0.1, 0.8);
      leaf.rotation.y = (l * Math.PI) / 3.5;
      leaf.rotation.z = 0.35;
      leaf.position.set(
        2.4 + Math.cos(l) * 0.2,
        0.85 + l * 0.08,
        -2.4 + Math.sin(l) * 0.2
      );
      leaf.castShadow = true;
      roomGroup.add(leaf);
    }

    // --- D. 3D Floating Architectural Beacons (Apple Vision Pro style) ---
    const beaconGroup = new THREE.Group();
    roomGroup.add(beaconGroup);

    // Living Room Beacon Pin
    const beacon1 = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.16, 0),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true })
    );
    beacon1.position.set(0, 1.6, -0.5);
    beaconGroup.add(beacon1);

    // Dimension Laser Ruler Line in 3D Space (Measuring room width 7.0m)
    const rulerGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-3.3, 0.05, 2.5),
      new THREE.Vector3(3.3, 0.05, 2.5)
    ]);
    const rulerMat = new THREE.LineDashedMaterial({
      color: 0x38bdf8,
      dashSize: 0.2,
      gapSize: 0.1
    });
    const rulerLine = new THREE.Line(rulerGeom, rulerMat);
    rulerLine.computeLineDistances();
    roomGroup.add(rulerLine);

    // 4. Natural Orbit Camera Controls (FIXED INVERSION BUG)
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let rotationY = 0.8;
    let rotationX = 0.5;
    let targetRotationY = 0.8;
    let targetRotationX = 0.5;
    let cameraRadius = 9.8;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      setIsRotating(true);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevX = clientX;
      prevY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - prevX;
      const deltaY = clientY - prevY;

      // NATURAL TRACKBALL ORBIT:
      // Dragging left turns room left; dragging right turns room right
      // Dragging down tilts view toward eye-level; dragging up gives bird's-eye view
      targetRotationY -= deltaX * 0.007;
      targetRotationX += deltaY * 0.005;

      // Clamp vertical elevation to keep room in clear view
      targetRotationX = Math.max(0.15, Math.min(1.25, targetRotationX));

      prevX = clientX;
      prevY = clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
      setIsRotating(false);
    };

    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    container.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // 5. 60 FPS Render Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle auto-tour orbit when idle
      if (!isDragging) {
        targetRotationY += 0.0012;
      }

      // Smooth dampening
      rotationY += (targetRotationY - rotationY) * 0.06;
      rotationX += (targetRotationX - rotationX) * 0.06;

      camera.position.x = cameraRadius * Math.sin(rotationY) * Math.cos(rotationX);
      camera.position.y = cameraRadius * Math.sin(rotationX);
      camera.position.z = cameraRadius * Math.cos(rotationY) * Math.cos(rotationX);
      camera.lookAt(0, 0.6, 0);

      // Animate floating beacons
      beacon1.rotation.y = elapsedTime * 1.5;
      beacon1.position.y = 1.6 + Math.sin(elapsedTime * 2.5) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
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
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [viewMode]);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden glass-panel border border-indigo-500/30 shadow-2xl flex flex-col justify-between">
      {/* Top Header Mode Switcher Bar */}
      <div className="relative z-10 p-3 sm:p-4 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 flex flex-wrap gap-3 justify-between items-center">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Box className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-heading font-black text-sm sm:text-base text-slate-100">
                {t.viewer3d.engineTitle}
              </h4>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-mono">
                {t.viewer3d.fpsBadge}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {t.viewer3d.engineSub}
            </p>
          </div>
        </div>

        {/* 3 Interactive Mode Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-700/60">
          <button
            id="btn-view-3d"
            onClick={() => setViewMode('3d')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === '3d'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Rotate3d className="w-3.5 h-3.5" />
            <span>{t.viewer3d.tabs.model3d}</span>
          </button>

          <button
            id="btn-view-cad"
            onClick={() => setViewMode('cad')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'cad'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{t.viewer3d.tabs.cad2d}</span>
          </button>

          <button
            id="btn-view-fengshui"
            onClick={() => setViewMode('fengshui')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'fengshui'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{t.viewer3d.tabs.fengshui}</span>
          </button>
        </div>
      </div>

      {/* Main Viewport Content */}
      <div className="relative w-full h-[420px] sm:h-[480px] lg:h-[520px] bg-slate-950 overflow-hidden flex items-center justify-center">
        {viewMode === '3d' && (
          <>
            <div
              ref={mountRef}
              className="w-full h-full cursor-grab active:cursor-grabbing"
              title={t.viewer3d.statusBar.dragHint}
            />
            {/* Floating Room Info Overlay */}
            <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-cyan-500/30 text-xs text-slate-200 pointer-events-none shadow-xl">
              <div className="font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t.viewer3d.roomOverlay.title}</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {t.viewer3d.roomOverlay.desc}
              </div>
            </div>

            <div className="absolute top-4 right-4 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60 text-[11px] text-slate-300 font-mono pointer-events-none">
              <span>{t.viewer3d.roomOverlay.disposeBadge}</span>
            </div>
          </>
        )}

        {viewMode === 'cad' && (
          <div className="w-full h-full flex flex-col md:flex-row items-center justify-center p-6 gap-6 bg-[#0a0f1d]">
            <div className="relative max-h-full max-w-md h-full flex items-center justify-center">
              <img
                src="./assets/hc_web_cad_digitize.webp"
                alt="2D Architectural CAD Floorplan"
                className="max-h-full object-contain rounded-2xl border border-cyan-500/40 shadow-2xl shadow-cyan-950/50"
              />
            </div>
            <div className="max-w-md text-left bg-slate-900/80 backdrop-blur-md p-5 rounded-2xl border border-slate-800 shadow-xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-semibold mb-3 border border-cyan-500/20">
                <Layers className="w-3.5 h-3.5" />
                <span>{t.viewer3d.cad.badge}</span>
              </div>
              <h5 className="font-heading font-black text-lg text-white mb-2">
                {t.viewer3d.cad.title}
              </h5>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {t.viewer3d.cad.desc}
              </p>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                  <span className="text-cyan-400 font-bold">✓ {t.viewer3d.cad.feature1}</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                  <span className="text-emerald-400 font-bold">✓ {t.viewer3d.cad.feature2}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {viewMode === 'fengshui' && (
          <div className="w-full h-full flex flex-col md:flex-row items-center justify-center p-6 gap-6 bg-[#0a0f1d]">
            <div className="relative max-h-full max-w-md h-full flex items-center justify-center">
              <img
                src="./assets/hc_web_fengshui_analysis.webp"
                alt="24 Sơn Hướng La Kinh Phong Thuỷ"
                className="max-h-full object-contain rounded-2xl border border-amber-500/40 shadow-2xl shadow-amber-950/50"
              />
            </div>
            <div className="max-w-md text-left bg-slate-900/80 backdrop-blur-md p-5 rounded-2xl border border-slate-800 shadow-xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold mb-3 border border-amber-500/20">
                <Compass className="w-3.5 h-3.5" />
                <span>{t.viewer3d.fengshui.badge}</span>
              </div>
              <h5 className="font-heading font-black text-lg text-white mb-2">
                {t.viewer3d.fengshui.title}
              </h5>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {t.viewer3d.fengshui.desc}
              </p>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                  <span className="text-amber-400 font-bold">✓ {t.viewer3d.fengshui.feature1}</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                  <span className="text-purple-400 font-bold">✓ {t.viewer3d.fengshui.feature2}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Status Bar */}
      <div className="relative z-10 px-4 py-2.5 bg-slate-950/80 backdrop-blur-md border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-slate-200 font-mono">{t.viewer3d.statusBar.title}</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          <span>{t.viewer3d.statusBar.dragHint}</span>
          <span>•</span>
          <span>{t.viewer3d.statusBar.memoryHint}</span>
        </div>
      </div>
    </div>
  );
};
