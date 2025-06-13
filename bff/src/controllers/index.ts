import { HelloWorldController } from './hello-world';
import { StockItemsController } from './stock-items.controller';

export * from './hello-world';
export * from './stock-items.controller';

export const controllers = [HelloWorldController, StockItemsController];
