
import { InputType, Field } from '@nestjs/graphql';


/*
 * manufacturer
  name
  picture
  stock
  unitPrice
*/
@InputType()
export class StockItemInput {
  @Field()
  userId: string;
  @Field()
  manufacturer: string;
  @Field()
  name: string;
  @Field()
  picture: string;
  @Field()
  stock: number;
  @Field()
  unitPrice: number;
}

