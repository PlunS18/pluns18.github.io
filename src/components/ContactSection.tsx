import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Phone, Mail, MapPin, Download, Check, Sparkles } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export const ContactSection: React.FC = () => {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { t, language } = useLanguage();

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('0888244212');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hoangphucplun@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleDownload = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.7 }
    });
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="container-max">
        <div className="glass-panel p-8 md:p-12 border-cyan-500/30 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/60 shadow-2xl relative overflow-hidden">
          
          {/* Background Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Heading & Availability */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div>
                <div className="neon-badge live mb-3">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>{t.contact.badge}</span>
                </div>
                <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-white">
                  {t.contact.title}
                </h2>
                <p className="text-slate-300 text-sm mt-3 leading-relaxed max-w-lg">
                  {t.contact.desc}
                </p>
              </div>

              {/* Contact Direct Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Phone */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-400">{t.contact.phoneLabel}</div>
                      <a href="tel:0888244212" className="font-bold text-xs text-white hover:text-cyan-400">
                        0888 244 212
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyPhone}
                    className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title={t.contact.copied}
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <span className="text-[10px] font-mono">{language === 'vi' ? 'Chép' : 'Copy'}</span>}
                  </button>
                </div>

                {/* Email */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-400">{t.contact.emailLabel}</div>
                      <a href="mailto:hoangphucplun@gmail.com" className="font-bold text-xs text-white hover:text-blue-400">
                        hoangphucplun@gmail.com
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title={t.contact.copied}
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <span className="text-[10px] font-mono">{language === 'vi' ? 'Chép' : 'Copy'}</span>}
                  </button>
                </div>

                {/* LinkedIn */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.38 10.24V10.63H5.08v8.37h2.76z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-400">LinkedIn Profile</div>
                      <a
                        href="https://linkedin.com/in/phuc-luu"
                        target="_blank"
                        rel="noreferrer"
                        className="font-bold text-xs text-white hover:text-indigo-400"
                      >
                        Trương Hoàng Phúc Lưu
                      </a>
                    </div>
                  </div>
                  <span className="text-[10px] text-indigo-400 font-mono">Active</span>
                </div>

                {/* Location */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400">{t.contact.locationLabel}</div>
                    <div className="font-bold text-xs text-white">{t.contact.locationValue}</div>
                  </div>
                </div>

              </div>

            </div>

            {/* Right Column: PDF Download Hub */}
            <div className="lg:col-span-5 flex flex-col gap-4 bg-slate-950/80 p-6 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <h3 className="font-heading font-bold text-base text-white">
                  {language === 'vi' ? 'Tải Hồ sơ Năng lực (PDFs)' : 'Download Resumes & Portfolio (PDFs)'}
                </h3>
              </div>
              <p className="text-xs text-slate-400 leading-normal mb-2">
                {language === 'vi'
                  ? 'Hồ sơ đã được tối ưu hóa lossless dưới 2MB, định dạng chuẩn quốc tế sẵn sàng nộp hoặc in ấn.'
                  : 'Lossless compressed under 2MB, internationally formatted and ready for submission or print.'}
              </p>

              {/* Button 1: Developer Portfolio PDF */}
              <a
                href="./Luu_Truong_Hoang_Phuc_Portfolio.pdf"
                download="Luu_Truong_Hoang_Phuc_Portfolio.pdf"
                onClick={handleDownload}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs flex items-center justify-between shadow-xl shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Download className="w-4 h-4" />
                  <div className="text-left">
                    <div className="font-bold">
                      {language === 'vi' ? 'Portfolio Sản phẩm Thực tế (PDF)' : 'Interactive Products Portfolio (PDF)'}
                    </div>
                    <div className="text-[10px] text-cyan-100 font-normal">
                      {language === 'vi' ? 'Đầy đủ hình ảnh 3D, CAD & Mobile App • 1.66 MB' : 'Full 3D, CAD & Mobile app visuals • 1.66 MB'}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-black/30 font-mono">
                  {language === 'vi' ? 'TẢI VỀ' : 'DOWNLOAD'}
                </span>
              </a>

              {/* Button 2: Mobile & Web Engineer CV */}
              <a
                href="./Luu_Truong_Hoang_Phuc_FullStack_Engineer.pdf"
                download="Luu_Truong_Hoang_Phuc_Mobile_Web_Engineer.pdf"
                onClick={handleDownload}
                className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-700/80 font-semibold text-xs flex items-center justify-between transition-all hover:border-cyan-400/50 hover:scale-[1.02] cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Download className="w-4 h-4 text-cyan-400" />
                  <div className="text-left">
                    <div className="font-bold">
                      {language === 'vi' ? 'Bản CV Mobile & Web Developer' : 'Mobile & Web Developer Resume'}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {language === 'vi' ? 'Tiêu chuẩn nộp tuyển dụng ITviec & TopCV • 1.44 MB' : 'Standard ATS recruitment format • 1.44 MB'}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                  {language === 'vi' ? 'TẢI VỀ' : 'DOWNLOAD'}
                </span>
              </a>

              {/* Direct Zalo / Phone CTA */}
              <div className="pt-2 text-center text-[11px] text-slate-400">
                <span>{language === 'vi' ? 'Hoặc liên hệ nhanh qua Zalo: ' : 'Or quick chat via Zalo / Phone: '}</span>
                <a href="https://zalo.me/0888244212" target="_blank" rel="noreferrer" className="text-cyan-400 font-bold hover:underline">
                  0888 244 212
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
