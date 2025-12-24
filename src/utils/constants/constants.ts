import { AxeIcon, BowIcon, CuirassIcon, ShieldIcon, SwordIcon } from "../../assets/icons";

export enum TerrainType {
  PLAINS = 'PLAINS',
  FOREST = 'FOREST',
  MOUNTAIN = 'MOUNTAIN',
  SEA = 'SEA',
  SHORE = 'SHORE'
}

export const UnitIcon: any = {
  'BOWMAN': BowIcon,
  'LONGSWORDSMAN': SwordIcon,
  'CUIRASSIER': CuirassIcon,
  'AXEMAN': AxeIcon,
  'CROSSBOWMAN': ShieldIcon
}


export const UnitName: any = {
  'BOWMAN': 'Arqueiro',
  'LONGSWORDSMAN': 'Espadachim',
  'CUIRASSIER': 'Cuirassier',
  'AXEMAN': 'Lenhador',
  'CROSSBOWMAN': 'Balestrante'
}