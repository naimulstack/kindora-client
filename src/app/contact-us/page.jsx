'use client';

import { useState } from 'react';
import {
    Sparkles,
    Mail,
    Phone,
    MapPin,
    Send,
    MessageSquare,
    Clock,
    CheckCircle2
} from 'lucide-react';

const contactDetails = [
    {
        icon: Mail,
        title: 'Email Us',
        info: 'support@kindora.org',
        subText: 'We respond within 24 hours'
    },
    {
        icon: Phone,
        title: 'Call Us',
        info: '+880 1700-000000',
        subText: 'Sun-Thu from 9am to 6pm'
    },
    {
        icon: MapPin,
        title: 'Visit Us',
        info: 'Chittagong, Bangladesh',
        subText: 'Main Community Hub'
    }
];

const faqs = [
    {
        q: 'How can I volunteer for an event?',
        a: 'Simply browse our Upcoming Events, select a campaign, and click the "Join Event" button to register.'
    },
    {
        q: 'How are donations and resources managed?',
        a: 'All initiatives are strictly verified by our team, ensuring complete transparency and direct distribution.'
    },
    {
        q: 'Can I host my own charity drive on Kindora?',
        a: 'Yes! Registered users can use the "Create Event" feature to submit campaigns for review.'
    }
];

const ContactPage = () => {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('http://localhost:5000/messages', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        setSubmitted(true);

        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 4000);
    };

    return (
        <div className="bg-white dark:bg-[#0F172A] text-[#172B3A] dark:text-[#F1F5F9] transition-colors duration-200">

            <section className="py-16 px-4 sm:px-6 lg:px-12 border-b border-slate-100 dark:border-slate-800 text-center">
                <div className="max-w-3xl mx-auto space-y-3">
                    <span className="inline-flex items-center gap-1.5 bg-[#F0FDF4] dark:bg-emerald-950/60 text-[#16A34A] dark:text-[#22C55E] text-xs font-bold px-3.5 py-1 rounded-full border border-emerald-500/20">
                        <Sparkles className="w-3.5 h-3.5" />
                        Get in Touch
                    </span>

                    <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                        We’d Love to Hear From You
                    </h1>

                    <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#CBD5E1] leading-relaxed">
                        Have questions about a campaign, feedback, or want to partner with us? Drop us a message and our team will get back to you shortly.
                    </p>
                </div>
            </section>

            <section className="py-16 px-4 sm:px-6 lg:px-12">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">

                    <div className="lg:col-span-5 space-y-8">
                        <div className="space-y-3">
                            <h2 className="text-2xl font-bold tracking-tight">
                                Contact Information
                            </h2>

                            <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#CBD5E1] leading-relaxed">
                                Reach out directly through any of the channels below or fill out the form.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {contactDetails.map((item, idx) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={idx}
                                        className="p-5 rounded-2xl bg-[#F8FAFC] dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 flex items-start gap-4 hover:shadow-md transition-all"
                                    >
                                        <div className="p-3 rounded-xl bg-[#F0FDF4] dark:bg-emerald-950/80 text-[#16A34A] dark:text-[#22C55E] border border-emerald-500/20">
                                            <Icon className="w-5 h-5" />
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-bold text-[#64748B] dark:text-[#CBD5E1]">
                                                {item.title}
                                            </h3>

                                            <p className="text-base font-extrabold">
                                                {item.info}
                                            </p>

                                            <p className="text-xs text-slate-400">
                                                {item.subText}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="p-6 rounded-3xl bg-[#F0FDF4] dark:bg-emerald-950/30 border border-emerald-500/20 space-y-2">
                            <div className="flex items-center gap-2 text-[#16A34A] dark:text-[#22C55E] font-bold text-sm">
                                <Clock className="w-4 h-4" />
                                Support Hours
                            </div>

                            <p className="text-xs text-[#64748B] dark:text-[#CBD5E1] leading-relaxed">
                                Our community support agents are active Monday through Friday to answer your inquiries.
                            </p>
                        </div>
                    </div>

                    <div className="lg:col-span-7">
                        <div className="p-8 sm:p-10 rounded-3xl bg-[#F8FAFC] dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-xl">

                            {submitted ? (
                                <div className="text-center py-12 space-y-4">
                                    <div className="w-16 h-16 rounded-full bg-[#F0FDF4] text-[#16A34A] mx-auto flex items-center justify-center border border-emerald-500/30">
                                        <CheckCircle2 className="w-8 h-8" />
                                    </div>

                                    <h3 className="text-2xl font-bold">
                                        Message Sent!
                                    </h3>

                                    <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#CBD5E1] max-w-sm mx-auto">
                                        Thank you for reaching out. A team member will respond to your email very soon.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">

                                    <div>
                                        <h3 className="text-xl font-bold">
                                            Send a Message
                                        </h3>

                                        <p className="text-xs text-[#64748B] dark:text-[#CBD5E1]">
                                            Fill in the details below and we will get back to you.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold">
                                                Your Name
                                            </label>

                                            <input
                                                type="text"
                                                required
                                                placeholder="John Doe"
                                                value={formData.name}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        name: e.target.value
                                                    })
                                                }
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0F172A] text-sm focus:outline-none focus:border-[#16A34A]"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold">
                                                Your Email
                                            </label>

                                            <input
                                                type="email"
                                                required
                                                placeholder="john@example.com"
                                                value={formData.email}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        email: e.target.value
                                                    })
                                                }
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0F172A] text-sm focus:outline-none focus:border-[#16A34A]"
                                            />
                                        </div>

                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold">
                                            Subject
                                        </label>

                                        <input
                                            type="text"
                                            required
                                            placeholder="Volunteering Inquiry"
                                            value={formData.subject}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    subject: e.target.value
                                                })
                                            }
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0F172A] text-sm focus:outline-none focus:border-[#16A34A]"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold">
                                            Message
                                        </label>

                                        <textarea
                                            rows={5}
                                            required
                                            placeholder="How can we help you?"
                                            value={formData.message}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    message: e.target.value
                                                })
                                            }
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0F172A] text-sm focus:outline-none focus:border-[#16A34A] resize-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-3.5 rounded-xl bg-[#16A34A] hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2"
                                    >
                                        <Send className="w-4 h-4" />
                                        Send Message
                                    </button>

                                </form>
                            )}

                        </div>
                    </div>

                </div>
            </section>

            <section className="py-16 px-4 sm:px-6 lg:px-12 bg-[#F8FAFC] dark:bg-[#1E293B]/40 border-t border-slate-100 dark:border-slate-800">
                <div className="max-w-4xl mx-auto space-y-8">

                    <div className="text-center space-y-2">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#16A34A] dark:text-[#22C55E]">
                            <MessageSquare className="w-3.5 h-3.5" />
                            FAQ
                        </span>

                        <h2 className="text-2xl font-bold">
                            Frequently Asked Questions
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="p-6 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 space-y-2"
                            >
                                <h3 className="text-sm font-bold">
                                    {faq.q}
                                </h3>

                                <p className="text-xs text-[#64748B] dark:text-[#CBD5E1] leading-relaxed">
                                    {faq.a}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

        </div>
    );
};

export default ContactPage;
