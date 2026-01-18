
import React from 'react';
import { ViewState } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewState;
  onViewChange: (view: ViewState) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange }) => {
  const navItems = [
    { id: 'home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', label: 'Home' },
    { id: 'explore', icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7', label: 'Explore' },
    { id: 'maps', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', label: 'Maps' },
    { id: 'planner', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', label: 'Plan' },
    { id: 'vr', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z', label: 'Virtual' },
    { id: 'community', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7', label: 'Social' },
    { id: 'about', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', label: 'About' },
  ];

  return (
    <div className="min-h-screen pb-20 md:pb-0 md:pt-16">
      <header className="fixed top-0 left-0 right-0 z-50 glass h-16 flex items-center px-4 md:px-8">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onViewChange('home')}>
          <div className="w-10 h-10 bg-saffron rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">T</div>
          <div>
            <h1 className="text-xl font-bold text-mountain leading-none">Teerthlok</h1>
            <p className="text-[10px] text-earth uppercase tracking-widest font-bold">Devbhoomi Companion</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 mt-16">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 glass h-16 flex items-center justify-around px-2 md:hidden safe-bottom">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id as ViewState)}
            className={`flex flex-col items-center justify-center w-12 gap-1 transition-all ${
              activeView === item.id ? 'text-saffron scale-110' : 'text-gray-400'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
            <span className="text-[8px] font-bold uppercase">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="hidden md:flex fixed left-8 top-1/2 -translate-y-1/2 z-50 flex-col gap-4 p-3 glass rounded-full shadow-2xl">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id as ViewState)}
            className={`group relative p-3 rounded-full transition-all ${
              activeView === item.id ? 'bg-saffron text-white shadow-lg' : 'text-gray-400 hover:bg-gray-100'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
            <span className="absolute left-16 bg-mountain text-white px-3 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Layout;
