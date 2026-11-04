
'use client';

import { useState, useEffect } from 'react';
import { Sparkles, MapPin, Calendar, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

const GalleryCard = ({ item }) => {
    const images = Array.isArray(item.image) ? item.image : [item.image];
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevImage = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const nextImage = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="group relative h-[420px] rounded-3xl overflow-hidden border border-[#E2E8F0] dark:border-[#334155] bg-slate-900 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between p-6">

            <Image
                src={images[currentIndex]}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/30 to-black/30 group-hover:via-[#0F172A]/50 transition-colors duration-300" />

            <div className="relative z-10 flex items-center justify-between">
                <span className="text-[11px] font-bold px-3.5 py-1 rounded-full bg-[#16A34A] text-white shadow-md">
                    {item.category || 'Event'}
                </span>

                {images.length > 1 && (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20">
                        <ImageIcon className="w-3.5 h-3.5 text-[#22C55E]" />
                        <span>{currentIndex + 1}/{images.length}</span>
                    </div>
                )}
            </div>

            {images.length > 1 && (
                <div className="relative z-10 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity px-1">
                    <button
                        onClick={prevImage}
                        className="w-9 h-9 rounded-full bg-black/50 hover:bg-[#16A34A] text-white flex items-center justify-center border border-white/20 transition-all"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    <button
                        onClick={nextImage}
                        className="w-9 h-9 rounded-full bg-black/50 hover:bg-[#16A34A] text-white flex items-center justify-center border border-white/20 transition-all"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            )}

            <div className="relative z-10 space-y-3">
                <h3 className="text-xl font-extrabold text-white leading-snug group-hover:text-[#22C55E] transition-colors line-clamp-2">
                    {item.title}
                </h3>

                <div className="pt-3 border-t border-white/20 flex items-center justify-between text-xs text-slate-200 font-medium">
                    <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-[#22C55E]" />
                        <span className="line-clamp-1">{item.location}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-300">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span>{item.date}</span>
                    </div>
                </div>

                {images.length > 1 && (
                    <div className="flex justify-center gap-1.5 pt-1">
                        {images.map((_, idx) => (
                            <span
                                key={idx}
                                className={`h-1.5 rounded-full transition-all ${
                                    idx === currentIndex ? 'w-5 bg-[#22C55E]' : 'w-1.5 bg-white/40'
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const GalleryPage = () => {
    const [galleryItems, setGalleryItems] = useState([]);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const res = await fetch('http://localhost:5000/gallery');
                const data = await res.json();
                setGalleryItems(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchGallery();
    }, []);

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-12 bg-white dark:bg-[#0F172A] border-t border-slate-100 dark:border-slate-800 transition-colors duration-200">
            <div className="max-w-6xl mx-auto space-y-12">

                <div className="text-center space-y-3 max-w-2xl mx-auto">
                    <span className="inline-flex items-center gap-1.5 bg-[#F0FDF4] dark:bg-emerald-950/60 text-[#16A34A] dark:text-[#22C55E] text-xs font-bold px-3.5 py-1 rounded-full border border-emerald-500/20">
                        <Sparkles className="w-3.5 h-3.5" />
                        Visual Showcase
                    </span>

                    <h2 className="text-2xl sm:text-4xl font-extrabold text-[#172B3A] dark:text-[#F1F5F9] tracking-tight">
                        Moments of Impact & Hope
                    </h2>

                    <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#CBD5E1] leading-relaxed">
                        Explore authentic snapshots from our ground initiatives, drive events, and community support stories.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {galleryItems.map((item) => (
                        <GalleryCard key={item._id} item={item} />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default GalleryPage;
