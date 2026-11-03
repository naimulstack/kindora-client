// "use client";
import EditEventPage from '@/components/editEvent';
import DeleteEventPage from '@/components/deleteEvent';

import {
  CalendarDays,
  MapPin,
  Tag,
  Mail,
  Share2,
  Heart,
  ShieldCheck,
} from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';
import JoinEventCard from '@/components/joinEventCard';

const EventDetailPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/events/${id}`);
  const eventData = await res.json();

  if (!res.ok || !eventData || eventData.message === "Event not found") {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] flex items-center justify-center px-4 py-10">
        <div className="max-w-md w-full bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-3xl p-8 text-center shadow-xl">
          <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-red-50 dark:bg-red-950/40 flex items-center justify-center">
            <ShieldCheck className="w-10 h-10 text-red-500" />
          </div>

          <h2 className="text-2xl font-extrabold text-[#172B3A] dark:text-white mb-3">
            Event Not Found!
          </h2>

          <p className="text-sm text-[#64748B] dark:text-[#CBD5E1] mb-7">
            Sorry, the event you are looking for does not exist or is no longer available.
          </p>

          <Link
            href="/events"
            className="inline-flex items-center justify-center w-full bg-[#16A34A] hover:bg-[#15803D] text-white font-bold py-3 rounded-xl transition-all shadow-md"
          >
            Go to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] py-10 px-4 sm:px-6 lg:px-12 transition-colors duration-200">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Actions Top Bar */}

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">

              <EditEventPage eventData={eventData} />
              <DeleteEventPage eventId={eventData} />

            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2.5 rounded-2xl bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] text-[#64748B] hover:text-red-500 transition-all">
              <Heart className="w-4 h-4" />
            </button>

            <button className="p-2.5 rounded-2xl bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] text-[#64748B] hover:text-[#16A34A] transition-all">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hero Cover Image */}
        <div className="relative h-72 sm:h-96 rounded-3xl overflow-hidden shadow-xl border border-[#E2E8F0] dark:border-[#334155] bg-slate-100 dark:bg-[#111C2E]">
          <Image
            src={eventData?.image || 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1200'}
            alt={eventData?.title || 'Event Cover'}
            width={1200}
            height={800}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

          <div className="absolute bottom-6 left-6 right-6">
            <span className="inline-flex items-center gap-1.5 bg-[#16A34A] text-white text-xs font-semibold px-3.5 py-1 rounded-full shadow-sm mb-2">
              <Tag className="w-3.5 h-3.5" /> {eventData?.type || 'Community Drive'}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {eventData?.title}
            </h1>
          </div>
        </div>

        {/* Grid Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Main Content */}
          <div className="lg:col-span-7 space-y-6">

            {/* Quick Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-[#1E293B] p-5 rounded-2xl border border-[#E2E8F0] dark:border-[#334155] shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#F0FDF4] dark:bg-emerald-950/60 text-[#16A34A] flex items-center justify-center shrink-0">
                  <CalendarDays className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-[#64748B] dark:text-[#CBD5E1] font-medium">Event Date</p>
                  <p className="text-sm font-bold text-[#172B3A] dark:text-[#F1F5F9]">{eventData?.date}</p>
                </div>
              </div>

              <div className="bg-white dark:bg-[#1E293B] p-5 rounded-2xl border border-[#E2E8F0] dark:border-[#334155] shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#F0FDF4] dark:bg-emerald-950/60 text-[#16A34A] flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-[#64748B] dark:text-[#CBD5E1] font-medium">Location Venue</p>
                  <p className="text-sm font-bold text-[#172B3A] dark:text-[#F1F5F9] truncate max-w-[180px]">{eventData?.location}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white dark:bg-[#1E293B] p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] dark:border-[#334155] shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-[#172B3A] dark:text-[#F1F5F9]">About This Drive</h2>
              <p className="text-sm sm:text-base text-[#64748B] dark:text-[#CBD5E1] leading-relaxed whitespace-pre-line">
                {eventData?.description}
              </p>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3 text-xs text-[#64748B]">
                <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                <span>Verified community initiative regulated under Kindora safety standards.</span>
              </div>
            </div>

            {/* Organizer Info */}
            <div className="bg-white dark:bg-[#1E293B] p-6 rounded-3xl border border-[#E2E8F0] dark:border-[#334155] shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-lg font-bold text-[#16A34A]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-[#64748B]">Organized By</p>
                  <p className="text-sm font-bold text-[#172B3A] dark:text-[#F1F5F9]">{eventData?.organizerEmail || 'Kindora Volunteer Team'}</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-[#F0FDF4] dark:bg-emerald-950/50 text-[#16A34A] text-xs font-semibold rounded-full">
                Host
              </span>
            </div>

          </div>

          {/* Sidebar */}
          <JoinEventCard eventData={eventData} />
        </div>

      </div>
    </div>
  );
};

export default EventDetailPage;