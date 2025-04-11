
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
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
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

// Sample data
const monthlyProfitLoss = [
  { month: 'Янв', выручка: 500000, себестоимость: 280000, валовая_прибыль: 220000, расходы: 150000, чистая_прибыль: 70000 },
  { month: 'Фев', выручка: 650000, себестоимость: 360000, валовая_прибыль: 290000, расходы: 160000, чистая_прибыль: 130000 },
  { month: 'Мар', выручка: 620000, себестоимость: 350000, валовая_прибыль: 270000, расходы: 260000, чистая_прибыль: 10000 },
  { month: 'Апр', выручка: 700000, себестоимость: 380000, валовая_прибыль: 320000, расходы: 170000, чистая_прибыль: 150000 },
  { month: 'Май', выручка: 680000, себестоимость: 370000, валовая_прибыль: 310000, расходы: 200000, чистая_прибыль: 110000 },
  { month: 'Июн', выручка: 750000, себестоимость: 400000, валовая_прибыль: 350000, расходы: 200000, чистая_прибыль: 150000 },
];

const expenseBreakdown = [
  { name: 'Аренда', value: 90000 },
  { name: 'Зарплаты', value: 320000 },
  { name: 'Маркетинг', value: 65000 },
  { name: 'Коммунальные услуги', value: 40000 },
  { name: 'Налоги', value: 85000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const revenueBreakdown = [
  { name: 'Товар A', value: 420000 },
  { name: 'Товар B', value: 180000 },
  { name: 'Услуга C', value: 150000 },
];

const financialMetrics = [
  { name: "Рентабельность продаж", value: "20%", change: 2.5 },
  { name: "Валовая маржа", value: "46.7%", change: 1.2 },
  { name: "Операционная маржа", value: "24%", change: -0.8 },
  { name: "Чистая прибыль", value: "₽150,000", change: 36.4 },
];

const ProfitLossPage: React.FC = () => {
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Прибыль и убытки</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {financialMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex flex-col">
                <p className="text-sm font-medium text-muted-foreground">{metric.name}</p>
                <div className="flex items-center mt-2">
                  <span className="text-2xl font-bold">{metric.value}</span>
                  <div className="ml-auto flex items-center">
                    {metric.change > 0 ? (
                      <div className="flex items-center text-green-600">
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        <span className="text-sm">{metric.change}%</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-600">
                        <ArrowDownRight className="h-4 w-4 mr-1" />
                        <span className="text-sm">{Math.abs(metric.change)}%</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Динамика прибыли и убытков</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={monthlyProfitLoss}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `₽${value.toLocaleString()}`} />
              <Legend />
              <Line
                type="monotone"
                dataKey="выручка"
                stroke="#1a73e8"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="валовая_прибыль"
                stroke="#34a853"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="чистая_прибыль"
                stroke="#fbbc05"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Структура доходов</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {revenueBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₽${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Структура расходов</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {expenseBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₽${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Полный отчет о прибылях и убытках</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Статья</th>
                  <th className="text-right py-3 px-4 font-medium">Янв</th>
                  <th className="text-right py-3 px-4 font-medium">Фев</th>
                  <th className="text-right py-3 px-4 font-medium">Мар</th>
                  <th className="text-right py-3 px-4 font-medium">Апр</th>
                  <th className="text-right py-3 px-4 font-medium">Май</th>
                  <th className="text-right py-3 px-4 font-medium">Июн</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Выручка</td>
                  {monthlyProfitLoss.map((month, i) => (
                    <td key={i} className="text-right py-3 px-4">
                      ₽{month.выручка.toLocaleString()}
                    </td>
                  ))}
                </tr>
                <tr className="border-b bg-muted/30">
                  <td className="py-3 px-4 font-medium">Себестоимость</td>
                  {monthlyProfitLoss.map((month, i) => (
                    <td key={i} className="text-right py-3 px-4 text-red-600">
                      -₽{month.себестоимость.toLocaleString()}
                    </td>
                  ))}
                </tr>
                <tr className="border-b font-medium">
                  <td className="py-3 px-4">Валовая прибыль</td>
                  {monthlyProfitLoss.map((month, i) => (
                    <td key={i} className="text-right py-3 px-4 text-green-600">
                      ₽{month.валовая_прибыль.toLocaleString()}
                    </td>
                  ))}
                </tr>
                <tr className="border-b bg-muted/30">
                  <td className="py-3 px-4 font-medium">Операционные расходы</td>
                  {monthlyProfitLoss.map((month, i) => (
                    <td key={i} className="text-right py-3 px-4 text-red-600">
                      -₽{month.расходы.toLocaleString()}
                    </td>
                  ))}
                </tr>
                <tr className="font-bold bg-primary/5">
                  <td className="py-3 px-4">Чистая прибыль</td>
                  {monthlyProfitLoss.map((month, i) => (
                    <td key={i} className="text-right py-3 px-4 text-primary">
                      ₽{month.чистая_прибыль.toLocaleString()}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default ProfitLossPage;
