
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
  ArrowDownRight
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
  Bar
} from 'recharts';

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

const Index: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
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

  // Dashboard view after file has been processed
  if (showDashboard) {
    return (
      <Layout>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Финансовый обзор</h1>
          <Button onClick={() => setShowDashboard(false)}>
            Загрузить новый файл
          </Button>
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

        {/* Financial Charts */}
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
                <div className="h-full flex justify-center items-center">
                  <Button onClick={() => navigate('/balance')}>
                    Перейти к полному анализу баланса
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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
