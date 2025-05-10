import React from 'react'
import { Stack } from 'expo-router'

const LeaderLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false // Hide the default header
      }}
    >
      <Stack.Screen name='index' />
      <Stack.Screen name='detail' />
      <Stack.Screen name='add' />
      <Stack.Screen name='edit' />
    </Stack>
  )
}

export default LeaderLayout
