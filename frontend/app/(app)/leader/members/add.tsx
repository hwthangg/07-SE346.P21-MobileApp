import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView
} from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function AddMember () {
  const router = useRouter()

  const [name, setName] = useState('')
  const [cardNumber, setCardNumber] = useState('')

  const handleSubmit = () => {
    console.log('Thêm đoàn viên:', { name, cardNumber })
    router.back() // Quay lại trang danh sách
  }

  return (
    <SafeAreaView className='flex-1 bg-gray-100'>
      <View className='bg-blue-600 p-4 flex-row items-center'>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name='arrow-back' size={24} color='white' />
        </TouchableOpacity>
        <Text className='text-white text-xl font-bold ml-4'>
          Thêm đoàn viên mới
        </Text>
      </View>

      <View className='p-4'>
        <Text className='mb-2'>Tên</Text>
        <TextInput
          className='border border-gray-300 p-3 rounded-lg bg-white mb-4'
          placeholder='Nhập tên đoàn viên'
          value={name}
          onChangeText={setName}
        />

        <Text className='mb-2'>Số thẻ đoàn</Text>
        <TextInput
          className='border border-gray-300 p-3 rounded-lg bg-white mb-4'
          placeholder='Nhập số thẻ đoàn'
          value={cardNumber}
          onChangeText={setCardNumber}
        />

        <TouchableOpacity
          className='bg-blue-600 p-3 rounded-lg flex-row justify-center items-center'
          onPress={handleSubmit}
        >
          <Ionicons name='save' size={24} color='white' />
          <Text className='text-white font-bold ml-2'>Lưu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
