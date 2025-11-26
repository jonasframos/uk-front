import { TerrainType } from "../../../utils/constants/constants";

export interface TileLegendProps {
    available_types: TerrainType[];
}

const TileLegend: React.FC<TileLegendProps> = ({ 
    available_types 
}) => {
    return (
        <div className="w-[300px] shadow">
            <span>Terreno</span>
            <hr />
            <table>
            {
                available_types.map((type) => {
                    return (
                        <li>{type}</li>
                    )
                })
            }
            </table>
        </div>
    );
}

export default TileLegend;