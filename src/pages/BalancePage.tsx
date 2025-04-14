import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const balanceSummary = [
  { name: 'Активы', value: 4500000 },
  { name: 'Обязательства', value: 1800000 },
  { name: 'Собственный капитал', value: 2700000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const assets = [
  { name: 'Оборудование', value: 1200000 },
  { name: 'Недвижимость', value: 1500000 },
  { name: 'Денежные средства', value: 800000 },
  { name: 'Дебиторская задолженность', value: 600000 },
  { name: 'Запасы', value: 400000 },
];

const liabilities = [
  { name: 'Долгосрочные кредиты', value: 1000000 },
  { name: 'Кредиторская задолженность', value: 500000 },
  { name: 'Налоговые обязательства', value: 300000 },
];

const balanceHistory = [
  { month: 'Янв', активы: 4000000, обязательства: 1700000, капитал: 2300000 },
  { month: 'Фев', активы: 4100000, обязательства: 1750000, капитал: 2350000 },
  { month: 'Мар', активы: 4200000, обязательства: 1780000, капитал: 2420000 },
  { month: 'Апр', активы: 4350000, обязательства: 1790000, капитал: 2560000 },
  { month: 'Май', активы: 4420000, обязательства: 1810000, капитал: 2610000 },
  { month: 'Июн', активы: 4500000, обязательства: 1800000, капитал: 2700000 },
];

const financialRatios = [
  { name: "Коэффициент текущей ликвидности", value: "2.3", description: "Отношение оборотных активов к краткосрочным обязательствам" },
  { name: "Коэффициент автономии", value: "0.6", description: "Доля собственного капитала в общей сумме активов" },
  { name: "Рентабельность активов (ROA)", value: "13.3%", description: "Отношение чистой прибыли к совокупным активам" },
  { name: "Оборачиваемость активов", value: "0.67", description: "Отношение выручки к средней величине активов" },
];

const BalancePage: React.FC = () => {
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Баланс</h1>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Структура баланса на 30 июня</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={balanceSummary}
                cx="50%"
                cy="50%"
                innerRadius={100}
                outerRadius={140}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({ name, value, percent }) => 
                  `${name}: ${(percent * 100).toFixed(0)}% (₸${(value/1000000).toFixed(1)}M)`
                }
              >
                {balanceSummary.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₸${value.toLocaleString()}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Динамика баланса</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={balanceHistory}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `₸${value.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="активы" fill="#0088FE" name="Активы" />
              <Bar dataKey="обязательства" fill="#00C49F" name="Обязательства" />
              <Bar dataKey="капитал" fill="#FFBB28" name="Собственный капитал" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Структура активов</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assets.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-3"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <div className="flex-1 flex justify-between items-center">
                    <span className="font-medium">{item.name}</span>
                    <div className="text-right">
                      <div className="font-medium">₸{item.value.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">
                        {((item.value / balanceSummary[0].value) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Структура обязательств</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {liabilities.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-3"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <div className="flex-1 flex justify-between items-center">
                    <span className="font-medium">{item.name}</span>
                    <div className="text-right">
                      <div className="font-medium">₸{item.value.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">
                        {((item.value / balanceSummary[1].value) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Финансовые коэффициенты</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {financialRatios.map((ratio, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{ratio.name}</h3>
                  <span className="text-xl font-bold">{ratio.value}</span>
                </div>
                <p className="text-sm text-muted-foreground">{ratio.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default BalancePage;
