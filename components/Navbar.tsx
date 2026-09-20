"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { LayoutGrid, ChevronDown, ChevronRight, ArrowRight, Code2, FileText, Database, Brain } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const PricingIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M4 9v9a2 2 0 0 0 2 2h11" />
    <rect x="8" y="4" width="14" height="11" rx="2" />
    <circle cx="15" cy="9.5" r="2" />
    <path d="M8 7h.01 M22 7h.01 M8 12h.01 M22 12h.01" />
  </svg>
);

const TABS = [
  { id: 'dashboard', label: 'Dashboard', Icon: LayoutGrid, hasChevron: false },
  { id: 'explore', label: 'Explore', Icon: null, hasChevron: true },
  { id: 'pricing', label: 'Pricing', Icon: PricingIcon, hasChevron: false },
];

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [hoveredColumn, setHoveredColumn] = useState<string | null>(null);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 w-full">
      
      {/* Left: Logo & Brand */}
      <div className="flex items-center">
        <Link href="/">
          <Image 
            src="/logo-clear.png" 
            alt="takeUforward" 
            width={240} 
            height={60} 
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>
      </div>

      {/* Center: Navigation Links */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 bg-zinc-900/90 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-1.5 shadow-lg"
        onMouseLeave={() => setHoveredTab(null)}
      >
        {TABS.map((tab) => {
          const isHovered = hoveredTab === tab.id;
          const isActive = activeTab === tab.id;
          const isBackgroundActive = hoveredTab ? isHovered : isActive;

          return (
            <Link 
              key={tab.id}
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(tab.id);
              }}
              onMouseEnter={() => setHoveredTab(tab.id)}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 ease-out text-sm font-medium ${
                isBackgroundActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {isBackgroundActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-zinc-800 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.4)] border border-zinc-700/50"
                  transition={{ 
                    type: "spring", 
                    bounce: 0.05, 
                    duration: 0.5 
                  }}
                />
              )}
              
              <span className="relative z-10 flex items-center gap-1.5">
                {tab.Icon && <tab.Icon className="w-4 h-4" />}
                {tab.label}
                {tab.hasChevron && (
                  <ChevronDown 
                    className={`w-4 h-4 opacity-70 transition-transform duration-300 ${hoveredTab === 'explore' && tab.id === 'explore' ? 'rotate-180' : ''}`} 
                  />
                )}
              </span>
            </Link>
          );
        })}

        {/* Explore Dropdown Mega Menu */}
        <AnimatePresence>
          {hoveredTab === 'explore' && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.96 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="absolute top-full pt-3 left-1/2 -translate-x-1/2 z-50 origin-top"
            >
              <div 
                className="bg-[#09090b]/85 backdrop-blur-3xl border border-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.03),0_24px_48px_-12px_rgba(0,0,0,0.8)] rounded-[28px] p-2 flex min-w-[460px]"
                onMouseLeave={() => setHoveredColumn(null)}
              >
                {/* Left Section */}
                <div 
                  className="relative flex-1 p-5 rounded-[22px] transition-colors"
                  onMouseEnter={() => setHoveredColumn('left')}
                >
                  {hoveredColumn === 'left' && (
                    <motion.div
                      layoutId="section-pill"
                      className="absolute inset-0 bg-white/[0.03] rounded-[22px]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <div className="relative z-10 flex flex-col gap-5">
                    <Link href="#" className="group flex flex-col">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-base font-semibold text-white tracking-tight transition-colors">
                          Practice
                        </span>
                        <ArrowRight className="w-4 h-4 text-zinc-400 opacity-0 -translate-x-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0" />
                      </div>
                      <span className="text-[14px] text-zinc-300 leading-relaxed transition-colors group-hover:text-zinc-100">Sharpen your skills with topic-wise coding practice</span>
                    </Link>

                    {/* Horizontal Divider */}
                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                    
                    <Link href="#" className="group flex flex-col">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-base font-semibold text-white tracking-tight transition-colors">
                          Prephub
                        </span>
                        <ArrowRight className="w-4 h-4 text-zinc-400 opacity-0 -translate-x-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0" />
                      </div>
                      <span className="text-[14px] text-zinc-300 leading-relaxed transition-colors group-hover:text-zinc-100">Master every CS subject in one structured hub</span>
                    </Link>
                  </div>
                </div>

                {/* Right Section */}
                <div 
                  className="relative w-44 p-5 rounded-[22px] flex flex-col justify-center pl-8"
                  onMouseEnter={() => setHoveredColumn('right')}
                >
                  {hoveredColumn === 'right' && (
                    <motion.div
                      layoutId="section-pill"
                      className="absolute inset-0 bg-white/[0.03] rounded-[22px]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <div className="relative z-10 flex flex-col">
                    <Link href="#" className="group flex items-center justify-between py-3.5 text-[15px] font-medium text-zinc-300 hover:text-white transition-colors">
                      <div className="flex items-center gap-3">
                        <Code2 className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                        DSA
                      </div>
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0" />
                    </Link>

                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                    
                    <Link href="#" className="group flex items-center justify-between py-3.5 text-[15px] font-medium text-zinc-300 hover:text-white transition-colors">
                      <div className="flex items-center gap-3">
                        <Database className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                        SQL
                      </div>
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0" />
                    </Link>

                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                    
                    <Link href="#" className="group flex items-center justify-between py-3.5 text-[15px] font-medium text-zinc-300 hover:text-white transition-colors">
                      <div className="flex items-center gap-3">
                        <Brain className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                        Aptitude
                      </div>
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right: CTA Button */}
      <div className="flex items-center">
        <Link 
          href="#" 
          className="group flex items-center gap-1.5 px-5 py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 text-sm font-medium rounded-xl transition-all shadow-sm"
        >
          Get Started
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

    </nav>
  );
};

export default Navbar;
