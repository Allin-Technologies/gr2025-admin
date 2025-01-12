"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { clsxm } from "@/hooks/clsxm";

const chartConfig = {
  alta_call: {
    label: "Altar Call",
  },
  male: {
    label: "Male",
    color: "#0F973D",
  },
  female: {
    label: "Female",
    color: "#036b26",
  },
} satisfies ChartConfig;

interface GenderMetricsProps {
  male: number;
  female: number;
}

export function GenderMetrics(props: GenderMetricsProps) {
  const chartData = [
    { gender: "male", alta_call: props.male, fill: "var(--color-male)" },
    { gender: "female", alta_call: props.female, fill: "var(--color-female)" },
  ];

  return (
    <div className='flex-1 pb-0 w-[284px]'>
      <ChartContainer
        config={chartConfig}
        className='mx-auto aspect-square max-h-[250px]'
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey='alta_call'
            nameKey='gender'
            stroke='0'
          />
        </PieChart>
      </ChartContainer>
    </div>
  );
}

// Helper function to assign dynamic colors
function getDynamicColor(name: string, index: number): string {
  const colors = [
    "#FCD2C2",
    "#F77A4A",
    "#F56630",
    "#EB5017",
    "#DF5421",
    "#CC400C",
  ];
  return colors[index];
}

interface CountriesMetricsProps {
  countries: {
    result: {
      country: string;
      count: number;
    }[];
    count: number;
  };
}

export function CountriesMetrics(props: CountriesMetricsProps) {
  // Extract countries data
  const { result } = props.countries;

  // Transform data to top 5 countries + 'Other'
  const sortedData = [...result].sort((a, b) => b.count - a.count);
  const topCountries = sortedData.slice(0, 5);
  const otherCount = sortedData
    .slice(5)
    .reduce((sum, item) => sum + item.count, 0);

  // Final chart data
  const chartData = [
    ...topCountries.map((item, index) => ({
      name: item.country,
      value: item.count,
      fill: getDynamicColor(item.country, index), // Helper to assign colors
    })),
    ...(otherCount > 0
      ? [{ name: "Other", value: otherCount, fill: "#cccccc" }]
      : []),
  ];

  // Dynamic chart config
  const chartConfig: ChartConfig = chartData.reduce((config, item) => {
    config[item.name] = { label: item.name, color: item.fill };
    return config;
  }, {} as ChartConfig);

  return (
    <div className='flex'>
      <div className='flex-1 pb-0 w-[284px]'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-[250px]'
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey='value' nameKey='name' stroke='0' />
          </PieChart>
        </ChartContainer>
      </div>
      <div className='my-auto w-60 space-y-2'>
        {chartData?.map((item, index) => (
          <div
            key={index}
            className='flex justify-between items-center gap-2 w-full'
          >
            <div className='justify-start items-center gap-2 flex'>
              <div
                className='w-2 h-2 rounded-full'
                style={{ background: item.fill }}
              />
              <span className='text-[#667185] text-sm font-normal'>
                {item.name}
              </span>
            </div>
            <span className='text-right text-[#101828] text-sm font-medium'>
              {item?.value?.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
