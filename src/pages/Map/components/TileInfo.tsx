import { 
    PlainsHex,
    SeaHex,
    MountainHex,
    ForestHex,
    ShoreHex,
} from "../../../assets/images";
import TierText from "../../../components/Text/TierText";
import { MapTile } from "../../../store/types/map";

export interface TileInfoProps {
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

const TileInfo: React.FC<TileInfoProps> = ({ data }) => {
    const tile_image = terrain_images[data.tile_info.terrain];
    return (
        <div className="w-full p-2 rounded-lg flex flex-col gap-2 bg-white text-black border-solid border-2 border-black">
             {
                data.tile_info.owned_by && (
                    <div className="flex flex-col gap-1">
                        <div className="flex justify-between">
                            <span className="font-semibold">{data.tile_info.owned_by.city.name} ({data.tile_info.owned_by.city.experience})</span>
                            <span className="font-bold text-sm">Lv. {data.tile_info.owned_by.city.level}</span>
                        </div>
                        <hr className="border-gray_3" />
                        { data.tile_info.owned_by.player ? 
                            (
                                <div className="flex flex-col">
                                    <div className="flex justify-between">
                                        <span>{data.tile_info.owned_by.player.username}</span>
                                        <span className="font-bold text-sm" >#{data.tile_info.owned_by.player.position}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>{data.tile_info.owned_by.player.experience}</span>
                                        <span className="font-bold text-sm" >Lv. {data.tile_info.owned_by.player.level}</span>
                                    </div>
                                </div>
                            ) : <span>Nenhum</span> 
                        }
                        <hr className="border-gray_3" />
                    </div>
                )
            }
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <span className="text-lg">{terrain_names[data.tile_info.terrain]}</span>
                    <span className="font-bold text-sm text-gray_3">({data.q}, {data.r})</span>
                    <span className="font-light text-sm text-gray_3 mt-1">{terrain_descriptions[data.tile_info.terrain]}</span>
                </div>
                <div className="flex flex-col justify-center items-center min-w-[50px]">
                    <img className="mb-1 w-[45px] h-[45px]" src={tile_image}/>
                    <TierText tier={data.tile_info.tier} />
                </div>
            </div>
            <div className="flex flex-col gap-1">
                {
                    data.tile_info?.effects?.length > 0 ? (
                        <div>
                            <hr className="mb-2" />
                            <span className="font-bold">Efeitos:</span>
                            <table className="mb-2">
                                {data.tile_info.effects.map((effect, index) => (
                                    <tr key={index} className={`${index > 0 ? 'border-t' : ''} border-gray_1`}>
                                        <td className="w-[90%] italic text-sm p-1">{effects_description[effect.type]}</td>
                                        <td className="flex flex-col justify-center p-1">
                                            <span className="text-xs font-bold text-gray_3">{effect.modifier}%</span>
                                        </td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                    ) : null
                }
            </div>
            {/* <span>Informações</span>
            <span>Coordenadas: {data.q}, {data.r}</span>
            <hr />
            <span>{data.tile_info.is_buildable ? 'Pode Construir' : 'Não Pode Construir'}</span>
            <span>{data.tile_info.terrain}</span>
            <hr />
            <span>Proprietário: {data.tile_info.owned_by?.player?.username ? data.tile_info.owned_by.player.username : 'Nenhum'}</span>
            { data.tile_info.owned_by?.player?.points && <span>Pontuação: {data.tile_info.owned_by.player.points}</span> }
            { data.tile_info.owned_by?.city?.level && <span>Nível: {data.tile_info.owned_by.city.level}</span> }
            { data.tile_info.owned_by?.city?.points && <span>Pontuação: {data.tile_info.owned_by.city.points}</span> } */}
        </div>
    );
}

export default TileInfo;