"use client";

import { motion } from "framer-motion";
import { 
  BrainCog, 
  LineChart, 
  ShieldCheck, 
  MessageSquareText,
  History,
  BarChartHorizontal
} from "lucide-react";

const features = [
  {
    icon: <BrainCog className="h-8 w-8" />,
    title: "AI-Powered Analysis",
    description:
      "Our advanced machine learning models analyze your symptoms and health data to provide personalized insights.",
  },
  {
    icon: <LineChart className="h-8 w-8" />,
    title: "Risk Visualizations",
    description:
      "See your risk factors clearly illustrated with intuitive charts and graphs.",
  },
  {
    icon: <MessageSquareText className="h-8 w-8" />,
    title: "Natural Conversation",
    description:
      "Describe your symptoms in everyday language. Our NLP system understands what you mean.",
  },
  {
    icon: <ShieldCheck className="h-8 w-8" />,
    title: "Privacy First",
    description:
      "Your health data never leaves your device. All processing happens locally for maximum privacy.",
  },
  {
    icon: <History className="h-8 w-8" />,
    title: "Track Progress",
    description:
      "Save your assessments and track how your health changes over time.",
  },
  {
    icon: <BarChartHorizontal className="h-8 w-8" />,
    title: "Detailed Explanations",
    description:
      "Understand exactly which factors contribute to your risk scores with clear breakdowns.",
  },
];

export function Features() {
  return (
    <section id="features\" className="py-20 bg-secondary/50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI health assistant combines cutting-edge technology with an intuitive interface to help you monitor and understand your health.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-all border"
            >
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4 text-primary">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}