
import { 
  User, CircleDollarSign, Calendar, BarChart3, 
  Dumbbell, UserPlus, CreditCard, Users, Award
} from "lucide-react";

export type AthleteData = {
  id: string;
  name: string;
  email: string;
  phone: string;
  belt?: string;
  stripes?: number;
  registrationDate: string;
  status: "active" | "inactive" | "pending";
  plan: string;
  lastPayment: string;
  modality: string[];
};

export type FinanceData = {
  id: string;
  athleteId: string;
  athleteName: string;
  plan: string;
  amount: number;
  date: string;
  status: "paid" | "pending" | "overdue";
};

export type ClassData = {
  id: string;
  title: string;
  instructor: string;
  modality: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  capacity: number;
};

export type ModalityData = {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  instructors: string[];
  schedule: string;
};

export type InstructorData = {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialties: string[];
  belt?: string;
  joinDate: string;
  status: "active" | "inactive";
};

export type InstrutorData = {
  professorId: number;
  nome: string;
  email: string;
  telefone: string;
  especialidade: string;
  grau?: string;
  dataInicio: string;
  estado: "ativo" | "inativo";
};

export type PlanData = {
  id: string;
  name: string;
  price: number;
  billingFrequency: "monthly" | "quarterly" | "semiannual" | "annual";
  description: string;
  modalities: string[];
  benefits: string[];
};

export const athletesData: AthleteData[] = [
  {
    id: "A001",
    name: "João da Silva",
    email: "joao@example.com",
    phone: "+244 923 456 789",
    belt: "azul",
    stripes: 2,
    registrationDate: "2023-03-15",
    status: "active",
    plan: "Premium",
    lastPayment: "2023-06-01",
    modality: ["Jiu-Jitsu", "Condicionamento"],
  },
  {
    id: "A002",
    name: "Maria Sousa",
    email: "maria@example.com",
    phone: "+244 923 987 654",
    belt: "branca",
    stripes: 4,
    registrationDate: "2023-05-20",
    status: "active",
    plan: "Básico",
    lastPayment: "2023-06-05",
    modality: ["Jiu-Jitsu"],
  },
  {
    id: "A003",
    name: "Carlos Mendes",
    email: "carlos@example.com",
    phone: "+244 923 123 456",
    registrationDate: "2023-01-10",
    status: "inactive",
    plan: "Premium",
    lastPayment: "2023-04-01",
    modality: ["Musculação"],
  },
  {
    id: "A004",
    name: "Ana Ferreira",
    email: "ana@example.com",
    phone: "+244 923 789 123",
    belt: "roxa",
    stripes: 1,
    registrationDate: "2022-11-05",
    status: "active",
    plan: "Premium Plus",
    lastPayment: "2023-06-02",
    modality: ["Jiu-Jitsu", "Musculação"],
  },
  {
    id: "A005",
    name: "Paulo Santos",
    email: "paulo@example.com",
    phone: "+244 923 456 321",
    registrationDate: "2023-06-01",
    status: "pending",
    plan: "Básico",
    lastPayment: "-",
    modality: ["Musculação", "Condicionamento"],
  },
];

export const financesData: FinanceData[] = [
  {
    id: "P001",
    athleteId: "A001",
    athleteName: "João da Silva",
    plan: "Premium",
    amount: 25000,
    date: "2023-06-01",
    status: "paid",
  },
  {
    id: "P002",
    athleteId: "A002",
    athleteName: "Maria Sousa",
    plan: "Básico",
    amount: 15000,
    date: "2023-06-05",
    status: "paid",
  },
  {
    id: "P003",
    athleteId: "A003",
    athleteName: "Carlos Mendes",
    plan: "Premium",
    amount: 25000,
    date: "2023-06-10",
    status: "overdue",
  },
  {
    id: "P004",
    athleteId: "A004",
    athleteName: "Ana Ferreira",
    plan: "Premium Plus",
    amount: 35000,
    date: "2023-06-02",
    status: "paid",
  },
  {
    id: "P005",
    athleteId: "A005",
    athleteName: "Paulo Santos",
    plan: "Básico",
    amount: 15000,
    date: "2023-06-15",
    status: "pending",
  },
];

export const classesData: ClassData[] = [
  {
    id: "C001",
    title: "Fundamentos de Jiu-Jitsu",
    instructor: "Mestre Silva",
    modality: "Jiu-Jitsu",
    dayOfWeek: "Segunda, Quarta, Sexta",
    startTime: "18:00",
    endTime: "19:30",
    capacity: 20,
  },
  {
    id: "C002",
    title: "Jiu-Jitsu Avançado",
    instructor: "Mestre Silva",
    modality: "Jiu-Jitsu",
    dayOfWeek: "Terça, Quinta",
    startTime: "19:30",
    endTime: "21:00",
    capacity: 15,
  },
  {
    id: "C003",
    title: "Condicionamento Físico",
    instructor: "Treinador Paulo",
    modality: "Condicionamento",
    dayOfWeek: "Segunda, Quarta, Sexta",
    startTime: "07:00",
    endTime: "08:00",
    capacity: 12,
  },
  {
    id: "C004",
    title: "Musculação - Turno da Manhã",
    instructor: "Instrutor Carlos",
    modality: "Musculação",
    dayOfWeek: "Segunda a Sábado",
    startTime: "06:00",
    endTime: "12:00",
    capacity: 30,
  },
  {
    id: "C005",
    title: "Musculação - Turno da Tarde",
    instructor: "Instrutor Marcos",
    modality: "Musculação",
    dayOfWeek: "Segunda a Sábado",
    startTime: "13:00",
    endTime: "22:00",
    capacity: 30,
  },
];

export const modalitiesData: ModalityData[] = [
  {
    id: "M001",
    name: "Jiu-Jitsu",
    description: "Arte marcial brasileira e sistema de defesa pessoal",
    monthlyPrice: 20000,
    instructors: ["Mestre Silva", "Instrutor Ana"],
    schedule: "Segunda a Sexta, diferentes horários"
  },
  {
    id: "M002",
    name: "Musculação",
    description: "Treino com pesos livres e máquinas para desenvolvimento muscular",
    monthlyPrice: 15000,
    instructors: ["Instrutor Carlos", "Instrutor Marcos"],
    schedule: "Segunda a Sábado, 06:00 às 22:00"
  },
  {
    id: "M003",
    name: "Condicionamento",
    description: "Treinos para melhoria da resistência e condicionamento físico",
    monthlyPrice: 15000,
    instructors: ["Treinador Paulo"],
    schedule: "Segunda, Quarta, Sexta, 07:00 às 08:00"
  }
];

export const instructorsData: InstructorData[] = [
  {
    id: "I001",
    name: "Mestre Silva",
    email: "mestre.silva@tatamepro.com",
    phone: "+244 923 111 222",
    specialties: ["Jiu-Jitsu"],
    belt: "preta",
    joinDate: "2020-01-15",
    status: "active"
  },
  {
    id: "I002",
    name: "Instrutor Carlos",
    email: "carlos.instrutor@tatamepro.com",
    phone: "+244 923 222 333",
    specialties: ["Musculação", "Condicionamento"],
    joinDate: "2021-03-10",
    status: "active"
  },
  {
    id: "I003",
    name: "Instrutor Ana",
    email: "ana.instrutora@tatamepro.com",
    phone: "+244 923 333 444",
    specialties: ["Jiu-Jitsu"],
    belt: "marrom",
    joinDate: "2022-02-01",
    status: "active"
  },
  {
    id: "I004",
    name: "Instrutor Marcos",
    email: "marcos.instrutor@tatamepro.com",
    phone: "+244 923 444 555",
    specialties: ["Musculação"],
    joinDate: "2021-06-15",
    status: "active"
  },
  {
    id: "I005",
    name: "Treinador Paulo",
    email: "paulo.treinador@tatamepro.com",
    phone: "+244 923 555 666",
    specialties: ["Condicionamento"],
    joinDate: "2022-01-10",
    status: "inactive"
  }
];

export const plansData: PlanData[] = [
  {
    id: "PL001",
    name: "Básico",
    price: 15000,
    billingFrequency: "monthly",
    description: "Acesso a uma modalidade",
    modalities: ["Jiu-Jitsu", "Musculação", "Condicionamento"],
    benefits: ["Acesso ilimitado à modalidade escolhida", "Avaliação física inicial"]
  },
  {
    id: "PL002",
    name: "Premium",
    price: 25000,
    billingFrequency: "monthly",
    description: "Acesso a duas modalidades",
    modalities: ["Jiu-Jitsu", "Musculação", "Condicionamento"],
    benefits: ["Acesso ilimitado às duas modalidades escolhidas", "Avaliação física trimestral", "1 sessão personalizada por mês"]
  },
  {
    id: "PL003",
    name: "Premium Plus",
    price: 35000,
    billingFrequency: "monthly",
    description: "Acesso a todas as modalidades",
    modalities: ["Jiu-Jitsu", "Musculação", "Condicionamento"],
    benefits: ["Acesso ilimitado a todas as modalidades", "Avaliação física mensal", "2 sessões personalizadas por mês", "Equipamentos de treino gratuitos"]
  },
  {
    id: "PL004",
    name: "Anual Básico",
    price: 150000,
    billingFrequency: "annual",
    description: "Plano anual com acesso a uma modalidade",
    modalities: ["Jiu-Jitsu", "Musculação", "Condicionamento"],
    benefits: ["Acesso ilimitado à modalidade escolhida", "Avaliação física trimestral", "Desconto de 15% em relação ao pagamento mensal"]
  },
  {
    id: "PL005",
    name: "Anual Premium",
    price: 250000,
    billingFrequency: "annual",
    description: "Plano anual com acesso a todas as modalidades",
    modalities: ["Jiu-Jitsu", "Musculação", "Condicionamento"],
    benefits: ["Acesso ilimitado a todas as modalidades", "Avaliação física mensal", "4 sessões personalizadas por mês", "Equipamentos de treino gratuitos", "Desconto de 20% em relação ao pagamento mensal"]
  }
];

export const navItems = [
  {
    title: "Dashboard",
    route: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "Atletas",
    route: "/atletas",
    icon: Users,
  },
  {
    title: "Financeiro",
    route: "/financeiro",
    icon: CircleDollarSign,
  },
  {
    title: "Aulas",
    route: "/aulas",
    icon: Calendar,
  },
  {
    title: "Modalidades",
    route: "/modalidades",
    icon: Dumbbell,
  },
  {
    title: "Instrutores",
    route: "/instrutores",
    icon: Award,
  },
  {
    title: "Planos",
    route: "/planos",
    icon: CreditCard,
  },
  {
    title: "Matrícula",
    route: "/matricula",
    icon: UserPlus,
  },
  {
    title: "Relatórios",
    route: "/relatorios",
    icon: BarChart3,
  },
];

// Statistics for the dashboard
export const dashboardStats = {
  activeAthletes: athletesData.filter(a => a.status === "active").length,
  monthlyRevenue: financesData.filter(f => f.status === "paid").reduce((sum, item) => sum + item.amount, 0),
  totalClasses: classesData.length,
  activeModalities: modalitiesData.length,
  athletesByModality: {
    "Jiu-Jitsu": athletesData.filter(a => a.modality.includes("Jiu-Jitsu")).length,
    "Musculação": athletesData.filter(a => a.modality.includes("Musculação")).length,
    "Condicionamento": athletesData.filter(a => a.modality.includes("Condicionamento")).length,
  },
  recentPayments: financesData.slice(0, 5),
  upcomingClasses: classesData.slice(0, 3),
};

// Format currency to Kwanza
export const formatKwanza = (amount: number): string => {
  return new Intl.NumberFormat('pt-AO', {
    style: 'currency',
    currency: 'AOA',
    minimumFractionDigits: 2
  }).format(amount);
};
