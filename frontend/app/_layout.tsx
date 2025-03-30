import { View, Text } from 'react-native'
import { Stack } from 'expo-router'
import React from 'react'

const RootLayout = () => {
  return (
    <Stack>
        <Stack.Screen name='(auth)/index'/>
        <Stack.Screen name='(app)'/>


    </Stack>
  )
}

export default RootLayout