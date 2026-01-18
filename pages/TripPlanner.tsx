
import React, { useState } from 'react';
import { generateTripPlan } from '../services/gemini';
import { ItineraryItem } from '../types';

const TripPlanner: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isPlanning, setIsPlanning] = useState(false);
  const [plan, setPlan] = useState<ItineraryItem[] | null>(null);

  const handlePlan = async () => {
    if (!query.trim()) return;
    setIsPlanning(true);
    const result = await generateTripPlan(query);
    setPlan(result);
    setIsPlanning(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-fadeIn">
      <header className="text-center">
        <h2 className="text-4xl font-serif font-bold text-mountain mb-2">Smart Trip Planner</h2>
        <p className="text-gray-500">Let our AI architect design your perfect spiritual or adventure journey.</p>
      </header>

      <section className="glass p-8 rounded-[40px] shadow-xl">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-2">What's on your mind?</label>
            <textarea 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-32 bg-gray-50 border border-gray-200 rounded-3xl p-6 text-lg focus:outline-none focus:ring-4 focus:ring-saffron/20 transition-all resize-none"
              placeholder="Example: Plan a 5-day spiritual yatra for senior citizens starting from Haridwar on a moderate budget."
            />
          </div>
          
          <div className="flex flex-wrap gap-3">
            {['Char Dham', 'Adventure', 'Solo Traveler', 'Family Friendly', 'Budget friendly'].map(tag => (
              <button 
                key={tag}
                onClick={() => setQuery(prev => prev + " " + tag)}
                className="bg-white border border-gray-200 px-4 py-2 rounded-full text-sm text-gray-600 hover:border-saffron hover:text-saffron transition-all"
              >
                + {tag}
              </button>
            ))}
          </div>

          <button 
            onClick={handlePlan}
            disabled={isPlanning}
            className="w-full bg-saffron text-white py-5 rounded-[20px] font-bold text-xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isPlanning ? (
              <>
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                AI is Crafting Your Experience...
              </>
            ) : 'Generate Itinerary'}
          </button>
        </div>
      </section>

      {plan && (
        <section className="space-y-8 animate-scaleIn">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-mountain">Your Personalized Plan</h3>
            <button className="text-saffron font-bold text-sm flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF
            </button>
          </div>

          <div className="space-y-4">
            {plan.map((item, i) => (
              <div key={i} className="glass p-6 rounded-3xl flex flex-col md:flex-row gap-6 relative overflow-hidden group">
                <div className="md:w-32 flex-shrink-0 flex flex-col items-center justify-center border-r border-gray-100 pr-6">
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Day</span>
                  <span className="text-5xl font-serif font-bold text-saffron">{item.day}</span>
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xl font-bold text-mountain">{item.activity}</h4>
                      <p className="text-sm text-gray-500 font-medium">{item.location} • {item.time}</p>
                    </div>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold">
                      Est: {item.costEstimate}
                    </span>
                  </div>
                  <div className="bg-white/50 p-3 rounded-2xl text-xs text-gray-600 border border-gray-100">
                    <span className="font-bold text-earth">Pro Safety Tip:</span> {item.safetyTip}
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-saffron/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform" />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default TripPlanner;
