export default interface Booking{
    id:number,
    bebidas:Array<Comida>,
    pratos:Array<Comida>,
    dia:string,
}

export interface Comida{
    id:number,
    nome:string,
    preco:string,
}

export interface QtComida{
    id:number,
    nome:string,
    quantity:number,
}