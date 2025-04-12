import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import api from "@/api/index";

const loginSchema = z.object({
  email: z.string().email({ message: "E-mail inválido" }),
  senha: z
    .string()
    .min(4, { message: "A senha deve ter pelo menos 4 caracteres" }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await api.verifyToken();
        if (response?.valid) {
          navigate("/dashboard");
        } else {
          localStorage.removeItem("token");
        }
      } catch (err) {
        console.error("Error verifying token:", err);
      }
    };

    checkAuth();
  }, []);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);

    const response = await api.login(data);
    if (response.error) {
      toast({
        title: "Erro no login",
        description: response.error,
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (response.data) {
      localStorage.setItem("token", response.data);
      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo ao TatamePro",
        variant: "default",
      });
      navigate("/dashboard");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary">TatamePro</h1>
          <p className="mt-2 text-sm text-foreground/70">
            Sistema de Gestão para Academias de Jiu-Jitsu e Ginásios
          </p>
        </div>
        <div className="bg-card shadow-lg rounded-lg p-8 border border-border">
          <h2 className="text-xl font-medium text-center mb-6 text-foreground">
            Login
          </h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">E-mail</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="seu@email.com"
                        type="email"
                        disabled={isLoading}
                        className="bg-background/50 border-input"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="senha"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Senha</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="******"
                        type="password"
                        disabled={isLoading}
                        className="bg-background/50 border-input"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="text-sm text-right">
                <a href="#" className="text-primary hover:text-primary/90">
                  Esqueceu a senha?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full text-center py-3"
                disabled={isLoading}
              >
                {isLoading ? "Carregando..." : "Entrar"}
              </Button>
            </form>
          </Form>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-foreground/70">
            © 2023 TatamePro. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}
