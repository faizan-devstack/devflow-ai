"use client";

import { SignIn } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { clerkAppearance } from "@/lib/clerk-appearance";

export default function SignInPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex items-center justify-center w-full"
    >

      <SignIn appearance={clerkAppearance} fallbackRedirectUrl="/dashboard/settings" />
    </motion.div>
  );
}
