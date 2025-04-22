import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import Fontisto from "@expo/vector-icons/Fontisto";

const RegisterSreen = () => {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dd, setDD] = useState("");
  const [mm, setMM] = useState("");
  const [yyyy, setYYYY] = useState("");
  const [gender, setGender] = useState("male");
  const [toggleGender, setToggleGender] = useState(false);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const [isVisibilePassword, setIsVisibilePassword] = useState(false);
  const [isVisibileRePassword, setIsVisibileRePassword] = useState(false);

  const handleRegister = () => {
    console.log({
      fullname: fullname,
      email: email,
      phone: phone,
      birthday: new Date(`${yyyy}-${mm}-${dd}`),
      gender: gender,
      password: password,
    });
  };

  return (
    <>
      <ScrollView
        style={{ backgroundColor: "#3E4FF5", flex: 1, zIndex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={require("../../assets/images/banner.png")}
          style={{
           
            width: "auto",
            height: 180,
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
            Đăng ký
          </Text>
          <>
            <Text style={{ color: "#3E4FF5" }}>Họ và tên</Text>
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
                name="user"
                size={24}
                color="#3E4FF5"
                style={{ marginHorizontal: 10 }}
              />
              <TextInput
                inputMode="text"
                placeholder="Nhập họ tên của bạn"
                style={{ width: 250 }}
                value={fullname}
                onChangeText={setFullName}
              />
            </View>

            <Text style={{ color: "#3E4FF5" }}>Email</Text>
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
                placeholder="Nhập địa chỉ email của bạn"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <Text style={{ color: "#3E4FF5" }}>Số điện thoại</Text>
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
                style={{ marginHorizontal: 10 }}
              />
              <TextInput
                inputMode="numeric"
                style={{ width: 250 }}
                placeholder="Nhập số điện thoại của bạn"
                value={phone}
                onChangeText={setPhone}
              />
            </View>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <View style={{ flex: 2 }}>
                <Text style={{ color: "#3E4FF5" }}>Ngày sinh</Text>
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
                  <TouchableOpacity>
                    <Fontisto
                      name="date"
                      size={24}
                      color="#3E4FF5"
                      style={{ marginLeft: 10 }}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginLeft: 10,
                    }}
                  >
                    <TextInput
                      inputMode="numeric"
                      placeholder="Ngày"
                      style={{ width: 40, padding: 0, textAlign: "center" }}
                      maxLength={2}
                      value={dd}
                      onChangeText={setDD}
                    />
                    <Text>/</Text>
                    <TextInput
                      inputMode="numeric"
                      placeholder="Tháng"
                      style={{ width: 45, padding: 0, textAlign: "center" }}
                      maxLength={2}
                      value={mm}
                      onChangeText={setMM}
                    />
                    <Text>/</Text>
                    <TextInput
                      inputMode="numeric"
                      placeholder="Năm"
                      style={{ width: 45, padding: 0, textAlign: "center" }}
                      maxLength={4}
                      value={yyyy}
                      onChangeText={setYYYY}
                    />
                  </View>
                  <View></View>
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: "#3E4FF5" }}>Giới tính</Text>
                <View
                  style={[
                    {
                      flexDirection: "row",
                      alignItems: "flex-start",

                      height: 50,
                      justifyContent: "space-between",
                      backgroundColor: "white",
                      borderRadius: 10,
                      borderColor: "#3E4FF5",

                      marginBottom: 10,

                      position: "relative",
                    },
                    toggleGender
                      ? {}
                      : {
                          borderWidth: 1,
                          boxShadow: "1px 2px 3px rgba(0,0,0,0.7)",
                        },
                  ]}
                >
                  <View
                    style={[
                      {
                        width: "100%",
                        zIndex: 5,
                        position: "relative",
                        borderRadius: 10,
                        padding: 5,
                      },
                      toggleGender
                        ? {
                            borderWidth: 2,
                            backgroundColor: "white",
                            borderColor: "#3E4FF5",
                          }
                        : {},
                    ]}
                  >
                    <Text
                      style={[
                        { height: 30, textAlignVertical: "center" },
                        toggleGender
                          ? { borderBottomWidth: 1 }
                          : { paddingLeft: 10, paddingTop: 10 },
                      ]}
                    >
                      {gender == "male" ? "Nam" : "Nữ"}
                    </Text>
                    <View
                      style={[
                        { height: 40 },
                        toggleGender ? {} : { display: "none" },
                      ]}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          gender == "male"
                            ? setGender("female")
                            : setGender("male");
                          setToggleGender(false);
                        }}
                      >
                        <Text
                          style={{
                            height: "100%",
                            paddingTop: 5,
                            textAlignVertical: "center",
                          }}
                        >
                          {gender == "male" ? "Nữ" : "Nam"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={[
                      {
                        zIndex: 6,
                        position: "absolute",
                        top: 10,
                        right: 10,
                      },
                      toggleGender ? {} : { top: 12 },
                    ]}
                    onPress={() => setToggleGender(!toggleGender)}
                  >
                    <Feather name="chevron-down" size={24} color="#3E4FF5" />
                  </TouchableOpacity>
                </View>
              </View>
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
                style={{marginLeft: 10 }}
              />
              <TextInput
                inputMode="text"
                secureTextEntry={!isVisibilePassword}
                style={{marginLeft: 10,width: 240, textAlign:'left' }}
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
                style={{marginLeft: 10 }}
              />
              <TextInput
                inputMode="text"
                secureTextEntry={!isVisibileRePassword}
                style={{marginLeft: 10,width: 240, textAlign:'left' }}
                placeholder="Nhập lại mật khẩu của bạn"
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

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
                marginBottom: 10,
              }}
            ></View>

            <TouchableOpacity
              style={{
                backgroundColor: "#4955CE",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                borderRadius: 10,
                marginTop: 10,
              }}
              onPress={handleRegister}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Đăng ký
              </Text>
            </TouchableOpacity>

            <Text
              style={{ textAlign: "center", marginTop: 20, fontWeight: "bold" }}
            >
              Bạn đã có tài khoản{" "}
              <Link href={"/(auth)"} style={{ color: "#3E4FF5" }}>
                Đăng nhập ngay
              </Link>
            </Text>
          </>
        </View>
      </ScrollView>
    </>
  );
};

export default RegisterSreen;
const styles = StyleSheet.create({
  container: {
    padding: 16,
    zIndex: 1000, // QUAN TRỌNG để dropdown hiện đúng
  },
  dropdown: {
    borderColor: "#ccc",
    borderRadius: 8,
    zIndex: 10,
  },
  dropdownContainer: {
    borderColor: "#ccc",
    borderRadius: 8,
  },
});
