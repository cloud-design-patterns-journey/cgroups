import { gql } from "@apollo/client"

export const HELLO_WORLD_QUERY = gql`
  query HelloWorld {
    helloWorld {
      greeting
    }
  }
`

export const STOCK_ITEMS_QUERY = gql`
  query StockItems($userid: String!) {
    stockItems(userId: $userid) {
      id
      manufacturer
      name
      picture
      stock
      unitPrice
    }
  }
`

export const CREATE_STOCK_ITEM_MUTATION = gql`
  mutation CreateStockItem($input: StockItemInput!) {
    stockItem(stockItemInput: $input) {
      id
      manufacturer
      name
      picture
      stock
      unitPrice
    }
  }
`
