'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const DeleteEventPage = ({ eventId }) => {
    const router = useRouter();

    const handleDelete = async () => {
        const id = typeof eventId === 'object' ? eventId?._id : eventId;
        if (!id) {
            toast.error("Invalid event ID!");
            return;
        }

        const res = await fetch(
            `http://localhost:5000/events/${id}`,
            {
                method: "DELETE",
            }
        );

        if (res.ok) {
            toast.success("Event deleted successfully!");
            router.push("/events");
            router.refresh();
        } else {
            toast.error("Failed to delete event!");
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button className="p-2.5 rounded-2xl bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] text-[#64748B] hover:text-red-500 hover:border-red-500 transition-all">
                    <Trash2 className="w-4 h-4" />
                </button>
            </AlertDialogTrigger>

            <AlertDialogContent className="bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-3xl p-6 sm:p-8 shadow-2xl max-w-md">
                <AlertDialogHeader className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/50 text-red-500 flex items-center justify-center mx-auto sm:mx-0">
                        <Trash2 className="w-6 h-6" />
                    </div>

                    <AlertDialogTitle className="text-xl font-extrabold text-[#172B3A] dark:text-[#F1F5F9] text-center sm:text-left">
                        Delete This Event?
                    </AlertDialogTitle>

                    <AlertDialogDescription className="text-xs sm:text-sm text-[#64748B] dark:text-[#CBD5E1] text-center sm:text-left leading-relaxed">
                        This action cannot be undone. This will permanently remove your event from Kindora.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="mt-6 flex flex-col sm:flex-row gap-2">
                    <AlertDialogCancel className="w-full sm:w-auto py-2.5 px-5 rounded-xl border border-[#E2E8F0] dark:border-[#334155] bg-transparent text-[#172B3A] dark:text-[#F1F5F9] hover:bg-slate-50 dark:hover:bg-[#111C2E] text-xs font-semibold">
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={handleDelete}
                        className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-md shadow-red-600/20"
                    >
                        Yes, Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteEventPage;
