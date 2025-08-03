
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, User, Truck, Package, Forklift, FileText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ReportForm from "./ReportForm";
import ReportsHistory from "./ReportsHistory";
import LanguageSwitcher from "./LanguageSwitcher";

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const { t } = useLanguage();
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
                {t('dashboard.title')}
              </h1>
              <p className="text-muted-foreground">
                {t('common.driver')}: <span className="text-primary font-medium">{driverId}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Button 
              variant="outline" 
              onClick={onLogout}
              className="border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <LogOut className="w-4 h-4 mr-2" />
              {t('dashboard.logout')}
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Report Forms */}
          <div className="lg:col-span-2">
            <Card className="backdrop-blur-sm bg-card/80 border-border/50 animate-fade-in-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" />
                  {t('dashboard.reports')}
                </CardTitle>
                <CardDescription>
                  {t('dashboard.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="vehicle" className="flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      {t('dashboard.vehicle')}
                    </TabsTrigger>
                    <TabsTrigger value="trailer" className="flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      {t('dashboard.trailer')}
                    </TabsTrigger>
                    <TabsTrigger value="forklift" className="flex items-center gap-2">
                      <Forklift className="w-4 h-4" />
                      {t('dashboard.forklift')}
                    </TabsTrigger>
                    <TabsTrigger value="damage" className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      {t('dashboard.damage')}
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="vehicle" className="mt-6">
                    <ReportForm type="vehicle" />
                  </TabsContent>
                  <TabsContent value="trailer" className="mt-6">
                    <ReportForm type="trailer" />
                  </TabsContent>
                  <TabsContent value="forklift" className="mt-6">
                    <ReportForm type="forklift" />
                  </TabsContent>
                  <TabsContent value="damage" className="mt-6">
                    <ReportForm type="damage" />
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
