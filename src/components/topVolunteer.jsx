import { Award, HeartHandshake, Sparkles } from 'lucide-react';
import Image from 'next/image';

const TopVolunteer = async () => {

    const response = await fetch('http://localhost:5000/top-volunteers', {
        cache: 'no-store'
    });

    const volunteers = await response.json();

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-12 bg-white dark:bg-[#0F172A] dark:border-slate-800 transition-colors duration-200">
            <div className="max-w-6xl mx-auto space-y-12">

                <div className="text-center space-y-3 max-w-2xl mx-auto">
                    <span className="inline-flex items-center gap-1.5 bg-[#F0FDF4] dark:bg-emerald-950/60 text-[#16A34A] dark:text-[#22C55E] text-xs font-bold px-3.5 py-1 rounded-full border border-emerald-500/20">
                        <Sparkles className="w-3.5 h-3.5" /> Spotlight Heroes
                    </span>

                    <h2 className="text-2xl sm:text-4xl font-extrabold text-[#172B3A] dark:text-[#F1F5F9] tracking-tight">
                        Champions of Community Service
                    </h2>

                    <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#CBD5E1] leading-relaxed">
                        Meet our most dedicated contributors who lead by example, driving relentless positive impact across every social campaign.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {volunteers.map((person, index) => {

                        const name = person.name || 'Kindora Contributor';
                        const image = person.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400';

                        return (
                            <div
                                key={person.email || index}
                                className="bg-[#F8FAFC] dark:bg-[#1E293B] rounded-3xl border border-[#E2E8F0] dark:border-[#334155] p-6 text-center space-y-5 hover:shadow-xl transition-all duration-300 relative group flex flex-col justify-between"
                            >
                                <div className="space-y-4">
                                    <div className="relative w-28 h-28 mx-auto">
                                        <Image
                                            src={image}
                                            alt={name}
                                            fill
                                            sizes="112px"
                                            className="rounded-full object-cover border-4 border-[#16A34A] shadow-md group-hover:scale-105 transition-transform duration-300"
                                        />

                                        <span className="absolute bottom-1 right-1 bg-[#16A34A] text-white p-1.5 rounded-full shadow-lg">
                                            <Award className="w-3.5 h-3.5" />
                                        </span>
                                    </div>

                                    <div className="space-y-1.5">
                                        <h3 className="text-lg font-extrabold text-[#172B3A] dark:text-[#F1F5F9] group-hover:text-[#16A34A] dark:group-hover:text-[#22C55E] transition-colors line-clamp-1">
                                            {name}
                                        </h3>

                                        <span className="inline-block text-[11px] font-bold px-3 py-0.5 rounded-full border bg-white text-[#16A34A] dark:text-[#22C55E] border-emerald-500/30">
                                            {['Community Champion', 'Dedicated Hero', 'Active Volunteer', 'Rising Star'][index]}
                                        </span>
                                    </div>

                                    <p className="text-xs text-[#64748B] dark:text-[#CBD5E1] italic leading-relaxed px-1 line-clamp-2">
                                        {[
                                            'Inspiring others through outstanding dedication to the community.',
                                            'Always ready to help and make a meaningful difference.',
                                            'Actively contributing time and effort to support others.',
                                            'A rising inspiration with a passion for creating positive change.'
                                        ][index]}
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-slate-200 dark:border-slate-700/60 flex items-center justify-center gap-1.5 text-xs text-[#64748B] dark:text-[#CBD5E1]">
                                    <HeartHandshake className="w-4 h-4 text-[#16A34A] dark:text-[#22C55E]" />
                                    <span className="font-bold text-[#172B3A] dark:text-[#F1F5F9]">{person.eventsJoined || 0}</span> Events Participated
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default TopVolunteer;