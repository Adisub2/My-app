
import React, { useState } from 'react';
import { DISTRICTS } from '../constants';
import { District } from '../types';

const Explore: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="text-center max-w-2xl mx-auto">
        <h2 className="text-4xl font-serif font-bold text-mountain mb-2">Explore Districts</h2>
        <p className="text-gray-500">Discover the unique charm, culture, and spirituality of each of Uttarakhand's 13 districts.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DISTRICTS.map((district) => (
          <div 
            key={district.id}
            className="glass rounded-3xl overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
            onClick={() => setSelectedDistrict(district)}
          >
            <div className="h-48 overflow-hidden relative">
              <img src={district.image} alt={district.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-mountain tracking-wider uppercase">
                {district.hindiName}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-mountain mb-2">{district.name}</h3>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">{district.description}</p>
              <div className="flex flex-wrap gap-2">
                {district.landmarks.slice(0, 2).map((l, i) => (
                  <span key={i} className="bg-gray-100 text-gray-500 text-[10px] px-2 py-1 rounded-full font-medium">
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedDistrict && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-[40px] w-full max-w-4xl max-h-[90vh] overflow-y-auto relative animate-scaleIn">
            <button 
              onClick={() => setSelectedDistrict(null)}
              className="absolute top-6 right-6 w-10 h-10 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="h-64 md:h-full">
                <img src={selectedDistrict.image} alt={selectedDistrict.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-8 md:p-12 space-y-6">
                <div>
                  <h4 className="text-saffron font-bold text-sm tracking-widest uppercase mb-2">{selectedDistrict.hindiName}</h4>
                  <h3 className="text-4xl font-serif font-bold text-mountain">{selectedDistrict.name}</h3>
                </div>
                
                <div>
                  <h5 className="font-bold text-gray-800 mb-2">About</h5>
                  <p className="text-gray-600 text-sm leading-relaxed">{selectedDistrict.description}</p>
                </div>

                <div>
                  <h5 className="font-bold text-gray-800 mb-2">Culture & Tradition</h5>
                  <p className="text-gray-600 text-sm leading-relaxed">{selectedDistrict.culture}</p>
                </div>

                <div>
                  <h5 className="font-bold text-gray-800 mb-2">Key Highlights</h5>
                  <ul className="grid grid-cols-2 gap-2">
                    {selectedDistrict.landmarks.map((l, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 bg-saffron rounded-full" />
                        {l}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 flex gap-4">
                  <button className="flex-1 bg-mountain text-white py-3 rounded-2xl font-bold hover:opacity-90 transition-opacity">
                    Plan Visit
                  </button>
                  <button className="flex-1 border-2 border-mountain text-mountain py-3 rounded-2xl font-bold hover:bg-mountain hover:text-white transition-all">
                    Virtual Tour
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Explore;
