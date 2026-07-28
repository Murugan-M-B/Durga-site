"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function WhatsAppFloat() {
  return (
    <motion.a
      href="https://wa.me/919443150850?text=Hello%20Durga%20Printers%2C%20I%20would%20like%20to%20enquire%20about%20your%20printing%20services."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-24 right-5 lg:bottom-8 lg:right-8 z-40 
                 flex items-center gap-2.5 px-4 py-3 rounded-full 
                 bg-[#0C0C0E]/90 backdrop-blur-xl border border-white/10 text-white
                 shadow-[0_12px_40px_rgba(0,0,0,0.18)] hover:border-red/30 transition-all duration-300 group"
      initial={{ scale: 0, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ delay: 1.4, type: "spring", stiffness: 220, damping: 22 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
    >
      <div className="relative flex items-center justify-center">
        <MessageCircle size={18} className="text-white" strokeWidth={2} />
        {/* Pulse ring indicator */}
        <span className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 rounded-full bg-[#25D366] ring-2 ring-[#0C0C0E]">
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75" />
        </span>
      </div>

      <span className="font-mono text-[10.5px] tracking-[0.08em] uppercase pr-1 max-w-0 group-hover:max-w-[140px] lg:max-w-[140px] transition-all duration-500 ease-in-out overflow-hidden whitespace-nowrap">
        WhatsApp Support
      </span>
    </motion.a>
  );
}
