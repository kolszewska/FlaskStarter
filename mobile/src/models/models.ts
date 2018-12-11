export class UserTokenPair {
    email: string;
    token: string;

    constructor(email:string, token: string) {
        this.email = email;
        this.token = token;
    }
  }

export class Product {
    id: string;
    manufacturer_name: string;
    model_name: string;
    price: number;
    quantity: number;

    constructor(id: string, manufacturer_name: string, model_name: string, price: number, quantity: number ) {
        this.id = id;
        this.manufacturer_name = manufacturer_name;
        this.model_name = model_name;
        this.price = price;
        this.quantity = quantity;
    }
}
