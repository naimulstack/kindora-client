"use client";

import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const SocialLoginToast = () => {
    const { data: session } = authClient.useSession();

    useEffect(() => {
        if (!session) return;

        const signupSuccess = localStorage.getItem("signupSuccess");
        const socialLogin = localStorage.getItem("socialLogin");
        const loginSuccess = localStorage.getItem("loginSuccess");

        if (loginSuccess) {
            toast.success("Login successful!");
            localStorage.removeItem("loginSuccess");
        }

        if (signupSuccess) {
            toast.success("Account created successfully!");
            localStorage.removeItem("signupSuccess");
        }

        if (socialLogin) {
            toast.success(`${socialLogin} login successful!`);
            localStorage.removeItem("socialLogin");
        }
    }, [session]);

    return null;
};

export default SocialLoginToast;