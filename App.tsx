
import React, { useState } from 'react';
import Layout from './components/Layout';
import AICompanion from './components/AICompanion';
import Home from './pages/Home';
import Explore from './pages/Explore';
import VirtualTours from './pages/VirtualTours';
import TripPlanner from './pages/TripPlanner';
import Community from './pages/Community';
import Maps from './pages/Maps';
import About from './pages/About';
import { ViewState } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewState>('home');

  const renderView = () => {
    switch (activeView) {
      case 'home':
        return <Home onViewChange={setActiveView} />;
      case 'explore':
        return <Explore />;
      case 'vr':
        return <VirtualTours />;
      case 'planner':
        return <TripPlanner />;
      case 'community':
        return <Community />;
      case 'maps':
        return <Maps />;
      case 'about':
        return <About />;
      default:
        return <Home onViewChange={setActiveView} />;
    }
  };

  return (
    <div className="font-sans antialiased text-gray-900 bg-snow">
      <Layout activeView={activeView} onViewChange={setActiveView}>
        {renderView()}
      </Layout>
      <AICompanion />
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
