
import React, { useState } from 'react';
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
import { ArrowUpRight, ArrowDownRight, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

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
  const [activeTab, setActiveTab] = useState('chart');
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedDataPoints, setSelectedDataPoints] = useState(['выручка', 'чистая_прибыль']);
  
  // Filter data based on period
  const filteredData = React.useMemo(() => {
    if (selectedPeriod === 'all') return monthlyProfitLoss;
    if (selectedPeriod === 'q1') return monthlyProfitLoss.slice(0, 3);
    if (selectedPeriod === 'q2') return monthlyProfitLoss.slice(3, 6);
    return monthlyProfitLoss;
  }, [selectedPeriod]);
  
  // Track metrics totals
  const totals = React.useMemo(() => {
    return filteredData.reduce((acc, current) => ({
      revenue: (acc.revenue || 0) + current.выручка,
      profit: (acc.profit || 0) + current.чистая_прибыль,
    }), { revenue: 0, profit: 0 });
  }, [filteredData]);

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Прибыль и убытки</h1>
        <div className="flex items-center gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Период" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все месяцы</SelectItem>
              <SelectItem value="q1">Q1 (Янв-Мар)</SelectItem>
              <SelectItem value="q2">Q2 (Апр-Июн)</SelectItem>
            </SelectContent>
          </Select>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Фильтры</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium">Показатели для отображения</h4>
                <div className="flex flex-wrap gap-2">
                  {['выручка', 'себестоимость', 'валовая_прибыль', 'расходы', 'чистая_прибыль'].map(item => (
                    <Button 
                      key={item}
                      variant={selectedDataPoints.includes(item) ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setSelectedDataPoints(prev => 
                          prev.includes(item) 
                            ? prev.filter(i => i !== item) 
                            : [...prev, item]
                        )
                      }}
                    >
                      {item}
                    </Button>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="chart">График</TabsTrigger>
          <TabsTrigger value="table">Таблица</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chart">
          <Card>
            <CardHeader>
              <CardTitle>Динамика прибыли и убытков</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={filteredData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `₽${value.toLocaleString()}`} />
                  <Legend />
                  {selectedDataPoints.includes('выручка') && (
                    <Line
                      type="monotone"
                      dataKey="выручка"
                      name="Выручка"
                      stroke="#1a73e8"
                      strokeWidth={2}
                    />
                  )}
                  {selectedDataPoints.includes('валовая_прибыль') && (
                    <Line
                      type="monotone"
                      dataKey="валовая_прибыль"
                      name="Валовая прибыль"
                      stroke="#34a853"
                      strokeWidth={2}
                    />
                  )}
                  {selectedDataPoints.includes('чистая_прибыль') && (
                    <Line
                      type="monotone"
                      dataKey="чистая_прибыль"
                      name="Чистая прибыль"
                      stroke="#fbbc05"
                      strokeWidth={2}
                    />
                  )}
                  {selectedDataPoints.includes('себестоимость') && (
                    <Line
                      type="monotone"
                      dataKey="себестоимость"
                      name="Себестоимость"
                      stroke="#ea4335"
                      strokeWidth={2}
                    />
                  )}
                  {selectedDataPoints.includes('расходы') && (
                    <Line
                      type="monotone"
                      dataKey="расходы"
                      name="Расходы"
                      stroke="#ff6d01"
                      strokeWidth={2}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="table">
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
                      {filteredData.map((month, i) => (
                        <th key={i} className="text-right py-3 px-4 font-medium">{month.month}</th>
                      ))}
                      <th className="text-right py-3 px-4 font-medium bg-muted/30">Итого</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Выручка</td>
                      {filteredData.map((month, i) => (
                        <td key={i} className="text-right py-3 px-4">
                          ₽{month.выручка.toLocaleString()}
                        </td>
                      ))}
                      <td className="text-right py-3 px-4 font-medium bg-muted/30">
                        ₽{totals.revenue.toLocaleString()}
                      </td>
                    </tr>
                    <tr className="border-b bg-muted/30">
                      <td className="py-3 px-4 font-medium">Себестоимость</td>
                      {filteredData.map((month, i) => (
                        <td key={i} className="text-right py-3 px-4 text-red-600">
                          -₽{month.себестоимость.toLocaleString()}
                        </td>
                      ))}
                      <td className="text-right py-3 px-4 font-medium bg-muted/30 text-red-600">
                        -₽{filteredData.reduce((sum, month) => sum + month.себестоимость, 0).toLocaleString()}
                      </td>
                    </tr>
                    <tr className="border-b font-medium">
                      <td className="py-3 px-4">Валовая прибыль</td>
                      {filteredData.map((month, i) => (
                        <td key={i} className="text-right py-3 px-4 text-green-600">
                          ₽{month.валовая_прибыль.toLocaleString()}
                        </td>
                      ))}
                      <td className="text-right py-3 px-4 font-medium bg-muted/30 text-green-600">
                        ₽{filteredData.reduce((sum, month) => sum + month.валовая_прибыль, 0).toLocaleString()}
                      </td>
                    </tr>
                    <tr className="border-b bg-muted/30">
                      <td className="py-3 px-4 font-medium">Операционные расходы</td>
                      {filteredData.map((month, i) => (
                        <td key={i} className="text-right py-3 px-4 text-red-600">
                          -₽{month.расходы.toLocaleString()}
                        </td>
                      ))}
                      <td className="text-right py-3 px-4 font-medium bg-muted/30 text-red-600">
                        -₽{filteredData.reduce((sum, month) => sum + month.расходы, 0).toLocaleString()}
                      </td>
                    </tr>
                    <tr className="font-bold bg-primary/5">
                      <td className="py-3 px-4">Чистая прибыль</td>
                      {filteredData.map((month, i) => (
                        <td key={i} className="text-right py-3 px-4 text-primary">
                          ₽{month.чистая_прибыль.toLocaleString()}
                        </td>
                      ))}
                      <td className="text-right py-3 px-4 font-medium bg-muted/30 text-primary">
                        ₽{totals.profit.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

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
    </Layout>
  );
};

export default ProfitLossPage;
