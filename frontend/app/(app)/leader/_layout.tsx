import React from 'react'
import { Tabs } from 'expo-router'

const LeaderLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name='members/index' />
      <Tabs.Screen name='events/index' />
      <Tabs.Screen name='documents/index' />
    </Tabs>
  )
}

export default LeaderLayout
