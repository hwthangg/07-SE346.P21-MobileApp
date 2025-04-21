import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import Fontisto from "@expo/vector-icons/Fontisto";

const LoginScreen = () => {
  const [isVisibilePassword, setIsVisibilePassword] = useState(false);
  const [isRememberPassword, setIsRememberPassword] = useState(false);

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
            gap: 10,
            left: 10,
          }}
        >
          <Image
            source={require("../../assets/images/logo.png")}
            style={{
              resizeMode: "contain",

              height: 90,
              width: 90,
            }}
          />
          <Text
            style={{
              flex: 7,
              fontSize: 18,
              color: "white",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            Hệ thống hỗ trợ {"\n"}nghiệp vụ công tác đoàn
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 20,
            paddingHorizontal: 20,
            paddingVertical: 40,
            marginHorizontal: 10,
          }}
        >
          <Text style={{ fontWeight: "bold", marginBottom: 20, fontSize: 30 }}>
            Đăng nhập
          </Text>
          <>
            <Text style={{ color: "#3E4FF5" }}>Email hoặc số điện thoại</Text>
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
                name="phone"
                size={24}
                color="#3E4FF5"
                style={{ flex: 1, marginLeft: 10 }}
              />
              <TextInput
                inputMode="email"
                style={{ flex: 8 }}
                placeholder="Nhập số điện thoại của bạn"
              />
            </View>
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
                style={{ flex: 1, marginLeft: 10 }}
              />
              <TextInput
                inputMode="text"
                secureTextEntry={!isVisibilePassword}
                style={{ flex: 8 }}
                placeholder="Nhập mật khẩu của bạn"
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

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              <View style={{ flexDirection: "row", flex: 1, gap: 10 }}>
                <TouchableOpacity
                  onPress={() => setIsRememberPassword(!isRememberPassword)}
                >
                  <Fontisto
                    name={
                      isRememberPassword
                        ? "checkbox-passive"
                        : "checkbox-active"
                    }
                    size={16}
                    color="black"
                  />
                </TouchableOpacity>

                <Text style={{ color: "#3E4FF5" }}>Nhớ mật khẩu</Text>
              </View>

              <Text style={{ color: "#3E4FF5" }}>Quên mật khẩu ?</Text>
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
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Đăng nhập
              </Text>
            </TouchableOpacity>

            <Text
              style={{ textAlign: "center", marginTop: 20, fontWeight: "bold" }}
            >
              Bạn chưa có tài khoản ?{" "}
              <Link href={"/(auth)/register"} style={{ color: "#3E4FF5" }}>
                Đăng ký ngay
              </Link>
            </Text>
          </>
        </View>
      </View>
    </>
  );
};

export default LoginScreen;
