import { TerrainType } from '../../../utils/constants/constants';

export interface TileLegendProps {
    available_types: TerrainType[];
}

const TileLegend: React.FC<TileLegendProps> = ({ 
    available_types 
}) => {
    return (
        <div className='w-full shadow'>
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