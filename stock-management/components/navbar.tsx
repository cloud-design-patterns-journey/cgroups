"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Package2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span>Stock Manager</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link
                href="/"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === "/" ? "text-primary" : "text-muted-foreground",
                )}
              >
                Home
              </Link>
              <Link
                href="/stock"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === "/stock" ? "text-primary" : "text-muted-foreground",
                )}
              >
                Stock Items
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
