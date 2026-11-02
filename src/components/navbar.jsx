'use client';
import React, { useState } from 'react';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ChevronDown, 
  PlusCircle, 
  Calendar, 
  CheckCircle, 
  LogOut, 
  Heart 
} from 'lucide-react';
import Image from 'next/image';
import Logo from './../app/Images/Kindora Charity Logo with Heart and Leaf.png'
import Link from 'next/link';
import { useTheme } from './theme-provider';

const Navbar = ({ isLoggedIn, setIsLoggedIn, user }) => {
  const { isDark, toggleTheme } = useTheme();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-[#111C2E] border-b border-[#E2E8F0] dark:border-[#334155] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 cursor-pointer"
          >
            <Image src={Logo} alt="Kindora Logo" width={180} height={80} />
          </Link>

          {/* Center: Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/events"
              className="text-[#334155] dark:text-[#F1F5F9] hover:text-[#16A34A] dark:hover:text-[#22C55E] font-medium text-sm transition-colors py-2 relative group"
            >
              Upcoming Events
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#16A34A] dark:bg-[#22C55E] transition-all group-hover:w-full"></span>
            </Link>
          </div>

          {/* Right: Theme Toggle & Authentication */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-[#F0FDF4] dark:bg-[#1E293B] text-[#15803D] dark:text-[#22C55E] hover:bg-emerald-100 dark:hover:bg-[#334155] transition-all"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {!isLoggedIn ? (
              /* Before Login State */
              <button
                onClick={() => setIsLoggedIn(true)}
                className="bg-[#16A34A] hover:bg-[#15803D] text-white font-medium text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-emerald-600/20"
              >
                Sign In
              </button>
            ) : (
              /* After Login State */
              <div className="flex items-center gap-3">
                {/* Profile Dropdown Trigger */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-[#1E293B] transition-colors group"
                    title={user.name}
                  >
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-[#16A34A]"
                    />
                    <ChevronDown className="w-4 h-4 text-[#64748B] dark:text-[#CBD5E1] group-hover:text-[#16A34A]" />
                  </button>

                  {/* Profile Dropdown Panel */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-[#1E293B] rounded-2xl shadow-xl border border-[#E2E8F0] dark:border-[#334155] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-4 py-3 border-b border-[#E2E8F0] dark:border-[#334155]">
                        <p className="text-sm font-semibold text-[#172B3A] dark:text-[#F1F5F9]">
                          {user.name}
                        </p>
                        <p className="text-xs text-[#64748B] dark:text-[#CBD5E1] truncate">
                          {user.email}
                        </p>
                      </div>

                      <div className="py-1">
                        <a 
                          href="/create-event" 
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-[#334155] dark:text-[#CBD5E1] hover:bg-[#F0FDF4] dark:hover:bg-[#334155] hover:text-[#16A34A] dark:hover:text-[#22C55E]"
                        >
                          <PlusCircle className="w-4 h-4" /> Create Event
                        </a>
                        <a 
                          href="#manage-events" 
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-[#334155] dark:text-[#CBD5E1] hover:bg-[#F0FDF4] dark:hover:bg-[#334155] hover:text-[#16A34A] dark:hover:text-[#22C55E]"
                        >
                          <Calendar className="w-4 h-4" /> Manage Events
                        </a>
                        <a 
                          href="#joined-events" 
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-[#334155] dark:text-[#CBD5E1] hover:bg-[#F0FDF4] dark:hover:bg-[#334155] hover:text-[#16A34A] dark:hover:text-[#22C55E]"
                        >
                          <CheckCircle className="w-4 h-4" /> Joined Events
                        </a>
                      </div>

                      <div className="border-t border-[#E2E8F0] dark:border-[#334155] pt-1 mt-1">
                        <button
                          onClick={() => {
                            setIsLoggedIn(false);
                            setIsProfileOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                        >
                          <LogOut className="w-4 h-4" /> Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Separate Logout Button */}
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="bg-[#FEE2E2] hover:bg-[#FECACA] text-[#DC2626] font-medium text-sm px-4 py-2 rounded-xl transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-[#F0FDF4] dark:bg-[#1E293B] text-[#15803D] dark:text-[#22C55E]"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#172B3A] dark:text-[#F1F5F9]"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#111C2E] px-4 pt-3 pb-6 space-y-3">
          <a
            href="#upcoming-events"
            className="block py-2 text-base font-medium text-[#172B3A] dark:text-[#F1F5F9]"
          >
            Upcoming Events
          </a>
          {!isLoggedIn ? (
            <button
              onClick={() => {
                setIsLoggedIn(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full bg-[#16A34A] text-white py-2.5 rounded-xl font-medium"
            >
              Login
            </button>
          ) : (
            <div className="space-y-2 pt-2 border-t border-[#E2E8F0] dark:border-[#334155]">
              <div className="flex items-center gap-3 py-2">
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="font-semibold text-[#172B3A] dark:text-[#F1F5F9]">{user.name}</p>
                  <p className="text-xs text-[#64748B] dark:text-[#CBD5E1]">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-[#FEE2E2] text-[#DC2626] py-2.5 rounded-xl font-medium"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;