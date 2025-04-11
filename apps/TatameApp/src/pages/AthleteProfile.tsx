
import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";
import { 
  User, Calendar, Award, Dumbbell, Clock, CreditCard, 
  Phone, Mail, MapPin, Clipboard 
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock de dados do atleta
const athleteData = {
  id: "1",
  name: "João Silva",
  photo: "https://randomuser.me/api/portraits/men/1.jpg",
  email: "joao.silva@email.com",
  phone: "+244 923 456 789",
  address: "Rua Principal, 123, Luanda",
  birthdate: "15/05/1992",
  registrationDate: "10/01/2023",
  modalities: ["Jiu-Jitsu", "Musculação"],
  belt: "Azul",
  stripes: 2,
  plan: "Premium",
  planPrice: "25000",
  lastPayment: "05/04/2025",
  nextPayment: "05/05/2025",
  attendance: {
    total: 145,
    lastMonth: 18,
    percentage: 85
  },
  achievements: [
    { title: "Competição Nacional 2024", place: "2º Lugar", date: "15/02/2024" },
    { title: "Campeonato Regional", place: "1º Lugar", date: "20/11/2023" }
  ],
  notes: "Atleta dedicado, tem demonstrado grande progresso na transição guarda-raspagem."
};

export default function AthleteProfile() {
  const { id } = useParams<{ id: string }>();
  // Num cenário real, buscaríamos os dados do atleta com base no ID
  const athlete = athleteData;

  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Seção do perfil */}
        <div className="md:w-1/3">
          <Card className="p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-emerald-500">
                <img 
                  src={athlete.photo} 
                  alt={athlete.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <h2 className="text-2xl font-bold">{athlete.name}</h2>
              <div className="flex items-center mt-2 gap-2">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                  Faixa {athlete.belt}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                  {athlete.stripes} Listras
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="text-gray-500 w-5 h-5" />
                <span>{athlete.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-gray-500 w-5 h-5" />
                <span>{athlete.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-gray-500 w-5 h-5" />
                <span>{athlete.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="text-gray-500 w-5 h-5" />
                <span>Nascimento: {athlete.birthdate}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="text-gray-500 w-5 h-5" />
                <span>Registrado em: {athlete.registrationDate}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-semibold mb-3">Modalidades</h3>
              <div className="flex flex-wrap gap-2">
                {athlete.modalities.map((modality) => (
                  <span key={modality} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                    {modality}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-3">
              <Button variant="outline" size="sm">
                <User className="mr-2 h-4 w-4" />
                Editar Perfil
              </Button>
              <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50">
                <User className="mr-2 h-4 w-4" />
                Desativar
              </Button>
            </div>
          </Card>
        </div>

        {/* Seção de detalhes */}
        <div className="md:w-2/3">
          <Tabs defaultValue="financeiro" className="w-full">
            <TabsList className="w-full bg-white border mb-4">
              <TabsTrigger value="financeiro" className="flex-1">
                <CreditCard className="mr-2 h-4 w-4" />
                Financeiro
              </TabsTrigger>
              <TabsTrigger value="treinos" className="flex-1">
                <Dumbbell className="mr-2 h-4 w-4" />
                Treinos
              </TabsTrigger>
              <TabsTrigger value="conquistas" className="flex-1">
                <Award className="mr-2 h-4 w-4" />
                Conquistas
              </TabsTrigger>
              <TabsTrigger value="notas" className="flex-1">
                <Clipboard className="mr-2 h-4 w-4" />
                Notas
              </TabsTrigger>
            </TabsList>

            <TabsContent value="financeiro">
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Informações Financeiras</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="text-sm text-gray-500">Plano Atual</div>
                      <div className="font-medium text-lg">{athlete.plan}</div>
                      <div className="text-emerald-600 font-semibold mt-1">
                        {new Intl.NumberFormat('pt-AO', { 
                          style: 'currency', 
                          currency: 'AOA' 
                        }).format(Number(athlete.planPrice))}
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="text-sm text-gray-500">Status do Pagamento</div>
                      <div className="font-medium text-lg flex items-center gap-2">
                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                        Em dia
                      </div>
                      <div className="text-gray-500 mt-1">Próximo pagamento: {athlete.nextPayment}</div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="text-sm text-gray-500">Último Pagamento</div>
                      <div className="font-medium">{athlete.lastPayment}</div>
                      <div className="text-emerald-600 font-semibold mt-1">
                        {new Intl.NumberFormat('pt-AO', { 
                          style: 'currency', 
                          currency: 'AOA' 
                        }).format(Number(athlete.planPrice))}
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md flex items-center justify-center">
                      <Button>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Registrar Pagamento
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h4 className="font-semibold mb-3">Histórico de Pagamentos</h4>
                    <div className="border rounded-md overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="py-3 px-4 text-left font-medium text-gray-600">Data</th>
                            <th className="py-3 px-4 text-left font-medium text-gray-600">Valor</th>
                            <th className="py-3 px-4 text-left font-medium text-gray-600">Método</th>
                            <th className="py-3 px-4 text-left font-medium text-gray-600">Recibo</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t">
                            <td className="py-3 px-4">05/04/2025</td>
                            <td className="py-3 px-4">25.000 Kz</td>
                            <td className="py-3 px-4">Cartão de Crédito</td>
                            <td className="py-3 px-4">
                              <Button variant="ghost" size="sm" className="text-emerald-600 p-0 h-auto">
                                Ver Recibo
                              </Button>
                            </td>
                          </tr>
                          <tr className="border-t">
                            <td className="py-3 px-4">05/03/2025</td>
                            <td className="py-3 px-4">25.000 Kz</td>
                            <td className="py-3 px-4">Transferência</td>
                            <td className="py-3 px-4">
                              <Button variant="ghost" size="sm" className="text-emerald-600 p-0 h-auto">
                                Ver Recibo
                              </Button>
                            </td>
                          </tr>
                          <tr className="border-t">
                            <td className="py-3 px-4">05/02/2025</td>
                            <td className="py-3 px-4">25.000 Kz</td>
                            <td className="py-3 px-4">Dinheiro</td>
                            <td className="py-3 px-4">
                              <Button variant="ghost" size="sm" className="text-emerald-600 p-0 h-auto">
                                Ver Recibo
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="treinos">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Histórico de Treinos</h3>
                
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="text-sm text-gray-500">Total de Treinos</div>
                    <div className="font-bold text-2xl">{athlete.attendance.total}</div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="text-sm text-gray-500">Treinos no Mês</div>
                    <div className="font-bold text-2xl">{athlete.attendance.lastMonth}</div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="text-sm text-gray-500">Taxa de Presença</div>
                    <div className="font-bold text-2xl">{athlete.attendance.percentage}%</div>
                  </div>
                </div>

                <div className="border rounded-md overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-3 px-4 text-left font-medium text-gray-600">Data</th>
                        <th className="py-3 px-4 text-left font-medium text-gray-600">Modalidade</th>
                        <th className="py-3 px-4 text-left font-medium text-gray-600">Instrutor</th>
                        <th className="py-3 px-4 text-left font-medium text-gray-600">Duração</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="py-3 px-4">08/04/2025</td>
                        <td className="py-3 px-4">Jiu-Jitsu</td>
                        <td className="py-3 px-4">Mestre Paulo</td>
                        <td className="py-3 px-4">1h 30min</td>
                      </tr>
                      <tr className="border-t">
                        <td className="py-3 px-4">06/04/2025</td>
                        <td className="py-3 px-4">Musculação</td>
                        <td className="py-3 px-4">Técnico Roberto</td>
                        <td className="py-3 px-4">1h</td>
                      </tr>
                      <tr className="border-t">
                        <td className="py-3 px-4">05/04/2025</td>
                        <td className="py-3 px-4">Jiu-Jitsu</td>
                        <td className="py-3 px-4">Mestre Paulo</td>
                        <td className="py-3 px-4">1h 30min</td>
                      </tr>
                      <tr className="border-t">
                        <td className="py-3 px-4">03/04/2025</td>
                        <td className="py-3 px-4">Jiu-Jitsu</td>
                        <td className="py-3 px-4">Mestre Paulo</td>
                        <td className="py-3 px-4">1h 30min</td>
                      </tr>
                      <tr className="border-t">
                        <td className="py-3 px-4">01/04/2025</td>
                        <td className="py-3 px-4">Musculação</td>
                        <td className="py-3 px-4">Técnico Roberto</td>
                        <td className="py-3 px-4">1h</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm">Ver Histórico Completo</Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="conquistas">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Conquistas e Competições</h3>
                
                <div className="space-y-4">
                  {athlete.achievements.map((achievement, index) => (
                    <div key={index} className="flex gap-4 border-b pb-4 last:border-0">
                      <div className="bg-amber-100 text-amber-700 p-3 rounded-full h-12 w-12 flex items-center justify-center">
                        <Award size={24} />
                      </div>
                      <div>
                        <h4 className="font-medium">{achievement.title}</h4>
                        <div className="text-emerald-600 font-medium">{achievement.place}</div>
                        <div className="text-sm text-gray-500">{achievement.date}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <Button>
                    <Award className="mr-2 h-4 w-4" />
                    Adicionar Conquista
                  </Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="notas">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Notas do Treinador</h3>
                
                <div className="bg-gray-50 p-4 rounded-md border mb-4">
                  <p>{athlete.notes}</p>
                </div>

                <div className="flex space-x-3">
                  <Button>
                    <Clipboard className="mr-2 h-4 w-4" />
                    Adicionar Nota
                  </Button>
                  <Button variant="outline">Editar Notas</Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}
