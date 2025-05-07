"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/NavBar";

const questions = [
  {
    id: "experience",
    label: "How would you rate your guitar experience?",
    options: ["Beginner", "Intermediate", "Advanced"],
  },
  {
    id: "genres",
    label: "What are your favourite genres?",
    options: ["Rock", "Jazz", "Metal", "Pop", "Blues"],
  },
  {
    id: "artists",
    label: "Favourite artists or bands?",
    input: true,
  },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const router = useRouter();

  const current = questions[step];

  const handleNext = () => {
    if (step < questions.length - 1) setStep(step + 1);
    else {
      // You could send to your API here
      console.log("Onboarding complete", answers);
      router.push("/dashboard");
    }
  };

  const handleBack = () => setStep(Math.max(0, step - 1));

  const updateAnswer = (value: string | string[]) => {
    setAnswers((prev: any) => ({
      ...prev,
      [current.id]: value,
    }));
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 text-white flex items-center justify-center">
      <div className="w-flex bg-white rounded-xl shadow-md p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-6"
          >
            <h2 className="text-2xl font-semibold text-gray-800">{current.label}</h2>
            {current.input ? (
              <input
                type="text"
                onChange={(e) => updateAnswer(e.target.value)}
                value={answers[current.id] || ""}
                className="border p-3 rounded w-full"
                placeholder="Type your answer..."
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {current.options!.map((option) => (
                  <button
                    key={option}
                    onClick={() => updateAnswer(option)}
                    className={`px-4 py-2 rounded border text-sm ${
                      answers[current.id] === option
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-between">
          <button
            onClick={handleBack}
            disabled={step === 0}
            className="flex items-center gap-1 text-sm text-gray-500"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <button
            onClick={handleNext}
            className="bg-indigo-600 text-white px-4 py-2 rounded flex items-center gap-1"
          >
            {step === questions.length - 1 ? "Finish" : "Next"}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
