import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer
} from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
export const description = "A simple area chart"
const chartData = [
  { day: "Monday", scale: 5, mood: "Grateful" },
  { day: "Tuesday", scale: 3, mood: "Okay" },
  { day: "Wednesday", scale: 1, mood: "Stressed" },
  { day: "Thursday", scale: 5, mood: "Grateful" },
  { day: "Friday", scale: 4, mood: "Calm" },
  { day: "Saturday", scale: 5, mood: "Grateful" },
  { day: "Sunday", scale: 2, mood: "Low" },
]
const chartConfig = {
  desktop: {
    label: "Mood",
    color: "var(--color-chart-1)",
  },
} satisfies ChartConfig

export function WeekMoodSummary() {
  return (
    <Card className="bg-background/90">
      <CardHeader>
        <CardTitle>Mood Chart</CardTitle>
        <CardDescription>
          Reflect your mood for this week
        </CardDescription>
      </CardHeader>
      <CardContent>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
      <CartesianGrid vertical={false} />
        <XAxis
        dataKey="day"
        tickLine={false}
        tickMargin={10}
        axisLine={false}
        tickFormatter={(value) => value.slice(0, 3)}
      />
      <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="scale" fill="var(--color-desktop)" radius={4} />
        
      </BarChart>
    </ChartContainer>
      </CardContent>
    </Card>
  )
}