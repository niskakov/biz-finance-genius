
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

const SettingsPage: React.FC = () => {
  const { toast } = useToast();
  const [companyName, setCompanyName] = React.useState("Моя Компания");
  const [apiKey, setApiKey] = React.useState("");
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [monthlyReports, setMonthlyReports] = React.useState(true);
  const [alertThreshold, setAlertThreshold] = React.useState(true);
  
  const handleSaveSettings = () => {
    toast({
      title: "Настройки сохранены",
      description: "Ваши настройки успешно обновлены",
    });
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Настройки</h1>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Основная информация</CardTitle>
            <CardDescription>
              Обновите основную информацию о вашей компании
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company-name">Название компании</Label>
              <Input 
                id="company-name" 
                value={companyName} 
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            
            <Button onClick={handleSaveSettings}>Сохранить</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Интеграции</CardTitle>
            <CardDescription>
              Настройка интеграций с внешними сервисами
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">API Ключ (для интеграций)</Label>
              <Input 
                id="api-key" 
                type="password" 
                value={apiKey} 
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Введите ваш API ключ" 
              />
              <p className="text-sm text-muted-foreground">
                Необходимо для интеграции с банковскими сервисами и 1С (будет доступно в платной версии)
              </p>
            </div>
            
            <Button onClick={handleSaveSettings}>Сохранить</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Уведомления</CardTitle>
            <CardDescription>
              Настройте, какие уведомления вы хотите получать
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email уведомления</Label>
                <p className="text-sm text-muted-foreground">
                  Получать важные финансовые уведомления по email
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="monthly-reports">Ежемесячные отчеты</Label>
                <p className="text-sm text-muted-foreground">
                  Получать автоматические финансовые отчеты в конце месяца
                </p>
              </div>
              <Switch
                id="monthly-reports"
                checked={monthlyReports}
                onCheckedChange={setMonthlyReports}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="alert-threshold">Оповещения о кассовых разрывах</Label>
                <p className="text-sm text-muted-foreground">
                  Получать уведомления при обнаружении риска кассового разрыва
                </p>
              </div>
              <Switch
                id="alert-threshold"
                checked={alertThreshold}
                onCheckedChange={setAlertThreshold}
              />
            </div>
            
            <Button onClick={handleSaveSettings}>Сохранить настройки</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>О продукте</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              ИИ-финансовый аналитик для малого бизнеса. Версия MVP 0.1.0
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              © 2025 Финансовый Аналитик. Все права защищены.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SettingsPage;
