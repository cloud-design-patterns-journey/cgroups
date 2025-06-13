import { StockItemModel } from '../../models';
import { SuccessResponse } from './stock-items.service';

export abstract class StockItemsApi {
    abstract listStockItems(userId: string): Promise<StockItemModel[]>;
    abstract createStockItem(userId: string, name: string, manufacturer: string, price: number, stock: number): Promise<SuccessResponse>;

}
