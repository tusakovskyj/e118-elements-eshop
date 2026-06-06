"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <footer className="w-full mt-auto border-t border-neutral-800 bg-black text-white relative overflow-hidden">
      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-24 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        
        {/* Brand & Copyright */}
        <div className="flex flex-col gap-4 max-w-sm">
          <Link href="/" className="font-mono text-2xl font-bold tracking-tighter uppercase inline-block">
            E118 <span className="text-purple-500">Elements</span>
          </Link>
          <p className="text-neutral-500 text-sm font-mono leading-relaxed">
            The definitive catalog of the universe. 118 fundamental building blocks synthesized for modern consumption.
          </p>
          <span className="text-neutral-600 text-xs font-mono mt-2">
            &copy; {new Date().getFullYear()} E118 Elements. All rights reserved.
          </span>
        </div>

        {/* Links Grid */}
        <div className="flex gap-16 md:gap-24">
          <div className="flex flex-col gap-4">
            <span className="text-neutral-400 text-xs tracking-widest uppercase font-mono font-bold">Legal</span>
            <Link href="/terms" className="font-mono text-sm text-neutral-300 hover:text-purple-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="font-mono text-sm text-neutral-300 hover:text-purple-400 transition-colors">
              Privacy Policy
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-neutral-400 text-xs tracking-widest uppercase font-mono font-bold">Contact</span>
            <motion.a 
              href="mailto:tusakovskyj@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="font-mono text-sm px-4 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 hover:border-purple-500/50 transition-colors inline-flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              tusakovskyj@gmail.com
            </motion.a>
          </div>
        </div>

      </div>
    </footer>
  );
};
