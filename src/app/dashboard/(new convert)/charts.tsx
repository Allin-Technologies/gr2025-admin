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
      <div className='my-auto w-40 space-y-2'>
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

interface ServicesMetricsProps {
  services: {
    result: {
      service: string;
      count: number;
    }[];
    count: number;
  };
}

export function ServicesMetrics(props: ServicesMetricsProps) {
  function getDynamicColor(name: string, index: number): string {
    const colors = [
      "#DCEEFB", // Lightest blue
      "#B6E0FE", // Light blue
      "#84C5F4", // Moderate blue
      "#62B0E8", // Strong blue
      "#4098D7", // Deep blue
      "#2680C2", // Darkest blue
    ];
    return colors[index % colors.length]; // Cycle through colors if index exceeds palette size
  }

  // Extract services data
  const { result } = props.services;

  // Transform data to top 5 services + 'Other'
  const sortedData = [...result].sort((a, b) => b.count - a.count);
  const topServices = sortedData.slice(0, 5);
  const otherCount = sortedData
    .slice(5)
    .reduce((sum, item) => sum + item.count, 0);

  // Final chart data
  const chartData = [
    ...topServices.map((item, index) => ({
      name: item.service,
      value: item.count,
      fill: getDynamicColor(item.service, index), // Helper to assign colors
    })),
    ...(otherCount > 0
      ? [{ name: "Other", value: otherCount, fill: "#cccccc" }]
      : []),
  ];

  // Dynamic chart config
  const chartConfig: ChartConfig = chartData.reduce((config, item) => {
    config[item.name] = {
      label: (() => {
        switch (item.name) {
          case undefined:
          case null:
          case "":
            return " - ";
          case "1":
            return "First service";
          case "2":
            return "Second service";
          case "3":
            return "Third service";
          case "4":
            return "Fourth service";
          case "21":
            return "21 Days Fasting and Prayer";
          default:
            return item.name;
        }
      })(),
      color: item.fill,
    };
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
      <div className='my-auto w-40 space-y-2'>
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
                {(() => {
                  switch (item.name) {
                    case undefined:
                    case null:
                    case "":
                      return " - ";
                    case "1":
                      return "First service";
                    case "2":
                      return "Second service";
                    case "3":
                      return "Third service";
                    case "4":
                      return "Fourth service";
                    case "21":
                      return "21 Days Fasting and Prayer";
                    default:
                      return item.name;
                  }
                })()}
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

interface AttendingViaProps {
  attending_via: {
    result: {
      service: string;
      count: number;
    }[];
    count: number;
  };
}

export function AttendingVia(props: AttendingViaProps) {
  function getDynamicColor(name: string, index: number): string {
    const colors = [
      "#E9D8FD", // Lightest purple
      "#D6BCFA", // Light purple
      "#B794F4", // Moderate purple
      "#9F7AEA", // Strong purple
      "#805AD5", // Deep purple
      "#6B46C1", // Darkest purple
    ];
    return colors[index % colors.length]; // Cycle through colors if index exceeds palette size
  }

  // Extract services data
  const { result } = props.attending_via;

  // Transform data to top 5 services + 'Other'
  const sortedData = [...result].sort((a, b) => b.count - a.count);
  const topServices = sortedData.slice(0, 5);
  const otherCount = sortedData
    .slice(5)
    .reduce((sum, item) => sum + item.count, 0);

  // Final chart data
  const chartData = [
    ...topServices.map((item, index) => ({
      name: item.service,
      value: item.count,
      fill: getDynamicColor(item.service, index), // Helper to assign colors
    })),
    ...(otherCount > 0
      ? [{ name: "Other", value: otherCount, fill: "#cccccc" }]
      : []),
  ];

  // Dynamic chart config
  const chartConfig: ChartConfig = chartData.reduce((config, item) => {
    config[item.name] = {
      label: item.name,
      color: item.fill,
    };
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
      <div className='my-auto w-40 space-y-2'>
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
