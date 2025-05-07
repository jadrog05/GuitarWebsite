// app/page.tsx

'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function LandingPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-background text-foreground overflow-hidden px-6">
      {/* Animated background blobs */}
      <motion.div
        className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] rounded-full bg-primary opacity-20 blur-[100px]"
        animate={{ x: 80, y: 80 }}
        transition={{ duration: 6, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] rounded-full bg-secondary opacity-20 blur-[100px]"
        animate={{ x: -80, y: -80 }}
        transition={{ duration: 7, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      />

      {/* Hero content with staggered animation */}
      <motion.div
        className="text-center z-10 max-w-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-br from-primary to-accent"
          variants={fadeInUp}
        >
          Master Your Practice
        </motion.h1>
        <motion.p
          className="text-muted-foreground text-lg md:text-xl mb-6"
          variants={fadeInUp}
        >
          Track your guitar goals, log sessions, and unlock your potential.
        </motion.p>
        <motion.div
          variants={fadeInUp}
        >
          <Button asChild size="lg">
            <a href="/auth/login?returnTo=/dashboard">Get Started</a>
          </Button>
        </motion.div>
      </motion.div>
    </main>
  );
}
