import client from "./client";

const reservasService = {
    async makeReserva(data:any){
       return await client.post("/requests",data);
    },
    async getRequests(){
        return await client.get("/requests")
    },
    async updateRequest(id:number,request:any){
        return await client.put(`/requests/${id}`,request)
    }
}

export default reservasService;