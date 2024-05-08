import { View,Text,Image, StyleSheet, Platform } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-slate-500 rounded-md">
      <View className='bg-green-500 rounded-md p-2 h-[20%]'>
        <Text className="text-white">woof</Text>
        <Text className=''>pao</Text>
      </View>
      <View className="justify-center items-center bg-red-500 rounded-md">
        <Text className="text-white">woof2</Text>
        <Text className=''>pao2</Text>
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
