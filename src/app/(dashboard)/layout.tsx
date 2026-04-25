import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Header from "@/components/layout/header/header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="flex-1 w-full flex flex-col">
      {/* 
        Note: The Header component is already rendered globally in src/app/layout.tsx.
        To avoid rendering two headers on the dashboard, it is commented out here.
        If you want the Header exclusively here, please remove it from RootLayout.
      */}
      {/* <Header /> */}
      {children}
    </div>
  );
}
