import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

interface DocumentItemProps {
  title: string;
  date?: string;
  createdAt?: string;
  type?: string;
  onPress?: () => void;
  onDelete?: () => void;
}

const DocumentItem: React.FC<DocumentItemProps> = ({
  title,
  date,
  createdAt,
  type,
  onPress,
  onDelete,
}) => {
  return (
    <TouchableOpacity
      className='bg-white rounded-lg border border-gray-200 p-3 mb-2 shadow-sm'
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Document Title */}
      <View className='flex-row justify-between items-center'>
        <Text className='font-medium text-base flex-1 pr-2' numberOfLines={2}>
          {title}
        </Text>
        <Feather name='arrow-right' size={20} color='#414141' />
      </View>

      {/* Document Metadata - Full width horizontal layout */}
      <View className='mt-3 flex-row justify-between w-full'>
        {date && (
          <View className='flex-row items-center flex-1'>
            <Feather name='calendar' size={14} color='#414141' />
            <Text className='text-gray-600 text-xs ml-1' numberOfLines={1}>
              {date}
            </Text>
          </View>
        )}

        {createdAt && (
          <View className='flex-row items-center flex-1 mx-1'>
            <Feather name='map-pin' size={14} color='#414141' />
            <Text className='text-gray-600 text-xs ml-1' numberOfLines={1}>
              {createdAt}
            </Text>
          </View>
        )}

        {type && (
          <View className='flex-row items-center flex-1'>
            <Feather name='file-text' size={14} color='#414141' />
            <Text className='text-gray-600 text-xs ml-1' numberOfLines={1}>
              {type}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default DocumentItem;
