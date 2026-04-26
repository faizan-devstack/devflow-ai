import { constructMetadata } from "@/lib/metadata";
import { ResetPasswordCard } from "@/components/auth/reset-password-card";

export const metadata = constructMetadata({
  title: "Reset Password",
  description: "Set a new password for your DevFlow AI account.",
});

export default function ResetPasswordPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] py-10 flex items-center justify-center">
      <ResetPasswordCard />
    </div>
  );
}
