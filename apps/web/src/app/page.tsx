"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Logo from "@/components/Logo";

export default function LandingPage() {
  return (
    <div className="flex-1 bg-charcoal text-cloud flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-electric opacity-5 blur-[120px] rounded-full pointer-events-none" />

      <main className="z-10 flex flex-col items-center text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <h1 className="mb-4">
            <Logo size="xl" glitchText={true} layout="vertical" />
          </h1>
          <p className="text-xl md:text-2xl text-cloud/70 max-w-2xl mx-auto font-light">
            Deep technical assessments for elite engineering teams. Find the bugs, prove your logic, and elevate your skills.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-6 mt-12 w-full sm:w-auto"
        >
          <Link 
            href="/practice"
            className="px-8 py-4 bg-electric text-charcoal font-bold rounded-md hover:bg-electric/90 transition-all text-lg shadow-[0_0_20px_rgba(64,224,255,0.4)]"
          >
            Start Practicing
          </Link>
          <Link 
            href="/dashboard"
            className="px-8 py-4 border border-cloud/30 text-cloud font-medium rounded-md hover:bg-cloud/10 transition-all text-lg"
          >
            For Employers
          </Link>
        </motion.div>
      </main>

      {/* Futuristic decorative elements */}
      <div className="absolute bottom-10 left-10 text-electric/30 font-mono text-sm hidden md:block">
        SYS.STATE: ONLINE // TTD.CALIBRATING
      </div>
      <div className="absolute top-10 right-10 flex gap-2 hidden md:flex">
        <div className="w-2 h-2 bg-orange rounded-full animate-pulse" />
        <div className="w-2 h-2 bg-electric rounded-full" />
        <div className="w-2 h-2 bg-cloud/30 rounded-full" />
      </div>
    </div>
  );
}
