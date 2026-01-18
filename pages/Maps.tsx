
import React, { useState } from 'react';
import { getMapInformation } from '../services/gemini';

const Maps: React.FC = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!search) return;
    setLoading(true);
    setResults(null);
    
    // Attempt to get user location for better results
    let lat, lng;
    if (navigator.geolocation) {
      const pos: any = await new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(resolve, () => resolve(null));
      });
      if (pos) {
        lat = pos.coords.latitude;
        lng = pos.coords.longitude;
      }
    }

    const info = await getMapInformation(search, lat, lng);
    setResults(info);
    setLoading(false);
  };

  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col gap-6 animate-fadeIn">
      <div className="glass p-6 rounded-[32px] flex flex-col md:flex-row gap-4 items-center shadow-sm">
        <div className="relative flex-1 w-full">
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search for temples, hospitals, ashrams, or routes..." 
            className="w-full bg-white/50 border border-gray-100 rounded-2xl px-6 py-4 text-lg focus:outline-none focus:ring-4 focus:ring-ganga/10 transition-all"
          />
          <button 
            onClick={handleSearch}
            disabled={loading}
            className="absolute right-3 top-3 bg-ganga text-white px-6 py-2 rounded-xl font-bold shadow-lg hover:bg-ganga/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Explore'}
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {['Kedarnath Route', 'Rishikesh Yoga', 'Medical', 'ATMs'].map(t => (
            <button 
              key={t}
              onClick={() => { setSearch(t); handleSearch(); }}
              className="bg-white border border-gray-100 px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:border-ganga whitespace-nowrap transition-all shadow-sm"
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
        <div className="lg:col-span-2 rounded-[40px] bg-gray-100 overflow-hidden relative border-4 border-white shadow-xl">
          <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=30.0668,79.0193&zoom=8&size=1000x800&key=')] bg-cover opacity-40 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-br from-ganga/5 to-mountain/10" />
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group">
             <div className="w-14 h-14 bg-saffron rounded-full animate-bounce flex items-center justify-center text-white border-4 border-white shadow-2xl relative">
               <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
               <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-mountain text-white px-2 py-0.5 rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">Uttarakhand</div>
             </div>
          </div>

          <div className="absolute bottom-8 left-8 right-8 glass p-6 rounded-3xl border border-white/40 shadow-lg">
             <h4 className="font-bold text-mountain text-xl mb-1 flex items-center gap-2">
               <svg className="w-5 h-5 text-ganga" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
               Live Terrain Intelligence
             </h4>
             <p className="text-xs text-gray-500 leading-relaxed">Search to activate dynamic grounding. Our AI will analyze routes, elevation, and facility density to give you the most accurate pilgrimage advice.</p>
          </div>
        </div>

        <div className="glass rounded-[40px] p-8 overflow-y-auto space-y-6 shadow-sm border border-white/40">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <h3 className="text-2xl font-serif font-bold text-mountain">Devbhoomi AI Insights</h3>
          </div>
          
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 gap-6">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-ganga/20 rounded-full" />
                <div className="absolute inset-0 w-16 h-16 border-4 border-ganga border-t-transparent rounded-full animate-spin" />
              </div>
              <p className="text-sm text-gray-500 font-bold animate-pulse">Querying Grounded Intelligence...</p>
            </div>
          ) : results ? (
            <div className="space-y-6">
              <div className="bg-ganga/5 p-5 rounded-3xl border border-ganga/10">
                <p className="text-gray-700 text-sm leading-relaxed font-medium">{results.text}</p>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">Verified Places</h4>
                {results.grounding && results.grounding.length > 0 ? (
                  results.grounding.map((chunk: any, i: number) => (
                    <div key={i} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:border-ganga/30 hover:shadow-md transition-all group">
                       {chunk.maps && (
                         <div className="flex flex-col gap-3">
                           <div>
                             <h5 className="font-bold text-mountain text-sm group-hover:text-ganga transition-colors">{chunk.maps.title || 'Sacred Site Found'}</h5>
                             <p className="text-[10px] text-gray-400 mt-1 line-clamp-1">{chunk.maps.uri}</p>
                           </div>
                           <a 
                             href={chunk.maps.uri} 
                             target="_blank" 
                             rel="noreferrer" 
                             className="bg-ganga/10 text-ganga py-2 px-4 rounded-xl text-[10px] font-bold text-center hover:bg-ganga hover:text-white transition-all"
                           >
                             Get Live Directions
                           </a>
                         </div>
                       )}
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-400 italic">No specific location tags found. Use specific names for better grounding.</p>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center p-8 flex flex-col items-center gap-6">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center shadow-inner">
                <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-bold text-gray-500">Awaiting your destination</p>
                <p className="text-[10px] text-gray-400 leading-relaxed px-4">Our AI maps are connected to real-time Google data. Ask about medical centers near Badrinath or weather-safe routes to Kedarnath.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Maps;
