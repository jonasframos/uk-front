import { CityBuilding } from "../../../store/types/city";

export interface BuildingLabelProps {
    building: CityBuilding;
    x: number;
    y: number;
    countdown?: JSX.Element;
}

const BuildingLabel: React.FC<BuildingLabelProps> = ({ building, x, y, countdown }) => {
    const next_level = building.next_level > building.current_level ? ` → ${building.next_level}` : '';
    const text = `${building.type} ${building.current_level}${countdown ? next_level : ''}`;

    return (
        <div
            className="flex flex-col items-center"
            style={{
                position: 'absolute',
                left: `${x}px`,
                top: `${y}px`,
                transform: 'translate(-50%, -50%)',
                backgroundColor: '#000000',
                color: '#ffffff',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '16px',
                fontWeight: 'bold',
                fontFamily: 'Arial, sans-serif',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                userSelect: 'none',
                zIndex: 10
            }}
        >
            <span>{text}</span>
            <span className="text-sm">{countdown}</span>
        </div>
    );
};

export default BuildingLabel;