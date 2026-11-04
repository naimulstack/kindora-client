'use client';

import { useState } from 'react';
import {
  CalendarDays,
  MapPin,
  Tag,
  Search,
  Sparkles,
  ArrowRight,
  Filter,
  Clock
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const EventsClientView = ({ initialEvents = [] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredEvents = initialEvents.filter((event) => {
    const search = searchQuery.toLowerCase();

    const matchesSearch =
      event.title?.toLowerCase().includes(search) ||
      event.location?.toLowerCase().includes(search) ||
      event.description?.toLowerCase().includes(search);

    const matchesCategory =
      selectedCategory === 'All' || event.type === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = [
    'All',
    'Donation',
    'Tree Plantation',
    'Cleanup',
    'Educational Support',
    'Blood Donation',
    'Food Distribution',
    'Medical Camp',
    'Others'
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] py-10 px-4 sm:px-6 lg:px-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-8">

        <div className="bg-gradient-to-r from-[#14532D] via-[#16A34A] to-[#15803D] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Active Campaigns
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Discover & Join Upcoming Events
            </h1>
            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
              Explore local social welfare, cleanup drives, and relief campaigns scheduled for today and upcoming dates.
            </p>
          </div>

          <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        </div>

        <div className="bg-white dark:bg-[#1E293B] p-4 sm:p-6 rounded-2xl border border-[#E2E8F0] dark:border-[#334155] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#64748B] absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, location..."
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-[#111C2E] border border-[#E2E8F0] dark:border-[#334155] focus:border-[#16A34A] rounded-xl text-sm text-[#172B3A] dark:text-[#F1F5F9] focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="relative flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#16A34A]" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="py-2.5 px-4 bg-slate-50 dark:bg-[#111C2E] border border-[#E2E8F0] dark:border-[#334155] focus:border-[#16A34A] rounded-xl text-sm font-medium text-[#172B3A] dark:text-[#F1F5F9] focus:outline-none"
              >
                {categories.map((cat, i) => (
                  <option key={i} value={cat}>
                    {cat === 'All' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="bg-white dark:bg-[#1E293B] rounded-3xl p-12 text-center border border-[#E2E8F0] dark:border-[#334155] shadow-sm space-y-4">
            <div className="w-16 h-16 bg-[#F0FDF4] dark:bg-[#111C2E] rounded-full flex items-center justify-center mx-auto text-[#16A34A]">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#172B3A] dark:text-[#F1F5F9]">
              No Upcoming Events Found
            </h3>
            <p className="text-sm text-[#64748B] dark:text-[#CBD5E1] max-w-md mx-auto">
              Previous events have ended and no future drives match your criteria. Be the first to start a campaign!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div
                key={event._id || event.id}
                className="bg-white dark:bg-[#1E293B] rounded-3xl overflow-hidden border border-[#E2E8F0] dark:border-[#334155] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-52 overflow-hidden bg-slate-100 dark:bg-[#111C2E]">
                  <Image
                    src={event.image || 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800'}
                    alt={event.title}
                    width={800}
                    height={500}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-white/90 dark:bg-[#1E293B]/90 backdrop-blur-md text-[#16A34A] dark:text-[#22C55E] text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                    <Tag className="w-3 h-3" /> {event.type || 'Community'}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#64748B] dark:text-[#CBD5E1]">
                      <span className="flex items-center gap-1 text-[#16A34A] font-semibold bg-[#F0FDF4] dark:bg-[#111C2E] px-2.5 py-1 rounded-md">
                        <CalendarDays className="w-3.5 h-3.5" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1 truncate max-w-[140px]">
                        <MapPin className="w-3.5 h-3.5 text-[#16A34A]" />
                        {event.location}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#172B3A] dark:text-[#F1F5F9] line-clamp-1 group-hover:text-[#16A34A] transition-colors">
                      {event.title}
                    </h3>

                    <p className="text-xs text-[#64748B] dark:text-[#CBD5E1] line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  <Link
                    href={`/events/${event._id}`}
                    className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold py-3 rounded-xl transition-all shadow-md shadow-emerald-600/10 flex items-center justify-center gap-2 text-sm"
                  >
                    View Event Details
                    <ArrowRight className="w-4 h-4" />
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

export default EventsClientView;

