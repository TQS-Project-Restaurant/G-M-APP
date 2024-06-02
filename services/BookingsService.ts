import client from "./client";

const BookingsService = {
    async confirm(id:number){
        return await client.put(`/bookings/confirm/${id}`)
    },
    async cancel(id:number){
        return await client.put(`/bookings/confirm/${id}`)
    },
    async getBookings(){
        return await client.get(`/bookings/pending`)
    }
}

export default BookingsService;