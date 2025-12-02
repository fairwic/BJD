import React from 'react';
import { useRouter } from '../router/RouteStack';
import { ChevronLeft, Image as ImageIcon, Video } from 'lucide-react';

const MyAlbum = () => {
    const { pop, push } = useRouter();

    // Mock Media Data
    const media = [
        { id: 1, type: 'image', url: 'bg-red-100', date: '2023-11-01' },
        { id: 2, type: 'image', url: 'bg-orange-100', date: '2023-11-02' },
        { id: 3, type: 'video', url: 'bg-yellow-100', date: '2023-11-05' },
        { id: 4, type: 'image', url: 'bg-green-100', date: '2023-11-10' },
        { id: 5, type: 'image', url: 'bg-blue-100', date: '2023-11-12' },
        { id: 6, type: 'video', url: 'bg-purple-100', date: '2023-11-15' },
    ];

    return (
        <div className="min-h-screen bg-white">
            <div className="bg-white p-4 sticky top-0 z-10 flex items-center gap-4 border-b border-gray-100">
                <button onClick={pop}><ChevronLeft size={24} /></button>
                <h1 className="font-bold text-lg">我的相册</h1>
            </div>

            <div className="grid grid-cols-3 gap-0.5">
                {media.map(item => (
                    <div key={item.id} className={`aspect-square ${item.url} relative cursor-pointer`}>
                        {item.type === 'video' && (
                            <div className="absolute top-2 right-2 text-white drop-shadow-md">
                                <Video size={16} />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {media.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                    <ImageIcon size={48} className="mb-4 opacity-20" />
                    <p className="text-sm">相册空空如也</p>
                </div>
            )}
        </div>
    );
};

export default MyAlbum;
