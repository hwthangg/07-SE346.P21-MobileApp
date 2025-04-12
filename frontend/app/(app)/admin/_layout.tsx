import { View, Text } from 'react-native'
import React from 'react'
import { Stack, Tabs } from 'expo-router'

const AdminLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name='accounts/index' />
      <Tabs.Screen name='chapters/index' />
    </Tabs>
  )
}

export default AdminLayout
