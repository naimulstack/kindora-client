import { ArrowRight, Users, HeartHandshake } from 'lucide-react';
import Image from 'next/image';

const BannerPage = ({ isLoggedIn }) => {
    return (
        <section className="bg-[#F0FDF4] dark:bg-[#0B132B] py-16 lg:py-24 transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Column */}
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#1E293B] border border-emerald-200 dark:border-emerald-900/50 text-[#16A34A] dark:text-[#22C55E] text-xs font-semibold uppercase tracking-wider shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse"></span>
                            Together for a Better Tomorrow
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#14532D] dark:text-[#F1F5F9] leading-tight tracking-tight">
                            Small Acts, <span className="text-[#16A34A] dark:text-[#22C55E]">Big Changes.</span> Let's Build a Better World Together.
                        </h1>

                        <p className="text-base sm:text-lg text-[#64748B] dark:text-[#CBD5E1] max-w-xl leading-relaxed">
                            Kindora connects passionate volunteers with local community initiatives. Discover, create, and join events that transform neighborhoods and touch lives.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <a
                                href="#upcoming-events"
                                className="inline-flex items-center justify-center gap-2 bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold px-6 py-3.5 rounded-xl transition-all shadow-md shadow-emerald-600/20"
                            >
                                Explore Upcoming Events <ArrowRight className="w-4 h-4" />
                            </a>

                            <a
                                href={isLoggedIn ? "#create-event" : "#login"}
                                className="inline-flex items-center justify-center bg-white dark:bg-[#1E293B] text-[#16A34A] dark:text-[#22C55E] border-2 border-[#16A34A] dark:border-[#22C55E] hover:bg-emerald-50 dark:hover:bg-[#334155] font-semibold px-6 py-3.5 rounded-xl transition-all"
                            >
                                Create An Event
                            </a>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="relative">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-[#1E293B]">

                            <Image
                                src="https://images.unsplash.com/photo-1710093072228-8c3129f27357?auto=format&fit=crop&q=80&w=1200"
                                alt="Volunteers distributing aid"
                                width={1200}
                                height={480}
                                className="w-full h-[400px] sm:h-[480px] object-cover"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                        </div>

                        {/* Floating Card 1 */}
                        <div className="absolute -bottom-6 -left-6 bg-white dark:bg-[#1E293B] p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 flex items-center gap-3.5 hidden sm:flex">
                            <div className="p-3 bg-emerald-100 dark:bg-emerald-950/50 text-[#16A34A] rounded-xl">
                                <Users className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs text-[#64748B] dark:text-[#CBD5E1] font-medium">Active Volunteers</p>
                                <p className="text-lg font-bold text-[#172B3A] dark:text-[#F1F5F9]">12,400+</p>
                            </div>
                        </div>

                        {/* Floating Card 2 */}
                        <div className="absolute -top-6 -right-6 bg-white dark:bg-[#1E293B] p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 flex items-center gap-3.5 hidden sm:flex">
                            <div className="p-3 bg-amber-100 dark:bg-amber-950/50 text-[#F59E0B] rounded-xl">
                                <HeartHandshake className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs text-[#64748B] dark:text-[#CBD5E1] font-medium">Impact Made</p>
                                <p className="text-lg font-bold text-[#172B3A] dark:text-[#F1F5F9]">850+ Events</p>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default BannerPage;