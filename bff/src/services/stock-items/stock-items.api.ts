import { StockItemModel } from '../../models';

export abstract class StockItemsApi {
    abstract listStockItems(userId: string): Promise<StockItemModel[]>;
}
