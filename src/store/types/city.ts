export interface City {
  id: string;
  experience: number;
  name: string;
  coordinates: {
    x: number;
    y: number;
  };
  buildings: [{
    type: string;
    level: number;
  }];
  level: number;
  points: number;
  builders?: {
      max?: number;
      free?: number
  };
  population?: {
      max?: number;
      current?: number
  };
  storage?: {
      max?: number;
      current?: {
          gold?: number;
          food?: number;
          wood?: number;
          stone?: number
      }
  };
  production?: {
      food?: number;
      wood?: number;
      stone?: number;
      gold?: number;
  };
  defense?: number;
}

export interface CityState {
  city: {
    is_loading_city: boolean;
    selected_city: City | null;
    setLoadingCity(is_loading: boolean): void;
    getCity(id: string): void;
  };
}
