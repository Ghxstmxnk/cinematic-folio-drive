import { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import PerformanceDashboard from '../components/PerformanceDashboard';
import RaceTrackProjects from '../components/RaceTrackProjects';
import PitStopContact from '../components/PitStopContact';
import Footer from '../components/Footer';

const Index = () => {
  useEffect(() => {
    // Set dark mode by default for Ferrari luxury aesthetic
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <main>
        <HeroSection />
        <PerformanceDashboard />
        <RaceTrackProjects />
        <PitStopContact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
