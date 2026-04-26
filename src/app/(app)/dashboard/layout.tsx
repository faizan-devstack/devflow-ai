import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/layout/dashboard/dashboard-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-canvas-base">
        <DashboardSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto p-6 md:p-8">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
