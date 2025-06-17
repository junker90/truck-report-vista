
export const getFormTitle = (type: "vehicle" | "trailer" | "forklift" | "damage") => {
  switch (type) {
    case "vehicle": return "pojazdu";
    case "trailer": return "naczepy";
    case "forklift": return "wózka widłowego";
    case "damage": return "szkody";
    default: return "elementu";
  }
};

export const getPlaceholder = (type: "vehicle" | "trailer" | "forklift" | "damage") => {
  switch (type) {
    case "vehicle": return "Wprowadź numer pojazdu";
    case "trailer": return "Wprowadź numer naczepy";
    case "forklift": return "Wprowadź numer wózka widłowego";
    case "damage": return "Wprowadź opis szkody";
    default: return "Wprowadź numer";
  }
};

export const getTypeLabel = (type: "vehicle" | "trailer" | "forklift" | "damage") => {
  switch (type) {
    case "vehicle": return "pojazdu";
    case "trailer": return "naczepy";
    case "forklift": return "wózka widłowego";
    case "damage": return "szkody";
    default: return "elementu";
  }
};
