"use client"

import { useState } from "react"
import { useMutation } from "@apollo/client"
import { CREATE_STOCK_ITEM_MUTATION, STOCK_ITEMS_QUERY } from "@/lib/graphql/queries"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  manufacturer: z.string().min(2, {
    message: "Manufacturer must be at least 2 characters.",
  }),
  picture: z.string().url({
    message: "Please enter a valid URL for the picture.",
  }),
  stock: z.coerce.number().positive({
    message: "Stock must be a positive number.",
  }),
  unitPrice: z.coerce.number().positive({
    message: "Unit price must be a positive number.",
  }),
})

type FormValues = z.infer<typeof formSchema>

interface CreateStockItemFormProps {
  userId: string
  onSuccess?: () => void
  onCancel?: () => void
}

export function CreateStockItemForm({ userId, onSuccess, onCancel }: CreateStockItemFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [createStockItem] = useMutation(CREATE_STOCK_ITEM_MUTATION, {
    refetchQueries: [{ query: STOCK_ITEMS_QUERY, variables: { userId: userId } }],
    onCompleted: () => {
      toast({
        title: "Stock item created",
        description: "Your new stock item has been successfully created.",
      })
      if (onSuccess) onSuccess()
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to create stock item: ${error.message}`,
      })
      setIsSubmitting(false)
    },
  })

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      manufacturer: "",
      picture: "https://source.unsplash.com/random/300x300/?product",
      stock: 0,
      unitPrice: 0,
    },
  })

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true)
    try {
      await createStockItem({
        variables: {
          input: {
            ...values,
            userId: userId,
          },
        },
      })
    } catch (error) {
      // Error is handled by the mutation's onError
      console.error("Error submitting form:", error)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Stock Item</CardTitle>
        <CardDescription>Create a new item in your inventory</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Product name" {...field} />
                  </FormControl>
                  <FormDescription>The name of your product.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="manufacturer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Manufacturer</FormLabel>
                  <FormControl>
                    <Input placeholder="Manufacturer name" {...field} />
                  </FormControl>
                  <FormDescription>The manufacturer of the product.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="picture"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Picture URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.jpg" {...field} />
                  </FormControl>
                  <FormDescription>A URL to an image of the product.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="1" {...field} />
                    </FormControl>
                    <FormDescription>Number of items in stock.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="unitPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit Price ($)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="0.01" {...field} />
                    </FormControl>
                    <FormDescription>Price per unit in dollars.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end space-x-4 pt-4">
              {onCancel && (
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
              )}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Item
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
