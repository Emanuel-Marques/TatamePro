
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { 
  Table, TableHeader, TableBody, TableHead, 
  TableRow, TableCell 
} from "@/components/ui/table";
import { 
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, 
  DropdownMenuItem, DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar as CalendarIcon, Search, MoreVertical, Plus, 
  Clock, Users, Award, Dumbbell, CalendarPlus, CheckCircle2,
  Eye, Edit, Trash2, User
} from "lucide-react";
import { ClassData, classesData } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { CreateClassDialog } from "@/components/classes/CreateClassDialog";
import { AttendanceDialog } from "@/components/classes/AttendanceDialog";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const Classes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showAttendanceDialog, setShowAttendanceDialog] = useState(false);

  const filteredClasses = classesData.filter((classItem) => {
    return classItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      classItem.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      classItem.modality.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleViewDetails = (classItem: ClassData) => {
    setSelectedClass(classItem);
    setShowDetailsDialog(true);
  };

  const handleRegisterAttendance = (classItem?: ClassData) => {
    if (classItem) {
      setSelectedClass(classItem);
    } else {
      setSelectedClass(null);
    }
    setShowAttendanceDialog(true);
  };

  const daysOfWeek = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

  // Organize classes by day of week for schedule view
  const classesByDay = daysOfWeek.map(day => {
    return {
      day,
      classes: classesData.filter(c => c.dayOfWeek.includes(day))
    };
  });

  return (
    <MainLayout>
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-custom-text">Aulas</h1>
          <p className="text-muted-foreground">
            Gerencie o cronograma de aulas e treinamentos.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            className="bg-custom-primary text-white hover:bg-custom-primary/90"
            onClick={() => setShowCreateDialog(true)}
          >
            <CalendarPlus className="mr-2 h-4 w-4" /> Nova Aula
          </Button>
          <Button 
            variant="outline"
            className="border-custom-secondary text-custom-secondary hover:bg-custom-secondary/10"
            onClick={() => handleRegisterAttendance()}
          >
            <CheckCircle2 className="mr-2 h-4 w-4" /> Registrar Presença
          </Button>
        </div>
      </header>

      <Card className="p-4 bg-white border-custom-border">
        <Tabs defaultValue="schedule" className="mt-2">
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
            <TabsList>
              <TabsTrigger value="schedule" className="text-sm">Cronograma</TabsTrigger>
              <TabsTrigger value="list" className="text-sm">Lista de Aulas</TabsTrigger>
              <TabsTrigger value="attendance" className="text-sm">Registro de Presença</TabsTrigger>
            </TabsList>

            <div className="relative mt-4 md:mt-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar aulas..." 
                className="pl-10 max-w-[280px] border-custom-border"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <TabsContent value="schedule">
            <div className="flex flex-col space-y-6">
              {classesByDay.map((daySchedule) => (
                daySchedule.classes.length > 0 && (
                  <div key={daySchedule.day}>
                    <h3 className="text-lg font-medium mb-3 text-custom-text">{daySchedule.day}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {daySchedule.classes.map((classItem) => (
                        <Card key={classItem.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer bg-white border-custom-border"
                          onClick={() => handleViewDetails(classItem)}
                        >
                          <div className="flex items-start">
                            <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center text-blue-700 mr-3">
                              {classItem.modality === "Jiu-Jitsu" ? (
                                <Award size={20} />
                              ) : classItem.modality === "Condicionamento" ? (
                                <Users size={20} />
                              ) : (
                                <Dumbbell size={20} />
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium text-custom-text">{classItem.title}</h4>
                              <div className="flex flex-col text-sm text-muted-foreground mt-1">
                                <span className="flex items-center">
                                  <Clock size={14} className="mr-1" />
                                  {classItem.startTime} - {classItem.endTime}
                                </span>
                                <span className="flex items-center mt-1">
                                  <User size={14} className="mr-1" />
                                  {classItem.instructor}
                                </span>
                              </div>
                              <Badge className="mt-2 bg-custom-background text-custom-secondary hover:bg-custom-background/90">
                                {classItem.modality}
                              </Badge>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="list">
            <div className="rounded-md border border-custom-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Aula</TableHead>
                    <TableHead>Modalidade</TableHead>
                    <TableHead>Instrutor</TableHead>
                    <TableHead>Horário</TableHead>
                    <TableHead>Dias</TableHead>
                    <TableHead className="text-center">Capacidade</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClasses.map((classItem) => (
                    <TableRow key={classItem.id}>
                      <TableCell className="font-medium text-custom-text">{classItem.title}</TableCell>
                      <TableCell>
                        <Badge className="bg-custom-background text-custom-secondary hover:bg-custom-background/90">
                          {classItem.modality}
                        </Badge>
                      </TableCell>
                      <TableCell>{classItem.instructor}</TableCell>
                      <TableCell>{classItem.startTime} - {classItem.endTime}</TableCell>
                      <TableCell>{classItem.dayOfWeek}</TableCell>
                      <TableCell className="text-center">{classItem.capacity}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewDetails(classItem)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Ver Detalhes
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleRegisterAttendance(classItem)}>
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Registrar Presença
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-custom-alert">
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
          </TabsContent>
          
          <TabsContent value="attendance">
            <div className="flex flex-col items-center justify-center py-12">
              <CheckCircle2 size={64} className="text-custom-secondary/30 mb-4" />
              <h3 className="text-xl font-medium mb-2 text-custom-text">Registro de Presença</h3>
              <p className="text-muted-foreground mb-4 text-center max-w-md">
                Selecione uma aula para registrar a presença dos alunos ou 
                visualizar históricos de presença.
              </p>
              <Button 
                className="bg-custom-primary text-white hover:bg-custom-primary/90"
                onClick={() => handleRegisterAttendance()}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                Selecionar Aula
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Details Dialog */}
      {selectedClass && (
        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="sm:max-w-[525px] bg-white">
            <DialogHeader>
              <DialogTitle>Detalhes da Aula</DialogTitle>
              <DialogDescription>
                Informações completas sobre a aula selecionada.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-medium text-custom-text">{selectedClass.title}</h3>
                <Badge className="bg-custom-background text-custom-secondary hover:bg-custom-background/90">
                  {selectedClass.modality}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Instrutor</p>
                  <p className="font-medium text-custom-text">{selectedClass.instructor}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Capacidade</p>
                  <p className="font-medium text-custom-text">{selectedClass.capacity} alunos</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Horário</p>
                  <p className="font-medium text-custom-text">{selectedClass.startTime} - {selectedClass.endTime}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Dias da Semana</p>
                  <p className="font-medium text-custom-text">{selectedClass.dayOfWeek}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-custom-border">
                <h4 className="font-medium mb-2 text-custom-text">Informações Adicionais</h4>
                <p className="text-sm text-muted-foreground">
                  Esta aula faz parte da modalidade {selectedClass.modality} e é ministrada por {selectedClass.instructor}.
                  A capacidade máxima é de {selectedClass.capacity} alunos.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline"
                className="border-custom-secondary text-custom-secondary" 
                onClick={() => setShowDetailsDialog(false)}
              >
                Fechar
              </Button>
              <Button 
                className="bg-custom-primary text-white hover:bg-custom-primary/90"
                onClick={() => {
                  setShowDetailsDialog(false);
                  handleRegisterAttendance(selectedClass);
                }}
              >
                Registrar Presença
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Create Class Dialog */}
      <CreateClassDialog 
        open={showCreateDialog} 
        onOpenChange={setShowCreateDialog} 
      />
      
      {/* Attendance Dialog */}
      <AttendanceDialog 
        open={showAttendanceDialog} 
        onOpenChange={setShowAttendanceDialog}
        selectedClass={selectedClass}
      />
    </MainLayout>
  );
};

export default Classes;
