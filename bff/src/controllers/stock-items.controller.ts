import { Controller, Get, HttpException } from '@nestjs/common';

import { StockItemsApi } from '../services';

@Controller('stock-items')
export class StockItemsController {
    constructor(private readonly service: StockItemsApi) { }

    @Get()
    async listStockItems(): Promise<any[]> {
        try {
            return await this.service.listStockItems();
        } catch (err) {
            throw new HttpException(err, 502);
        }
    }
}
