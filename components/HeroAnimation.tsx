"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Clock, Calendar, BarChart2, CheckCircle2, ArrowRight, Search, Sparkles } from "lucide-react";

// Highly optimized Row component using hardware acceleration
const Row = ({ icon, label, value, step, delay }: { icon: React.ReactNode, label: string, value: string, step: number, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 10 }}
    transition={{ duration: 0.4, delay: step >= 1 ? delay : 0, ease: "easeOut" }}
    style={{ willChange: "transform, opacity", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
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
      style={{ willChange: "transform, opacity", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
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
              style={{ originX: 0, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
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
        await new Promise((r) => setTimeout(r, 3500)); // Wait for all 3 tasks to strike (~1.4s) + 2 full seconds of pause
        if (!isMounted) break;
        setStep(5); // Luxurious Flip
        await new Promise((r) => setTimeout(r, 1500));
        if (!isMounted) break;
        setStep(6); // TUFY Slide 1 (Roller)
        await new Promise((r) => setTimeout(r, 2000));
        if (!isMounted) break;
        setStep(7); // TUFY Slide 2 (Code Editor)
        await new Promise((r) => setTimeout(r, 3500));
        if (!isMounted) break;
        setStep(8); // Luxurious Flip Back
        await new Promise((r) => setTimeout(r, 1500));
        if (!isMounted) break;
        // Loop repeats back to step 0
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
      
      {/* 3D Isometric Camera Container (Stays Static, holds the camera angle) */}
      <motion.div
        style={{ transformStyle: "preserve-3d", WebkitTransformStyle: "preserve-3d", willChange: "transform" }}
        initial={{ rotateX: 20, rotateY: -20, rotateZ: 5 }}
        animate={{ rotateX: 20, rotateY: -20, rotateZ: 5 }}
        className="relative w-[460px] h-[470px]"
      >
        
        {/* The Flipper Container (Spins perfectly inside the 3D space) */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ transformStyle: "preserve-3d", WebkitTransformStyle: "preserve-3d", willChange: "transform" }}
          initial={{ rotateY: 0 }}
          animate={{
            rotateY: (step >= 5 && step <= 7) ? 180 : 0,
            z: (step === 5 || step === 8) ? 50 : 0, // Pushes forward ONLY during the flip turns
            scale: (step === 5 || step === 8) ? 1.05 : 1
          }}
          transition={{
            rotateY: { duration: 1.4, ease: [0.25, 1, 0.5, 1] },
            default: { 
              duration: (step === 5 || step === 8) ? 1.4 : 0.4, 
              ease: (step === 5 || step === 8) ? [0.25, 1, 0.5, 1] : "easeOut" 
            }
          }}
        >

          {/* ======================= */}
          {/* FRONT FACE (Planly UI) */}
          {/* ======================= */}
          <motion.div 
            initial={{ visibility: "visible" }}
            animate={{ visibility: (step === 6 || step === 7) ? "hidden" : "visible" }}
            transition={{ duration: 0 }}
            className="absolute inset-0 w-full h-full" 
            style={{ transform: "translateZ(1px)", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transformStyle: "preserve-3d", WebkitTransformStyle: "preserve-3d" }}
          >
            {/* Layer 0: Base Shell */}
            <motion.div
              initial={{ z: 0 }}
              style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
              className="absolute inset-0 bg-[#0B0E14] rounded-[40px] p-9 border-[1.5px] border-white/10 shadow-[-15px_25px_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
            >
              {/* ZERO-COST Radial Gradient Glow */}
              <div 
                className="absolute -top-20 -left-10 w-[350px] h-[300px] rounded-full pointer-events-none" 
                style={{ background: "radial-gradient(circle, rgba(37,99,235,0.2) 0%, rgba(37,99,235,0) 70%)" }}
              />
              <div className="absolute top-0 left-0 right-0 h-[160px] bg-gradient-to-b from-[#4F84F6]/10 to-transparent pointer-events-none" />

              <div className="flex-shrink-0">
                <motion.h3 
                  animate={{ opacity: (step === 6 || step === 7) ? 0 : 1 }}
                  transition={{ duration: (step === 6 || step === 7) ? 0 : 0.2 }}
                  className="text-4xl font-extrabold text-white mb-2.5 tracking-wide"
                >
                  Planly
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ 
                    opacity: (step === 6 || step === 7) ? 0 : 1,
                    y: (step === 6 || step === 7) ? 15 : 0
                  }}
                  transition={{ 
                    duration: 0.7, 
                    ease: [0.16, 1, 0.3, 1],
                    delay: (step === 6 || step === 7) ? 0 : 0.6
                  }}
                  className="text-white/90 text-[16px] leading-relaxed max-w-[95%] font-semibold"
                >
                  Know exactly what you have to do each day. Planned.
                </motion.p>
              </div>
            </motion.div>

            {/* Layer 1: Inner Card 1 (Progress) */}
            <motion.div
              initial={{ z: 0, y: 10, opacity: 0, x: 0, scale: 0.9, height: 300 }}
              animate={{ 
                z: (step >= 3 && step <= 5) ? 30 : ((step >= 1 && step <= 5) ? 40 : 0), 
                y: step >= 3 ? 0 : (step >= 1 ? 0 : 10), 
                x: step >= 3 ? 12 : 0,
                height: step >= 3 ? 280 : 300, 
                opacity: (step >= 1 && step <= 5) ? 1 : 0,
                scale: 1
              }}
              transition={smoothTransition}
              style={{ willChange: "transform, height, opacity", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
              className="absolute left-12 right-5 bottom-0 bg-gradient-to-br from-[#192030] to-[#121622] rounded-[30px] p-8 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),-10px_20px_40px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 10 }}
                transition={{ duration: 0.4, delay: step >= 1 ? 0.3 : 0, ease: "easeOut" }}
                style={{ willChange: "transform, opacity", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
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
                  style={{ willChange: "transform, opacity", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                  className="flex items-center justify-between text-[14px] pt-4"
                >
                  <div className="flex items-center gap-5 text-white/80">
                    <BarChart2 className="w-[18px] h-[18px] text-white/50" />
                    <span className="font-semibold tracking-wide">Progress</span>
                  </div>
                  <div className="flex items-center gap-5">
                    <div className="w-20 h-[6px] bg-black/40 shadow-inner rounded-full overflow-hidden relative">
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
                z: (step >= 3 && step <= 5) ? 60 : 0, 
                y: step >= 3 ? 0 : 10, 
                opacity: (step >= 3 && step <= 5) ? 1 : 0,
                x: 0,
                scale: 1
              }}
              transition={smoothTransition}
              style={{ willChange: "transform, opacity", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
              className="absolute left-12 right-5 bottom-0 h-[300px] bg-gradient-to-br from-[#1F273A] to-[#161B2B] rounded-[30px] p-8 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),-15px_30px_50px_rgba(0,0,0,0.7)]"
            >
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 10 }}
                transition={{ duration: 0.4, delay: step >= 3 ? 0.3 : 0, ease: "easeOut" }}
                style={{ willChange: "transform, opacity", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
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

          {/* ======================= */}
          {/* BACK FACE (TUFY UI) */}
          {/* ======================= */}
          <motion.div 
            initial={{ visibility: "hidden" }}
            animate={{ visibility: (step >= 5 && step <= 8) ? "visible" : "hidden" }}
            transition={{ duration: 0 }}
            className="absolute inset-0 w-full h-full" 
            style={{ transform: "rotateY(180deg) translateZ(1px)", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transformStyle: "preserve-3d", WebkitTransformStyle: "preserve-3d" }}
          >
            
            {/* Base Background with mathematically inverted shadow so it casts left relative to the scene after rotating */}
            <div className="absolute inset-0 bg-[#0B0E14] rounded-[40px] border-[1.5px] border-white/10 shadow-[15px_25px_50px_rgba(0,0,0,0.8)]" />

            {/* Inner Content (Safely padded, no global overflow-hidden so the mascot can pop out) */}
            <div className="relative w-full h-full p-9 flex flex-col">
              
              <div className="flex-shrink-0">
                <h3 className="text-3xl font-extrabold text-white mb-3 tracking-wide">TUFY to help you</h3>
                <p className="text-white/70 text-[15px] leading-relaxed max-w-[95%]">
                  Built into every surface —{' '}
                  <span className="text-[#4F84F6] font-semibold bg-[#4F84F6]/15 px-1.5 py-0.5 rounded-md border border-[#4F84F6]/20 shadow-sm">lessons</span>,{' '}
                  <span className="text-[#4F84F6] font-semibold bg-[#4F84F6]/15 px-1.5 py-0.5 rounded-md border border-[#4F84F6]/20 shadow-sm">practice</span>,{' '}
                  <span className="text-[#4F84F6] font-semibold bg-[#4F84F6]/15 px-1.5 py-0.5 rounded-md border border-[#4F84F6]/20 shadow-sm">submissions</span> and{' '}
                  <span className="text-[#4F84F6] font-semibold bg-[#4F84F6]/15 px-1.5 py-0.5 rounded-md border border-[#4F84F6]/20 shadow-sm">reviews</span>.
                </p>
              </div>

              {/* CAROUSEL CONTAINER */}
              <div className="mt-6 flex-1 w-full relative overflow-hidden rounded-[16px]">
                
                {/* SLIDE 1: Roller IDE */}
                <motion.div
                  animate={{ 
                    x: (step >= 7) ? -400 : 0, 
                    opacity: (step >= 7) ? 0 : 1 
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full bg-[#080A0F] border-[1.5px] border-white/10 overflow-hidden flex flex-col rounded-[16px]"
                  style={{ willChange: "transform, opacity" }}
                >
                  {/* IDE Top Bar (Fixed at top) */}
                  <div className="relative w-full h-8 border-b border-white/5 flex items-center px-4 gap-1.5 bg-white/[0.02] z-40">
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  </div>

                  {/* Wooden Roller Rod (Fixed just below top bar) */}
                  <div className="absolute top-[32px] left-2 right-2 h-[14px] rounded-full bg-gradient-to-b from-[#8b5a2b] via-[#a0522d] to-[#4a2311] shadow-[0_5px_15px_rgba(0,0,0,0.9),inset_0_2px_2px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.5)] z-30 border border-[#3e1d04]">
                     {/* End caps */}
                     <div className="absolute left-0 w-1.5 h-full bg-[#2a1302] rounded-l-full opacity-80" />
                     <div className="absolute right-0 w-1.5 h-full bg-[#2a1302] rounded-r-full opacity-80" />
                  </div>

                  {/* The Unrolling Canvas */}
                  <motion.div
                    initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
                    animate={{ clipPath: (step === 6 || step === 7 || step === 8) ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)" }}
                    transition={{ duration: 1.0, delay: step === 6 ? 0.2 : 0, ease: [0.25, 1, 0.5, 1] }}
                    className="absolute top-[39px] left-4 right-4 bottom-4 bg-gradient-to-b from-[#1C2128] to-[#12161E] rounded-b-[12px] shadow-[0_10px_20px_rgba(0,0,0,0.5)] z-20 flex flex-col items-center justify-end pb-4"
                  >
                    {/* Floating Search/Stats Bar */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: (step === 6 || step === 7 || step === 8) ? 1 : 0, y: (step === 6 || step === 7 || step === 8) ? 0 : 30 }}
                      transition={{ duration: 0.6, delay: step === 6 ? 0.9 : 0, ease: [0.16, 1, 0.3, 1] }}
                      className="w-[90%] h-12 bg-[#0B0E14] border border-white/10 rounded-full flex items-center justify-between px-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                    >
                      <div className="flex items-center gap-2 text-white/50">
                        <Search className="w-[18px] h-[18px]" />
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[14px]">🪙</span>
                          <span className="text-white text-xs font-bold tracking-wide">240</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[14px]">🔥</span>
                          <span className="text-white text-xs font-bold tracking-wide">12</span>
                        </div>
                        <div className="w-7 h-7 rounded-full bg-[#1F2937] border border-white/20 flex items-center justify-center overflow-hidden ml-1">
                          {/* Tiny TUFY Face inside the circle */}
                          <img loading="eager" fetchpriority="high" src="/tufy.png" alt="TUFY Profile" className="w-full h-full object-cover scale-150 translate-y-1" />
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* SLIDE 2: Code Editor */}
                <motion.div
                  initial={{ x: 400, opacity: 0 }}
                  animate={{ 
                    x: (step >= 7) ? 0 : 400, 
                    opacity: (step >= 7) ? 1 : 0 
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full bg-[#0A0D14] border-[1.5px] border-white/10 overflow-hidden flex flex-col rounded-[16px] shadow-[inset_0_10px_20px_rgba(0,0,0,0.4)]"
                  style={{ willChange: "transform, opacity" }}
                >
                  {/* IDE Top Bar (Tabs) */}
                  <div className="relative w-full h-8 border-b border-white/5 flex items-end px-2 bg-[#06080A]">
                     <div className="flex items-center gap-1.5 px-3 h-6 bg-[#080A0F] border-t border-l border-r border-white/5 rounded-t-[4px] text-[#4F84F6] text-[10px] font-semibold border-t-[#4F84F6]/50">
                        Tab-1 <span className="text-white/40 hover:text-white/80 cursor-pointer">×</span>
                     </div>
                     <div className="flex items-center justify-center w-6 h-6 text-white/30 text-[10px] ml-1">+</div>
                  </div>

                  {/* Header (Controls) */}
                  <div className="relative w-full h-10 border-b border-white/5 flex items-center justify-between px-3 bg-[#080A0F]">
                     <div className="flex items-center gap-1 px-2 py-1 bg-white/5 rounded-[4px] text-white/80 text-[11px] font-mono border border-white/5">
                        C++ <span className="text-[8px] text-white/40">▼</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-[4px] bg-white/5 flex items-center justify-center border border-white/5">
                           <span className="text-white/60 text-[8px]">▶</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#1A3B22] text-[#4ADE80] border border-[#4ADE80]/20 rounded-[4px] text-[11px] font-semibold shadow-sm">
                           🚀 Submit
                        </div>
                        <div className="text-white/30 text-[14px] ml-1 tracking-widest leading-none">...</div>
                     </div>
                  </div>

                  {/* Code Area */}
                  <div className="flex-1 w-full relative bg-[#080A0F] flex pt-3 pb-8">
                     {/* Line Numbers */}
                     <div className="w-8 flex flex-col items-end pr-2 text-[11px] font-mono text-white/20 leading-[18px] select-none">
                        1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9<br/>10
                     </div>
                     {/* Code */}
                     <div className="flex-1 flex flex-col text-[11px] font-mono text-white/70 leading-[18px]">
                        <div><span className="text-[#4F84F6]">int</span> majorityElement(<span className="text-[#4F84F6]">vector</span>&lt;<span className="text-[#4F84F6]">int</span>&gt;&amp; nums) {'{'}</div>
                        <div className="pl-4"><span className="text-[#4F84F6]">int</span> count = <span className="text-[#FBBF24]">0</span>;</div>
                        <div className="pl-4"><span className="text-[#4F84F6]">int</span> candidate = <span className="text-[#FBBF24]">0</span>;</div>
                        <div className="pl-4"><span className="text-[#C084FC]">for</span> (<span className="text-[#4F84F6]">int</span> x : nums) {'{'}</div>
                        <div className="pl-8"><span className="text-[#C084FC]">if</span> (count == <span className="text-[#FBBF24]">0</span>) candidate = x;</div>
                        <div className="pl-8">count += (x == candidate) ? <span className="text-[#FBBF24]">1</span> : <span className="text-[#FBBF24]">-1</span>;</div>
                        <div className="pl-4">{'}'}</div>
                        <div className="pl-4"><span className="text-[#C084FC]">return</span> candidate;</div>
                        <div>{'}'}</div>
                     </div>

                     {/* Stuck Here Button */}
                     <div className="absolute bottom-3 right-3 px-3 py-1 bg-[#1F2937]/80 border border-white/20 rounded-full text-white/70 text-[10px] font-medium shadow-lg backdrop-blur-md">
                        Stuck here?
                     </div>
                  </div>

                  {/* Footer */}
                  <div className="relative w-full h-8 border-t border-white/5 flex items-center justify-between px-3 bg-[#06080A]">
                     <div className="flex items-center gap-3 text-[10px] font-medium">
                        <span className="text-white/80">Test Case</span>
                        <span className="text-[#4F84F6] relative">Sample<div className="absolute -bottom-[9px] left-0 right-0 h-[2px] bg-[#4F84F6] rounded-t-full"/></span>
                        <span className="text-white/30">Hidden</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full border border-white/30 border-t-transparent -rotate-45" />
                        <div className="w-2.5 h-2.5 border border-white/30 rounded-sm" />
                        <div className="w-3 h-2.5 border-b-2 border-white/30 rounded-sm" />
                     </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Mascot Popping Out of the Card */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.8 }}
              animate={{ 
                opacity: (step === 6 || step === 7) ? 1 : 0, 
                y: (step === 6 || step === 7) ? 0 : 60, 
                scale: (step === 6 || step === 7) ? 1 : 0.8 
              }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: step === 6 ? 0.6 : 0 }}
              className="absolute -bottom-3 -right-4 w-[135px] h-[135px] z-50 pointer-events-none"
            >
              {/* Using the newly uploaded laptop mascot */}
              <img loading="eager" fetchpriority="high" 
                src="/tufy-laptop.png" 
                alt="TUFY Mascot" 
                className="w-full h-full object-contain " 
              />
            </motion.div>

          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
