import { 
    useEffect, 
    useRef, 
    useCallback,
    useState
} from 'react';
import { useStore } from '../../../store/useStore';
import Toolbar from './Toolbar';
import { CityImage } from '../../../assets/images';
import TileInfo from './TileInfo';
import TierText from '../../../components/Text/TierText';
import SelectedTileInfo from './SelectedTileInfo';


const CanvasMapContainer: React.FC<{}> = () => {
    const setLoadingMap = useStore((state) => state.map.setLoadingMap);
    const is_loading_map = useStore((state) => state.map.is_loading_map);
    const selected_map = useStore((state) => state.map.selected_map);
    const player_info = useStore((state) => state.player.current_player);
    const show_grid = useStore((state) => state.map.show_grid);
    const show_minimap = useStore((state) => state.map.show_minimap);
    const show_legend = useStore((state) => state.map.show_legend);
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
    const scale = useRef(0.7);
    let centerHexQ = 10;
    let centerHexR = 10;
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
    const showLegendRef = useRef(show_legend);
    const hoveredHex = useRef<any>(null);
    const selectedHexagons = useRef<Map<string, any>>(new Map());
    const rafIdRef = useRef<number | null>(null);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [selectedHexagon, setSelectedHexagon] = useState<any>(null);
    const [hoveredHexagon, setHoveredHexagon] = useState<any>(null);
    const [mousePosition, setMousePosition] = useState<{x: number, y: number}>({ x: 0, y: 0 });
    const tierLabelsContainerRef = useRef<HTMLDivElement>(null);
    const [tierHexagons, setTierHexagons] = useState<Array<any>>([]);

    const drawCityOnHex = useCallback((ctx: CanvasRenderingContext2D, hexData: any, forceRedraw?: () => void) => {
        if (!hexData.tile_info?.owned_by?.city) return;
        
        const cityImageUrl = CityImage;
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
            const imageSize = hexData.radius * 1.6;
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
            ctx.globalAlpha = 0.3;
            ctx.fillStyle = '#3a6df9ff';
            ctx.fill();
            
            ctx.globalAlpha = 0.3;
            ctx.strokeStyle = '#3a6df9ff';
            ctx.lineWidth = 1 / scale.current;
            ctx.stroke();
            
            ctx.fillStyle = '#000';
            ctx.font = `${10 / scale.current}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
        } else if (isHovered) {
            ctx.globalAlpha = 0.3;
            ctx.fillStyle = '#ffffffc1';
            ctx.fill();
            
            ctx.globalAlpha = 0.3;
            ctx.strokeStyle = '#ffffffff';
            ctx.lineWidth = 1 / scale.current;
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
                            tier: tile_info?.tier || null,
                            effects: tile_info?.effects || [],
                        }
                    };
                    hexagons.current.push(hexData);
                    if(tile_info?.is_buildable) {
                        drawBasicHexagon(visibleCtx, x, y, radius);
                        drawBasicHexagon(invisibleCtx, x, y, radius);
                    }
                } 
                rowIndex++;
            }
            colIndex++;
        }
        
        visibleCtx.globalAlpha = 1.0;
        invisibleCtx.globalAlpha = 1.0;
        gridCacheValid.current = true;
        
        // Update tier hexagons list for legend rendering
        const hexesWithTier = hexagons.current.filter(hex => hex.tile_info?.tier);
        setTierHexagons(hexesWithTier);
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
        scale.current = 0.6;
        const canvas = canvas_ref.current;
        const ctx = ctx_ref.current;
        const image = image_ref.current;
        const gridCache = showGridRef.current ? grid_cache_visible_ref.current : grid_cache_invisible_ref.current;
        
        if (!canvas || !ctx || !image) return;
        
        if (renderGrid.current && !gridCacheValid.current) {
            renderGridToCache(image);
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(offsetX.current, offsetY.current);
        ctx.scale(scale.current, scale.current);
        
        ctx.drawImage(image, 0, 0);
        
        if (renderGrid.current && gridCache && gridCacheValid.current) {
            ctx.drawImage(gridCache, 0, 0);
        }
        
        const hexesWithCities = hexagons.current.filter(hex => hex.tile_info?.owned_by?.city);
        hexesWithCities.forEach((hex) => {
            drawCityOnHex(ctx, hex, draw);
        });
        
        if (renderGrid.current) {
            if (hoveredHex.current) {
                const isSelected = selectedHexagons.current.has(`${hoveredHex.current.q},${hoveredHex.current.r}`);
                drawHoverSelectHexagon(ctx, hoveredHex.current, true, isSelected);
            }
            
            selectedHexagons.current.forEach((hex) => {
                if (hex && (!hoveredHex.current || hoveredHex.current.q !== hex.q || hoveredHex.current.r !== hex.r)) {
                    drawHoverSelectHexagon(ctx, hex, false, true);
                }
            });
        }
    
        ctx.restore();
        
        // Update tier labels container transform to match canvas (use RAF for better performance)
        if (tierLabelsContainerRef.current && showLegendRef.current) {
            const container = tierLabelsContainerRef.current;
            // Use transform directly without triggering layout
            container.style.transform = `translate(${offsetX.current}px, ${offsetY.current}px) scale(${scale.current})`;
            container.style.willChange = 'transform';
        }
        
        // Update minimap
        drawMinimap();
        setLoadingMap(false);
    }, [renderGridToCache, drawHoverSelectHexagon, drawMinimap, setLoadingMap]);

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
            
            // Use RAF to throttle draw calls during drag
            if (!rafIdRef.current) {
                rafIdRef.current = requestAnimationFrame(() => {
                    draw();
                    rafIdRef.current = null;
                });
            }
        } else if (renderGrid.current) {
            // Update hover state
            const hex = getHexagonAtPoint(mouseX, mouseY);
            if (hex !== hoveredHex.current) {
                // Clear any existing timeout
                if (hoverTimeoutRef.current) {
                    clearTimeout(hoverTimeoutRef.current);
                    hoverTimeoutRef.current = null;
                }
                
                hoveredHex.current = hex;
                
                // Set hoveredHexagon after 200ms delay
                if (hex) {
                    hoverTimeoutRef.current = setTimeout(() => {
                        setHoveredHexagon(hex);
                        hoverTimeoutRef.current = null;
                    }, 50);
                } else {
                    setHoveredHexagon(null);
                }
                
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
                if (selectedHexagons.current.has(coordKey)) {
                    selectedHexagons.current.delete(coordKey);
                    setSelectedHexagon(null);
                } else {
                    selectedHexagons.current.clear();
                    selectedHexagons.current.set(coordKey, hex);
                    setSelectedHexagon(hex);
                    // if(hex.tile_info?.owned_by?.city) {
                    // }
                }
                draw();
            }
        }
        
        isDragging.current = false;
        isClick.current = false;
    }, [getHexagonAtPoint, draw]);

    const handleWheel = useCallback((e: WheelEvent) => {
        return;
        // e.preventDefault();
        
        // const canvas = canvas_ref.current;
        // const image = image_ref.current;
        // if (!canvas || !image) return;
        
        // const rect = canvas.getBoundingClientRect();
        // const mouseX = e.clientX - rect.left;
        // const mouseY = e.clientY - rect.top;
        
        // const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
        // let newScale = Math.min(Math.max(scale.current * zoomFactor, minScale.current), maxScale.current);
        
        // const minScaleX = canvas.width / image.width;
        // const minScaleY = canvas.height / image.height;
        // const fitScale = Math.min(minScaleX, minScaleY);
        // newScale = Math.max(newScale, fitScale);
        
        // if (newScale !== scale.current) {
        //     const scaleChange = newScale / scale.current;
        //     offsetX.current = mouseX - (mouseX - offsetX.current) * scaleChange;
        //     offsetY.current = mouseY - (mouseY - offsetY.current) * scaleChange;
            
        //     scale.current = newScale;
            
        //     constrainViewBounds();
        //     draw();
        // }
    }, [draw, constrainViewBounds]);

    const resizeCanvas = useCallback(() => {
        const canvas = canvas_ref.current;
        const image = image_ref.current;
        if (!canvas || !image) return;

        const parent = canvas.parentElement;
        if (!parent) return;

        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;

        offsetX.current = (canvas.width - image.width * scale.current) / 2;
        offsetY.current = (canvas.height - image.height * scale.current) / 2;

        constrainViewBounds();
        draw();
    }, [draw, constrainViewBounds]);

    useEffect(() => {
        showGridRef.current = show_grid;
        draw();
    }, [show_grid, draw]);

    useEffect(() => {
        showLegendRef.current = show_legend;
        draw();
    }, [show_legend, draw]);

    useEffect(() => {
        if (!is_loading_map && show_minimap) {
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
        if (!is_loading_map && show_minimap) {
            const minimapCanvas = minimap_canvas_ref.current;
            if (minimapCanvas) {
                const minimapCtx = minimapCanvas.getContext('2d');
                if (minimapCtx) {
                    minimap_ctx_ref.current = minimapCtx;
                    draw();
                }
            }
        }
    }, [is_loading_map, show_minimap, draw]);

    useEffect(() => {
        const canvas = canvas_ref.current;
        if (!canvas) return;
        if (!selected_map || !image_url || !player_info) return;        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx_ref.current = ctx;
        
        const image = new Image();
        image_ref.current = image;
        
        image.onload = () => {
            const parent = canvas.parentElement;
            if (!parent) return;
            
            const { x, y } = player_info?.cities?.[0] || { x: 10, y: 10 };
            centerHexQ = x;
            centerHexR = y;
            
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
            scale.current = 0.5;
            
            const radius = gridSize.current;
            const hexWidth = radius * 2;
            const hexHeight = radius * Math.sqrt(3);
            const horizontalSpacing = hexWidth * 0.75;
            const verticalSpacing = hexHeight;
            
            const hexX = centerHexQ * horizontalSpacing + gridOffsetX.current;
            const hexY = centerHexR * verticalSpacing + ((centerHexQ % 2 === 1) ? hexHeight / 2 : 0) + gridOffsetY.current;
            
            // Center view on this hex
            offsetX.current = canvas.width / 2 - hexX * scale.current;
            offsetY.current = canvas.height / 2 - hexY * scale.current;
            
            // Constrain to image borders
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
            
            draw();
            
            setTimeout(() => {
                setLoadingMap(false);
            }, 100);
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
    }, [selected_map, image_url, draw, handleMouseDown, handleMouseMove, handleMouseUp, handleWheel, resizeCanvas, setLoadingMap, show_minimap, player_info]);

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
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
            <div style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%', 
                height: '100%', 
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
            {!is_loading_map && show_legend && (
                <div
                    ref={tierLabelsContainerRef}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        pointerEvents: 'none',
                        transformOrigin: '0 0',
                        zIndex: 100
                    }}
                >
                    {tierHexagons.map((hex) => (
                        <div
                            key={`tier-${hex.q}-${hex.r}`}
                            style={{
                                position: 'absolute',
                                left: `${hex.centerX}px`,
                                top: `${hex.centerY}px`,
                                transform: 'translate(-50%, -50%)',
                                pointerEvents: 'none'
                            }}
                        >
                            <TierText tier={hex.tile_info.tier} className='text-[23px] py-1 px-3' />
                        </div>
                    ))}
                </div>
            )}
            {!is_loading_map && <Toolbar canvas_ref={minimap_canvas_ref} />}
            {!is_loading_map && hoveredHexagon && !selectedHexagon &&(
                <div style={{
                    position: 'fixed',
                    left: `${Math.min(mousePosition.x + 25, window.innerWidth - 370)}px`,
                    top: `${Math.min(mousePosition.y + 25, window.innerHeight - 200)}px`,
                    pointerEvents: 'none',
                    zIndex: 2000,
                    width: '280px'
                }}>
                    <TileInfo data={hoveredHexagon} />
                </div>
            )}
            {!is_loading_map && selectedHexagon && (
                <div style={{
                    position: 'fixed',
                    bottom: '80px',
                    left: '30px',
                    pointerEvents: 'auto',
                    zIndex: 2000,
                    width: '250px'
                }}>
                    <SelectedTileInfo data={selectedHexagon} />
                </div>
            )}
        </div>
    );
};

export default CanvasMapContainer;