import { useEffect, useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Award,
  Search,
  MoreVertical,
  UserPlus,
  Eye,
  Edit,
  Trash2,
  Mail,
  Phone,
} from "lucide-react";
import { instructorsData, InstructorData, InstrutorData } from "@/lib/data";
import api from "@/api";
import RegisterInstructorDialog from "@/components/instructors/RegisterInstructorDialog";

const Instructors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedInstructor, setSelectedInstructor] =
    useState<InstrutorData | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [instructorsData, setInstructorsData] = useState<InstrutorData[]>([]);
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await api.instructorsApi.getAllInstructors();
        console.log(response.data);
        setInstructorsData(response.data);
      } catch (error) {
        console.error("Error fetching instructors:", error);
      }
    };
    fetchInstructors();
  }, [showRegisterDialog, showEditDialog]);

  const filteredInstructors = instructorsData.filter((instructor) => {
    const matchesSearch =
      instructor.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      instructor.email.toLowerCase().includes(searchQuery.toLowerCase()); /*||
      instructor.especialidade.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))*/

    const matchesStatus =
      statusFilter === "all" || instructor.estado === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (instructor: InstrutorData) => {
    setSelectedInstructor(instructor);
    setShowDetailsDialog(true);
  };

  const handleRegisterInstructor = () => {
    setShowRegisterDialog(true);
  };

  return (
    <MainLayout>
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Instrutores</h1>
          <p className="text-muted-foreground">
            Gerencie os professores e instrutores da academia.
          </p>
        </div>
        <div>
          <Button
            className="bg-custom-primary text-white hover:bg-custom-primary/90"
            onClick={handleRegisterInstructor}
          >
            <UserPlus className="mr-2 h-4 w-4" /> Novo Instrutor
          </Button>
        </div>
      </header>

      <Card className="p-4">
        <div className="mb-6 relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar instrutores..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Especialidades</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead className="hidden md:table-cell">Telefone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInstructors.map((instructor) => (
                <TableRow key={instructor.professorId}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                        <Award size={14} />
                      </div>
                      <div>
                        <p className="font-medium">{instructor.nome}</p>
                        {instructor.grau && (
                          <p className="text-xs text-muted-foreground capitalize">
                            Faixa {instructor.grau}
                          </p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      <Badge
                        key={instructor.especialidade}
                        variant="outline"
                        className="bg-gray-100"
                      >
                        {instructor.especialidade}
                      </Badge>
                      {/* Uncomment the below code if you want to display multiple specialties */}
                      {/*instructor.especialidade.map((specialty) => (
                        <Badge key={specialty} variant="outline" className="bg-gray-100">
                          {specialty}
                        </Badge>
                      ))*/}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {instructor.email}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {instructor.telefone}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        instructor.estado === "Ativo"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-red-100 text-red-800 hover:bg-red-100"
                      }
                    >
                      {instructor.estado}
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
                        <DropdownMenuItem
                          onClick={() => handleViewDetails(instructor)}
                        >
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Details Dialog */}
      {selectedInstructor && (
        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Detalhes do Instrutor</DialogTitle>
              <DialogDescription>
                Informações completas sobre o instrutor selecionado.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex justify-center">
                <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                  <Award size={48} />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-medium">
                  {selectedInstructor.nome}
                </h3>
                <div className="flex items-center justify-center gap-4 mt-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Mail className="mr-1 h-4 w-4" />
                    {selectedInstructor.email}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Phone className="mr-1 h-4 w-4" />
                    {selectedInstructor.telefone}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div>
                  <Label>ID</Label>
                  <p className="text-sm font-medium">
                    TP-{selectedInstructor.professorId}
                  </p>
                </div>
                <div>
                  <Label>Data de Início</Label>
                  <p className="text-sm font-medium">
                    {selectedInstructor.dataInicio.split("T")[0]}
                  </p>
                </div>
                <div>
                  <Label>Status</Label>
                  <p>
                    <Badge
                      className={
                        selectedInstructor.estado === "Ativo"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-red-100 text-red-800 hover:bg-red-100"
                      }
                    >
                      {selectedInstructor.estado}
                    </Badge>
                  </p>
                </div>
                {selectedInstructor.grau && (
                  <div>
                    <Label>Faixa</Label>
                    <p className="text-sm font-medium capitalize">
                      {selectedInstructor.grau}
                    </p>
                  </div>
                )}
                <div className="col-span-2">
                  <Label>Especialidades</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <Badge
                      key={selectedInstructor.especialidade}
                      variant="outline"
                      className="bg-gray-100"
                    >
                      {selectedInstructor.especialidade}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowDetailsDialog(false)}
              >
                Fechar
              </Button>
              <Button>Imprimir</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Register instructor */}
      <RegisterInstructorDialog
        open={showRegisterDialog}
        onOpenChange={setShowRegisterDialog}
      />
    </MainLayout>
  );
};

export default Instructors;
