import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Định nghĩa kiểu dữ liệu cho member
type Member = {
  id: string;
  name: string;
  cardNumber: string;
};

export default function MembersList() {
  const router = useRouter();

  // Dữ liệu giả lập
  const members: Member[] = [
    { id: "1", name: "Võ Thế Quyền", cardNumber: "75TD6712" },
    { id: "2", name: "Nguyễn Văn A", cardNumber: "75TD6713" },
  ];

  const renderMemberItem = ({ item }: { item: Member }) => (
    <TouchableOpacity
      className='bg-white p-4 mb-2 rounded-lg flex-row items-center'
      onPress={() =>
        router.push({
          pathname: "/(app)/leader/members/detail",
          params: { id: item.id, name: item.name, cardNumber: item.cardNumber },
        })
      }
    >
      <View className='flex-1'>
        <Text className='font-bold text-base'>{item.name}</Text>
        <Text className='text-gray-600'>{item.cardNumber}</Text>
      </View>
      <Ionicons name='chevron-forward' size={24} color='#666' />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className='flex-1 bg-gray-100'>
      <View className='bg-blue-600 p-4'>
        <Text className='text-white text-xl font-bold text-center'>
          Danh sách đoàn viên
        </Text>
      </View>

      <FlatList
        className='px-4 mt-4'
        data={members}
        renderItem={renderMemberItem}
        keyExtractor={(item: Member) => item.id}
      />

      {/* Nút thêm mới */}
      <TouchableOpacity
        className='bg-blue-600 p-3 rounded-lg m-4 flex-row justify-center items-center'
        onPress={() => router.push("/(app)/leader/members/add")}
      >
        <Ionicons name='add' size={24} color='white' />
        <Text className='text-white font-bold ml-2'>Thêm đoàn viên mới</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
