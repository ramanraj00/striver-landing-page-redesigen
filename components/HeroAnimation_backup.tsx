"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Clock, Calendar, BarChart2, CheckCircle2, ArrowRight } from "lucide-react";

const Row = ({ icon, label, value, step, delay }: { icon: React.ReactNode, label: string, value: string, step: number, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 10 }}
    transition={{ duration: 0.4, delay: step >= 1 ? delay : 0, ease: "easeOut" }}
    className="flex items-center justify-between text-[14px] py-1"
  >
    <div className="flex items-center gap-5 text-[#9CA3AF]">
      <div className="w-[18px] h-[18px] text-[#717A8F]">{icon}</div>
      <span className="font-medium tracking-wide">{label}</span>
    </div>
    <span className="text-[#F3F4F6] font-semibold tracking-wide">{value}</span>
  </motion.div>
);

const TaskRow = ({ label, time, shouldStrike = false, strikeDelay = 0, step = 0, delay = 0 }: { label: string, time: string, shouldStrike?: boolean, strikeDelay?: number, step?: number, delay?: number }) => {
  const isCompletePhase = shouldStrike && step >= 4;
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: step >= 3 ? 1 : 0, x: step >= 3 ? 0 : -10 }}
      transition={{ duration: 0.4, delay: step >= 3 ? delay : 0, ease: "easeOut" }}
      className="flex items-center justify-between relative group"
    >
      <div className="flex items-center gap-5">
        <motion.div
          animate={{ color: isCompletePhase ? "#4F84F6" : "#6B7280" }}
          transition={{ duration: 0.3, delay: isCompletePhase ? strikeDelay : 0 }}
        >
          <CheckCircle2 className="w-[18px] h-[18px] fill-current opacity-90" />
        </motion.div>
        <motion.span
          animate={{ color: isCompletePhase ? "#6B7280" : "#E5E7EB" }}
          transition={{ duration: 0.3, delay: isCompletePhase ? strikeDelay : 0 }}
          className="text-[14px] font-medium relative tracking-wide"
        >
          {label}
          {/* Strikethrough line */}
          {shouldStrike && (
            <motion.div
              className="absolute left-0 top-1/2 w-full h-[1.5px] bg-[#6B7280] -translate-y-1/2 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isCompletePhase ? 1 : 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: isCompletePhase ? strikeDelay : 0 }}
            />
          )}
        </motion.span>
      </div>
      <motion.span
        animate={{ color: isCompletePhase ? "#4B5563" : "#9CA3AF" }}
        transition={{ duration: 0.3, delay: isCompletePhase ? strikeDelay : 0 }}
        className="text-[13px] font-semibold"
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
    <div className="relative w-full h-[600px] flex items-center justify-center -translate-y-6" style={{ perspective: "1500px" }}>
      
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
          className="absolute inset-0 bg-[#0B0E14] rounded-[40px] p-9 border-[1.5px] border-white/10 shadow-[-15px_25px_50px_rgba(0,0,0,0.8)] flex flex-col"
        >
          <div className="flex-shrink-0 relative z-10">
            <h3 className="text-3xl font-bold text-white mb-3 tracking-wider">Planly</h3>
            <p className="text-[#9CA3AF] text-[15px] leading-relaxed max-w-[90%] font-medium">
              Know exactly what you have to do each day. Planned.
            </p>
          </div>
        </motion.div>

        {/* Layer 1: Inner Card 1 (Progress) */}
        <motion.div
          initial={{ z: 0, y: 10, opacity: 0, x: 0, scale: 0.9 }}
          animate={{ 
            z: step >= 3 ? 30 : (step >= 1 ? 40 : 0), 
            y: step >= 3 ? 6 : (step >= 1 ? 0 : 10),
            x: step >= 3 ? 12 : 0,
            opacity: step >= 1 ? 1 : 0,
            scale: 1
          }}
          transition={smoothTransition}
          className="absolute left-12 right-5 bottom-0 h-[300px] bg-gradient-to-br from-[#192030] to-[#121622] rounded-[30px] p-8 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),-10px_20px_40px_rgba(0,0,0,0.6)] flex flex-col"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 10 }}
            transition={{ duration: 0.4, delay: step >= 1 ? 0.3 : 0, ease: "easeOut" }}
            className="inline-flex px-4 py-1.5 bg-white/[0.04] border border-white/[0.05] rounded-md text-xs font-medium text-[#E5E7EB] mb-6 w-max"
          >
            Progress
          </motion.div>
          <div className="space-y-5">
            <Row icon={<BookOpen />} label="Topics" value="12 / 24" step={step} delay={0.4} />
            <Row icon={<Clock />} label="Time spent" value="45 min" step={step} delay={0.5} />
            <Row icon={<Calendar />} label="Last active" value="Today" step={step} delay={0.6} />
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 10 }}
              transition={{ duration: 0.4, delay: step >= 1 ? 0.7 : 0, ease: "easeOut" }}
              className="flex items-center justify-between text-[13px] pt-3"
            >
              <div className="flex items-center gap-5 text-[#9CA3AF]">
                <BarChart2 className="w-[16px] h-[16px] text-[#717A8F]" />
                <span className="font-medium">Progress</span>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-20 h-[6px] bg-black/40 shadow-inner rounded-full overflow-hidden relative">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-600 to-blue-300 rounded-full relative"
                    initial={{ width: "0%" }}
                    animate={{ width: step >= 2 ? "38%" : "0%" }}
                    transition={springConfig}
                  >
                    {/* Glowing tip on the progress bar */}
                    <div className="absolute right-0 top-0 bottom-0 w-3 bg-white/40 blur-[1px] rounded-r-full" />
                  </motion.div>
                </div>
                <span className="text-[#F3F4F6] font-bold text-[13px]">38 %</span>
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
            className="flex justify-between items-center mb-7"
          >
            <div className="flex items-center gap-4">
              <span className="px-4 py-1.5 bg-white/[0.04] border border-white/[0.05] rounded-md text-xs font-medium text-[#E5E7EB]">
                Today's task
              </span>
              <span className="text-xs text-[#9CA3AF] font-semibold">1 / 10</span>
            </div>
            <div className="text-xs text-[#4F84F6] font-semibold flex items-center gap-1.5 cursor-pointer group">
              View all <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </motion.div>

          <div className="space-y-5">
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
