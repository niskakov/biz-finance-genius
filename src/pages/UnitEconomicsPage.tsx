
import React from 'react';
import Layout from '@/components/Layout';
import UnitEconomicsTable from '@/components/tables/UnitEconomicsTable';
import ScenarioChart from '@/components/charts/ScenarioChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const unitEconomicsData = [
  { 
    metric: "CAC (Стоимость привлечения клиента)", 
    value: 5000, 
    change: -2.5, 
    description: "Средняя стоимость привлечения одного нового клиента" 
  },
  { 
    metric: "LTV (Пожизненная ценность клиента)", 
    value: 35000, 
    change: 5.3, 
    description: "Прогнозируемый доход, который клиент принесет за все время сотрудничества" 
  },
  { 
    metric: "ARPU (Средний доход на пользователя)", 
    value: 2500, 
    change: 3.1, 
    description: "Средний доход, генерируемый одним пользователем за период" 
  },
  { 
    metric: "Конверсия", 
    value: "3.2%", 
    change: 0.4, 
    description: "Процент посетителей, совершивших целевое действие" 
  },
  { 
    metric: "Маржинальность", 
    value: "42%", 
    change: 1.5, 
    description: "Отношение маржинальной прибыли к выручке" 
  },
  { 
    metric: "LTV/CAC", 
    value: "7.0", 
    change: 8.0, 
    description: "Отношение LTV к CAC (должно быть > 3)" 
  },
  { 
    metric: "Окупаемость CAC", 
    value: "5 месяцев", 
    change: -1.0, 
    description: "Время, за которое окупаются затраты на привлечение клиента" 
  },
];

const forecastData = [
  { month: "Янв", базовый: 2500, оптимистичный: 2800, пессимистичный: 2200 },
  { month: "Фев", базовый: 2600, оптимистичный: 3000, пессимистичный: 2250 },
  { month: "Мар", базовый: 2650, оптимистичный: 3100, пессимистичный: 2300 },
  { month: "Апр", базовый: 2700, оптимистичный: 3200, пессимистичный: 2320 },
  { month: "Май", базовый: 2800, оптимистичный: 3350, пессимистичный: 2370 },
  { month: "Июн", базовый: 2850, оптимистичный: 3400, пессимистичный: 2400 },
  { month: "Июл", базовый: 2900, оптимистичный: 3450, пессимистичный: 2420 },
  { month: "Авг", базовый: 2950, оптимистичный: 3500, пессимистичный: 2470 },
  { month: "Сен", базовый: 3000, оптимистичный: 3600, пессимистичный: 2500 },
  { month: "Окт", базовый: 3050, оптимистичный: 3650, пессимистичный: 2550 },
  { month: "Ноя", базовый: 3100, оптимистичный: 3700, пессимистичный: 2580 },
  { month: "Дек", базовый: 3200, оптимистичный: 3800, пессимистичный: 2600 },
];

const UnitEconomicsPage: React.FC = () => {
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Юнит-экономика</h1>
      </div>

      <div className="mb-8">
        <UnitEconomicsTable 
          data={unitEconomicsData}
          title="Ключевые показатели юнит-экономики"
        />
      </div>

      <Tabs defaultValue="chart" className="mb-8">
        <TabsList>
          <TabsTrigger value="chart">График</TabsTrigger>
          <TabsTrigger value="table">Таблица</TabsTrigger>
        </TabsList>
        <TabsContent value="chart">
          <ScenarioChart
            title="Прогноз ARPU (средний доход на пользователя)"
            data={forecastData}
            dataKeys={{
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
            title="Прогноз ARPU (средний доход на пользователя)"
            data={forecastData}
            columns={[
              { key: "month", header: "Месяц" },
              { key: "базовый", header: "Базовый сценарий" },
              { key: "оптимистичный", header: "Оптимистичный сценарий" },
              { key: "пессимистичный", header: "Пессимистичный сценарий" },
            ]}
            valueFormatter={(value) => `₸${value.toLocaleString()}`}
          />
        </TabsContent>
      </Tabs>

      <Tabs defaultValue="chart" className="mb-8">
        <TabsList>
          <TabsTrigger value="chart">График</TabsTrigger>
          <TabsTrigger value="table">Таблица</TabsTrigger>
        </TabsList>
        <TabsContent value="chart">
          <ScenarioChart
            title="Прогноз LTV/CAC"
            data={[
              { month: "Янв", базовый: 5.2, оптимистичный: 6.0, пессимистичный: 4.5 },
              { month: "Фев", базовый: 5.4, оптимистичный: 6.2, пессимистичный: 4.6 },
              { month: "Мар", базовый: 5.7, оптимистичный: 6.5, пессимистичный: 4.8 },
              { month: "Апр", базовый: 5.9, оптимистичный: 6.8, пессимистичный: 5.0 },
              { month: "Май", базовый: 6.2, оптимистичный: 7.0, пессимистичный: 5.2 },
              { month: "Июн", базовый: 6.5, оптимистичный: 7.3, пессимистичный: 5.3 },
              { month: "Июл", базовый: 6.7, оптимистичный: 7.5, пессимистичный: 5.5 },
              { month: "Авг", базовый: 6.8, оптимистичный: 7.7, пессимистичный: 5.7 },
              { month: "Сен", базовый: 6.9, оптимистичный: 7.9, пессимистичный: 5.8 },
              { month: "Окт", базовый: 7.0, оптимистичный: 8.0, пессимистичный: 6.0 },
              { month: "Ноя", базовый: 7.1, оптимистичный: 8.2, пессимистичный: 6.1 },
              { month: "Дек", базовый: 7.3, оптимистичный: 8.5, пессимистичный: 6.3 },
            ]}
            dataKeys={{
              base: "базовый",
              optimistic: "оптимистичный",
              pessimistic: "пессимистичный"
            }}
            type="line"
            valueFormatter={(value) => value.toFixed(1)}
          />
        </TabsContent>
        <TabsContent value="table">
          <ScenarioTable
            title="Прогноз LTV/CAC"
            data={[
              { month: "Янв", базовый: 5.2, оптимистичный: 6.0, пессимистичный: 4.5 },
              { month: "Фев", базовый: 5.4, оптимистичный: 6.2, пессимистичный: 4.6 },
              { month: "Мар", базовый: 5.7, оптимистичный: 6.5, пессимистичный: 4.8 },
              { month: "Апр", базовый: 5.9, оптимистичный: 6.8, пессимистичный: 5.0 },
              { month: "Май", базовый: 6.2, оптимистичный: 7.0, пессимистичный: 5.2 },
              { month: "Июн", базовый: 6.5, оптимистичный: 7.3, пессимистичный: 5.3 },
              { month: "Июл", базовый: 6.7, оптимистичный: 7.5, пессимистичный: 5.5 },
              { month: "Авг", базовый: 6.8, оптимистичный: 7.7, пессимистичный: 5.7 },
              { month: "Сен", базовый: 6.9, оптимистичный: 7.9, пессимистичный: 5.8 },
              { month: "Окт", базовый: 7.0, оптимистичный: 8.0, пессимистичный: 6.0 },
              { month: "Ноя", базовый: 7.1, оптимистичный: 8.2, пессимистичный: 6.1 },
              { month: "Дек", базовый: 7.3, оптимистичный: 8.5, пессимистичный: 6.3 },
            ]}
            columns={[
              { key: "month", header: "Месяц" },
              { key: "базовый", header: "Базовый сценарий", valueFormatter: (v) => v.toFixed(1) },
              { key: "оптимистичный", header: "Оптимистичный сценарий", valueFormatter: (v) => v.toFixed(1) },
              { key: "пессимистичный", header: "Пессимистичный сценарий", valueFormatter: (v) => v.toFixed(1) },
            ]}
            valueFormatter={(value) => value.toFixed(1)}
          />
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default UnitEconomicsPage;
