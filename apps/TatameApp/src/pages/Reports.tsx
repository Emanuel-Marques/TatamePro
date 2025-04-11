
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, Download, FileSpreadsheet, 
  LineChart, Users, CircleDollarSign, Calendar 
} from "lucide-react";
import { dashboardStats, modalitiesData, athletesData, formatKwanza } from "@/lib/data";
import { Progress } from "@/components/ui/progress";

const Reports = () => {
  return (
    <MainLayout>
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
          <p className="text-muted-foreground">
            Estatísticas e análises detalhadas da academia.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Exportar Dados
          </Button>
          <Button variant="outline">
            <FileSpreadsheet className="mr-2 h-4 w-4" /> Gerar Relatório
          </Button>
        </div>
      </header>

      <Card className="p-6">
        <Tabs defaultValue="athletes" className="mt-2">
          <TabsList className="mb-6">
            <TabsTrigger value="athletes" className="text-sm">Atletas</TabsTrigger>
            <TabsTrigger value="financial" className="text-sm">Financeiro</TabsTrigger>
            <TabsTrigger value="attendance" className="text-sm">Frequência</TabsTrigger>
          </TabsList>
          
          <TabsContent value="athletes">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="p-6 lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Distribuição por Modalidade</h3>
                </div>
                <div className="space-y-4">
                  {Object.entries(dashboardStats.athletesByModality).map(([modality, count]) => (
                    <div key={modality}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{modality}</span>
                        <span className="font-medium">{count} atletas</span>
                      </div>
                      <Progress 
                        value={Math.round((Number(count) / dashboardStats.activeAthletes) * 100)} 
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Estatísticas de Atletas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-2xl font-bold">{dashboardStats.activeAthletes}</p>
                          <p className="text-sm text-gray-500">Atletas Ativos</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          <Users size={20} />
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-2xl font-bold">
                            {athletesData.filter(a => a.belt === "branca").length}
                          </p>
                          <p className="text-sm text-gray-500">Faixa Branca</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                          <Users size={20} />
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-2xl font-bold">
                            {athletesData.filter(a => a.belt && a.belt !== "branca").length}
                          </p>
                          <p className="text-sm text-gray-500">Faixas Coloridas</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                          <Users size={20} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Status dos Atletas</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Ativos</span>
                      <span className="font-medium">
                        {athletesData.filter(a => a.status === "active").length}
                      </span>
                    </div>
                    <Progress 
                      value={Math.round((athletesData.filter(a => a.status === "active").length / athletesData.length) * 100)} 
                      className="h-2 bg-gray-100"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Inativos</span>
                      <span className="font-medium">
                        {athletesData.filter(a => a.status === "inactive").length}
                      </span>
                    </div>
                    <Progress 
                      value={Math.round((athletesData.filter(a => a.status === "inactive").length / athletesData.length) * 100)} 
                      className="h-2 bg-gray-100"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Pendentes</span>
                      <span className="font-medium">
                        {athletesData.filter(a => a.status === "pending").length}
                      </span>
                    </div>
                    <Progress 
                      value={Math.round((athletesData.filter(a => a.status === "pending").length / athletesData.length) * 100)} 
                      className="h-2 bg-gray-100"
                    />
                  </div>
                </div>

                <div className="h-[1px] bg-gray-100 my-6"></div>

                <div className="flex flex-col gap-4">
                  <h4 className="font-medium">Novos Atletas (30 dias)</h4>
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <Users size={20} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {athletesData.filter(a => {
                          const regDate = new Date(a.registrationDate);
                          const thirtyDaysAgo = new Date();
                          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                          return regDate >= thirtyDaysAgo;
                        }).length}
                      </p>
                      <p className="text-sm text-gray-500">Novos registros</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="financial">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-6">Receita Mensal</h3>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-3xl font-bold text-green-600">
                      {formatKwanza(dashboardStats.monthlyRevenue)}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Total do mês atual</p>
                  </div>
                  <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <CircleDollarSign size={32} />
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="font-medium mb-4">Resumo Financeiro</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Pagamentos recebidos</span>
                        <span className="font-medium text-green-600">
                          {formatKwanza(dashboardStats.monthlyRevenue)}
                        </span>
                      </div>
                      <Progress 
                        value={100} 
                        className="h-2 bg-gray-100"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Pagamentos pendentes</span>
                        <span className="font-medium text-yellow-600">
                          {formatKwanza(15000)}
                        </span>
                      </div>
                      <Progress 
                        value={30} 
                        className="h-2 bg-gray-100"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Pagamentos vencidos</span>
                        <span className="font-medium text-red-600">
                          {formatKwanza(25000)}
                        </span>
                      </div>
                      <Progress 
                        value={10} 
                        className="h-2 bg-gray-100"
                      />
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-medium mb-6">Distribuição por Planos</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Básico</span>
                      <span className="font-medium">
                        {athletesData.filter(a => a.plan === "Básico").length} atletas
                      </span>
                    </div>
                    <Progress 
                      value={Math.round((athletesData.filter(a => a.plan === "Básico").length / athletesData.length) * 100)} 
                      className="h-2 bg-gray-100"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Premium</span>
                      <span className="font-medium">
                        {athletesData.filter(a => a.plan === "Premium").length} atletas
                      </span>
                    </div>
                    <Progress 
                      value={Math.round((athletesData.filter(a => a.plan === "Premium").length / athletesData.length) * 100)} 
                      className="h-2 bg-gray-100"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Premium Plus</span>
                      <span className="font-medium">
                        {athletesData.filter(a => a.plan === "Premium Plus").length} atletas
                      </span>
                    </div>
                    <Progress 
                      value={Math.round((athletesData.filter(a => a.plan === "Premium Plus").length / athletesData.length) * 100)} 
                      className="h-2 bg-gray-100"
                    />
                  </div>
                </div>

                <div className="h-[1px] bg-gray-100 my-6"></div>

                <div className="mt-6">
                  <h4 className="font-medium mb-4">Receita por Modalidade</h4>
                  <div className="space-y-4">
                    {modalitiesData.map((modality) => (
                      <div key={modality.id}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{modality.name}</span>
                          <span className="font-medium">
                            {formatKwanza(modality.monthlyPrice * 
                              athletesData.filter(a => 
                                a.modality.includes(modality.name) && a.status === "active"
                              ).length
                            )}
                          </span>
                        </div>
                        <Progress 
                          value={Math.round(
                            (athletesData.filter(a => a.modality.includes(modality.name)).length / 
                            dashboardStats.activeAthletes) * 100
                          )} 
                          className="h-2 bg-gray-100"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="attendance">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium">Frequência de Aulas</h3>
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Calendar size={20} />
                  </div>
                </div>
                
                <div className="flex flex-col items-center justify-center py-6">
                  <p className="text-muted-foreground text-center">
                    Os relatórios detalhados de frequência estarão disponíveis após 
                    o registro de presença nas aulas.
                  </p>
                  <Button className="mt-4">
                    Ir para Registro de Presença
                  </Button>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium">Visão Geral de Frequência</h3>
                </div>
                
                <div className="flex flex-col gap-4">
                  <div className="p-3 border rounded">
                    <div className="flex justify-between">
                      <span className="font-medium">Jiu-Jitsu</span>
                      <span>85% frequência média</span>
                    </div>
                    <Progress value={85} className="mt-2 h-2" />
                  </div>
                  
                  <div className="p-3 border rounded">
                    <div className="flex justify-between">
                      <span className="font-medium">Musculação</span>
                      <span>72% frequência média</span>
                    </div>
                    <Progress value={72} className="mt-2 h-2" />
                  </div>
                  
                  <div className="p-3 border rounded">
                    <div className="flex justify-between">
                      <span className="font-medium">Condicionamento</span>
                      <span>68% frequência média</span>
                    </div>
                    <Progress value={68} className="mt-2 h-2" />
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </MainLayout>
  );
};

export default Reports;
