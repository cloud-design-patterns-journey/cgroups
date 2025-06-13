import {NotFoundException} from "@nestjs/common";
import {Query, Resolver} from "@nestjs/graphql";

import {Greeting, GreetingModel} from "../../models";
import {HelloWorldApi} from "../../services";

function randomName() {
  const names = ["John", "Jane", "Jim", "Joe", "Jack", "Jill", "Bob", "Bill", "Steve", "Kate", "Sarah", "Lisa", "Anna", "Michael", "Robert"];
  return names[Math.floor(Math.random() * names.length)];
}

@Resolver(of => Greeting)
export class HelloWorldResolver {
    constructor(private readonly service: HelloWorldApi) {}

    @Query(returns => Greeting)
    async helloWorld(): Promise<GreetingModel> {
        const greeting = await this.service.getHello();
        if (!greeting) {
            throw new NotFoundException();
        }
        return {
          greeting: randomName()
        };
    }
}
