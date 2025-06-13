import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { StockItem, StockItemModel } from "../../models";
import { StockItemsApi } from "../../services";
import { StockItemInput } from "./stock-items.input";

@Resolver(of => StockItem)
export class StockItemResolver {
  constructor(private readonly service: StockItemsApi) { }

  @Query(() => [StockItem])
  async stockItems(@Args('userId', { type: () => String }) userId: string): Promise<StockItemModel[]> {
    return this.service.listStockItems(userId);
  }
  @Mutation(() => StockItem)
  async stockItem(@Args('stockItemInput', { type: () => StockItemInput }) stockItemInput: StockItemInput): Promise<StockItemModel> {
    this.service.createStockItem(stockItemInput.userId, stockItemInput.name, stockItemInput.manufacturer, stockItemInput.unitPrice, stockItemInput.stock);
    return {
      name: "zulu",
      manufacturer: "zulu",
      unitPrice: 100,
      stock: 100,
      id: "zulu",
      picture: "zulu",
    }
  }

}
