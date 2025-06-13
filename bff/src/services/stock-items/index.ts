import {Provider} from "@nestjs/common";

import { StockItemsApi } from './stock-items.api';
import { StockItemsMockService } from './stock-items-mock.service';
import { StockItemsService } from './stock-items.service';

export { StockItemsMockService, StockItemsApi, StockItemsService };

export const provider: Provider = {
    provide: StockItemsApi,
    useClass: StockItemsService,
};
