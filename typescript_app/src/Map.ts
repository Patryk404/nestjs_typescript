import { Company } from "./Company";
import { User } from "./User";

export interface Mappable {
    location: {
        lat: number;
        lng: number;
    },
    markerContent(): string;
}
 
export class CustomMap {
    private map: google.maps.Map;
    // public markers
    constructor(name: string)
    {
        this.map = new google.maps.Map(document.getElementById(name) as HTMLElement,{
            zoom: 1,
            center: { 
                lat: 0,
                lng: 0
            }
        })
    }


    addMarker(instance: Mappable): void {
        const marker = new google.maps.Marker({
            map: this.map,
            position: {
                ...instance.location
            }
        });

        marker.addListener('click',()=>{
            const infoWindow = new google.maps.InfoWindow({
                content: instance.markerContent()
            });
            infoWindow.open(this.map,marker);
        });        
    }


};