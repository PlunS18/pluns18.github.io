import React, { useState } from 'react';
import { ThreeRoomViewer } from './ThreeRoomViewer';
import { ExternalLink, Smartphone, Globe, Cpu, CheckCircle2, Layers, Sparkles, Box, Code2 } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'mobile' | 'web' | '3d'>('all');

  return (
    <section id="projects" className="py-20 relative">
      <div className="container-max">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="neon-badge mb-2">
              <Box className="w-3.5 h-3.5" />
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
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setActiveTab('mobile')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'mobile'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Mobile Apps
            </button>
            <button
              onClick={() => setActiveTab('web')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'web'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Web Platforms
            </button>
            <button
              onClick={() => setActiveTab('3d')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
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
            PROJECT 1: FLAGSHIP HOMECHECK ECOSYSTEM
            ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'mobile' || activeTab === 'web') && (
          <div className="spotlight-card p-6 md:p-8 mb-10 border-cyan-500/30 bg-slate-900/60 shadow-2xl">
            {/* Project Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border border-cyan-500/40 p-1 bg-slate-950 flex-shrink-0 shadow-lg shadow-cyan-500/20">
                  <img
                    src="/assets/logo-homecheck.png"
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
                  <p className="text-xs text-cyan-400 font-semibold">
                    Core Mobile &amp; Web Developer • Web Media (04/2024 - Hiện tại)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <a
                  href="https://myhomecheck.ai/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition-all hover:scale-105"
                >
                  <span>Truy cập myhomecheck.ai</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Description & Tech Highlights */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
              
              {/* Left Column: Technical Achievements */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  HomeCheck là giải pháp công nghệ toàn diện cho kỹ sư và chủ nhà nhằm khảo sát, thẩm định hiện trạng công trình, dựng mặt bằng 2D/3D tương tác và ứng dụng Generative AI thiết kế lại không gian sống.
                </p>

                <div className="space-y-3 mt-1">
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 flex-shrink-0 h-fit">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-white">
                        Kiến trúc Mobile App Offline-First (React Native, TypeScript)
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                        Lưu trữ toàn bộ dữ liệu khảo sát và bản vẽ ngay cả khi mất sóng hoàn toàn (SQLite/MMKV). Tự động kích hoạt Sync Engine 2 chiều xử lý conflict thông minh khi có mạng trở lại.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex gap-3">
                    <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 flex-shrink-0 h-fit">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-white">
                        Tối ưu 60FPS &amp; Khắc phục tràn RAM (OOM)
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                        Xử lý các mô hình LIDAR nặng sang Web Worker luồng nền, thu hồi bộ nhớ (dispose materials) khi chuyển phòng. Sử dụng React Native Reanimated (Worklets) để phản hồi cảm ứng mượt mà.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 flex-shrink-0 h-fit">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-white">
                        Hệ thống Bất đồng bộ Generative AI Redesign
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                        Backend NestJS tích hợp BullMQ + Redis xếp hàng xử lý các tác vụ AI sinh ảnh không gian nội thất, trả phản hồi tức thì cho Mobile và bắn Push Notification (FCM) khi xong.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tech Pills */}
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
                      className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-[11px] font-semibold border border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Visual Mockup Showcase */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-950 p-1 group">
                    <img
                      src="/assets/man-trang-chu-app.Br1F0Hab_Z2J0q8.webp"
                      alt="HomeCheck Mobile UI"
                      className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="p-2 text-center text-[10px] font-semibold text-slate-300">
                      Giao diện Mobile App
                    </div>
                  </div>

                  <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-950 p-1 group">
                    <img
                      src="/assets/man-do-dac-ve-tinh.B-04KL-2_Z1H4mNW.webp"
                      alt="Satellite Map"
                      className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="p-2 text-center text-[10px] font-semibold text-slate-300">
                      Đo đạc Vệ tinh Hiện trường
                    </div>
                  </div>
                </div>

                <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-950 p-1 group">
                  <img
                    src="/assets/tk-3d.CYdajQ7S_1GYWpb.webp"
                    alt="3D Room Viewer"
                    className="w-full h-32 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-2 flex items-center justify-between text-[10px] font-semibold text-slate-300">
                    <span>Mô hình 3D WebGL</span>
                    <span className="text-cyan-400 font-mono">Three.js 60FPS</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            INTERACTIVE 3D ENGINE SHOWCASE
            ========================================================================= */}
        {(activeTab === 'all' || activeTab === '3d') && (
          <div id="three-engine" className="mb-12">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-heading font-extrabold text-xl text-white flex items-center gap-2">
                  <span>Interactive 3D Architectural Engine (Live Demo)</span>
                  <span className="neon-badge">Three.js WebGL</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Thử nghiệm tương tác trực tiếp với bộ render không gian 3D và bản vẽ CAD kiến trúc được tối ưu cho trình duyệt.
                </p>
              </div>
            </div>
            <ThreeRoomViewer />
          </div>
        )}

        {/* =========================================================================
            PROJECT 2 & 3: GRID
            ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* PROJECT 2: THẦY AI */}
          {(activeTab === 'all' || activeTab === 'mobile') && (
            <div className="spotlight-card p-6 flex flex-col justify-between border-amber-500/20 bg-slate-900/50">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center font-heading font-black text-white text-base shadow-lg shadow-amber-500/20">
                      AI
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-base text-white">
                        Ứng dụng Giáo dục &amp; Quản trị Gia Phả "Thầy AI"
                      </h4>
                      <p className="text-[11px] text-amber-400 font-medium">
                        Mobile Developer (React Native) • TGMSS (09/2023 - 04/2024)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="neon-badge live">App Store &amp; Google Play</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                    React Native • Redux
                  </span>
                </div>

                <p className="text-slate-300 text-xs leading-relaxed mb-4">
                  Ứng dụng di động cung cấp công cụ tra cứu giáo dục và quản lý phả hệ dòng họ nhiều thế hệ. Đảm nhiệm toàn bộ vòng đời phát triển từ đặc tả yêu cầu, thiết kế kiến trúc đến phát hành lên hai kho ứng dụng.
                </p>

                <ul className="space-y-2 text-xs text-slate-300 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Giải thuật Cây Gia Phả đệ quy:</strong> Tự tay thiết kế thuật toán phân nhánh cây nhiều tầng trên infinite canvas, tính toán tọa độ nút và đường nối mượt mà.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Xử lý Gesture đa điểm 60FPS:</strong> Tối ưu thao tác Pan, Pinch to Zoom bằng <code>react-native-gesture-handler</code> và <code>reanimated</code> không giật lag.</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800">
                {['React Native', 'TypeScript', 'Gesture Handler', 'Reanimated', 'Redux', 'SDLC'].map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* PROJECT 3: WEB MEDIA STUDIO */}
          {(activeTab === 'all' || activeTab === 'web') && (
            <div className="spotlight-card p-6 flex flex-col justify-between border-blue-500/20 bg-slate-900/50">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center font-heading font-black text-white text-base shadow-lg shadow-blue-500/20">
                      WM
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-base text-white">
                        Web Media Studio — Nền tảng Quản trị SaaS
                      </h4>
                      <p className="text-[11px] text-blue-400 font-medium">
                        Frontend / Fullstack Developer • Web Media
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="neon-badge">SaaS Enterprise</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                    Next.js 14 • Tailwind CSS
                  </span>
                </div>

                <p className="text-slate-300 text-xs leading-relaxed mb-4">
                  Hệ thống Web App phục vụ quản trị chiến dịch tiếp thị số, tạo video tự động bằng AI và giám sát số liệu SEO thời gian thực với trải nghiệm người dùng cao cấp.
                </p>

                <ul className="space-y-2 text-xs text-slate-300 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Dynamic Schema-Driven Forms:</strong> Tự động sinh form theo JSON Schema, validate ngữ nghĩa dữ liệu tại Client và Edge.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span><strong>High-Performance UI Dashboard:</strong> Ứng dụng Server Components và caching của Next.js 14 để tối ưu thời gian tải trang dưới 1.2s.</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800">
                {['Next.js 14', 'React', 'TypeScript', 'Tailwind CSS', 'Dynamic Forms', 'RESTful API'].map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono">
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
