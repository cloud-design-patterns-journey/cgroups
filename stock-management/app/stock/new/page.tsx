"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CreateStockItemForm } from "@/components/create-stock-item-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewStockItemPage() {
  const router = useRouter()
  const [userId, setUserId] = useState("default-user")
  const [inputUserId, setInputUserId] = useState("default-user")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setUserId(inputUserId)
  }

  const handleSuccess = () => {
    router.push("/stock")
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/stock" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Add New Stock Item</h1>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>User Selection</CardTitle>
          <CardDescription>Enter a user ID to associate with this stock item</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex gap-4">
            <Input
              value={inputUserId}
              onChange={(e) => setInputUserId(e.target.value)}
              placeholder="Enter user ID"
              className="max-w-sm"
            />
            <Button type="submit">Set User</Button>
          </form>
        </CardContent>
      </Card>

      <CreateStockItemForm userId={userId} onSuccess={handleSuccess} onCancel={() => router.push("/stock")} />
    </main>
  )
}
