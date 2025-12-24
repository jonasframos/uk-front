import IconButton from "../../../components/Buttons/IconButton";
import { MapIcon } from "../../../assets/icons";
import { useNavigate } from "react-router-dom";


export interface ToolbarProps {}

const Toolbar: React.FC<ToolbarProps> = ({}) => {
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
            <div className="flex flex-col w-[50px]">
              <IconButton tooltip_text="Global Map" iconClassName={'w-[25px] h-[25px]'} icon={MapIcon} onClick={() => navigate('/map')} />  
            </div>
        </div>
    );
}

export default Toolbar;