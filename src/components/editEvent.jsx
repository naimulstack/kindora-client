'use client';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { useState } from 'react';
import {
    Tag,
    Calendar,
    MapPin,
    Image as ImageIcon,
    FileText,
    PlusCircle,
    Clock
} from 'lucide-react';

const EditEventPage = ({ eventData }) => {
    console.log("EditEventPage received event:", eventData);
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [formData, setFormData] = useState({
        title: eventData?.title || '',
        type: eventData?.type,
        date: eventData?.date
            ? new Date(eventData.date).toISOString().split('T')[0]
            : getTodayDate(),
        location: eventData?.location || '',
        image: eventData?.image || '',
        description: eventData?.description || '',
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
        console.log("Event Edited:", formData);
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
        <Dialog>
            <DialogTrigger
                render={
                    <button className="p-2.5 rounded-2xl bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] text-[#64748B] hover:text-[#16A34A] transition-all">
                        <Pencil className="w-4 h-4" />
                    </button>
                }
            />
            <DialogContent className="w-[95vw] max-h-[90vh] overflow-y-auto bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-3xl p-6 sm:p-10 shadow-2xl max-w-7xl min-w-2xl">
                <DialogHeader className="space-y-2 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <DialogTitle className="text-2xl font-extrabold text-[#172B3A] dark:text-[#F1F5F9]">
                        Edit Event
                    </DialogTitle>
                    <DialogDescription className="text-xs sm:text-sm text-[#64748B] dark:text-[#CBD5E1]">
                        Update your community event details and make sure everything is accurate.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 pt-4">

                    {/* Core Details Section */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#16A34A] dark:text-[#22C55E]">
                            1. Event Details
                        </h3>

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
                                        className="w-full pl-11 pr-4 py-3 bg-[#F0FDF4]/50 dark:bg-[#111C2E] border border-emerald-500/30 hover:border-[#16A34A] focus:border-[#16A34A] rounded-xl text-sm font-medium text-[#172B3A] dark:text-[#F1F5F9] focus:outline-none transition-all shadow-sm cursor-pointer"
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

                    {/* Media & Description Section */}
                    <div className="space-y-4 pt-2">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#16A34A] dark:text-[#22C55E]">
                            2. Media & Overview
                        </h3>

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
                                rows="3"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Outline volunteer requirements, goals, items distributed..."
                                className="w-full p-4 bg-slate-50 dark:bg-[#111C2E] border border-[#E2E8F0] dark:border-[#334155] focus:border-[#16A34A] rounded-xl text-sm text-[#172B3A] dark:text-[#F1F5F9] focus:outline-none resize-none"
                                required
                            ></textarea>
                        </div>
                    </div>

                    {/* Action Submit */}
                    <button
                        type="submit"
                        className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 text-sm sm:text-base mt-4"
                    >
                        <PlusCircle className="w-5 h-5" /> Save Changes
                    </button>

                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditEventPage;