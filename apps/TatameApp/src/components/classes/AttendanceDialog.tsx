
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ClassData } from "@/lib/data";
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { classesData } from "@/lib/data";

// Mock data for students
const students = [
  { id: 1, name: "João Silva" },
  { id: 2, name: "Maria Oliveira" },
  { id: 3, name: "Pedro Santos" },
  { id: 4, name: "Ana Luiza" },
  { id: 5, name: "Ricardo Ferreira" },
  { id: 6, name: "Carla Mendes" },
  { id: 7, name: "Fernando Costa" },
  { id: 8, name: "Juliana Almeida" }
];

interface AttendanceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedClass?: ClassData | null;
}

export function AttendanceDialog({ open, onOpenChange, selectedClass }: AttendanceDialogProps) {
  const [selectedClassId, setSelectedClassId] = useState<string | undefined>(selectedClass?.id);
  const [attendanceList, setAttendanceList] = useState<{[key: number]: boolean}>({});

  useEffect(() => {
    if (selectedClass) {
      setSelectedClassId(selectedClass.id);
    }
    
    // Reset attendance list when dialog opens
    if (open) {
      const initialAttendance = students.reduce((acc, student) => {
        acc[student.id] = false;
        return acc;
      }, {} as {[key: number]: boolean});
      
      setAttendanceList(initialAttendance);
    }
  }, [selectedClass, open]);

  const handleToggleAttendance = (studentId: number) => {
    setAttendanceList(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
    }));
  };

  const handleSelectAllStudents = () => {
    const allSelected = students.every(student => attendanceList[student.id]);
    
    const updatedAttendance = students.reduce((acc, student) => {
      acc[student.id] = !allSelected;
      return acc;
    }, {} as {[key: number]: boolean});
    
    setAttendanceList(updatedAttendance);
  };

  const handleSaveAttendance = () => {
    const selectedClassData = classesData.find(c => c.id === selectedClassId);
    if (!selectedClassData) {
      toast.error("Selecione uma aula válida");
      return;
    }
    
    const presentStudents = students.filter(student => attendanceList[student.id]);
    
    console.log("Attendance saved:", {
      classId: selectedClassId,
      className: selectedClassData.title,
      date: new Date().toISOString(),
      presentStudents: presentStudents.map(s => s.id)
    });
    
    toast.success("Presença registrada com sucesso", {
      description: `${presentStudents.length} alunos presentes em ${selectedClassData.title}`
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Registrar Presença</DialogTitle>
          <DialogDescription>
            Selecione a aula e marque os alunos presentes.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="mb-6">
            <Label htmlFor="class-select" className="block mb-2">Aula</Label>
            <Select 
              value={selectedClassId} 
              onValueChange={setSelectedClassId}
              disabled={!!selectedClass}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a aula" />
              </SelectTrigger>
              <SelectContent>
                {classesData.map((classItem) => (
                  <SelectItem key={classItem.id} value={classItem.id}>
                    {classItem.title} - {classItem.dayOfWeek} {classItem.startTime}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <Label className="font-medium">Lista de Alunos</Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={handleSelectAllStudents}
              >
                {students.every(student => attendanceList[student.id]) 
                  ? "Desmarcar Todos" 
                  : "Marcar Todos"}
              </Button>
            </div>
            
            <div className="border rounded-md max-h-72 overflow-y-auto p-2">
              {students.map((student) => (
                <div 
                  key={student.id} 
                  className="flex items-center space-x-3 py-2 px-3 hover:bg-muted/40 rounded-md"
                >
                  <Checkbox 
                    id={`student-${student.id}`}
                    checked={attendanceList[student.id] || false}
                    onCheckedChange={() => handleToggleAttendance(student.id)}
                  />
                  <Label 
                    htmlFor={`student-${student.id}`}
                    className="flex-grow cursor-pointer"
                  >
                    {student.name}
                  </Label>
                </div>
              ))}
              
              {students.length === 0 && (
                <div className="py-8 text-center text-muted-foreground">
                  Nenhum aluno encontrado para esta aula.
                </div>
              )}
            </div>
          </div>
        </div>
        
        <DialogFooter className="gap-2">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button 
            type="button" 
            className="bg-custom-success text-white hover:bg-custom-success/90"
            onClick={handleSaveAttendance}
            disabled={!selectedClassId}
          >
            Salvar Presenças
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
