import {
    CalendarDays,
    MapPin,
    Tag,
    CheckCircle2,
    Calendar,
    ArrowRight
} from 'lucide-react';

import Link from 'next/link';
import Image from 'next/image';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { getTokenFromServer } from '@/lib/getTokenFromServer';

const JoinedEventsPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const user = session?.user;

    const token = getTokenFromServer()

    const res = await fetch(`http://localhost:5000/joined-events/${user?.email}`, {
        cache: 'no-store',
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    const joinedEvents = await res.json();

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] py-10 px-4 sm:px-6 lg:px-12 transition-colors duration-200">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header Banner */}
                <div className="bg-white dark:bg-[#1E293B] p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] dark:border-[#334155] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

                    <div className="space-y-1">
                        <span className="inline-flex items-center gap-1.5 bg-[#F0FDF4] dark:bg-emerald-950/60 text-[#16A34A] dark:text-[#22C55E] text-xs font-bold px-3 py-1 rounded-full">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Volunteer Dashboard
                        </span>

                        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172B3A] dark:text-[#F1F5F9] tracking-tight">
                            Joined Community Events
                        </h1>

                        <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#CBD5E1]">
                            Manage and track all the charitable initiatives you've committed to participate in.
                        </p>
                    </div>

                    <div className="bg-[#F0FDF4] dark:bg-emerald-950/40 border border-emerald-500/30 px-5 py-3 rounded-2xl text-center">
                        <p className="text-[10px] uppercase font-bold text-[#16A34A] dark:text-[#22C55E] tracking-wider">
                            Total Joined
                        </p>

                        <p className="text-2xl font-extrabold text-[#172B3A] dark:text-[#F1F5F9]">
                            {joinedEvents?.length || 0}
                        </p>
                    </div>
                </div>

                {/* Events Grid or Empty State */}
                {!joinedEvents || joinedEvents.length === 0 ? (

                    <div className="bg-white dark:bg-[#1E293B] p-12 rounded-3xl border border-[#E2E8F0] dark:border-[#334155] text-center space-y-4 shadow-sm max-w-lg mx-auto my-12">

                        <div className="w-16 h-16 rounded-2xl bg-[#F0FDF4] dark:bg-emerald-950/50 text-[#16A34A] dark:text-[#22C55E] flex items-center justify-center mx-auto">
                            <Calendar className="w-8 h-8" />
                        </div>

                        <h3 className="text-xl font-bold text-[#172B3A] dark:text-[#F1F5F9]">
                            No Joined Events Yet
                        </h3>

                        <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#CBD5E1] leading-relaxed">
                            You haven't signed up for any volunteer drives yet. Explore upcoming charity initiatives and make an impact today!
                        </p>

                        <Link
                            href="/events"
                            className="inline-flex items-center gap-2 bg-[#16A34A] hover:bg-[#15803D] text-white font-bold py-3 px-6 rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-emerald-600/20"
                        >
                            Explore Upcoming Events
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                ) : (

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {joinedEvents.map((event) => (

                            <div
                                key={event._id}
                                className="bg-white dark:bg-[#1E293B] rounded-3xl border border-[#E2E8F0] dark:border-[#334155] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                            >
                                <div>

                                    {/* Cover Image */}
                                    <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">

                                        <Image
                                            src={event.image || 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800'}
                                            alt={event.title || 'Event Image'}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />

                                        <div className="absolute top-4 left-4">
                                            <span className="inline-flex items-center gap-1 bg-[#16A34A] text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow-sm">
                                                <Tag className="w-3 h-3" />
                                                {event.type || 'Drive'}
                                            </span>
                                        </div>

                                        <div className="absolute top-4 right-4">
                                            <span className="inline-flex items-center gap-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-[#16A34A] dark:text-[#22C55E] text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                                                <CheckCircle2 className="w-3 h-3" />
                                                Joined
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Info */}
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

                                        <p className="text-xs text-[#64748B] dark:text-[#CBD5E1] line-clamp-2 leading-relaxed">
                                            {event.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Footer Action */}
                                <div className="p-6 pt-0">

                                    <Link
                                        href={`/events/${event.eventId}`}
                                        className="w-full bg-[#F0FDF4] dark:bg-emerald-950/40 hover:bg-[#16A34A] hover:text-white dark:hover:bg-[#16A34A] text-[#16A34A] dark:text-[#22C55E] font-bold py-2.5 rounded-xl transition-all text-xs flex items-center justify-center gap-2 border border-[#16A34A]/20"
                                    >
                                        View Event Details
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>

                                </div>
                            </div>
                        ))}

                    </div>
                )}

            </div>
        </div>
    );
};

export default JoinedEventsPage;