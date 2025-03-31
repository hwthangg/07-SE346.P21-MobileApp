import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const LoginScreen = () => {
  return (
    <View>
      <Text className='text-white'>LoginScreen</Text>
      <Link href='/admin/accounts'>To admin</Link>
      <Link href='/leader/members'>To leader</Link>
    </View>
  )
}

export default LoginScreen