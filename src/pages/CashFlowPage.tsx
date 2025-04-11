
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ChevronUp, ChevronDown, ArrowDownRight, ArrowUpRight } from 'lucide-react';

// Sample data
const monthlyCashFlow = [
  { month: 'Янв', доходы: 500000, расходы: 430000 },
  { month: 'Фев', доходы: 650000, расходы: 520000 },
  { month: 'Мар', доходы: 620000, расходы: 610000 },
  { month: 'Апр', доходы: 700000, расходы: 550000 },
  { month: 'Май', доходы: 680000, расходы: 570000 },
  { month: 'Июн', доходы: 750000, расходы: 600000 },
];

const weeklyCashFlow = [
  { week: '1 июн', доходы: 170000, расходы: 140000 },
  { week: '8 июн', доходы: 185000, расходы: 150000 },
  { week: '15 июн', доходы: 190000, расходы: 155000 },
  { week: '22 июн', доходы: 205000, расходы: 155000 },
];

const cashDetails = [
  { category: 'Продажи товаров', amount: 450000, change: 5.2 },
  { category: 'Услуги', amount: 280000, change: 12.4 },
  { category: 'Комиссии', amount: 20000, change: -3.1 },
  { category: 'Зарплаты', amount: -320000, change: 0 },
  { category: 'Аренда', amount: -90000, change: 0 },
  { category: 'Маркетинг', amount: -65000, change: 8.3 },
  { category: 'Коммунальные услуги', amount: -40000, change: 2.1 },
  { category: 'Налоги', amount: -85000, change: 0 },
];

const CashFlowPage: React.FC = () => {
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Движение денежных средств</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <p className="text-sm font-medium text-muted-foreground">Доходы (этот месяц)</p>
              <div className="flex items-center mt-2">
                <span className="text-2xl font-bold">₽750,000</span>
                <div className="ml-auto flex items-center text-green-600">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span className="text-sm">10.3%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <p className="text-sm font-medium text-muted-foreground">Расходы (этот месяц)</p>
              <div className="flex items-center mt-2">
                <span className="text-2xl font-bold">₽600,000</span>
                <div className="ml-auto flex items-center text-red-600">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span className="text-sm">5.3%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <p className="text-sm font-medium text-muted-foreground">Чистый денежный поток</p>
              <div className="flex items-center mt-2">
                <span className="text-2xl font-bold">₽150,000</span>
                <div className="ml-auto flex items-center text-green-600">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span className="text-sm">36.4%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="monthly" className="w-full mb-6">
        <TabsList>
          <TabsTrigger value="monthly">Помесячно</TabsTrigger>
          <TabsTrigger value="weekly">Понедельно</TabsTrigger>
        </TabsList>
        
        <TabsContent value="monthly">
          <Card>
            <CardHeader>
              <CardTitle>Движение денежных средств за 6 месяцев</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyCashFlow}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `₽${value.toLocaleString()}`} />
                  <Legend />
                  <Bar dataKey="доходы" fill="#34a853" />
                  <Bar dataKey="расходы" fill="#ea4335" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="weekly">
          <Card>
            <CardHeader>
              <CardTitle>Движение денежных средств за текущий месяц (по неделям)</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={weeklyCashFlow}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip formatter={(value) => `₽${value.toLocaleString()}`} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="доходы"
                    stroke="#34a853"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="расходы"
                    stroke="#ea4335"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Детализация движения средств (июнь)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cashDetails.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b last:border-b-0"
              >
                <div className="flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full mr-3 ${
                      item.amount >= 0 ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  <span className="font-medium">{item.category}</span>
                </div>
                <div className="flex items-center">
                  <span
                    className={`font-medium ${
                      item.amount >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {item.amount >= 0 ? "+" : ""}₽{Math.abs(item.amount).toLocaleString()}
                  </span>
                  
                  <div className="ml-4 w-20 text-right">
                    {item.change !== 0 && (
                      <div
                        className={`flex items-center justify-end text-xs ${
                          item.change > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {item.change > 0 ? (
                          <ChevronUp className="h-3 w-3 mr-1" />
                        ) : (
                          <ChevronDown className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(item.change)}%
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default CashFlowPage;
