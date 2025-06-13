"use client"

import { useQuery } from "@apollo/client"
import { STOCK_ITEMS_QUERY } from "@/lib/graphql/queries"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface StockItem {
  id: string
  manufacturer: string
  name: string
  picture: string
  stock: number
  unitPrice: number
}

interface StockItemsTableProps {
  userId: string
}

export function StockItemsTable({ userId }: StockItemsTableProps) {
  const { data, loading, error } = useQuery(STOCK_ITEMS_QUERY, {
    variables: { userid: userId },
    skip: !userId,
  })

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load stock items: {error.message}</AlertDescription>
      </Alert>
    )
  }

  return (
    <Card>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Manufacturer</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="text-right">Unit Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading &&
              Array(5)
                .fill(0)
                .map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="h-12 w-12 rounded-md" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[250px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[180px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[60px] ml-auto" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[80px] ml-auto" />
                    </TableCell>
                  </TableRow>
                ))}

            {data?.stockItems.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No stock items found for this user.
                </TableCell>
              </TableRow>
            )}

            {data?.stockItems.map((item: StockItem) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="relative h-12 w-12 rounded-md overflow-hidden">
                    <Image
                      src={item.picture || "/placeholder.svg?height=48&width=48"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.manufacturer}</TableCell>
                <TableCell className="text-right">
                  <span className={`${item.stock <= 5 ? "text-destructive" : ""}`}>{item.stock}</span>
                </TableCell>
                <TableCell className="text-right">${item.unitPrice.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}
