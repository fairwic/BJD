import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../router/RouteStack';
import * as XLSX from 'xlsx';
import { Upload, FileSpreadsheet, X, CheckCircle2, AlertCircle, ChevronLeft } from 'lucide-react';

const CreateGroupBuy = () => {
    const { pop, replace } = useRouter();
    const { createGroupBuy } = useApp();

    const [formData, setFormData] = useState({
        title: '',
        price: '',
        deposit: '',
        deadline: '',
        description: '',
    });

    const [skus, setSkus] = useState([]);
    const [importStatus, setImportStatus] = useState(null); // { success: boolean, msg: string }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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

                // Expected format: [{ name: 'White Skin', price: 1500 }, ...]
                // Simple validation
                if (data.length === 0) throw new Error('表格为空');

                const parsedSkus = data.map((row, idx) => ({
                    id: `sku-${Date.now()}-${idx}`,
                    name: row['规格名称'] || row['name'] || `规格 ${idx + 1}`,
                    price: row['价格'] || row['price'] || formData.price || 0
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

    const handleSubmit = () => {
        if (!formData.title || !formData.price || !formData.deposit) {
            alert('请填写必填项');
            return;
        }

        const finalSkus = skus.length > 0 ? skus : [
            { id: `sku-${Date.now()}`, name: '默认规格', price: formData.price }
        ];

        createGroupBuy({
            ...formData,
            skus: finalSkus,
            price: Number(formData.price),
            deposit: Number(formData.deposit)
        });

        replace('Home');
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="bg-white p-4 sticky top-0 z-10 flex items-center gap-4 shadow-sm">
                <button onClick={pop}><ChevronLeft size={24} /></button>
                <h1 className="font-bold text-lg">发起团购</h1>
            </div>

            <div className="p-4 space-y-4">
                {/* Basic Info */}
                <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
                    <h2 className="font-bold text-gray-800 text-sm">基本信息</h2>

                    <div>
                        <label className="block text-xs text-gray-500 mb-1">团购标题 *</label>
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="例如: 【二样征集】鹿神素体"
                            className="w-full p-2 bg-gray-50 rounded-lg text-sm outline-none focus:ring-1 focus:ring-rose-200"
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-xs text-gray-500 mb-1">全款 (¥) *</label>
                            <input
                                name="price"
                                type="number"
                                value={formData.price}
                                onChange={handleInputChange}
                                className="w-full p-2 bg-gray-50 rounded-lg text-sm outline-none focus:ring-1 focus:ring-rose-200"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-xs text-gray-500 mb-1">定金 (¥) *</label>
                            <input
                                name="deposit"
                                type="number"
                                value={formData.deposit}
                                onChange={handleInputChange}
                                className="w-full p-2 bg-gray-50 rounded-lg text-sm outline-none focus:ring-1 focus:ring-rose-200"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs text-gray-500 mb-1">截团时间</label>
                        <input
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleInputChange}
                            placeholder="例如: 2024-05-01"
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

                {/* Excel Import */}
                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="font-bold text-gray-800 text-sm flex items-center gap-2">
                            <FileSpreadsheet size={16} className="text-green-600" />
                            规格导入 (Excel)
                        </h2>
                        <span className="text-[10px] text-gray-400">支持 .xlsx / .xls</span>
                    </div>

                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors relative">
                        <input
                            type="file"
                            accept=".xlsx, .xls"
                            onChange={handleFileUpload}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <Upload size={24} className="mb-2" />
                        <p className="text-xs">点击或拖拽上传 Excel 表格</p>
                        <p className="text-[10px] mt-1">表头需包含: 规格名称, 价格</p>
                    </div>

                    {importStatus && (
                        <div className={`mt-3 p-2 rounded-lg flex items-center gap-2 text-xs ${importStatus.success ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                            {importStatus.success ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                            <span>{importStatus.msg}</span>
                        </div>
                    )}

                    {/* Preview SKUs */}
                    {skus.length > 0 && (
                        <div className="mt-4 space-y-2">
                            <p className="text-xs text-gray-500 font-bold">已解析规格:</p>
                            <div className="max-h-32 overflow-y-auto space-y-1">
                                {skus.map((sku, i) => (
                                    <div key={i} className="flex justify-between text-xs bg-gray-50 p-2 rounded">
                                        <span>{sku.name}</span>
                                        <span>¥{sku.price}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full bg-rose-500 text-white font-bold py-3 rounded-xl hover:bg-rose-600 shadow-md active:scale-95 transition-all"
                >
                    发布团购
                </button>
            </div>
        </div>
    );
};

export default CreateGroupBuy;
