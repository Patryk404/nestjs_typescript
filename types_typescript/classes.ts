class Vehicle {
    constructor(public color : string){ // so we have color property in class 
        this.color = color;
    }

    protected honk(): void {
        console.log("beep");
    }
}

const vehicle = new Vehicle('orange'); 
console.log(vehicle.color);

class Elo extends Vehicle { 
    constructor(public wheels: number,color: string){
        super(color);
        this.wheels = wheels;
    }
    private drive(): void { 
        console.log("chugga chugga");
    }

    startDrivingProcess(): void {
        this.drive();
        this.honk();
    }
}

const elo = new Elo(4,"red");