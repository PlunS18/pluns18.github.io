import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// A sample apartment taken from the HomeCheck floor plan screenshot (metres).
// x runs left to right, z runs top to bottom of the drawing.
const W = 7.8;
const D = 10.4;
const H = 2.8;
const MARGIN = 1.5;
const PX = 120; // texture pixels per metre
const CUTAWAY = 0.6; // walls drawn at 60% height in 3D so rooms stay readable
const PLAN_SHIFT = 0.8; // plan view sits higher, leaving room for the sheet's title block

type RoomKey = 'wc2' | 'hall' | 'wc1' | 'kitchen' | 'living' | 'bed2' | 'bed1';

// lz moves a label off the furniture in that room
const ROOMS: { key: RoomKey; x: number; z: number; w: number; d: number; lz?: number }[] = [
  { key: 'wc2', x: 0, z: 0, w: 2.2, d: 3.2 },
  { key: 'hall', x: 2.2, z: 0, w: 2.15, d: 3.2 },
  { key: 'wc1', x: 4.35, z: 1.6, w: 3.45, d: 1.6 },
  { key: 'kitchen', x: 4.35, z: 3.2, w: 3.45, d: 3.2, lz: 5.75 },
  { key: 'living', x: 0, z: 3.2, w: 4.35, d: 3.2, lz: 3.75 },
  { key: 'bed2', x: 0, z: 6.4, w: 4.35, d: 4.0, lz: 7.4 },
  { key: 'bed1', x: 4.35, z: 6.4, w: 3.45, d: 4.0, lz: 7.4 },
];

// Wall pieces: from (x1,z1) to (x2,z2), spanning heights y0..y1, thickness t.
type Wall = [number, number, number, number, number?, number?, number?];
const OUT = 0.2;
const IN = 0.12;
const SILL = 0.9;
const HEAD = 2.2;

const WALLS: Wall[] = [
  // outer shell
  [0, 0, 2.6, 0, 0, H, OUT],
  [3.6, 0, 4.35, 0, 0, H, OUT],
  [2.6, 0, 3.6, 0, HEAD, H, OUT],
  [4.35, 0, 4.35, 1.6, 0, H, OUT],
  [4.35, 1.6, 7.8, 1.6, 0, H, OUT],
  [7.8, 1.6, 7.8, 4.0, 0, H, OUT],
  [7.8, 4.0, 7.8, 5.4, 0, SILL, OUT],
  [7.8, 4.0, 7.8, 5.4, HEAD, H, OUT],
  [7.8, 5.4, 7.8, 10.4, 0, H, OUT],
  [0, 10.4, 1.2, 10.4, 0, H, OUT],
  [1.2, 10.4, 3.0, 10.4, 0, SILL, OUT],
  [1.2, 10.4, 3.0, 10.4, HEAD, H, OUT],
  [3.0, 10.4, 5.0, 10.4, 0, H, OUT],
  [5.0, 10.4, 6.8, 10.4, 0, SILL, OUT],
  [5.0, 10.4, 6.8, 10.4, HEAD, H, OUT],
  [6.8, 10.4, 7.8, 10.4, 0, H, OUT],
  [0, 0, 0, 4.0, 0, H, OUT],
  [0, 4.0, 0, 5.4, 0, SILL, OUT],
  [0, 4.0, 0, 5.4, HEAD, H, OUT],
  [0, 5.4, 0, 10.4, 0, H, OUT],
  // interior
  [2.2, 0, 2.2, 3.2],
  [0, 3.2, 1.0, 3.2],
  [1.7, 3.2, 2.2, 3.2],
  [4.35, 1.6, 4.35, 4.0],
  [4.35, 5.4, 4.35, 7.0],
  [4.35, 7.9, 4.35, 10.4],
  [4.35, 3.2, 5.0, 3.2],
  [5.8, 3.2, 7.8, 3.2],
  [0, 6.4, 2.6, 6.4],
  [3.5, 6.4, 7.8, 6.4],
];

// Furniture blocks: x, z, w, d, height
const FURNITURE: [number, number, number, number, number][] = [
  [1.3, 8.3, 1.8, 2.0, 0.45],
  [1.3, 8.3, 1.8, 0.12, 0.95],
  [5.25, 8.3, 1.6, 2.0, 0.45],
  [5.25, 8.3, 1.6, 0.12, 0.95],
  [0.4, 5.55, 2.8, 0.7, 0.75],
  [1.6, 4.55, 1.1, 0.6, 0.4],
  [7.1, 3.45, 0.6, 2.7, 0.9],
  [5.0, 4.25, 1.3, 0.9, 0.75],
  [0.25, 0.3, 0.6, 0.45, 0.45],
  [6.9, 1.85, 0.6, 0.45, 0.45],
];

// Door swings drawn on the floor: hinge x, z, radius, start and end angle (radians, canvas space)
const DOORS: [number, number, number, number, number][] = [
  [2.6, 0, 0.5, 0, Math.PI / 2],
  [3.6, 0, 0.5, Math.PI / 2, Math.PI],
  [1.0, 3.2, 0.7, -Math.PI / 2, 0],
  [5.0, 3.2, 0.8, -Math.PI / 2, 0],
  [2.6, 6.4, 0.9, 0, Math.PI / 2],
  [4.35, 7.0, 0.9, 0, Math.PI / 2],
];

const INK = '#1a2233';
const INK_SOFT = '#4a5468';
const PAPER = '#fdfdfb';
const PEN = '#2c56d8';

type Mode = 'plan' | '3d';

interface PlanModelProps {
  mode: Mode;
  roomLabels: Record<RoomKey, string>;
  decimal: string;
  ariaLabel: string;
}

function drawFloor(canvas: HTMLCanvasElement, labels: Record<RoomKey, string>, decimal: string) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const px = (m: number) => (m + MARGIN) * PX;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = PAPER;
  ctx.fillRect(px(0), px(0), W * PX, D * PX);

  // Room names and areas
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (const r of ROOMS) {
    const cx = px(r.x + r.w / 2);
    const cz = px(r.lz ?? r.z + r.d / 2);
    ctx.fillStyle = INK;
    ctx.font = `600 ${0.27 * PX}px "Be Vietnam Pro", sans-serif`;
    ctx.fillText(labels[r.key], cx, cz - 0.18 * PX);
    ctx.fillStyle = INK_SOFT;
    ctx.font = `400 ${0.22 * PX}px "Be Vietnam Pro", sans-serif`;
    ctx.fillText(`${(r.w * r.d).toFixed(1).replace('.', decimal)} m²`, cx, cz + 0.18 * PX);
  }

  // Door swings
  ctx.strokeStyle = INK_SOFT;
  ctx.lineWidth = 2;
  for (const [x, z, r, a0, a1] of DOORS) {
    ctx.beginPath();
    ctx.moveTo(px(x), px(z));
    ctx.lineTo(px(x) + Math.cos(a1) * r * PX, px(z) + Math.sin(a1) * r * PX);
    ctx.stroke();
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.arc(px(x), px(z), r * PX, a0, a1);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // Dimension lines in millimetres, like the HomeCheck editor
  ctx.strokeStyle = PEN;
  ctx.fillStyle = PEN;
  ctx.lineWidth = 2;
  ctx.font = `500 ${0.24 * PX}px "Be Vietnam Pro", sans-serif`;
  const tick = 0.12 * PX;
  const hDim = (x1: number, x2: number, z: number) => {
    ctx.beginPath();
    ctx.moveTo(px(x1), px(z));
    ctx.lineTo(px(x2), px(z));
    for (const x of [x1, x2]) {
      ctx.moveTo(px(x), px(z) - tick);
      ctx.lineTo(px(x), px(z) + tick);
    }
    ctx.stroke();
    ctx.fillText(String(Math.round((x2 - x1) * 1000)), px((x1 + x2) / 2), px(z) - 0.22 * PX);
  };
  const vDim = (z1: number, z2: number, x: number) => {
    ctx.beginPath();
    ctx.moveTo(px(x), px(z1));
    ctx.lineTo(px(x), px(z2));
    for (const z of [z1, z2]) {
      ctx.moveTo(px(x) - tick, px(z));
      ctx.lineTo(px(x) + tick, px(z));
    }
    ctx.stroke();
    ctx.save();
    ctx.translate(px(x) - 0.22 * PX, px((z1 + z2) / 2));
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(String(Math.round((z2 - z1) * 1000)), 0, 0);
    ctx.restore();
  };
  hDim(0, 4.35, D + 0.55);
  hDim(4.35, W, D + 0.55);
  hDim(0, W, D + 1.1);
  vDim(0, D, -0.6);
}

function wallMesh(
  [x1, z1, x2, z2, y0 = 0, y1 = H, t = IN]: Wall,
  sideMat: THREE.Material,
  topMat: THREE.Material,
  edgeMat: THREE.LineBasicMaterial,
) {
  const len = Math.hypot(x2 - x1, z2 - z1) + t;
  const h = y1 - y0;
  const geo = new THREE.BoxGeometry(len, h, t);
  geo.translate(0, y0 + h / 2, 0);
  // Box material order: +x, -x, +y (top), -y, +z, -z
  const mesh = new THREE.Mesh(geo, [sideMat, sideMat, topMat, sideMat, sideMat, sideMat]);
  const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo), edgeMat);
  const g = new THREE.Group();
  g.add(mesh, edges);
  g.position.set((x1 + x2) / 2, 0, (z1 + z2) / 2);
  g.rotation.y = -Math.atan2(z2 - z1, x2 - x1);
  return g;
}

export const PlanModel: React.FC<PlanModelProps> = ({ mode, roomLabels, decimal, ariaLabel }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const modeRef = useRef<Mode>(mode);
  const redrawRef = useRef<((labels: Record<RoomKey, string>) => void) | null>(null);
  const kickRef = useRef<() => void>(() => {});
  // Keep the latest labels for the post-font-load redraw
  const roomLabelsRef = useRef(roomLabels);
  roomLabelsRef.current = roomLabels;
  const decimalRef = useRef(decimal);
  decimalRef.current = decimal;

  useEffect(() => {
    modeRef.current = mode;
    kickRef.current();
  }, [mode]);

  useEffect(() => {
    redrawRef.current?.(roomLabels);
  }, [roomLabels]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);
    Object.assign(renderer.domElement.style, { width: '100%', height: '100%', display: 'block', touchAction: 'pan-y' });

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 200);
    scene.add(new THREE.HemisphereLight(0xffffff, 0xd9dde6, 2.2));
    const sun = new THREE.DirectionalLight(0xffffff, 1.4);
    sun.position.set(-6, 12, 4);
    scene.add(sun);

    const house = new THREE.Group();
    house.position.set(-W / 2, 0, -D / 2);
    scene.add(house);

    // Floor: one plane carrying the drawn plan
    const floorCanvas = document.createElement('canvas');
    floorCanvas.width = Math.round((W + MARGIN * 2) * PX);
    floorCanvas.height = Math.round((D + MARGIN * 2) * PX);
    const floorTex = new THREE.CanvasTexture(floorCanvas);
    floorTex.colorSpace = THREE.SRGBColorSpace;
    floorTex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(W + MARGIN * 2, D + MARGIN * 2),
      new THREE.MeshBasicMaterial({ map: floorTex, transparent: true }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(W / 2, 0, D / 2);
    house.add(floor);

    const redraw = (labels: Record<RoomKey, string>) => {
      drawFloor(floorCanvas, labels, decimalRef.current);
      floorTex.needsUpdate = true;
      kickRef.current();
    };
    redrawRef.current = redraw;
    redraw(roomLabels);
    document.fonts?.ready.then(() => redraw(roomLabelsRef.current));

    // Walls and furniture share one group so they rise together
    const extrude = new THREE.Group();
    house.add(extrude);
    const sideMat = new THREE.MeshLambertMaterial({ color: 0xf3f1ea });
    const topMat = new THREE.MeshBasicMaterial({ color: INK });
    const edgeMat = new THREE.LineBasicMaterial({ color: INK });
    const furnMat = new THREE.MeshLambertMaterial({ color: 0xe9edf8 });
    const furnEdge = new THREE.LineBasicMaterial({ color: PEN });
    for (const w of WALLS) extrude.add(wallMesh(w, sideMat, topMat, edgeMat));
    for (const [x, z, w, d, h] of FURNITURE) {
      const geo = new THREE.BoxGeometry(w, h, d);
      geo.translate(x + w / 2, h / 2, z + d / 2);
      extrude.add(new THREE.Mesh(geo, furnMat), new THREE.LineSegments(new THREE.EdgesGeometry(geo), furnEdge));
    }

    // Camera state: spherical coordinates around the plan centre
    const view = {
      theta: 0,
      phi: modeRef.current === '3d' ? 0.72 : 0.0001,
      height: modeRef.current === '3d' ? CUTAWAY : 0.03,
      userTheta: -0.55,
      userPhi: 0.72,
      shift: modeRef.current === '3d' ? 0 : PLAN_SHIFT,
    };
    let fitRadius = 20;

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      const halfH = (D + MARGIN * 2) / 2 + PLAN_SHIFT;
      const halfW = (W + MARGIN * 2) / 2;
      const tan = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      fitRadius = (Math.max(halfH, halfW / camera.aspect) / tan) * 1.02;
      kick();
    };

    // Dragging
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let idleSince = performance.now();
    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      renderer.domElement.setPointerCapture(e.pointerId);
      kick();
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      view.userTheta -= (e.clientX - lastX) * 0.008;
      if (modeRef.current === '3d') {
        view.userPhi = THREE.MathUtils.clamp(view.userPhi - (e.clientY - lastY) * 0.006, 0.3, 1.15);
      }
      lastX = e.clientX;
      lastY = e.clientY;
      kick();
    };
    const onUp = () => {
      dragging = false;
      idleSince = performance.now();
    };
    renderer.domElement.addEventListener('pointerdown', onDown);
    renderer.domElement.addEventListener('pointermove', onMove);
    renderer.domElement.addEventListener('pointerup', onUp);
    renderer.domElement.addEventListener('pointercancel', onUp);

    // Render loop runs only while visible and something is moving
    let raf = 0;
    let visible = true;
    const step = () => {
      raf = 0;
      const is3d = modeRef.current === '3d';
      const ease = reduceMotion ? 1 : 0.07;
      if (is3d && !dragging && !reduceMotion && performance.now() - idleSince > 2500) {
        view.userTheta += 0.0016;
      }
      const targetTheta = is3d ? view.userTheta : Math.round(view.userTheta / (Math.PI * 2)) * Math.PI * 2;
      const targetPhi = is3d ? view.userPhi : 0.0001;
      const targetHeight = is3d ? CUTAWAY : 0.03;
      view.theta += (targetTheta - view.theta) * ease;
      view.phi += (targetPhi - view.phi) * ease;
      view.height += (targetHeight - view.height) * ease;
      view.shift += ((is3d ? 0 : PLAN_SHIFT) - view.shift) * ease;
      if (!is3d) view.userTheta = view.theta;

      extrude.scale.y = view.height;
      const r = fitRadius * (is3d ? 1.05 : 1);
      camera.position.set(
        r * Math.sin(view.phi) * Math.sin(view.theta),
        r * Math.cos(view.phi),
        r * Math.sin(view.phi) * Math.cos(view.theta) + view.shift,
      );
      camera.up.set(-Math.sin(view.theta), 0, -Math.cos(view.theta)).lerp(new THREE.Vector3(0, 1, 0), Math.min(1, view.phi / 0.3));
      camera.lookAt(0, 0.6 * view.height, view.shift);
      renderer.render(scene, camera);

      const settled =
        Math.abs(targetTheta - view.theta) < 1e-4 &&
        Math.abs(targetPhi - view.phi) < 1e-4 &&
        Math.abs(targetHeight - view.height) < 1e-4;
      const autoRotating = is3d && !reduceMotion;
      if (visible && (dragging || !settled || autoRotating)) raf = requestAnimationFrame(step);
    };
    const kick = () => {
      if (!raf && visible) raf = requestAnimationFrame(step);
    };
    kickRef.current = kick;

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    });
    io.observe(mount);
    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    resize();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      kickRef.current = () => {};
      redrawRef.current = null;
      renderer.domElement.removeEventListener('pointerdown', onDown);
      renderer.domElement.removeEventListener('pointermove', onMove);
      renderer.domElement.removeEventListener('pointerup', onUp);
      renderer.domElement.removeEventListener('pointercancel', onUp);
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.LineSegments) obj.geometry.dispose();
      });
      [sideMat, topMat, edgeMat, furnMat, furnEdge, floor.material].forEach((m) => m.dispose());
      floorTex.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
    // The scene is built once; labels and mode flow in through refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={mountRef} role="img" aria-label={ariaLabel} className="absolute inset-0 cursor-grab active:cursor-grabbing" />;
};

export type { RoomKey };
