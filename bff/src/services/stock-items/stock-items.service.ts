import { Injectable } from '@nestjs/common';
import { StockItemsApi } from './stock-items.api';
import { StockItemModel } from '../../models';
import { get } from 'superagent';
import { ConfigService } from '@nestjs/config';

class StockItem {
    'id'?: string;
    'manufacturer'?: string;
    'picture'?: string;
    'name'?: string;
    'price'?: number;
    'stock'?: number;
}

@Injectable()
export class StockItemsService implements StockItemsApi {
    constructor(private configService: ConfigService) { }

    async listStockItems(): Promise<StockItemModel[]> {
        const serviceUrl = this.configService.get<string>('SERVICE_URL');
        return new Promise((resolve, reject) => {
            get(`${serviceUrl}/stock-items`)
                .set('Accept', 'application/json')
                .then(res => {
                    resolve(this.mapStockItems(res.body));
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    mapStockItems(data: StockItem[]): StockItemModel[] {
        return data.map(this.mapStockItem);
    }

    mapStockItem(item: StockItem): StockItemModel {
        return {
            id: item.id,
            name: item.name,
            stock: item.stock,
            unitPrice: item.price,
            picture: item.picture ?? 'https://via.placeholder.com/32.png',
            manufacturer: item.manufacturer,
        };
    }
}
