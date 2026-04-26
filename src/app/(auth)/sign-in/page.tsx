import { constructMetadata } from "@/lib/metadata";
import { SignInCard } from "@/components/auth/sign-in-card";

export const metadata = constructMetadata({
  title: "Sign In",
  description: "Sign in to your DevFlow AI account.",
});

export default function SignInPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] py-10 flex items-center justify-center">
      <SignInCard />
    </div>
  );
}
