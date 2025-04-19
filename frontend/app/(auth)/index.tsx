import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const LoginScreen = () => {
  return (
    <View className='flex-1 bg-gray-100 justify-center items-center p-4'>
      <Text className='text-2xl font-bold text-gray-800 mb-8'>Đăng nhập</Text>

      <TouchableOpacity
        className='bg-blue-600 p-4 rounded-lg w-full max-w-xs mb-4'
        activeOpacity={0.7}
      >
        <Link href='/admin/accounts'>
          <Text className='text-white text-center font-semibold text-lg'>
            Đến trang Admin
          </Text>
        </Link>
      </TouchableOpacity>

      <TouchableOpacity
        className='bg-green-600 p-4 rounded-lg w-full max-w-xs'
        activeOpacity={0.7}
      >
        <Link href='/leader/members'>
          <Text className='text-white text-center font-semibold text-lg'>
            Đến trang Leader
          </Text>
        </Link>
      </TouchableOpacity>
    </View>
  )
}

export default LoginScreen
