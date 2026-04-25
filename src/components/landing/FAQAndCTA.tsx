"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { PiCaretDown, PiRocketLaunch } from "react-icons/pi";
import Link from "next/link";
import WaveDivider from "@/components/animations/WaveDivider";
import { Button } from "@/components/ui/button";

// ─── FAQ data ─────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    id: "faq-1",
    q: "Is DevFlow AI free?",
    a: "Yes — free for teams up to 3 members with core features. Paid plans unlock unlimited members, more repos, and priority AI.",
  },
  {
    id: "faq-2",
    q: "What AI powers DevFlow?",
    a: "Claude by Anthropic — one of the best models for understanding and writing about code.",
  },
  {
    id: "faq-3",
    q: "Do you need GitHub access?",
    a: "No account connection needed. Public repos work with just the URL. Private repos use a personal access token that is never stored on our servers.",
  },
  {
    id: "faq-4",
    q: "How are digests delivered?",
    a: "Every Friday, DevFlow compiles the week's standups into a client-ready digest and emails it automatically to whoever you configure.",
  },
  {
    id: "faq-5",
    q: "How accurate is the codebase Q&A?",
    a: "Answers are grounded in your actual code with file path citations. Not general knowledge — your codebase.",
  },
  {
    id: "faq-6",
    q: "Can I delete my data?",
    a: "Yes. Delete any repo from settings and all chunks, embeddings, and sessions are permanently removed.",
  },
];

const faqContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const faqItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

function FaqItem({
  item,
  openValue,
}: {
  item: (typeof FAQ_ITEMS)[number];
  openValue: string;
}) {
  const isOpen = openValue === item.id;

  return (
    <motion.div variants={faqItem}>
      <AccordionPrimitive.Item
        value={item.id}
        className="mb-3 bg-canvas-base border border-canvas-border/50 rounded-xl px-5 overflow-hidden"
      >
        <AccordionPrimitive.Header className="flex">
          <AccordionPrimitive.Trigger className="group flex w-full items-center justify-between py-4 text-left text-canvas-text-contrast font-medium text-sm hover:text-primary-text transition-colors duration-150 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary-solid/50 focus-visible:rounded">
            <span>{item.q}</span>
            {/* Framer Motion caret — rotates 180deg when open */}
            <motion.span
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.22, ease: "easeOut" as const }}
              className="ml-4 shrink-0 text-canvas-text"
              aria-hidden="true"
            >
              <PiCaretDown />
            </motion.span>
          </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>

        <AccordionPrimitive.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
          <p className="text-canvas-text text-sm pb-4 leading-relaxed">{item.a}</p>
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    </motion.div>
  );
}

function FaqSection() {
  const [openValue, setOpenValue] = useState("");

  return (
    <section id="faq" aria-label="FAQ" className="py-24 px-6">
      {/* Section header */}
      <motion.div
        className="max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: "easeOut" as const }}
      >
        <p className="text-primary-text text-xs tracking-widest uppercase font-medium">
          FAQ
        </p>
        <h2 className="text-canvas-text-contrast text-4xl font-semibold mt-2">
          Questions you&apos;ll probably ask
        </h2>
      </motion.div>

      {/* Accordion */}
      <motion.div
        className="mt-12 max-w-3xl mx-auto"
        variants={faqContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <AccordionPrimitive.Root
          type="single"
          collapsible
          value={openValue}
          onValueChange={setOpenValue}
          className="flex w-full flex-col"
        >
          {FAQ_ITEMS.map((item) => (
            <FaqItem key={item.id} item={item} openValue={openValue} />
          ))}
        </AccordionPrimitive.Root>
      </motion.div>
    </section>
  );
}

function CtaSection() {
  return (
    <section
      aria-label="Call to action"
      className="bg-canvas-base py-16 px-6"
    >
      <motion.div
        className="max-w-4xl mx-auto bg-primary-bg border border-primary-border/50 rounded-3xl p-12 text-center relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: "easeOut" as const }}
      >

        {/* Content */}
        <div className="relative z-10">
          <div
            className="text-primary-solid text-5xl mx-auto w-fit"
          >
            <PiRocketLaunch />
          </div>

          <h2 className="text-canvas-text-contrast text-4xl font-semibold mt-4">
            Ready to ship faster?
          </h2>
          <p className="text-primary-text text-lg mt-3">
            Join dev teams already saving hours every week.
          </p>

          {/* CTA buttons */}
          <div className="mt-8 flex gap-4 justify-center flex-wrap">
            <Button
              asChild
              variant="default"
            >
              <Link href="/sign-up" id="cta-get-started">
                Get Started Free
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
            >
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                id="cta-view-github"
              >
                View GitHub
              </a>
            </Button>
          </div>

          <p className="mt-5 text-canvas-text text-xs">
            No credit card · Free for teams up to 3
          </p>
        </div>
      </motion.div>
    </section>
  );
}

export default function FAQAndCTA() {
  return (
    <>
      <WaveDivider />

      <FaqSection />

      <div
        aria-hidden="true"
        style={{ transform: "scaleX(-1)" }}
        className="bg-canvas-bg-subtle text-canvas-border/30"
      >
        <WaveDivider />
      </div>

      <CtaSection />
    </>
  );
}
