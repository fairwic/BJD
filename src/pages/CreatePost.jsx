import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../router/RouteStack';
import { ChevronLeft, Image as ImageIcon, X, Sparkles } from 'lucide-react';

const CreatePost = () => {
    const { pop } = useRouter();
    const { currentUser } = useApp();
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [tags, setTags] = useState('');

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (evt) => {
                setImages(prev => [...prev, evt.target.result]);
            };
            reader.readAsDataURL(file);
        });
    };

    const removeImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const handlePublish = () => {
        if (!content.trim()) {
            alert('请输入内容');
            return;
        }
        // Mock 发布
        alert('发布成功！');
        pop();
    };

    return (
        <div className="min-h-screen bg-white pb-20">
            <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
                <button onClick={pop} className="text-gray-600">取消</button>
                <h1 className="font-bold text-lg">发布动态</h1>
                <button onClick={handlePublish} className="text-rose-500 font-bold">发布</button>
            </div>

            <div className="p-4 space-y-4">
                {/* 用户信息 */}
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${currentUser.avatar}`} />
                    <span className="font-bold text-gray-800">{currentUser.name}</span>
                </div>

                {/* 内容输入 */}
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="分享你的娃娃日常..."
                    rows={8}
                    className="w-full p-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-1 focus:ring-rose-200 resize-none"
                />

                {/* 图片上传 */}
                <div className="grid grid-cols-3 gap-2">
                    {images.map((img, i) => (
                        <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                            <img src={img} alt="" className="w-full h-full object-cover" />
                            <button
                                onClick={() => removeImage(i)}
                                className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                    {images.length < 9 && (
                        <label className="aspect-square border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-rose-300 transition-colors">
                            <ImageIcon size={24} className="text-gray-400" />
                            <span className="text-xs text-gray-400 mt-1">添加图片</span>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </label>
                    )}
                </div>

                {/* 标签 */}
                <div>
                    <label className="block text-sm text-gray-700 mb-2">添加标签</label>
                    <input
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="例如: #BJD #私养图 #三分娃"
                        className="w-full p-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-1 focus:ring-rose-200"
                    />
                </div>

                {/* AI 助手提示 */}
                <div className="bg-gradient-to-r from-rose-100 to-purple-100 rounded-xl p-3 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full shadow-sm text-rose-500">
                        <Sparkles size={20} />
                    </div>
                    <div>
                        <p className="font-bold text-sm text-gray-800">文案没灵感？</p>
                        <p className="text-xs text-gray-600">让 AI 帮你写出神仙文案 ✨</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
