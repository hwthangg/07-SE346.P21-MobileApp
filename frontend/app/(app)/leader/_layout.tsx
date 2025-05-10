import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Link, router, Tabs } from 'expo-router'
import Octicons from '@expo/vector-icons/Octicons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Ionicons } from '@expo/vector-icons'
import type { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs'

const LeaderLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 70
        }
      }}
    >
      <Tabs.Screen
        name='members'
        options={{
          headerShown: false,
          tabBarButton: (props: BottomTabBarButtonProps) => {
            const focused = props.accessibilityState?.selected

            return (
              <TouchableOpacity
                onPress={() => router.push('/(app)/leader/members')}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: focused ? '#e0f0ff' : 'white'
                }}
                // accessibilityRole={props.accessibilityRole} // Có thể thêm các props khác nếu cần
                // accessibilityState={props.accessibilityState}
                // onPress={props.onPress}
                // onLongPress={props.onLongPress}
                // testID={props.testID}
              >
                <Octicons
                  name='people'
                  size={30}
                  color={focused ? 'blue' : 'gray'}
                />
                <Text style={{ color: focused ? 'blue' : 'gray' }}>
                  Đoàn viên
                </Text>
              </TouchableOpacity>
            )
          }
        }}
      />
      <Tabs.Screen
        name='events'
        options={{
          headerShown: false,
          tabBarButton: (props: BottomTabBarButtonProps) => {
            const focused = props.accessibilityState?.selected

            return (
              <TouchableOpacity
                onPress={() => router.push('/(app)/leader/events')}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: focused ? '#e0f0ff' : 'white'
                }}
              >
                <MaterialIcons
                  name='event-note'
                  size={30}
                  color={focused ? 'blue' : 'gray'}
                />
                <Text style={{ color: focused ? 'blue' : 'gray' }}>
                  Sự kiện
                </Text>
              </TouchableOpacity>
            )
          }
        }}
      />
      <Tabs.Screen
        name='documents'
        options={{
          headerShown: false,
          tabBarButton: (props: BottomTabBarButtonProps) => {
            const focused = props.accessibilityState?.selected

            return (
              <TouchableOpacity
                onPress={() => router.push('/(app)/leader/documents')}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: focused ? '#e0f0ff' : 'white'
                }}
              >
                <Ionicons
                  name='document-text-outline'
                  size={30}
                  color={focused ? 'blue' : 'gray'}
                />
                <Text style={{ color: focused ? 'blue' : 'gray' }}>
                  Tài liệu
                </Text>
              </TouchableOpacity>
            )
          }
        }}
      />
      <Tabs.Screen
        name='notifications/index'
        options={{
          headerShown: false,
          tabBarButton: (props: BottomTabBarButtonProps) => {
            const focused = props.accessibilityState?.selected

            return (
              <TouchableOpacity
                onPress={() => router.push('/(app)/leader/notifications')}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: focused ? '#e0f0ff' : 'white'
                }}
              >
                <MaterialIcons
                  name='notifications-none'
                  size={30}
                  color={focused ? 'blue' : 'gray'}
                />
                <Text style={{ color: focused ? 'blue' : 'gray' }}>
                  Thông báo
                </Text>
              </TouchableOpacity>
            )
          }
        }}
      />
      <Tabs.Screen
        name='settings/index'
        options={{
          headerShown: false,
          tabBarButton: (props: BottomTabBarButtonProps) => {
            const focused = props.accessibilityState?.selected

            return (
              <TouchableOpacity
                onPress={() => router.push('/(app)/leader/settings')}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: focused ? '#e0f0ff' : 'white'
                }}
              >
                <Ionicons
                  name='settings-outline'
                  size={30}
                  color={focused ? 'blue' : 'gray'}
                />
                <Text style={{ color: focused ? 'blue' : 'gray' }}>
                  Cài đặt
                </Text>
              </TouchableOpacity>
            )
          }
        }}
      />
    </Tabs>
  )
}

export default LeaderLayout
