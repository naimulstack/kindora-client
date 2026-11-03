'use client';

import { authClient } from '@/lib/auth-client';
import EditEventPage from '@/components/editEvent';
import DeleteEventPage from '@/components/deleteEvent';

const EventOwnerActions = ({ eventData }) => {
    const { data: session, isPending } = authClient.useSession();

    const isOwner =
        session?.user?.email &&
        eventData?.organizerEmail &&
        session.user.email.toLowerCase().trim() === eventData.organizerEmail.toLowerCase().trim();

    if (isPending || !isOwner) return null;

    return (
        <div className="flex items-center gap-3">
            <EditEventPage eventData={eventData} />
            <DeleteEventPage eventId={eventData?._id} />
        </div>
    );
};

export default EventOwnerActions;