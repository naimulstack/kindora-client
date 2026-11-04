import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar";
import { ThemeProvider } from "../components/theme-provider";
import Footer from "@/components/footer";
import SocialLoginToast from "@/components/SocialLoginToast";
import { ToastContainer } from "react-toastify";

const PlusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

export const metadata = {
  title: "Kindora",
  description: "Small Acts. Greater Impact.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${PlusJakartaSans.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">

        <ThemeProvider>
          <SocialLoginToast />
          <Navbar />
          {children}
          <ToastContainer position="top-center" autoClose={3000} reverseOrder={false}/>
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
