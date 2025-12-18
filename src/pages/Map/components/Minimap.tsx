import { useRef } from 'react';

export interface MinimapProps {
    canvas_ref: React.RefObject<HTMLCanvasElement>;
}

const Minimap: React.FC<MinimapProps> = ({ canvas_ref }) => {    
    return (
        <canvas 
            ref={canvas_ref}
            width={300}
            height={220}
            style={{ 
                display: 'block',
                cursor: 'pointer'
            }}
        />
    );
}

export default Minimap;