import { useUserStore } from '@/stores/useUserStore';
import { View,Text, Button } from 'react-native';

export default function HomeScreen() {
  const Logout = useUserStore((state:any) => state.logout)
  return (
    <View className="flex-1 flex justify-center items-center bg-slate-500 rounded-md">
      <View className='bg-green-500 rounded-md p-2 h-[20%]'>
        <Text className="text-white">woof</Text>
        <Text className=''>pao</Text>
      </View>
      <View className="justify-center items-center bg-red-500 rounded-md">
        <Text className="text-white">woof2</Text>
      </View>
      <Button title='logout' onPress={Logout}></Button>
    </View>
    
  );
}
