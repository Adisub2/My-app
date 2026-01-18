
import React, { useState } from 'react';

const VirtualTours: React.FC = () => {
  const [activeTour, setActiveTour] = useState<{name: string, img: string} | null>(null);

  const tours = [
    { name: 'Kedarnath Temple', img: 'https://picsum.photos/seed/kedar360/1200/600', location: 'Rudraprayag' },
    { name: 'Rishikesh Ghats', img: 'https://picsum.photos/seed/rishi360/1200/600', location: 'Dehradun' },
    { name: 'Badrinath Shrine', img: 'https://picsum.photos/seed/badri360/1200/600', location: 'Chamoli' },
    { name: 'Valley of Flowers', img: 'https://picsum.photos/seed/vof360/1200/600', location: 'Chamoli' },
    { name: 'Har Ki Pauri', img: 'https://picsum.photos/seed/haridwar360/1200/600', location: 'Haridwar' },
    { name: 'Auli Meadows', img: 'https://picsum.photos/seed/auli360/1200/600', location: 'Joshimath' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-3xl font-serif font-bold text-mountain">Virtual Darshan</h2>
          <p className="text-gray-500">Immersive 360° experiences of sacred sites and natural wonders.</p>
        </div>
        <div className="flex gap-2">
          <span className="bg-saffron/10 text-saffron px-3 py-1 rounded-full text-xs font-bold border border-saffron/20">VR Mode Enabled</span>
          <span className="bg-mountain/10 text-mountain px-3 py-1 rounded-full text-xs font-bold border border-mountain/20">4K Quality</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour, i) => (
          <div 
            key={i} 
            className="group relative h-64 rounded-3xl overflow-hidden cursor-pointer"
            onClick={() => setActiveTour(tour)}
          >
            <img src={tour.img} alt={tour.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center border border-white/40">
                <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-[10px] uppercase font-bold tracking-widest text-saffron mb-1">{tour.location}</p>
              <h3 className="text-xl font-bold">{tour.name}</h3>
            </div>
          </div>
        ))}
      </div>

      {activeTour && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col">
          <div className="absolute top-8 left-8 z-[110] flex items-center gap-4">
            <button 
              onClick={() => setActiveTour(null)}
              className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div className="text-white">
              <h3 className="font-bold text-xl">{activeTour.name}</h3>
              <p className="text-xs text-gray-400">Virtual Simulation • Immersive Audio On</p>
            </div>
          </div>
          
          <div className="relative flex-1 overflow-hidden">
            <img 
              src={activeTour.img} 
              alt="360 tour" 
              className="absolute h-full min-w-[200vw] object-cover left-0 animate-pan"
              style={{ animation: 'pan 30s linear infinite' }}
            />
            
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4">
              <div className="glass px-6 py-3 rounded-full text-white text-sm flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                AI Guide Narrating: "Kedarnath temple is dedicated to Lord Shiva, located near the Mandakini river..."
              </div>
            </div>
          </div>
          
          <style>{`
            @keyframes pan {
              0% { transform: translateX(0); }
              50% { transform: translateX(-50%); }
              100% { transform: translateX(0); }
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default VirtualTours;
