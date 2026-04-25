import { constructMetadata } from "@/lib/metadata";
import SignUpClient from "./sign-up-client";

export const metadata = constructMetadata({
  title: "Get Started",
  noIndex: true,
});

export default function SignUpPage() {
  return <SignUpClient />;
}
