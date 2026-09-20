import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-zinc-950">
      {/* Background gradient effect for a nice dark theme vibe */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-950 to-zinc-950 pointer-events-none" />
      
      <Navbar />

      <main className="relative pt-32 px-6 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl md:text-6xl font-bold text-center text-zinc-100 tracking-tight">
          Next Generation <br className="hidden md:block" />
          <span className="text-zinc-400">Landing Page</span>
        </h1>
        <p className="mt-6 text-lg text-zinc-400 max-w-xl text-center">
          Building something amazing with Next.js, Tailwind CSS, and a beautiful dark theme interface.
        </p>
      </main>
    </div>
  );
}
