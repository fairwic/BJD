import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../router/RouteStack';
import { ChevronLeft, Image as ImageIcon, X, Sparkles, Swords, ChevronsLeftRight, Layout } from 'lucide-react';

const CreatePost = () => {
    const { pop, currentRoute } = useRouter();
    const { currentUser } = useApp();
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    
    // Post Type State: 'standard' | 'pk' | 'compare'
    const [postType, setPostType] = useState('standard'); 
    
    // Check for initial tags from navigation params
    const initialTags = currentRoute?.params?.initialTags || '';
    const [tags, setTags] = useState(initialTags);

    // PK Mode State
    const [pkData, setPkData] = useState({ leftImg: null, rightImg: null, leftLabel: '', rightLabel: '' });
    
    // Compare Mode State
    const [compareData, setCompareData] = useState({ beforeImg: null, afterImg: null });

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
    
    const handleSpecificUpload = (e, type, field) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (evt) => {
            if (type === 'pk') {
                setPkData(prev => ({ ...prev, [field]: evt.target.result }));
            } else if (type === 'compare') {
                setCompareData(prev => ({ ...prev, [field]: evt.target.result }));
            }
        };
        reader.readAsDataURL(file);
    };

    const removeImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const handlePublish = () => {
        if (!content.trim()) {
            alert('请输入内容');
            return;
        }
        
        let publishData = { type: postType, content, tags, user: currentUser };
        
        if (postType === 'pk') {
            if (!pkData.leftImg || !pkData.rightImg || !pkData.leftLabel || !pkData.rightLabel) {
                 alert('请补全PK信息');
                 return;
            }
            publishData = { ...publishData, ...pkData };
        } else if (postType === 'compare') {
             if (!compareData.beforeImg || !compareData.afterImg) {
                 alert('请上传对比图');
                 return;
            }
            publishData = { ...publishData, ...compareData };
        } else {
             publishData.images = images;
        }

        console.log('Publishing:', publishData);
        alert('发布成功！');
        pop();
    };

    const ImageUploader = ({ label, image, onChange, height = "h-32" }) => (
        <label className={`relative block w-full ${height} bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-rose-300 transition-colors overflow-hidden`}>
            {image ? (
                <img src={image} alt="" className="w-full h-full object-cover" />
            ) : (
                <>
                    <ImageIcon size={24} className="text-gray-300 mb-1" />
                    <span className="text-xs text-gray-400 font-medium">{label}</span>
                </>
            )}
            <input type="file" accept="image/*" onChange={onChange} className="hidden" />
        </label>
    );

    return (
        <div className="min-h-screen bg-white pb-20">
            <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
                <button onClick={pop} className="text-gray-600">取消</button>
                <h1 className="font-bold text-lg">发布动态</h1>
                <button onClick={handlePublish} className="text-rose-500 font-bold">发布</button>
            </div>

            <div className="p-4 space-y-6">
                {/* Type Selector */}
                <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button 
                        onClick={() => setPostType('standard')}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-sm font-bold transition-all ${postType === 'standard' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
                    >
                        <Layout size={16} /> 普通
                    </button>
                    <button 
                         onClick={() => setPostType('pk')}
                         className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-sm font-bold transition-all ${postType === 'pk' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
                    >
                        <Swords size={16} /> 大PK
                    </button>
                    <button 
                         onClick={() => setPostType('compare')}
                         className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-sm font-bold transition-all ${postType === 'compare' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
                    >
                        <ChevronsLeftRight size={16} /> 对比
                    </button>
                </div>

                {/* Common Content Input */}
                <div className="flex gap-3">
                     <div className={`w-10 h-10 rounded-full ${currentUser.avatar} flex-shrink-0`} />
                     <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={postType === 'pk' ? "描述一下PK的内容..." : postType === 'compare' ? "分享一下改造前后的心得..." : "分享你的娃娃日常..."}
                        rows={4}
                        className="w-full bg-transparent text-sm outline-none resize-none placeholder:text-gray-400"
                    />
                </div>

                {/* Conditional Inputs */}
                {postType === 'standard' && (
                    <div className="grid grid-cols-3 gap-2 animate-in fade-in slide-in-from-bottom-2">
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
                )}

                {postType === 'pk' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                        <div className="flex gap-3">
                            <div className="flex-1 space-y-2">
                                <span className="text-xs font-bold text-gray-500 ml-1">红方 (Left)</span>
                                <ImageUploader 
                                    label="上传选项A" 
                                    image={pkData.leftImg} 
                                    onChange={(e) => handleSpecificUpload(e, 'pk', 'leftImg')} 
                                    height="h-40"
                                />
                                <input 
                                    placeholder="选项描述 (如:粉色)"
                                    value={pkData.leftLabel}
                                    onChange={(e) => setPkData(prev => ({...prev, leftLabel: e.target.value}))}
                                    className="w-full bg-gray-50 px-3 py-2 rounded-lg text-xs font-bold text-center outline-none focus:ring-1 focus:ring-rose-200"
                                />
                            </div>
                             <div className="flex items-center justify-center pt-8">
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-rose-500 font-black italic">VS</div>
                             </div>
                            <div className="flex-1 space-y-2">
                                <span className="text-xs font-bold text-gray-500 ml-1">蓝方 (Right)</span>
                                <ImageUploader 
                                    label="上传选项B" 
                                    image={pkData.rightImg} 
                                    onChange={(e) => handleSpecificUpload(e, 'pk', 'rightImg')} 
                                    height="h-40"
                                />
                                <input 
                                    placeholder="选项描述 (如:紫色)"
                                    value={pkData.rightLabel}
                                    onChange={(e) => setPkData(prev => ({...prev, rightLabel: e.target.value}))}
                                    className="w-full bg-gray-50 px-3 py-2 rounded-lg text-xs font-bold text-center outline-none focus:ring-1 focus:ring-rose-200"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {postType === 'compare' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                         <div className="grid grid-cols-2 gap-3">
                             <div className="space-y-2">
                                <span className="text-xs font-bold text-gray-500 ml-1">改造前 (Before)</span>
                                <ImageUploader 
                                    label="上传Before图" 
                                    image={compareData.beforeImg} 
                                    onChange={(e) => handleSpecificUpload(e, 'compare', 'beforeImg')} 
                                />
                             </div>
                             <div className="space-y-2">
                                <span className="text-xs font-bold text-gray-500 ml-1">改造后 (After)</span>
                                <ImageUploader 
                                    label="上传After图" 
                                    image={compareData.afterImg} 
                                    onChange={(e) => handleSpecificUpload(e, 'compare', 'afterImg')} 
                                />
                             </div>
                         </div>
                         <div className="flex items-center gap-2 bg-amber-50 text-amber-600 p-3 rounded-xl text-xs">
                             <Sparkles size={16} />
                             <span>发布后将自动生成可拖拽的对比效果图</span>
                         </div>
                    </div>
                )}

                {/* Common Tags Input */}
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
