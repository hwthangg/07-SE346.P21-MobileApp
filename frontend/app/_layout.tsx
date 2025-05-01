import { SafeAreaView } from 'react-native'
import { Stack } from 'expo-router'
import React from 'react'
import "../app/global.css"

const RootLayout = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name='(auth)' options={{ headerShown: false }} />
        <Stack.Screen name='(app)' options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>
  )
}

export default RootLayout
