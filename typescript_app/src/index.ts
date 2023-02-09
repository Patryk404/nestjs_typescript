/// <reference types="@types/google.maps" />
import { User } from "./User";
import { Company } from "./Company";
import { CustomMap } from "./Map";

const user = new User(); 

console.log(user); 

const company = new Company();

// console.log(company);

 
const map = new CustomMap("map");
map.addMarker(user);
map.addMarker(company);
 

