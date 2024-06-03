import client from "./client";

const reservasService = {
    async makeReserva(data:any){
       return await client.post("/requests",data);
    }
}

export default reservasService;