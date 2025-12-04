import { useNavigate } from "react-router-dom";
import FilledButton from "../../../components/Buttons/FilledButton";
import { ROUTES } from "../../../routes/routes";
import { MapTile } from "../../../store/types/map";
import { City } from "../../../store/types/city";

export interface TileInfoSelectedProps {
    data: MapTile;
}

const TileInfoSelected: React.FC<TileInfoSelectedProps> = ({ data }) => {
    const navigate = useNavigate();
    const handle_city_overview_click = (city: City) => {
        localStorage.setItem('selected_city', city._id);
        navigate(ROUTES.CITY.PATH);
    }
    return (
        <div className="w-full p-4 rounded-lg text-black flex flex-col gap-2 bg-white">
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
            { data.tile_info.owned_by?.city && <FilledButton onClick={() => handle_city_overview_click(data.tile_info.owned_by?.city)}>More Info</FilledButton>}
        </div>
    );
}

export default TileInfoSelected;