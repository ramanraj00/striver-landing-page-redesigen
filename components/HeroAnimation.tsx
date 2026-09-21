"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Clock, Calendar, BarChart2, CheckCircle2, ArrowRight } from "lucide-react";

// Highly optimized Row component using hardware acceleration
const Row = ({ icon, label, value, step, delay }: { icon: React.ReactNode, label: string, value: string, step: number, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 10 }}
    transition={{ duration: 0.4, delay: step >= 1 ? delay : 0, ease: "easeOut" }}
    style={{ willChange: "transform, opacity", backfaceVisibility: "hidden" }}
    className="flex items-center justify-between text-[14px]"
  >
    <div className="flex items-center gap-5 text-white/80">
      <div className="text-white/50 w-[18px] h-[18px]">{icon}</div>
      <span className="font-semibold tracking-wide">{label}</span>
    </div>
    <span className="text-white font-bold tracking-wide">{value}</span>
  </motion.div>
);

// Highly optimized TaskRow with scaleX instead of width for strikethrough
const TaskRow = ({ label, time, shouldStrike, strikeDelay, step, delay }: { label: string, time: string, shouldStrike: boolean, strikeDelay?: number, step: number, delay: number }) => {
  const isCompletePhase = step >= 4 && shouldStrike;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 10 }}
      transition={{ duration: 0.4, delay: step >= 3 ? delay : 0, ease: "easeOut" }}
      style={{ willChange: "transform, opacity", backfaceVisibility: "hidden" }}
      className="flex justify-between items-center group"
    >
      <div className="flex items-center gap-4">
        <motion.div
          animate={{
            backgroundColor: isCompletePhase ? "rgba(59, 130, 246, 1)" : "rgba(255, 255, 255, 0.1)",
            borderColor: isCompletePhase ? "rgba(59, 130, 246, 1)" : "rgba(255, 255, 255, 0.2)"
          }}
          transition={{ duration: 0.2, delay: isCompletePhase ? strikeDelay : 0 }}
          className="w-5 h-5 rounded-full border flex items-center justify-center transition-colors"
        >
          <CheckCircle2 className={`w-3.5 h-3.5 text-white transition-opacity duration-300 ${isCompletePhase ? "opacity-100" : "opacity-0"}`} />
        </motion.div>
        
        <div className="relative">
          <motion.span 
            animate={{ color: isCompletePhase ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.9)" }}
            transition={{ duration: 0.3, delay: isCompletePhase ? strikeDelay : 0 }}
            className="text-[15px] font-bold tracking-wide block"
          >
            {label}
          </motion.span>
          {shouldStrike && (
            <motion.div
              style={{ originX: 0, backfaceVisibility: "hidden" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isCompletePhase ? 1 : 0 }}
              transition={{ duration: 0.4, delay: isCompletePhase ? strikeDelay : 0, ease: "easeInOut" }}
              className="absolute top-1/2 left-0 w-full h-[2px] bg-white/40 -translate-y-1/2"
            />
          )}
        </div>
      </div>
      <motion.span 
        animate={{ color: isCompletePhase ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.9)" }}
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

  const smoothTransition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] };

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center -translate-y-6 antialiased" style={{ perspective: "1500px" }}>
      
      {/* 3D Isometric Scene (Static Forward-Facing Tilt) */}
      <motion.div
        style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
        initial={{ rotateX: 20, rotateY: -20, rotateZ: 5 }}
        animate={{ rotateX: 20, rotateY: -20, rotateZ: 5 }}
        className="relative w-[460px] h-[470px]"
      >
        
        {/* Layer 0: Base Shell */}
        <motion.div
          initial={{ z: 0 }}
          style={{ backfaceVisibility: "hidden" }}
          className="absolute inset-0 bg-[#0B0E14] rounded-[40px] p-9 border-[1.5px] border-white/10 shadow-[-15px_25px_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
        >
          {/* ZERO-COST Radial Gradient Glow (Replaced expensive blur-3xl) */}
          <div 
            className="absolute -top-20 -left-10 w-[350px] h-[300px] rounded-full pointer-events-none" 
            style={{ background: "radial-gradient(circle, rgba(37,99,235,0.2) 0%, rgba(37,99,235,0) 70%)" }}
          />
          <div className="absolute top-0 left-0 right-0 h-[160px] bg-gradient-to-b from-[#4F84F6]/10 to-transparent pointer-events-none" />

          <div className="flex-shrink-0 relative z-10">
            <h3 className="text-4xl font-extrabold text-white mb-2.5 tracking-wide">Planly</h3>
            <p className="text-white/90 text-[16px] leading-relaxed max-w-[95%] font-semibold">
              Know exactly what you have to do each day. Planned.
            </p>
          </div>
        </motion.div>

        {/* Layer 1: Inner Card 1 (Progress) */}
        <motion.div
          initial={{ z: 0, y: 10, opacity: 0, x: 0, scale: 0.9, height: 300 }}
          animate={{ 
            z: step >= 3 ? 30 : (step >= 1 ? 40 : 0), 
            y: step >= 3 ? 0 : (step >= 1 ? 0 : 10), // Reverted to 0 to keep bottom flush
            x: step >= 3 ? 12 : 0,
            height: step >= 3 ? 280 : 300, // Using height so it shrinks from top down
            opacity: step >= 1 ? 1 : 0,
            scale: 1
          }}
          transition={smoothTransition}
          style={{ willChange: "transform, height, opacity", backfaceVisibility: "hidden" }}
          className="absolute left-12 right-5 bottom-0 bg-gradient-to-br from-[#192030] to-[#121622] rounded-[30px] p-8 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),-10px_20px_40px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 10 }}
            transition={{ duration: 0.4, delay: step >= 1 ? 0.3 : 0, ease: "easeOut" }}
            style={{ willChange: "transform, opacity", backfaceVisibility: "hidden" }}
            className="inline-flex px-4 py-1.5 bg-white/10 border border-white/10 rounded-md text-xs font-bold text-white mb-6 w-max shadow-sm"
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
              style={{ willChange: "transform, opacity", backfaceVisibility: "hidden" }}
              className="flex items-center justify-between text-[14px] pt-4"
            >
              <div className="flex items-center gap-5 text-white/80">
                <BarChart2 className="w-[18px] h-[18px] text-white/50" />
                <span className="font-semibold tracking-wide">Progress</span>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-20 h-[6px] bg-black/40 shadow-inner rounded-full overflow-hidden relative">
                  {/* Replaced width animation with scaleX for zero layout thrashing */}
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full w-full"
                    style={{ originX: 0, willChange: "transform" }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: step >= 2 ? 0.38 : 0 }}
                    transition={{ type: "spring", stiffness: 70, damping: 14 }}
                  />
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
          style={{ willChange: "transform, opacity", backfaceVisibility: "hidden" }}
          className="absolute left-12 right-5 bottom-0 h-[300px] bg-gradient-to-br from-[#1F273A] to-[#161B2B] rounded-[30px] p-8 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),-15px_30px_50px_rgba(0,0,0,0.7)]"
        >
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 10 }}
            transition={{ duration: 0.4, delay: step >= 3 ? 0.3 : 0, ease: "easeOut" }}
            style={{ willChange: "transform, opacity", backfaceVisibility: "hidden" }}
            className="flex justify-between items-center mb-6"
          >
            <div className="flex items-center gap-4">
              <span className="px-4 py-1.5 bg-white/10 border border-white/10 rounded-md text-xs font-bold text-white shadow-sm">
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
