"use client"

import type React from "react"

import { ApolloProvider } from "@apollo/client"
import { ThemeProvider } from "@/components/theme-provider"
import { getApolloClient } from "@/lib/apollo-client"

export function Providers({ children }: { children: React.ReactNode }) {
  const client = getApolloClient()

  return (
    <ApolloProvider client={client}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </ApolloProvider>
  )
}
