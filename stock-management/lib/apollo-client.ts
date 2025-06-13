import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"

// Create Apollo Client instance that can be used throughout the app
export function createApolloClient() {
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "http://localhost:4000/graphql",
    }),
    cache: new InMemoryCache(),
  })
}

// Singleton pattern for client-side usage
let apolloClient: ApolloClient<any> | undefined

export function getApolloClient() {
  if (typeof window === "undefined") {
    // Server-side - create a new client for each request
    return createApolloClient()
  }

  // Client-side - reuse client
  if (!apolloClient) {
    apolloClient = createApolloClient()
  }

  return apolloClient
}
