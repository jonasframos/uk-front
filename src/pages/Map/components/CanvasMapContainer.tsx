import { 
    useEffect, 
    useRef, 
    useCallback,
    useState
} from 'react';
import { useStore } from '../../../store/useStore';
import TileInfo from './TileInfo';
import PlayerInfo from './PlayerInfo';
import MapControls from './MapControls';
import TileInfoSelected from './TileInfoSelected';


const CanvasMapContainer: React.FC<{}> = () => {
    const setLoadingMap = useStore((state) => state.map.setLoadingMap);
    const is_loading_map = useStore((state) => state.map.is_loading_map);
    const selected_map = useStore((state) => state.map.selected_map);
    const player_info = useStore((state) => state.player.current_player);
    const show_grid = useStore((state) => state.map.show_grid);
    const show_minimap = useStore((state) => state.map.show_minimap);
    const image_url = selected_map ? selected_map.image : '';

    const canvas_ref = useRef<HTMLCanvasElement>(null);
    const minimap_canvas_ref = useRef<HTMLCanvasElement>(null);
    const grid_cache_visible_ref = useRef<HTMLCanvasElement | null>(null);
    const grid_cache_invisible_ref = useRef<HTMLCanvasElement | null>(null);
    const image_ref = useRef<HTMLImageElement | null>(null);
    const ctx_ref = useRef<CanvasRenderingContext2D | null>(null);
    const minimap_ctx_ref = useRef<CanvasRenderingContext2D | null>(null);
    const cityImages = useRef<Map<string, HTMLImageElement>>(new Map());
    
    const offsetX = useRef(0);
    const offsetY = useRef(0);
    const scale = useRef(0.5);
    const minScale = useRef(0.5);
    const maxScale = useRef(1);
    
    const isDragging = useRef(false);
    const isClick = useRef(true);
    const lastMouseX = useRef(0);
    const lastMouseY = useRef(0);
    
    const renderGrid = useRef(true);
    const gridSize = useRef(50);
    const gridColor = useRef('#000000');
    const gridOffsetX = useRef(21);
    const gridOffsetY = useRef(-32);
    const hexagons = useRef<Array<any>>([]);
    const gridCacheValid = useRef(false);
    const showGridRef = useRef(show_grid);
    const hoveredHex = useRef<any>(null);
    const selectedHexagons = useRef<Map<string, any>>(new Map());
    const [hoveredHexagon, setHoveredHexagon] = useState<any>(null);
    const [selectedHexagon, setSelectedHexagon] = useState<any>(null);
    const [mousePosition, setMousePosition] = useState<{x: number, y: number}>({ x: 0, y: 0 });

    const drawCityOnHex = useCallback((ctx: CanvasRenderingContext2D, hexData: any, forceRedraw?: () => void) => {
        if (!hexData.tile_info?.owned_by?.city) return;
        
        const cityImageUrl = 'https://jornada-sat-public.s3.us-east-1.amazonaws.com/test/city.png';
        const cacheKey = `city_${hexData.q}_${hexData.r}`;
        
        let cityImage = cityImages.current.get(cacheKey);
        
        if (!cityImage) {
            cityImage = new Image();
            cityImage.crossOrigin = 'anonymous';
            cityImage.onload = () => {
                if (forceRedraw) forceRedraw();
            };
            cityImage.onerror = () => {
                console.error('Failed to load city image for hex:', hexData.q, hexData.r);
            };
            cityImage.src = cityImageUrl;
            cityImages.current.set(cacheKey, cityImage);
        } else if (cityImage.complete) {
            const imageSize = hexData.radius * 1.5;
            ctx.drawImage(
                cityImage,
                hexData.centerX - imageSize / 2,
                hexData.centerY - imageSize / 2,
                imageSize,
                imageSize
            );
        }
    }, []);

    const drawBasicHexagon = useCallback((
        ctx: CanvasRenderingContext2D, 
        centerX: number, 
        centerY: number, 
        radius: number
    ) => {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.closePath();
        ctx.stroke();
    }, []);

    const drawHoverSelectHexagon = useCallback((
        ctx: CanvasRenderingContext2D, 
        hexData: any, 
        isHovered: boolean, 
        isSelected: boolean
    ) => {
        if (!hexData || (!isHovered && !isSelected)) return;
        
        const { centerX, centerY, radius } = hexData;
        
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.closePath();
        
        if (isSelected) {
            ctx.globalAlpha = 0.4;
            ctx.fillStyle = '#ffff04ff';
            ctx.fill();
            
            ctx.globalAlpha = 1.0;
            ctx.strokeStyle = '#ffff04ff';
            ctx.lineWidth = 3 / scale.current;
            ctx.stroke();
            
            ctx.fillStyle = '#000';
            ctx.font = `${10 / scale.current}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
        } else if (isHovered) {
            ctx.globalAlpha = 0.3;
            ctx.fillStyle = '#ffffffc1';
            ctx.fill();
            
            ctx.globalAlpha = 1.0;
            ctx.strokeStyle = '#ffffffff';
            ctx.lineWidth = 2 / scale.current;
            ctx.stroke();
        }
    }, []);

    const renderGridToCache = useCallback((image: HTMLImageElement) => {
        if (!image || !renderGrid.current || gridCacheValid.current) return;
        
        // Create off-screen canvases for both visible and invisible grids
        if (!grid_cache_visible_ref.current) {
            grid_cache_visible_ref.current = document.createElement('canvas');
            grid_cache_visible_ref.current.width = image.width;
            grid_cache_visible_ref.current.height = image.height;
        }
        
        if (!grid_cache_invisible_ref.current) {
            grid_cache_invisible_ref.current = document.createElement('canvas');
            grid_cache_invisible_ref.current.width = image.width;
            grid_cache_invisible_ref.current.height = image.height;
        }
        
        const visibleCtx = grid_cache_visible_ref.current.getContext('2d');
        const invisibleCtx = grid_cache_invisible_ref.current.getContext('2d');
        if (!visibleCtx || !invisibleCtx) return;
        
        const radius = gridSize.current;
        const hexWidth = radius * 2;
        const hexHeight = radius * Math.sqrt(3);
        const horizontalSpacing = hexWidth * 0.75;
        const verticalSpacing = hexHeight;
        
        hexagons.current = [];
        
        // Clear both cache canvases
        visibleCtx.clearRect(0, 0, image.width, image.height);
        invisibleCtx.clearRect(0, 0, image.width, image.height);
        
        // Setup for visible grid (opacity 0.3)
        visibleCtx.strokeStyle = gridColor.current;
        visibleCtx.globalAlpha = 0.2;
        visibleCtx.lineWidth = 3;
        
        // Setup for invisible grid (opacity 0)
        invisibleCtx.strokeStyle = gridColor.current;
        invisibleCtx.globalAlpha = 0;
        invisibleCtx.lineWidth = 3;
        
        const buffer = Math.max(hexWidth, hexHeight);
        const startX = -buffer + gridOffsetX.current;
        const endX = image.width + buffer + gridOffsetX.current;
        const startY = -buffer + gridOffsetY.current;
        const endY = image.height + buffer + gridOffsetY.current;
        
        let colIndex = 0;
        for (let x = startX; x <= endX; x += horizontalSpacing) {
            const yOffset = (colIndex % 2 === 1) ? hexHeight / 2 : 0;
            
            let rowIndex = 0;
            for (let y = startY + yOffset; y <= endY; y += verticalSpacing) {
                const tile_info = selected_map?.tiles.find((tile) => tile.coordinates.x === colIndex && tile.coordinates.y === rowIndex);
                if(tile_info) {
                    const hexData = {
                        centerX: x,
                        centerY: y,
                        radius: radius,
                        q: colIndex,
                        r: rowIndex,
                        coordText: `${colIndex},${rowIndex}`,
                        tile_info: {
                            terrain: tile_info?.terrain || null,
                            is_buildable: tile_info?.is_buildable || false,
                            owned_by: tile_info?.owned_by || null,
                        }
                    };
                    hexagons.current.push(hexData);
                    drawBasicHexagon(visibleCtx, x, y, radius);
                    drawBasicHexagon(invisibleCtx, x, y, radius);
                } 
                rowIndex++;
            }
            colIndex++;
        }
        
        visibleCtx.globalAlpha = 1.0;
        invisibleCtx.globalAlpha = 1.0;
        gridCacheValid.current = true;
    }, [drawBasicHexagon, selected_map]);

    const getHexagonAtPoint = useCallback((canvasX: number, canvasY: number) => {
        // Convert canvas coordinates to image coordinates
        const imageX = (canvasX - offsetX.current) / scale.current;
        const imageY = (canvasY - offsetY.current) / scale.current;
        
        // Find hexagon at this point
        for (const hex of hexagons.current) {
            const dx = imageX - hex.centerX;
            const dy = imageY - hex.centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Check if point is within hexagon (approximate with circle)
            if (distance <= hex.radius) {
                return hex;
            }
        }
        return null;
    }, []);

    const drawMinimap = useCallback(() => {
        if (!show_minimap) return;
        
        const minimapCanvas = minimap_canvas_ref.current;
        const minimapCtx = minimap_ctx_ref.current;
        const canvas = canvas_ref.current;
        const image = image_ref.current;
        
        if (!minimapCanvas || !minimapCtx || !canvas || !image) return;
        
        // Clear minimap
        minimapCtx.clearRect(0, 0, minimapCanvas.width, minimapCanvas.height);
        
        // Draw scaled down image
        const minimapScale = Math.min(
            minimapCanvas.width / image.width,
            minimapCanvas.height / image.height
        );
        
        const scaledWidth = image.width * minimapScale;
        const scaledHeight = image.height * minimapScale;
        const offsetXMinimap = (minimapCanvas.width - scaledWidth) / 2;
        const offsetYMinimap = (minimapCanvas.height - scaledHeight) / 2;
        
        minimapCtx.drawImage(
            image,
            offsetXMinimap,
            offsetYMinimap,
            scaledWidth,
            scaledHeight
        );
        
        // Draw viewport rectangle
        const viewportX = (-offsetX.current / scale.current) * minimapScale + offsetXMinimap;
        const viewportY = (-offsetY.current / scale.current) * minimapScale + offsetYMinimap;
        const viewportWidth = (canvas.width / scale.current) * minimapScale;
        const viewportHeight = (canvas.height / scale.current) * minimapScale;
        
        minimapCtx.strokeStyle = '#d8d8d8ff';
        minimapCtx.lineWidth = 2;
        minimapCtx.strokeRect(viewportX, viewportY, viewportWidth, viewportHeight);
        
        // Semi-transparent overlay outside viewport
        minimapCtx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        minimapCtx.fillRect(0, 0, minimapCanvas.width, minimapCanvas.height);
        minimapCtx.clearRect(viewportX, viewportY, viewportWidth, viewportHeight);
        
        // Redraw viewport area
        minimapCtx.drawImage(
            image,
            (-offsetX.current / scale.current),
            (-offsetY.current / scale.current),
            canvas.width / scale.current,
            canvas.height / scale.current,
            viewportX,
            viewportY,
            viewportWidth,
            viewportHeight
        );
        
        // Draw viewport border
        minimapCtx.strokeStyle = '#d8d8d8ff';
        minimapCtx.lineWidth = 1;
        minimapCtx.strokeRect(viewportX, viewportY, viewportWidth, viewportHeight);
    }, [show_minimap]);

    const draw = useCallback(() => {
        const canvas = canvas_ref.current;
        const ctx = ctx_ref.current;
        const image = image_ref.current;
        const gridCache = showGridRef.current ? grid_cache_visible_ref.current : grid_cache_invisible_ref.current;
        
        if (!canvas || !ctx || !image) return;
        
        // Render grid to cache if needed
        if (renderGrid.current && !gridCacheValid.current) {
            renderGridToCache(image);
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(offsetX.current, offsetY.current);
        ctx.scale(scale.current, scale.current);
        
        // Draw image
        ctx.drawImage(image, 0, 0);
        
        // Draw cached grid (visible or invisible based on showGridRef)
        if (renderGrid.current && gridCache && gridCacheValid.current) {
            ctx.drawImage(gridCache, 0, 0);
        }
        
        // Draw cities on hexagons that have them
        const hexesWithCities = hexagons.current.filter(hex => hex.tile_info?.owned_by?.city);
        hexesWithCities.forEach((hex) => {
            drawCityOnHex(ctx, hex, draw);
        });
        
        // Draw hover and selected hexagons on top
        if (renderGrid.current) {
            if (hoveredHex.current) {
                const isSelected = selectedHexagons.current.has(`${hoveredHex.current.q},${hoveredHex.current.r}`);
                drawHoverSelectHexagon(ctx, hoveredHex.current, true, isSelected);
            }
            
            // Draw selected hexagons (that are not hovered)
            selectedHexagons.current.forEach((hex) => {
                if (hex && (!hoveredHex.current || hoveredHex.current.q !== hex.q || hoveredHex.current.r !== hex.r)) {
                    drawHoverSelectHexagon(ctx, hex, false, true);
                }
            });
        }
    
        ctx.restore();
        
        // Update minimap
        drawMinimap();
    }, [renderGridToCache, drawHoverSelectHexagon, drawMinimap]);

    const constrainViewBounds = useCallback(() => {
        const canvas = canvas_ref.current;
        const image = image_ref.current;
        
        if (!canvas || !image) return;
        
        const scaledWidth = image.width * scale.current;
        const scaledHeight = image.height * scale.current;
        
        if (scaledWidth <= canvas.width) {
            offsetX.current = (canvas.width - scaledWidth) / 2;
        } else {
            const maxOffsetX = 0;
            const minOffsetX = canvas.width - scaledWidth;
            offsetX.current = Math.max(minOffsetX, Math.min(maxOffsetX, offsetX.current));
        }
        
        if (scaledHeight <= canvas.height) {
            offsetY.current = (canvas.height - scaledHeight) / 2;
        } else {
            const maxOffsetY = 0;
            const minOffsetY = canvas.height - scaledHeight;
            offsetY.current = Math.max(minOffsetY, Math.min(maxOffsetY, offsetY.current));
        }
    }, []);

    const handleMouseDown = useCallback((e: MouseEvent) => {
        const canvas = canvas_ref.current;
        if (!canvas) return;
        
        isDragging.current = true;
        isClick.current = true;
        const rect = canvas.getBoundingClientRect();
        lastMouseX.current = e.clientX - rect.left;
        lastMouseY.current = e.clientY - rect.top;
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        const canvas = canvas_ref.current;
        if (!canvas) return;
        
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        if (isDragging.current) {
            // If mouse moved during drag, it's not a click
            const deltaX = mouseX - lastMouseX.current;
            const deltaY = mouseY - lastMouseY.current;
            
            if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
                isClick.current = false;
            }
            
            offsetX.current += deltaX;
            offsetY.current += deltaY;
            
            constrainViewBounds();
            
            lastMouseX.current = mouseX;
            lastMouseY.current = mouseY;
            
            draw();
        } else if (renderGrid.current) {
            // Update hover state
            const hex = getHexagonAtPoint(mouseX, mouseY);
            if (hex !== hoveredHex.current) {
                hoveredHex.current = hex;
                setHoveredHexagon(hex);
                draw();
            }
            setMousePosition({x: e.clientX, y: e.clientY});
        }
    }, [draw, constrainViewBounds, getHexagonAtPoint]);

    const handleMouseUp = useCallback((e: MouseEvent) => {
        const canvas = canvas_ref.current;
        if (!canvas) return;
        
        // Handle click on hexagon
        if (isClick.current && renderGrid.current) {
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            const hex = getHexagonAtPoint(mouseX, mouseY);
            if (hex) {
                const coordKey = `${hex.q},${hex.r}`;
                // Toggle selection: if already selected, unselect it; otherwise select it
                if (selectedHexagons.current.has(coordKey)) {
                    selectedHexagons.current.delete(coordKey);
                    setSelectedHexagon(null);
                } else {
                    selectedHexagons.current.clear();
                    selectedHexagons.current.set(coordKey, hex);
                    setSelectedHexagon(hex);
                }
                draw();
            }
        }
        
        isDragging.current = false;
        isClick.current = false;
    }, [getHexagonAtPoint, draw]);

    const handleWheel = useCallback((e: WheelEvent) => {
        e.preventDefault();
        
        const canvas = canvas_ref.current;
        const image = image_ref.current;
        if (!canvas || !image) return;
        
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
        let newScale = Math.min(Math.max(scale.current * zoomFactor, minScale.current), maxScale.current);
        
        const minScaleX = canvas.width / image.width;
        const minScaleY = canvas.height / image.height;
        const fitScale = Math.min(minScaleX, minScaleY);
        newScale = Math.max(newScale, fitScale);
        
        if (newScale !== scale.current) {
            const scaleChange = newScale / scale.current;
            offsetX.current = mouseX - (mouseX - offsetX.current) * scaleChange;
            offsetY.current = mouseY - (mouseY - offsetY.current) * scaleChange;
            
            scale.current = newScale;
            
            constrainViewBounds();
            draw();
        }
    }, [draw, constrainViewBounds]);

    const resizeCanvas = useCallback(() => {
        const canvas = canvas_ref.current;
        const image = image_ref.current;
        if (!canvas || !image) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        offsetX.current = (canvas.width - image.width * scale.current) / 2;
        offsetY.current = (canvas.height - image.height * scale.current) / 2;

        constrainViewBounds();
        draw();
    }, [draw, constrainViewBounds]);

    useEffect(() => {
        // Update showGridRef and redraw when show_grid changes
        showGridRef.current = show_grid;
        draw();
    }, [show_grid, draw]);

    useEffect(() => {
        // Initialize or update minimap canvas when show_minimap changes
        if (show_minimap) {
            const minimapCanvas = minimap_canvas_ref.current;
            if (minimapCanvas) {
                const minimapCtx = minimapCanvas.getContext('2d');
                if (minimapCtx) {
                    minimap_ctx_ref.current = minimapCtx;
                    draw();
                }
            }
        } else {
            draw();
        }
    }, [show_minimap, draw]);

    useEffect(() => {
        const canvas = canvas_ref.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx_ref.current = ctx;
        
        // Initialize minimap canvas
        if (show_minimap) {
            const minimapCanvas = minimap_canvas_ref.current;
            if (minimapCanvas) {
                const minimapCtx = minimapCanvas.getContext('2d');
                if (minimapCtx) {
                    minimap_ctx_ref.current = minimapCtx;
                }
            }
        }
        
        const image = new Image();
        image_ref.current = image;
        
        image.onload = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            scale.current = 0.5;
            offsetX.current = (canvas.width - image.width * scale.current) / 2;
            offsetY.current = (canvas.height - image.height * scale.current) / 2;
            
            draw();  
            setLoadingMap(false);
        };
        
        image.src = image_url;

        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('mouseleave', handleMouseUp);
        canvas.addEventListener('wheel', handleWheel);
        window.addEventListener('resize', resizeCanvas);

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseup', handleMouseUp);
            canvas.removeEventListener('mouseleave', handleMouseUp);
            canvas.removeEventListener('wheel', handleWheel);
            window.removeEventListener('resize', resizeCanvas);
            image_ref.current = null;
            ctx_ref.current = null;
        };
    }, [image_url, draw, handleMouseDown, handleMouseMove, handleMouseUp, handleWheel, resizeCanvas, setLoadingMap, show_minimap]);

    return (
        <div>
            {is_loading_map && (
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
                    Loading Map...
                </div>
            )}
            <div>
                <div style={{ 
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw', 
                    height: '100vh', 
                    overflow: 'hidden',
                    margin: 0,
                    padding: 0
                }}>
                    <canvas 
                        ref={canvas_ref} 
                        style={{ 
                            display: 'block', 
                            cursor: isDragging.current ? 'grabbing' : 'grab',
                            width: '100%',
                            height: '100%'
                        }}
                    />
                </div>
                {show_minimap && (
                    <div style={{
                        position: 'absolute',
                        bottom: '30px',
                        right: '30px',
                        border: '2px solid #333',
                        borderRadius: '4px',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
                        pointerEvents: 'auto',
                        zIndex: 2000
                    }}>
                        <canvas 
                            ref={minimap_canvas_ref}
                            width={300}
                            height={300}
                            style={{ 
                                display: 'block',
                                cursor: 'pointer'
                            }}
                        />
                    </div>
                )}
                {hoveredHexagon && (
                    <div style={{
                        position: 'fixed',
                        left: `${Math.min(mousePosition.x + 20, window.innerWidth - 350)}px`,
                        top: `${Math.min(mousePosition.y + 20, window.innerHeight - 170)}px`,
                        pointerEvents: 'none',
                        zIndex: 2000,
                        width: '250px'
                    }}>
                        <TileInfo data={hoveredHexagon} />
                    </div>
                )}
                {selectedHexagon && (
                    <div style={{
                        position: 'fixed',
                        bottom: '30px',
                        left: '30px',
                        pointerEvents: 'auto',
                        zIndex: 2000,
                        width: '250px'
                    }}>
                        <TileInfoSelected data={selectedHexagon} />
                    </div>
                )}
                {player_info && (
                    <div style={{
                        position: 'fixed',
                        top: '30px',
                        left: '30px',
                        pointerEvents: 'auto',
                        zIndex: 2000,
                        width: '250px'
                    }}>
                        <PlayerInfo data={player_info} />
                    </div>
                )}
                 <div style={{
                    position: 'fixed',
                    top: '30px',
                    left: '310px',
                    pointerEvents: 'auto',
                    zIndex: 2000,
                    width: '250px'
                }}>
                    <MapControls show_grid={show_grid} show_minimap={show_minimap} />
                </div>
            </div>
        </div>
    );
};

export default CanvasMapContainer;