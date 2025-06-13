"use client"

import type React from "react"

import { useState } from "react"
import { StockItemsTable } from "@/components/stock-items-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"

export default function StockPage() {
  const [userId, setUserId] = useState("default-user")
  const [inputUserId, setInputUserId] = useState("default-user")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setUserId(inputUserId)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Stock Items</h1>
        <Link href="/stock/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        </Link>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>User Selection</CardTitle>
          <CardDescription>Enter a user ID to view their stock items</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex gap-4">
            <Input
              value={inputUserId}
              onChange={(e) => setInputUserId(e.target.value)}
              placeholder="Enter user ID"
              className="max-w-sm"
            />
            <Button type="submit">Load Items</Button>
          </form>
        </CardContent>
      </Card>

      <StockItemsTable userId={userId} />
    </main>
  )
}
