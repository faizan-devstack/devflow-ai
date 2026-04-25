import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Onboarding",
  noIndex: true,
});

export default function OnboardingPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-canvas-text-contrast">Onboarding</h1>
      <p className="text-canvas-text mt-4">Onboarding content coming soon...</p>
    </div>
  );
}
