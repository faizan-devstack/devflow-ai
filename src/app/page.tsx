import HeroSection from "@/components/landing/HeroSection";
import WaveDivider from "@/components/animations/WaveDivider";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import FAQAndCTA from "@/components/landing/FAQAndCTA";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <WaveDivider />
      <FeaturesSection />
      <HowItWorksSection />
      <FAQAndCTA />
    </main>
  );
}
