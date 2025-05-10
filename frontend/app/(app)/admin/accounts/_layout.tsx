import React from 'react'
import { Stack } from 'expo-router'

const AdminLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='detail' options={{ headerShown: false }} />
      <Stack.Screen name='add' options={{ headerShown: false }} />
      <Stack.Screen name='edit' options={{ headerShown: false }} />
    </Stack>
  )
}

export default AdminLayout
