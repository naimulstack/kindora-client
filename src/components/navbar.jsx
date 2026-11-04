'use client';
import { useState, Suspense } from 'react';import {
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  PlusCircle,
  Calendar,
  CheckCircle,
  LogOut
} from 'lucide-react';
import Image from 'next/image';
import Logo from './../app/Images/Kindora Charity Logo with Heart and Leaf.png';
import Link from 'next/link';
import { useTheme } from './theme-provider';
import { authClient } from '@/lib/auth-client';
import { usePathname } from 'next/navigation';
import { toast } from "react-hot-toast";

const UserAvatar = ({ user, className = "w-10 h-10" }) => {

  const [hasError, setHasError] = useState(false);
  const avatarUrl = user?.image || user?.avatar;
  const initial = user?.name ? user.name.trim().charAt(0).toUpperCase() : 'U';

  return avatarUrl && !hasError ? (
    <img
      key={avatarUrl}
      src={avatarUrl}
      alt={user?.name || 'User'}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={`${className} rounded-full object-cover ring-2 ring-[#16A34A] shrink-0`}
    />
  ) : (
    <div className={`${className} rounded-full bg-[#16A34A] text-white flex items-center justify-center font-bold ring-2 ring-[#16A34A] shrink-0`}>
      {initial}
    </div>
  );
};

const Navbar = () => {

  const pathname = usePathname();
  const isActive = pathname === '/events';

  const { isDark, toggleTheme } = useTheme();
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;
  const isLoggedIn = !!user;

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenus = () => {
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleSignOut = async () => {
    closeMenus();

    try {
      await authClient.signOut();
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Logout failed!");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-[#111C2E] border-b border-[#E2E8F0] dark:border-[#334155] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          <Link
            href="/"
            className="flex items-center gap-3 cursor-pointer"
            onClick={closeMenus}
          >
            <Image src={Logo} alt="Kindora Logo" width={180} height={80} />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/events"
              className={`font-medium text-sm transition-colors py-2 relative group ${isActive
                ? "text-[#16A34A] dark:text-[#22C55E]"
                : "text-[#334155] dark:text-[#F1F5F9] hover:text-[#16A34A] dark:hover:text-[#22C55E]"
                }`}
            >
              Upcoming Events
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-[#16A34A] dark:bg-[#22C55E] transition-all ${isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
              ></span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-[#F0FDF4] dark:bg-[#1E293B] text-[#15803D] dark:text-[#22C55E] hover:bg-emerald-100 dark:hover:bg-[#334155] transition-all"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {isPending ? null : !isLoggedIn ? (
              <Link
                href="/sign-in"
                className="bg-[#16A34A] hover:bg-[#15803D] text-white font-medium text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-emerald-600/20"
              >
                Sign In
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-[#1E293B] transition-colors group"
                    title={user.name}
                  >
                    <UserAvatar user={user} className="w-10 h-10" />
                    <ChevronDown className="w-4 h-4 text-[#64748B] dark:text-[#CBD5E1] group-hover:text-[#16A34A]" />
                  </button>

                  {/* Profile Dropdown Panel */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-[#1E293B] rounded-2xl shadow-xl border border-[#E2E8F0] dark:border-[#334155] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-4 py-3 border-b border-[#E2E8F0] dark:border-[#334155] flex items-center gap-3">
                        <UserAvatar user={user} className="w-10 h-10" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-[#172B3A] dark:text-[#F1F5F9] truncate">
                            {user.name}
                          </p>
                          <p className="text-xs text-[#64748B] dark:text-[#CBD5E1] truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      <div className="py-1">
                        <Link
                          href="/create-event"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-[#334155] dark:text-[#CBD5E1] hover:bg-[#F0FDF4] dark:hover:bg-[#334155] hover:text-[#16A34A] dark:hover:text-[#22C55E]"
                        >
                          <PlusCircle className="w-4 h-4" /> Create Event
                        </Link>
                        <Link
                          href="/manage-event"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-[#334155] dark:text-[#CBD5E1] hover:bg-[#F0FDF4] dark:hover:bg-[#334155] hover:text-[#16A34A] dark:hover:text-[#22C55E]"
                        >
                          <Calendar className="w-4 h-4" /> Manage Events
                        </Link>
                        <Link
                          href="/joined-events"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-[#334155] dark:text-[#CBD5E1] hover:bg-[#F0FDF4] dark:hover:bg-[#334155] hover:text-[#16A34A] dark:hover:text-[#22C55E]"
                        >
                          <CheckCircle className="w-4 h-4" /> Joined Events
                        </Link>
                      </div>

                      <div className="border-t border-[#E2E8F0] dark:border-[#334155] pt-1 mt-1">
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Direct Sign Out Button on Right of Profile */}
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-xl transition-all"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" /> Sign Out
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
          <Link
            href="/events"
            onClick={closeMenus}
            className="block py-2 text-base font-medium text-[#172B3A] dark:text-[#F1F5F9]"
          >
            Upcoming Events
          </Link>
          {isPending ? null : !isLoggedIn ? (
            <Link
              href="/sign-in"
              onClick={closeMenus}
              className="block w-full text-center bg-[#16A34A] text-white py-2.5 rounded-xl font-medium"
            >
              Sign In
            </Link>
          ) : (
            <div className="space-y-2 pt-2 border-t border-[#E2E8F0] dark:border-[#334155]">
              <div className="flex items-center gap-3 py-2">
                <UserAvatar user={user} className="w-10 h-10" />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[#172B3A] dark:text-[#F1F5F9] truncate">{user.name}</p>
                  <p className="text-xs text-[#64748B] dark:text-[#CBD5E1] truncate">{user.email}</p>
                </div>
              </div>
              <Link
                href="/create-event"
                onClick={closeMenus}
                className="flex items-center justify-center gap-2 w-full border border-[#E2E8F0] dark:border-[#334155] text-[#172B3A] dark:text-[#F1F5F9] py-2.5 rounded-xl font-medium"
              >
                <PlusCircle className="w-4 h-4" /> Create Event
              </Link>
              <Link
                href="/manage-event"
                onClick={closeMenus}
                className="flex items-center justify-center gap-2 w-full border border-[#E2E8F0] dark:border-[#334155] text-[#172B3A] dark:text-[#F1F5F9] py-2.5 rounded-xl font-medium"
              >
                <Calendar className="w-4 h-4" /> Manage Events
              </Link>
              <Link
                href="/joined-events"
                onClick={closeMenus}
                className="flex items-center justify-center gap-2 w-full border border-[#E2E8F0] dark:border-[#334155] text-[#172B3A] dark:text-[#F1F5F9] py-2.5 rounded-xl font-medium"
              >
                <CheckCircle className="w-4 h-4" /> Joined Events
              </Link>
              <button
                onClick={handleSignOut}
                className="w-full bg-[#FEE2E2] text-[#DC2626] py-2.5 rounded-xl font-medium flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

const NavbarWithSuspense = () => {
  return (
    <Suspense fallback={null}>
      <Navbar />
    </Suspense>
  );
};

export default NavbarWithSuspense;
