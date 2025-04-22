import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Quên mật khẩu",
          headerStyle: { backgroundColor: "blue" },
          headerTintColor: "white",
        }}
      />

      <Stack.Screen
        name="confirmOTP"
        options={{
          title: "Xác nhận OTP",
          headerStyle: { backgroundColor: "blue" },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="setPassword"
        options={{
          title: "Đặt lại mật khẩu",
          headerStyle: { backgroundColor: "blue" },
          headerTintColor: "white",
        }}
      />
    </Stack>
  );
};

export default _layout;
