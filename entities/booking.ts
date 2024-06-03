export default interface Booking{
    id:number,
    utilizador:{
        email:string,
    },
    quantidadeMesas:number,
    status:number,
    dia:string,
    hora:string,
}