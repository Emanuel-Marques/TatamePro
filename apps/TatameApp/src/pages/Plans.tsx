
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, 
  DropdownMenuItem, DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter, DialogClose
} from "@/components/ui/dialog";
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from "@/components/ui/tabs";
import {
  Search, PlusCircle, MoreVertical, Edit, Trash2, Check,
  CreditCard, CircleDollarSign, CalendarRange
} from "lucide-react";
import { plansData, formatKwanza } from "@/lib/data";
import { PlanData } from "@/lib/data";

const Plans = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<PlanData | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  const filteredPlans = plansData.filter((plan) => {
    return plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Group plans by billing frequency
  const monthlyPlans = filteredPlans.filter(p => p.billingFrequency === "monthly");
  const quarterlyPlans = filteredPlans.filter(p => p.billingFrequency === "quarterly");
  const semiannualPlans = filteredPlans.filter(p => p.billingFrequency === "semiannual");
  const annualPlans = filteredPlans.filter(p => p.billingFrequency === "annual");

  const handleViewDetails = (plan: PlanData) => {
    setSelectedPlan(plan);
    setShowDetailsDialog(true);
  };

  const planDurationText = (frequency: string): string => {
    switch (frequency) {
      case 'monthly': return 'Mensalidade';
      case 'quarterly': return 'Trimestral';
      case 'semiannual': return 'Semestral';
      case 'annual': return 'Anual';
      default: return 'Personalizado';
    }
  };

  return (
    <MainLayout>
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Planos</h1>
          <p className="text-muted-foreground">
            Gerencie os planos de mensalidade disponíveis.
          </p>
        </div>
        <div>
          <Button className="bg-tatame-800 hover:bg-tatame-700 text-white">
            <PlusCircle className="mr-2 h-4 w-4" /> Novo Plano
          </Button>
        </div>
      </header>

      <div className="mb-6 relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Buscar planos..." 
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="monthly">
        <TabsList className="mb-6">
          <TabsTrigger value="monthly">Mensais</TabsTrigger>
          <TabsTrigger value="quarterly">Trimestrais</TabsTrigger>
          <TabsTrigger value="semiannual">Semestrais</TabsTrigger>
          <TabsTrigger value="annual">Anuais</TabsTrigger>
        </TabsList>
        
        <TabsContent value="monthly">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {monthlyPlans.map((plan) => renderPlanCard(plan, handleViewDetails))}
          </div>
          {monthlyPlans.length === 0 && renderEmptyState("mensais")}
        </TabsContent>
        
        <TabsContent value="quarterly">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quarterlyPlans.map((plan) => renderPlanCard(plan, handleViewDetails))}
          </div>
          {quarterlyPlans.length === 0 && renderEmptyState("trimestrais")}
        </TabsContent>
        
        <TabsContent value="semiannual">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {semiannualPlans.map((plan) => renderPlanCard(plan, handleViewDetails))}
          </div>
          {semiannualPlans.length === 0 && renderEmptyState("semestrais")}
        </TabsContent>
        
        <TabsContent value="annual">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {annualPlans.map((plan) => renderPlanCard(plan, handleViewDetails))}
          </div>
          {annualPlans.length === 0 && renderEmptyState("anuais")}
        </TabsContent>
      </Tabs>

      {/* Details Dialog */}
      {selectedPlan && (
        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Detalhes do Plano</DialogTitle>
              <DialogDescription>
                Informações completas sobre o plano selecionado.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-medium">{selectedPlan.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedPlan.description}</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                  {planDurationText(selectedPlan.billingFrequency)}
                </Badge>
              </div>

              <div className="mt-4">
                <div className="flex items-center">
                  <CircleDollarSign className="mr-2 h-5 w-5 text-green-600" />
                  <span className="text-2xl font-bold text-green-600">
                    {formatKwanza(selectedPlan.price)}
                  </span>
                  <span className="text-sm text-muted-foreground ml-2">
                    / {selectedPlan.billingFrequency === "monthly" ? "mês" : 
                       selectedPlan.billingFrequency === "quarterly" ? "trimestre" : 
                       selectedPlan.billingFrequency === "semiannual" ? "semestre" : "ano"}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <h4 className="font-medium mb-2">Modalidades Incluídas</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPlan.modalities.map((modality) => (
                    <Badge key={modality} variant="outline" className="bg-gray-100">
                      {modality}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <h4 className="font-medium mb-2">Benefícios</h4>
                <ul className="space-y-2">
                  {selectedPlan.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
                Fechar
              </Button>
              <Button>Editar Plano</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </MainLayout>
  );
};

function renderPlanCard(plan: PlanData, onDetailsClick: (plan: PlanData) => void) {
  const billingText = plan.billingFrequency === "monthly" ? "mês" : 
                      plan.billingFrequency === "quarterly" ? "trimestre" : 
                      plan.billingFrequency === "semiannual" ? "semestre" : "ano";
  
  return (
    <Card key={plan.id} className="overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">{plan.name}</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onDetailsClick(plan)}>
                Ver Detalhes
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Remover
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="mt-4">
          <p className="text-3xl font-bold">
            {formatKwanza(plan.price)}
            <span className="text-sm text-muted-foreground font-normal">
              /{billingText}
            </span>
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {plan.description}
          </p>
        </div>
        
        <div className="mt-6 space-y-3">
          {plan.benefits.slice(0, 3).map((benefit, index) => (
            <div key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-600 mr-2 shrink-0" />
              <span className="text-sm">{benefit}</span>
            </div>
          ))}
          {plan.benefits.length > 3 && (
            <p className="text-sm text-muted-foreground">
              +{plan.benefits.length - 3} outros benefícios
            </p>
          )}
        </div>
      </div>
      <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
        <div className="flex items-center">
          <CalendarRange className="h-4 w-4 text-muted-foreground mr-1" />
          <span className="text-sm text-muted-foreground capitalize">
            {plan.billingFrequency === "monthly" ? "Pagamento Mensal" : 
             plan.billingFrequency === "quarterly" ? "Pagamento Trimestral" : 
             plan.billingFrequency === "semiannual" ? "Pagamento Semestral" : "Pagamento Anual"}
          </span>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onDetailsClick(plan)}
        >
          Ver detalhes
        </Button>
      </div>
    </Card>
  );
}

function renderEmptyState(frequencyLabel: string) {
  return (
    <Card className="p-12 flex flex-col items-center justify-center">
      <CreditCard className="h-12 w-12 text-gray-300 mb-4" />
      <h3 className="text-xl font-medium mb-2">Sem Planos {frequencyLabel}</h3>
      <p className="text-muted-foreground text-center mb-4">
        Não existem planos {frequencyLabel} configurados atualmente.
      </p>
      <Button>
        <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Plano
      </Button>
    </Card>
  );
}

export default Plans;
