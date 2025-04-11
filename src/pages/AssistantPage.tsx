
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Bot, User, Send } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const AssistantPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: 'Здравствуйте! Я ваш ИИ-финансовый аналитик. Что бы вы хотели узнать о финансовом состоянии вашего бизнеса?',
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate assistant response based on question
    setTimeout(() => {
      let response = '';
      const lowerCaseMessage = newMessage.toLowerCase();

      if (lowerCaseMessage.includes('хватит ли денег') || lowerCaseMessage.includes('зарплат')) {
        response = 'Анализ показывает, что у вас достаточно денег для выплаты зарплат в следующем месяце. Текущий баланс составляет ₽1,200,000, а прогнозируемые расходы на зарплату - ₽320,000. Рекомендую создать резерв в размере хотя бы трех фондов оплаты труда для обеспечения финансовой стабильности.';
      } else if (lowerCaseMessage.includes('прибыль') || lowerCaseMessage.includes('доход')) {
        response = 'За последний месяц ваша чистая прибыль составила ₽150,000, что на 36.4% больше по сравнению с предыдущим месяцем. Основные факторы роста: увеличение выручки (+10.3%) при умеренном росте расходов (+5.3%). Наиболее прибыльным товаром остается Товар A, обеспечивающий 56% от общей выручки.';
      } else if (lowerCaseMessage.includes('расход') || lowerCaseMessage.includes('трат')) {
        response = 'Общая сумма расходов за последний месяц составила ₽600,000. Основные статьи: зарплаты (53.3%), налоги (14.2%), аренда (15%). Наблюдается рост расходов на маркетинг (+8.3% за месяц), рекомендую проанализировать эффективность этих инвестиций.';
      } else if (lowerCaseMessage.includes('кассов') || lowerCaseMessage.includes('разрыв')) {
        response = 'Анализ движения денежных средств показывает потенциальный кассовый разрыв в размере около ₽200,000 в следующем месяце из-за запланированных крупных расходов. Рекомендую отложить часть средств сейчас или пересмотреть график платежей, чтобы избежать проблем с ликвидностью.';
      } else if (lowerCaseMessage.includes('рентабельность') || lowerCaseMessage.includes('маржа')) {
        response = 'Рентабельность продаж компании составляет 20%, что на 2.5% выше показателя прошлого месяца. Валовая маржа - 46.7% (+1.2%), операционная маржа - 24% (-0.8%). В целом показатели рентабельности стабильные с тенденцией к росту.';
      } else if (lowerCaseMessage.includes('баланс') || lowerCaseMessage.includes('актив') || lowerCaseMessage.includes('пассив')) {
        response = 'Общая сумма активов составляет ₽4,500,000, обязательств - ₽1,800,000, собственного капитала - ₽2,700,000. Коэффициент текущей ликвидности - 2.3, что говорит о хорошей платежеспособности. Коэффициент автономии - 0.6, что указывает на финансовую независимость. В целом балансовые показатели в норме.';
      } else if (lowerCaseMessage.includes('рекомендац') || lowerCaseMessage.includes('совет') || lowerCaseMessage.includes('улучш')) {
        response = '1. Создайте резервный фонд в размере 3-месячных операционных расходов.\n2. Рассмотрите возможность реинвестирования части прибыли в развитие.\n3. Оптимизируйте расходы на маркетинг - их рост не пропорционален росту выручки.\n4. Разработайте стратегию по диверсификации источников дохода.\n5. Контролируйте дебиторскую задолженность, чтобы избежать проблем с ликвидностью.';
      } else {
        response = 'Я могу предоставить анализ вашего финансового положения по различным аспектам. Например, информацию о прибыли, расходах, движении денежных средств, кассовых разрывах, балансовых показателях или дать рекомендации по улучшению финансового состояния. Что именно вас интересует?';
      }

      const assistantMessage: Message = {
        id: messages.length + 2,
        content: response,
        sender: 'assistant',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);

      toast({
        title: "Новый ответ аналитика",
        description: "Финансовый аналитик ответил на ваш вопрос",
      });
    }, 2000);
  };

  const predefinedQuestions = [
    "Хватит ли денег на зарплаты в следующем месяце?",
    "Какая прибыль в этом месяце?",
    "Есть ли риск кассового разрыва?",
    "Какие рекомендации по улучшению финансового положения?"
  ];

  const formatTimestamp = (date: Date) => {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  return (
    <Layout>
      <div className="flex flex-col h-[calc(100vh-120px)] md:h-[calc(100vh-160px)]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Финансовый ассистент</h1>
        </div>

        <Card className="flex-1 flex flex-col overflow-hidden">
          <CardContent className="flex-1 flex flex-col p-0">
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`flex max-w-[80%] ${
                        message.sender === 'user'
                          ? 'flex-row-reverse'
                          : 'flex-row'
                      }`}
                    >
                      <div className={`flex-shrink-0 ${message.sender === 'user' ? 'ml-3' : 'mr-3'}`}>
                        <Avatar className={message.sender === 'assistant' ? 'bg-primary' : 'bg-muted'}>
                          {message.sender === 'assistant' ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                        </Avatar>
                      </div>
                      <div
                        className={`rounded-lg p-4 ${
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <div className="whitespace-pre-line">{message.content}</div>
                        <div
                          className={`text-xs mt-1 ${
                            message.sender === 'user'
                              ? 'text-primary-foreground/70'
                              : 'text-muted-foreground'
                          }`}
                        >
                          {formatTimestamp(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex max-w-[80%]">
                      <div className="mr-3 flex-shrink-0">
                        <Avatar className="bg-primary">
                          <Bot className="h-5 w-5" />
                        </Avatar>
                      </div>
                      <div className="rounded-lg p-4 bg-muted">
                        <div className="flex space-x-2 items-center">
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-150"></div>
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-300"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Predefined questions */}
            {messages.length < 3 && (
              <div className="px-4 py-3 border-t flex gap-2 overflow-x-auto">
                {predefinedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="whitespace-nowrap text-xs"
                    onClick={() => {
                      setNewMessage(question);
                    }}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            )}

            {/* Input form */}
            <div className="p-4 border-t">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex space-x-2"
              >
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Введите сообщение..."
                  disabled={isTyping}
                />
                <Button type="submit" size="icon" disabled={!newMessage.trim() || isTyping}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AssistantPage;
