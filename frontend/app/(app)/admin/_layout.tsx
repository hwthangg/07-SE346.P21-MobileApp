import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router, Stack, Tabs } from 'expo-router'
import { Ionicons, Octicons } from '@expo/vector-icons'

const AdminLayout = () => {
  return (
    <Tabs  screenOptions={{
      tabBarStyle: {
        height: 70,
      },
    }}>
        <Tabs.Screen name='accounts/index' options={{
          headerShown: false,
          tabBarButton: ({
            accessibilityState,
          }: {
            accessibilityState: any;
          }) => {
            const focused = accessibilityState?.selected;

            return (
              <TouchableOpacity
                onPress={() => router.push("/(app)/admin/accounts")}
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: focused ? "#e0f0ff" : "white",
                }}
              >
                <Octicons
                  name="people"
                  size={30}
                  color={focused ? "blue" : "gray"}
                />
                <Text style={{ color: focused ? "blue" : "gray" }}>
                  Tài khoản
                </Text>
              </TouchableOpacity>
            );
          },
        }}/>
        <Tabs.Screen name='chapters/index' options={{
          headerShown: false,
          tabBarButton: ({
            accessibilityState,
          }: {
            accessibilityState: any;
          }) => {
            const focused = accessibilityState?.selected;

            return (
              <TouchableOpacity
                onPress={() => router.push("/(app)/admin/chapters")}
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: focused ? "#e0f0ff" : "white",
                }}
              >
                <Octicons
                  name="organization"
                  size={30}
                  color={focused ? "blue" : "gray"}
                />
                <Text style={{ color: focused ? "blue" : "gray" }}>
                Chi đoàn
                </Text>
              </TouchableOpacity>
            );
          },
        }}/>

         <Tabs.Screen
                name="settings/index"
                options={{
                  headerShown: false,
                  tabBarButton: ({
                    accessibilityState,
                  }: {
                    accessibilityState: any;
                  }) => {
                    const focused = accessibilityState?.selected;
        
                    return (
                      <TouchableOpacity
                        onPress={() => router.push("/(app)/admin/settings")}
                        style={{
                          flex: 1,
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: focused ? "#e0f0ff" : "white",
                        }}
                      >
                        <Ionicons name="settings-outline" size={30}  color={focused ? "blue" : "gray"}/>
                        <Text style={{ color: focused ? "blue" : "gray" }}>
                          Cài đặt
                        </Text>
                      </TouchableOpacity>
                    );
                  },
                }}
              />
        
    </Tabs>
  )
}

export default AdminLayout