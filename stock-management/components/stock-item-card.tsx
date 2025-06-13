import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface StockItemCardProps {
  id: string
  name: string
  manufacturer: string
  picture: string
  stock: number
  unitPrice: number
}

export function StockItemCard({ id, name, manufacturer, picture, stock, unitPrice }: StockItemCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-square">
        <Image src={picture || "/placeholder.svg?height=300&width=300"} alt={name} fill className="object-cover" />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{name}</CardTitle>
        <p className="text-sm text-muted-foreground">{manufacturer}</p>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">${unitPrice.toFixed(2)}</span>
          <Badge variant={stock <= 5 ? "destructive" : "outline"}>{stock} in stock</Badge>
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <div className="text-xs text-muted-foreground">ID: {id}</div>
      </CardFooter>
    </Card>
  )
}
