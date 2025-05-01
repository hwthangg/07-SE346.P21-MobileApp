import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Entypo, MaterialIcons, Feather } from "@expo/vector-icons";
import "@/app/global.css";

interface ChapterCardProps {
  name: string;
  address: string;
  affiliated: string;
  secretary: string;
  image: string;
  onPress?: () => void;
}

const ChapterCard: React.FC<ChapterCardProps> = ({
  name,
  address,
  affiliated,
  secretary,
  image,
  onPress,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className='p-4 bg-white rounded-lg shadow-lg mb-4' // Tailwind classes for shadow
    >
      {/* Top: Name + Chevron */}
      <View className='flex-row justify-between items-start mb-2'>
        <Text className='text-xl font-bold text-black-900 flex-1'>{name}</Text>
        <Entypo name='chevron-right' size={20} color='#888' />
      </View>

      {/* Bottom: Avatar on left, Text Block on right */}
      <View className='flex-row'>
        {/* Left: Avatar with right spacing */}
        <View className='mr-9 justify-center'>
          <View className='w-16 h-16 rounded-full bg-gray-200 items-center justify-center overflow-hidden'>
            {imageError || !image ? (
              <Feather name='image' size={28} color='#888' />
            ) : (
              <Image
                source={{ uri: image }}
                onError={() => setImageError(true)}
                className='w-16 h-16'
                resizeMode='cover'
              />
            )}
          </View>
        </View>

        {/* Right: Text Block with spacing between lines */}
        <View className='flex-1 justify-center space-y-1'>
          <View className='flex-row items-start'>
            <Entypo
              name='location-pin'
              size={16}
              color='#555'
              style={{ marginTop: 2 }}
            />
            <Text className='text-sm text-gray-700 ml-1 flex-1'>
              <Text className='font-semibold'>Địa chỉ: </Text>
              {address}
            </Text>
          </View>

          <View className='flex-row items-start'>
            <Feather
              name='home'
              size={16}
              color='#555'
              style={{ marginTop: 2 }}
            />
            <Text className='text-sm text-gray-700 ml-1 flex-1'>
              <Text className='font-semibold'>Trực thuộc: </Text>
              {affiliated}
            </Text>
          </View>

          <View className='flex-row items-start'>
            <MaterialIcons
              name='person-outline'
              size={16}
              color='#555'
              style={{ marginTop: 2 }}
            />
            <Text className='text-sm text-gray-700 ml-1 flex-1'>
              <Text className='font-semibold'>Bí thư: </Text>
              {secretary}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChapterCard;
