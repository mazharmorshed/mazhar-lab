import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { ModeToggle } from '@/components/ModeToggle.tsx';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1">
          {/* Header */}
          <header className="w-full px-4 pt-4">
            <div className="flex h-14 items-center justify-between">
              <SidebarTrigger className="hover:bg-accent hover:text-accent-foreground p-2 rounded-md" />
              <ModeToggle />
            </div>
          </header>

          {/* Content */}
          <div className="container max-w-screen-2xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}