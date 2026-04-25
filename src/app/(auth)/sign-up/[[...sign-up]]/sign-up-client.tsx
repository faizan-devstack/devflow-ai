"use client";

import { SignUp } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Link from "next/link";
import { clerkAppearance } from "@/lib/clerk-appearance";

export default function SignUpClient() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col items-center justify-center w-full"
    >
      <SignUp appearance={clerkAppearance} fallbackRedirectUrl="/dashboard/settings" />
    </motion.div>
  );
}
