export interface SignUp {
    Name:string,
    Email:string,
    Password:string
}

export interface Login {
    Email:string,
    Password:string
}

export interface AddProduct {
    Name:string,
    Price:number,
    Color:string,
    Category:string,
    Description:string,
    ImageUrl:string
}

export interface UpdateProduct {
    id:number,
    Name:string,
    Price:number,
    Color:string,
    Category:string,
    Description:string,
    ImageUrl:string
}

export interface Product {
    id:number,
    Name:string,
    Price:number,
    Color:string,
    Category:string,
    Description:string,
    ImageUrl:string,
    quantity:undefined|number
}
export interface Cart {
    id:number|undefined,
    Name:string,
    Price:number,
    Color:string,
    Category:string,
    Description:string,
    ImageUrl:string,
    quantity:undefined|number,
    userId:number,
    productId:number|undefined
}

export interface priceSummary {
    amount:number|undefined;
    tax:number|undefined;
    delivery:number|undefined;
    discount:number|undefined;
    total:number|undefined
}

export interface Order {
    email:string,
    address:string,
    contact:string,
    price:number,
    userId:number
}