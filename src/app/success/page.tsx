"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export default function SuccessPage() {
  return (
    <div className="flex-grow flex items-center justify-center p-6 bg-white dark:bg-black relative overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-xl w-full flex flex-col items-center text-center space-y-8 relative z-10"
      >
        <div className="w-24 h-24 rounded-full border-2 border-green-500 flex items-center justify-center bg-green-500/10 mb-4">
          <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>

        <h1 className="text-4xl md:text-5xl font-mono font-bold tracking-tighter uppercase">
          Transaction <span className="text-green-500">Authorized</span>
        </h1>

        <p className="font-mono text-neutral-500 leading-relaxed max-w-md">
          Your secure container of E118 Elements has been securely processed. Delivery coordinates have been transmitted to the fulfillment nexus.
        </p>

        <div className="border border-neutral-200 dark:border-neutral-800 p-6 w-full mt-4 font-mono text-sm bg-neutral-50 dark:bg-neutral-900/30 text-left space-y-2">
          <div className="flex justify-between">
            <span className="text-neutral-500 uppercase tracking-widest">Status</span>
            <span className="text-green-500">Processing</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500 uppercase tracking-widest">Protocol</span>
            <span className="">E118 Vault Transfer</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-neutral-200 dark:border-neutral-800">
            <span className="text-neutral-500 uppercase tracking-widest">Est. Delivery</span>
            <span className="">T+3 Cycles</span>
          </div>
        </div>

        <div className="pt-8 w-full flex flex-col gap-4">
          <Link href="/profile" className="w-full">
            <Button fullWidth className="py-4 font-mono uppercase tracking-widest text-sm">
              View Order Manifest
            </Button>
          </Link>
          <Link href="/" className="w-full">
            <Button variant="outline" fullWidth className="py-4 font-mono uppercase tracking-widest text-sm">
              Return to Catalog
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
