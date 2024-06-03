import Booking from '@/entities/booking';
import BookingsService from '@/services/BookingsService';
import { useCallback, useEffect, useState } from 'react';
import { View,Text, Button } from 'react-native';

export default function Bookings() {
  const [bookings,setBookings] = useState([]);

  const accept = useCallback((id:number)=>{
    BookingsService.confirm(id).then((response)=>{
        loadData();
    })
  },[])

  const decline = useCallback((id:number)=>{
    BookingsService.cancel(id).then((response)=>{
        loadData();
    })
  },[])

  const loadData = useCallback(()=>{
    BookingsService.getBookings().then((response)=>{
        setBookings(response.data)
    })
  },[])

  useEffect(()=>{
    loadData();
    const interval = setInterval(() => {
        loadData();
      }, 10000);
    
      return () => clearInterval(interval);
  },[])
  return (
    <View className="flex-1 flex justify-center items-center bg-slate-400 rounded-md gap-2">
        {bookings.map((booking:Booking)=>(
            <View key={booking.id} className='w-[90%] bg-slate-500 rounded-md flex flex-row p-2 justify-between'>
                <View>
                    <Text>{booking.utilizador.email}</Text>
                    <View className='flex flex-row gap-3'>
                        <Text>{booking.dia}</Text>
                        <Text>{booking.hora}</Text>
                    </View> 
                </View>
                <View>
                    <View className='flex flex-row'>
                        <Text>Mesas:</Text>
                        <Text>{booking.quantidadeMesas}</Text>
                    </View>
                </View>
                <View className='flex flex-row gap-2'>
                    <View>
                        <Button title="accept" onPress={()=>accept(booking.id)}/>
                    </View>
                    <View>
                        <Button title="decline" color="red" onPress={()=>decline(booking.id)}/>
                    </View>
                </View>
            </View>
        ))}
    </View>
  );
}