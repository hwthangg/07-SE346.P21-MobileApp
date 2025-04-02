import React from 'react'
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function MemberDetail () {
  const router = useRouter()
  const params = useLocalSearchParams()

  const member = {
    id: params.id as string,
    name: params.name as string,
    cardNumber: params.cardNumber as string
  }

  return (
    <SafeAreaView className='flex-1 bg-gray-100'>
      <View className='bg-blue-600 p-4 flex-row items-center'>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name='arrow-back' size={24} color='white' />
        </TouchableOpacity>
        <Text className='text-white text-xl font-bold ml-4'>{member.name}</Text>
      </View>

      <View className='p-4'>
        <Text className='text-lg font-bold'>Thông tin đoàn viên</Text>
        <View className='bg-white p-4 mt-2 rounded-lg'>
          <Text className='text-gray-600'>
            Tên: <Text className='font-semibold text-black'>{member.name}</Text>
          </Text>
          <Text className='text-gray-600 mt-2'>
            Số thẻ đoàn:{' '}
            <Text className='font-semibold text-black'>
              {member.cardNumber}
            </Text>
          </Text>
          <Text className='text-gray-600 mt-2'>
            ID: <Text className='font-semibold text-black'>{member.id}</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}
