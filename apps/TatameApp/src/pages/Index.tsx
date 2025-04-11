
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-tatame-800 to-tatame-950 text-white">
      {/* Header */}
      <header className="py-4 px-6 flex items-center justify-between">
        <div className="text-2xl font-bold">TatamePro</div>
        <Link to="/dashboard">
          <Button 
            variant="ghost" 
            className="text-white hover:bg-tatame-700"
          >
            Entrar
          </Button>
        </Link>
      </header>
      
      {/* Hero Section */}
      <section className="container py-20 md:py-32 flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Sistema de Gestão para Academias de Jiu-Jitsu e Ginásios
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-md mx-auto lg:mx-0">
            Gerencie seus atletas, finanças, aulas e muito mais com o sistema completo 
            feito para o seu negócio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link to="/dashboard">
              <Button className="bg-tatame-500 hover:bg-tatame-600 text-white px-6 py-6 w-full sm:w-auto">
                Acessar o Sistema
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/matricula">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-6 py-6 w-full sm:w-auto">
                Matricular Alunos
              </Button>
            </Link>
          </div>
        </div>
        <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-tatame-500/20 to-crimson-500/20 blur-3xl rounded-full"></div>
            <img 
              src="/placeholder.svg" 
              alt="TatamePro App" 
              className="relative z-10 w-full max-w-lg rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-16 bg-white/5 backdrop-blur-sm">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Funcionalidades Principais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-tatame-900/50 backdrop-blur-sm p-6 rounded-lg shadow hover:bg-tatame-900/70 transition">
              <h3 className="text-xl font-semibold mb-4">Gestão de Atletas</h3>
              <p className="text-gray-300">
                Cadastro completo dos atletas, controle de graduações, 
                histórico de treinos e muito mais.
              </p>
            </div>
            <div className="bg-tatame-900/50 backdrop-blur-sm p-6 rounded-lg shadow hover:bg-tatame-900/70 transition">
              <h3 className="text-xl font-semibold mb-4">Gestão Financeira</h3>
              <p className="text-gray-300">
                Controle de pagamentos, emissão de recibos, 
                gerenciamento de planos e mensalidades.
              </p>
            </div>
            <div className="bg-tatame-900/50 backdrop-blur-sm p-6 rounded-lg shadow hover:bg-tatame-900/70 transition">
              <h3 className="text-xl font-semibold mb-4">Treinos e Aulas</h3>
              <p className="text-gray-300">
                Agendamento de aulas, controle de presença 
                dos alunos e gestão de instrutores.
              </p>
            </div>
            <div className="bg-tatame-900/50 backdrop-blur-sm p-6 rounded-lg shadow hover:bg-tatame-900/70 transition">
              <h3 className="text-xl font-semibold mb-4">Relatórios</h3>
              <p className="text-gray-300">
                Gráficos financeiros, estatísticas de alunos 
                e relatórios de desempenho detalhados.
              </p>
            </div>
            <div className="bg-tatame-900/50 backdrop-blur-sm p-6 rounded-lg shadow hover:bg-tatame-900/70 transition">
              <h3 className="text-xl font-semibold mb-4">Gestão de Modalidades</h3>
              <p className="text-gray-300">
                Cadastro e edição das modalidades oferecidas 
                na academia e suas configurações.
              </p>
            </div>
            <div className="bg-tatame-900/50 backdrop-blur-sm p-6 rounded-lg shadow hover:bg-tatame-900/70 transition">
              <h3 className="text-xl font-semibold mb-4">Matrículas</h3>
              <p className="text-gray-300">
                Processo simplificado para matricular novos alunos 
                e escolha de planos de mensalidades.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 bg-tatame-950 text-center">
        <div className="container">
          <p>© 2023 TatamePro. Todos os direitos reservados.</p>
          <p className="text-sm text-gray-400 mt-2">
            Sistema completo para gestão de academias de Jiu-Jitsu e Ginásios.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
