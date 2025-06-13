import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function DashboardIntro() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock Management</CardTitle>
        <CardDescription>View and manage your inventory items</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          This dashboard allows you to view all stock items in your inventory. You can check stock levels, prices, and
          product details.
        </p>
      </CardContent>
      <CardFooter>
        <Link href="/stock">
          <Button>
            View Stock Items
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
