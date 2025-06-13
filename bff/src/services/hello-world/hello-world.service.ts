import { Injectable } from '@nestjs/common';
import {HelloWorldApi} from "./hello-world.api";
import {GreetingModel} from "../../models";

@Injectable()
export class HelloWorldService implements HelloWorldApi {
    async fetchRandomNames(count: number = 1): Promise<string[]> {
    try {
        const response = await fetch(`https://randomuser.me/api/?inc=name&noinfo&results=${count}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.results.map(user => `${user.name.first} ${user.name.last}`);
    } catch (error) {
        console.error('Error fetching random names:', error);
        return [];
    }
}
  async getHello(): Promise<GreetingModel> {


    return {greeting: this.fetchRandomNames(1)[0]};
  }
}
