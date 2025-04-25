import { View, Text } from 'react-native'
import { Stack } from 'expo-router'
import React from 'react'
import "../app/global.css"

const RootLayout = () => {
  return (
    <Stack>
        <Stack.Screen name='(auth)/index' options={{headerShown: false}}/>
        <Stack.Screen name='(app)' options={{headerShown: false}}/>
    </Stack>
  )
}

export default RootLayout