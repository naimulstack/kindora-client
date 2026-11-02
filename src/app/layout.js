import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar";
import { ThemeProvider } from "../components/theme-provider";
import { AuthProvider } from "../components/auth-provider";
import Footer from "@/components/footer";
import { Toaster } from "react-hot-toast";

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
          <AuthProvider>
            <Navbar />
            {children}
            <Toaster position="top-right" reverseOrder={false} />
          </AuthProvider>
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
