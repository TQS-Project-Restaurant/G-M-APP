import MenuDia, { Comida, QtComida } from '@/entities/MenuDia';
import menuDiaService from '@/services/menuDiaService';
import reservasService from '@/services/reservasService';
import { useUserStore } from '@/stores/useUserStore';
import { useCallback, useEffect, useState } from 'react';
import { View,Text, Button, TextInput, Alert } from 'react-native';

export default function HomeScreen() {
  const Logout = useUserStore((state:any) => state.logout)
  const [menuDia,setMenuDia] = useState<MenuDia>();
  const [addBebida,setAddBebida] = useState(false);
  const [bebidas,setBebidas] = useState<Array<QtComida>>([]);
  const [addPrato,setAddPrato] = useState(false);
  const [pratos,setPratos] = useState<Array<QtComida>>([]);
  const [mesa,setMesa] = useState(0);

  const send = useCallback(()=>{
    reservasService.makeReserva({
      bebidas:bebidas,
      pratos:pratos,
      mesa:mesa,
    }).then((response)=>{
      Alert.alert("pedido feito")
      setBebidas([]);
      setPratos([]);
      setMesa(0);
    })
  },[pratos,bebidas,mesa])

  const addBebidafunc = useCallback((id:number,name:string)=>{
    let item = bebidas.find((item)=>item.id == id);
    if(item){
      const newArr = bebidas.map((bebida)=>{
        if(bebida.id === id){
          bebida.quantity = bebida.quantity+1;
          return bebida
        }else{
          return bebida
        }
      })
      setBebidas(newArr);
    }else{
      setBebidas([...bebidas,{id:id,nome:name,quantity:1}])
    }
    setAddBebida(false)
  },[bebidas])

  const addPratofunc = useCallback((id:number,name:string)=>{
    let item = pratos.find((item)=>item.id == id);
    if(item){
      const newArr = pratos.map((prato)=>{
        if(prato.id === id){
          prato.quantity = prato.quantity+1;
          return prato
        }else{
          return prato
        }
      })
      setPratos(newArr);
    }else{
      setPratos([...pratos,{id:id,nome:name,quantity:1}])
    }
    setAddPrato(false)
  },[pratos])


  useEffect(()=>{
    menuDiaService.getMenu().then((response)=>{
      setMenuDia(response.data);
    })
  },[])
  if(addBebida){
    return (
      <View className="flex-1 flex justify-center items-center bg-slate-400 rounded-md">
        <View className='flex flex-row flex-wrap gap-2 justify-around'>
          {menuDia && menuDia.bebidas.map((bebida)=>(
            <View key={bebida.id} className='w-[45%] bg-slate-500 rounded-md flex flex-row p-2 justify-between'>
              <View>
                <Text>{bebida.nome}</Text>
                <Text>{bebida.preco}€</Text>
              </View>
              <Button title='add' onPress={()=>addBebidafunc(bebida.id,bebida.nome)}></Button>
            </View>
          ))}
        </View>
      </View>
    );
  }
  if(addPrato){
    return (
      <View className="flex-1 flex justify-center items-center bg-slate-400 rounded-md">
        <View className='flex flex-row flex-wrap gap-2 justify-around'>
          {menuDia && menuDia.pratos.map((prato)=>(
            <View key={prato.id} className='w-[45%] bg-slate-500 rounded-md flex flex-row p-2 justify-between'>
              <View>
                <Text>{prato.nome}</Text>
                <Text>{prato.preco}€</Text>
              </View>
              <Button title='add' onPress={()=>addPratofunc(prato.id,prato.nome)}></Button>
            </View>
          ))}
        </View>
      </View>
    );
  }
  return (
    <View className="flex-1 flex p-9 bg-slate-400 rounded-md">
      <View className='flex flex-row justify-around'>
        <Button title='add Bebida' onPress={()=>setAddBebida(true)}></Button>
        <Button title='add Comida' onPress={()=>setAddPrato(true)}></Button>
      </View>
      <Text className='text-xl'>Bebidas</Text>
      <View className='flex flex-row flex-wrap justify-around gap-1'>
        {bebidas.map((bebida)=>(
          <View key={bebida.id} className='w-[48%] bg-slate-500 rounded-md flex flex-row p-2 justify-between'>
          <View>
            <Text>{bebida.nome}</Text>
            <Text>quantity: {bebida.quantity}</Text>
          </View>
        </View>
        ))}
      </View>
      <Text className='text-xl'>Comida</Text>
      <View className='flex flex-row flex-wrap justify-around gap-1'>
        {pratos.map((prato)=>(
          <View key={prato.id} className='w-[48%] bg-slate-500 rounded-md flex flex-row p-2 justify-between'>
          <View>
            <Text>{prato.nome}</Text>
            <Text>quantity: {prato.quantity}</Text>
          </View>
        </View>
        ))}
      </View>
      <View className='flex flex-row gap-2'>
        <Text className='text-xl'>Mesa</Text>
        <TextInput className=' border border-black rounded-md w-[20%] px-1' value={!Number.isNaN(mesa)?mesa.toString():""} placeholder='mesa' onChange={(e)=>setMesa(parseInt(e.nativeEvent.text))}></TextInput>
      </View>
      <Button title='Fazer Pedido' onPress={send}></Button>
      <View className='mt-auto'>
        <Button title='logout' onPress={Logout}></Button>
      </View>
    </View>
    
  );
}
