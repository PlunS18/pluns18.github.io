import React, { useState } from 'react';
import { ThreeRoomViewer } from './ThreeRoomViewer';
import { ExternalLink, Smartphone, Globe, Cpu, CheckCircle2, Layers, Sparkles, Box, Code2, ArrowUpRight } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'mobile' | 'web' | '3d'>('all');

  // React Bits 3D Tilt Card Effect Handler
  const handleTiltMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.008, 1.008, 1.008)`;
  };

  const handleTiltLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="container-max">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="neon-badge mb-2">
              <Box className="w-3.5 h-3.5 text-cyan-400" />
              <span>Sản phẩm Thực tế đã Triển khai</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-white">
              Dự án Tiêu biểu &amp; Kiến trúc Lõi
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mt-1">
              Các hệ thống thực chiến giải quyết bài toán tải lớn, tối ưu hóa bộ nhớ di động và trải nghiệm không gian 3D mượt mà 60FPS.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 self-start md:self-auto overflow-x-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setActiveTab('mobile')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'mobile'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Mobile Apps
            </button>
            <button
              onClick={() => setActiveTab('web')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'web'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Web Platforms
            </button>
            <button
              onClick={() => setActiveTab('3d')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === '3d'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              3D Three.js
            </button>
          </div>
        </div>

        {/* =========================================================================
            PROJECT 1: FLAGSHIP HOMECHECK ECOSYSTEM (HIGH-RES WEB ASSETS)
            ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'mobile' || activeTab === 'web') && (
          <div
            onMouseMove={handleTiltMove}
            onMouseLeave={handleTiltLeave}
            className="spotlight-card p-6 md:p-8 mb-10 border-cyan-500/30 bg-slate-900/60 shadow-2xl transition-transform duration-200 ease-out"
          >
            {/* Project Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border border-cyan-500/40 p-1 bg-slate-950 flex-shrink-0 shadow-lg shadow-cyan-500/20">
                  <img
                    src="./assets/logo-homecheck.png"
                    alt="HomeCheck Logo"
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-heading font-black text-xl md:text-2xl text-white">
                      HomeCheck Ecosystem
                    </h3>
                    <span className="neon-badge live">Production Live</span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono">
                      iOS • Android • Web
                    </span>
                  </div>
                  <p className="text-xs text-cyan-400 font-medium">
                    Core Mobile &amp; Web Developer • Web Media (04/2024 – Hiện tại)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="https://myhomecheck.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-slate-950/80 hover:bg-cyan-950/50 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 text-xs font-bold flex items-center gap-2 transition-all shadow-md group"
                >
                  <span>Truy cập myhomecheck.ai</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Project Description & Architecture Details */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-start">
              
              {/* Left Column: Architectural Bullets */}
              <div className="lg:col-span-7 space-y-4">
                <p className="text-slate-300 text-sm leading-relaxed">
                  HomeCheck là giải pháp công nghệ toàn diện cho kỹ sư và chủ nhà nhằm khảo sát, thẩm định hiện trạng công trình, dựng mặt bằng 2D/3D tương tác và ứng dụng Generative AI thiết kế lại không gian sống.
                </p>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/30 transition-all">
                    <div className="flex items-start gap-2.5">
                      <div className="p-1 rounded bg-cyan-500/10 text-cyan-400 mt-0.5">
                        <Smartphone className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-white">Kiến trúc Mobile App Offline-First (React Native, TypeScript)</div>
                        <p className="text-xs text-slate-400 mt-1">
                          Lưu trữ toàn bộ dữ liệu khảo sát và bản vẽ ngay cả khi mất sóng hoàn toàn (SQLite/MMKV). Tự động kích hoạt Sync Engine 2 chiều xử lý conflict thông minh khi có mạng trở lại.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/30 transition-all">
                    <div className="flex items-start gap-2.5">
                      <div className="p-1 rounded bg-cyan-500/10 text-cyan-400 mt-0.5">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-white">Tối ưu 60FPS &amp; Khắc phục tràn RAM (OOM)</div>
                        <p className="text-xs text-slate-400 mt-1">
                          Xử lý các mô hình LiDAR nặng sang Web Worker luồng nền, thu hồi bộ nhớ (dispose materials) khi chuyển phòng. Sử dụng React Native Reanimated (Worklets) để phản hồi cảm ứng mượt mà.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/30 transition-all">
                    <div className="flex items-start gap-2.5">
                      <div className="p-1 rounded bg-cyan-500/10 text-cyan-400 mt-0.5">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-white">Hệ thống Bất đồng bộ Generative AI Redesign</div>
                        <p className="text-xs text-slate-400 mt-1">
                          Backend NestJS tích hợp BullMQ + Redis xếp hàng xử lý các tác vụ AI sinh ảnh không gian nội thất, trả phản hồi tức thì cho Mobile và bắn Push Notification (FCM) khi xong.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {[
                    'React Native',
                    'Expo',
                    'TypeScript',
                    'Next.js 14',
                    'Three.js',
                    'Zustand',
                    'NestJS',
                    'BullMQ',
                    'Redis',
                    'PostgreSQL',
                    'CodePush (OTA)'
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 text-[11px] font-semibold border border-slate-700/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: High-Res Official Web Asset Showcase */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 p-1 group hover:border-cyan-500/50 transition-all shadow-lg">
                    <div className="h-52 overflow-hidden rounded-xl bg-slate-900 flex items-center justify-center">
                      <img
                        src="./assets/hc_web_hero_design.webp"
                        alt="Kiến trúc sư trưởng Agentic AI"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-2 text-center">
                      <div className="text-[11px] font-bold text-slate-200">Kiến trúc sư trưởng AI</div>
                      <div className="text-[10px] text-cyan-400 font-mono">One Sentence One Home</div>
                    </div>
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 p-1 group hover:border-cyan-500/50 transition-all shadow-lg">
                    <div className="h-52 overflow-hidden rounded-xl bg-slate-900 flex items-center justify-center">
                      <img
                        src="./assets/hc_web_satellite_measure.webp"
                        alt="Đo đạc Vệ tinh Hiện trường"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-2 text-center">
                      <div className="text-[11px] font-bold text-slate-200">Đo đạc Vệ tinh Hiện trường</div>
                      <div className="text-[10px] text-cyan-400 font-mono">La Kinh • Sơn Hướng</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 p-1 group hover:border-cyan-500/50 transition-all shadow-lg">
                    <div className="h-32 overflow-hidden rounded-xl bg-slate-900 flex items-center justify-center">
                      <img
                        src="./assets/hc_web_cad_digitize.webp"
                        alt="Số hoá bản vẽ & Dựng CAD"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-1.5 text-center">
                      <div className="text-[10px] font-bold text-slate-200">Số hoá CAD 2D/3D</div>
                      <div className="text-[9px] text-cyan-400 font-mono">Laser Bluetooth</div>
                    </div>
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 p-1 group hover:border-cyan-500/50 transition-all shadow-lg">
                    <div className="h-32 overflow-hidden rounded-xl bg-slate-900 flex items-center justify-center">
                      <img
                        src="./assets/hc_web_fengshui_analysis.webp"
                        alt="Thẩm định Phong thuỷ 24 Sơn Hướng"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-1.5 text-center">
                      <div className="text-[10px] font-bold text-slate-200">Phong thuỷ 24 Sơn</div>
                      <div className="text-[9px] text-amber-400 font-mono">Bát Trạch • Phi Tinh</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            INTERACTIVE 3D ENGINE SHOWCASE (THREE.JS VILLA ARCHITECTURE)
            ========================================================================= */}
        {(activeTab === 'all' || activeTab === '3d') && (
          <div id="three-engine" className="mb-10">
            <ThreeRoomViewer />
          </div>
        )}

        {/* =========================================================================
            PROJECT 2 & 3: THẦY AI & WEB MEDIA STUDIO SAAS
            ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(activeTab === 'all' || activeTab === 'mobile') && (
            <div
              onMouseMove={handleTiltMove}
              onMouseLeave={handleTiltLeave}
              className="spotlight-card p-6 border-slate-800 bg-slate-900/50 flex flex-col justify-between transition-transform duration-200 ease-out"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm border border-amber-500/30">
                    AI
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                      App Store &amp; Google Play
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                      React Native • Redux
                    </span>
                  </div>
                </div>

                <h4 className="font-heading font-black text-lg text-white mb-1">
                  Ứng dụng Giáo dục &amp; Quản trị Gia Phả "Thầy AI"
                </h4>
                <p className="text-xs text-slate-400 mb-4">
                  Mobile Developer (React Native) • TGMSS (09/2023 – 04/2024)
                </p>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Ứng dụng di động cung cấp công cụ tra cứu giáo dục và quản lý phả hệ dòng họ nhiều thế hệ. Đảm nhiệm toàn bộ vòng đời phát triển từ đặc tả yêu cầu, thiết kế kiến trúc đến phát hành lên hai kho ứng dụng.
                </p>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Giải thuật Cây Gia Phả đệ quy:</strong> Tự tay thiết kế thuật toán phân nhánh cây nhiều tầng trên infinite canvas, tính toán tọa độ nút và đường nối mượt mà.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Xử lý Gesture đa điểm 60FPS:</strong> Tối ưu thao tác Pan, Pinch to Zoom bằng react-native-gesture-handler và reanimated không giật lag.</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 mt-4 border-t border-slate-800/80">
                {['React Native', 'TypeScript', 'Gesture Handler', 'Reanimated', 'Redux', 'SDLC'].map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800 font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {(activeTab === 'all' || activeTab === 'web') && (
            <div
              onMouseMove={handleTiltMove}
              onMouseLeave={handleTiltLeave}
              className="spotlight-card p-6 border-slate-800 bg-slate-900/50 flex flex-col justify-between transition-transform duration-200 ease-out"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm border border-blue-500/30">
                    WM
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono">
                      SaaS Enterprise
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                      Next.js 14 • Tailwind CSS
                    </span>
                  </div>
                </div>

                <h4 className="font-heading font-black text-lg text-white mb-1">
                  Web Media Studio — Nền tảng Quản trị SaaS
                </h4>
                <p className="text-xs text-slate-400 mb-4">
                  Frontend / Fullstack Developer • Web Media
                </p>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Hệ thống Web App phục vụ quản trị chiến dịch tiếp thị số, tạo video tự động bằng AI và giám sát số liệu SEO thời gian thực với trải nghiệm người dùng cao cấp.
                </p>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Dynamic Schema-Driven Forms:</strong> Tự động sinh form theo JSON Schema, validate ngữ nghĩa dữ liệu tại Client và Edge.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span><strong>High-Performance UI Dashboard:</strong> Ứng dụng Server Components và caching của Next.js 14 để tối ưu thời gian tải trang dưới 1.2s.</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 mt-4 border-t border-slate-800/80">
                {['Next.js 14', 'React', 'TypeScript', 'Tailwind CSS', 'Dynamic Forms', 'RESTful API'].map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800 font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
