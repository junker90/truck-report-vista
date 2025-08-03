import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'pl' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  pl: {
    // Login
    'login.title': 'Truck Report App',
    'login.description': 'Zaloguj się do systemu raportowania',
    'login.admin.description': 'Panel administratora',
    'login.driver': 'Kierowca',
    'login.admin': 'Admin',
    'login.userId': 'ID Kierowcy',
    'login.adminId': 'ID Administratora',
    'login.password': 'Hasło',
    'login.submit': 'Zaloguj się',
    'login.loading': 'Logowanie...',
    'login.demo.driver': 'Demo kierowca: ID: driver1, Hasło: password123',
    'login.demo.admin': 'Demo admin: ID: admin, Hasło: admin123',
    'login.error.empty': 'Wprowadź ID i hasło',
    'login.error.driver': 'Błędne dane logowania kierowcy',
    'login.error.admin': 'Błędne dane logowania administratora',
    'login.success.driver': 'Zalogowano jako kierowca!',
    'login.success.admin': 'Zalogowano jako administrator!',
    'logout.success': 'Wylogowano pomyślnie',
    
    // Dashboard
    'dashboard.title': 'Panel Kierowcy',
    'dashboard.welcome': 'Witaj w panelu kierowcy',
    'dashboard.description': 'Tworzenie i zarządzanie raportami pojazdów',
    'dashboard.logout': 'Wyloguj',
    'dashboard.reports': 'Nowy Raport',
    'dashboard.history': 'Historia Raportów',
    'dashboard.vehicle': 'Pojazd',
    'dashboard.trailer': 'Naczepa',
    'dashboard.forklift': 'Wózek',
    'dashboard.damage': 'Szkoda',
    
    // Admin Dashboard
    'admin.title': 'Panel Administratora',
    'admin.description': 'Przeglądaj raporty i statystyki wszystkich kierowców',
    'admin.reports': 'Wszystkie Raporty',
    'admin.stats': 'Statystyki',
    'admin.users': 'Użytkownicy',
    'admin.management': 'Zarządzanie Systemem',
    'admin.users.coming': 'Zarządzanie użytkownikami - w przygotowaniu',
    'admin.export.csv': 'Eksportuj do CSV',
    
    // Report Form
    'report.vehicle.number': 'Numer Pojazdu',
    'report.trailer.number': 'Numer Naczepy',
    'report.forklift.number': 'Numer Wózka',
    'report.damage.description': 'Opis szkody',
    'report.submit': 'Wyślij raport',
    'report.sending': 'Wysyłanie...',
    'report.success': 'Raport wysłany pomyślnie!',
    'report.error.number': 'Wprowadź numer',
    'report.error.photos': 'Dodaj co najmniej jedno zdjęcie',
    'report.photos.add': 'Dodaj zdjęcia',
    'report.photos.description': 'Opis zdjęcia',
    'report.photos.remove': 'Usuń',
    
    // Stats
    'stats.total.reports': 'Łączna liczba raportów',
    'stats.total.drivers': 'Liczba kierowców',
    'stats.total.photos': 'Łączna liczba zdjęć',
    'stats.avg.photos': 'Średnia zdjęć na raport',
    'stats.by.type': 'Raporty według typu',
    'stats.driver.activity': 'Aktywność kierowców',
    
    // Common
    'common.loading': 'Ładowanie...',
    'common.nodata': 'Brak danych do wyświetlenia',
    'common.details': 'Zobacz szczegóły',
    'common.close': 'Zamknij',
    'common.date': 'Data',
    'common.type': 'Typ',
    'common.driver': 'Kierowca',
    'common.photos': 'Zdjęcia'
  },
  en: {
    // Login
    'login.title': 'Truck Report App',
    'login.description': 'Log in to the reporting system',
    'login.admin.description': 'Administrator panel',
    'login.driver': 'Driver',
    'login.admin': 'Admin',
    'login.userId': 'Driver ID',
    'login.adminId': 'Administrator ID',
    'login.password': 'Password',
    'login.submit': 'Log in',
    'login.loading': 'Logging in...',
    'login.demo.driver': 'Demo driver: ID: driver1, Password: password123',
    'login.demo.admin': 'Demo admin: ID: admin, Password: admin123',
    'login.error.empty': 'Enter ID and password',
    'login.error.driver': 'Invalid driver login credentials',
    'login.error.admin': 'Invalid administrator login credentials',
    'login.success.driver': 'Logged in as driver!',
    'login.success.admin': 'Logged in as administrator!',
    'logout.success': 'Logged out successfully',
    
    // Dashboard
    'dashboard.title': 'Driver Panel',
    'dashboard.welcome': 'Welcome to the driver panel',
    'dashboard.description': 'Create and manage vehicle reports',
    'dashboard.logout': 'Logout',
    'dashboard.reports': 'New Report',
    'dashboard.history': 'Reports History',
    'dashboard.vehicle': 'Vehicle',
    'dashboard.trailer': 'Trailer',
    'dashboard.forklift': 'Forklift',
    'dashboard.damage': 'Damage',
    
    // Admin Dashboard
    'admin.title': 'Administrator Panel',
    'admin.description': 'View reports and statistics of all drivers',
    'admin.reports': 'All Reports',
    'admin.stats': 'Statistics',
    'admin.users': 'Users',
    'admin.management': 'System Management',
    'admin.users.coming': 'User management - coming soon',
    'admin.export.csv': 'Export to CSV',
    
    // Report Form
    'report.vehicle.number': 'Vehicle Number',
    'report.trailer.number': 'Trailer Number',
    'report.forklift.number': 'Forklift Number',
    'report.damage.description': 'Damage Description',
    'report.submit': 'Submit report',
    'report.sending': 'Sending...',
    'report.success': 'Report sent successfully!',
    'report.error.number': 'Enter number',
    'report.error.photos': 'Add at least one photo',
    'report.photos.add': 'Add photos',
    'report.photos.description': 'Photo description',
    'report.photos.remove': 'Remove',
    
    // Stats
    'stats.total.reports': 'Total reports',
    'stats.total.drivers': 'Number of drivers',
    'stats.total.photos': 'Total photos',
    'stats.avg.photos': 'Average photos per report',
    'stats.by.type': 'Reports by type',
    'stats.driver.activity': 'Driver activity',
    
    // Common
    'common.loading': 'Loading...',
    'common.nodata': 'No data to display',
    'common.details': 'View details',
    'common.close': 'Close',
    'common.date': 'Date',
    'common.type': 'Type',
    'common.driver': 'Driver',
    'common.photos': 'Photos'
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('app_language');
    return (saved as Language) || 'pl';
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('app_language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};