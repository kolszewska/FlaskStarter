export class UserTokenPair {
    email: string;
    token: string;

    constructor(email:string, token: string) {
        this.email = email;
        this.token = token;
    }
  }

export class Product {
    id: number;
    manufacturer_name: string;
    model_name: string;
    price: number;
    quantity: number;
}
