import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import Fontisto from "@expo/vector-icons/Fontisto";

const ConfirmationEmail = () => {
    const [keyAuth, setKeyAuth] = useState('')
  return (
    <View style={{padding:20}}>
      
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                height: 50,

                backgroundColor: "white",
                borderRadius: 10,
                borderColor: "#3E4FF5",
                boxShadow: "1px 2px 3px rgba(0,0,0,0.7)",
                marginBottom: 10,
              }}
            >
              <Fontisto
                name="email"
                size={24}
                color="#3E4FF5"
                style={{ marginHorizontal: 10 }}
              />
              <TextInput
                inputMode="email"
                style={{ width: 250 }}
                placeholder="Nhập email khôi phục"
                value={keyAuth}
                onChangeText={setKeyAuth}
              /></View>
              
                          <TouchableOpacity
                            style={{
                              backgroundColor: "#4955CE",
                              justifyContent: "center",
                              alignItems: "center",
                              height: 40,
                              borderRadius: 10,
                              marginTop: 10,
                            }}

                            onPress={()=>router.push('/(auth)/recoveryPassword/confirmOTP')}
                          >
                            <Text style={{ color: "white", fontWeight: "bold" }}>
                              Xác nhận
                            </Text>
                          </TouchableOpacity>
    </View>
  )
}

export default ConfirmationEmail