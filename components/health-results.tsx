"use client";

import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RiskGauge } from "@/components/risk-gauge";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";

type HealthAssessment = {
  diabetesRisk: number;
  hypertensionRisk: number;
  depressionRisk: number;
  recommendations: string[];
  explanation: string;
};

export function HealthResults({ assessment }: { assessment: HealthAssessment }) {
  const getRiskLevel = (score: number) => {
    if (score < 33) return { level: "Low", color: "text-emerald-500" };
    if (score < 66) return { level: "Moderate", color: "text-amber-500" };
    return { level: "High", color: "text-red-500" };
  };

  const getRiskIcon = (score: number) => {
    if (score < 33) return <CheckCircle className="h-5 w-5 text-emerald-500" />;
    if (score < 66) return <Info className="h-5 w-5 text-amber-500" />;
    return <AlertTriangle className="h-5 w-5 text-red-500" />;
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Health Risk Assessment</CardTitle>
        <CardDescription>
          Analysis based on your provided information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="risks" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="risks">Risk Analysis</TabsTrigger>
            <TabsTrigger value="recommendations">Action Plan</TabsTrigger>
            <TabsTrigger value="explanation">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="risks" className="space-y-6 pt-4">
            <div className="space-y-6">
              <div className="bg-card rounded-lg p-4 border">
                <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  {getRiskIcon(assessment.diabetesRisk)}
                  Diabetes Risk Assessment
                </h4>
                <div className="mb-4">
                  <RiskGauge value={assessment.diabetesRisk} />
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Risk Level:</span>
                  <span className={getRiskLevel(assessment.diabetesRisk).color}>
                    {getRiskLevel(assessment.diabetesRisk).level}
                  </span>
                </div>
              </div>

              <div className="bg-card rounded-lg p-4 border">
                <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  {getRiskIcon(assessment.hypertensionRisk)}
                  Hypertension Risk Assessment
                </h4>
                <div className="mb-4">
                  <RiskGauge value={assessment.hypertensionRisk} />
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Risk Level:</span>
                  <span className={getRiskLevel(assessment.hypertensionRisk).color}>
                    {getRiskLevel(assessment.hypertensionRisk).level}
                  </span>
                </div>
              </div>

              <div className="bg-card rounded-lg p-4 border">
                <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  {getRiskIcon(assessment.depressionRisk)}
                  Depression Risk Assessment
                </h4>
                <div className="mb-4">
                  <RiskGauge value={assessment.depressionRisk} />
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Risk Level:</span>
                  <span className={getRiskLevel(assessment.depressionRisk).color}>
                    {getRiskLevel(assessment.depressionRisk).level}
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="pt-4">
            <div className="space-y-4">
              {assessment.recommendations.map((rec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-lg p-4 border flex items-start gap-3 hover:bg-accent/50 transition-colors"
                >
                  <div className="bg-primary/10 text-primary h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm">{rec}</p>
                  </div>
                </motion.div>
              ))}

              <div className="mt-6 bg-muted/50 rounded-lg p-4">
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Next Steps
                </h4>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• Schedule a follow-up with your healthcare provider</li>
                  <li>• Keep track of your symptoms and changes</li>
                  <li>• Implement the recommended lifestyle changes gradually</li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="explanation" className="pt-4">
            <div className="space-y-4">
              <div className="bg-card rounded-lg p-4 border">
                <h4 className="text-lg font-semibold mb-3">Analysis Summary</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {assessment.explanation}
                </p>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="text-sm font-medium mb-2">Key Factors Considered</h4>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                    <span>Reported symptoms and health concerns</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                    <span>Medical history and family background</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                    <span>Current lifestyle and habits</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 border-t pt-4">
          <p className="text-xs text-muted-foreground">
            <strong>Important Notice:</strong> This assessment is for informational purposes only and does not constitute medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals for medical decisions.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}