"use client";

import { motion } from "framer-motion";
import { ChevronRight, Heart, Brain, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function LandingHero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-24 lg:py-32">
      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Your Personal
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 ml-2">
                AI Health Assistant
              </span>
            </h1>
          </motion.div>
          
          <motion.p 
            className="mt-6 text-lg leading-8 text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Get instant health insights by describing your symptoms in everyday language. 
            Our AI analyzes your health data to provide personalized risk assessments 
            and recommendations for common conditions.
          </motion.p>
          
          <motion.div 
            className="mt-10 flex items-center justify-center gap-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link href="/auth">
              <Button size="lg" className="px-6">
                Get Started
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#features" className="text-sm font-semibold leading-6">
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>
      </div>
      
      <div className="mt-16 flex justify-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative"
        >
          <div className="bg-gradient-to-b from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-blue-800/10 p-8 rounded-2xl shadow-lg">
            <Heart className="h-10 w-10 text-chart-1 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Cardiovascular Health</h3>
            <p className="text-muted-foreground">Predict hypertension and related risks</p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative"
        >
          <div className="bg-gradient-to-b from-teal-100 to-teal-50 dark:from-teal-900/20 dark:to-teal-800/10 p-8 rounded-2xl shadow-lg">
            <Droplets className="h-10 w-10 text-chart-2 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Diabetes Risk</h3>
            <p className="text-muted-foreground">Assess your risk of developing diabetes</p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative"
        >
          <div className="bg-gradient-to-b from-amber-100 to-amber-50 dark:from-amber-900/20 dark:to-amber-800/10 p-8 rounded-2xl shadow-lg">
            <Brain className="h-10 w-10 text-chart-4 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Mental Wellbeing</h3>
            <p className="text-muted-foreground">Depression and anxiety screening</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}