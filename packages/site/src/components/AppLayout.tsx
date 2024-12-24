import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/AppSidebar'
import { ModeToggle } from '@/components/ModeToggle.tsx'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1">
          {/* Header */}
          <header className="w-full px-4 pt-4">
            <div className="flex h-14 items-center justify-between">
              <SidebarTrigger className="rounded-md p-2 hover:bg-accent hover:text-accent-foreground" />
              <ModeToggle />
            </div>
          </header>

          {/* Content */}
          <div className="container mx-auto max-w-screen-2xl">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  )
}
