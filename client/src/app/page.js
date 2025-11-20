"use client"
import * as React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { Sparkles } from "lucide-react"
import EmblaCarousel from "@/components/EmblaCarousel"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { useSearchParams } from "next/navigation"

export default function Home() {
  const searchParams = useSearchParams()
  const username = searchParams.get("username")
  const OPTIONS = { dragFree: true, loop: true }
  const SLIDE_COUNT = 5
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* ─── Top Header Bar ─────────────────────────────────────── */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4 shadow-sm">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-6 mx-2" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* ─── Main Content Section ───────────────────────────────── */}
        <main className="flex-1 p-6 bg-gradient-to-b from-slate-50 to-white">
          {/* Welcome Card */}
          <Card className="mb-6 rounded-2xl shadow-md bg-white border p-6 flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold">
                Welcome back, {username || "User"} 👋
              </CardTitle>
              <p className="text-gray-500 mt-1 text-sm">
                Glad to see you again! Let’s make today productive.
              </p>
            </div>
            <Sparkles className="h-10 w-10 text-indigo-500" />
          </Card>

          {/* Carousel Section */}
          <section className="max-w-5xl mx-auto">
            <div className="rounded-xl shadow-sm border bg-white p-4">
              <EmblaCarousel slides={SLIDES} options={OPTIONS} />
            </div>
          </section>
          
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
