
import React, { useState } from 'react';
import { DISTRICTS } from '../constants';
import { ViewState, SearchResult } from '../types';
import { performSearch } from '../services/gemini';

interface HomeProps {
  onViewChange: (view: ViewState) => void;
}

const Home: React.FC<HomeProps> = ({ onViewChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleGlobalSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setSearchResult(null);
    const result = await performSearch(searchQuery);
    setSearchResult(result);
    setIsSearching(false);
  };

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[80vh] rounded-[40px] overflow-hidden group shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=1920" 
          alt="Kedarnath Himalayas" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-center text-white space-y-8">
          <div className="space-y-2">
            <span className="text-saffron font-bold tracking-[0.3em] uppercase text-xs md:text-sm mb-2 block">Devbhoomi Digital Ecosystem</span>
            <h2 className="text-5xl md:text-8xl font-serif font-bold leading-tight drop-shadow-lg">
              Teerthlok
            </h2>
            <p className="text-lg md:text-2xl text-snow/80 italic font-light">Experience Spirit, Culture, and the Divine Himalayas</p>
          </div>

          {/* Global Search Bar */}
          <div className="w-full max-w-2xl relative group/search">
            <div className="absolute -inset-1 bg-gradient-to-r from-saffron to-ganga rounded-[32px] blur opacity-25 group-hover/search:opacity-50 transition duration-1000"></div>
            <div className="relative flex items-center glass p-2 rounded-[28px] border-2 border-white/20">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleGlobalSearch()}
                placeholder="Search anything about Uttarakhand... (e.g. Kedarnath road status)"
                className="flex-1 bg-transparent border-none px-6 py-4 text-white placeholder-snow/50 focus:outline-none text-lg"
              />
              <button 
                onClick={handleGlobalSearch}
                disabled={isSearching}
                className="bg-saffron text-white p-4 rounded-[22px] hover:scale-105 transition-all shadow-lg active:scale-95 disabled:opacity-50"
              >
                {isSearching ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => onViewChange('planner')}
              className="bg-white text-mountain px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all hover:bg-saffron hover:text-white"
            >
              AI Trip Architect
            </button>
            <button 
              onClick={() => onViewChange('vr')}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-full font-bold border border-white/30 transition-all"
            >
              360° Virtual Darshan
            </button>
          </div>
        </div>
      </section>

      {/* Search Results Display */}
      {searchResult && (
        <section className="animate-scaleIn max-w-4xl mx-auto">
          <div className="glass p-8 rounded-[40px] border-2 border-saffron/20 shadow-xl space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-serif font-bold text-mountain">Search Intelligence Result</h3>
              <button onClick={() => setSearchResult(null)} className="text-gray-400 hover:text-earth">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="bg-white/50 p-6 rounded-3xl border border-white">
              <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{searchResult.text}</p>
            </div>
            {searchResult.sources.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">Verified Sources</h4>
                <div className="flex flex-wrap gap-2">
                  {searchResult.sources.map((source, i) => (
                    <a 
                      key={i} 
                      href={source.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] bg-ganga/10 text-ganga px-3 py-1.5 rounded-full font-bold hover:bg-ganga hover:text-white transition-colors flex items-center gap-1"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      {source.title || "Link"}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* District Highlights with Real Images */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="text-3xl font-serif font-bold text-mountain">Sacred Destinations</h3>
            <p className="text-gray-500">Live data integrated from all 13 districts</p>
          </div>
          <button 
            onClick={() => onViewChange('explore')}
            className="text-saffron font-bold hover:underline"
          >
            Explore All
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DISTRICTS.map((district) => (
            <div 
              key={district.id}
              className="group relative h-96 rounded-[32px] overflow-hidden cursor-pointer shadow-lg"
              onClick={() => onViewChange('explore')}
            >
              <img 
                src={district.image} 
                alt={district.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <p className="text-saffron font-bold text-[10px] uppercase tracking-widest mb-1">{district.hindiName}</p>
                <h4 className="text-3xl font-bold">{district.name}</h4>
                <p className="text-sm text-gray-300 mt-2 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-light">
                  {district.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sustainable Mission */}
      <section className="bg-mountain rounded-[50px] p-8 md:p-20 text-white overflow-hidden relative shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=1200" 
          alt="Mission Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />
        <div className="max-w-3xl relative z-10">
          <h3 className="text-4xl font-serif font-bold mb-8">Teerthlok Visionary Mission</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              { title: "Safe Char Dham", desc: "AI monitoring of landslide alerts and crowd density at portals." },
              { title: "Eco-Tourism", desc: "Verified homestays that support local families and hill traditions." },
              { title: "Digital Heritage", desc: "3D archiving of ancient temples and cultural artifacts for future generations." },
              { title: "Emergency Support", desc: "One-tap AI navigation to nearest medical or safety centers in remote terrains." }
            ].map((item, i) => (
              <div key={i} className="space-y-3">
                <h4 className="font-bold text-saffron text-xl">{item.title}</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="text-center py-16 border-t border-gray-100">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 h-12 bg-saffron rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">T</div>
          <span className="font-bold text-mountain text-2xl">Teerthlok</span>
        </div>
        <p className="text-gray-500 text-sm">Engineered with devotion for Uttarakhand by <b>Aditya Shukla</b></p>
        <div className="flex justify-center gap-6 mt-6 grayscale opacity-50 hover:grayscale-0 transition-all">
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Incredible_India_Logo.png" alt="Incredible India" className="h-10 object-contain" />
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/9/95/Digital_India_logo.svg/1200px-Digital_India_logo.svg.png" alt="Digital India" className="h-10 object-contain" />
        </div>
      </footer>
    </div>
  );
};

export default Home;
