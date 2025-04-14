
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
  BookOpen
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
  Cell
} from 'recharts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Sample data for demonstration purposes
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

// Sample data for balance sheet
const balanceSummary = [
  { name: 'Активы', value: 4500000 },
  { name: 'Обязательства', value: 1800000 },
  { name: 'Собственный капитал', value: 2700000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

// Sample data for detailed tables
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

const Index: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFileUploaded = (file: File) => {
    setIsAnalyzing(true);
    
    // Simulate file analysis (would be replaced with actual API call)
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowDashboard(true);
      toast({
        title: "Анализ завершен",
        description: "Данные успешно загружены и проанализированы",
      });
    }, 3000);
  };

  // Calculate period totals for book format
  const calculateTotal = (data: any[], key: string) => {
    return data.reduce((sum, item) => sum + item[key], 0);
  };

  // Dashboard view after file has been processed
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

        {/* Financial Health Metrics */}
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

        {/* AI Insights */}
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
          /* Charts Dashboard View */
          <Tabs defaultValue="cash-flow" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="cash-flow">Движение денежных средств</TabsTrigger>
              <TabsTrigger value="profit-loss">Прибыль и убытки</TabsTrigger>
              <TabsTrigger value="balance">Баланс</TabsTrigger>
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
          </Tabs>
        ) : (
          /* Tables Dashboard View */
          <Tabs defaultValue="cash-flow-table" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="cash-flow-table">ДДС</TabsTrigger>
              <TabsTrigger value="profit-loss-table">ОПиУ</TabsTrigger>
              <TabsTrigger value="balance-table">Баланс</TabsTrigger>
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
          </Tabs>
        )}
      </Layout>
    );
  }

  // File upload view
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
