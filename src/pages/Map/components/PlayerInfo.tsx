import { Player } from "../../../store/types/player";

export interface PlayerInfoProps {
    data: Player;
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ data }) => {
    return (
        <div className="w-full p-4 rounded-lg text-black flex flex-col gap-2 bg-white">
            <span>{data.username}</span>
            <hr />
            <span>Points: {data.points}</span>
            <span>Cities: {data.cities.length}</span>
        </div>
    );
}

export default PlayerInfo;