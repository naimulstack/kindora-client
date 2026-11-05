
"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { UserCheck, LogOut, Loader2 } from "lucide-react";

const JoinEventCard = ({ eventData }) => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [isJoined, setIsJoined] = useState(false);
    const [checking, setChecking] = useState(true);
    const [loading, setLoading] = useState(false);

    const isExpired =
        new Date(eventData.date).setHours(0, 0, 0, 0) <
        new Date().setHours(0, 0, 0, 0);

    useEffect(() => {
        if (isPending) return;

        if (isExpired || !user?.email || !eventData?._id) {
            setChecking(false);
            return;
        }

        const checkJoined = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/joinevent/check?eventId=${eventData._id}&email=${user.email}`
                );

                const data = await res.json();
                setIsJoined(data.joined);

            } catch {
                toast.error("Failed to check event status");
            } finally {
                setChecking(false);
            }
        };

        checkJoined();
    }, [user?.email, eventData?._id, isPending, isExpired]);

    const handleJoinEvent = async () => {
        if (!user) {
            router.push("/sign-in");
            return;
        }

        setLoading(true);

        try {
            const { _id, ...eventFields } = eventData;

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/joinevent`, {
                method: isJoined ? "DELETE" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    isJoined
                        ? { eventId: _id, email: user.email }
                        : { ...eventFields, eventId: _id, email: user.email }
                ),
            });

            if (!res.ok) {
                throw new Error(
                    res.status === 409
                        ? "You have already joined this event!"
                        : "Something went wrong!"
                );
            }

            setIsJoined(!isJoined);

            toast.success(
                isJoined
                    ? "You left the event!"
                    : "Successfully joined the event!"
            );

            router.refresh();

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="lg:col-span-5 sticky top-24">
            <div className="bg-white dark:bg-[#1E293B] p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] dark:border-[#334155] shadow-xl space-y-6">

                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-sm text-[#64748B] dark:text-[#CBD5E1]">
                        Participating Volunteers
                    </span>
                    <span className={`w-2.5 h-2.5 rounded-full ${isExpired ? "bg-slate-400" : "bg-emerald-500 animate-pulse"
                        }`}></span>
                </div>

                <div className="space-y-3">
                    <h3 className="text-lg font-bold text-[#172B3A] dark:text-[#F1F5F9]">
                        {isExpired
                            ? "Event Completed"
                            : isJoined
                                ? "You're In! 🎉"
                                : "Ready to Make an Impact?"}
                    </h3>

                    <p className="text-xs text-[#64748B] dark:text-[#CBD5E1]">
                        {isExpired
                            ? "This event has already ended. Thank you for your interest!"
                            : isJoined
                                ? "You have joined this event. You can leave anytime."
                                : "Confirm your participation to receive event updates and coordinate with the organizer."}
                    </p>
                </div>

                {isExpired ? (
                    <p className="text-center bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold py-4 rounded-2xl">
                        Event Completed
                    </p>
                ) : (
                    <button
                        onClick={handleJoinEvent}
                        disabled={checking || loading || isPending}
                        className={`w-full font-bold py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 text-base disabled:opacity-60 ${isJoined
                                ? "bg-red-500 hover:bg-red-600 text-white"
                                : "bg-[#16A34A] hover:bg-[#15803D] text-white"
                            }`}
                    >
                        {checking || loading || isPending ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : isJoined ? (
                            <>
                                <LogOut className="w-5 h-5" />
                                Leave This Event
                            </>
                        ) : (
                            <>
                                <UserCheck className="w-5 h-5" />
                                Join This Event
                            </>
                        )}
                    </button>
                )}

                {!isExpired && (
                    <p className="text-[11px] text-[#94A3B8] text-center">
                        By joining, you agree to Kindora community volunteering code of conduct.
                    </p>
                )}

            </div>
        </div>
    );
};

export default JoinEventCard;
