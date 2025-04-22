import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import Fontisto from "@expo/vector-icons/Fontisto";
import AntDesign from '@expo/vector-icons/AntDesign';

const ConfirmOTP = () => {
    const [otp, setOTP] = useState('')
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
      <Feather
        name="message-square"
        size={24}
        color="#3E4FF5"
        style={{ marginHorizontal: 10 }}
      />
      <TextInput
        inputMode="numeric"
        style={{ width: 250 }}
        placeholder="Nhập OTP"
        maxLength={6}
        value={otp}
        onChangeText={setOTP}
      /></View>
      <View style={{flex:1, flexDirection:'row', justifyContent:'center', gap: 20}}>
        <TouchableOpacity
                    style={{
                      backgroundColor: "#4955CE",
                      justifyContent: "center",
                      alignItems: "center",
                      height: 40,
                      borderRadius: 10,
                      marginTop: 10,
                      flex:1
                    }}

                    onPress={()=>router.push('/(auth)/recoveryPassword/setPassword')}
                  >
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      Xác nhận
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "",
                      justifyContent: "center",
                      alignItems: "center",
                      height: 40,
                      borderRadius: 10,
                      marginTop: 10,
                      flex:1,flexDirection:'row', gap: 10
                    }}

                    onPress={()=>router.push('/(auth)/recoveryPassword/confirmOTP')}
                  >
                    <AntDesign name="reload1" size={24} color="#4955CE" />
                    <Text style={{ color: "#4955CE", fontWeight: "bold" }}>
                      Gửi lại
                    </Text>
                  </TouchableOpacity>
      </View>
                  
</View>
  )
}

export default ConfirmOTP