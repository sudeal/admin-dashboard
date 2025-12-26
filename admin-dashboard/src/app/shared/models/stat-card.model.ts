export type Trend = "up" | "down";

export type StatCard = {
  title: string;
  value: string;
  description: string;
  trend: Trend;
  icon: string; 
  tone: "purple" | "yellow" | "green" | "orange";
};
