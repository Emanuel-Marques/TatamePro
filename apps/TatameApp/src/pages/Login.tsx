
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";

const loginSchema = z.object({
  email: z.string().email({ message: "E-mail inválido" }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // This would normally be an actual auth API call
      if (data.email === "admin@tatamepro.com" && data.password === "password") {
        toast({
          title: "Login bem-sucedido",
          description: "Bem-vindo ao TatamePro",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Erro de login",
          description: "E-mail ou senha inválidos",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
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
          <h2 className="text-xl font-medium text-center mb-6 text-foreground">Login</h2>
          
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
                name="password"
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
