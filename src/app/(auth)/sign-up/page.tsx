import { constructMetadata } from "@/lib/metadata";
import { SignUpCard } from "../../../components/auth/sign-up-card";

export const metadata = constructMetadata({
  title: "Sign Up",
  description: "Create your DevFlow AI account.",
});

export default function SignUpPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] py-10 flex items-center justify-center">
      <SignUpCard />
    </div>
  );
}
