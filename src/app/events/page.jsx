import EventsClientView from '@/components/EventsClientView';
import { Suspense } from 'react';

const EventsData = async () => {

  const res = await fetch('http://localhost:5000/events', {
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
    <Suspense fallback={<p>Loading events...</p>}>
      <EventsData />
    </Suspense>
  );
};

export default EventsPage;