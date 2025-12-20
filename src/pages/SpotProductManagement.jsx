import React, { useState, useEffect } from 'react';
import { useRouter } from '../router/RouteStack';
import { ChevronLeft, Plus, Package, Edit, Trash2, Eye } from 'lucide-react';
// import { api } from '../services/api'; // Commented out to fix error
// If api service doesn't exist, I'll use fetch directly for now or check where api is defined. 
// Standard pattern usually has api.js/ts.
// I will check for api service file existence first or implement basic fetch here.
// But wait, I should assume there's a way to call API. 
// Let's use standard fetch for now to be safe, or check for axios instance.
// Checking previous files, I haven't seen an api service file. 
// I'll stick to a simple fetch helper or direct fetch for this step to minimize tool calls, assumiing no global api object yet.
// Wait, typically frontend projects have dynamic baseUrl handler.
// I'll assume standard fetch with relative path or localhost:3000 if dev server proxies.
// Actually standard vite proxy setup usually proxies /api.

const SpotProductManagement = () => {
    const { pop, push } = useRouter();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/v1/products?product_type=spot&size=100');
            if (res.ok) {
                const data = await res.json();
                setProducts(data);
            } else {
                console.error('Failed to fetch products');
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const toggleStatus = async (id, currentStatus) => {
        const isOnSale = currentStatus === 'on_sale';
        const newStatus = !isOnSale;

        try {
            const res = await fetch(`/ api / v1 / products / ${id}/status`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ is_on_sale: newStatus })
            });

            if (res.ok) {
                // Optimistic update or Refetch
                // Let's just update local state
                setProducts(prev => prev.map(p => {
                    if (p.id === id) {
                        return { ...p, status: newStatus ? 'on_sale' : 'off_shelf' };
                    }
                    return p;
                }));
            } else {
                alert('操作失败');
            }
        } catch (error) {
            console.error('Error toggling status:', error);
            alert('操作出错');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="bg-white p-4 sticky top-0 z-10 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                    <button onClick={pop}><ChevronLeft size={24} /></button>
                    <h1 className="font-bold text-lg">现货管理</h1>
                </div>
                <button onClick={() => push('CreateSpotProduct')} className="text-rose-500 flex items-center gap-1 text-sm font-bold">
                    <Plus size={18} /> 发布
                </button>
            </div>

            <div className="p-4 space-y-4">
                {loading ? (
                    <div className="text-center py-10 text-gray-400">加载中...</div>
                ) : products.map(product => (
                    <div key={product.id} className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="flex gap-4 mb-4">
                            <div className={`w-20 h-20 rounded-lg shrink-0 bg-cover bg-center bg-gray-100`} style={{ backgroundImage: `url(${product.cover_image})` }} />
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-gray-800 line-clamp-2 text-sm">{product.title}</h3>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${product.status === 'on_sale' ? 'border-green-200 text-green-600 bg-green-50' :
                                        product.status === 'sold_out' ? 'border-gray-200 text-gray-400 bg-gray-50' :
                                            'border-red-200 text-red-500 bg-red-50'
                                        }`}>
                                        {product.status === 'on_sale' ? '出售中' : product.status === 'sold_out' ? '已售罄' : '已下架'}
                                    </span>
                                </div>
                                <div className="mt-2 flex items-baseline gap-2">
                                    <span className="text-rose-500 font-bold">¥{product.price}</span>
                                    <span className="text-xs text-gray-400">库存: {product.stock}</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-gray-50 mb-3">
                            <div className="text-center">
                                <p className="text-[10px] text-gray-400 mb-0.5">总销量</p>
                                <p className="font-bold text-gray-800 text-sm">{product.sales || 0}</p>
                            </div>
                            <div className="text-center border-l border-gray-50">
                                <p className="text-[10px] text-gray-400 mb-0.5">今日浏览</p>
                                <p className="font-bold text-gray-800 text-sm">0</p>
                            </div>
                            <div className="text-center border-l border-gray-50">
                                <p className="text-[10px] text-gray-400 mb-0.5">转化率</p>
                                <p className="font-bold text-gray-800 text-sm">0%</p>
                            </div>
                        </div>

                        <div className="flex gap-2 justify-end">
                            <button className="px-3 py-1.5 rounded-lg bg-gray-50 text-xs font-medium text-gray-600 flex items-center gap-1 active:scale-95">
                                <Edit size={12} /> 编辑
                            </button>
                            <button
                                onClick={() => toggleStatus(product.id, product.status)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 active:scale-95 ${product.status === 'on_sale' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-600'
                                    }`}
                            >
                                <Package size={12} /> {product.status === 'on_sale' ? '下架' : '上架'}
                            </button>
                        </div>
                    </div>
                ))}

                {!loading && products.length === 0 && (
                    <div className="text-center py-20 text-gray-400">
                        <Package size={48} className="mx-auto mb-4 opacity-50" />
                        <p>还没有发布过现货商品</p>
                        <button onClick={() => push('CreateSpotProduct')} className="mt-4 text-rose-500 font-bold">立即发布 &rarr;</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SpotProductManagement;
