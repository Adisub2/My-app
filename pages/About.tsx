
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-fadeIn py-8">
      <header className="text-center space-y-4">
        <div className="w-24 h-24 bg-saffron rounded-3xl mx-auto flex items-center justify-center text-white text-5xl font-bold shadow-2xl">
          T
        </div>
        <h2 className="text-5xl font-serif font-bold text-mountain">Teerthlok</h2>
        <p className="text-xl text-earth italic">"Spirituality, Technology, Sustainability."</p>
      </header>

      <section className="glass p-10 rounded-[50px] space-y-8 shadow-xl border-t-4 border-saffron">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
            <img src="https://media.licdn.com/dms/image/v2/D5603AQF5hJoKc6ia5Q/profile-displayphoto-scale_400_400/B56ZsTVf0aJAAg-/0/1765555962234?e=1770249600&v=beta&t=HCQZYn-1R00pFtKJCq-PuKz-RG3DxZqJXgjeXflw3mY" alt="Aditya Shukla" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-3xl font-bold text-mountain">Aditya Shukla</h3>
            <p className="text-saffron font-bold text-sm tracking-widest uppercase">Lead AI & Software Developer</p>
            <p className="text-gray-600 leading-relaxed">
              Teerthlok is a unified AI + VR tourism platform built to promote Uttarakhand's ancient culture and spirituality using next-generation technology. Our mission is to bridge the gap between tradition and innovation, making the pilgrimage experience safer, more accessible, and profoundly immersive for every traveler.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-100">
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-mountain flex items-center gap-2">
              <svg className="w-6 h-6 text-saffron" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Project Vision
            </h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex gap-2"><span>•</span> Empowering local hill economies through digital promotion.</li>
              <li className="flex gap-2"><span>•</span> Elder-friendly travel with voice-first AI companions.</li>
              <li className="flex gap-2"><span>•</span> Disaster awareness and real-time safety tracking in landslide zones.</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-mountain flex items-center gap-2">
              <svg className="w-6 h-6 text-saffron" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.989-2.386l-.548-.547z" /></svg>
              Future Aspects
            </h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex gap-2"><span>•</span> AR-based Temple Guides for historical storytelling.</li>
              <li className="flex gap-2"><span>•</span> Blockchain-based verified bookings for local homestays.</li>
              <li className="flex gap-2"><span>•</span> Carbon footprint tracking for eco-conscious trekking.</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="text-center py-12">
        <p className="text-gray-400 text-xs">Developed with passion for Uttarakhand • © 2025 Teerthlok</p>
      </div>
    </div>
  );
};

export default About;
