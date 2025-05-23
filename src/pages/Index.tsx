
import React, { useState, useEffect } from 'react';
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
  TableIcon,
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
import ScenarioChart from '@/components/charts/ScenarioChart';

const formatCurrency = (value: number) => `₸${value.toLocaleString()}`;

// Initial data structures, but we'll reset them when new files are uploaded
const initialCashFlow = [
  { month: 'Янв', доходы: 500000, расходы: 430000 },
  { month: 'Фев', доходы: 650000, расходы: 520000 },
  { month: 'Мар', доходы: 620000, расходы: 610000 },
  { month: 'Апр', доходы: 700000, расходы: 550000 },
  { month: 'Май', доходы: 680000, расходы: 570000 },
  { month: 'Июн', доходы: 750000, расходы: 600000 },
];

const initialProfitLoss = [
  { month: 'Янв', прибыль: 70000 },
  { month: 'Фев', прибыль: 130000 },
  { month: 'Мар', прибыль: 10000 },
  { month: 'Апр', прибыль: 150000 },
  { month: 'Май', прибыль: 110000 },
  { month: 'Июн', прибыль: 150000 },
];

const initialBalanceSummary = [
  { name: 'Активы', value: 4500000 },
  { name: 'Обязательства', value: 1800000 },
  { name: 'Собственный капитал', value: 2700000 },
];

// Functions to generate data will only be called when needed
const generateCashFlowScenarios = () => [
  { month: 'Янв', факт: 70000, базовый: 70000, оптимистичный: 70000, пессимистичный: 70000 },
  { month: 'Фев', факт: 130000, базовый: 130000, оптимистичный: 130000, пессимистичный: 130000 },
  { month: 'Мар', факт: 10000, базовый: 10000, оптимистичный: 10000, пессимистичный: 10000 },
  { month: 'Апр', факт: 150000, базовый: 150000, оптимистичный: 150000, пессимистичный: 150000 },
  { month: 'Май', факт: 110000, базовый: 110000, оптимистичный: 110000, пессимистичный: 110000 },
  { month: 'Июн', факт: 150000, базовый: 150000, оптимистичный: 150000, пессимистичный: 150000 },
  { month: 'Июл', факт: null, базовый: 170000, оптимистичный: 200000, пессимистичный: 140000 },
  { month: 'Авг', факт: null, базовый: 180000, оптимистичный: 220000, пессимистичный: 150000 },
  { month: 'Сен', факт: null, базовый: 190000, оптимистичный: 230000, пессимистичный: 160000 },
  { month: 'Окт', факт: null, базовый: 200000, оптимистичный: 250000, пессимистичный: 170000 },
  { month: 'Ноя', факт: null, базовый: 200000, оптимистичный: 260000, пессимистичный: 180000 },
  { month: 'Дек', факт: null, базовый: 210000, оптимистичный: 280000, пессимистичный: 190000 },
];

const generateProfitScenarios = () => [
  { month: 'Янв', факт: 70000, базовый: 70000, оптимистичный: 70000, пессимистичный: 70000 },
  { month: 'Фев', факт: 130000, базовый: 130000, оптимистичный: 130000, пессимистичный: 130000 },
  { month: 'Мар', факт: 10000, базовый: 10000, оптимистичный: 10000, пессимистичный: 10000 },
  { month: 'Апр', факт: 150000, базовый: 150000, оптимистичный: 150000, пессимистичный: 150000 },
  { month: 'Май', факт: 110000, базовый: 110000, оптимистичный: 110000, пессимистичный: 110000 },
  { month: 'Июн', факт: 150000, базовый: 150000, оптимистичный: 150000, пессимистичный: 150000 },
  { month: 'Июл', факт: null, базовый: 170000, оптимистичный: 195000, пессимистичный: 120000 },
  { month: 'Авг', факт: null, базовый: 180000, оптимистичный: 210000, пессимистичный: 130000 },
  { month: 'Сен', факт: null, базовый: 190000, оптимистичный: 225000, пессимистичный: 140000 },
  { month: 'Окт', факт: null, базовый: 200000, оптимистичный: 240000, пессимистичный: 150000 },
  { month: 'Ноя', факт: null, базовый: 200000, оптимистичный: 245000, пессимистичный: 160000 },
  { month: 'Дек', факт: null, базовый: 210000, оптимистичный: 260000, пессимистичный: 170000 },
];

const generateBalanceScenarios = () => [
  { month: 'Янв', активы_факт: 4500000, активы_база: 4500000, активы_опт: 4500000, активы_песс: 4500000, 
    обязательства_факт: 1800000, обязательства_база: 1800000, обязательства_опт: 1800000, обязательства_песс: 1800000 },
  { month: 'Фев', активы_факт: 4600000, активы_база: 4600000, активы_опт: 4600000, активы_песс: 4600000, 
    обязательства_факт: 1790000, обязательства_база: 1790000, обязательства_опт: 1790000, обязательства_песс: 1790000 },
  { month: 'Мар', активы_факт: 4700000, активы_база: 4700000, активы_опт: 4700000, активы_песс: 4700000, 
    обязательства_факт: 1780000, обязательства_база: 1780000, обязательства_опт: 1780000, обязательства_песс: 1780000 },
  { month: 'Апр', активы_факт: 4800000, активы_база: 4800000, активы_опт: 4800000, активы_песс: 4800000, 
    обязательства_факт: 1770000, обязательства_база: 1770000, обязательства_опт: 1770000, обязательства_песс: 1770000 },
  { month: 'Май', активы_факт: 4900000, активы_база: 4900000, активы_опт: 4900000, активы_песс: 4900000, 
    обязательства_факт: 1760000, обязательства_база: 1760000, обязательства_опт: 1760000, обязательства_песс: 1760000 },
  { month: 'Июн', активы_факт: 5000000, активы_база: 5000000, активы_опт: 5000000, активы_песс: 5000000, 
    обязательства_факт: 1750000, обязательства_база: 1750000, обязательства_опт: 1750000, обязательства_песс: 1750000 },
  { month: 'Июл', активы_факт: null, активы_база: 5100000, активы_опт: 5200000, активы_песс: 5050000, 
    обязательства_факт: null, обязательства_база: 1740000, обязательства_опт: 1730000, обязательства_песс: 1760000 },
  { month: 'Авг', активы_факт: null, активы_база: 5200000, активы_опт: 5400000, активы_песс: 5100000, 
    обязательства_факт: null, обязательства_база: 1730000, обязательства_опт: 1700000, обязательства_песс: 1770000 },
  { month: 'Сен', активы_факт: null, активы_база: 5300000, активы_опт: 5600000, активы_песс: 5150000, 
    обязательства_факт: null, обязательства_база: 1720000, обязательства_опт: 1670000, обязательства_песс: 1780000 },
  { month: 'Окт', активы_факт: null, активы_база: 5400000, активы_опт: 5800000, активы_песс: 5200000, 
    обязательства_факт: null, обязательства_база: 1710000, обязательства_опт: 1650000, обязательства_песс: 1800000 },
  { month: 'Ноя', активы_факт: null, активы_база: 5500000, активы_опт: 6000000, активы_песс: 5250000, 
    обязательства_факт: null, обязательства_база: 1700000, обязательства_опт: 1600000, обязательства_песс: 1820000 },
  { month: 'Дек', активы_факт: null, активы_база: 5600000, активы_опт: 6200000, активы_песс: 5300000, 
    обязательства_факт: null, обязательства_база: 1690000, обязательства_опт: 1550000, обязательства_песс: 1850000 },
];

const generateCashDetails = () => [
  { category: 'Продажи товаров', amount: 450000, change: 5.2 },
  { category: 'Услуги', amount: 280000, change: 12.4 },
  { category: 'Комиссии', amount: 20000, change: -3.1 },
  { category: 'Зарплаты', amount: -320000, change: 0 },
  { category: 'Аренда', amount: -90000, change: 0 },
  { category: 'Маркетинг', amount: -65000, change: 8.3 },
  { category: 'Коммунальные услуги', amount: -40000, change: 2.1 },
  { category: 'Налоги', amount: -85000, change: 0 },
];

const generateYearlyPlanningData = () => [
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

const generateProjectedBalanceData = () => [
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

const generateProjectedProfitData = () => [
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
  const [scenarioView, setScenarioView] = useState<'base' | 'scenarios'>('base');
  const { toast } = useToast();
  const navigate = useNavigate();

  // States for all data that should be reset when new file is uploaded
  const [sampleCashFlow, setSampleCashFlow] = useState(initialCashFlow);
  const [sampleProfitLoss, setSampleProfitLoss] = useState(initialProfitLoss);
  const [balanceSummary, setBalanceSummary] = useState(initialBalanceSummary);
  const [cashFlowScenarios, setCashFlowScenarios] = useState(generateCashFlowScenarios());
  const [profitScenarios, setProfitScenarios] = useState(generateProfitScenarios());
  const [balanceScenarios, setBalanceScenarios] = useState(generateBalanceScenarios());
  const [cashDetails, setCashDetails] = useState(generateCashDetails());
  const [yearlyPlanningData, setYearlyPlanningData] = useState(generateYearlyPlanningData());
  const [projectedBalanceData, setProjectedBalanceData] = useState(generateProjectedBalanceData());
  const [projectedProfitData, setProjectedProfitData] = useState(generateProjectedProfitData());
  const [dataTimestamp, setDataTimestamp] = useState<number>(Date.now());

  // Function to reset all data
  const resetAllData = () => {
    setSampleCashFlow(initialCashFlow);
    setSampleProfitLoss(initialProfitLoss);
    setBalanceSummary(initialBalanceSummary);
    setCashFlowScenarios(generateCashFlowScenarios());
    setProfitScenarios(generateProfitScenarios());
    setBalanceScenarios(generateBalanceScenarios());
    setCashDetails(generateCashDetails());
    setYearlyPlanningData(generateYearlyPlanningData());
    setProjectedBalanceData(generateProjectedBalanceData());
    setProjectedProfitData(generateProjectedProfitData());
    setDataTimestamp(Date.now());
  };

  const handleFileUploaded = (file: File) => {
    // Reset all data when a new file is uploaded
    resetAllData();
    
    setIsAnalyzing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowDashboard(true);
      toast({
        title: "Анализ завершен",
        description: "Данные успешно загружены и проанализированы",
      });
    }, 3000);
  };

  // When user clicks "Upload new file" from dashboard
  const handleNewFileRequest = () => {
    setShowDashboard(false);
    resetAllData();
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
            {viewMode === 'chart' && (
              <Button 
                variant={scenarioView === 'scenarios' ? "default" : "outline"} 
                size="sm"
                onClick={() => setScenarioView(scenarioView === 'base' ? 'scenarios' : 'base')}
              >
                {scenarioView === 'base' ? 'Показать сценарии' : 'Скрыть сценарии'}
              </Button>
            )}
            <Button variant="outline" onClick={handleNewFileRequest}>
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
                  <h3 className="text-2xl font-bold">₸1,200,000</h3>
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
                  <h3 className="text-2xl font-bold">₸150,000</h3>
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
                <span>Возможен кассовый разрыв в следующем месяце из-за запланированных крупных расходов. Рекомендуем отложить ₸200,000 для предотвращения проблем с ликвидностью.</span>
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
          <>
            {scenarioView === 'scenarios' ? (
              <div className="grid grid-cols-1 gap-8 mb-8">
                <h2 className="text-xl font-semibold">Прогнозные сценарии</h2>
                <ScenarioChart 
                  title="Прогноз денежных потоков" 
                  data={cashFlowScenarios} 
                  dataKeys={{
                    actual: 'факт',
                    base: 'базовый',
                    optimistic: 'оптимистичный',
                    pessimistic: 'пессимистичный'
                  }} 
                  type="area"
                  currency="tenge"
                  valueFormatter={(value) => `₸${value.toLocaleString()}`}
                />
                
                <ScenarioChart 
                  title="Прогноз прибыли" 
                  data={profitScenarios} 
                  dataKeys={{
                    actual: 'факт',
                    base: 'базовый',
                    optimistic: 'оптимистичный',
                    pessimistic: 'пессимистичный'
                  }}
                  currency="tenge"
                  valueFormatter={(value) => `₸${value.toLocaleString()}`}
                />
                
                <Card>
                  <CardHeader>
                    <CardTitle>Прогноз структуры баланса (активы)</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={balanceScenarios}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={['dataMin - 200000', 'dataMax + 200000']} />
                        <Tooltip formatter={(value) => `₸${value.toLocaleString()}`} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="активы_факт"
                          name="Факт активы"
                          stroke="#1a73e8"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 8 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="активы_база"
                          name="Базовый сценарий"
                          stroke="#34a853"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          dot={{ r: 3 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="активы_опт"
                          name="Оптимистичный сценарий"
                          stroke="#34a853"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          dot={{ r: 3 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="активы_песс"
                          name="Пессимистичный сценарий"
                          stroke="#ea4335"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          dot={{ r: 3 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Прогноз структуры баланса (обязательства)</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={balanceScenarios}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={['dataMin - 100000', 'dataMax + 100000']} />
                        <Tooltip formatter={(value) => `₸${value.toLocaleString()}`} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="обязательства_факт"
                          name="Факт обязательства"
                          stroke="#1a73e8"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 8 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="обязательства_база"
                          name="Базовый сценарий"
                          stroke="#34a853"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          dot={{ r: 3 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="обязательства_опт"
                          name="Оптимистичный сценарий"
                          stroke="#34a853"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          dot={{ r: 3 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="обязательства_песс"
                          name="Пессимистичный сценарий"
                          stroke="#ea4335"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          dot={{ r: 3 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Движение денежных средств</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={sampleCashFlow}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => `₸${value.toLocaleString()}`} />
                        <Legend />
                        <Bar dataKey="доходы" fill="#34a853" />
                        <Bar dataKey="расходы" fill="#ea4335" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Прибыли и убытки</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={sampleProfitLoss}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => `₸${value.toLocaleString()}`} />
                        <Legend />
                        <Line type="monotone" dataKey="прибыль" stroke="#1a73e8" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Структура баланса</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px] flex justify-center items-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={balanceSummary}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {balanceSummary.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={["#0088FE", "#00C49F", "#FFBB28"][index % 3]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `₸${value.toLocaleString()}`} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Годовое планирование</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={yearlyPlanningData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => `₸${value.toLocaleString()}`} />
                        <Legend />
                        <Area type="monotone" dataKey="доходы" stackId="1" stroke="#1a73e8" fill="#1a73e8" fillOpacity={0.3} />
                        <Area type="monotone" dataKey="расходы" stackId="1" stroke="#ea4335" fill="#ea4335" fillOpacity={0.3} />
                        <Area type="monotone" dataKey="прогноз_доходы" stackId="2" stroke="#34a853" fill="#34a853" fillOpacity={0.1} strokeDasharray="5 5" />
                        <Area type="monotone" dataKey="прогноз_расходы" stackId="2" stroke="#fbbc04" fill="#fbbc04" fillOpacity={0.1} strokeDasharray="5 5" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            )}
          </>
        ) : (
          <div className="grid grid-cols-1 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Детали движения денежных средств</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Категория</TableHead>
                      <TableHead>Сумма</TableHead>
                      <TableHead>Изменение</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cashDetails.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.category}</TableCell>
                        <TableCell className={item.amount < 0 ? "text-red-600" : "text-green-600"}>
                          ₸{item.amount.toLocaleString()}
                        </TableCell>
                        <TableCell className={item.change < 0 ? "text-red-600" : "text-green-600"}>
                          {item.change > 0 ? "+" : ""}{item.change}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Годовое планирование</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Месяц</TableHead>
                      <TableHead>Доходы (факт)</TableHead>
                      <TableHead>Доходы (прогноз)</TableHead>
                      <TableHead>Расходы (факт)</TableHead>
                      <TableHead>Расходы (прогноз)</TableHead>
                      <TableHead>Прибыль (факт)</TableHead>
                      <TableHead>Прибыль (прогноз)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {yearlyPlanningData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.month}</TableCell>
                        <TableCell>{item.доходы ? `₸${item.доходы.toLocaleString()}` : "-"}</TableCell>
                        <TableCell>₸{item.прогноз_доходы.toLocaleString()}</TableCell>
                        <TableCell>{item.расходы ? `₸${item.расходы.toLocaleString()}` : "-"}</TableCell>
                        <TableCell>₸{item.прогноз_расходы.toLocaleString()}</TableCell>
                        <TableCell>
                          {item.доходы && item.расходы 
                            ? `₸${(item.доходы - item.расходы).toLocaleString()}` 
                            : "-"}
                        </TableCell>
                        <TableCell>₸{(item.прогноз_доходы - item.прогноз_расходы).toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Прогнозируемый баланс</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Месяц</TableHead>
                      <TableHead>Активы</TableHead>
                      <TableHead>Обязательства</TableHead>
                      <TableHead>Собственный капитал</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projectedBalanceData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.month}</TableCell>
                        <TableCell>₸{item.активы.toLocaleString()}</TableCell>
                        <TableCell>₸{item.обязательства.toLocaleString()}</TableCell>
                        <TableCell>₸{item.капитал.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-center">Загрузите финансовые данные</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              {isAnalyzing ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                  <p className="text-lg font-medium">Анализируем ваши данные...</p>
                  <p className="text-muted-foreground text-center">
                    Наш ИИ изучает ваши финансовые показатели и готовит полный отчет
                  </p>
                </div>
              ) : (
                <>
                  <FileUpload onFileUploaded={handleFileUploaded} />
                  <p className="text-sm text-muted-foreground mt-6 text-center">
                    Загрузите файл Excel с вашими финансовыми данными для анализа и создания детальных прогнозов
                  </p>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Index;
