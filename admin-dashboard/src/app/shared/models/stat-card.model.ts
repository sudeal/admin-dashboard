export type Trend = "up" | "down";

export type StatCard = {
  title?: string;
  titleKey?: string;  // Translation key for title
  value: string;
  description?: string;
  descriptionKey?: string;  // Translation key for description
  trend: Trend;
  icon: string; 
  tone: "purple" | "yellow" | "green" | "orange";
};
