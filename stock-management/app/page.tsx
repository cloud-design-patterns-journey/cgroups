import { Greeting } from "@/components/greeting"
import { DashboardIntro } from "@/components/dashboard-intro"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        <Greeting />
        <DashboardIntro />
      </div>
    </main>
  )
}
