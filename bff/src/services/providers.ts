import { Provider } from "@nestjs/common";
import { provider as helloWorldProvider } from "./hello-world";
import { StockItemsMockService, StockItemsApi, provider as stockItemsProvider } from "./stock-items";

export * from './hello-world';

export const providers: Provider[] = [helloWorldProvider, stockItemsProvider];
export { StockItemsApi, StockItemsMockService };
