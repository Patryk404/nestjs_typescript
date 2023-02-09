import {faker} from "@faker-js/faker";
import { Mappable } from "./Map";

export class User implements Mappable{ // helps us to find errors between interface and class
    name: string; 
    location: {
        lat: number; 
        lng: number;
    }

    constructor(){
        this.name = faker.name.firstName();
        this.location = {
            lat:  parseFloat(faker.address.latitude()),
            lng: parseFloat(faker.address.longitude())
        };
    }
    markerContent():string {
        return `
        <div>
            <h1>Name: ${this.name}</h1>
        </div>
        `;
    };
}

