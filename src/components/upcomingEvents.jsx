'use client';

import { useEffect, useState } from 'react';
import { CalendarDays, MapPin, Tag, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const UpcomingEvents = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:5000/homepage-event');
                const data = await response.json();
                setEvents(data);
            } catch (err) {
                console.error("Failed to fetch events:", err);
            }
        };

        fetchEvents();
    }, []);

    return (
        <section className="py-12 px-4 sm:px-6 lg:px-12 bg-[#F8FAFC] dark:bg-[#0F172A] transition-colors duration-200">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <span className="inline-flex items-center gap-1.5 bg-[#F0FDF4] dark:bg-emerald-950/60 text-[#16A34A] dark:text-[#22C55E] text-xs font-bold px-3 py-1 rounded-full">
                            <Sparkles className="w-3.5 h-3.5" /> Make an Impact
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172B3A] dark:text-[#F1F5F9] tracking-tight">
                            Upcoming Events
                        </h2>
                    </div>

                    <Link
                        href="/events"
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#16A34A] dark:text-[#22C55E] hover:underline"
                    >
                        View All Events <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Grid */}
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
                                        src={event.image || 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800'}
                                        alt={event.title}
                                        width={800}
                                        height={500}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="inline-flex items-center gap-1 bg-[#16A34A] text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow-sm">
                                            <Tag className="w-3 h-3" />
                                            {event.type || 'Drive'}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 space-y-4">
                                    <h3 className="text-lg font-bold text-[#172B3A] dark:text-[#F1F5F9] line-clamp-1 group-hover:text-[#16A34A] dark:group-hover:text-[#22C55E] transition-colors">
                                        {event.title}
                                    </h3>

                                    <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                                        <div className="flex items-center gap-2.5 text-xs text-[#64748B] dark:text-[#CBD5E1]">
                                            <CalendarDays className="w-4 h-4 text-[#16A34A] dark:text-[#22C55E] shrink-0" />
                                            <span className="font-medium">{event.date}</span>
                                        </div>

                                        <div className="flex items-center gap-2.5 text-xs text-[#64748B] dark:text-[#CBD5E1]">
                                            <MapPin className="w-4 h-4 text-[#16A34A] dark:text-[#22C55E] shrink-0" />
                                            <span className="truncate">{event.location}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* View Details Action */}
                            <div className="p-6 pt-0">
                                <Link
                                    href={`/events/${event._id}`}
                                    className="w-full bg-[#F0FDF4] dark:bg-emerald-950/40 hover:bg-[#16A34A] hover:text-white dark:hover:bg-[#16A34A] text-[#16A34A] dark:text-[#22C55E] font-bold py-2.5 rounded-xl transition-all text-xs flex items-center justify-center gap-2 border border-[#16A34A]/20"
                                >
                                    View Details
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

export default UpcomingEvents;