
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { 
  Table, TableHeader, TableBody, TableHead, 
  TableRow, TableCell 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, 
  DropdownMenuItem, DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { 
  Dialog, DialogTrigger, DialogContent, DialogHeader, 
  DialogTitle, DialogDescription, DialogFooter
} from "@/components/ui/dialog";
import { 
  Select, SelectTrigger, SelectValue, SelectContent, 
  SelectItem 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, MoreVertical, PlusCircle, Download, Filter, 
  Receipt, CircleDollarSign, FileText, Eye, ArrowUpDown,
  CreditCard
} from "lucide-react";
import { financesData, athletesData, formatKwanza } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const Finance = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  const statusOptions = [
    { value: "all", label: "Todos os Status" },
    { value: "paid", label: "Pago" },
    { value: "pending", label: "Pendente" },
    { value: "overdue", label: "Vencido" },
  ];

  const filteredPayments = financesData.filter((payment) => {
    const matchesSearch = payment.athleteName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = filteredPayments
    .filter(p => p.status === "paid")
    .reduce((sum, payment) => sum + payment.amount, 0);
  
  const pendingRevenue = filteredPayments
    .filter(p => p.status === "pending")
    .reduce((sum, payment) => sum + payment.amount, 0);
  
  const overdueRevenue = filteredPayments
    .filter(p => p.status === "overdue")
    .reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <MainLayout>
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financeiro</h1>
          <p className="text-muted-foreground">
            Gerencie pagamentos, recibos e controles financeiros.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button className="bg-tatame-800 hover:bg-tatame-700 text-white">
            <PlusCircle className="mr-2 h-4 w-4" /> Novo Pagamento
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Exportar
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="tatame-stat-card">
          <div className="flex justify-between">
            <div>
              <p className="tatame-stat-value text-green-600">{formatKwanza(totalRevenue)}</p>
              <p className="tatame-stat-label">Recebido</p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center text-green-700">
              <CircleDollarSign size={24} />
            </div>
          </div>
        </Card>
        
        <Card className="tatame-stat-card">
          <div className="flex justify-between">
            <div>
              <p className="tatame-stat-value text-yellow-600">{formatKwanza(pendingRevenue)}</p>
              <p className="tatame-stat-label">Pendente</p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-700">
              <CreditCard size={24} />
            </div>
          </div>
        </Card>
        
        <Card className="tatame-stat-card">
          <div className="flex justify-between">
            <div>
              <p className="tatame-stat-value text-red-600">{formatKwanza(overdueRevenue)}</p>
              <p className="tatame-stat-label">Vencido</p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-red-100 flex items-center justify-center text-red-700">
              <FileText size={24} />
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <Tabs defaultValue="payments" className="mt-2">
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
            <TabsList>
              <TabsTrigger value="payments" className="text-sm">Pagamentos</TabsTrigger>
              <TabsTrigger value="receipts" className="text-sm">Recibos</TabsTrigger>
              <TabsTrigger value="plans" className="text-sm">Planos</TabsTrigger>
            </TabsList>

            <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar pagamentos..." 
                  className="pl-10 max-w-[280px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <TabsContent value="payments">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Aluno
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Plano</TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Data
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Valor
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>{payment.athleteName}</TableCell>
                      <TableCell>{payment.plan}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{formatKwanza(payment.amount)}</TableCell>
                      <TableCell>
                        <Badge className={
                          payment.status === "paid" 
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : payment.status === "pending"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                            : "bg-red-100 text-red-800 hover:bg-red-100"
                        }>
                          {payment.status === "paid" 
                            ? "Pago"
                            : payment.status === "pending"
                            ? "Pendente"
                            : "Vencido"}
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
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Ver Detalhes
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Receipt className="mr-2 h-4 w-4" />
                              Gerar Recibo
                            </DropdownMenuItem>
                            {payment.status !== "paid" && (
                              <DropdownMenuItem>
                                <CircleDollarSign className="mr-2 h-4 w-4" />
                                Marcar como Pago
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="receipts">
            <div className="flex flex-col items-center justify-center py-12">
              <FileText size={64} className="text-gray-300 mb-4" />
              <h3 className="text-xl font-medium mb-2">Recibos</h3>
              <p className="text-muted-foreground mb-4 text-center max-w-md">
                Aqui você poderá visualizar e gerenciar todos os recibos 
                emitidos para os alunos.
              </p>
              <Button>
                <Receipt className="mr-2 h-4 w-4" />
                Gerar Novo Recibo
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="plans">
            <div className="flex flex-col items-center justify-center py-12">
              <CreditCard size={64} className="text-gray-300 mb-4" />
              <h3 className="text-xl font-medium mb-2">Planos de Mensalidade</h3>
              <p className="text-muted-foreground mb-4 text-center max-w-md">
                Gerencie seus planos de mensalidades e pacotes disponíveis 
                para os alunos da academia.
              </p>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Criar Novo Plano
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </MainLayout>
  );
};

export default Finance;
