import { 
    useEffect, 
    useRef, 
    useCallback,
    useState
} from 'react';
import { useStore } from '../../../store/useStore';

// Define building polygons (coordinates relative to image dimensions)
const buildings = [
    {
        name: "Storage",
        color: "rgba(0, 255, 0, 0.3)",
        polygon: [
            { x: 0.195, y: 0.445 },
            { x: 0.375, y: 0.31 },
            { x: 0.515, y: 0.42 },
            { x: 0.3, y: 0.58 },
            { x: 0.225, y: 0.522 },
            { x: 0.228, y: 0.47 }
        ]
    },
    {
        name: "Farm",
        color: "rgba(200, 255, 0, 0.57)",
        polygon: [
            { x: 0, y: 0 },
            { x: 0, y: 0.72 },
            { x: 0.13, y: 0.617 },
            { x: 0.134, y: 0.465 },
            { x: 0.175, y: 0.43 },
            { x: 0.175, y: 0 }
        ]
    },
    {
        name: "Wall",
        color: "rgba(255, 21, 0, 0.46)",
        polygon: [
            { x: 0.41, y: 0.825 },
            { x: 0.13, y: 0.621 },
            { x: 0.134, y: 0.465 },
            { x: 0.18, y: 0.427 },
            { x: 0.228, y: 0.47 },
            { x: 0.225, y: 0.522 },
            { x: 0.37, y: 0.63 },
            { x: 0.41, y: 0.598 },
            { x: 0.462, y: 0.64 },
            { x: 0.462, y: 0.79 },
        ]
    },
    {
        name: "University",
        color: "rgba(34, 19, 255, 0.46)",
        polygon: [
            { x: 0.5, y: 0.408 },
            { x: 0.385, y: 0.315 },
            { x: 0.5, y: 0.23 },
            { x: 0.53, y: 0.25 },
            { x: 0.53, y: 0.15 },
            { x: 0.55, y: 0.05 },
            { x: 0.57, y: 0.16 },
            { x: 0.58, y: 0.35 },
        ]
    },
    {
        name: "Barracks",
        color: "rgba(255, 0, 255, 0.46)",
        polygon: [
            { x: 0.814, y: 0.51 },
            { x: 0.81, y: 0.42 },
            { x: 0.69, y: 0.323 },
            { x: 0.38, y: 0.57 },
            { x: 0.462, y: 0.64 },
            { x: 0.462, y: 0.7 },
            { x: 0.59, y: 0.7 },
            { x: 0.625, y: 0.68 },
        ]
    },
    {
        name: "Lumberjack",
        color: "rgba(0, 0, 0, 0.46)",
        polygon: [
            { x: 1, y: 0.715 },
            { x: 0.64, y: 0.715 },
            { x: 0.64, y: 0.923 },
            { x: 0.72, y: 1 },
            { x: 1, y: 1 },
        ]
    },
    {
        name: "Monastry",
        color: "rgba(107, 1, 93, 0.46)",
        polygon: [
            { x: 1, y: 0.712 },
            { x: 0.895, y: 0.712 },
            { x: 0.895, y: 0.575 },
            { x: 0.91, y: 0.545 },
            { x: 0.955, y: 0.52 },
            { x: 1, y: 0.6 },
        ]
    },
    {
        name: "Blacksmith",
        color: "rgba(255, 140, 0, 0.46)",
        polygon: [
            { x: 0.885, y: 0.29 },
            { x: 0.87, y: 0.363 },
            { x: 1, y: 0.44 },
            { x: 1, y: 0.32 },
            { x: 0.97, y: 0.28 },
        ]
    },
    {
        name: "Castle",
        color: "rgba(0, 255, 255, 0.54)",
        polygon: [
            { x: 1, y: 0 },
            { x: 1, y: 0.32 },
            { x: 0.97, y: 0.28 },
            { x: 0.885, y: 0.29 },
            { x: 0.87, y: 0.363 },
            { x: 0.675, y: 0.22 },
            { x: 0.67, y: 0.03 },
            { x: 0.71, y: 0 },
        ]
    }
];

const CanvasMapContainer: React.FC<{}> = () => {
    const setLoadingCity = useStore((state) => state.city.setLoadingCity);
    const is_loading_city = useStore((state) => state.city.is_loading_city);
    const image_url = 'https://jornada-sat-public.s3.us-east-1.amazonaws.com/test/city-overview.jpg';

    const canvas_ref = useRef<HTMLCanvasElement>(null);
    const image_ref = useRef<HTMLImageElement | null>(null);
    const ctx_ref = useRef<CanvasRenderingContext2D | null>(null);
    const imageOffsetRef = useRef({ x: 0, y: 0, width: 0, height: 0 });
    
    const [hoveredBuilding, setHoveredBuilding] = useState<string | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const draw = useCallback(() => {
        const canvas = canvas_ref.current;
        const ctx = ctx_ref.current;
        const image = image_ref.current;
        
        if (!canvas || !ctx || !image) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Calculate aspect ratio to fit image within canvas
        const imageAspect = image.width / image.height;
        const canvasAspect = canvas.width / canvas.height;
        
        let drawWidth: number, drawHeight: number, offsetX: number, offsetY: number;
        
        if (imageAspect > canvasAspect) {
            // Image is wider than canvas
            drawWidth = canvas.width;
            drawHeight = canvas.width / imageAspect;
            offsetX = 0;
            offsetY = (canvas.height - drawHeight) / 2;
        } else {
            // Image is taller than canvas
            drawHeight = canvas.height;
            drawWidth = canvas.height * imageAspect;
            offsetX = (canvas.width - drawWidth) / 2;
            offsetY = 0;
        }
        
        // Store image offset and dimensions for coordinate conversion
        imageOffsetRef.current = { x: offsetX, y: offsetY, width: drawWidth, height: drawHeight };
        
        ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
        
        // Draw building polygons
        buildings.forEach(building => {
            const isHovered = hoveredBuilding === building.name;
            
            ctx.beginPath();
            building.polygon.forEach((point, index) => {
                const x = offsetX + point.x * drawWidth;
                const y = offsetY + point.y * drawHeight;
                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            ctx.closePath();
            
            // Fill with semi-transparent color
            if (isHovered) {
                ctx.fillStyle = 'rgba(255, 255, 0, 0.4)';
            } else {
                ctx.fillStyle = building.color;
            }
            ctx.fill();
            
            // Draw border
            ctx.strokeStyle = isHovered ? '#ffff00' : building.color;
            ctx.lineWidth = 2;
            ctx.stroke();
        });
    }, [hoveredBuilding]);

    const isPointInPolygon = useCallback((x: number, y: number, polygon: Array<{x: number, y: number}>) => {
        let inside = false;
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            const xi = polygon[i].x, yi = polygon[i].y;
            const xj = polygon[j].x, yj = polygon[j].y;
            
            const intersect = ((yi > y) !== (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        return inside;
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        const canvas = canvas_ref.current;
        if (!canvas) return;
        
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        setMousePosition({ x: e.clientX, y: e.clientY });
        
        const { x: offsetX, y: offsetY, width: drawWidth, height: drawHeight } = imageOffsetRef.current;
        
        // Convert mouse position to relative image coordinates (0-1)
        const relX = (mouseX - offsetX) / drawWidth;
        const relY = (mouseY - offsetY) / drawHeight;
        
        // Check which building is hovered
        let foundBuilding: string | null = null;
        for (const building of buildings) {
            if (isPointInPolygon(relX, relY, building.polygon)) {
                foundBuilding = building.name;
                break;
            }
        }
        
        if (foundBuilding !== hoveredBuilding) {
            setHoveredBuilding(foundBuilding);
            draw();
        }
    }, [hoveredBuilding, isPointInPolygon, draw]);

    const resizeCanvas = useCallback(() => {
        const canvas = canvas_ref.current;
        if (!canvas) return;
        
        const parent = canvas.parentElement;
        if (parent) {
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
            draw();
        }
    }, [draw]);

    useEffect(() => {
        const canvas = canvas_ref.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx_ref.current = ctx;
        
        const image = new Image();
        image_ref.current = image;
        
        image.onload = () => {
            resizeCanvas();
            setLoadingCity(false);
        };
        
        image.src = image_url;

        canvas.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', resizeCanvas);

        return () => {
            canvas.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', resizeCanvas);
            image_ref.current = null;
            ctx_ref.current = null;
        };
    }, [image_url, resizeCanvas, setLoadingCity, handleMouseMove]);

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            {is_loading_city && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    color: 'white',
                    padding: '20px 40px',
                    borderRadius: '8px',
                    zIndex: 1000
                }}>
                    Loading City...
                </div>
            )}
            <canvas 
                ref={canvas_ref} 
                style={{ 
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    cursor: hoveredBuilding ? 'pointer' : 'default'
                }}
            />
            {hoveredBuilding && (
                <div style={{
                    position: 'fixed',
                    left: `${mousePosition.x + 15}px`,
                    top: `${mousePosition.y + 15}px`,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    color: 'white',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    pointerEvents: 'none',
                    zIndex: 2000,
                    fontSize: '14px',
                    whiteSpace: 'nowrap'
                }}>
                    {hoveredBuilding}
                </div>
            )}
        </div>
    );
};

export default CanvasMapContainer;