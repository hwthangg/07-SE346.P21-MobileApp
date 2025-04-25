import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";

const ChapterEditScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  // State for form inputs
  const [name, setName] = useState((params.name as string) || "");
  const [address, setAddress] = useState((params.address as string) || "");
  const [foundingDate, setFoundingDate] = useState(
    (params.foundingDate as string) || ""
  );
  const [selectedAffiliated, setSelectedAffiliated] = useState(
    (params.affiliated as string) || ""
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [imageUri, setImageUri] = useState((params.image as string) || "");
  const [imageError, setImageError] = useState(false);

  // Handle back navigation
  const handleBackNavigation = () => {
    router.back();
  };

  const showDatePickerHandler = () => {
    alert("Date picker functionality will be implemented later");
  };

  // Handle save changes
  const handleSaveChanges = () => {
    // Save logic here
    router.back();
  };

  // Mock data
  const affiliatedOptions = [
    "Thành Đoàn TP. Hồ Chí Minh",
    "Đoàn Đại học Quốc gia TP. Hồ Chí Minh",
    "Đoàn Trường Đại học Bách Khoa",
    "Đoàn Trường Đại học Khoa học Tự nhiên",
  ];

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Select affiliated
  const selectAffiliated = (affiliated: string) => {
    setSelectedAffiliated(affiliated);
    setIsDropdownOpen(false);
  };

  return (
    <SafeAreaView className='flex-1 bg-white'>
      {/* Header Section */}
      <View className='w-full bg-[#3E4FF5] py-8 px-4 rounded-b-xl'>
        <View className='flex-row items-center justify-center'>
          <TouchableOpacity
            onPress={handleBackNavigation}
            className='absolute left-0'
          >
            <Feather name='chevron-left' size={26} color='white' />
          </TouchableOpacity>
          <Text className='text-white text-2xl font-bold text-center'>
            Thêm chi đoàn mới
          </Text>
        </View>
      </View>

      <ScrollView className='flex-1 bg-white px-4'>
        {/* Chapter Logo */}
        <View className='items-center mt-6 mb-4 relative'>
          <View className='w-28 h-28 rounded-xl bg-[#F5F5F5] items-center justify-center overflow-hidden'>
            {imageError || !imageUri ? (
              <Feather name='image' size={40} color='#888' />
            ) : (
              <Image
                source={{
                  uri: imageUri,
                }}
                onError={() => setImageError(true)}
                className='w-28 h-28'
                resizeMode='cover'
              />
            )}
          </View>
          <TouchableOpacity
            className='absolute right-[35%] bottom-0 bg-[#3E4FF5] w-10 h-10 rounded-full items-center justify-center'
            onPress={() => {
              // Add image selection logic here
            }}
          >
            <Feather name='edit-2' size={18} color='white' />
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View className='mt-4'>
          {/* Name Field */}
          <View className='mb-4'>
            <Text className='text-gray-700 mb-2'>Tên</Text>
            <TextInput
              className='border border-gray-300 rounded-lg p-3 text-gray-700'
              placeholder='Nhập tên chi đoàn'
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Address Field */}
          <View className='mb-4 relative'>
            <Text className='text-gray-700 mb-2'>Địa chỉ</Text>
            <View className='relative'>
              <TextInput
                className='border border-gray-300 rounded-lg p-3 text-gray-700 pr-10'
                placeholder='Nhập địa chỉ chi đoàn'
                value={address}
                onChangeText={setAddress}
              />
              <TouchableOpacity
                className='absolute right-3 top-3'
                onPress={() => {
                  // Add location picker logic
                }}
              >
                <Feather name='map-pin' size={20} color='#3E4FF5' />
              </TouchableOpacity>
            </View>
          </View>

          {/* Founding Date Field - Manual Input with Calendar Icon */}
          <View className='mb-4'>
            <Text className='text-gray-700 mb-2'>Ngày thành lập</Text>
            <View className='relative'>
              <TextInput
                className='border border-gray-300 rounded-lg p-3 text-gray-700 pr-10'
                placeholder='DD/MM/YYYY'
                value={foundingDate}
                onChangeText={setFoundingDate}
              />
              <TouchableOpacity
                className='absolute right-3 top-3'
                onPress={showDatePickerHandler}
              >
                <Feather name='calendar' size={20} color='#3E4FF5' />
              </TouchableOpacity>
            </View>
          </View>

          {/* Parent Organization Field */}
          <View className='mb-4 relative'>
            <Text className='text-gray-700 mb-2'>Đoàn trực thuộc</Text>
            <TouchableOpacity
              onPress={toggleDropdown}
              className='border border-gray-300 rounded-lg p-3 flex-row justify-between items-center'
            >
              <Text className='text-gray-700'>
                {selectedAffiliated || "Chọn đoàn trực thuộc của chi đoàn"}
              </Text>
              <Feather
                name={isDropdownOpen ? "chevron-up" : "chevron-down"}
                size={20}
                color='#666'
              />
            </TouchableOpacity>

            {/* Dropdown */}
            {isDropdownOpen && (
              <View className='border border-gray-200 rounded-lg mt-1 absolute top-full left-0 right-0 bg-white z-20 max-h-40 shadow-md'>
                <ScrollView nestedScrollEnabled={true}>
                  {affiliatedOptions.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => selectAffiliated(option)}
                      className='p-3 border-b border-gray-100'
                    >
                      <Text className='text-gray-700'>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          className='bg-blue-600 py-3 rounded-lg flex-row items-center justify-center mb-4 w-3/6 mx-auto'
          onPress={handleSaveChanges}
        >
          <Feather name='save' size={18} color='white' className='mr-2' />
          <Text className='text-white font-semibold ml-2'>Lưu thay đổi</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChapterEditScreen;
