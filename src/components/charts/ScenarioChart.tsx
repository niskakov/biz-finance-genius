import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from '@/lib/utils';

interface ScenarioChartProps {
  title: string;
  data: any[];
  dataKeys: {
    actual?: string;
    optimistic: string;
    pessimistic: string;
    base?: string;
  };
  valueFormatter?: (value: number) => string;
  className?: string;
  type?: 'line' | 'area';
  currency?: 'ruble' | 'tenge';
}

const ScenarioChart: React.FC<ScenarioChartProps> = ({
  title,
  data,
  dataKeys,
  valueFormatter = (value) => `₸${value.toLocaleString()}`,
  className,
  type = 'line',
  currency = 'tenge'
}) => {
  
  const chartConfig = {
    actual: {
      label: 'Фактические данные',
      theme: {
        light: '#1a73e8',
        dark: '#1a73e8',
      },
    },
    base: {
      label: 'Базовый прогноз',
      theme: {
        light: '#34a853',
        dark: '#34a853',
      },
    },
    optimistic: {
      label: 'Оптимистичный сценарий',
      theme: {
        light: '#34a853',
        dark: '#34a853',
      },
    },
    pessimistic: {
      label: 'Пессимистичный сценарий',
      theme: {
        light: '#ea4335',
        dark: '#ea4335',
      },
    },
  };

  // Custom formatter to handle both chart needs and display formatting
  const formatTickValue = (value: any) => valueFormatter(Number(value));
  
  // Custom content formatter for tooltip that ensures correct value display
  const formatTooltipValue = (value: any) => {
    return valueFormatter(Number(value));
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-[350px]">
        <ChartContainer 
          config={chartConfig}
          className="h-full"
        >
          {type === 'line' ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatTickValue}
              />
              <ChartTooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <ChartTooltipContent 
                        active={active} 
                        payload={payload}
                        formatter={formatTooltipValue}
                      />
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              {dataKeys.actual && (
                <Line
                  type="monotone"
                  dataKey={dataKeys.actual}
                  name="Фактические данные"
                  stroke="var(--color-actual)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              )}
              {dataKeys.base && (
                <Line
                  type="monotone"
                  dataKey={dataKeys.base}
                  name="Базовый прогноз"
                  stroke="var(--color-base)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 3 }}
                />
              )}
              <Line
                type="monotone"
                dataKey={dataKeys.optimistic}
                name="Оптимистичный сценарий"
                stroke="var(--color-optimistic)"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey={dataKeys.pessimistic}
                name="Пессимистичный сценарий"
                stroke="var(--color-pessimistic)"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 3 }}
              />
            </LineChart>
          ) : (
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatTickValue}
              />
              <ChartTooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <ChartTooltipContent 
                        active={active} 
                        payload={payload}
                        formatter={formatTooltipValue}
                      />
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              {dataKeys.actual && (
                <Area
                  type="monotone"
                  dataKey={dataKeys.actual}
                  name="Фактические данные"
                  fill="var(--color-actual)"
                  stroke="var(--color-actual)"
                  fillOpacity={0.3}
                  activeDot={{ r: 6 }}
                />
              )}
              {dataKeys.base && (
                <Area
                  type="monotone"
                  dataKey={dataKeys.base}
                  name="Базовый прогноз"
                  fill="var(--color-base)"
                  stroke="var(--color-base)"
                  fillOpacity={0.2}
                  strokeDasharray="5 5"
                />
              )}
              <Area
                type="monotone"
                dataKey={dataKeys.optimistic}
                name="Оптимистичный сценарий"
                fill="var(--color-optimistic)"
                stroke="var(--color-optimistic)"
                fillOpacity={0.1}
                strokeDasharray="5 5"
              />
              <Area
                type="monotone"
                dataKey={dataKeys.pessimistic}
                name="Пессимистичный сценарий"
                fill="var(--color-pessimistic)"
                stroke="var(--color-pessimistic)"
                fillOpacity={0.1}
                strokeDasharray="5 5"
              />
            </AreaChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ScenarioChart;
