import IconButton from "../../../components/Buttons/IconButton";
import { useStore } from "../../../store/useStore";
import Minimap from "./Minimap";
import { 
    CityIcon,
    GridIcon,
    MapIcon,
    ReportIcon
} from "../../../assets/icons";
import { useNavigate } from "react-router-dom";


export interface ToolbarProps {
    canvas_ref: React.RefObject<HTMLCanvasElement>;
}

const Toolbar: React.FC<ToolbarProps> = ({ canvas_ref }) => {
    const show_grid = useStore((state) => state.map.show_grid);
    const show_minimap = useStore((state) => state.map.show_minimap);
    const show_legend = useStore((state) => state.map.show_legend);
    const setShowGrid = useStore((state) => state.map.setShowGrid);
    const setShowMinimap = useStore((state) => state.map.setShowMinimap);
    const setShowLegend = useStore((state) => state.map.setShowLegend);
    const navigate = useNavigate();
    
    return (
        <div 
            style={{
                position: 'absolute',
                bottom: '30px',
                right: '30px',
                pointerEvents: 'auto',
                zIndex: 3000,
                backgroundColor: 'rgba(253, 236, 217, 0.2)',
                padding: '4px',
                borderRadius: '8px',
            }}
            className="flex"
        >
            {show_minimap && (
                <div className="flex flex-col w-[300px] h-[220px]">
                    <Minimap canvas_ref={canvas_ref} />
                </div>
            )}
            <div className="flex flex-col w-[50px]">
                <IconButton tooltip_text="Toggle Minimap" icon={MapIcon} onClick={() => setShowMinimap(!show_minimap)} />
                <IconButton tooltip_text="Toggle Grid" iconClassName={'w-[25px] h-[25px]'} icon={GridIcon} onClick={() => setShowGrid(!show_grid)} />
                <IconButton tooltip_text="Show Current City" iconClassName={'w-[25px] h-[25px]'} icon={CityIcon} onClick={() => navigate('/city')} />
                <IconButton tooltip_text="Toggle Legend" iconClassName={'w-[25px] h-[25px]'} icon={ReportIcon} onClick={() => setShowLegend(!show_legend)} />
            </div>
        </div>
    );
}

export default Toolbar;