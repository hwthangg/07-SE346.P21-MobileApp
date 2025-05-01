import { SafeAreaView } from 'react-native'
import { Stack } from 'expo-router'
import React from 'react'

const RootLayout = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name='edit' options={{ headerShown: false }} />
        <Stack.Screen name='[id]' options={{ headerShown: false }} />
        <Stack.Screen name='index' options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>
  )
}

export default RootLayout
