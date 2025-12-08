export interface City {
  id: string;
  experience: number;
  name: string;
  coordinates: {
    x: number;
    y: number;
  };
  buildings: CityBuilding[];
  level: number;
  points: number;
  builders?: {
      max?: number;
      free?: number;
      queue?: {
        type: string;
        level: number;
        finishes_at: string;
      }[]
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

export interface CityBuilding {
  current_level: number;
  next_level: number;
  maxed_out: boolean;
  can_build: {
    resources: boolean;
    builders: boolean;
    free_queue: boolean;
    next_level: boolean;
  };
  can_build_at: string | null;
  build_time: number;
  build_cost: {
      wood: number;
      stone: number;
      gold: number;
      food: number;
  };
  type: string;
}

export interface CityState {
  city: {
    is_loading_city: boolean;
    is_sending_building_to_queue: boolean;
    selected_city: City | null;
    setLoadingCity(is_loading: boolean): void;
    getCity(id: string): void;
    build(city_id: string, building_type: string, level: number): void;
  };
}
