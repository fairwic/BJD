import React, { useState } from 'react';
import { useRouter } from '../router/RouteStack';
import { ChevronLeft, Info, HelpCircle, ArrowRightLeft, Palette } from 'lucide-react';

const SkinMatchStudio = () => {
    const { pop } = useRouter();

    // Mock Database of Brands and Skins
    const BRAND_SKINS = {
        'Volks': [
            { id: 'v_white', name: '普白 (White)', hex: '#fdf4f0', desc: '经典的日烧白，带一点点粉' },
            { id: 'v_normal', name: '普肌 (Normal)', hex: '#f8d9c6', desc: '健康的肉色' },
        ],
        'Ringdoll': [
            { id: 'r_white', name: '白肌 (White)', hex: '#fffbf0', desc: '比较冷调的白' },
            { id: 'r_normal', name: '普肌 (Normal)', hex: '#f5d6c2', desc: '偏黄的普肌' },
            { id: 'r_tan', name: '烧肌 (Tan)', hex: '#dcbfa8', desc: '巧克力色' },
        ],
        'DollZone': [
            { id: 'dz_white', name: '白肌', hex: '#fcfcfc', desc: '非常白的冷白' },
            { id: 'dz_pink', name: '粉肌', hex: '#ffebeb', desc: '粉嫩的肤色' },
            { id: 'dz_peach', name: '桃肌', hex: '#f9dcc4', desc: '偏暖的普肌' },
        ],
        'Soom': [
            { id: 's_cw', name: 'Cream White', hex: '#fdfcf5', desc: '奶油白' },
            { id: 's_n', name: 'Normal', hex: '#f7dcc9', desc: '标准的韩普' },
        ]
    };

    const [leftSelection, setLeftSelection] = useState({ brand: 'Volks', skin: BRAND_SKINS['Volks'][0] });
    const [rightSelection, setRightSelection] = useState({ brand: 'Ringdoll', skin: BRAND_SKINS['Ringdoll'][0] });

    const SelectionPanel = ({ side, selection, setSelection }) => (
        <div className="flex-1 flex flex-col h-full bg-white p-4">
            <h3 className="text-center font-bold text-gray-500 text-sm mb-4">{side === 'left' ? '本家/娃头' : '配身/娃体'}</h3>

            {/* Brand Select */}
            <div className="mb-4">
                <label className="block text-xs font-bold text-gray-400 mb-1">选择品牌</label>
                <select
                    value={selection.brand}
                    onChange={(e) => setSelection({ brand: e.target.value, skin: BRAND_SKINS[e.target.value][0] })}
                    className="w-full p-2 bg-gray-50 rounded-lg text-sm font-bold text-gray-800 outline-none border border-transparent focus:border-rose-200"
                >
                    {Object.keys(BRAND_SKINS).map(b => <option key={b} value={b}>{b}</option>)}
                </select>
            </div>

            {/* Skin Select */}
            <div className="mb-6">
                <label className="block text-xs font-bold text-gray-400 mb-1">选择肤色</label>
                <div className="space-y-2">
                    {BRAND_SKINS[selection.brand].map(s => (
                        <button
                            key={s.id}
                            onClick={() => setSelection({ ...selection, skin: s })}
                            className={`w-full flex items-center gap-3 p-2 rounded-lg border transition-all ${selection.skin.id === s.id
                                    ? 'border-rose-500 bg-rose-50 shadow-sm'
                                    : 'border-gray-100 hover:bg-gray-50'
                                }`}
                        >
                            <div className="w-8 h-8 rounded-full shadow-inner border border-black/5" style={{ backgroundColor: s.hex }} />
                            <div className="text-left">
                                <div className="font-bold text-xs text-gray-800">{s.name}</div>
                                <div className="text-[10px] text-gray-400">{s.desc}</div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Visual Preview */}
            <div className="mt-auto aspect-square rounded-2xl shadow-inner border border-gray-100 relative overflow-hidden" style={{ backgroundColor: selection.skin.hex }}>
                <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3">
                    <p className="font-bold text-gray-800 text-lg opacity-50">{selection.brand}</p>
                    <p className="font-mono text-xs text-gray-500 opacity-50">{selection.skin.name}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Header */}
            <div className="bg-white p-4 sticky top-0 z-10 flex items-center justify-between shadow-sm">
                <button onClick={pop}><ChevronLeft size={24} /></button>
                <h1 className="font-bold text-lg flex items-center gap-2">
                    <Palette size={20} className="text-rose-500" />
                    肤色比对室
                </h1>
                <ActionTooltip />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col md:flex-row gap-0.5 bg-gray-200 overflow-hidden relative">
                <SelectionPanel side="left" selection={leftSelection} setSelection={setLeftSelection} />

                {/* Visual Seam */}
                <div className="h-0.5 md:h-auto md:w-0.5 bg-gray-300 z-10 flex items-center justify-center">
                    <div className="bg-white rounded-full p-2 shadow-lg border border-gray-100 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                        <ArrowRightLeft size={16} className="text-gray-400" />
                    </div>
                </div>

                <SelectionPanel side="right" selection={rightSelection} setSelection={setRightSelection} />
            </div>

            {/* Comparison Result */}
            <div className="bg-white p-6 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-20">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-gray-800">比对结果分析</h3>
                    <MatchScore left={leftSelection} right={rightSelection} />
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                    {getMatchAnalysis(leftSelection, rightSelection)}
                </p>
            </div>
        </div>
    );
};

// Helper Components
const ActionTooltip = () => (
    <button className="text-gray-400 hover:text-gray-600">
        <HelpCircle size={24} />
    </button>
);

const MatchScore = ({ left, right }) => {
    // Simple mock logic for match score
    let score = 0;
    let label = '';
    let color = '';

    if (left.skin.hex === right.skin.hex) {
        score = 100; label = '完美契合'; color = 'text-green-500';
    } else if (left.skin.id.includes('white') && right.skin.id.includes('white')) {
        score = 85; label = '色差较小'; color = 'text-green-600';
    } else if (left.skin.id.includes('normal') && right.skin.id.includes('normal')) {
        score = 80; label = '色差较小'; color = 'text-green-600';
    } else {
        score = 40; label = '色差明显'; color = 'text-orange-500';
    }

    return (
        <div className="flex items-center gap-2">
            <span className={`font-bold ${color}`}>{label}</span>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-500">匹配度 {score}%</span>
        </div>
    );
};

const getMatchAnalysis = (left, right) => {
    if (left.skin.hex === right.skin.hex) return '两种肤色完全一致，可以放心混合搭配。';
    if (left.skin.id.includes('white') && right.skin.id.includes('white')) return '两者虽然都是白肌，但色调略有差异。' + left.skin.desc + ' vs ' + right.skin.desc + '。正常光线下肉眼可见轻微色差，但拍照后期可修。';
    if (left.skin.id.includes('white') && right.skin.id.includes('normal')) return '肤色跨度较大，不建议直接搭配。会出现明显的"断层"现象。';
    return '建议参考更多买家返图，或购买试色卡进行实物比对。';
};

export default SkinMatchStudio;
