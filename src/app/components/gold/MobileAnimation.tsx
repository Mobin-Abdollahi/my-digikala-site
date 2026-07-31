/* eslint-disable @next/next/no-img-element */
"use client";
import React from 'react';
import { motion } from 'framer-motion';

const MobileAnimation = () => {
  return (
    <div className="relative h-100 flex justify-center items-center">
      {/* گوشی پشت */}
      <motion.div 
        animate={{ 
          rotateY: [0, 10, 0],
          y: [0, -10, 0] 
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute z-0 opacity-60 scale-90 translate-x-12"
      >
        <img src="/mobile-mockup.png" alt="Mobile UI" className="w-56" />
      </motion.div>

      {/* گوشی جلو (اصلی) با قابلیت Hover */}
      <motion.div 
        whileHover={{ scale: 1.05, rotateY: 15 }}
        animate={{ 
          y: [0, 10, 0] 
        }}
        transition={{ 
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            rotateY: { duration: 0.3 }
        }}
        className="z-10 cursor-pointer drop-shadow-2xl"
      >
        <img src="/mobile-mockup.png" alt="Mobile UI" className="w-64" />
      </motion.div>
    </div>
  );
};

export default MobileAnimation;
