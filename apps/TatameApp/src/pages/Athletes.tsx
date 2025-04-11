
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { 
  Table, TableHeader, TableBody, TableHead, 
  TableRow, TableCell 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, 
  DropdownMenuItem, DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { 
  Dialog, DialogTrigger, DialogContent, DialogHeader, 
  DialogTitle, DialogDescription, DialogFooter
} from "@/components/ui/dialog";
import { 
  Select, SelectTrigger, SelectValue, SelectContent, 
  SelectItem 
} from "@/components/ui/select";
import { 
  User, Search, MoreVertical, UserPlus, Edit, Trash2, 
  Download, Filter, Mail, Phone
} from "lucide-react";
import { AthleteData, athletesData, plansData, modalitiesData } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const Athletes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [modalityFilter, setModalityFilter] = useState<string>("all");
  const [selectedAthlete, setSelectedAthlete] = useState<AthleteData | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  const statusOptions = [
    { value: "all", label: "Todos os Status" },
    { value: "active", label: "Ativo" },
    { value: "inactive", label: "Inativo" },
    { value: "pending", label: "Pendente" },
  ];

  const filteredAthletes = athletesData.filter((athlete) => {
    const matchesSearch = athlete.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      athlete.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      athlete.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || athlete.status === statusFilter;
    
    const matchesModality = modalityFilter === "all" || 
      athlete.modality.some(m => m.toLowerCase() === modalityFilter.toLowerCase());
    
    return matchesSearch && matchesStatus && matchesModality;
  });

  const handleViewDetails = (athlete: AthleteData) => {
    setSelectedAthlete(athlete);
    setShowDetailsDialog(true);
  };

  return (
    <MainLayout>
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Atletas</h1>
          <p className="text-muted-foreground">
            Gerencie todos os alunos e atletas da academia.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button className="bg-tatame-800 hover:bg-tatame-700 text-white">
            <UserPlus className="mr-2 h-4 w-4" /> Novo Atleta
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Exportar
          </Button>
        </div>
      </header>
      
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar atletas..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Select value={modalityFilter} onValueChange={setModalityFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Modalidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Modalidades</SelectItem>
                {modalitiesData.map(modality => (
                  <SelectItem key={modality.id} value={modality.name.toLowerCase()}>
                    {modality.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead className="hidden md:table-cell">Plano</TableHead>
                <TableHead>Modalidade(s)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAthletes.map((athlete) => (
                <TableRow key={athlete.id}>
                  <TableCell className="font-medium">{athlete.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <User size={14} />
                      </div>
                      <span>{athlete.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{athlete.email}</TableCell>
                  <TableCell className="hidden md:table-cell">{athlete.plan}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {athlete.modality.map((mod) => (
                        <Badge key={mod} variant="outline" className="bg-gray-100">
                          {mod}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={
                      athlete.status === "active" 
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : athlete.status === "inactive"
                        ? "bg-red-100 text-red-800 hover:bg-red-100"
                        : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                    }>
                      {athlete.status === "active" 
                        ? "Ativo"
                        : athlete.status === "inactive"
                        ? "Inativo"
                        : "Pendente"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(athlete)}>
                          <User className="mr-2 h-4 w-4" />
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Details Dialog */}
      {selectedAthlete && (
        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Detalhes do Atleta</DialogTitle>
              <DialogDescription>
                Informações completas do atleta selecionado.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex justify-center">
                <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center">
                  <User size={48} />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-medium">{selectedAthlete.name}</h3>
                <div className="flex items-center justify-center gap-4 mt-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Mail className="mr-1 h-4 w-4" />
                    {selectedAthlete.email}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Phone className="mr-1 h-4 w-4" />
                    {selectedAthlete.phone}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div>
                  <Label>ID</Label>
                  <p className="text-sm font-medium">{selectedAthlete.id}</p>
                </div>
                <div>
                  <Label>Data de Registro</Label>
                  <p className="text-sm font-medium">{selectedAthlete.registrationDate}</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <p>
                    <Badge className={
                      selectedAthlete.status === "active" 
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : selectedAthlete.status === "inactive"
                        ? "bg-red-100 text-red-800 hover:bg-red-100"
                        : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                    }>
                      {selectedAthlete.status === "active" 
                        ? "Ativo"
                        : selectedAthlete.status === "inactive"
                        ? "Inativo"
                        : "Pendente"}
                    </Badge>
                  </p>
                </div>
                <div>
                  <Label>Plano</Label>
                  <p className="text-sm font-medium">{selectedAthlete.plan}</p>
                </div>
                <div>
                  <Label>Último Pagamento</Label>
                  <p className="text-sm font-medium">{selectedAthlete.lastPayment}</p>
                </div>
                {selectedAthlete.belt && (
                  <div>
                    <Label>Faixa</Label>
                    <p className="text-sm font-medium capitalize">
                      {selectedAthlete.belt} 
                      {selectedAthlete.stripes && ` (${selectedAthlete.stripes} listras)`}
                    </p>
                  </div>
                )}
                <div className="col-span-2">
                  <Label>Modalidades</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedAthlete.modality.map((mod) => (
                      <Badge key={mod} variant="outline" className="bg-gray-100">
                        {mod}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
                Fechar
              </Button>
              <Button>Editar Atleta</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </MainLayout>
  );
};

export default Athletes;
