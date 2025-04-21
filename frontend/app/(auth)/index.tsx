import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React from "react";
import { Link } from "expo-router";
import Feather from '@expo/vector-icons/Feather';

const LoginScreen = () => {
  return (
    // <View className='flex-1 bg-gray-100 justify-center items-center p-4'>
    //   <Text className='text-2xl font-bold text-gray-800 mb-8'>Đăng nhập</Text>

    //   <TouchableOpacity
    //     className='bg-blue-600 p-4 rounded-lg w-full max-w-xs mb-4'
    //     activeOpacity={0.7}
    //   >
    //     <Link href='/admin/accounts'>
    //       <Text className='text-white text-center font-semibold text-lg'>
    //         Đến trang Admin
    //       </Text>
    //     </Link>
    //   </TouchableOpacity>

    //   <TouchableOpacity
    //     className='bg-green-600 p-4 rounded-lg w-full max-w-xs'
    //     activeOpacity={0.7}
    //   >
    //     <Link href='/leader/members'>
    //       <Text className='text-white text-center font-semibold text-lg'>
    //         Đến trang Leader
    //       </Text>
    //     </Link>
    //   </TouchableOpacity>
    // </View>
    <>
      <View style={{ backgroundColor: "#3E4FF5", flex: 1 }}>
        <Image
          source={require("../../assets/images/banner.png")}
          style={{
            width: "100%",
            borderWidth: 1,
            height: 176,
            resizeMode: "contain",
          }}
        />

        <View
          style={{
            top: -46,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/images/logo.png")}
            style={{
              resizeMode: "contain",
              
              height: 90,

              flex: 1,
            }}
          />
          <Text style={{ flex: 7, fontSize: 17, color:'white', fontWeight:"bold", textTransform:'uppercase' }}>
            Hệ thống hỗ trợ {"\n"}nghiệp vụ công tác đoàn
          </Text>
        </View>
        <View>
          <Text>Đăng nhập  </Text>
          <>
          <Text>Email hoặc số điện thoại</Text>
          <>
          <Feather name="phone" size={24} color="black" />
          <TextInput/>
          </>
          <TextInput/>
          </>
        </View>
      </View>
    </>
  );
};

export default LoginScreen;
