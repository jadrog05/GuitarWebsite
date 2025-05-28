'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useRouter } from 'next/navigation'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function LandingPage() {
  const reduceMotion = useReducedMotion();
  const router = useRouter();

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-background text-foreground overflow-hidden px-6">

      <motion.div
        className="text-center z-10 max-w-2xl"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.3 } } }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-br from-primary to-accent"
          variants={fadeInUp}
        >
          Master Your Craft
        </motion.h1>

        <motion.p
          className="text-muted-foreground text-lg md:text-xl mb-6"
          variants={fadeInUp}
        >
          Track your guitar goals, log sessions, and unlock your potential.
        </motion.p>

        <motion.div variants={fadeInUp}>
          <motion.button
            initial={reduceMotion ? {} : {
              scale: 0,
              opacity: 0,
              borderRadius: "20%",
            }}
            animate={reduceMotion ? {} : {
              scale: 1,
              opacity: 1,
              borderRadius: "8px",
            }}
            transition={{
              duration: 0.4,
              scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}

            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg shadow-md"
            onClick={() =>  router.push("/dashboard")}
          >
            Get Started
          </motion.button>
        </motion.div>
      </motion.div>
    </main>
  );
}
