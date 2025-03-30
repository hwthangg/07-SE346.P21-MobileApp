import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const LeaderLayout = () => {
  return (
    <Stack>
        <Stack.Screen name='admin'/>
        <Stack.Screen name='leader'/>
        
    </Stack>
  )
}

export default LeaderLayout