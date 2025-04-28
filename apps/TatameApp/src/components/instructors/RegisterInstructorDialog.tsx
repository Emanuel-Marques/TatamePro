import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { User } from "@/lib/data";
import api from "@/api";

interface RegisterInstructorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const instructorFormSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  especialidade: z
    .string()
    .min(4, "A especialidade deve ter pelo menos 7 caracteres"),
  grau: z.string().min(1, "O grau deve ter pelo menos 4 caracteres"),
  telefone: z
    .string()
    .min(9, "O número de telefone deve ter 9 caracteres")
    .max(9, "O número de telefone deve ter 9 caracteres"),
  utilizador_id: z.string().min(1, "Selecione um utilizador"),
});

type InstructorFormValues = z.infer<typeof instructorFormSchema>;

export default function RegisterInstructorDialog({
  open,
  onOpenChange,
}: RegisterInstructorDialogProps) {
  const [users, setUsers] = useState<
    {
      value: number;
      label: string;
    }[]
  >([]);
  const form = useForm<InstructorFormValues>({
    resolver: zodResolver(instructorFormSchema),
    defaultValues: {
      nome: "",
      especialidade: "",
      utilizador_id: null,
      grau: "",
      telefone: "",
    },
  });
  const onSubmit = async (data: InstructorFormValues) => {
    console.log("Form data:", data);

    const { nome, especialidade, grau, telefone, utilizador_id } = data;

    try {
        const response = await api.instructorsApi.createInstructor({
            nome,
            especialidade,
            grau,
            telefone,
            utilizadorId: parseInt(utilizador_id),
        });
        console.log(response);
        // Show success toast
        toast.success("Instrutor cadastrado com sucesso", {
            description: `${data.nome} instrutor de ${data.especialidade}`,
        });
  
      // Reset form and close dialog
      //form.reset();
      //onOpenChange(false);
    } catch(error) {
        console.error("Error creating instructor:", error);
        toast.error("Erro ao cadastrar instrutor", {
          description: "Verifique os dados e tente novamente.",
        }); 
        return;
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await api.usersApi.getAllUsers();
      if (data) {
        const users = data.map((user: User) => ({
          value: user.utilizador_id,
          label: user.nome,
        }));
        setUsers(users);
      }
    };
    getUsers();
  }, [open]);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Cadastrar Novo Instrutor</DialogTitle>
          <DialogDescription>
            Preencha os dados do novo instrutor.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 py-4"
            >
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do instrutor" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="utilizador_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Utilizador</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a modalidade" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {users.map((user, index) => (
                            <SelectItem
                              key={index}
                              value={user.value.toString()}
                            >
                              {user.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="especialidade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Especialidade</FormLabel>
                      <FormControl>
                        <Input placeholder="Especialidade" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="grau"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grau</FormLabel>
                    <FormControl>
                      <Input placeholder="Grau" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="telefone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder="Telefone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
          >Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
