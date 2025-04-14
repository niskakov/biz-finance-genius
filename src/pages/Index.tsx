import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { FileUpload } from '@/components/FileUpload';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from "@/components/ui/use-toast";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertCircle,
  BarChart3,
  FileSpreadsheet,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Table as TableIcon,
  BookOpen,
  CalendarClock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const sampleCashFlow = [
  { month: 'Янв', доходы: 500000, расходы: 430000 },
  { month: 'Фев', доходы: 650000, расходы: 520000 },
  { month: 'Мар', доходы: 620000, расходы: 610000 },
  { month: 'Апр', доходы: 700000, расходы: 550000 },
  { month: 'Май', доходы: 680000, расходы: 570000 },
  { month: 'Июн', доходы: 750000, расходы: 600000 },
];

const sampleProfitLoss = [
  { month: 'Янв', прибыль: 70000 },
  { month: 'Фев', прибыль: 130000 },
  { month: 'Мар', прибыль: 10000 },
  { month: 'Апр', прибыль: 150000 },
  { month: 'Май', прибыль: 110000 },
  { month: 'Июн', прибыль: 150000 },
];

const balanceSummary = [
  { name: 'Активы', value: 4500000 },
  { name: 'Обязательства', value: 1800000 },
  { name: 'Собственный капитал', value: 2700000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

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

const yearlyPlanningData = [
  { month: 'Янв', доходы: 500000, расходы: 430000, прогноз_доходы: 525000, прогноз_расходы: 440000 },
  { month: 'Фев', доходы: 650000, расходы: 520000, прогноз_доходы: 680000, прогноз_расходы: 530000 },
  { month: 'Мар', доходы: 620000, расходы: 610000, прогноз_доходы: 650000, прогноз_расходы: 615000 },
  { month: 'Апр', доходы: 700000, расходы: 550000, прогноз_доходы: 720000, прогноз_расходы: 560000 },
  { month: 'Май', доходы: 680000, расходы: 570000, прогноз_доходы: 710000, прогноз_расходы: 580000 },
  { month: 'Июн', доходы: 750000, расходы: 600000, прогноз_доходы: 780000, прогноз_расходы: 610000 },
  { month: 'Июл', доходы: null, расходы: null, прогноз_доходы: 800000, прогноз_расходы: 630000 },
  { month: 'Авг', доходы: null, расходы: null, прогноз_доходы: 820000, прогноз_расходы: 640000 },
  { month: 'Сен', доходы: null, расходы: null, прогноз_доходы: 850000, прогноз_расходы: 660000 },
  { month: 'Окт', доходы: null, расходы: null, прогноз_доходы: 870000, прогноз_расходы: 670000 },
  { month: 'Ноя', доходы: null, расходы: null, прогноз_доходы: 880000, прогноз_расходы: 680000 },
  { month: 'Дек', доходы: null, расходы: null, прогноз_доходы: 900000, прогноз_расходы: 690000 },
];

const projectedBalanceData = [
  { month: 'Янв', активы: 4500000, обязательства: 1800000, капитал: 2700000 },
  { month: 'Фев', активы: 4600000, обязательства: 1790000, капитал: 2810000 },
  { month: 'Мар', активы: 4700000, обязательства: 1780000, капитал: 2920000 },
  { month: 'Апр', активы: 4800000, обязательства: 1770000, капитал: 3030000 },
  { month: 'Май', активы: 4900000, обязательства: 1760000, капитал: 3140000 },
  { month: 'Июн', активы: 5000000, обязательства: 1750000, капитал: 3250000 },
  { month: 'Июл', активы: 5100000, обязательства: 1740000, капитал: 3360000 },
  { month: 'Авг', активы: 5200000, обязательства: 1730000, капитал: 3470000 },
  { month: 'Сен', активы: 5300000, обязательства: 1720000, капитал: 3580000 },
  { month: 'Окт', активы: 5400000, обязательства: 1710000, капитал: 3690000 },
  { month: 'Ноя', активы: 5500000, обязательства: 1700000, капитал: 3800000 },
  { month: 'Дек', активы: 5600000, обязательства: 1690000, капитал: 3910000 },
];

const projectedProfitData = [
  { month: 'Янв', прибыль: 70000, прогноз: 85000 },
  { month: 'Фев', прибыль: 130000, прогноз: 150000 },
  { month: 'Мар', прибыль: 10000, прогноз: 35000 },
  { month: 'Апр', прибыль: 150000, прогноз: 160000 },
  { month: 'Май', прибыль: 110000, прогноз: 130000 },
  { month: 'Июн', прибыль: 150000, прогноз: 170000 },
  { month: 'Июл', прибыль: null, прогноз: 170000 },
  { month: 'Авг', прибыль: null, прогноз: 180000 },
  { month: 'Сен', прибыль: null, прогноз: 190000 },
  { month: 'Окт', прибыль: null, прогноз: 200000 },
  { month: 'Ноя', прибыль: null, прогноз: 200000 },
  { month: 'Дек', прибыль: null, прогноз: 210000 },
];

const Index: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFileUploaded = (file: File) => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowDashboard(true);
      toast({
        title: "Анализ завершен",
        description: "Данные успешно загружены и проанализированы",
      });
    }, 3000);
  };

  const calculateTotal = (data: any[], key: string) => {
    return data.reduce((sum, item) => sum + item[key], 0);
  };

  if (showDashboard) {
    return (
      <Layout>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Единый финансовый дашборд</h1>
          <div className="flex items-center gap-2">
            <Button 
              variant={viewMode === 'chart' ? "default" : "outline"} 
              size="sm"
              onClick={() => setViewMode('chart')}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Графики
            </Button>
            <Button 
              variant={viewMode === 'table' ? "default" : "outline"} 
              size="sm"
              onClick={() => setViewMode('table')}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Таблицы
            </Button>
            <Button variant="outline" onClick={() => setShowDashboard(false)}>
              Загрузить новый файл
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Текущий баланс</p>
                  <h3 className="text-2xl font-bold">₽1,200,000</h3>
                </div>
                <div className="p-2 bg-green-100 rounded-full">
                  <Wallet className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-xs text-green-600 font-medium">+12.5% за месяц</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Чистая прибыль</p>
                  <h3 className="text-2xl font-bold">₽150,000</h3>
                </div>
                <div className="p-2 bg-blue-100 rounded-full">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-xs text-green-600 font-medium">+5.3% по сравнению с прошлым месяцем</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Рентабельность</p>
                  <h3 className="text-2xl font-bold">18.4%</h3>
                </div>
                <div className="p-2 bg-yellow-100 rounded-full">
                  <FileSpreadsheet className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <ArrowDownRight className="h-4 w-4 text-red-600 mr-1" />
                <span className="text-xs text-red-600 font-medium">-2.1% по сравнению с прошлым месяцем</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 border-l-4 border-l-primary">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-primary" />
              Рекомендации ИИ-аналитика
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex">
                <TrendingUp className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Наблюдается стабильный рост прибыли, но рентабельность снизилась на 2.1% из-за роста расходов.</span>
              </li>
              <li className="flex">
                <AlertCircle className="h-5 w-5 mr-2 text-yellow-600 flex-shrink-0 mt-0.5" />
                <span>Возможен кассовый разрыв в следующем месяце из-за запланированных крупных расходов. Рекомендуем отложить ₽200,000 для предотвращения проблем с ликвидностью.</span>
              </li>
              <li className="flex">
                <TrendingDown className="h-5 w-5 mr-2 text-red-600 flex-shrink-0 mt-0.5" />
                <span>Затраты на маркетинг растут быстрее, чем конверсия. Рассмотрите оптимизацию маркетинговой стратегии.</span>
              </li>
            </ul>
            <Button className="w-full mt-4" onClick={() => navigate('/assistant')}>
              Задать вопрос аналитику
            </Button>
          </CardContent>
        </Card>

        {viewMode === 'chart' ? (
          <Tabs defaultValue="cash-flow" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="cash-flow">Движение денежных средств</TabsTrigger>
              <TabsTrigger value="profit-loss">Прибыль и убытки</TabsTrigger>
              <TabsTrigger value="balance">Баланс</TabsTrigger>
              <TabsTrigger value="planning">Годовое планирование</TabsTrigger>
            </TabsList>
            
            <TabsContent value="cash-flow" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Динамика движения денежных средств</CardTitle>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={sampleCashFlow}
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
            
            <TabsContent value="profit-loss" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Динамика прибыли</CardTitle>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={sampleProfitLoss}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => `₽${value.toLocaleString()}`} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="прибыль"
                        stroke="#1a73e8"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="balance" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Структура баланса</CardTitle>
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
                        label={({ name, value, percent }) => `${name}: ${(percent * 100).toFixed(0)}% (₽${(value/1000000).toFixed(1)}M)`}
                      >
                        {balanceSummary.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `₽${value.toLocaleString()}`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="planning" className="pt-4">
              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Планирование доходов и расходов на год</CardTitle>
                    <CalendarClock className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={yearlyPlanningData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => `₽${value.toLocaleString()}`} />
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey="доходы" 
                          name="Факт доходы" 
                          fill="#34a853" 
                          stroke="#34a853" 
                          fillOpacity={0.3} 
                          activeDot={{ r: 8 }} 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="расходы" 
                          name="Факт расходы" 
                          fill="#ea4335" 
                          stroke="#ea4335" 
                          fillOpacity={0.3} 
                          activeDot={{ r: 8 }} 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="прогноз_доходы" 
                          name="Прогноз доходы" 
                          fill="#34a853" 
                          stroke="#34a853" 
                          fillOpacity={0.1} 
                          strokeDasharray="5 5" 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="прогноз_расходы" 
                          name="Прогноз расходы" 
                          fill="#ea4335" 
                          stroke="#ea4335" 
                          fillOpacity={0.1} 
                          strokeDasharray="5 5" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Прогноз прибыли на год</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={projectedProfitData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip formatter={(value) => `₽${value.toLocaleString()}`} />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="прибыль"
                            name="Факт прибыль"
                            stroke="#1a73e8"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            activeDot={{ r: 8 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="прогноз"
                            name="Прогноз прибыли"
                            stroke="#1a73e8"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            dot={{ r: 4 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Прогноз структуры баланса</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={projectedBalanceData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip formatter={(value) => `₽${value.toLocaleString()}`} />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="активы"
                            name="Активы"
                            stroke="#0088FE"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="обязательства"
                            name="Обязательства"
                            stroke="#00C49F"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="капитал"
                            name="Собственный капитал"
                            stroke="#FFBB28"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <Tabs defaultValue="cash-flow-table" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="cash-flow-table">ДДС</TabsTrigger>
              <TabsTrigger value="profit-loss-table">ОПиУ</TabsTrigger>
              <TabsTrigger value="balance-table">Баланс</TabsTrigger>
              <TabsTrigger value="planning-table">Планирование</TabsTrigger>
            </TabsList>
            
            <TabsContent value="cash-flow-table" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Движение денежных средств - Книжный формат</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md">
                    <Table>
                      <TableHeader className="bg-muted">
                        <TableRow>
                          <TableHead className="w-[150px]">Период</TableHead>
                          <TableHead className="text-right">Поступления</TableHead>
                          <TableHead className="text-right">Выплаты</TableHead>
                          <TableHead className="text-right">Чистый поток</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sampleCashFlow.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{item.month}</TableCell>
                            <TableCell className="text-right text-green-600">
                              ₽{item.доходы.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-right text-red-600">
                              ₽{item.расходы.toLocaleString()}
                            </TableCell>
                            <TableCell 
                              className={`text-right font-medium ${
                                (item.доходы - item.расходы) >= 0 
                                  ? "text-green-600" 
                                  : "text-red-600"
                              }`}
                            >
                              {(item.доходы - item.расходы) >= 0 ? "+" : ""}
                              ₽{Math.abs(item.доходы - item.расходы).toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow className="bg-muted/50 font-bold">
                          <TableCell>ИТОГО</TableCell>
                          <TableCell className="text-right text-green-600">
                            ₽{calculateTotal(sampleCashFlow, 'доходы').toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right text-red-600">
                            ₽{calculateTotal(sampleCashFlow, 'расходы').toLocaleString()}
                          </TableCell>
                          <TableCell
                            className={`text-right font-medium ${
                              calculateTotal(sampleCashFlow, 'доходы') - calculateTotal(sampleCashFlow, 'расходы') >= 0 
                                ? "text-green-600" 
                                : "text-red-600"
                            }`}
                          >
                            {calculateTotal(sampleCashFlow, 'доходы') - calculateTotal(sampleCashFlow, 'расходы') >= 0 ? "+" : ""}
                            ₽{Math.abs(calculateTotal(sampleCashFlow, 'доходы') - calculateTotal(sampleCashFlow, 'расходы')).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  
                  <h3 className="text-lg font-semibold mt-8 mb-4">Детализация за текущий месяц</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-base font-medium mb-3 text-green-600">Поступления</h4>
                      <div className="border rounded-md">
                        <Table>
                          <TableHeader className="bg-muted">
                            <TableRow>
                              <TableHead>Категория</TableHead>
                              <TableHead className="text-right">Сумма</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {cashDetails
                              .filter(item => item.amount > 0)
                              .map((item, index) => (
                                <TableRow key={index}>
                                  <TableCell>{item.category}</TableCell>
                                  <TableCell className="text-right text-green-600">
                                    ₽{Math.abs(item.amount).toLocaleString()}
                                  </TableCell>
                                </TableRow>
                              ))}
                            <TableRow className="font-bold bg-muted/50">
                              <TableCell>ИТОГО</TableCell>
                              <TableCell className="text-right text-green-600">
                                ₽{cashDetails
                                  .filter(item => item.amount > 0)
                                  .reduce((sum, item) => sum + item.amount, 0)
                                  .toLocaleString()}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-base font-medium mb-3 text-red-600">Выплаты</h4>
                      <div className="border rounded-md">
                        <Table>
                          <TableHeader className="bg-muted">
                            <TableRow>
                              <TableHead>Категория</TableHead>
                              <TableHead className="text-right">Сумма</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {cashDetails
                              .filter(item => item.amount < 0)
                              .map((item, index) => (
                                <TableRow key={index}>
                                  <TableCell>{item.category}</TableCell>
                                  <TableCell className="text-right text-red-600">
                                    ₽{Math.abs(item.amount).toLocaleString()}
                                  </TableCell>
                                </TableRow>
                              ))}
                            <TableRow className="font-bold bg-muted/50">
                              <TableCell>ИТОГО</TableCell>
                              <TableCell className="text-right text-red-600">
                                ₽{Math.abs(cashDetails
                                  .filter(item => item.amount < 0)
                                  .reduce((sum, item) => sum + item.amount, 0))
                                  .toLocaleString()}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="profit-loss-table" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Отчет о прибылях и убытках</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md">
                    <Table>
                      <TableHeader className="bg-muted">
                        <TableRow>
                          <TableHead className="w-[150px]">Период</TableHead>
                          <TableHead className="text-right">Прибыль</TableHead>
                          <TableHead className="text-right">Изменение</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sampleProfitLoss.map((item, index) => {
                          const prevValue = index > 0 ? sampleProfitLoss[index - 1].прибыль : 0;
                          const change = index > 0 ? ((item.прибыль - prevValue) / prevValue) * 100 : 0;
                          
                          return (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{item.month}</TableCell>
                              <TableCell className="text-right">
                                ₽{item.прибыль.toLocaleString()}
                              </TableCell>
                              <TableCell 
                                className={`text-right ${
                                  change > 0 
                                    ? "text-green-600" 
                                    : change < 0 
                                      ? "text-red-600" 
                                      : ""
                                }`}
                              >
                                {index > 0 && (
                                  <div className="flex items-center justify-end">
                                    {change > 0 ? (
                                      <ArrowUpRight className="h-4 w-4 mr-1" />
                                    ) : (
                                      <ArrowDownRight className="h-4 w-4 mr-1" />
                                    )}
                                    {Math.abs(change).toFixed(1)}%
                                  </div>
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                        <TableRow className="bg-muted/50 font-bold">
                          <TableCell>ИТОГО</TableCell>
                          <TableCell className="text-right">
                            ₽{calculateTotal(sampleProfitLoss, 'прибыль').toLocaleString()}
                          </TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="balance-table" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Баланс</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md mb-6">
                    <Table>
                      <TableHeader className="bg-muted">
                        <TableRow>
                          <TableHead>Раздел</TableHead>
                          <TableHead className="text-right">Сумма</TableHead>
                          <TableHead className="text-right">Доля</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {balanceSummary.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell className="text-right">
                              ₽{item.value.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-right">
                              {((item.value / balanceSummary[0].value) * 100).toFixed(1)}%
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-4">Финансовые коэффициенты</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border rounded-md p-4">
                      <h4 className="font-medium mb-3">Ликвидность</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Коэффициент текущей ликвидности</span>
                          <span className="font-semibold">2.3</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Коэффициент быстрой ликвидности</span>
                          <span className="font-semibold">1.7</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <h4 className="font-medium mb-3">Финансовая устойчивость</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Коэффициент автономии</span>
                          <span className="font-semibold">0.6</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Коэффициент финансового левериджа</span>
                          <span className="font-semibold">0.67</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="planning-table" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Годовое планирование денежных потоков</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-muted">
                        <TableRow>
                          <TableHead className="w-[100px]">Месяц</TableHead>
                          <TableHead className="text-right">Факт доходы</TableHead>
                          <TableHead className="text-right">Прогноз доходы</TableHead>
                          <TableHead className="text-right">Факт расходы</TableHead>
                          <TableHead className="text-right">Прогноз расходы</TableHead>
                          <TableHead className="text-right">Прогноз прибыль</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {yearlyPlanningData.map((item, index) => (
                          <TableRow key={index} className={item.доходы === null ? "bg-muted/20" : ""}>
                            <TableCell className="font-medium">{item.month}</TableCell>
                            <TableCell className="text-right">
                              {item.доходы !== null ? `₽${item.доходы.toLocaleString()}` : "-"}
                            </TableCell>
                            <TableCell className="text-right text-green-600">
                              ₽{item.прогноз_доходы.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-right">
                              {item.расходы !== null ? `₽${item.расходы.toLocaleString()}` : "-"}
                            </TableCell>
                            <TableCell className="text-right text-red-600">
                              ₽{item.прогноз_расходы.toLocaleString()}
                            </TableCell>
                            <TableCell 
                              className={`text-right font-medium ${
                                (item.прогноз_доходы - item.прогноз_расходы) >= 0 
                                  ? "text-green-600" 
                                  : "text-red-600"
                              }`}
                            >
                              ₽{Math.abs(item.прогноз_доходы - item.прогноз_расходы).toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow className="bg-muted/50 font-bold">
                          <TableCell>ИТОГО ГОД</TableCell>
                          <TableCell className="text-right">
                            ₽{yearlyPlanningData
                              .filter(item => item.доходы !== null)
                              .reduce((sum, item) => sum + item.доходы!, 0)
                              .toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right text-green-600">
                            ₽{yearlyPlanningData
                              .reduce((sum, item) => sum + item.прогноз_доходы, 0)
                              .toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right">
                            ₽{yearlyPlanningData
                              .filter(item => item.расходы !== null)
                              .reduce((sum, item) => sum + item.расходы!, 0)
                              .toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right text-red-600">
                            ₽{yearlyPlanningData
                              .reduce((sum, item) => sum + item.прогноз_расходы, 0)
                              .toLocaleString()}
                          </TableCell>
                          <TableCell 
                            className="text-right font-medium text-green-600"
                          >
                            ₽{Math.abs(
                              yearlyPlanningData.reduce((sum, item) => sum + item.прогноз_доходы, 0) - 
                              yearlyPlanningData.reduce((sum, item) => sum + item.прогноз_расходы, 0)
                            ).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  <h3 className="text-lg font-semibold mt-8 mb-4">Ключевые показатели годового планирования</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="border rounded-md p-4">
                      <h4 className="font-medium mb-3">Рост бизнеса</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Прирост выручки за год</span>
                          <span className="font-semibold text-green-600">+80%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Прирост прибыли за год</span>
                          <span className="font-semibold text-green-600">+200%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <h4 className="font-medium mb-3">Рентабельность</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Средняя по году</span>
                          <span className="font-semibold">23.3%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>К концу года</span>
                          <span className="font-semibold text-green-600">+5.6%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <h4 className="font-medium mb-3">Финансовая устойчивость</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Коэффициент автономии</span>
                          <span className="font-semibold">0.7</span>
                        </div>
                        <div className="flex justify-between">
                          <span>ROI</span>
                          <span className="font-semibold text-green-600">26.4%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Финансовый анализ для вашего бизнеса</h1>
        <p className="text-muted-foreground mb-8 text-center">
          Загрузите ваши финансовые данные в формате Excel или Google Sheets для мгновенного анализа
        </p>
        
        <FileUpload onFileUploaded={handleFileUploaded} isLoading={isAnalyzing} />

        <div className="mt-12 grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Что умеет ИИ-аналитик?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex">
                  <FileSpreadsheet className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <p className="font-medium">Автоматически строит финансовые отчеты</p>
                    <p className="text-sm text-muted-foreground">ДДС, ОПиУ и Баланс на основе ваших данных</p>
                  </div>
                </li>
                <li className="flex">
                  <BarChart3 className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <p className="font-medium">Анализирует финансовое состояние</p>
                    <p className="text-sm text-muted-foreground">Находит тренды, аномалии и возможности для оптимизации</p>
                  </div>
                </li>
                <li className="flex">
                  <AlertCircle className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <p className="font-medium">Предупреждает о рисках</p>
                    <p className="text-sm text-muted-foreground">Выявляет кассовые разрывы и другие финансовые проблемы</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
