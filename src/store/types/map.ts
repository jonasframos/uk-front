export interface Map {
  _id: string;
  name: string;
  image: string;
  tiles: Tile[];
}

export interface Tile {
  terrain: string;
  is_buildable: boolean;
  owned_by: any;
  coordinates: {
    x: number;
    y: number;
  }
}

export interface MapTile {
  tile_info: Tile;
  q: number;
  r: number;
}

export interface MapState {
  map: {
    is_loading_map: boolean;
    is_loading_map_info: boolean;
    selected_map: Map | null;
    setLoadingMap(is_loading: boolean): void;
    getMap(): void;
  };
}
