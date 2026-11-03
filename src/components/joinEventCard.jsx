"use client";

import { authClient } from '@/lib/auth-client';
import {
  UserCheck,
  Users,
} from 'lucide-react';

const JoinEventCard = ({ eventData }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleJoinEvent = async (e) => {
    e.preventDefault();

    const data = {
      ...eventData
    }
    const res = await fetch("http://localhost:5000/joinevent", {
      method:'POST',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify(data)
    })

    const joinEventData = await res.json()

    console.log(joinEventData, "joindata")
  }


  return (
    <div className="lg:col-span-5 sticky top-24">
      <div className="bg-white dark:bg-[#1E293B] p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] dark:border-[#334155] shadow-xl space-y-6">

        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-sm text-[#64748B] dark:text-[#CBD5E1]">
            <Users className="w-4 h-4 text-[#16A34A]" />
            <span>Participating Volunteers</span>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-[#172B3A] dark:text-[#F1F5F9]">Ready to Make an Impact?</h3>
          <p className="text-xs text-[#64748B] dark:text-[#CBD5E1]">
            Confirm your participation to receive event updates, venue guidelines, and coordinate directly with the organizer.
          </p>
        </div>

        <button onClick={handleJoinEvent} className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 text-base">
          <UserCheck className="w-5 h-5" /> Join This Event
        </button>

        <div className="text-center pt-2">
          <p className="text-[11px] text-[#94A3B8]">
            By joining, you agree to Kindora community volunteering code of conduct.
          </p>
        </div>

      </div>
    </div>
  );
};

export default JoinEventCard;