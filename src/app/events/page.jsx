import EventsClientView from '@/components/EventsClientView';
import { Suspense } from 'react';

const EventsData = async () => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`, {
    cache: 'no-store'
  });

  const data = await res.json();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = (Array.isArray(data) ? data : [])
    .filter((event) => {
      if (!event.date) return false;

      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);

      return eventDate >= today;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return <EventsClientView initialEvents={upcomingEvents} />;
};

const EventsPage = () => {
    return (
        <Suspense
            fallback={
                <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                    <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />

                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Loading events...
                    </p>
                </div>
            }
        >
            <EventsData />
        </Suspense>
    );
};

export default EventsPage;