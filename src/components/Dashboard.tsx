
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, User, Truck, Package } from "lucide-react";
import ReportForm from "./ReportForm";
import ReportsHistory from "./ReportsHistory";

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState("vehicle");
  const driverId = localStorage.getItem('driver_id') || 'driver1';

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 animate-fade-in-up">
          <div className="flex items-center gap-4">
            <Avatar className="w-12 h-12 border-2 border-primary">
              <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                <User className="w-6 h-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Dashboard
              </h1>
              <p className="text-muted-foreground">
                Kierowca: <span className="text-primary font-medium">{driverId}</span>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Report Forms */}
          <div className="lg:col-span-2">
            <Card className="backdrop-blur-sm bg-card/80 border-border/50 animate-fade-in-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" />
                  Nowy Raport
                </CardTitle>
                <CardDescription>
                  Wybierz typ pojazdu i wypełnij raport
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="vehicle" className="flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      Pojazd
                    </TabsTrigger>
                    <TabsTrigger value="trailer" className="flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      Naczepa
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="vehicle" className="mt-6">
                    <ReportForm type="vehicle" />
                  </TabsContent>
                  <TabsContent value="trailer" className="mt-6">
                    <ReportForm type="trailer" />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Reports History */}
          <div className="lg:col-span-1">
            <ReportsHistory />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
