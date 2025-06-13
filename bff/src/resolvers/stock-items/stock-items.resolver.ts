import { Args, Query, Resolver } from "@nestjs/graphql";

import { StockItem, StockItemModel } from "../../models";
import { StockItemsApi } from "../../services";

@Resolver(of => StockItem)
export class StockItemResolver {
    constructor(private readonly service: StockItemsApi) { }

    @Query(() => [StockItem])
    async stockItems(@Args('userId', { type : () => String }) userId: string): Promise<StockItemModel[]> {
        return this.service.listStockItems(userId);
    }
}
