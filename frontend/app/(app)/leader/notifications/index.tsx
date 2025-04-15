import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";

const Notification = () => {
  const data = [
    {
      id: 1,
      text: "Sự kiện “Chương trình họp mặt mừng kỉ niệm 30/4” sẽ bắt đầu sau 24 giờ nữa Sự kiện “Chương trình họp mặt mừng kỉ niệm 30/4” sẽ bắt đầu sau 24 giờ nữa",
    },
    {
      id: 2,
      text: "Sự kiện “Chương trình họp mặt mừng kỉ niệm 30/4” sẽ bắt đầu sau 24 giờ nữa",
    },
    {
      id: 3,
      text: "Sự kiện “Chương trình họp mặt mừng kỉ niệm 30/4” sẽ bắt đầu sau 24 giờ nữa",
    },
  ];

  const renderItem = ({item} : {item:any}) =>{
    return(
<TouchableOpacity
          style={{
           minHeight:60,
            borderWidth: 1,
            boxShadow: "0px 5px 9px #4955CE",
            opacity: 0.5,
            borderRadius: 10,
            padding: 10,
            marginVertical: 10,
            overflowY: "visible"
          }}
        >
          <Text style={{ flex: 1, borderWidth: 1, verticalAlign: "middle" }}>
            {item.text}
          </Text>
        </TouchableOpacity>
    )
  }
  
  return (
    <View className="flex-1">
      <View className="h-[90px] bg-[#3E4FF5] rounded-bl-[30px] rounded-br-[30px]">
        <Text
          className="flex-1 text-white text-center text-[20px] font-bold m-auto"
          style={{ verticalAlign: "middle" }}
        >
          Thông báo
        </Text>
      </View>
      <View className="flex-1 h-[60px] w-[87.5%] border m-auto">
        <FlatList
        data={data}
        keyExtractor={(item:any)=>item.id.toString()}
        renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default Notification;
