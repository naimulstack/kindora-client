'use client';

import { useEffect, useState } from 'react';
import { CalendarDays, MapPin, Tag, ArrowRight, History } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const PastEvents = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const response = await fetch('http://localhost:5000/past-events');
            const data = await response.json();
            setEvents(data);
        };

        fetchEvents();
    }, []);

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-12 dark:bg-[#0F172A] transition-colors duration-200">
            <div className="max-w-6xl mx-auto space-y-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-6">
                    <div className="space-y-2 max-w-2xl">
                        <span className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 text-[#64748B] dark:text-[#CBD5E1] text-xs font-bold px-3 py-1 rounded-full border border-slate-300/40">
                            <History className="w-3.5 h-3.5" /> Past Achievements
                        </span>
                        
                        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#172B3A] dark:text-[#F1F5F9] tracking-tight">
                            Completed Community Drives
                        </h2>

                        <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#CBD5E1] leading-relaxed">
                            Take a look at our successfully completed initiatives. Thank you to all the volunteers and donors who made these impactful moments possible!
                        </p>
                    </div>

                    <Link
                        href="/events"
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#16A34A] dark:text-[#22C55E] hover:underline shrink-0"
                    >
                        View All Events <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Events Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <div
                            key={event._id}
                            className="bg-white dark:bg-[#1E293B] rounded-3xl border border-[#E2E8F0] dark:border-[#334155] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                        >
                            <div>
                                {/* Image Container */}
                                <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                                    <Image
                                        src={event.image}
                                        alt={event.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                                    />
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <span className="inline-flex items-center gap-1 bg-[#16A34A] text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow-sm">
                                            <Tag className="w-3 h-3" />
                                            {event.type}
                                        </span>
                                        <span className="inline-flex items-center text-slate-700 bg-white/90 dark:bg-slate-900/90 dark:text-slate-200 text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md">
                                            Completed
                                        </span>
                                    </div>
                                </div>

                                {/* Content Info */}
                                <div className="p-6 space-y-3">
                                    <h3 className="text-lg font-bold text-[#172B3A] dark:text-[#F1F5F9] line-clamp-1 group-hover:text-[#16A34A] dark:group-hover:text-[#22C55E] transition-colors">
                                        {event.title}
                                    </h3>

                                    <div className="space-y-1.5 py-1">
                                        <div className="flex items-center gap-2 text-xs text-[#64748B] dark:text-[#CBD5E1]">
                                            <CalendarDays className="w-4 h-4 text-[#16A34A] dark:text-[#22C55E] shrink-0" />
                                            <span className="font-medium">{event.date}</span>
                                        </div>

                                        <div className="flex items-center gap-2 text-xs text-[#64748B] dark:text-[#CBD5E1]">
                                            <MapPin className="w-4 h-4 text-[#16A34A] dark:text-[#22C55E] shrink-0" />
                                            <span className="truncate">{event.location}</span>
                                        </div>
                                    </div>

                                    <p className="text-xs text-[#64748B] dark:text-[#CBD5E1] line-clamp-2 leading-relaxed pt-1 border-t border-slate-100 dark:border-slate-800">
                                        {event.description}
                                    </p>
                                </div>
                            </div>

                            {/* View Details Action */}
                            <div className="p-6 pt-0">
                                <Link
                                    href={`/events/${event._id}`}
                                    className="w-full bg-[#F0FDF4] dark:bg-emerald-950/40 hover:bg-[#16A34A] hover:text-white dark:hover:bg-[#16A34A] text-[#16A34A] dark:text-[#22C55E] font-bold py-2.5 rounded-xl transition-all text-xs flex items-center justify-center gap-2 border border-[#16A34A]/20"
                                >
                                    View Summary
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default PastEvents;