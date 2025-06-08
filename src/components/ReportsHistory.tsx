
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { History, Eye, Truck, Package, Calendar, Camera } from "lucide-react";

interface Report {
  id: number;
  type: "vehicle" | "trailer";
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
      setReports(JSON.parse(savedReports));
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
    return type === "vehicle" ? <Truck className="w-4 h-4" /> : <Package className="w-4 h-4" />;
  };

  const getTypeBadgeVariant = (type: string) => {
    return type === "vehicle" ? "default" : "secondary";
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
                        {report.type === "vehicle" ? "Pojazd" : "Naczepa"}
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
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
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
                                <span className="font-medium">Typ:</span> {selectedReport.type === "vehicle" ? "Pojazd" : "Naczepa"}
                              </div>
                              <div>
                                <span className="font-medium">Data:</span> {formatDate(selectedReport.createdAt)}
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-medium mb-3">Zdjęcia ({selectedReport.photos.length})</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {selectedReport.photos.map((photo, index) => (
                                  <div key={index} className="space-y-2">
                                    <img
                                      src={photo.preview}
                                      alt={photo.name}
                                      className="w-full h-32 object-cover rounded-md border"
                                    />
                                    <div className="text-xs text-muted-foreground">
                                      <div className="font-medium">{photo.name}</div>
                                      {photo.description && (
                                        <div className="mt-1 p-2 bg-muted rounded text-xs">
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
