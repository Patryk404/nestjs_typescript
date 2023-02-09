import { faker } from "@faker-js/faker";
import { Mappable } from "./Map";

export class Company implements Mappable{ // helps us to find errors between interface and class
    companyName: string;
    catchPhrase: string;
    location: {
        lat: number;
        lng: number;
    }

    constructor(){
        this.companyName = faker.company.name();
        this.catchPhrase = faker.company.catchPhrase();
        this.location = {
            lat: parseFloat(faker.address.latitude()),
            lng: parseFloat(faker.address.longitude())
        }
    }

    markerContent():string{
        return `
            <div>
                <h1>Company Name: ${this.companyName}</h1>
                <h3>Catch Phrase: ${this.catchPhrase}</h3>
            </div>
        `;
    }

}