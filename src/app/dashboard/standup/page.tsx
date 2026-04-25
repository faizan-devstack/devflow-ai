import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Standup",
  noIndex: true,
});

export default function StandupPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-canvas-text-contrast">Standup</h1>
      <p className="text-canvas-text mt-4">Standup content coming soon...</p>
    </div>
  );
}
