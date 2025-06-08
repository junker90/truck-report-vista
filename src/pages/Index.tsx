
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Truck, Shield, FileText, Camera } from "lucide-react";
import { toast } from "sonner";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [driverId, setDriverId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('truck_token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (driverId && password) {
      // Mock authentication - in real app this would be an API call
      if (driverId === "driver1" && password === "password123") {
        localStorage.setItem('truck_token', 'mock-jwt-token');
        localStorage.setItem('driver_id', driverId);
        setIsLoggedIn(true);
        toast.success("Zalogowano pomyślnie!", {
          description: `Witaj z powrotem, ${driverId}!`
        });
      } else {
        toast.error("Błędne dane logowania", {
          description: "Sprawdź ID kierowcy i hasło"
        });
      }
    } else {
      toast.error("Wypełnij wszystkie pola");
    }
    
    setIsLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('truck_token');
    localStorage.removeItem('driver_id');
    setIsLoggedIn(false);
    setDriverId("");
    setPassword("");
    toast.info("Wylogowano pomyślnie");
  };

  if (isLoggedIn) {
    return <Dashboard onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background">
      {/* Animated truck in background */}
      <div className="fixed top-10 left-0 opacity-10 pointer-events-none z-0">
        <Truck className="w-16 h-16 animate-truck-drive text-primary" />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full gradient-truck flex items-center justify-center">
              <Truck className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Truck Report
            </h1>
            <p className="text-muted-foreground">
              System raportowania dla kierowców
            </p>
          </div>

          {/* Login Card */}
          <Card className="backdrop-blur-sm bg-card/80 border-border/50 animate-fade-in-up">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center flex items-center gap-2 justify-center">
                <Shield className="w-5 h-5 text-primary" />
                Logowanie
              </CardTitle>
              <CardDescription className="text-center">
                Wprowadź swoje dane aby uzyskać dostęp
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
                  className="w-full animate-pulse-green"
                  disabled={isLoading}
                >
                  {isLoading ? "Logowanie..." : "Zaloguj się"}
                </Button>
              </form>

              {/* Demo credentials hint */}
              <div className="mt-6 p-3 rounded-lg bg-muted/50 border border-border/50">
                <p className="text-sm text-muted-foreground text-center mb-2">
                  <strong>Demo:</strong>
                </p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>ID: <code className="bg-background/50 px-1 rounded">driver1</code></p>
                  <p>Hasło: <code className="bg-background/50 px-1 rounded">password123</code></p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="mt-8 grid grid-cols-3 gap-4 animate-fade-in-up">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-primary/20 flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground">Łatwe raportowanie</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-primary/20 flex items-center justify-center">
                <Camera className="w-6 h-6 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground">Upload zdjęć</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-primary/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground">Bezpieczne</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
