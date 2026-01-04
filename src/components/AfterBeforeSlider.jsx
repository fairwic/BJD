import React, { useState, useRef, useEffect } from 'react';
import { ChevronsLeftRight } from 'lucide-react';

const AfterBeforeSlider = ({ beforeImage, afterImage, beforeLabel = "Before", afterLabel = "After" }) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const containerRef = useRef(null);
    const isDragging = useRef(false);

    const handleMove = (clientX) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percent = (x / rect.width) * 100;
        setSliderPosition(percent);
    };

    const handleMouseDown = () => {
        isDragging.current = true;
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    const handleMouseMove = (e) => {
        if (!isDragging.current) return;
        handleMove(e.clientX);
    };

    const handleTouchMove = (e) => {
        handleMove(e.touches[0].clientX);
    };

    useEffect(() => {
        document.addEventListener('mouseup', handleMouseUp);
        return () => document.removeEventListener('mouseup', handleMouseUp);
    }, []);

    return (
        <div 
            ref={containerRef}
            className="relative w-full aspect-[4/3] rounded-xl overflow-hidden cursor-ew-resize mb-3 select-none touch-none"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
        >
            {/* After Image (Background) */}
            <div className={`absolute inset-0 ${afterImage} bg-cover bg-center`} />
            <span className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs font-bold pointer-events-none">
                {afterLabel}
            </span>

            {/* Before Image (Foreground, Clipped) */}
            <div 
                className={`absolute inset-0 ${beforeImage} bg-cover bg-center border-r-2 border-white`}
                style={{ width: `${sliderPosition}%` }}
            >
                 <span className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-xs font-bold pointer-events-none">
                    {beforeLabel}
                </span>
            </div>

            {/* Handle */}
            <div 
                className="absolute top-0 bottom-0 w-8 -ml-4 flex items-center justify-center pointer-events-auto"
                style={{ left: `${sliderPosition}%` }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
            >
                <div className="w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600">
                    <ChevronsLeftRight size={18} />
                </div>
            </div>
        </div>
    );
};

export default AfterBeforeSlider;
