import { useStore } from "../../../store/useStore";

export interface MapControlsProps {
    show_grid: boolean;
    show_minimap: boolean;
}

const MapControls: React.FC<MapControlsProps> = () => {
    const show_grid = useStore((state) => state.map.show_grid);
    const show_minimap = useStore((state) => state.map.show_minimap);
    const setShowGrid = useStore((state) => state.map.setShowGrid);
    const setShowMinimap = useStore((state) => state.map.setShowMinimap);

    return (
        <div className="w-full p-4 rounded-lg text-black flex flex-col gap-2 bg-white">
            <span>Informações</span>
            <input type="checkbox" checked={show_grid} onChange={() => setShowGrid(!show_grid)} />
            <label>Mostrar Grade</label>
            <input type="checkbox" checked={show_minimap} onChange={() => setShowMinimap(!show_minimap)} />
            <label>Mostrar Minimap</label>
        </div>
    );
}

export default MapControls;