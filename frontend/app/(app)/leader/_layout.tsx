import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link, router, Stack, Tabs } from "expo-router";
import Octicons from "@expo/vector-icons/Octicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Ionicons } from "@expo/vector-icons";

// Define proper type for accessibilityState
interface AccessibilityState {
  selected: boolean;
  disabled?: boolean;
}

const LeaderLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 70,
        },
      }}
    >
      <Tabs.Screen
        name='members'
        options={{
          headerShown: false,
          tabBarButton: ({
            accessibilityState,
          }: {
            accessibilityState: AccessibilityState;
          }) => {
            const focused = accessibilityState?.selected;

            return (
              <TouchableOpacity
                onPress={() => router.push("/(app)/leader/members")}
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: focused ? "#e0f0ff" : "white",
                }}
              >
                <Octicons
                  name='people'
                  size={30}
                  color={focused ? "blue" : "gray"}
                />
                <Text style={{ color: focused ? "blue" : "gray" }}>
                  Đoàn viên
                </Text>
              </TouchableOpacity>
            );
          },
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          headerShown: false,
          tabBarButton: ({
            accessibilityState,
          }: {
            accessibilityState: AccessibilityState;
          }) => {
            const focused = accessibilityState?.selected;

            return (
              <TouchableOpacity
                onPress={() => router.push("/(app)/leader/events")}
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: focused ? "#e0f0ff" : "white",
                }}
              >
                <MaterialIcons
                  name='event-note'
                  size={30}
                  color={focused ? "blue" : "gray"}
                />
                <Text style={{ color: focused ? "blue" : "gray" }}>
                  Sự kiện
                </Text>
              </TouchableOpacity>
            );
          },
        }}
      />
      <Tabs.Screen
        name='documents/index'
        options={{
          headerShown: false,
          tabBarButton: ({
            accessibilityState,
          }: {
            accessibilityState: AccessibilityState;
          }) => {
            const focused = accessibilityState?.selected;

            return (
              <TouchableOpacity
                onPress={() => router.push("/(app)/leader/documents")}
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: focused ? "#e0f0ff" : "white",
                }}
              >
                <Ionicons
                  name='document-text-outline'
                  size={30}
                  color={focused ? "blue" : "gray"}
                />
                <Text style={{ color: focused ? "blue" : "gray" }}>
                  Tài liệu
                </Text>
              </TouchableOpacity>
            );
          },
        }}
      />
      <Tabs.Screen
        name='notifications/index'
        options={{
          headerShown: false,
          tabBarButton: ({
            accessibilityState,
          }: {
            accessibilityState: AccessibilityState;
          }) => {
            const focused = accessibilityState?.selected;

            return (
              <TouchableOpacity
                onPress={() => router.push("/(app)/leader/notifications")}
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: focused ? "#e0f0ff" : "white",
                }}
              >
                <MaterialIcons
                  name='notifications-none'
                  size={30}
                  color={focused ? "blue" : "gray"}
                />
                <Text style={{ color: focused ? "blue" : "gray" }}>
                  Thông báo
                </Text>
              </TouchableOpacity>
            );
          },
        }}
      />
      <Tabs.Screen
        name='settings/index'
        options={{
          headerShown: false,
          tabBarButton: ({
            accessibilityState,
          }: {
            accessibilityState: AccessibilityState;
          }) => {
            const focused = accessibilityState?.selected;

            return (
              <TouchableOpacity
                onPress={() => router.push("/(app)/leader/settings")}
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: focused ? "#e0f0ff" : "white",
                }}
              >
                <Ionicons
                  name='settings-outline'
                  size={30}
                  color={focused ? "blue" : "gray"}
                />
                <Text style={{ color: focused ? "blue" : "gray" }}>
                  Cài đặt
                </Text>
              </TouchableOpacity>
            );
          },
        }}
      />
    </Tabs>
  );
};

export default LeaderLayout;
