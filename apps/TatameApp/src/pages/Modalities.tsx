
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { 
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, 
  DropdownMenuItem, DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { 
  Dialog, DialogTrigger, DialogContent, DialogHeader, 
  DialogTitle, DialogDescription, DialogFooter, DialogClose
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dumbbell, PlusCircle, Search, MoreVertical,
  Eye, Edit, Trash2, Users, Award, CircleDollarSign, Calendar
} from "lucide-react";
import { ModalityData, modalitiesData, formatKwanza } from "@/lib/data";

const Modalities = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModality, setSelectedModality] = useState<ModalityData | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const filteredModalities = modalitiesData.filter((modality) => {
    return modality.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      modality.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleViewDetails = (modality: ModalityData) => {
    setSelectedModality(modality);
    setShowDetailsDialog(true);
  };

  return (
    <MainLayout>
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Modalidades</h1>
          <p className="text-muted-foreground">
            Gerencie as modalidades de treino oferecidas na academia.
          </p>
        </div>
        <div>
          <Button 
            className="bg-tatame-800 hover:bg-tatame-700 text-white"
            onClick={() => setShowAddDialog(true)}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Nova Modalidade
          </Button>
        </div>
      </header>

      <Card className="p-6">
        <div className="mb-6 relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar modalidades..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModalities.map((modality) => (
            <Card key={modality.id} className="overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">{modality.name}</h3>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewDetails(modality)}>
                        <Eye className="mr-2 h-4 w-4" />
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
                <p className="text-muted-foreground text-sm mt-2 mb-4 line-clamp-2">
                  {modality.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <CircleDollarSign className="h-4 w-4 text-muted-foreground mr-1" />
                    <span className="text-sm">{formatKwanza(modality.monthlyPrice)}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-muted-foreground mr-1" />
                    <span className="text-sm">{modality.instructors.length} Instrutores</span>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-muted-foreground mr-1" />
                  <span className="text-sm text-muted-foreground">{modality.schedule}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleViewDetails(modality)}
                >
                  Ver detalhes
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Details Dialog */}
      {selectedModality && (
        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Detalhes da Modalidade</DialogTitle>
              <DialogDescription>
                Informações completas sobre a modalidade selecionada.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-medium">{selectedModality.name}</h3>
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                  {selectedModality.name === "Jiu-Jitsu" ? (
                    <Award size={20} />
                  ) : selectedModality.name === "Condicionamento" ? (
                    <Users size={20} />
                  ) : (
                    <Dumbbell size={20} />
                  )}
                </div>
              </div>

              <div>
                <Label>Descrição</Label>
                <p className="text-sm mt-1">{selectedModality.description}</p>
              </div>

              <div>
                <Label>Mensalidade</Label>
                <p className="text-sm font-medium mt-1">{formatKwanza(selectedModality.monthlyPrice)}</p>
              </div>

              <div>
                <Label>Horários</Label>
                <p className="text-sm mt-1">{selectedModality.schedule}</p>
              </div>

              <div>
                <Label>Instrutores</Label>
                <div className="flex flex-col gap-2 mt-2">
                  {selectedModality.instructors.map((instructor) => (
                    <div key={instructor} className="flex items-center p-2 border rounded-md">
                      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                        <Users size={14} />
                      </div>
                      <span>{instructor}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
                Fechar
              </Button>
              <Button>
                <Edit className="mr-2 h-4 w-4" /> Editar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Add New Modality Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Nova Modalidade</DialogTitle>
            <DialogDescription>
              Adicione uma nova modalidade à sua academia.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome da Modalidade</Label>
              <Input id="name" placeholder="Ex: Muay Thai" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea id="description" placeholder="Descreva a modalidade..." />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Preço Mensal (AOA)</Label>
              <Input id="price" type="number" placeholder="15000" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="schedule">Horários</Label>
              <Input id="schedule" placeholder="Ex: Segunda a Sexta, 18:00 às 20:00" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="instructors">Instrutores</Label>
              <Input id="instructors" placeholder="Separe os nomes por vírgulas" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button onClick={() => setShowAddDialog(false)}>Salvar Modalidade</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Modalities;
