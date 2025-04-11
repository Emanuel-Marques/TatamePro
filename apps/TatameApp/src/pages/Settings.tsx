
import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  User, Settings as SettingsIcon, CreditCard, 
  Building, Bell, Shield, Database, Globe
} from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function Settings() {
  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Definições</h1>
        </div>
        
        <Tabs defaultValue="conta" className="w-full">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/4">
              <TabsList className="flex flex-col h-auto bg-white border rounded-md p-2 gap-1">
                <TabsTrigger value="conta" className="w-full justify-start gap-2">
                  <User className="h-4 w-4" />
                  Conta
                </TabsTrigger>
                <TabsTrigger value="academia" className="w-full justify-start gap-2">
                  <Building className="h-4 w-4" />
                  Academia
                </TabsTrigger>
                <TabsTrigger value="pagamento" className="w-full justify-start gap-2">
                  <CreditCard className="h-4 w-4" />
                  Métodos de Pagamento
                </TabsTrigger>
                <TabsTrigger value="notificacoes" className="w-full justify-start gap-2">
                  <Bell className="h-4 w-4" />
                  Notificações
                </TabsTrigger>
                <TabsTrigger value="sistema" className="w-full justify-start gap-2">
                  <SettingsIcon className="h-4 w-4" />
                  Sistema
                </TabsTrigger>
                <TabsTrigger value="seguranca" className="w-full justify-start gap-2">
                  <Shield className="h-4 w-4" />
                  Segurança
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="md:w-3/4">
              <TabsContent value="conta">
                <Card>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Informações da Conta</h2>
                    
                    <div className="space-y-6">
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="flex-shrink-0">
                          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                            <img 
                              src="https://randomuser.me/api/portraits/men/32.jpg" 
                              alt="Profile" 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                        </div>
                        <div className="flex-grow space-y-4">
                          <div className="flex flex-col">
                            <Label htmlFor="display-name">Nome</Label>
                            <Input id="display-name" value="Admin TatamePro" className="mt-1" />
                          </div>
                          <div className="flex flex-col">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" value="admin@tatamepro.com" className="mt-1" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                          <Label htmlFor="phone">Telefone</Label>
                          <Input id="phone" value="+244 923 456 789" className="mt-1" />
                        </div>
                        <div className="flex flex-col">
                          <Label htmlFor="position">Cargo</Label>
                          <Input id="position" value="Administrador" className="mt-1" />
                        </div>
                      </div>

                      <div className="border-t pt-6 flex justify-end">
                        <Button>Salvar Alterações</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="academia">
                <Card>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Informações da Academia</h2>
                    
                    <div className="space-y-6">
                      <div className="flex flex-col">
                        <Label htmlFor="academy-name">Nome da Academia</Label>
                        <Input id="academy-name" value="TatamePro Academy" className="mt-1" />
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                          <Label htmlFor="academy-phone">Telefone</Label>
                          <Input id="academy-phone" value="+244 923 456 789" className="mt-1" />
                        </div>
                        <div className="flex flex-col">
                          <Label htmlFor="academy-email">Email</Label>
                          <Input id="academy-email" type="email" value="contato@tatamepro.com" className="mt-1" />
                        </div>
                      </div>
                      
                      <div className="flex flex-col">
                        <Label htmlFor="academy-address">Endereço</Label>
                        <Input id="academy-address" value="Rua dos Desportistas, 123, Luanda" className="mt-1" />
                      </div>
                      
                      <div className="flex flex-col">
                        <Label htmlFor="academy-description">Descrição</Label>
                        <textarea 
                          id="academy-description" 
                          className="flex min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1 w-full"
                          defaultValue="Academia de artes marciais especializada em Jiu-Jitsu e fitness."
                        />
                      </div>

                      <div className="border-t pt-6 flex justify-end">
                        <Button>Salvar Alterações</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="pagamento">
                <Card>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Métodos de Pagamento</h2>
                    
                    <div className="space-y-6">
                      <h3 className="font-medium">Métodos Aceitos</h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border p-3 rounded-md">
                          <div className="flex items-center gap-3">
                            <div className="bg-blue-100 text-blue-700 p-2 rounded-md">
                              <CreditCard className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="font-medium">Cartão de Crédito/Débito</div>
                              <div className="text-sm text-gray-500">Visa, Mastercard, outros</div>
                            </div>
                          </div>
                          <Switch checked={true} />
                        </div>
                        
                        <div className="flex items-center justify-between border p-3 rounded-md">
                          <div className="flex items-center gap-3">
                            <div className="bg-green-100 text-green-700 p-2 rounded-md">
                              <Database className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="font-medium">Transferência Bancária</div>
                              <div className="text-sm text-gray-500">Transferências diretas para conta</div>
                            </div>
                          </div>
                          <Switch checked={true} />
                        </div>
                        
                        <div className="flex items-center justify-between border p-3 rounded-md">
                          <div className="flex items-center gap-3">
                            <div className="bg-amber-100 text-amber-700 p-2 rounded-md">
                              <Globe className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="font-medium">Pagamento Móvel</div>
                              <div className="text-sm text-gray-500">Serviços de pagamento móvel</div>
                            </div>
                          </div>
                          <Switch checked={false} />
                        </div>
                      </div>

                      <div className="border-t pt-6 flex justify-end">
                        <Button>Salvar Alterações</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="notificacoes">
                <Card>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Preferências de Notificações</h2>
                    
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Pagamentos Pendentes</div>
                            <div className="text-sm text-gray-500">Receba alertas sobre mensalidades a vencer</div>
                          </div>
                          <Switch checked={true} />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Novos Registros</div>
                            <div className="text-sm text-gray-500">Notificações quando novos atletas se registram</div>
                          </div>
                          <Switch checked={true} />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Eventos da Academia</div>
                            <div className="text-sm text-gray-500">Atualizações sobre eventos e competições</div>
                          </div>
                          <Switch checked={true} />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Relatórios Semanais</div>
                            <div className="text-sm text-gray-500">Resumos semanais de atividades e finanças</div>
                          </div>
                          <Switch checked={false} />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Notificações por Email</div>
                            <div className="text-sm text-gray-500">Receber notificações também por email</div>
                          </div>
                          <Switch checked={true} />
                        </div>
                      </div>

                      <div className="border-t pt-6 flex justify-end">
                        <Button>Salvar Preferências</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="sistema">
                <Card>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Configurações do Sistema</h2>
                    
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Tema Escuro</div>
                            <div className="text-sm text-gray-500">Alternar entre tema claro e escuro</div>
                          </div>
                          <Switch checked={false} />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Backup Automático</div>
                            <div className="text-sm text-gray-500">Backup diário dos dados do sistema</div>
                          </div>
                          <Switch checked={true} />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Idioma</div>
                            <div className="text-sm text-gray-500">Português (Angola)</div>
                          </div>
                          <Button variant="outline" size="sm">Alterar</Button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Moeda</div>
                            <div className="text-sm text-gray-500">Kwanza (AOA)</div>
                          </div>
                          <Button variant="outline" size="sm">Alterar</Button>
                        </div>
                      </div>

                      <div className="border-t pt-6 flex justify-end">
                        <Button>Salvar Alterações</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="seguranca">
                <Card>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Segurança</h2>
                    
                    <div className="space-y-6">
                      <div className="flex flex-col">
                        <Label htmlFor="current-password">Senha Atual</Label>
                        <Input id="current-password" type="password" className="mt-1" />
                      </div>
                      
                      <div className="flex flex-col">
                        <Label htmlFor="new-password">Nova Senha</Label>
                        <Input id="new-password" type="password" className="mt-1" />
                      </div>
                      
                      <div className="flex flex-col">
                        <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                        <Input id="confirm-password" type="password" className="mt-1" />
                      </div>
                      
                      <div className="pt-4">
                        <h3 className="font-medium mb-3">Verificação em Duas Etapas</h3>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Ativar verificação em duas etapas</div>
                            <div className="text-sm text-gray-500">Adiciona uma camada extra de segurança à sua conta</div>
                          </div>
                          <Switch checked={false} />
                        </div>
                      </div>

                      <div className="border-t pt-6 flex justify-end gap-3">
                        <Button variant="outline">Cancelar</Button>
                        <Button>Salvar Alterações</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </MainLayout>
  );
}
