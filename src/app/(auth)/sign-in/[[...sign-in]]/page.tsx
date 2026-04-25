import { constructMetadata } from "@/lib/metadata";
import SignInClient from "./sign-in-client";

export const metadata = constructMetadata({
  title: "Sign In",
  noIndex: true,
});

export default function SignInPage() {
  return <SignInClient />;
}
