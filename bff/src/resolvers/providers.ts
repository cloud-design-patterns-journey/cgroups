import { Provider } from "@nestjs/common";
import { HelloWorldResolver } from "./hello-world";
import { StockItemResolver } from "./stock-items";

export * from './hello-world';
export * from './stock-items';

export const providers: Provider[] = [HelloWorldResolver, StockItemResolver]
