'use client';
import { useState } from 'react';
import {
    ArrowLeft,
    Sparkles,
    Tag,
    Calendar,
    MapPin,
    Image as ImageIcon,
    FileText,
    Mail,
    PlusCircle,
    Eye,
    CheckCircle2,
    Clock
} from 'lucide-react';

const CreateEventPage = ({ onBack, user }) => {
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [formData, setFormData] = useState({
        title: '',
        type: 'Donation',
        date: getTodayDate(),
        location: '',
        image: '',
        description: '',
        organizerEmail: user?.email || 'mypit@mailinator.com'
    });

    const photoPresets = [
        { label: 'Winter Clothes', url: 'https://plus.unsplash.com/premium_photo-1661964021703-59bbdcdbfdab?auto=format&fit=crop&q=80&w=800' },
        { label: 'Cleanup', url: 'https://plus.unsplash.com/premium_photo-1681483802191-5d56c2bd4695?auto=format&fit=crop&q=80&w=800' },
        { label: 'Tree Plantation', url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800' },
        { label: 'Food Distribution', url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800' },
        { label: 'Medical Camp', url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800' }
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePresetClick = (url) => {
        setFormData({ ...formData, image: url });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Event Created:", formData);
        try {
            const response = await fetch('http://localhost:5000/create-event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            console.log("Server Response:", result);
        } catch (err) {
            console.error("Submission failed:", err);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] py-8 px-4 sm:px-6 lg:px-12 transition-colors duration-200">
            <div className="max-w-7xl mx-auto space-y-6">
                
                {/* Navigation & Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0] dark:border-[#334155]">
                    <div>
                        <button
                            onClick={onBack}
                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#16A34A] dark:text-[#22C55E] hover:underline mb-2"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
                        </button>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172B3A] dark:text-[#F1F5F9] flex items-center gap-3">
                            Host a Community Drive <Sparkles className="w-6 h-6 text-[#16A34A]" />
                        </h1>
                    </div>

                    <div className="flex items-center gap-2 bg-[#F0FDF4] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] px-4 py-2 rounded-2xl">
                        <Mail className="w-4 h-4 text-[#16A34A]" />
                        <div className="text-xs">
                            <p className="text-[#64748B] dark:text-[#CBD5E1]">Organizing as</p>
                            <p className="font-bold text-[#172B3A] dark:text-[#F1F5F9]">{formData.organizerEmail}</p>
                        </div>
                    </div>
                </div>

                {/* Two-Column Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Column: Input Form */}
                    <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
                        
                        {/* Step 1: Core Details */}
                        <div className="bg-white dark:bg-[#1E293B] p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] dark:border-[#334155] shadow-sm space-y-5">
                            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                                <span className="w-7 h-7 rounded-full bg-[#16A34A] text-white flex items-center justify-center text-xs font-bold">1</span>
                                <h2 className="text-lg font-bold text-[#172B3A] dark:text-[#F1F5F9]">Event Details</h2>
                            </div>

                            {/* Title */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-[#172B3A] dark:text-[#F1F5F9] mb-2">
                                    Event Title <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <FileText className="w-4 h-4 text-[#64748B] absolute left-4 top-3.5" />
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="e.g. Winter Clothes Distribution – Mirpur 10"
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-[#111C2E] border border-[#E2E8F0] dark:border-[#334155] focus:border-[#16A34A] dark:focus:border-[#22C55E] rounded-xl text-sm text-[#172B3A] dark:text-[#F1F5F9] focus:outline-none transition-colors"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Type & Date */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-[#172B3A] dark:text-[#F1F5F9] mb-2">
                                        Event Category <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Tag className="w-4 h-4 text-[#64748B] absolute left-4 top-3.5" />
                                        <select
                                            name="type"
                                            value={formData.type}
                                            onChange={handleChange}
                                            className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-[#111C2E] border border-[#E2E8F0] dark:border-[#334155] focus:border-[#16A34A] rounded-xl text-sm text-[#172B3A] dark:text-[#F1F5F9] focus:outline-none"
                                        >
                                            <option value="Donation">Donation</option>
                                            <option value="Tree Plantation">Tree Plantation</option>
                                            <option value="Cleanup">Community Cleanup</option>
                                            <option value="Educational Support">Educational Support</option>
                                            <option value="Blood Donation">Blood Donation</option>
                                            <option value="Food Distribution">Food Distribution</option>
                                            <option value="Medical Camp">Medical Camp</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-[#172B3A] dark:text-[#F1F5F9] mb-2 flex items-center justify-between">
                                        <span>Event Date <span className="text-red-500">*</span></span>
                                        <span className="text-[10px] lowercase text-[#16A34A] dark:text-[#22C55E] bg-[#F0FDF4] dark:bg-emerald-950/50 px-2 py-0.5 rounded-md font-semibold">default: today</span>
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#16A34A]">
                                            <Calendar className="w-4 h-4" />
                                        </div>
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            min={getTodayDate()}
                                            onChange={handleChange}
                                            className="w-full pl-11 pr-4 py-3 bg-[#F0FDF4]/50 dark:bg-[#111C2E] border-2 border-emerald-500/30 hover:border-[#16A34A] focus:border-[#16A34A] rounded-xl text-sm font-medium text-[#172B3A] dark:text-[#F1F5F9] focus:outline-none transition-all shadow-sm cursor-pointer"
                                            required
                                        />
                                    </div>
                                    <p className="text-[11px] text-[#64748B] dark:text-[#CBD5E1] mt-1 flex items-center gap-1">
                                        <Clock className="w-3 h-3 text-[#16A34A]" /> Must be scheduled for today or later.
                                    </p>
                                </div>
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-[#172B3A] dark:text-[#F1F5F9] mb-2">
                                    Venue / Location <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <MapPin className="w-4 h-4 text-[#64748B] absolute left-4 top-3.5" />
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="e.g. Mohammadpur Town Hall, Dhaka"
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-[#111C2E] border border-[#E2E8F0] dark:border-[#334155] focus:border-[#16A34A] rounded-xl text-sm text-[#172B3A] dark:text-[#F1F5F9] focus:outline-none"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Step 2: Media & Description */}
                        <div className="bg-white dark:bg-[#1E293B] p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] dark:border-[#334155] shadow-sm space-y-5">
                            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                                <span className="w-7 h-7 rounded-full bg-[#16A34A] text-white flex items-center justify-center text-xs font-bold">2</span>
                                <h2 className="text-lg font-bold text-[#172B3A] dark:text-[#F1F5F9]">Media & Overview</h2>
                            </div>

                            {/* Image Input */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-[#172B3A] dark:text-[#F1F5F9] mb-2">
                                    Cover Photo URL <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <ImageIcon className="w-4 h-4 text-[#64748B] absolute left-4 top-3.5" />
                                    <input
                                        type="url"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleChange}
                                        placeholder="https://images.unsplash.com/photo-..."
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-[#111C2E] border border-[#E2E8F0] dark:border-[#334155] focus:border-[#16A34A] rounded-xl text-sm text-[#172B3A] dark:text-[#F1F5F9] focus:outline-none"
                                        required
                                    />
                                </div>

                                {/* Chips Presets */}
                                <div className="flex flex-wrap items-center gap-1.5 mt-3">
                                    <span className="text-xs text-[#64748B] dark:text-[#CBD5E1] mr-1">Quick Select:</span>
                                    {photoPresets.map((preset, idx) => (
                                        <button
                                            key={idx}
                                            type="button"
                                            onClick={() => handlePresetClick(preset.url)}
                                            className="px-2.5 py-1 text-xs rounded-full bg-[#F0FDF4] dark:bg-[#111C2E] border border-[#16A34A]/30 text-[#16A34A] dark:text-[#22C55E] hover:bg-[#16A34A] hover:text-white transition-all"
                                        >
                                            {preset.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-[#172B3A] dark:text-[#F1F5F9] mb-2">
                                    Event Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="description"
                                    rows="4"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Outline volunteer requirements, goals, items distributed..."
                                    className="w-full p-4 bg-slate-50 dark:bg-[#111C2E] border border-[#E2E8F0] dark:border-[#334155] focus:border-[#16A34A] rounded-xl text-sm text-[#172B3A] dark:text-[#F1F5F9] focus:outline-none"
                                    required
                                ></textarea>
                            </div>
                        </div>

                        {/* Action Submit */}
                        <button
                            type="submit"
                            className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 text-base"
                        >
                            <PlusCircle className="w-5 h-5" /> Launch Community Drive
                        </button>

                    </form>

                    {/* Right Column: Live Interactive Preview Card */}
                    <div className="lg:col-span-5 sticky top-24 space-y-4">
                        <div className="flex items-center justify-between px-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#64748B] dark:text-[#CBD5E1] flex items-center gap-1.5">
                                <Eye className="w-4 h-4 text-[#16A34A]" /> Live Card Preview
                            </span>
                            <span className="text-xs text-[#16A34A] dark:text-[#22C55E] bg-[#F0FDF4] dark:bg-[#1E293B] px-2.5 py-0.5 rounded-full font-medium">
                                Auto-updating
                            </span>
                        </div>

                        {/* Card Widget */}
                        <div className="bg-white dark:bg-[#1E293B] rounded-3xl overflow-hidden border border-[#E2E8F0] dark:border-[#334155] shadow-lg transition-all">
                            <div className="relative h-48 bg-slate-100 dark:bg-[#111C2E] flex items-center justify-center overflow-hidden">
                                {formData.image ? (
                                    <img
                                        src={formData.image}
                                        alt="Event Preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="text-center text-[#94A3B8] p-4">
                                        <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                        <p className="text-xs">Provide a photo URL or click a preset</p>
                                    </div>
                                )}
                                <span className="absolute top-4 left-4 bg-white/90 dark:bg-[#1E293B]/90 backdrop-blur-sm text-[#16A34A] dark:text-[#22C55E] text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                    {formData.type || 'Donation'}
                                </span>
                            </div>

                            <div className="p-6 space-y-4">
                                <div className="flex items-center gap-4 text-xs text-[#64748B] dark:text-[#CBD5E1]">
                                    <span className="flex items-center gap-1 text-[#16A34A] font-semibold">
                                        <Calendar className="w-3.5 h-3.5" /> 
                                        {formData.date}
                                    </span>
                                    <span className="flex items-center gap-1 truncate max-w-[150px]">
                                        <MapPin className="w-3.5 h-3.5 text-[#16A34A]" /> 
                                        {formData.location || 'Location venue'}
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-[#172B3A] dark:text-[#F1F5F9] line-clamp-1">
                                    {formData.title || 'Your Event Title Will Appear Here'}
                                </h3>

                                <p className="text-xs text-[#64748B] dark:text-[#CBD5E1] line-clamp-3 leading-relaxed">
                                    {formData.description || 'Provide a detailed description of your social drive so community members know how to participate.'}
                                </p>

                                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                                    <span className="text-[#64748B]">Status: <strong className="text-[#16A34A]">Drafting</strong></span>
                                    <span className="text-[#16A34A] font-semibold flex items-center gap-1">
                                        <CheckCircle2 className="w-3.5 h-3.5" /> Ready to publish
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default CreateEventPage;