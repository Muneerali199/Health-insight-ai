"use client";

import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RiskGauge } from "@/components/risk-gauge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Mock historical data
const historicalData = [
  { 
    id: 1, 
    date: new Date(2025, 3, 10), 
    description: "Initial health check", 
    diabetesRisk: 45, 
    hypertensionRisk: 35, 
    depressionRisk: 20,
    notes: "Reported fatigue and frequent urination"
  },
  { 
    id: 2, 
    date: new Date(2025, 3, 17), 
    description: "Follow-up assessment",
    diabetesRisk: 42, 
    hypertensionRisk: 32, 
    depressionRisk: 18,
    notes: "Started daily walking routine" 
  },
  { 
    id: 3, 
    date: new Date(2025, 3, 24), 
    description: "Weekly check-in",
    diabetesRisk: 38, 
    hypertensionRisk: 30, 
    depressionRisk: 16,
    notes: "Improved diet and sleep quality"
  }
];

// Prepare data for charts
const chartData = historicalData.map(entry => ({
  date: entry.date.toLocaleDateString(),
  diabetes: entry.diabetesRisk,
  hypertension: entry.hypertensionRisk,
  depression: entry.depressionRisk,
}));

export default function HistoryPage() {
  const [selectedRecord, setSelectedRecord] = useState(historicalData[0]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Assessment History</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-5">
          <Card>
            <CardHeader>
              <CardTitle>Past Assessments</CardTitle>
              <CardDescription>
                View your previous health risk assessments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {historicalData.map(record => (
                  <Card 
                    key={record.id} 
                    className={`cursor-pointer hover:border-primary transition-colors ${
                      selectedRecord.id === record.id ? 'border-primary' : ''
                    }`}
                    onClick={() => setSelectedRecord(record)}
                  >
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base">
                        {record.description}
                      </CardTitle>
                      <CardDescription>
                        {record.date.toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">{record.notes}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-7">
          <Card>
            <CardHeader>
              <CardTitle>{selectedRecord.description}</CardTitle>
              <CardDescription>
                {selectedRecord.date.toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="risks">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="risks">Risk Assessment</TabsTrigger>
                  <TabsTrigger value="trends">Health Trends</TabsTrigger>
                </TabsList>
                
                <TabsContent value="risks" className="space-y-4 pt-4">
                  <div className="grid grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="p-4 pb-0">
                        <CardTitle className="text-sm">Diabetes</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4">
                        <RiskGauge value={selectedRecord.diabetesRisk} />
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="p-4 pb-0">
                        <CardTitle className="text-sm">Hypertension</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4">
                        <RiskGauge value={selectedRecord.hypertensionRisk} />
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="p-4 pb-0">
                        <CardTitle className="text-sm">Depression</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4">
                        <RiskGauge value={selectedRecord.depressionRisk} />
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="text-sm font-medium mb-2">Notes</h3>
                    <p className="text-sm text-muted-foreground">{selectedRecord.notes}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="trends">
                  <div className="pt-4 h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="diabetes" 
                          stroke="hsl(var(--chart-1))" 
                          name="Diabetes Risk"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="hypertension" 
                          stroke="hsl(var(--chart-2))" 
                          name="Hypertension Risk"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="depression" 
                          stroke="hsl(var(--chart-3))" 
                          name="Depression Risk"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="text-sm font-medium mb-2">Trend Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      Your health risk assessments show improvement over time. Continue with your
                      current lifestyle changes for better health outcomes.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}