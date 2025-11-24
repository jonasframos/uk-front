import { useEffect, useRef, useCallback } from 'react';

interface CanvasMapContainerProps {
    image_url: string;
}

const CanvasMapContainer: React.FC<CanvasMapContainerProps> = ({
    image_url
}) => {
    const canvas_ref = useRef<HTMLCanvasElement>(null);
    const image_ref = useRef<HTMLImageElement | null>(null);
    const ctx_ref = useRef<CanvasRenderingContext2D | null>(null);
    
    const offsetX = useRef(0);
    const offsetY = useRef(0);
    const scale = useRef(0.5);
    const minScale = useRef(0.5);
    const maxScale = useRef(1);
    
    const isDragging = useRef(false);
    const lastMouseX = useRef(0);
    const lastMouseY = useRef(0);

    const draw = useCallback(() => {
        const canvas = canvas_ref.current;
        const ctx = ctx_ref.current;
        const image = image_ref.current;
        
        if (!canvas || !ctx || !image) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(offsetX.current, offsetY.current);
        ctx.scale(scale.current, scale.current);
        ctx.drawImage(image, 0, 0);
        ctx.restore();
    }, []);

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
        const rect = canvas.getBoundingClientRect();
        lastMouseX.current = e.clientX - rect.left;
        lastMouseY.current = e.clientY - rect.top;
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        const canvas = canvas_ref.current;
        if (!canvas || !isDragging.current) return;
        
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const deltaX = mouseX - lastMouseX.current;
        const deltaY = mouseY - lastMouseY.current;
        
        offsetX.current += deltaX;
        offsetY.current += deltaY;
        
        constrainViewBounds();
        
        lastMouseX.current = mouseX;
        lastMouseY.current = mouseY;
        
        draw();
    }, [draw, constrainViewBounds]);

    const handleMouseUp = useCallback(() => {
        isDragging.current = false;
    }, []);

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
        const canvas = canvas_ref.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx_ref.current = ctx;
        
        const image = new Image();
        image_ref.current = image;
        
        image.onload = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            scale.current = 0.5;
            offsetX.current = (canvas.width - image.width * scale.current) / 2;
            offsetY.current = (canvas.height - image.height * scale.current) / 2;
            
            draw();
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
    }, [image_url, draw, handleMouseDown, handleMouseMove, handleMouseUp, handleWheel, resizeCanvas]);

    return (
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
    );
};

export default CanvasMapContainer;
            
            
            
            