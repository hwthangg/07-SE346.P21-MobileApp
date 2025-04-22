import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import Fontisto from "@expo/vector-icons/Fontisto";
import AntDesign from "@expo/vector-icons/AntDesign";

const SetPassword = () => {
  const [password, setPassword] = useState('')
   const [rePassword, setRePassword] = useState('')
 
   const [isVisibilePassword, setIsVisibilePassword] = useState(false);
   const [isVisibileRePassword, setIsVisibileRePassword] = useState(false);
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ color: "#3E4FF5" }}>Mật khẩu</Text>

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
    name="lock"
    size={24}
    color="#3E4FF5"
    style={{ flex: 1, marginHorizontal: 10 }}
  />
  <TextInput
    inputMode="text"
    secureTextEntry={!isVisibilePassword}
    style={{ width: 200 }}
    placeholder="Nhập mật khẩu của bạn"
    value={password}
    onChangeText={setPassword}
  />
  <TouchableOpacity
    onPress={() => setIsVisibilePassword(!isVisibilePassword)}
  >
    <Feather
      name={isVisibilePassword ? "eye-off" : "eye"}
      size={24}
      color="#3E4FF5"
      style={{ marginLeft: 10, marginRight: 20 }}
    />
  </TouchableOpacity>
</View>

<Text style={{ color: "#3E4FF5" }}>Nhập lại mật khẩu</Text>

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
    name="lock"
    size={24}
    color="#3E4FF5"
    style={{ flex: 1, marginLeft: 10 }}
  />
  <TextInput
    inputMode="text"
    secureTextEntry={!isVisibileRePassword}
    style={{ width: 200 }}
    placeholder="Nhập mật khẩu của bạn"
    value={rePassword}
    onChangeText={setRePassword}
  />
  <TouchableOpacity
    onPress={() => setIsVisibileRePassword(!isVisibileRePassword)}
  >
    <Feather
      name={isVisibileRePassword ? "eye-off" : "eye"}
      size={24}
      color="#3E4FF5"
      style={{ marginLeft: 10, marginRight: 20 }}
    />
  </TouchableOpacity>
    </View>
    <TouchableOpacity
                                style={{
                                  backgroundColor: "#4955CE",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  height: 40,
                                  borderRadius: 10,
                                  marginTop: 10,
                                }}
    
                                onPress={()=>router.push('/(auth)')}
                              >
                                <Text style={{ color: "white", fontWeight: "bold" }}>
                                  Xác nhận
                                </Text>
                              </TouchableOpacity>
    </View>
  );
};

export default SetPassword;
