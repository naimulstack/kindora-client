import {
    FaSquareInstagram,
    FaFacebookF,
    FaLinkedinIn,
    FaSquareXTwitter
} from "react-icons/fa6";

import Logo from './../app/Images/Kindora Charity Logo with Heart and Leaf.png'
import Image from 'next/image';
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-[#102A20] text-[#CBD5D1] pt-16 pb-8 border-t border-emerald-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

                    {/* Column 1: Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-white">
                                <Link href="/">
                                    <Image src={Logo} alt="Kindora Logo" width={30} height={30} className="w-8 h-8 fill-current" />
                                </Link>
                            </div>
                        </div>

                        <p className="text-sm text-[#CBD5D1] leading-relaxed">
                            Empowering local communities through social service, volunteering, and collective action.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold text-base mb-4">Quick Links</h4>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link href="/" className="hover:text-[#F59E0B] transition-colors">Home</Link>
                            </li>
                            <li>
                                <Link href="/events" className="hover:text-[#F59E0B] transition-colors">Upcoming Events</Link>
                            </li>
                            <li>
                                <Link href="/create-event" className="hover:text-[#F59E0B] transition-colors">Create Event</Link>
                            </li>
                            <li>
                                <Link href="/manage-event" className="hover:text-[#F59E0B] transition-colors">Manage Events</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Community */}
                    <div>
                        <h4 className="text-white font-semibold text-base mb-4">Community</h4>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link href="/events" className="hover:text-[#F59E0B] transition-colors">Volunteer</Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-[#F59E0B] transition-colors">About Us</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-[#F59E0B] transition-colors">Contact Us</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Social Links */}
                    <div>
                        <h4 className="text-white font-semibold text-base mb-4">Connect With Us</h4>
                        <div className="flex gap-3">
                            <a href="#" className="w-10 h-10 rounded-xl bg-[#14532D] flex items-center justify-center text-white hover:bg-[#F59E0B] hover:text-[#172B3A] transition-all">
                                <FaFacebookF className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-xl bg-[#14532D] flex items-center justify-center text-white hover:bg-[#F59E0B] hover:text-[#172B3A] transition-all">
                                <FaSquareInstagram className="w-5 h-5" />

                            </a>
                            <a href="#" className="w-10 h-10 rounded-xl bg-[#14532D] flex items-center justify-center text-white hover:bg-[#F59E0B] hover:text-[#172B3A] transition-all">
                                <FaLinkedinIn className="w-5 h-5" />
                            </a>
                            {/* X Logo*/}
                            <a href="#" className="w-10 h-10 rounded-xl bg-[#14532D] flex items-center justify-center text-white hover:bg-[#F59E0B] hover:text-[#172B3A] transition-all">
                                <FaSquareXTwitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                </div>

                {/* Footer Bottom */}
                <div className="pt-8 border-t border-emerald-950/80 flex flex-col sm:flex-row justify-between items-center text-xs text-[#CBD5D1] gap-4">
                    <p>© {new Date().getFullYear()} Kindora. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-[#F59E0B] transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-[#F59E0B] transition-colors">Terms & Conditions</a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;