import { Query, Resolver } from "@nestjs/graphql";

import { StockItem, StockItemModel } from "../../models";
import { StockItemsApi } from "../../services";

@Resolver(of => StockItem)
export class StockItemResolver {
    constructor(private readonly service: StockItemsApi) { }

    @Query(returns => [StockItem])
    async stockItems(): Promise<StockItemModel[]> {
        return this.service.listStockItems();
    }
}
