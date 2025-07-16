import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import { ChartTooltip } from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { getWeekSummary } from "@/services/moodEntry";
import { scaleColorVarMap, transformMoodEntriesToChart } from "@/helper/mood";
const chartConfig = {
  desktop: {
    label: "Mood",
    color: "var(--color-chart-1)",
  },
} satisfies ChartConfig;

export function MoodWeekSummary() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["moodWeekSummary"],
    queryFn: getWeekSummary,
  });

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }

  const chartData = transformMoodEntriesToChart(data);

  return (
    <Card className="bg-background/90">
      <CardHeader>
        <CardTitle>Mood Chart</CardTitle>
        <CardDescription>Reflect your mood for this week</CardDescription>
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
            <YAxis hide domain={[0, 5]} />
            <ChartTooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const entry = payload[0].payload;
                  return (
                    <div className="rounded-md bg-card p-4 text-sm shadow">
                      <div className="flex items-center gap-2 mb-1">
                        {entry.iconUrl && (
                          <img src={entry.iconUrl} alt="" className="w-5 h-5" />
                        )}
                        <strong>{entry.day}</strong>
                      </div>
                      <div>Mood: {entry.mood}</div>
                      {entry.note && (
                        <div className="italic">“{entry.note}”</div>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="scale" radius={4} fillOpacity={0.85}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    scaleColorVarMap[entry.scale - 1]?.color ??
                    "var(--color-chart-3)"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
