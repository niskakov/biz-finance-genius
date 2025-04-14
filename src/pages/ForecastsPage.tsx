
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import ScenarioChart from '@/components/charts/ScenarioChart';
import ScenarioTable from '@/components/tables/ScenarioTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const revenueData = [
  { month: "Янв", фактический: 12500000, базовый: 13000000, оптимистичный: 14000000, пессимистичный: 11000000 },
  { month: "Фев", фактический: 13000000, базовый: 13500000, оптимистичный: 14500000, пессимистичный: 11500000 },
  { month: "Мар", фактический: 14000000, базовый: 14500000, оптимистичный: 15500000, пессимистичный: 12500000 },
  { month: "Апр", фактический: 14500000, базовый: 15000000, оптимистичный: 16000000, пессимистичный: 13000000 },
  { month: "Май", фактический: 15000000, базовый: 15500000, оптимистичный: 16500000, пессимистичный: 13500000 },
  { month: "Июн", фактический: 15500000, базовый: 16000000, оптимистичный: 17000000, пессимистичный: 14000000 },
  { month: "Июл", фактический: null, базовый: 16500000, оптимистичный: 17500000, пессимистичный: 14500000 },
  { month: "Авг", фактический: null, базовый: 17000000, оптимистичный: 18000000, пессимистичный: 15000000 },
  { month: "Сен", фактический: null, базовый: 17500000, оптимистичный: 18500000, пессимистичный: 15500000 },
  { month: "Окт", фактический: null, базовый: 18000000, оптимистичный: 19000000, пессимистичный: 16000000 },
  { month: "Ноя", фактический: null, базовый: 18500000, оптимистичный: 19500000, пессимистичный: 16500000 },
  { month: "Дек", фактический: null, базовый: 19000000, оптимистичный: 20000000, пессимистичный: 17000000 },
];

const profitData = [
  { month: "Янв", фактический: 3750000, базовый: 3900000, оптимистичный: 4200000, пессимистичный: 3300000 },
  { month: "Фев", фактический: 3900000, базовый: 4050000, оптимистичный: 4350000, пессимистичный: 3450000 },
  { month: "Мар", фактический: 4200000, базовый: 4350000, оптимистичный: 4650000, пессимистичный: 3750000 },
  { month: "Апр", фактический: 4350000, базовый: 4500000, оптимистичный: 4800000, пессимистичный: 3900000 },
  { month: "Май", фактический: 4500000, базовый: 4650000, оптимистичный: 4950000, пессимистичный: 4050000 },
  { month: "Июн", фактический: 4650000, базовый: 4800000, оптимистичный: 5100000, пессимистичный: 4200000 },
  { month: "Июл", фактический: null, базовый: 4950000, оптимистичный: 5250000, пессимистичный: 4350000 },
  { month: "Авг", фактический: null, базовый: 5100000, оптимистичный: 5400000, пессимистичный: 4500000 },
  { month: "Сен", фактический: null, базовый: 5250000, оптимистичный: 5550000, пессимистичный: 4650000 },
  { month: "Окт", фактический: null, базовый: 5400000, оптимистичный: 5700000, пессимистичный: 4800000 },
  { month: "Ноя", фактический: null, базовый: 5550000, оптимистичный: 5850000, пессимистичный: 4950000 },
  { month: "Дек", фактический: null, базовый: 5700000, оптимистичный: 6000000, пессимистичный: 5100000 },
];

const cashFlowData = [
  { month: "Янв", фактический: 2500000, базовый: 2600000, оптимистичный: 2800000, пессимистичный: 2200000 },
  { month: "Фев", фактический: 2600000, базовый: 2700000, оптимистичный: 2900000, пессимистичный: 2300000 },
  { month: "Мар", фактический: 2800000, базовый: 2900000, оптимистичный: 3100000, пессимистичный: 2500000 },
  { month: "Апр", фактический: 2900000, базовый: 3000000, оптимистичный: 3200000, пессимистичный: 2600000 },
  { month: "Май", фактический: 3000000, базовый: 3100000, оптимистичный: 3300000, пессимистичный: 2700000 },
  { month: "Июн", фактический: 3100000, базовый: 3200000, оптимистичный: 3400000, пессимистичный: 2800000 },
  { month: "Июл", фактический: null, базовый: 3300000, оптимистичный: 3500000, пессимистичный: 2900000 },
  { month: "Авг", фактический: null, базовый: 3400000, оптимистичный: 3600000, пессимистичный: 3000000 },
  { month: "Сен", фактический: null, базовый: 3500000, оптимистичный: 3700000, пессимистичный: 3100000 },
  { month: "Окт", фактический: null, базовый: 3600000, оптимистичный: 3800000, пессимистичный: 3200000 },
  { month: "Ноя", фактический: null, базовый: 3700000, оптимистичный: 3900000, пессимистичный: 3300000 },
  { month: "Дек", фактический: null, базовый: 3800000, оптимистичный: 4000000, пессимистичный: 3400000 },
];

const ForecastsPage: React.FC = () => {
  const [forecastType, setForecastType] = useState("revenue");
  
  // Select data based on forecastType
  const getData = () => {
    switch (forecastType) {
      case "revenue":
        return { 
          data: revenueData, 
          title: "Прогноз выручки",
          description: "Прогноз выручки на 12 месяцев с разбивкой по сценариям"
        };
      case "profit":
        return { 
          data: profitData, 
          title: "Прогноз прибыли",
          description: "Прогноз чистой прибыли на 12 месяцев с разбивкой по сценариям"
        };
      case "cashflow":
        return { 
          data: cashFlowData, 
          title: "Прогноз денежного потока",
          description: "Прогноз чистого денежного потока на 12 месяцев с разбивкой по сценариям"
        };
      default:
        return { 
          data: revenueData, 
          title: "Прогноз выручки",
          description: "Прогноз выручки на 12 месяцев с разбивкой по сценариям"
        };
    }
  };
  
  const { data, title, description } = getData();

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Финансовые прогнозы</h1>
        <Select value={forecastType} onValueChange={setForecastType}>
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Выберите тип прогноза" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="revenue">Прогноз выручки</SelectItem>
            <SelectItem value="profit">Прогноз прибыли</SelectItem>
            <SelectItem value="cashflow">Прогноз денежного потока</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>

      <Tabs defaultValue="chart" className="mb-8">
        <TabsList>
          <TabsTrigger value="chart">График</TabsTrigger>
          <TabsTrigger value="table">Таблица</TabsTrigger>
        </TabsList>
        <TabsContent value="chart">
          <ScenarioChart
            title={title}
            data={data}
            dataKeys={{
              actual: "фактический",
              base: "базовый",
              optimistic: "оптимистичный",
              pessimistic: "пессимистичный"
            }}
            type="line"
            valueFormatter={(value) => `₸${value.toLocaleString()}`}
          />
        </TabsContent>
        <TabsContent value="table">
          <ScenarioTable
            title={title}
            data={data}
            columns={[
              { key: "month", header: "Месяц" },
              { key: "фактический", header: "Фактические данные" },
              { key: "базовый", header: "Базовый сценарий" },
              { key: "оптимистичный", header: "Оптимистичный сценарий" },
              { key: "пессимистичный", header: "Пессимистичный сценарий" },
            ]}
            valueFormatter={(value) => `₸${value.toLocaleString()}`}
          />
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default ForecastsPage;
