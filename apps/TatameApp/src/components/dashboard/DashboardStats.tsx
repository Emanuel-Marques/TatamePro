
import { Card } from "@/components/ui/card";
import { dashboardStats, formatKwanza } from "@/lib/data";
import { Users, CircleDollarSign, Calendar, Dumbbell } from "lucide-react";

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="tatame-stat-card">
        <div className="flex justify-between">
          <div>
            <p className="tatame-stat-value">{dashboardStats.activeAthletes}</p>
            <p className="tatame-stat-label">Atletas Ativos</p>
          </div>
          <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
            <Users size={24} />
          </div>
        </div>
      </Card>
      
      <Card className="tatame-stat-card">
        <div className="flex justify-between">
          <div>
            <p className="tatame-stat-value">{formatKwanza(dashboardStats.monthlyRevenue)}</p>
            <p className="tatame-stat-label">Receita Mensal</p>
          </div>
          <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
            <CircleDollarSign size={24} />
          </div>
        </div>
      </Card>
      
      <Card className="tatame-stat-card">
        <div className="flex justify-between">
          <div>
            <p className="tatame-stat-value">{dashboardStats.totalClasses}</p>
            <p className="tatame-stat-label">Aulas Programadas</p>
          </div>
          <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
            <Calendar size={24} />
          </div>
        </div>
      </Card>
      
      <Card className="tatame-stat-card">
        <div className="flex justify-between">
          <div>
            <p className="tatame-stat-value">{dashboardStats.activeModalities}</p>
            <p className="tatame-stat-label">Modalidades</p>
          </div>
          <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
            <Dumbbell size={24} />
          </div>
        </div>
      </Card>
    </div>
  );
}
