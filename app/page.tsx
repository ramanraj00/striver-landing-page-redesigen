import Navbar from "@/components/Navbar";
import { ArrowRight } from "lucide-react";
import HeroAnimation from "@/components/HeroAnimation";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0A0A0C]">
      
      {/* 
        Lightweight Dark Glass Effect (Zero Performance Cost)
        1. A subtle diagonal sheen for the glass reflection.
        2. An ultra-faint SVG noise texture for the frosted/matte material feel.
      */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.025] via-transparent to-black/40 pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      <Navbar />

      <main className="relative max-w-7xl mx-auto px-6 pt-32 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[85vh] z-10">
        
        {/* Left Column (Content) */}
        <div className="flex flex-col items-start translate-y-[2.7rem]">
          
          {/* Learners Badge */}
          <div className="inline-flex items-center px-3 py-1.5 mb-6 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
            <span className="text-xs font-semibold text-zinc-300 tracking-wide uppercase">
              17,02,210+ learners
            </span>
          </div>
          
          {/* Main Headline (Ultra-Clean & Uniform) */}
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.1]">
            <span className="text-zinc-300">One Stop</span> <br />
            <span className="text-zinc-300">Learning Platform</span> <br />
            <span className="text-zinc-100">for TECH Interviews.</span>
          </h1>
          
          {/* Description */}
          <p className="mt-6 text-lg text-zinc-400 max-w-lg leading-relaxed">
            Learn DSA, System Design, and Core CS Subjects with personalised roadmaps, expert videos, and practice built for results.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex items-center gap-4 w-full sm:w-auto">
            <button className="px-6 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-[15px] font-medium transition-colors hover:bg-white/[0.08]">
              Start for free
            </button>
            <button className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-b from-[#3E7BFA] to-[#225AD2] hover:from-[#4C86FC] hover:to-[#2762DB] text-white text-[15px] font-medium rounded-xl transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]">
              Explore plus
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Right Column (Hero Animation) */}
        <div className="hidden lg:flex w-full items-center justify-center relative translate-y-[2.7rem]">
          <HeroAnimation />
        </div>

      </main>
    </div>
  );
}
