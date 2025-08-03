
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Truck, Package, Forklift, FileText, Calendar, Camera, User, Download } from "lucide-react";

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

const AdminReportsView = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  useEffect(() => {
    // Pobierz wszystkie raporty z localStorage (w prawdziwej aplikacji z API)
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Wszystkie Raporty ({reports.length})</h3>
      </div>

      {reports.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Brak raportów w systemie</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Lista Raportów</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Typ</TableHead>
                    <TableHead>Numer</TableHead>
                    <TableHead>Kierowca</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Zdjęcia</TableHead>
                    <TableHead>Akcje</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(report.type)}
                          <Badge variant={getTypeBadgeVariant(report.type)}>
                            {getTypeLabel(report.type)}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{report.number}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          {report.driverId}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {formatDate(report.createdAt)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Camera className="w-3 h-3" />
                          {report.photos.length}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedReport(report)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Zobacz
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
                                    <span className="font-medium">Kierowca:</span> {selectedReport.driverId}
                                  </div>
                                  <div>
                                    <span className="font-medium">Data:</span> {formatDate(selectedReport.createdAt)}
                                  </div>
                                  <div>
                                    <span className="font-medium">Numer:</span> {selectedReport.number}
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
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminReportsView;
