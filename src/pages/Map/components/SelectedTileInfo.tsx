import { useNavigate } from "react-router-dom";
import { AttackIcon, CityIcon } from "../../../assets/icons";
import { 
    PlainsHex,
    SeaHex,
    MountainHex,
    ForestHex,
    ShoreHex,
} from "../../../assets/images";
import IconButton from "../../../components/Buttons/IconButton";
import { MapTile } from "../../../store/types/map";
import TileInfo from "./TileInfo";

export interface SelectedTileInfoProps {
    data: MapTile;
}

export const terrain_images: { [key: string]: string } = {
    SEA: SeaHex,
    PLAINS: PlainsHex,
    MOUNTAINS: MountainHex,
    FOREST: ForestHex,
    SHORE: ShoreHex,
};

export const terrain_names: { [key: string]: string } = {
    SEA: "Sea",
    PLAINS: "Plains",
    MOUNTAINS: "Mountains",
    FOREST: "Forest",
    SHORE: "Shore",
};

export const terrain_descriptions: { [key: string]: string } = {
    SEA: "Oceano é fonte de alimento e comércio",
    PLAINS: "Planícies geram mais comida e são melhores para treinar unidades",
    MOUNTAINS: "Montanhas oferecem proteção natural e recursos minerais",
    FOREST: "Florestas são ricas em madeira e abrigo para a vida selvagem",
    SHORE: "Costas são pontos estratégicos para comércio e alimento",
};

export const effects_description: { [key: string]: string } = {
    CAVALRY_TRAINING: 'Redução no tempo de recrutamento de unidades de cavalaria',
    INFANTRY_TRAINING: 'Redução no tempo de recrutamento de unidades de infantaria',
    RANGED_TRAINING: 'Redução no tempo de recrutamento de unidades de ataque à distância',
    MACHINE_TRAINING: 'Redução no tempo de recrutamento de unidades mecanizadas',
    WOOD_PRODUCTION: 'Aumento na produção de madeira',
    STONE_PRODUCTION: 'Aumento na produção de pedra',
    FOOD_PRODUCTION: 'Aumento na produção de comida',
    GOLD_PRODUCTION: 'Aumento na produção de ouro',
    ALL_PRODUCTION: 'Aumento na produção de todos os recursos',
    BUILD_TIME: 'Redução no tempo de construção',
    POPULATION: 'Aumento na população',
    ATTACK: 'Aumento no ataque',
    DEFENSE: 'Aumento na defesa',
    SCOUTING: 'Aumento na capacidade de reconhecimento e defesa contra espionagem',
};

const SelectedTileInfo: React.FC<SelectedTileInfoProps> = ({ data }) => {
    const navigate = useNavigate();

    const handleShowCity = () => {
        
        navigate('/city');
    }
    
    return (
        <div>
            <TileInfo data={data} />
            <div className="w-full p-2 rounded-lg flex gap-2 bg-white text-black border-solid border-2 border-black">
                <IconButton tooltip_text="Troop Command" icon={AttackIcon} onClick={() => alert('Attack button clicked')} />
                <IconButton tooltip_text="Show City" iconClassName={'w-[25px] h-[25px]'} icon={CityIcon} onClick={() => navigate('/city')} />
            </div>
        </div>
    );
}

export default SelectedTileInfo;