"use client"

import { useQuery } from "@apollo/client"
import { HELLO_WORLD_QUERY } from "@/lib/graphql/queries"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function Greeting() {
  const { data, loading, error } = useQuery(HELLO_WORLD_QUERY)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && <Skeleton className="h-8 w-[250px]" />}
        {error && <div className="text-destructive">Error loading greeting: {error.message}</div>}
        {data && <p className="text-2xl font-semibold">{data.helloWorld.greeting}</p>}
      </CardContent>
    </Card>
  )
}
