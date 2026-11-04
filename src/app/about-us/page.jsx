import { Sparkles, HeartHandshake, Target, Globe, ShieldCheck, Users, Users2, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const stats = [
    { label: 'Community Volunteers', value: '850+' },
    { label: 'Events Organized', value: '220+' },
    { label: 'Lives Impacted', value: '9000+' },
    { label: 'Districts Reached', value: '25+' }
];

const values = [
    {
        icon: Target,
        title: 'Action-Driven Impact',
        desc: 'We focus on tangible, real-world solutions that directly support underserved communities and social causes.'
    },
    {
        icon: ShieldCheck,
        title: 'Complete Transparency',
        desc: 'Every campaign, volunteer effort, and resource allocation is tracked with utmost integrity and open verification.'
    },
    {
        icon: HeartHandshake,
        title: 'Compassionate Unity',
        desc: 'Connecting passionate changemakers with local drives to foster a warm, supportive network across the nation.'
    }
];

const AboutPage = () => {
    return (
        <div className="bg-white dark:bg-[#0F172A] text-[#172B3A] dark:text-[#F1F5F9] transition-colors duration-200">
            
            {/* Hero Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-12 overflow-hidden border-b border-slate-100 dark:border-slate-800">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    
                    <div className="space-y-6 text-center lg:text-left">
                        <span className="inline-flex items-center gap-1.5 bg-[#F0FDF4] dark:bg-emerald-950/60 text-[#16A34A] dark:text-[#22C55E] text-xs font-bold px-3.5 py-1 rounded-full border border-emerald-500/20">
                            <Sparkles className="w-3.5 h-3.5" /> About Kindora
                        </span>

                        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                            Empowering Hearts, <br />
                            <span className="text-[#16A34A] dark:text-[#22C55E]">Transforming Communities.</span>
                        </h1>

                        <p className="text-sm sm:text-base text-[#64748B] dark:text-[#CBD5E1] leading-relaxed max-w-xl mx-auto lg:mx-0">
                            Kindora is a unified charity platform built to bridge the gap between passionate volunteers and meaningful social campaigns. We bring transparency, efficiency, and heart to community service.
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
                            <a
                                href="#mission"
                                className="inline-flex items-center gap-2 bg-[#16A34A] hover:bg-emerald-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all shadow-md shadow-emerald-600/20"
                            >
                                Learn Our Mission <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    <div className="relative h-[360px] sm:h-[420px] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl">
                        <Image
                            src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1000"
                            alt="Volunteers working together"
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </section>

            {/* Impact Numbers */}
            <section className="py-12 bg-[#F8FAFC] dark:bg-[#1E293B]/50 border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                        {stats.map((stat, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-100 dark:border-slate-800 shadow-sm space-y-1">
                                <h3 className="text-2xl sm:text-4xl font-extrabold text-[#16A34A] dark:text-[#22C55E]">
                                    {stat.value}
                                </h3>
                                <p className="text-xs sm:text-sm font-medium text-[#64748B] dark:text-[#CBD5E1]">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section id="mission" className="py-20 px-4 sm:px-6 lg:px-12 border-b border-slate-100 dark:border-slate-800">
                <div className="max-w-6xl mx-auto space-y-16">
                    
                    <div className="text-center space-y-3 max-w-2xl mx-auto">
                        <span className="inline-flex items-center gap-1.5 bg-[#F0FDF4] dark:bg-emerald-950/60 text-[#16A34A] dark:text-[#22C55E] text-xs font-bold px-3.5 py-1 rounded-full border border-emerald-500/20">
                            <Globe className="w-3.5 h-3.5" /> Our Purpose
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                            Driven by Kindness and Purpose
                        </h2>
                        <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#CBD5E1] leading-relaxed">
                            We believe that every small effort, when pooled together, creates waves of sustainable development and positive change.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((item, idx) => {
                            const IconComponent = item.icon;
                            return (
                                <div
                                    key={idx}
                                    className="p-8 rounded-3xl bg-[#F8FAFC] dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 space-y-4 hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-[#F0FDF4] dark:bg-emerald-950/80 text-[#16A34A] dark:text-[#22C55E] flex items-center justify-center border border-emerald-500/20">
                                        <IconComponent className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold">{item.title}</h3>
                                    <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#CBD5E1] leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </section>

            {/* Join Us*/}
            <section className="py-20 px-4 sm:px-6 lg:px-12 bg-[#F0FDF4] dark:bg-emerald-950/30 text-center">
                <div className="max-w-3xl mx-auto space-y-6">
                    <div className="w-16 h-16 rounded-full bg-[#16A34A] text-white mx-auto flex items-center justify-center shadow-lg shadow-emerald-600/30">
                        <Users2 className="w-8 h-8" />
                    </div>
                    
                    <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                        Ready to Make a Difference Today?
                    </h2>

                    <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#CBD5E1] leading-relaxed max-w-xl mx-auto">
                        Whether you want to organize a campaign, contribute resources, or volunteer on the ground, Kindora provides the tools to get started.
                    </p>

                    <div className="pt-2">
                        <a
                            href="/events"
                            className="inline-flex items-center gap-2 bg-[#16A34A] hover:bg-emerald-700 text-white font-bold text-sm px-8 py-3.5 rounded-xl transition-all shadow-md shadow-emerald-600/20"
                        >
                            Explore Campaigns
                        </a>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default AboutPage;