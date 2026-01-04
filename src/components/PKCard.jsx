import React, { useState } from 'react';
import { Swords } from 'lucide-react';

const PKCard = ({ leftImage, rightImage, leftLabel, rightLabel, onVote }) => {
    const [voted, setVoted] = useState(null); // 'left' | 'right' | null
    const [stats, setStats] = useState({ left: 45, right: 55 }); // Mock percentages

    const handleVote = (side) => {
        if (voted) return;
        setVoted(side);
        // Mock update stats
        if (side === 'left') setStats({ left: 46, right: 54 });
        else setStats({ left: 44, right: 56 });
        
        if (onVote) onVote(side);
    };

    return (
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden flex mb-3 select-none">
            {/* Left Side */}
            <div 
                onClick={() => handleVote('left')}
                className="flex-1 relative bg-cover bg-center cursor-pointer transition-all duration-500 overflow-hidden group"
                style={{ backgroundImage: `url(${leftImage})` }}
            >
                <div className="absolute inset-0 bg-black/10 group-active:bg-black/20 transition-colors" />
                <div className="absolute bottom-4 left-4 z-10">
                   <span className="bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm border border-white">
                        {leftLabel || "Option A"}
                   </span>
                </div>
                
                {/* Result Overlay */}
                {voted && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-300">
                        <span className="text-3xl font-black text-white italic">{stats.left}%</span>
                    </div>
                )}
            </div>

            {/* VS Badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-rose-100">
                    <Swords size={20} className="text-rose-500" />
                </div>
            </div>

            {/* Right Side */}
            <div 
                 onClick={() => handleVote('right')}
                 className="flex-1 relative bg-cover bg-center cursor-pointer transition-all duration-500 overflow-hidden group"
                 style={{ backgroundImage: `url(${rightImage})` }}
            >
                <div className="absolute inset-0 bg-black/10 group-active:bg-black/20 transition-colors" />
                <div className="absolute bottom-4 right-4 z-10">
                    <span className="bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm border border-white">
                        {rightLabel || "Option B"}
                    </span>
                </div>

                {/* Result Overlay */}
                {voted && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-300">
                        <span className="text-3xl font-black text-white italic">{stats.right}%</span>
                    </div>
                )}
            </div>
            
            {/* Animated Bar at bottom */}
            {voted && (
                <div className="absolute bottom-0 left-0 right-0 h-1.5 flex">
                    <div 
                        style={{ width: `${stats.left}%` }} 
                        className="h-full bg-rose-500 transition-all duration-1000 ease-out" 
                    />
                    <div 
                        style={{ width: `${stats.right}%` }} 
                        className="h-full bg-blue-500 transition-all duration-1000 ease-out" 
                    />
                </div>
            )}
        </div>
    );
};

export default PKCard;
