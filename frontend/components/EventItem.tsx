import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

interface EventItemProps {
  title: string;
  time?: string;
  location?: string;
  status?: string;
  onPress?: () => void;
  onDelete?: () => void;
}

const EventItem: React.FC<EventItemProps> = ({
  title,
  time = "Thời gian",
  location = "Địa điểm",
  status = "Tình trạng",
  onPress,
  onDelete,
}) => {
  return (
    <TouchableOpacity
      className='bg-white rounded-lg border border-gray-200 p-3 mb-2 shadow-sm'
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View className='flex-row justify-between items-center'>
        <Text className='font-medium text-base flex-1 pr-2' numberOfLines={2}>
          {title}
        </Text>

        {onDelete && (
          <TouchableOpacity
            onPress={onDelete}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Feather name='trash-2' size={20} color='#FF3B30' />
          </TouchableOpacity>
        )}
      </View>

      <View className='flex-row mt-3 flex-wrap'>
        <View className='flex-row items-center mr-4 mb-1'>
          <Feather name='clock' size={14} color='#666' />
          <Text className='text-gray-600 text-xs ml-1'>{time}</Text>
        </View>

        <View className='flex-row items-center mr-4 mb-1'>
          <Feather name='map-pin' size={14} color='#666' />
          <Text className='text-gray-600 text-xs ml-1'>{location}</Text>
        </View>

        <View className='flex-row items-center mb-1'>
          <Feather name='info' size={14} color='#666' />
          <Text className='text-gray-600 text-xs ml-1'>{status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EventItem;
