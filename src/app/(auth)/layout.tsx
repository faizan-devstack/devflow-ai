"use client";

import { motion } from "framer-motion";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { PiSpinner } from "react-icons/pi";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center py-20 pt-12 min-h-[60vh]">
      <ClerkLoading>
        <div className="flex flex-col items-center justify-center text-canvas-text">
          <PiSpinner className="animate-spin text-primary-solid text-4xl mb-4" />
          <p className="text-sm">Loading...</p>
        </div>
      </ClerkLoading>
      <ClerkLoaded>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full flex justify-center"
        >
          {children}
        </motion.div>
      </ClerkLoaded>
    </div>
  );
}
