import { Injectable } from '@nestjs/common';
import { StockItemsApi } from './stock-items.api';
import { StockItemModel } from '../../models';

@Injectable()
export class StockItemsMockService implements StockItemsApi {
async listStockItems(): Promise<StockItemModel[]> {
        return [
            {
                id: "1",
                name: "Self-sealing stem bolt",
                stock: 10,
                unitPrice: 10.5,
                picture: "https://via.placeholder.com/32.png",
                manufacturer: "Bajor Galactic"
            },
            {
                id: "2",
                name: "Heisenberg compensator",
                stock: 20,
                unitPrice: 20.0,
                picture: "https://via.placeholder.com/32.png",
                manufacturer: "Federation Imports"
            },
            {
                id: "3",
                name: "Tooth sharpener",
                stock: 30,
                unitPrice: 5.25,
                picture: "https://via.placeholder.com/32.png",
                manufacturer: "Farenginar Exploits"
            }
        ];
    }
}
