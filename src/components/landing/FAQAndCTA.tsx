"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { PiCaretDown, PiRocketLaunch } from "react-icons/pi";
import Link from "next/link";
import WaveDivider from "@/components/animations/WaveDivider";
import { Button } from "@/components/ui/button";

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

function FaqItem({ item, openValue }: { item: (typeof FAQ_ITEMS)[number]; openValue: string }) {
  const isOpen = openValue === item.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <AccordionPrimitive.Item
        value={item.id}
        className="mb-3 bg-canvas-base border border-canvas-border/50 rounded-xl px-5 overflow-hidden"
      >
        <AccordionPrimitive.Header className="flex">
          <AccordionPrimitive.Trigger className="group flex w-full items-center justify-between py-4 text-left text-canvas-text-contrast font-medium text-sm hover:text-primary-text transition-colors outline-none">
            <span>{item.q}</span>
            <motion.span
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.22 }}
              className="ml-4 shrink-0 text-canvas-text"
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
    <section id="faq" className="py-24 px-6">
      <motion.div
        className="max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-primary-text text-xs tracking-widest uppercase font-medium">FAQ</p>
        <h2 className="text-canvas-text-contrast text-4xl font-semibold mt-2">Questions you&apos;ll probably ask</h2>
      </motion.div>

      <motion.div
        className="mt-12 max-w-3xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
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
    <section id="cta" className="bg-canvas-base py-16 px-6">
      <motion.div
        className="max-w-4xl mx-auto bg-primary-bg border border-primary-border/50 rounded-3xl p-12 text-center"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <div className="text-primary-solid text-5xl mx-auto w-fit">
          <PiRocketLaunch />
        </div>

        <h2 className="text-canvas-text-contrast text-4xl font-semibold mt-4">Ready to ship faster?</h2>
        <p className="text-primary-text text-lg mt-3">Join dev teams already saving hours every week.</p>

        <div className="mt-8 flex gap-4 justify-center flex-wrap">
          <Button asChild variant="default">
            <Link href="/sign-up">Get Started Free</Link>
          </Button>
          <Button asChild variant="outline">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              View GitHub
            </a>
          </Button>
        </div>

        <p className="mt-5 text-canvas-text text-xs">No credit card · Free for teams up to 3</p>
      </motion.div>
    </section>
  );
}

export default function FAQAndCTA() {
  return (
    <>
      <WaveDivider />
      <FaqSection />
      <div style={{ transform: "scaleX(-1)" }} className="bg-canvas-bg-subtle text-canvas-border/30">
        <WaveDivider />
      </div>
      <CtaSection />
    </>
  );
}