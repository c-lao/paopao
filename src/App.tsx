import Header from './components/Header';
import Hero from './components/Hero';
import SocialApps from './components/SocialApps';
import Advantages from './components/Advantages';
import MultiPlatform from './components/MultiPlatform';
import Communication from './components/Communication';
import TranslationChannels from './components/TranslationChannels';
import UserReviews from './components/UserReviews';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div>
        <Hero />
        <SocialApps />
        <Advantages />
        <MultiPlatform />
        <Communication />
        <TranslationChannels />
        <UserReviews />
        <CTASection />
        <Footer />
      </div>
      <FloatingButtons />
    </div>
  );
}

export default App;
