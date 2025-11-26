import { MapTile } from "../../../store/types/map";

export interface TileInfoProps {
    data: MapTile;
}

const TileInfo: React.FC<TileInfoProps> = ({ data }) => {
    return (
        <div className="w-[300px] p-4 rounded-lg text-black flex flex-col gap-2 bg-white">
            <span>Informações</span>
            <span>Coordenadas: {data.q}, {data.r}</span>
            <hr />
            <span>{data.tile_info.is_buildable ? 'Pode Construir' : 'Não Pode Construir'}</span>
            <span>{data.tile_info.terrain}</span>
            <hr />
            <span>Proprietário: {data.tile_info.owned_by?.player?.username ? data.tile_info.owned_by.player.username : 'Nenhum'}</span>
            { data.tile_info.owned_by?.player?.points && <span>Pontuação: {data.tile_info.owned_by.player.points}</span> }
            { data.tile_info.owned_by?.city?.level && <span>Nível: {data.tile_info.owned_by.city.level}</span> }
            { data.tile_info.owned_by?.city?.points && <span>Pontuação: {data.tile_info.owned_by.city.points}</span> }
        </div>
    );
}

export default TileInfo;