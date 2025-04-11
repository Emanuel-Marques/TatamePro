
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MainLayout } from "@/components/layout/MainLayout";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { dashboardStats, athletesData, classesData, financesData, formatKwanza } from "@/lib/data";
import {
  ArrowRight,
  Calendar,
  CircleDollarSign,
  Clock,
  Users,
  ChevronRight,
  UserPlus,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  const activeModalities = Object.entries(dashboardStats.athletesByModality);
  const totalAthletes = dashboardStats.activeAthletes;
  
  return (
    <MainLayout>
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral da sua academia.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Link to="/matricula">
            <Button className="bg-tatame-800 hover:bg-tatame-700 text-white">
              <UserPlus className="mr-2 h-4 w-4" /> Nova Matrícula
            </Button>
          </Link>
        </div>
      </header>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Atletas por Modalidade</h3>
              <Link to="/atletas">
                <Button variant="ghost" size="sm" className="flex items-center gap-1 text-sm">
                  Ver todos <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {activeModalities.map(([modality, count]) => (
                <div key={modality}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{modality}</span>
                    <span className="font-medium">{count} atletas</span>
                  </div>
                  <Progress 
                    value={Math.round((Number(count) / totalAthletes) * 100)} 
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Próximas Aulas</h3>
              <Link to="/aulas">
                <Button variant="ghost" size="sm" className="flex items-center gap-1 text-sm">
                  Ver agenda <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {dashboardStats.upcomingClasses.map((classItem) => (
                <div key={classItem.id} className="flex items-start p-3 rounded-md border">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 mr-3">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="font-medium">{classItem.title}</p>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Clock size={14} className="mr-1" />
                      <span>{classItem.startTime} - {classItem.endTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Atletas Recentes</h3>
              <Link to="/atletas">
                <Button variant="ghost" size="sm" className="flex items-center gap-1 text-sm">
                  Ver todos <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {athletesData.slice(0, 4).map((athlete) => (
                <div key={athlete.id} className="flex items-center p-3 rounded-md border">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 mr-3">
                    <Users size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{athlete.name}</p>
                    <p className="text-sm text-muted-foreground">{athlete.modality.join(", ")}</p>
                  </div>
                  <div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      athlete.status === "active" 
                        ? "bg-green-100 text-green-800"
                        : athlete.status === "inactive"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {athlete.status === "active" 
                        ? "Ativo"
                        : athlete.status === "inactive"
                        ? "Inativo"
                        : "Pendente"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Pagamentos Recentes</h3>
              <Link to="/financeiro">
                <Button variant="ghost" size="sm" className="flex items-center gap-1 text-sm">
                  Ver todos <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {financesData.slice(0, 4).map((payment) => (
                <div key={payment.id} className="flex items-center p-3 rounded-md border">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-800 mr-3">
                    <CircleDollarSign size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{payment.athleteName}</p>
                    <p className="text-sm text-muted-foreground">{payment.plan} - {payment.date}</p>
                  </div>
                  <div className="font-medium">
                    {formatKwanza(payment.amount)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
