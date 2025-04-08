import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const LeaderLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{headerShown: false}}/>
      <Stack.Screen name='detail' />
      <Stack.Screen name='add' />
    </Stack>
  )
}

export default LeaderLayout
