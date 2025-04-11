
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { 
  Card, CardContent, CardDescription, CardFooter, 
  CardHeader, CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem 
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form, FormField, FormItem, FormLabel, FormControl, 
  FormDescription, FormMessage 
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ChevronRight, UserPlus, CircleDollarSign, Clipboard, 
  CheckCircle, Check, CalendarRange
} from "lucide-react";
import { plansData, modalitiesData, formatKwanza } from "@/lib/data";

const Registration = () => {
  const [step, setStep] = useState(1);
  const [selectedModalities, setSelectedModalities] = useState<string[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleModalityToggle = (modality: string) => {
    if (selectedModalities.includes(modality)) {
      setSelectedModalities(selectedModalities.filter(m => m !== modality));
    } else {
      setSelectedModalities([...selectedModalities, modality]);
    }
  };

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const filteredPlans = selectedModalities.length > 0
    ? plansData.filter(plan => 
        selectedModalities.every(modality => 
          plan.modalities.includes(modality)
        )
      )
    : plansData;

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <MainLayout>
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Nova Matrícula</h1>
          <p className="text-muted-foreground">
            Registre um novo atleta ou aluno em sua academia.
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          <div className="flex flex-col items-center">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
              step >= 1 ? "bg-tatame-800 text-white" : "bg-gray-200 text-gray-500"
            }`}>
              <UserPlus size={20} />
            </div>
            <span className="text-sm mt-2">Dados Pessoais</span>
          </div>
          <div className="relative flex-1 mx-4">
            <div className="absolute top-5 w-full h-[2px] bg-gray-200">
              <div className={`h-full bg-tatame-800 transition-all ${
                step >= 2 ? "w-full" : "w-0"
              }`}></div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
              step >= 2 ? "bg-tatame-800 text-white" : "bg-gray-200 text-gray-500"
            }`}>
              <Clipboard size={20} />
            </div>
            <span className="text-sm mt-2">Modalidades</span>
          </div>
          <div className="relative flex-1 mx-4">
            <div className="absolute top-5 w-full h-[2px] bg-gray-200">
              <div className={`h-full bg-tatame-800 transition-all ${
                step >= 3 ? "w-full" : "w-0"
              }`}></div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
              step >= 3 ? "bg-tatame-800 text-white" : "bg-gray-200 text-gray-500"
            }`}>
              <CircleDollarSign size={20} />
            </div>
            <span className="text-sm mt-2">Plano</span>
          </div>
          <div className="relative flex-1 mx-4">
            <div className="absolute top-5 w-full h-[2px] bg-gray-200">
              <div className={`h-full bg-tatame-800 transition-all ${
                step >= 4 ? "w-full" : "w-0"
              }`}></div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
              step >= 4 ? "bg-tatame-800 text-white" : "bg-gray-200 text-gray-500"
            }`}>
              <CheckCircle size={20} />
            </div>
            <span className="text-sm mt-2">Confirmação</span>
          </div>
        </div>

        {/* Step 1: Personal Information */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Dados Pessoais</CardTitle>
              <CardDescription>
                Preencha as informações pessoais do novo atleta.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nome Completo</Label>
                  <Input id="fullName" placeholder="Nome do atleta" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Data de Nascimento</Label>
                  <Input id="birthDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@exemplo.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" placeholder="+244 923 456 789" />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <Label>Gênero</Label>
                <RadioGroup defaultValue="male" className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male" className="cursor-pointer">Masculino</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female" className="cursor-pointer">Feminino</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Textarea id="address" placeholder="Endereço completo" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Contato de Emergência</Label>
                <Input id="emergencyContact" placeholder="Nome e telefone" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={nextStep}>
                Próximo <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 2: Modalities */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Modalidades</CardTitle>
              <CardDescription>
                Selecione as modalidades que o atleta deseja participar.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {modalitiesData.map((modality) => (
                  <div 
                    key={modality.id} 
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedModalities.includes(modality.name)
                        ? "border-tatame-800 bg-tatame-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleModalityToggle(modality.name)}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{modality.name}</h3>
                      <div className={`h-5 w-5 rounded border flex items-center justify-center ${
                        selectedModalities.includes(modality.name)
                          ? "bg-tatame-800 border-tatame-800"
                          : "border-gray-300"
                      }`}>
                        {selectedModalities.includes(modality.name) && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{modality.description}</p>
                    <p className="text-sm font-medium mt-2">{formatKwanza(modality.monthlyPrice)}/mês</p>
                  </div>
                ))}
              </div>
              
              {selectedModalities.length > 0 && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-2">Modalidades Selecionadas</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedModalities.map((modality) => (
                      <Badge key={modality} className="bg-tatame-100 text-tatame-800 hover:bg-tatame-200">
                        {modality}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                Voltar
              </Button>
              <Button onClick={nextStep} disabled={selectedModalities.length === 0}>
                Próximo <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 3: Plan */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Plano de Mensalidade</CardTitle>
              <CardDescription>
                Escolha o plano mais adequado para o atleta.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredPlans.map((plan) => (
                  <div 
                    key={plan.id}
                    className={`p-5 rounded-lg border cursor-pointer transition-colors ${
                      selectedPlan === plan.id
                        ? "border-tatame-800 bg-tatame-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handlePlanSelect(plan.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">{plan.name}</h3>
                        <p className="text-sm text-gray-500">{plan.description}</p>
                      </div>
                      <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                        selectedPlan === plan.id
                          ? "bg-tatame-800 border-tatame-800"
                          : "border-gray-300"
                      }`}>
                        {selectedPlan === plan.id && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-baseline">
                      <span className="text-2xl font-bold">{formatKwanza(plan.price)}</span>
                      <span className="text-gray-500 ml-1">
                        /{plan.billingFrequency === "monthly" ? "mês" : 
                          plan.billingFrequency === "quarterly" ? "trimestre" : 
                          plan.billingFrequency === "semiannual" ? "semestre" : "ano"}
                      </span>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex items-center mb-2">
                        <CalendarRange className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-500">
                          {plan.billingFrequency === "monthly" ? "Pagamento Mensal" : 
                           plan.billingFrequency === "quarterly" ? "Pagamento Trimestral" : 
                           plan.billingFrequency === "semiannual" ? "Pagamento Semestral" : "Pagamento Anual"}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {plan.modalities.map((modality) => (
                          <Badge 
                            key={modality} 
                            className={`${
                              selectedModalities.includes(modality)
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                            }`}
                          >
                            {modality}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="space-y-2">
                        {plan.benefits.slice(0, 3).map((benefit, index) => (
                          <div key={index} className="flex items-start">
                            <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                            <span className="text-sm">{benefit}</span>
                          </div>
                        ))}
                        {plan.benefits.length > 3 && (
                          <div className="text-sm text-gray-500">
                            +{plan.benefits.length - 3} outros benefícios
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredPlans.length === 0 && (
                  <div className="col-span-2 p-8 border rounded-lg text-center">
                    <p className="text-gray-500 mb-4">
                      Não encontramos planos compatíveis com todas as modalidades selecionadas.
                      Por favor, revise sua seleção de modalidades ou entre em contato com o administrador.
                    </p>
                    <Button variant="outline" onClick={prevStep}>
                      Revisar Modalidades
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                Voltar
              </Button>
              <Button onClick={nextStep} disabled={!selectedPlan}>
                Próximo <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Confirmação</CardTitle>
              <CardDescription>
                Verifique os dados antes de finalizar a matrícula.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Dados Pessoais</h3>
                  <div className="grid grid-cols-2 gap-y-2 mt-2">
                    <div className="text-sm">Nome:</div>
                    <div className="text-sm font-medium">Carlos Mendes</div>
                    <div className="text-sm">Email:</div>
                    <div className="text-sm font-medium">carlos@exemplo.com</div>
                    <div className="text-sm">Telefone:</div>
                    <div className="text-sm font-medium">+244 923 456 789</div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium">Modalidades Escolhidas</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedModalities.map((modality) => (
                      <Badge key={modality} className="bg-tatame-100 text-tatame-800">
                        {modality}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium">Plano de Mensalidade</h3>
                  <div className="p-4 border rounded-md mt-2">
                    {selectedPlan && (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">
                            {plansData.find(p => p.id === selectedPlan)?.name}
                          </span>
                          <span className="font-bold">
                            {formatKwanza(plansData.find(p => p.id === selectedPlan)?.price || 0)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          {plansData.find(p => p.id === selectedPlan)?.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="text-sm">
                      Concordo com os termos e condições da academia
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="privacy" />
                    <Label htmlFor="privacy" className="text-sm">
                      Concordo com a política de privacidade
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                Voltar
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="mr-2 h-4 w-4" /> Finalizar Matrícula
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default Registration;
