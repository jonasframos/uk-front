export interface City {
  _id: string;
  name: string;
}

export interface CityState {
  city: {
    is_loading_city: boolean;
    selected_city: City | null;
    setLoadingCity(is_loading: boolean): void;
    getCity(id: string): void;
  };
}
