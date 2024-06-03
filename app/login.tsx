import loginService from '@/services/loginService';
import { useUserStore } from '@/stores/useUserStore';
import { router } from 'expo-router';
import { useState } from 'react';
import { View, Text,TextInput,Button } from 'react-native';

export default function LoginScreen() {
    const Login = useUserStore((state:any) => state.login)
    const [email,setEmail] = useState("");
    const [passord,setPassword] = useState("");
    const [text,setText] = useState("");

    const login = ()=>{
        loginService.login({email:email,password:passord}).then((response)=>{
            if(response.data.role !== "WAITER"){
                setText("wrongRole needs to be waiter")
            }else{
                Login(response.data.token,response.data.email,response.data.role)
                router.replace("/")
            }
        }).catch(()=>{
            setText("error")
        })
    }
  return (
    <View className='bg-white h-[105%] flex flex-col items-center justify-center gap-5'>
        <TextInput className=' border border-black rounded-md w-[60%] p-2' placeholder='email@example.com' onChange={(e)=>setEmail(e.nativeEvent.text)}></TextInput>
        <TextInput className=' border border-black rounded-md w-[60%] p-2' placeholder='password' onChange={(e)=>setPassword(e.nativeEvent.text)}></TextInput>
        <View className='w-[40%]'>
            <Button title='Login' onPress={login}></Button>
        </View>
        <Text>{text}</Text>
    </View>
  );
}