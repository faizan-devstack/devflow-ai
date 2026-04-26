import { constructMetadata } from "@/lib/metadata";
import { ForgotPasswordCard } from "../../../components/auth/forgot-password-card";

export const metadata = constructMetadata({
  title: "Forgot Password",
  description: "Reset your DevFlow AI account password.",
});

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] py-10 flex items-center justify-center">
      <ForgotPasswordCard />
    </div>
  )
};