import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutGrid, ShoppingBag, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSettings } from '@core/context/SettingsContext';

const navItems = [
    { label: 'Home', icon: Home, path: '/' },
    { label: 'Category', icon: LayoutGrid, path: '/categories' },
    { label: 'Orders', icon: ShoppingBag, path: '/orders' },
    { label: 'Profile', icon: User, path: '/profile' },
];

const isColorLight = (color) => {
    if (!color || typeof color !== 'string') return false;
    if (color.startsWith('var')) return false;
    const hex = color.replace('#', '');
    if (hex.length !== 6 && hex.length !== 3) return false;
    
    let r, g, b;
    if (hex.length === 6) {
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
    } else {
        r = parseInt(hex.charAt(0) + hex.charAt(0), 16);
        g = parseInt(hex.charAt(1) + hex.charAt(1), 16);
        b = parseInt(hex.charAt(2) + hex.charAt(2), 16);
    }
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return yiq >= 220; // threshold for white/very light colors
};

const BottomNav = () => {
    const location = useLocation();
    const { settings } = useSettings();
    const primaryColor = settings?.primaryColor || '#0284c7';
    const secondaryColor = settings?.secondaryColor || '#64748b';
    
    const isLight = isColorLight(primaryColor);
    // If primary color is white/too light, fall back to secondary color (if it's not light) or default brand blue
    const activeColor = isLight 
        ? (isColorLight(secondaryColor) ? '#0284c7' : secondaryColor) 
        : 'var(--primary)';

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[500] bg-white border-t border-gray-100 flex items-center justify-around h-[70px] md:hidden shadow-[0_-8px_30px_rgba(0,0,0,0.06)] px-4 pb-[env(safe-area-inset-bottom)]">
            {navItems.map((item) => {
                const isActive = location.pathname === item.path ||
                    (item.path !== '/' && location.pathname.startsWith(item.path));

                return (
                    <Link
                        key={item.path}
                        to={item.path}
                        className="flex-1 flex flex-col items-center justify-center h-full relative group transition-all"
                    >
                        {isActive && (
                            <div 
                                className="absolute inset-0 rounded-2xl -z-10 transition-opacity duration-300"
                                style={{ backgroundColor: isLight ? `${activeColor}18` : 'color-mix(in srgb, var(--primary) 10%, transparent)' }} 
                            />
                        )}

                        <div className="flex flex-col items-center justify-center relative">
                            <div
                                className={cn(
                                    "transition-transform duration-300",
                                    isActive ? "scale-110" : "scale-100"
                                )}
                            >
                                <item.icon
                                    size={24}
                                    strokeWidth={isActive ? 2.5 : 2}
                                    style={{ color: isActive ? activeColor : '#9ca3af' }}
                                    className="transition-colors duration-300"
                                />
                            </div>

                            <span
                                className="text-[10px] font-bold tracking-tight mt-1 transition-all duration-300"
                                style={{ color: isActive ? activeColor : '#9ca3af' }}
                            >
                                {item.label}
                            </span>
                        </div>

                        {/* Top Accent Line for Active State */}
                        {isActive && (
                            <div 
                                className="absolute -top-[1px] w-8 h-[3px] rounded-full transition-opacity duration-300" 
                                style={{ backgroundColor: activeColor }}
                            />
                        )}
                    </Link>
                );
            })}
        </div>
    );
};

export default BottomNav;

