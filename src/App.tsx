import React, { useState, useEffect } from 'react';
import NewLandingPage from './components/NewLandingPage';
import LandingPage from './components/LandingPage';
import InteractiveSpaceWeatherElements from './components/InteractiveSpaceWeatherElements';
import PredictionPage from './components/PredictionPage';
import StarField from './components/StarField';
import InteractiveDamageSimulator from './components/InteractiveDamageSimulator';
import AuroraPainter from './components/AuroraPainter';
import DetailedImpactPage from './components/DetailedImpactPage';

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [selectedCharacterForDetails, setSelectedCharacterForDetails] = useState<{id: string, name: string, emoji: string} | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const navigateToPage = (page: number) => {
    if (page === currentPage) return;
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentPage(page);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 300);
  };

  const navigateToDetailsPage = (character: {id: string, name: string, emoji: string}) => {
    setSelectedCharacterForDetails(character);
    navigateToPage(6);
  };

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  const handleVideoError = () => {
    setVideoError(true);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 0:
        return <NewLandingPage onExplore={() => navigateToPage(1)} />;
      case 1:
        return <LandingPage onNext={() => navigateToPage(2)} onSkipToElements={() => navigateToPage(2)} />;
      case 2:
        return <InteractiveSpaceWeatherElements onNext={() => navigateToPage(3)} />;
      case 3:
        return <InteractiveDamageSimulator selectedCharacter={null} onNext={() => navigateToPage(4)} onBack={() => navigateToPage(2)} onLearnMore={navigateToDetailsPage} />;
      case 4:
        return <AuroraPainter onNext={() => navigateToPage(5)} />;
      case 5:
        return <PredictionPage onBack={() => navigateToPage(0)} />;
      case 6:
        return <DetailedImpactPage onBack={() => navigateToPage(3)} onNext={() => navigateToPage(4)} selectedCharacter={selectedCharacterForDetails} />;
      default:
        return <NewLandingPage onExplore={() => navigateToPage(1)} />;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Video Background */}
      <video
        className="fixed inset-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={handleVideoLoad}
        onError={handleVideoError}
        style={{ 
          display: videoError ? 'none' : 'block',
          opacity: 0.6
        }}
      >
        <source src="/Video/225937.mp4" type="video/mp4" />
      </video>
      
      {/* Fallback Animated Space Background - shown if video fails or hasn't loaded */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          display: videoError || !videoLoaded ? 'block' : 'none',
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 40% 80%, rgba(120, 219, 226, 0.2) 0%, transparent 50%),
            linear-gradient(135deg, 
              #0f0f23 0%, 
              #1a1a2e 25%, 
              #16213e 50%, 
              #0f3460 75%, 
              #533483 100%
            )
          `,
          animation: 'backgroundShift 20s ease-in-out infinite'
        }}
      />
      
      {/* Animated stars overlay */}
      <div 
        className="fixed inset-0 z-0 opacity-60"
        style={{
          background: `
            radial-gradient(2px 2px at 20px 30px, #eee, transparent),
            radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
            radial-gradient(1px 1px at 90px 40px, #fff, transparent),
            radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
            radial-gradient(2px 2px at 160px 30px, #ddd, transparent)
          `,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 100px',
          animation: 'twinkle 4s ease-in-out infinite alternate'
        }}
      />
      
      {/* Enhanced Black Mask Overlay for better contrast and readability */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-10"></div>
      
      {/* Additional gradient mask for depth */}
      <div className="fixed inset-0 z-10" style={{
        background: `
          linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.4) 100%),
          radial-gradient(ellipse at center, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%)
        `
      }}></div>
      
      <StarField />
      
      {/* Enhanced Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-space-blue via-purple-900 to-indigo-900 bg-opacity-95">
          <div className="relative">
            {/* Outer rotating ring */}
            <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-stellar-gold opacity-80"></div>
            {/* Inner pulsing circle */}
            <div className="absolute inset-0 animate-pulse rounded-full h-24 w-24 border-4 border-blue-400 opacity-40"></div>
            {/* Center dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 bg-stellar-gold rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="mt-8 text-stellar-gold text-xl font-semibold animate-pulse">
            Loading Stellar X...
          </div>
          <div className="mt-2 text-white text-sm opacity-70 animate-fadeInUp">
            Preparing your space journey
          </div>
        </div>
      )}
      
      {/* Page Transition Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-40 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 opacity-90 animate-fadeIn"></div>
      )}
      
      <div className={`relative z-20 transition-all duration-700 ease-in-out ${
        isLoading ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
      } ${
        isTransitioning ? 'opacity-0 transform translate-y-8' : 'opacity-100 transform translate-y-0'
      }`}>
        <div className="animate-slideInUp">
          {renderCurrentPage()}
        </div>
      </div>
      
      {/* Enhanced Navigation dots */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3 animate-slideInUp">
        {[0, 1, 2, 3, 4, 5].map((page) => (
          <button
            key={page}
            onClick={() => navigateToPage(page)}
            className={`relative w-3 h-3 rounded-full transition-all duration-500 transform hover:scale-150 ${
              currentPage === page
                ? 'bg-stellar-gold scale-125 shadow-lg shadow-stellar-gold/50'
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          >
            {currentPage === page && (
              <div className="absolute inset-0 rounded-full bg-stellar-gold animate-ping opacity-75"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;