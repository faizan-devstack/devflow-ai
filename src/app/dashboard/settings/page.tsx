import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SettingsClient } from "./settings-client";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Settings",
  noIndex: true,
});

export default async function SettingsPage() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const initials = (
    (user.firstName?.[0] ?? "") + (user.lastName?.[0] ?? "")
  ).toUpperCase() || user.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() || "U";

  const memberSince = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 w-full">
      <h1 className="text-2xl font-semibold text-canvas-text-contrast mb-8">
        Account Settings
      </h1>

      {/* Section A: Profile Info */}
      <div className="bg-canvas-bg-subtle border border-canvas-border/50 rounded-xl p-6 mb-8 flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-primary-bg text-primary-text text-2xl font-semibold flex items-center justify-center border border-canvas-border/50 shrink-0">
          {initials}
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold text-canvas-text-contrast">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-canvas-text text-sm mb-1">
            {user.primaryEmailAddress?.emailAddress}
          </p>
          <p className="text-canvas-text text-xs opacity-80">
            Member since {memberSince}
          </p>
        </div>
      </div>

      {/* Section B: Account Management */}
      <SettingsClient 
        firstName={user.firstName ?? ""}
        lastName={user.lastName ?? ""}
        email={user.primaryEmailAddress?.emailAddress ?? ""}
      />
    </div>
  );
}
