import { constructMetadata } from "@/lib/metadata";
import AboutClient from "./about-client";

export const metadata = constructMetadata({
  title: "About",
  description: "Built for developers, by developers. Open source and free forever.",
});

export default function AboutPage() {
  return <AboutClient />;
}
