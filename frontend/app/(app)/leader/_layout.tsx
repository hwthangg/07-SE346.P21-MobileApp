import { View, Text } from 'react-native'
import React from 'react'
import { Stack, Tabs } from 'expo-router'

const LeaderLayout = () => {
  return (
    <Tabs>
        <Tabs.Screen name='members/index'/>
        <Tabs.Screen name='events/index'/>
        <Tabs.Screen name='documents/index'/>
        
    </Tabs>
  )
}

export default LeaderLayout