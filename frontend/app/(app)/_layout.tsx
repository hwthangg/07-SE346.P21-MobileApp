import { SafeAreaView } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const LeaderLayout = () => {
  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Stack>
        <Stack.Screen name='admin' options={{ headerShown: false }} />
        <Stack.Screen name='leader' options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>
  )
}

export default LeaderLayout
