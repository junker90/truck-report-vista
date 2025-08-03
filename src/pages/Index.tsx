import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { User, Truck, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Dashboard from "@/components/Dashboard";
import AdminDashboard from "@/components/AdminDashboard";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Index = () => {
  const { t } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('driver_id') || !!localStorage.getItem('admin_id'));
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState("driver"); // "driver" or "admin"

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId.trim() || !password.trim()) {
      toast.error(t('login.error.empty'));
      return;
    }

    setIsLoading(true);

    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock authentication with admin support
    if (loginType === "driver") {
      if (userId === "driver1" && password === "password123") {
        localStorage.setItem('driver_id', userId);
        localStorage.removeItem('admin_id'); // Clear admin session if exists
        setIsLoggedIn(true);
        toast.success(t('login.success.driver'));
      } else {
        toast.error(t('login.error.driver'));
      }
    } else if (loginType === "admin") {
      if (userId === "admin" && password === "admin123") {
        localStorage.setItem('admin_id', userId);
        localStorage.removeItem('driver_id'); // Clear driver session if exists
        setIsLoggedIn(true);
        toast.success(t('login.success.admin'));
      } else {
        toast.error(t('login.error.admin'));
      }
    }

    setIsLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('driver_id');
    localStorage.removeItem('admin_id');
    localStorage.removeItem('truck_reports');
    setIsLoggedIn(false);
    setUserId("");
    setPassword("");
    toast.success(t('logout.success'));
  };

  if (isLoggedIn) {
    // Sprawdź czy to admin czy kierowca
    const isAdmin = !!localStorage.getItem('admin_id');
    
    if (isAdmin) {
      return <AdminDashboard onLogout={handleLogout} />;
    } else {
      return <Dashboard onLogout={handleLogout} />;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      <Card className="w-full max-w-md backdrop-blur-sm bg-card/80 border-border/50">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
            {loginType === "admin" ? (
              <Shield className="w-8 h-8 text-primary-foreground" />
            ) : (
              <Truck className="w-8 h-8 text-primary-foreground" />
            )}
          </div>
          <CardTitle className="text-2xl font-bold">
            {t('login.title')}
          </CardTitle>
          <CardDescription>
            {loginType === "admin" ? t('login.admin.description') : t('login.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Login Type Selector */}
          <div className="flex mb-6 bg-muted rounded-lg p-1">
            <Button
              type="button"
              variant={loginType === "driver" ? "default" : "ghost"}
              className="flex-1 h-8"
              onClick={() => setLoginType("driver")}
            >
              <User className="w-4 h-4 mr-1" />
              {t('login.driver')}
            </Button>
            <Button
              type="button"
              variant={loginType === "admin" ? "default" : "ghost"}
              className="flex-1 h-8"
              onClick={() => setLoginType("admin")}
            >
              <Shield className="w-4 h-4 mr-1" />
              {t('login.admin')}
            </Button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userId">
                {loginType === "admin" ? t('login.adminId') : t('login.userId')}
              </Label>
              <Input
                id="userId"
                type="text"
                placeholder={loginType === "admin" ? t('login.adminId') : t('login.userId')}
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                disabled={isLoading}
                className="bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('login.password')}</Label>
              <Input
                id="password"
                type="password"
                placeholder={t('login.password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="bg-background/50"
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? t('login.loading') : (
                <>
                  {loginType === "admin" ? (
                    <Shield className="w-4 h-4 mr-2" />
                  ) : (
                    <User className="w-4 h-4 mr-2" />
                  )}
                  {t('login.submit')}
                </>
              )}
            </Button>
          </form>
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              {t('login.demo.driver')}
            </p>
            <p className="text-sm text-muted-foreground text-center mt-1">
              {t('login.demo.admin')}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
