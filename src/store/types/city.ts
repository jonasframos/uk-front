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
      id: string;
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
    },
    full_at?: {
      gold?: string;
      food?: string;
      wood?: string;
      stone?: string
    }
  };
  production?: {
    food?: number;
    wood?: number;
    stone?: number;
    gold?: number;
  };
  defense?: number;
  units: CityUnit[];
  unit_slots: {
    max: number;
    free: number;
    queue: [{
      type: string;
      amount: number;
      finishes_at: string;
      id: string;
    }]
  }
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

export interface CityUnit {
  category: string;
  type: string;
  amount: number;
  can_recruit: {
    resources: boolean;
    slots: boolean;
    population: boolean;
  }
  cost: {
    food: number;
    gold: number;
    wood: number;
    stone: number;
  }
  recruit_time: number;
  stats: UnitStats;
  in: number;
  out: number;
  support: number;
}

export interface UnitStats {
  attack: {
    pierce: number;
    strike: number;
    charge: number;
    building: number;
  };
  defense: {
    pierce: number;
    strike: number;
    charge: number;
  };
  speed: number;
  health: number;
  armor: number;
}

export interface CityState {
  city: {
    is_loading_city: boolean;
    is_sending_building_to_queue: boolean;
    is_sending_recruit_to_queue: boolean;
    selected_city: City | null;
    setLoadingCity(is_loading: boolean): void;
    getCity(id: string): void;
    build(city_id: string, building_type: string, level: number): void;
    cancelBuild(city_id: string, id: string): void;
    recruit(city_id: string, type: string, amount: number): void;
    cancelRecruit(city_id: string, id: string): void;
  };
}
