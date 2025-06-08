
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { User, Truck } from "lucide-react";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('driver_id'));
  const [driverId, setDriverId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!driverId.trim() || !password.trim()) {
      toast.error("Wprowadź ID kierowcy i hasło");
      return;
    }

    setIsLoading(true);

    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock authentication - in real app this would call backend
    if (driverId === "driver1" && password === "password123") {
      localStorage.setItem('driver_id', driverId);
      setIsLoggedIn(true);
      toast.success("Zalogowano pomyślnie!");
    } else {
      toast.error("Błędne dane logowania");
    }

    setIsLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('driver_id');
    localStorage.removeItem('truck_reports');
    setIsLoggedIn(false);
    setDriverId("");
    setPassword("");
    toast.success("Wylogowano pomyślnie");
  };

  if (isLoggedIn) {
    return <Dashboard onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md backdrop-blur-sm bg-card/80 border-border/50">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
            <Truck className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Truck Report App
          </CardTitle>
          <CardDescription>
            Zaloguj się do systemu raportowania
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="driverId">ID Kierowcy</Label>
              <Input
                id="driverId"
                type="text"
                placeholder="Wprowadź ID kierowcy"
                value={driverId}
                onChange={(e) => setDriverId(e.target.value)}
                disabled={isLoading}
                className="bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Hasło</Label>
              <Input
                id="password"
                type="password"
                placeholder="Wprowadź hasło"
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
              {isLoading ? "Logowanie..." : (
                <>
                  <User className="w-4 h-4 mr-2" />
                  Zaloguj się
                </>
              )}
            </Button>
          </form>
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              <strong>Demo:</strong> ID: driver1, Hasło: password123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
