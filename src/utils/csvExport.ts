interface Report {
  id: number;
  type: string;
  number?: string;
  photos: Array<{ name: string; description: string; preview: string }>;
  createdAt: string;
  driverId: string;
}

export const exportReportsToCSV = (reports: Report[], language: 'pl' | 'en' = 'pl') => {
  const headers = language === 'pl' ? 
    ['ID', 'Typ', 'Numer/Opis', 'Kierowca', 'Data utworzenia', 'Liczba zdjęć', 'Opisy zdjęć'] :
    ['ID', 'Type', 'Number/Description', 'Driver', 'Created Date', 'Photo Count', 'Photo Descriptions'];

  const getTypeLabel = (type: string) => {
    const labels = language === 'pl' ? {
      vehicle: 'Pojazd',
      trailer: 'Naczepa', 
      forklift: 'Wózek',
      damage: 'Szkoda'
    } : {
      vehicle: 'Vehicle',
      trailer: 'Trailer',
      forklift: 'Forklift', 
      damage: 'Damage'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const csvContent = [
    headers.join(','),
    ...reports.map(report => [
      report.id,
      getTypeLabel(report.type),
      `"${report.number || ''}"`,
      report.driverId,
      new Date(report.createdAt).toLocaleString(language === 'pl' ? 'pl-PL' : 'en-US'),
      report.photos.length,
      `"${report.photos.map(p => p.description).join('; ')}"` 
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `truck-reports-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};