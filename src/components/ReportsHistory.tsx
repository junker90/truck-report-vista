import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { History, Eye, Truck, Package, Calendar, Camera, Forklift, FileText, Download } from "lucide-react";

interface Report {
  id: number;
  type: "vehicle" | "trailer" | "forklift" | "damage";
  number: string;
  photos: Array<{
    name: string;
    description: string;
    preview: string;
  }>;
  createdAt: string;
  driverId: string;
}

const ReportsHistory = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  useEffect(() => {
    const savedReports = localStorage.getItem('truck_reports');
    if (savedReports) {
      const allReports = JSON.parse(savedReports);
      const currentDriverId = localStorage.getItem('driver_id');
      // Filtruj raporty tylko dla aktualnego kierowcy
      const driverReports = allReports.filter((report: any) => report.driverId === currentDriverId);
      setReports(driverReports);
    }
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pl-PL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "vehicle": return <Truck className="w-4 h-4" />;
      case "trailer": return <Package className="w-4 h-4" />;
      case "forklift": return <Forklift className="w-4 h-4" />;
      case "damage": return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "vehicle": return "Pojazd";
      case "trailer": return "Naczepa";
      case "forklift": return "Wózek widłowy";
      case "damage": return "Szkoda";
      default: return "Inne";
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case "vehicle": return "default";
      case "trailer": return "secondary";
      case "forklift": return "outline";
      case "damage": return "destructive";
      default: return "outline";
    }
  };

  const downloadImage = (imageUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="backdrop-blur-sm bg-card/80 border-border/50 animate-fade-in-up h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="w-5 h-5 text-primary" />
          Historia Raportów
        </CardTitle>
        <CardDescription>
          Ostatnie wysłane raporty
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          {reports.length === 0 ? (
            <div className="text-center py-8">
              <History className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                Brak raportów
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Wyślij pierwszy raport aby zobaczyć historię
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {reports.map((report) => (
                <Card key={report.id} className="bg-background/50">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(report.type)}
                        <span className="font-medium">{report.number}</span>
                      </div>
                      <Badge variant={getTypeBadgeVariant(report.type)}>
                        {getTypeLabel(report.type)}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(report.createdAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Camera className="w-3 h-3" />
                        {report.photos.length} zdjęć
                      </div>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => setSelectedReport(report)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Zobacz szczegóły
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            {getTypeIcon(report.type)}
                            Raport - {report.number}
                          </DialogTitle>
                        </DialogHeader>
                        
                        {selectedReport && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-medium">Typ:</span> {getTypeLabel(selectedReport.type)}
                              </div>
                              <div>
                                <span className="font-medium">Data:</span> {formatDate(selectedReport.createdAt)}
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-medium mb-3">Zdjęcia ({selectedReport.photos.length})</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {selectedReport.photos.map((photo, index) => (
                                  <div key={index} className="space-y-3">
                                    <div className="relative">
                                      <img
                                        src={photo.preview}
                                        alt={photo.name}
                                        className="w-full h-64 object-cover rounded-md border"
                                      />
                                      <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={() => downloadImage(photo.preview, photo.name)}
                                        className="absolute top-2 right-2"
                                      >
                                        <Download className="w-4 h-4" />
                                      </Button>
                                    </div>
                                    <div className="text-sm">
                                      <div className="font-medium">{photo.name}</div>
                                      {photo.description && (
                                        <div className="mt-2 p-3 bg-muted rounded-md text-sm">
                                          {photo.description}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ReportsHistory;
