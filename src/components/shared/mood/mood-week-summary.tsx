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
import { useIsDemo } from "@/context/demoContext";
import { demoChartData } from "@/data/demo/mood";

const chartConfig = {
  desktop: {
    label: "Mood",
    color: "var(--color-chart-1)",
  },
} satisfies ChartConfig;

export function MoodWeekSummary() {
  const isDemo = useIsDemo();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["moodWeekSummary"],
    queryFn: getWeekSummary,
    enabled: !isDemo,
  });

  const chartData = data
    ? transformMoodEntriesToChart(data)
    : isDemo
      ? demoChartData
      : [];

  return (
    <Card className="bg-background/90">
      <CardHeader>
        <CardTitle>Mood Chart</CardTitle>
        <CardDescription>Reflect your mood for this week</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="min-h-[200px] w-full flex items-center justify-center"
        >
          {isLoading ? (
            <p className="text-muted-foreground text-sm">
              Loading mood data...
            </p>
          ) : isError ? (
            <p className="text-destructive text-sm">
              Failed to load mood data 😢
            </p>
          ) : chartData.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              No mood data available for this week.
            </p>
          ) : (
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
                            <img
                              src={entry.iconUrl}
                              alt=""
                              className="w-5 h-5"
                            />
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
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
