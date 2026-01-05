import React, { useState } from 'react';
import { useRouter } from '../router/RouteStack';
import * as XLSX from 'xlsx';
import { Upload, FileSpreadsheet, X, CheckCircle2, AlertCircle, ChevronLeft, Image as ImageIcon, Trash2 } from 'lucide-react';

const CreateSpotProduct = () => {
    const { pop, replace } = useRouter();

    const [formData, setFormData] = useState({
        title: '',
        price: '',
        category: '整娃',
        brand: '',
        description: '',
    });

    const [images, setImages] = useState([]);
    const [skus, setSkus] = useState([]);
    const [importStatus, setImportStatus] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        // Mock image upload: create object URLs
        const newImages = files.map(file => ({
            id: Date.now() + Math.random(),
            url: URL.createObjectURL(file), // In real app, upload to server
            file
        }));

        setImages(prev => [...prev, ...newImages]);
    };

    const removeImage = (id) => {
        setImages(prev => prev.filter(img => img.id !== id));
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (evt) => {
            try {
                const bstr = evt.target.result;
                const wb = XLSX.read(bstr, { type: 'binary' });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws);

                if (data.length === 0) throw new Error('表格为空');

                const parsedSkus = data.map((row, idx) => ({
                    id: `sku-${Date.now()}-${idx}`,
                    name: row['规格名称'] || row['name'] || `规格 ${idx + 1}`,
                    price: row['价格'] || row['price'] || formData.price || 0,
                    stock: row['库存'] || row['stock'] || 99
                }));

                setSkus(parsedSkus);
                setImportStatus({ success: true, msg: `成功导入 ${parsedSkus.length} 个规格` });
            } catch (error) {
                console.error(error);
                setImportStatus({ success: false, msg: '解析失败，请检查表格格式' });
            }
        };
        reader.readAsBinaryString(file);
    };

    const handleAddSku = () => {
        setSkus(prev => [...prev, {
            id: `sku-manual-${Date.now()}`,
            name: '',
            price: formData.price || 0,
            stock: 99
        }]);
    };

    const updateSku = (id, field, value) => {
        setSkus(prev => prev.map(sku => sku.id === id ? { ...sku, [field]: value } : sku));
    };

    const removeSku = (id) => {
        setSkus(prev => prev.filter(sku => sku.id !== id));
    };

    const handleSubmit = () => {
        if (!formData.title || !formData.price) {
            alert('请填写必填项');
            return;
        }

        // Mock API call
        console.log('Publishing Product:', { ...formData, images, skus });
        alert('发布成功！');
        replace('Home');
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="bg-white p-4 sticky top-0 z-10 flex items-center gap-4 shadow-sm">
                <button onClick={pop}><ChevronLeft size={24} /></button>
                <h1 className="font-bold text-lg">发布现货</h1>
            </div>

            <div className="p-4 space-y-4">
                {/* Basic Info */}
                <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
                    <h2 className="font-bold text-gray-800 text-sm">基本信息</h2>

                    <div>
                        <label className="block text-xs text-gray-500 mb-1">商品标题 *</label>
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="例如: 【现货】Gem of Doll 1/4 星期三"
                            className="w-full p-2 bg-gray-50 rounded-lg text-sm outline-none focus:ring-1 focus:ring-rose-200"
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-xs text-gray-500 mb-1">价格 (¥) *</label>
                            <input
                                name="price"
                                type="number"
                                value={formData.price}
                                onChange={handleInputChange}
                                className="w-full p-2 bg-gray-50 rounded-lg text-sm outline-none focus:ring-1 focus:ring-rose-200"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-xs text-gray-500 mb-1">分类</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="w-full p-2 bg-gray-50 rounded-lg text-sm outline-none focus:ring-1 focus:ring-rose-200"
                            >
                                <option>整娃</option>
                                <option>素体</option>
                                <option>娃头</option>
                                <option>娃衣</option>
                                <option>假发</option>
                                <option>眼珠</option>
                                <option>配件</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs text-gray-500 mb-1">品牌/娃社</label>
                        <input
                            name="brand"
                            value={formData.brand}
                            onChange={handleInputChange}
                            placeholder="例如: AS, DZ, 龙魂"
                            className="w-full p-2 bg-gray-50 rounded-lg text-sm outline-none focus:ring-1 focus:ring-rose-200"
                        />
                    </div>

                    <div>
                        <label className="block text-xs text-gray-500 mb-1">详细描述</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full p-2 bg-gray-50 rounded-lg text-sm outline-none focus:ring-1 focus:ring-rose-200"
                        />
                    </div>
                </div>

                {/* Image Upload */}
                <div className="bg-white p-4 rounded-xl shadow-sm space-y-3">
                    <h2 className="font-bold text-gray-800 text-sm flex justify-between">
                        <span>商品图片</span>
                        <span className="text-xs text-gray-400">{images.length}/9</span>
                    </h2>

                    <div className="grid grid-cols-4 gap-2">
                        {images.map((img, idx) => (
                            <div key={img.id} className="aspect-square bg-gray-100 rounded-lg relative overflow-hidden group">
                                <img src={img.url} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                                <button
                                    onClick={() => removeImage(img.id)}
                                    className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X size={12} />
                                </button>
                                {idx === 0 && <span className="absolute bottom-0 left-0 right-0 bg-rose-500/80 text-white text-[10px] text-center">主图</span>}
                            </div>
                        ))}

                        {images.length < 9 && (
                            <label className="aspect-square bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-100">
                                <ImageIcon size={20} />
                                <span className="text-[10px] mt-1">添加</span>
                                <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                            </label>
                        )}
                    </div>
                </div>

                {/* Specs/SKU */}
                <div className="bg-white p-4 rounded-xl shadow-sm space-y-3">
                    <div className="flex justify-between items-center">
                        <h2 className="font-bold text-gray-800 text-sm">规格库存</h2>
                        <button onClick={handleAddSku} className="text-xs text-rose-500 font-bold border border-rose-200 px-2 py-1 rounded-lg">
                            + 添加规格
                        </button>
                    </div>

                    <div className="space-y-2">
                        {skus.map((sku, index) => (
                            <div key={sku.id} className="flex gap-2 items-center">
                                <input
                                    placeholder="规格名称"
                                    value={sku.name}
                                    onChange={(e) => updateSku(sku.id, 'name', e.target.value)}
                                    className="flex-1 p-2 bg-gray-50 rounded-lg text-xs outline-none"
                                />
                                <input
                                    type="number"
                                    placeholder="价格"
                                    value={sku.price}
                                    onChange={(e) => updateSku(sku.id, 'price', e.target.value)}
                                    className="w-20 p-2 bg-gray-50 rounded-lg text-xs outline-none"
                                />
                                <input
                                    type="number"
                                    placeholder="库存"
                                    value={sku.stock}
                                    onChange={(e) => updateSku(sku.id, 'stock', e.target.value)}
                                    className="w-16 p-2 bg-gray-50 rounded-lg text-xs outline-none"
                                />
                                <button onClick={() => removeSku(sku.id)} className="text-gray-400 hover:text-red-500">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Excel Import Fallback/Alternative */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                            <span>或从Excel批量导入</span>
                            {importStatus && (
                                <span className={`flex items-center gap-1 ${importStatus.success ? 'text-green-600' : 'text-red-600'}`}>
                                    {importStatus.success ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                                    {importStatus.msg}
                                </span>
                            )}
                        </div>
                        <label className="flex items-center justify-center gap-2 w-full p-2 border border-dashed border-gray-300 rounded-lg text-xs text-gray-600 cursor-pointer hover:bg-gray-50">
                            <FileSpreadsheet size={16} />
                            上传表格自动识别
                            <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} className="hidden" />
                        </label>
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full bg-rose-500 text-white font-bold py-3 rounded-xl hover:bg-rose-600 shadow-md active:scale-95 transition-all"
                >
                    立即发布现货
                </button>
            </div>
        </div>
    );
};

export default CreateSpotProduct;
