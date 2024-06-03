import reservasService from "@/services/reservasService";
import { useCallback, useEffect, useState } from "react";
import { View,Text, Button } from "react-native";


export default function TabTwoScreen() {
  const [requests,setRequests] = useState([]);
  useEffect(()=>{
    reservasService.getRequests().then((response:any)=>{
      setRequests(response.data.filter((item:any)=>item.status === 2))
    })
  },[])

  const update = useCallback((id:number,request:any)=>{
    request.status = request.status +1;
    reservasService.updateRequest(id,request).then((response)=>{
      reservasService.getRequests().then((response:any)=>{
        setRequests(response.data.filter((item:any)=>item.status === 2))
      })
    })
  },[requests])
  return (
    <View className="flex-1 flex-row flex py-9 px-2 bg-slate-400 rounded-md gap-1 flex-wrap">
      {requests?.map((request:any)=>(
        <View className='w-[48%] bg-slate-500 rounded-md flex flex-row p-2 justify-between'>
          <View>
            <Text>Pedido:{request.id}</Text>
            <Text>Mesa:{request.mesa}</Text>
          </View>
          <Button title="Entregue" onPress={()=>update(request.id,request)}></Button>
        </View>
      ))}
    </View>
  );
}
