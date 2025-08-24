"use client"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "An area chart with gradient fill"

// const chartData = [
//   { month: "January", this_year: 186, last_year: 80 },
//   { month: "February", this_year: 305, last_year: 200 },
//   { month: "March", this_year: 237, last_year: 120 },
//   { month: "April", this_year: 73, last_year: 190 },
//   { month: "May", this_year: 209, last_year: 130 },
//   { month: "June", this_year: 214, last_year: 140 },
// ]

const chartConfig = {
  this_year: {
    label: "This Year",
    color: "var(--chart-1)",
  },
  last_year: {
    label: "Last Year",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartAreaGradient({chartData}: {chartData: any}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Graphique</CardTitle>
        <CardDescription>
          Témpératures moyennes mensuelles comparées sur deux ans
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillthis_year" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-this_year)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-this_year)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="filllast_year" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-last_year)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-last_year)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="last_year"
              type="natural"
              fill="url(#filllast_year)"
              fillOpacity={0.4}
              stroke="var(--color-last_year)"
              stackId="a"
            />
            <Area
              dataKey="this_year"
              type="natural"
              fill="url(#fillthis_year)"
              fillOpacity={0.4}
              stroke="var(--color-this_year)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
