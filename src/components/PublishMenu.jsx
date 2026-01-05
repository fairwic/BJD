
import React, { useEffect, useState } from 'react';
import { X, ShoppingBag, Search, RefreshCw, Palette } from 'lucide-react';
import { useRouter } from '../router/RouteStack';

const PublishMenu = ({ onClose }) => {
    const { push } = useRouter();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    const handleNavigate = (route) => {
        setIsVisible(false);
        setTimeout(() => {
            onClose();
            push(route);
        }, 300);
    };

    const MENU_ITEMS = [
        { 
            id: 'sell', 
            label: '我要卖', 
            sub: 'Sell', 
            icon: <ShoppingBag size={28} className="text-white" />,
            color: 'bg-gradient-to-br from-rose-400 to-orange-400',
            route: 'CreateSaleListing'
        },
        { 
            id: 'barter', 
            label: '我要换', 
            sub: 'Swap', 
            icon: <RefreshCw size={28} className="text-white" />,
            color: 'bg-gradient-to-br from-purple-400 to-fuchsia-500',
            route: 'CreateBarterListing'
        },
        { 
            id: 'commission', 
            label: '找劳斯/接单', 
            sub: 'Service', 
            icon: <Palette size={28} className="text-white" />,
            color: 'bg-gradient-to-br from-teal-400 to-cyan-500',
            route: 'CreateCommissionListing'
        }
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-end justify-center">
            {/* Backdrop */}
            <div 
                className={`absolute inset-0 bg-white/90 backdrop-blur-md transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                onClick={handleClose}
            ></div>

            {/* Menu Content */}
            <div className={`relative z-10 w-full max-w-md pb-12 px-6 transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                
                {/* Close Button */}
                <button 
                    onClick={handleClose}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:rotate-90 transition-all duration-300 shadow-sm"
                >
                    <X size={24} />
                </button>

                <div className="grid grid-cols-3 gap-4 mb-24">
                    {MENU_ITEMS.map((item, index) => (
                        <button
                            key={item.id}
                            onClick={() => handleNavigate(item.route)}
                            className={`flex flex-col items-center gap-3 group transition-transform duration-300 hover:-translate-y-2`}
                            style={{ transitionDelay: `${index * 50}ms` }}
                        >
                            <div className={`w-16 h-16 rounded-3xl ${item.color} shadow-lg flex items-center justify-center transform transition-transform group-active:scale-95`}>
                                {item.icon}
                            </div>
                            <div className="text-center">
                                <span className="block text-sm font-bold text-gray-800">{item.label}</span>
                                <span className="block text-[10px] font-medium text-gray-400 uppercase font-outfit">{item.sub}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PublishMenu;
