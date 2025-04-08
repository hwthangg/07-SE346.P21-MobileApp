import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const LeaderLayout = () => {
  return (
    <Stack>
        <Stack.Screen name='admin' options={{headerShown: false}}/>
        <Stack.Screen name='leader' options={{headerShown: false}}/>
        
    </Stack>
  )
}

export default LeaderLayout