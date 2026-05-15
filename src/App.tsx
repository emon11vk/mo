import { motion } from "motion/react";
import { 
  Play, 
  Calendar, 
  BookOpen, 
  ExternalLink, 
  Cpu, 
  Zap, 
  Target, 
  Pencil, 
  Compass, 
  Shield,
  Clock,
  Sparkles,
  ArrowRight
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

const DIGIT_HEIGHT = 120;

const DigitReel: React.FC<{ digit: string }> = ({ digit }) => {
  const isNumber = !isNaN(parseInt(digit));
  
  if (!isNumber) {
    return (
      <span 
        className="inline-flex items-center justify-center opacity-40 px-1 select-none whitespace-nowrap" 
        style={{ height: `${DIGIT_HEIGHT}px`, lineHeight: `${DIGIT_HEIGHT}px` }}
      >
        {digit}
      </span>
    );
  }

  const num = parseInt(digit);

  return (
    <span 
      className="inline-flex flex-col overflow-hidden relative select-none w-[0.6em] sm:w-[0.55em]" 
      style={{ height: `${DIGIT_HEIGHT}px`, lineHeight: `${DIGIT_HEIGHT}px` }}
    >
      <motion.span
        initial={false}
        animate={{ y: -(num * DIGIT_HEIGHT) }}
        transition={{ 
          type: "spring", 
          stiffness: 80, 
          damping: 20,
          mass: 1
        }}
        className="flex flex-col"
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span 
            key={n} 
            className="flex items-center justify-center"
            style={{ height: `${DIGIT_HEIGHT}px`, lineHeight: `${DIGIT_HEIGHT}px` }}
          >
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
};

const OdometerCounter = () => {
  const [value, setValue] = useState(50000);
  
  useEffect(() => {
    const updateValue = () => {
      setValue(prev => {
        const fluctuation = Math.floor(Math.random() * 401) - 200;
        const newValue = prev + fluctuation;
        if (newValue < 49000) return 49500;
        if (newValue > 52000) return 51500;
        return newValue;
      });
    };

    const interval = setInterval(updateValue, 3000);
    return () => clearInterval(interval);
  }, []);

  const formatted = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const digits = formatted.split("");

  return (
    <div 
      className="inline-flex items-center justify-center font-serif text-7xl sm:text-[120px] font-bold tracking-tighter text-white [font-variant-numeric:lining-nums_tabular-nums] overflow-hidden"
      style={{ 
        height: `${DIGIT_HEIGHT}px`,
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
      }}
    >
      {digits.map((d, i) => (
        <DigitReel key={`${i}`} digit={d} />
      ))}
    </div>
  );
};

const CoursePillarPoint = ({ icon: Icon, text }: { icon: any, text: string }) => (
  <div className="flex items-start gap-4 group">
    <div className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center shrink-0 group-hover:border-white/40 transition-colors bg-black/20">
      <Icon className="w-4 h-4 text-white/50" />
    </div>
    <p className="text-lg font-light leading-snug pt-1">{text}</p>
  </div>
);

const MarqueeTrack = ({ 
  images, 
  direction = "right", 
  speed = "fast" 
}: { 
  images: string[]; 
  direction?: "left" | "right"; 
  speed?: "fast" | "slow" 
}) => {
  const duration = speed === "fast" ? "40s" : "80s";
  const animationClass = direction === "right" ? "animate-scroll-right" : "animate-scroll-left";
  
  return (
    <div className="overflow-hidden py-4 w-full">
      <div 
        className={`marquee-track ${animationClass}`} 
        style={{ "--duration": duration } as React.CSSProperties}
      >
        {[...images, ...images, ...images].map((src, i) => (
          <div key={i} className="px-3 flex-shrink-0">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-[280px] h-[180px] sm:w-[350px] sm:h-[220px] rounded-2xl overflow-hidden glass shadow-2xl border border-white/10 transition-all duration-500"
            >
              <img src={src} alt="Gallery item" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Các đường dẫn ảnh
  const ftuTrack = ["ftu1.jpg", "ftu2.jpg", "ftu3.jpg", "ftu4.jpg"];
  const tutorTrack = ["thang.png", "vanh.jpg", "dats.jpg", "hais.PNG"];
  const neuTrack = ["neu1.jpg", "neu2.jpg", "neu3.jpg", "neu4.jpg"];

  const handleBeginJourney = () => {
    document.getElementById("main-cta")?.scrollIntoView({ behavior: "smooth" });
  };

  // Khai báo Link Video Mây dùng chung
  const CLOUD_VIDEO_URL = "https://res.cloudinary.com/dwawngoab/video/upload/v1778155970/_users_0fe8ab51-9f45-479d-a594-9f8b9d59b49e_generated_fabf25dc-5fed-46c3-aaed-6436c0be6417_generated_video_iqteqs.mp4";

  return (
    <div className="relative w-full min-h-screen bg-[#050505] overflow-x-hidden text-white">
      
      <main className="relative z-10">
        {/* ================= SECTION 1: HOME (HERO) ================= */}
        <section className="relative h-screen w-full flex flex-col justify-between overflow-hidden">
          {/* VIDEO BACKGROUND */}
          <div className="absolute inset-0 w-full h-full z-0">
            <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-80">
              <source src={CLOUD_VIDEO_URL} type="video/mp4" />
            </video>
            {/* Giảm lớp phủ tối: chỉ còn 20% */}
            <div className="absolute inset-0 bg-black/20 z-10" />
          </div>

          <nav className="w-full px-8 py-8 flex justify-between items-center z-50 relative">
            <div className="flex items-center gap-3">
              <div className="w-20 h-20 rounded-full border border-white/20 overflow-hidden glass bg-black/20">
                 <img src="mo.png" alt="Logo Mo" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="flex gap-8 text-sm uppercase tracking-widest font-light text-white/70">
              <a href="#" className="hover:text-white transition-colors drop-shadow-md">home</a>
              <a href="#about-us" className="hover:text-white transition-colors drop-shadow-md">about us</a>
              <a href="#overview" className="hover:text-white transition-colors drop-shadow-md">course</a>
              <a href="#journey" className="hover:text-white transition-colors drop-shadow-md">story</a>
              <a href="#socials" className="hover:text-white transition-colors drop-shadow-md">contact</a>
            </div>
          </nav>

          <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center -mt-12 px-8">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="font-serif text-[120px] sm:text-[180px] lg:text-[240px] font-bold text-glow leading-none mb-8 drop-shadow-2xl"
            >
              Mơ
            </motion.h1>
                                
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1.5 }}
              className="flex flex-col items-center"
            >
              <button 
                onClick={handleBeginJourney}
                className="group flex flex-col items-center gap-4 transition-transform hover:scale-110 active:scale-95"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-white/30 flex items-center justify-center glass bg-black/10 group-hover:border-white/60 transition-colors relative overflow-hidden backdrop-blur-sm">
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-white relative z-10 drop-shadow-lg" />
                  <div className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
                </div>
                <span className="uppercase tracking-[0.4em] font-light text-[10px] sm:text-xs text-white/80 group-hover:text-white transition-colors drop-shadow-md">
                  begin the journey
                </span>
              </button>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1.5 }}
                className="mt-12 font-serif italic text-white/90 text-lg sm:text-xl tracking-tight drop-shadow-md"
              >
                (chạm đầu phím - thả giấc mơ)
              </motion.p>
            </motion.div>
          </div>

          <div className="w-full pb-12 flex justify-center z-20 relative">
             <motion.div 
               animate={{ y: [0, 12, 0] }}
               transition={{ repeat: Infinity, duration: 2 }}
               className="w-1 h-12 bg-white/30 rounded-full shadow-lg"
             />
          </div>
        </section>

        {/* ================= SECTION 2: ABOUT US ================= */}
        <section 
          id="about-us" 
          className="relative z-30 py-32 border-y border-white/5 overflow-hidden"
        >
          {/* Lớp mờ được làm nhạt đi rất nhiều (blur-sm, đen 30%) */}
          <div className="absolute inset-0 w-full h-full z-0">
            <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-80">
              <source src={CLOUD_VIDEO_URL} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-10" />
          </div>
          
          <div className="relative z-20 px-8 flex flex-col items-center text-center mb-24">
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               className="max-w-4xl mx-auto space-y-12"
            >
                <div className="space-y-4">
                  <span className="uppercase tracking-[0.8em] text-[10px] text-white/70 block drop-shadow-md">Team Mơ</span>
                  <h2 className="font-serif text-5xl sm:text-7xl italic text-glow leading-tight text-white drop-shadow-xl">Chúng tớ là ai?</h2>
                </div>
                
                <p className="text-white text-xl sm:text-3xl font-light leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
                    Nhóm sinh viên đến từ <span className="font-serif italic border-b border-white/40">FTU</span> và <span className="font-serif italic border-b border-white/40">NEU</span> với cách dạy sáng tạo đổi mới và đi sâu vào bản chất.
                </p>
            </motion.div>
          </div>

          <div className="relative z-20 flex flex-col gap-6">
            <MarqueeTrack images={ftuTrack} direction="right" speed="fast" />
            <MarqueeTrack images={tutorTrack} direction="left" speed="slow" />
            <MarqueeTrack images={neuTrack} direction="right" speed="fast" />
          </div>
        </section>

        {/* ================= SECTION 3: COURSE OVERVIEW ================= */}
        <section 
          id="overview" 
          className="relative z-40 py-32 border-b border-white/5 overflow-hidden"
        >
          {/* Giảm độ mờ xuống blur-sm và đen 40% để chữ vẫn đọc được nhưng mây rõ hơn */}
          <div className="absolute inset-0 w-full h-full z-0">
            <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-80">
              <source src={CLOUD_VIDEO_URL} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10" />
          </div>

          <div className="max-w-7xl mx-auto px-8 relative z-20">
            <div className="text-center mb-24 space-y-6">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="font-serif text-4xl sm:text-6xl text-white tracking-tight drop-shadow-lg"
                >
                  LỘ TRÌNH ĐÀO TẠO CHUYÊN SÂU
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-white/80 text-lg sm:text-xl uppercase tracking-widest font-light drop-shadow-md"
                >
                  Mục tiêu bứt phá 1400+ SAT dành cho học sinh có nền tảng vững
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="inline-flex flex-wrap justify-center items-center gap-x-8 gap-y-4 px-8 py-3 rounded-full glass border border-white/20 mt-12 text-sm sm:text-base text-white font-light backdrop-blur-md bg-black/30 shadow-xl"
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-white/80" />
                    <span>Khai giảng: 06/06</span>
                  </div>
                  <div className="w-[1px] h-4 bg-white/20 hidden sm:block" />
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-white/80" />
                    <span>Lịch học: 20:00 - 21:30 Thứ 7 & CN</span>
                  </div>
                  <div className="w-[1px] h-4 bg-white/20 hidden sm:block" />
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-white/80" />
                    <span className="font-serif italic text-[#E8DCC4]">Đặc quyền: Tặng 05 buổi Extra Intensive (Free)</span>
                  </div>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start relative">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-10 glass p-8 sm:p-12 rounded-[40px] border border-white/10 bg-black/20 backdrop-blur-md shadow-2xl"
                >
                  <div className="flex justify-between items-end mb-4 border-b border-white/10 pb-6">
                    <h3 className="font-serif text-4xl italic text-white drop-shadow-md">Math</h3>
                    <span className="text-white/60 uppercase tracking-[0.3em] text-xs pb-1">10 buổi</span>
                  </div>
                  <div className="space-y-8 text-white drop-shadow-sm">
                    <CoursePillarPoint 
                      icon={Cpu} 
                      text="Làm chủ kiến thức nền tảng: Đi sâu vào bản chất, loại bỏ việc học vẹt công thức để xử lý linh hoạt mọi biến thể của đề bài." 
                    />
                    <CoursePillarPoint 
                      icon={Zap} 
                      text="Phản xạ tối ưu: Huấn luyện kỹ năng đọc đề và tư duy giải đề tốc độ, giúp tối ưu hóa thời gian làm bài." 
                    />
                    <CoursePillarPoint 
                      icon={Target} 
                      text="Khai thác sức mạnh Desmos: Sử dụng triệt để máy tính Desmos, vũ khí tối thượng để chiếm trọn điểm tuyệt đối." 
                    />
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-10 glass p-8 sm:p-12 rounded-[40px] border border-white/10 bg-black/20 backdrop-blur-md shadow-2xl"
                >
                  <div className="flex justify-between items-end mb-4 border-b border-white/10 pb-6">
                    <h3 className="font-serif text-4xl italic text-white drop-shadow-md">Verbal</h3>
                    <span className="text-white/60 uppercase tracking-[0.3em] text-xs pb-1">10 buổi</span>
                  </div>
                  <div className="space-y-8 text-white drop-shadow-sm">
                    <CoursePillarPoint 
                      icon={Pencil} 
                      text="Quét sạch mọi dạng bài: Từ Command of Evidence, Inference đến những phần khó nhất trong đề thi Digital SAT." 
                    />
                    <CoursePillarPoint 
                      icon={Compass} 
                      text="Tư duy hệ thống: Mổ xẻ logic từng câu để xây dựng phương pháp làm bài khoa học, áp dụng hiệu quả cho toàn bộ đề thi." 
                    />
                    <CoursePillarPoint 
                      icon={Shield} 
                      text="Chiến thuật phòng thi: Trang bị bộ bí kíp độc quyền giúp nhận diện bẫy và xử lý câu hỏi thông minh." 
                    />
                  </div>
                </motion.div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 4: SOCIALS & STATS ================= */}
        <section 
          id="socials" 
          className="relative z-30 px-8 py-48 flex flex-col items-center overflow-hidden"
        >
          {/* Lớp phủ cực nhạt để khoe mây */}
          <div className="absolute inset-0 w-full h-full z-0">
            <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-80">
              <source src={CLOUD_VIDEO_URL} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/20 z-10" />
          </div>
          
          <div className="relative z-20 max-w-6xl mx-auto text-center pointer-events-none w-full">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="mb-24 relative"
            >
              <OdometerCounter />
              <p className="uppercase tracking-[0.5em] text-white/80 text-xs sm:text-sm mt-8 drop-shadow-md">viewers across platform</p>
            </motion.div>

            <div className="flex justify-center gap-8 mb-24 pointer-events-auto relative z-10">
              {[
                { href: "https://www.threads.com/@mo.digital.sat_", img: "thread.png", alt: "Threads" },
                { href: "https://www.facebook.com/profile.php?id=61572035294391&locale=vi_VN", img: "facebook.png", alt: "Facebook" }
              ].map((soc, i) => (
                <motion.a 
                  key={i}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -8, scale: 1.05, borderColor: "rgba(255,255,255,0.6)" }}
                  className="w-20 h-20 rounded-2xl border border-white/20 glass flex items-center justify-center bg-black/20 backdrop-blur-md transition-all shadow-xl"
                >
                  <img src={soc.img} alt={soc.alt} className="w-10 h-10 opacity-90" />
                </motion.a>
              ))}
            </div>

            <div className="relative flex items-center justify-center w-full overflow-hidden h-20 pointer-events-auto border-t border-b border-white/10 bg-black/10 backdrop-blur-sm">
              <div className="flex animate-scroll-slow whitespace-nowrap min-w-full items-center gap-24">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex gap-24 opacity-50 hover:opacity-100 transition-opacity items-center">
                    <img src="facebook.png" alt="Facebook Logo" className="h-10 object-contain drop-shadow-md" />
                    <img src="thread.png" alt="Thread Logo" className="h-10 object-contain drop-shadow-md" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

{/* ==============={/* ================= SECTION 5: OUR JOURNEY (NÂNG CẤP CTA & HIGHLIGHT) ================= */}
        <section id="journey" className="relative z-40 overflow-hidden border-t border-white/5">
          <div className="absolute inset-0 w-full h-full z-0">
            <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-80">
              <source src={CLOUD_VIDEO_URL} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/50 to-transparent z-10" />
          </div>
          
          <div className="relative z-20 max-w-7xl mx-auto px-8 py-32 lg:py-48">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
                
                {/* Cột TEXT (Chiếm 3/5 width) */}
                <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1 }} className="lg:col-span-3 space-y-10">
                  <div className="space-y-4">
                    <h2 className="font-serif text-6xl sm:text-7xl italic text-glow text-white drop-shadow-xl">Our journey</h2>
                    <p className="font-serif italic text-3xl sm:text-4xl text-[#E8DCC4] font-medium tracking-wide drop-shadow-lg">
                      thành thật mà nói?
                    </p>
                  </div>
                  
                  <div className="relative max-w-2xl">
                    <motion.div initial={false} animate={{ height: isExpanded ? "auto" : "280px" }} transition={{ duration: 0.6, ease: [0.04, 0.62, 0.23, 0.98] }} className="overflow-hidden relative">
                      <div className={`space-y-8 text-white/90 font-light leading-[1.7] text-xl sm:text-2xl drop-shadow-sm ${!isExpanded ? "line-clamp-6" : ""}`}>
                        <p>Mơ không bắt đầu từ tham vọng mở một lò luyện thi. Bọn tớ bước ra từ chính phòng thi, mang theo những ấm ức quen thuộc nhất của bọn mình:</p>
                        
                        {/* Quote Box: Highlight các điểm chạm nỗi đau */}
                        <div className="border-l-4 border-[#E8DCC4]/40 pl-8 py-6 bg-white/5 rounded-r-2xl backdrop-blur-sm">
                          <p className="not-italic">
                            Là cảm giác cày nát các web luyện đề, làm mờ mắt nhưng điểm cứ lẹt đẹt mãi ở <strong className="font-bold text-[#E8DCC4]">mức 1350-1450</strong> vì không ai chỉ ra mình đang hổng ở đâu. Là những ngày <strong className="font-bold text-[#E8DCC4]">sập nguồn</strong> vì vừa gánh điểm phẩy trên trường, vừa chạy deadline ngoại khóa, tối về nhìn đống tài liệu SAT chỉ muốn <strong className="font-bold text-[#E8DCC4]">gục xuống bàn</strong>.
                          </p>
                        </div>
                        
                        <p>Mơ ra đời vì bọn tớ muốn đập tan sự bế tắc đó. Thay vì bắt cậu nhồi nhét thêm, bọn tớ chọn thức trắng để gạch xóa, chắt lọc ra một lộ trình tinh gọn nhất, đánh trúng vào chỗ sai của cậu.</p>
                        
                        <p>Hoá ra, có một trạm trú ẩn mang tên Mơ — nơi cậu không phải thức đến 3h sáng cày cuốc trong vô vọng, và không cần đánh đổi thanh xuân chỉ để nhích thêm vài chục điểm.</p>
                      </div>
                      
                      {!isExpanded && (
                        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />
                      )}
                    </motion.div>
                    
                    <button onClick={() => setIsExpanded(!isExpanded)} className="mt-8 font-serif italic text-[#E8DCC4] hover:text-white transition-all text-xl flex items-center gap-3 group drop-shadow-md">
                      <span className="border-b border-[#E8DCC4]/30 group-hover:border-white">{isExpanded ? "Thu gọn câu chuyện" : "Đọc tiếp tâm sự..."}</span>
                      <motion.span animate={{ y: isExpanded ? -3 : 3 }} transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }} className="inline-block">{isExpanded ? "↑" : "↓"}</motion.span>
                    </button>
                  </div>
                </motion.div>

                {/* Cột CTA (Chiếm 2/5 width) - NÚT BẤM SIÊU NỔI BẬT */}
                <motion.div initial={{ opacity: 0, scale: 0.9, x: 50 }} whileInView={{ opacity: 1, scale: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: 0.3, duration: 0.8, type: "spring" }} className="lg:col-span-2 flex justify-center lg:justify-end items-center">
                  
                  <motion.a 
                    id="main-cta"
                    href="https://modigitalsat.fillout.com/t/haXjfLsUFpus"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group inline-flex items-center gap-4 px-10 py-5 rounded-full bg-gradient-to-r from-[#E8DCC4] to-white text-black font-sans font-bold text-2xl lg:text-3xl shadow-[0_0_40px_rgba(232,220,196,0.6)] transition-all duration-500 hover:scale-105 hover:shadow-[0_0_60px_rgba(232,220,196,0.9)]"
                    animate={{ boxShadow: ["0 0 30px rgba(232,220,196,0.4)", "0 0 50px rgba(232,220,196,0.7)", "0 0 30px rgba(232,220,196,0.4)"] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                  >
                    <span className="relative z-10 tracking-tight">Bứt phá điểm số ngay</span>
                    <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="relative z-10">
                      <ArrowRight className="w-8 h-8 text-black" strokeWidth={3} />
                    </motion.div>

                    {/* Hiệu ứng ánh sáng chạy ngang qua nút khi hover */}
                    <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />
                  </motion.a>

                </motion.div>

              </div>
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="bg-[#020202] relative z-50 py-24 px-8 border-t border-white/10 text-center">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="font-serif text-3xl italic text-white/80">Mơ</div>
            <p className="uppercase tracking-[0.6em] text-[10px] sm:text-[11px] text-white/50 leading-relaxed max-w-xl mx-auto">
              © 2026 Mơ - Digital SAT • Ethereal Education<br/>
              Hanoi, Vietnam • Founded by Students from FTU & NEU
            </p>
          </div>
        </footer>
      </main>

      <style>{`
        @keyframes shine {
          100% {
            left: 125%;
          }
        }
        .animate-shine {
          animation: shine 1s;
        }
      `}</style>
    </div>
  );
}