import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * 可复用轮播图组件
 * @param {Array} items - 轮播项数组，每项需包含 id, title, subtitle, gradient, badge, image? 
 * @param {boolean} autoPlay - 是否自动播放，默认 true
 * @param {number} interval - 自动播放间隔(ms)，默认 3000
 * @param {function} onItemClick - 点击轮播项回调，参数为当前项
 */
const Carousel = ({
    items = [],
    autoPlay = true,
    interval = 3000,
    onItemClick
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    // 最小滑动距离
    const minSwipeDistance = 50;

    // 切换到下一张
    const goToNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
    }, [items.length]);

    // 切换到上一张
    const goToPrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    }, [items.length]);

    // 跳转到指定索引
    const goToIndex = (index) => {
        setCurrentIndex(index);
    };

    // 自动播放
    useEffect(() => {
        if (!autoPlay || items.length <= 1) return;

        const timer = setInterval(goToNext, interval);
        return () => clearInterval(timer);
    }, [autoPlay, interval, goToNext, items.length]);

    // 触屏滑动处理
    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            goToNext();
        } else if (isRightSwipe) {
            goToPrev();
        }
    };

    // 点击处理
    const handleClick = () => {
        if (onItemClick && items[currentIndex]) {
            onItemClick(items[currentIndex]);
        }
    };

    if (items.length === 0) {
        return null;
    }

    const currentItem = items[currentIndex];

    return (
        <div className="relative w-full">
            {/* 轮播内容区域 */}
            <div
                className={`relative overflow-hidden rounded-2xl h-40 cursor-pointer transition-all duration-300`}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                onClick={handleClick}
            >
                {/* 背景层 */}
                <div
                    className={`absolute inset-0 bg-gradient-to-r ${currentItem.gradient} transition-all duration-500`}
                >
                    {/* 背景图片（如果有） */}
                    {currentItem.image && (
                        <img
                            src={currentItem.image}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover opacity-30"
                        />
                    )}

                    {/* 装饰元素 */}
                    <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-xl" />
                    <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-black/10 rounded-full blur-lg" />
                </div>

                {/* 内容层 */}
                <div className="relative z-10 p-5 h-full flex flex-col justify-center text-white">
                    {/* 角标 */}
                    {currentItem.badge && (
                        <div className="bg-white/20 backdrop-blur-sm w-fit px-2.5 py-1 rounded-full text-[10px] font-bold mb-2 border border-white/30">
                            {currentItem.badge}
                        </div>
                    )}

                    {/* 标题 */}
                    <h2 className="text-xl font-bold mb-1 drop-shadow-sm">
                        {currentItem.title}
                    </h2>

                    {/* 副标题 */}
                    <p className="text-white/80 text-sm line-clamp-1">
                        {currentItem.subtitle}
                    </p>
                </div>

                {/* 指示器 */}
                {items.length > 1 && (
                    <div className="absolute bottom-3 right-4 flex gap-1.5 z-20">
                        {items.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    goToIndex(idx);
                                }}
                                className={`transition-all duration-200 rounded-full ${idx === currentIndex
                                        ? 'w-4 h-1.5 bg-white'
                                        : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/70'
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Carousel;
