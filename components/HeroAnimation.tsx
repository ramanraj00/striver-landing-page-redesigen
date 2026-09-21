"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Clock, Calendar, BarChart2, CheckCircle2, ArrowRight } from "lucide-react";

const Row = ({ icon, label, value, step, delay }: { icon: React.ReactNode, label: string, value: string, step: number, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 10 }}
    transition={{ duration: 0.4, delay: step >= 1 ? delay : 0, ease: "easeOut" }}
    className="flex items-center justify-between text-[15px] py-1.5"
  >
    <div className="flex items-center gap-5 text-white/80">
      <div className="w-[18px] h-[18px] text-white/50">{icon}</div>
      <span className="font-semibold tracking-wide">{label}</span>
    </div>
    <span className="text-white font-bold tracking-wide">{value}</span>
  </motion.div>
);

const TaskRow = ({ label, time, shouldStrike = false, strikeDelay = 0, step = 0, delay = 0 }: { label: string, time: string, shouldStrike?: boolean, strikeDelay?: number, step?: number, delay?: number }) => {
  const isCompletePhase = shouldStrike && step >= 4;
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: step >= 3 ? 1 : 0, x: step >= 3 ? 0 : -10 }}
      transition={{ duration: 0.4, delay: step >= 3 ? delay : 0, ease: "easeOut" }}
      className="flex items-center justify-between relative group py-0.5"
    >
      <div className="flex items-center gap-5">
        <motion.div
          animate={{ color: isCompletePhase ? "#60A5FA" : "rgba(255,255,255,0.5)" }}
          transition={{ duration: 0.3, delay: isCompletePhase ? strikeDelay : 0 }}
        >
          <CheckCircle2 className="w-[18px] h-[18px] fill-current opacity-90" />
        </motion.div>
        <motion.span
          animate={{ color: isCompletePhase ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.95)" }}
          transition={{ duration: 0.3, delay: isCompletePhase ? strikeDelay : 0 }}
          className="text-[15px] font-semibold relative tracking-wide"
        >
          {label}
          {/* Strikethrough line */}
          {shouldStrike && (
            <motion.div
              className="absolute left-0 top-1/2 w-full h-[1.5px] bg-white/40 -translate-y-1/2 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isCompletePhase ? 1 : 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: isCompletePhase ? strikeDelay : 0 }}
            />
          )}
        </motion.span>
      </div>
      <motion.span
        animate={{ color: isCompletePhase ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.7)" }}
        transition={{ duration: 0.3, delay: isCompletePhase ? strikeDelay : 0 }}
        className="text-[14px] font-bold tracking-wide"
      >
        {time}
      </motion.span>
    </motion.div>
  );
};

export default function HeroAnimation() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const runSequence = async () => {
      while (isMounted) {
        setStep(0);
        await new Promise((r) => setTimeout(r, 800));
        if (!isMounted) break;
        setStep(1); // Card 1 up
        await new Promise((r) => setTimeout(r, 800));
        if (!isMounted) break;
        setStep(2); // Progress fill
        await new Promise((r) => setTimeout(r, 2400));
        if (!isMounted) break;
        setStep(3); // Card 2 up
        await new Promise((r) => setTimeout(r, 1000));
        if (!isMounted) break;
        setStep(4); // Task strike
        await new Promise((r) => setTimeout(r, 4500));
      }
    };
    runSequence();
    return () => {
      isMounted = false;
    };
  }, []);

  const springConfig = { type: "spring", stiffness: 70, damping: 14 };
  const smoothTransition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] };

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center -translate-y-6 antialiased" style={{ perspective: "1500px" }}>
      
      {/* Blueprint Grid Background */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      />

      {/* 3D Isometric Scene (Static Forward-Facing Tilt) */}
      <motion.div
        style={{ transformStyle: "preserve-3d" }}
        initial={{ rotateX: 20, rotateY: -20, rotateZ: 5 }}
        animate={{ rotateX: 20, rotateY: -20, rotateZ: 5 }}
        className="relative w-[460px] h-[470px]"
      >
        
        {/* Layer 0: Base Shell */}
        <motion.div
          initial={{ z: 0 }}
          className="absolute inset-0 bg-[#0B0E14] rounded-[40px] p-9 border-[1.5px] border-white/10 shadow-[-15px_25px_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
        >
          {/* Blue Highlight Glow for the header area */}
          <div className="absolute -top-20 -left-10 w-[350px] h-[300px] bg-blue-600/20 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-[160px] bg-gradient-to-b from-[#4F84F6]/10 to-transparent pointer-events-none" />

          <div className="flex-shrink-0 relative z-10">
            <h3 className="text-4xl font-extrabold text-white mb-2.5 tracking-wide drop-shadow-lg">Planly</h3>
            <p className="text-white/90 text-[16px] leading-relaxed max-w-[95%] font-semibold drop-shadow-md">
              Know exactly what you have to do each day. Planned.
            </p>
          </div>
        </motion.div>

        {/* Layer 1: Inner Card 1 (Progress) */}
        <motion.div
          initial={{ z: 0, y: 10, opacity: 0, x: 0, scale: 0.9, height: 300 }}
          animate={{ 
            z: step >= 3 ? 30 : (step >= 1 ? 40 : 0), 
            y: step >= 3 ? 0 : (step >= 1 ? 0 : 10),
            x: step >= 3 ? 12 : 0,
            height: step >= 3 ? 280 : 300,
            opacity: step >= 1 ? 1 : 0,
            scale: 1
          }}
          transition={smoothTransition}
          className="absolute left-12 right-5 bottom-0 bg-gradient-to-br from-[#192030] to-[#121622] rounded-[30px] p-8 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),-10px_20px_40px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 10 }}
            transition={{ duration: 0.4, delay: step >= 1 ? 0.3 : 0, ease: "easeOut" }}
            className="inline-flex px-4 py-1.5 bg-white/10 border border-white/10 rounded-md text-xs font-bold text-white mb-6 w-max shadow-sm backdrop-blur-sm"
          >
            Progress
          </motion.div>
          <div className="space-y-4">
            <Row icon={<BookOpen />} label="Topics" value="12 / 24" step={step} delay={0.4} />
            <Row icon={<Clock />} label="Time spent" value="45 min" step={step} delay={0.5} />
            <Row icon={<Calendar />} label="Last active" value="Today" step={step} delay={0.6} />
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 10 }}
              transition={{ duration: 0.4, delay: step >= 1 ? 0.7 : 0, ease: "easeOut" }}
              className="flex items-center justify-between text-[14px] pt-4"
            >
              <div className="flex items-center gap-5 text-white/80">
                <BarChart2 className="w-[18px] h-[18px] text-white/50" />
                <span className="font-semibold tracking-wide">Progress</span>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-20 h-[6px] bg-black/40 shadow-inner rounded-full overflow-hidden relative">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-300 rounded-full relative"
                    initial={{ width: "0%" }}
                    animate={{ width: step >= 2 ? "38%" : "0%" }}
                    transition={springConfig}
                  >
                    {/* Glowing tip on the progress bar */}
                    <div className="absolute right-0 top-0 bottom-0 w-3 bg-white/60 blur-[1px] rounded-r-full" />
                  </motion.div>
                </div>
                <span className="text-white font-extrabold text-[14px]">38 %</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Layer 2: Inner Card 2 (Tasks) Overlapping */}
        <motion.div
          initial={{ z: 60, y: 10, opacity: 0, x: 0, scale: 0.9 }}
          animate={{ 
            z: 60, 
            y: step >= 3 ? 0 : 10, 
            opacity: step >= 3 ? 1 : 0,
            x: 0,
            scale: 1
          }}
          transition={smoothTransition}
          className="absolute left-12 right-5 bottom-0 h-[300px] bg-gradient-to-br from-[#1F273A] to-[#161B2B] rounded-[30px] p-8 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),-15px_30px_50px_rgba(0,0,0,0.7)]"
        >
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 10 }}
            transition={{ duration: 0.4, delay: step >= 3 ? 0.3 : 0, ease: "easeOut" }}
            className="flex justify-between items-center mb-6"
          >
            <div className="flex items-center gap-4">
              <span className="px-4 py-1.5 bg-white/10 border border-white/10 rounded-md text-xs font-bold text-white shadow-sm backdrop-blur-sm">
                Today's task
              </span>
              <span className="text-xs text-white/70 font-bold">1 / 10</span>
            </div>
            <div className="text-xs text-blue-400 font-bold flex items-center gap-1.5 cursor-pointer group hover:text-blue-300 transition-colors">
              View all <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </motion.div>

          <div className="space-y-4">
            <TaskRow label="Solve DSA problems" time="20 min" shouldStrike={true} strikeDelay={0} step={step} delay={0.4} />
            <TaskRow label="Revise LLD" time="30 min" shouldStrike={true} strikeDelay={0.5} step={step} delay={0.5} />
            <TaskRow label="OOPS practice" time="45 min" shouldStrike={true} strikeDelay={1.0} step={step} delay={0.6} />
            <TaskRow label="Graph BFS practice" time="35 min" shouldStrike={false} step={step} delay={0.7} />
          </div>
        </motion.div>
        
      </motion.div>
    </div>
  );
}
