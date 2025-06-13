import { Field, ObjectType } from "@nestjs/graphql";

export interface StockItemModel {
    id: string;
    name: string;
    stock: number;
    unitPrice: number;
    manufacturer: string;
    picture: string;
}

@ObjectType({ description: 'stock-item' })
export class StockItem implements StockItemModel {
    @Field()
    id: string;
    @Field()
    name: string;
    @Field()
    stock: number;
    @Field()
    unitPrice: number;
    @Field()
    manufacturer: string;
    @Field()
    picture: string;
}
