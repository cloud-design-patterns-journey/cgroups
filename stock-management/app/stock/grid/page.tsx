"use client"

import type React from "react"

import { useState } from "react"
import { useQuery } from "@apollo/client"
import { STOCK_ITEMS_QUERY } from "@/lib/graphql/queries"
import { StockItemCard } from "@/components/stock-item-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Plus } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"

interface StockItem {
  id: string
  manufacturer: string
  name: string
  picture: string
  stock: number
  unitPrice: number
}

export default function StockGridPage() {
  const [userId, setUserId] = useState("default-user")
  const [inputUserId, setInputUserId] = useState("default-user")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setUserId(inputUserId)
  }

  const { data, loading, error } = useQuery(STOCK_ITEMS_QUERY, {
    variables: { userid: userId },
    skip: !userId,
  })

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Stock Items</h1>
        <div className="flex items-center gap-4">
          <Tabs defaultValue="grid">
            <TabsList>
              <TabsTrigger value="table" asChild>
                <Link href="/stock">Table View</Link>
              </TabsTrigger>
              <TabsTrigger value="grid" asChild>
                <Link href="/stock/grid">Grid View</Link>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Link href="/stock/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </Link>
        </div>
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

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Failed to load stock items: {error.message}</AlertDescription>
        </Alert>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative aspect-square bg-muted animate-pulse" />
                <CardHeader className="p-4">
                  <div className="h-5 bg-muted animate-pulse rounded-md" />
                  <div className="h-4 bg-muted animate-pulse rounded-md w-3/4 mt-2" />
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-muted animate-pulse rounded-md w-16" />
                    <div className="h-6 bg-muted animate-pulse rounded-md w-20" />
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      ) : (
        <>
          {data?.stockItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No stock items found for this user.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {data?.stockItems.map((item: StockItem) => (
                <StockItemCard key={item.id} {...item} />
              ))}
            </div>
          )}
        </>
      )}
    </main>
  )
}
