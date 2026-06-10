import React from "react";
import { NavLink } from "react-router-dom";
import { Home, IndianRupee, History, User } from "lucide-react";
import { motion } from "framer-motion";
import { useSettings } from "@core/context/SettingsContext";

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
  const { settings } = useSettings();
  const primaryColor = settings?.primaryColor || '#0284c7';
  const secondaryColor = settings?.secondaryColor || '#64748b';
  
  const isLight = isColorLight(primaryColor);
  const activeColor = isLight 
    ? (isColorLight(secondaryColor) ? '#0284c7' : secondaryColor) 
    : 'var(--primary)';

  const navItems = [
    { path: "/delivery/dashboard", label: "Home", icon: Home },
    { path: "/delivery/earnings", label: "Earnings", icon: IndianRupee },
    { path: "/delivery/history", label: "History", icon: History },
    { path: "/delivery/profile", label: "Profile", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200/50 py-2 px-6 flex justify-between items-center z-40 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)] max-w-md mx-auto">
      {navItems.map(({ path, label, icon: Icon }) => (
        <NavLink
          key={path}
          to={path}
          style={({ isActive }) => ({
            color: isActive ? activeColor : '#9ca3af'
          })}
          className="relative flex flex-col items-center justify-center space-y-1 w-full h-14 transition-colors duration-300">
          {({ isActive }) => (
            <>
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  style={{ backgroundColor: activeColor }}
                  className="absolute -top-2 w-8 h-1 rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <motion.div
                animate={{ scale: isActive ? 1.1 : 1, y: isActive ? -2 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              </motion.div>
              <span
                className={`text-[10px] font-bold ${isActive ? "opacity-100" : "opacity-80"}`}>
                {label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
};

export default BottomNav;
