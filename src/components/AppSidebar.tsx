import { Home, BookOpen, Github, Search, Database, Brain, Cpu, Code, ChevronRight, Zap, Clock, CheckCircle2, ArrowUpDown, Search as SearchIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarInput,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useEffect, useState } from "react"

interface SubItem {
  label: string;
  href: string;
}

interface TopicItem {
  label: string;
  icon: any;
  subitems?: SubItem[];
}

interface Topic {
  title: string;
  icon: any;
  items: TopicItem[];
}

export function AppSidebar() {
  const [currentPath, setCurrentPath] = useState<string>('');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const topics: Topic[] = [
    {
      title: "Algorithms",
      icon: Code,
      items: [
        {
          label: "Searching",
          icon: SearchIcon,
          subitems: [
            {
              label: "Linear Search",
              href: "/algorithms/searching/linear-search",
            }
          ]
        },
        {
          label: "Sorting",
          icon: ArrowUpDown,
          subitems: [
            {
              label: "Bubble Sort",
              href: "/algorithms/sorting/bubble-sort",
            }
          ]
        }
      ]
    },
    {
      title: "Data Structures",
      icon: Database,
      items: []
    },
    {
      title: "Systems",
      icon: Cpu,
      items: []
    },
    {
      title: "AI & Math",
      icon: Brain,
      items: []
    },
  ];

  return (
    <TooltipProvider>
      <Sidebar>
        <SidebarContent className="flex flex-col h-full">
          {/* Header with Search */}
          <SidebarHeader>
            <div className="px-3 py-2">
              <h2 className="mb-4 px-2 text-lg font-semibold tracking-tight">Mazhar Lab</h2>
              <div className="space-y-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={currentPath === "/" ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      asChild
                    >
                      <a href="/">
                        <Home className="mr-2 h-4 w-4" />
                        Home
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Return to home page (⌘ H)</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </SidebarHeader>
          
          <Separator className="my-2" />

          {/* Scrollable Topics */}
          <div className="flex-1">
            <ScrollArea className="h-[calc(100vh-380px)]">
              <div className="px-3 py-2">
                <div className="flex items-center justify-between px-4 mb-2">
                  <h2 className="text-lg font-semibold tracking-tight">Topics</h2>
                </div>
                <div className="space-y-4">
                  {topics.map((section) => (
                    <div key={section.title} className="space-y-2">
                      {/* Main category header - not clickable */}
                      <div className="px-4 text-sm font-semibold flex items-center text-foreground/70 uppercase tracking-wider">
                        <section.icon className="mr-2 h-4 w-4" />
                        {section.title}
                      </div>
                      <div className="space-y-1">
                        {section.items.map((item, idx) => (
                          <div key={idx}>
                            {/* Subcategory header - not clickable */}
                            <div className="flex ml-4 items-center px-4 py-1.5 text-sm text-foreground/60">
                              <item.icon className="mr-2 h-4 w-4" />
                              <span className="truncate text-[13px]">{item.label}</span>
                            </div>
                            {item.subitems && (
                              <div className="ml-6 space-y-1">
                                {item.subitems.map((subitem) => (
                                  <Tooltip key={subitem.href}>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant={currentPath === subitem.href ? "secondary" : "ghost"}
                                        className={cn(
                                          "w-full justify-start text-sm transition-colors",
                                          currentPath === subitem.href
                                            ? "text-primary font-medium"
                                            : "text-muted-foreground hover:text-foreground",
                                          "group px-4 py-2 h-auto"
                                        )}
                                        asChild
                                      >
                                        <a href={subitem.href}>
                                          <ChevronRight className="mr-2 h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                                          <span className="truncate">{subitem.label}</span>
                                        </a>
                                      </Button>
                                    </TooltipTrigger>
                                  </Tooltip>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </div>

          {/* Fixed Footer */}
          <div className="mt-auto">
            <Separator className="my-2" />
            <div className="px-3 py-2">
              <div className="flex items-center px-4 justify-between">
                <h2 className="text-sm font-medium text-muted-foreground">Links</h2>
              </div>
              <div className="mt-2 space-y-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start hover:bg-accent transition-colors"
                      asChild
                    >
                      <a href="https://github.com/mazharmorshed/mazhar-lab" target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View source code on GitHub</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </SidebarContent>
      </Sidebar>
    </TooltipProvider>
  )
}
