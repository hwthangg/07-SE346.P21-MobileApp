import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";

const ChapterGeneralTab = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  // Get chapter info
  const chapterInfo = {
    id: params.id as string,
    name: (params.name as string) || "Thành Đoàn TP. Hồ Chí Minh",
    address:
      (params.address as string) ||
      "Số 1 Phạm Ngọc Thạch, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
    affiliated:
      (params.affiliated as string) ||
      "Trung ương Đoàn Thanh niên Cộng sản Hồ Chí Minh",
    foundingDate: "26/3/1930",
    image:
      (params.image as string) ||
      "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
  };

  return (
    <ScrollView className='flex-1 bg-white px-4 py-4'>
      {/* Address */}
      <View className='mb-4'>
        <Text className='text-gray-800 font-medium mb-2'>Địa chỉ</Text>
        <View className='border border-gray-300 rounded-lg p-3'>
          <Text className='text-gray-700'>{chapterInfo.address}</Text>
        </View>
      </View>

      {/* Parent Organization */}
      <View className='mb-4'>
        <Text className='text-gray-800 font-medium mb-2'>Đoàn trực thuộc</Text>
        <View className='border border-gray-300 rounded-lg p-3'>
          <Text className='text-gray-700'>{chapterInfo.affiliated}</Text>
        </View>
      </View>

      {/* Founding Date */}
      <View className='mb-4'>
        <Text className='text-gray-800 font-medium mb-2'>Ngày thành lập</Text>
        <View className='border border-gray-300 rounded-lg p-3'>
          <Text className='text-gray-700'>{chapterInfo.foundingDate}</Text>
        </View>
      </View>

      {/* Edit Button */}
      <View className='items-center mt-4'>
        <TouchableOpacity
          className='bg-[#3E4FF5] py-2.5 px-5 rounded-lg flex-row items-center justify-center'
          onPress={() => {
            // Navigation logic for editing
          }}
        >
          <Feather
            name='edit-2'
            size={16}
            color='white'
            style={{ marginRight: 5 }}
          />
          <Text className='text-white font-medium'>Chỉnh sửa</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ChapterGeneralTab;
