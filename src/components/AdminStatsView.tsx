
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, FileText, Camera, TrendingUp } from "lucide-react";

interface Report {
  id: number;
  type: string;
  driverId: string;
  createdAt: string;
  photos: Array<any>;
}

const AdminStatsView = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [stats, setStats] = useState({
    totalReports: 0,
    totalDrivers: 0,
    totalPhotos: 0,
    reportsByType: {} as Record<string, number>,
    reportsByDriver: {} as Record<string, number>
  });

  useEffect(() => {
    const savedReports = localStorage.getItem('truck_reports');
    if (savedReports) {
      const parsedReports = JSON.parse(savedReports) as Report[];
      setReports(parsedReports);
      
      // Oblicz statystyki
      const drivers = new Set(parsedReports.map(r => r.driverId));
      const totalPhotos = parsedReports.reduce((sum, r) => sum + r.photos.length, 0);
      
      const reportsByType: Record<string, number> = {};
      const reportsByDriver: Record<string, number> = {};
      
      parsedReports.forEach(report => {
        reportsByType[report.type] = (reportsByType[report.type] || 0) + 1;
        reportsByDriver[report.driverId] = (reportsByDriver[report.driverId] || 0) + 1;
      });

      setStats({
        totalReports: parsedReports.length,
        totalDrivers: drivers.size,
        totalPhotos,
        reportsByType,
        reportsByDriver
      });
    }
  }, []);

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "vehicle": return "Pojazdy";
      case "trailer": return "Naczepy";
      case "forklift": return "Wózki widłowe";
      case "damage": return "Szkody";
      default: return "Inne";
    }
  };

  return (
    <div className="space-y-6">
      {/* Ogólne statystyki */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wszystkie Raporty</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalReports}</div>
            <p className="text-xs text-muted-foreground">Łącznie w systemie</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktywni Kierowcy</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDrivers}</div>
            <p className="text-xs text-muted-foreground">Którzy wysłali raporty</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wszystkie Zdjęcia</CardTitle>
            <Camera className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPhotos}</div>
            <p className="text-xs text-muted-foreground">W raportach</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Średnio na raport</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalReports > 0 ? (stats.totalPhotos / stats.totalReports).toFixed(1) : '0'}
            </div>
            <p className="text-xs text-muted-foreground">Zdjęć na raport</p>
          </CardContent>
        </Card>
      </div>

      {/* Raporty według typu */}
      <Card>
        <CardHeader>
          <CardTitle>Raporty według typu</CardTitle>
          <CardDescription>Podział raportów na kategorie</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(stats.reportsByType).map(([type, count]) => (
              <div key={type} className="flex items-center justify-between">
                <span className="text-sm font-medium">{getTypeLabel(type)}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${(count / stats.totalReports) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-8 text-right">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Aktywność kierowców */}
      <Card>
        <CardHeader>
          <CardTitle>Aktywność kierowców</CardTitle>
          <CardDescription>Liczba raportów według kierowców</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(stats.reportsByDriver)
              .sort(([,a], [,b]) => b - a)
              .map(([driverId, count]) => (
                <div key={driverId} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{driverId}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${(count / Math.max(...Object.values(stats.reportsByDriver))) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-8 text-right">{count}</span>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStatsView;
