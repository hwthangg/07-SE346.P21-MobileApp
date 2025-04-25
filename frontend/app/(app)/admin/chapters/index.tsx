import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import ChapterCard from "@/components/ChapterCard";
import { useRouter } from "expo-router";

// Define a type interface for chapter data
interface ChapterType {
  id?: string; // Adding optional id field
  name: string;
  address: string;
  affiliated: string;
  secretary: string;
  image: string;
}

// Simple dropdown component that shows options directly beneath it
const Dropdown = ({
  options,
  placeholder,
  onSelect,
  selectedValue,
  isOpen,
  onToggle,
}: {
  options: string[];
  placeholder: string;
  onSelect: (value: string) => void;
  selectedValue: string;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <View className='w-[48%]'>
      {/* Dropdown header */}
      <TouchableOpacity
        onPress={onToggle}
        className='flex-row items-center justify-between p-3 border border-gray-200 rounded-lg'
      >
        <Text className='text-gray-700 text-base' numberOfLines={1}>
          {selectedValue || placeholder}
        </Text>
        <Feather
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={20}
          color='#333'
        />
      </TouchableOpacity>

      {/* Dropdown options */}
      {isOpen && (
        <View className='border border-gray-200 rounded-lg mt-1 absolute top-full left-0 right-0 bg-white z-20 max-h-40 shadow-md'>
          <ScrollView nestedScrollEnabled={true}>
            {options.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  onSelect(item);
                  onToggle();
                }}
                className='p-3 border-b border-gray-100'
              >
                <Text className='text-gray-700 text-base'>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const ChapterList = () => {
  const router = useRouter();
  const [selectedTrucThuoc, setSelectedTrucThuoc] = useState("");
  const [selectedNoiBanHanh, setSelectedNoiBanHanh] = useState("");

  const [trucThuocOpen, setTrucThuocOpen] = useState(false);
  const [noiBanHanhOpen, setNoiBanHanhOpen] = useState(false);

  const trucThuocItems = [
    "Thành Đoàn TP. Hồ Chí Minh",
    "Đoàn Đại học Quốc gia TP. Hồ Chí Minh",
    "Đoàn Trường Đại học Bách Khoa",
    "Đoàn Trường Đại học Khoa học Tự nhiên",
    "Đoàn Trường Đại học Kinh tế - Luật",
  ];

  const noiBanHanhItems = [
    "Ban Chấp hành Đoàn Trường",
    "Ban Chấp hành Đoàn Khoa",
    "Ban Chấp hành Đoàn Lớp",
    "Ban Chấp hành Đoàn Thành phố",
    "Ban Chấp hành Đoàn Quốc gia",
  ];

  const toggleTrucThuoc = () => {
    setTrucThuocOpen(!trucThuocOpen);
    if (!trucThuocOpen) {
      setNoiBanHanhOpen(false);
    }
  };

  const toggleNoiBanHanh = () => {
    setNoiBanHanhOpen(!noiBanHanhOpen);
    if (!noiBanHanhOpen) {
      setTrucThuocOpen(false);
    }
  };

  const chapters: ChapterType[] = [
    {
      id: "1",
      name: "Thành Đoàn TP. Hồ Chí Minh",
      address: "Khu Phố 5, Phường Linh Trung, TP. Thủ Đức, TP. Hồ Chí Minh",
      affiliated: "Đoàn Đại học Quốc gia TP. Hồ Chí Minh",
      secretary: "Không có thông tin",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    },
    {
      id: "2",
      name: "Thành Đoàn TP. Hồ Chí Minh",
      address: "Khu Phố 5, Phường Linh Trung, TP. Thủ Đức, TP. Hồ Chí Minh",
      affiliated: "Đoàn Đại học Quốc gia TP. Hồ Chí Minh",
      secretary: "Không có thông tin",
      image: "https://placehold.co/100x100/gray/white",
    },
  ];

  // Function to handle navigation to detail screen 
  const handleChapterPress = (chapter: ChapterType) => {
    router.push({
      pathname: `/(app)/admin/chapters/[id]/(tabs)/general`,
      params: {
        id: chapter.id || "1",
        name: chapter.name,
        address: chapter.address,
        affiliated: chapter.affiliated,
        secretary: chapter.secretary,
        image: chapter.image,
      },
    });
  };

  // Function to handle navigation to edit screen
  const handleAddChapter = () => {
    router.push("/admin/chapters/edit");
  };

  return (
    <SafeAreaView className='flex-1 bg-white'>
      {/* Header Section */}
      <View className='w-full bg-[#3E4FF5] py-8 px-4 rounded-b-xl'>
        <Text className='text-white text-3xl font-bold text-center mb-4'>
          Danh sách chi đoàn
        </Text>
      </View>

      {/* Search Bar */}
      <View className='w-[90%] -mt-6 mb-4 mx-auto flex-row items-center bg-white rounded-lg p-3 shadow-md z-10'>
        <Feather name='search' size={24} color='#888' className='mr-2' />
        <TextInput
          placeholder='Nhập tên chi đoàn'
          placeholderTextColor='#888'
          className='flex-1 py-2 text-gray-700 text-base'
        />
      </View>

      <ScrollView className='flex-1 bg-white'>
        {/* Content container */}
        <View className='w-[90%] mx-auto pt-1'>
          {/* Dropdowns with reduced margin below */}
          <View className='flex-row justify-between mb-6 w-full'>
            {/* First Dropdown */}
            <Dropdown
              options={trucThuocItems}
              placeholder='Trực thuộc'
              selectedValue={selectedTrucThuoc}
              onSelect={setSelectedTrucThuoc}
              isOpen={trucThuocOpen}
              onToggle={toggleTrucThuoc}
            />

            {/* Second Dropdown */}
            <Dropdown
              options={noiBanHanhItems}
              placeholder='Nơi ban hành'
              selectedValue={selectedNoiBanHanh}
              onSelect={setSelectedNoiBanHanh}
              isOpen={noiBanHanhOpen}
              onToggle={toggleNoiBanHanh}
            />
          </View>

          {/* Add New Button */}
          <TouchableOpacity
            className='bg-blue-600 py-3 rounded-lg flex-row items-center justify-center mb-4 w-3/6 mx-auto'
            onPress={handleAddChapter}
          >
            <Text className='text-white font-semibold'>
              + Thêm chi đoàn mới
            </Text>
          </TouchableOpacity>

          {/* Chapters List */}
          {chapters.map((chapter, index) => (
            <ChapterCard
              key={index}
              name={chapter.name}
              address={chapter.address}
              affiliated={chapter.affiliated}
              secretary={chapter.secretary}
              image={chapter.image}
              onPress={() => handleChapterPress(chapter)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChapterList;
