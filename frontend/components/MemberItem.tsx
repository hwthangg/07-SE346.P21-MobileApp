import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import { Feather } from "@expo/vector-icons";

interface MemberItemProps {
  fullname: string;
  id?: string;
  chapterId?: string;
  phoneNumber?: string;
  imageUri?: ImageSourcePropType;
  onPress?: () => void;
  onDelete?: () => void;
}

const MemberItem: React.FC<MemberItemProps> = ({
  fullname,
  id = "",
  chapterId = "",
  phoneNumber = "",
  imageUri,
  onPress,
  onDelete,
}) => {
  return (
    <TouchableOpacity
      className='bg-white rounded-lg border border-gray-200 p-3 mb-2 shadow-sm'
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View className='flex-row'>
        {/* Profile Image */}
        {imageUri ? (
          <Image
            source={imageUri}
            className='w-16 h-16 rounded-full mr-3'
            resizeMode='cover'
          />
        ) : (
          <View className='w-16 h-16 rounded-full bg-gray-200 mr-3 items-center justify-center'>
            <Feather name='user' size={24} color='#888' />
          </View>
        )}

        {/* Content */}
        <View className='flex-1'>
          {/* Member name */}
          <Text className='font-medium text-lg'>{fullname}</Text>

          {/* Member details */}
          <View className='mt-1'>
            {id && (
              <View className='flex-row items-center mb-1'>
                <Feather name='mail' size={14} color='#666' />
                <Text className='text-gray-600 text-xs ml-2'>
                  <Text className='font-bold'>Số thẻ đoàn:</Text> {id}
                </Text>
              </View>
            )}

            {phoneNumber && (
              <View className='flex-row items-center mb-1'>
                <Feather name='phone' size={14} color='#666' />
                <Text className='text-gray-600 text-xs ml-2'>
                  <Text className='font-bold'>Số điện thoại:</Text>{" "}
                  {phoneNumber}
                </Text>
              </View>
            )}

            {chapterId && (
              <View className='flex-row items-center'>
                <Feather name='user' size={14} color='#666' />
                <Text className='text-gray-600 text-xs ml-2'>
                  <Text className='font-bold'>Chi đoàn:</Text> {chapterId}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Right column - with arrow at top and centered trash can */}
        <View className='h-full justify-between items-center'>
          <Feather name='chevron-right' size={20} color='#888' />

          {onDelete && (
            <TouchableOpacity
              onPress={onDelete}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              className='absolute top-1/2 -translate-y-2'
            >
              <Feather name='trash-2' size={20} color='#FF3B30' />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MemberItem;
