import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { useRouter } from "../router/RouteStack";
import {
  ChevronLeft,
  Image as ImageIcon,
  X,
  DollarSign,
  Clock,
  Tag,
} from "lucide-react";

const CATEGORIES = [
  { id: "makeup", label: "妆面" },
  { id: "maintenance", label: "保养" },
  { id: "modification", label: "改娃" },
  { id: "costume", label: "服饰" },
  { id: "props", label: "道具" },
];

const CreateRequirement = () => {
  const { pop, currentRoute } = useRouter();
  const { createRequirement } = useApp();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  const [images, setImages] = useState([]);

  // Handle Initial Data
  useEffect(() => {
    if (currentRoute.params?.initialData) {
      const data = currentRoute.params.initialData;
      if (data.title) setTitle(data.title);
      if (data.description) setDesc(data.description);
      if (data.category) setCategory(data.category);
    }
  }, [currentRoute.params]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (evt) => {
        setImages((prev) => [...prev, evt.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePublish = () => {
    if (!title.trim()) {
      alert("请输入需求标题");
      return;
    }
    if (!category) {
      alert("请选择分类");
      return;
    }

    createRequirement({
      title,
      desc,
      category,
      price: budget ? (budget.startsWith("¥") ? budget : `¥${budget}`) : "面议",
      tags: [
        { text: CATEGORIES.find((c) => c.id === category)?.label },
        ...(isUrgent ? [{ text: "加急", type: "urgent" }] : []),
      ],
      images,
    });

    pop();
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <button onClick={pop} className="text-gray-600">
          取消
        </button>
        <h1 className="font-bold text-lg text-gray-800">发布需求</h1>
        <button
          onClick={handlePublish}
          className="bg-rose-500 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-sm active:bg-rose-600 transition-colors"
        >
          发布
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* 标题 */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="一句话描述你的需求（例如：求一个三分男娃古风妆）"
            className="w-full text-lg font-bold placeholder-gray-400 outline-none"
          />
        </div>

        {/* 分类 */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
            <Tag size={16} /> 需求分类
          </h3>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  category === cat.id
                    ? "bg-rose-500 text-white shadow-md shadow-rose-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 预算和加急 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <DollarSign size={16} /> 预算范围
            </h3>
            <input
              type="text"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="如: 200-300"
              className="w-full bg-gray-50 px-3 py-2 rounded-lg text-sm outline-none focus:ring-1 focus:ring-rose-200"
            />
          </div>
          <div
            className={`p-4 rounded-xl shadow-sm border-2 transition-all cursor-pointer flex flex-col justify-center ${
              isUrgent
                ? "bg-rose-50 border-rose-500"
                : "bg-white border-transparent"
            }`}
            onClick={() => setIsUrgent(!isUrgent)}
          >
            <div className="flex items-center justify-between">
              <span
                className={`text-sm font-medium flex items-center gap-2 ${isUrgent ? "text-rose-600" : "text-gray-700"}`}
              >
                <Clock size={16} /> 加急处理
              </span>
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center ${isUrgent ? "bg-rose-500 border-rose-500" : "border-gray-300"}`}
              >
                {isUrgent && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
            </div>
            <p
              className={`text-xs mt-1 ${isUrgent ? "text-rose-400" : "text-gray-400"}`}
            >
              {isUrgent ? "高亮展示，优先接单" : "普通需求，按序展示"}
            </p>
          </div>
        </div>

        {/* 详细描述 */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="详细描述你的需求，例如风格参考、妆面要求、工期限制等..."
            rows={6}
            className="w-full text-sm text-gray-700 placeholder-gray-400 outline-none resize-none"
          />

          {/* 图片上传 */}
          <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-gray-100">
            {images.map((img, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-lg overflow-hidden bg-gray-100"
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
                <button
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
            {images.length < 8 && (
              <label className="aspect-square border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-rose-300 transition-colors bg-gray-50">
                <ImageIcon size={20} className="text-gray-400" />
                <span className="text-[10px] text-gray-400 mt-1">上传参考</span>
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
        </div>

        {/* 底部提示 */}
        <p className="text-xs text-center text-gray-400 px-4">
          发布即代表同意《需求发布规范》，请勿发布违规内容。
        </p>
      </div>
    </div>
  );
};

export default CreateRequirement;
