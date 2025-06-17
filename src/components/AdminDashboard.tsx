
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, Shield, Users, FileText, BarChart3 } from "lucide-react";
import AdminReportsView from "./AdminReportsView";
import AdminStatsView from "./AdminStatsView";

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState("reports");
  const adminId = localStorage.getItem('admin_id') || 'admin';

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 animate-fade-in-up">
          <div className="flex items-center gap-4">
            <Avatar className="w-12 h-12 border-2 border-primary">
              <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                <Shield className="w-6 h-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Panel Administratora
              </h1>
              <p className="text-muted-foreground">
                Administrator: <span className="text-primary font-medium">{adminId}</span>
              </p>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={onLogout}
            className="border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Wyloguj
          </Button>
        </div>

        {/* Main Content */}
        <Card className="backdrop-blur-sm bg-card/80 border-border/50 animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Zarządzanie Systemem
            </CardTitle>
            <CardDescription>
              Przeglądaj raporty i statystyki wszystkich kierowców
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="reports" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Wszystkie Raporty
                </TabsTrigger>
                <TabsTrigger value="stats" className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Statystyki
                </TabsTrigger>
                <TabsTrigger value="users" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Użytkownicy
                </TabsTrigger>
              </TabsList>
              <TabsContent value="reports" className="mt-6">
                <AdminReportsView />
              </TabsContent>
              <TabsContent value="stats" className="mt-6">
                <AdminStatsView />
              </TabsContent>
              <TabsContent value="users" className="mt-6">
                <div className="text-center py-8">
                  <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Zarządzanie użytkownikami - w przygotowaniu
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
