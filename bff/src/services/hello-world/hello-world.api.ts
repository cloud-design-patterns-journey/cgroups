import {GreetingModel} from "../../models";

export abstract class HelloWorldApi {
    abstract fetchRandomNames(count: number): Promise<string[]>
    abstract getHello(): Promise<GreetingModel>
}
