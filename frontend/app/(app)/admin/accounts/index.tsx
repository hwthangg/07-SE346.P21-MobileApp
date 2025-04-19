import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
  TextInput
} from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

// Định nghĩa kiểu dữ liệu cho member
type Member = {
  id: string
  name: string
  cardNumber: string
  phone: string
  branch: string
  avatar?: string // Ảnh đại diện (có thể là URL hoặc local path)
}

export default function MembersList () {
  const router = useRouter()

  // Dữ liệu giả lập (có thể thay bằng dữ liệu thật từ API)
  const members: Member[] = [
    {
      id: '1',
      name: 'Võ Thế Quyền',
      cardNumber: '75TD6712',
      phone: '0946001469',
      branch: 'Chi đoàn TH.HCM',
      avatar:
        'https://images2.thanhnien.vn/Uploaded/nuvuong/2022_12_04/317097199-9077169845630020-6360913673153753956-n-2121.jpg' // Thay bằng URL ảnh thật
    },
    {
      id: '2',
      name: 'Võ Thế Quyền',
      cardNumber: '75TD6712',
      phone: '0946001469',
      branch: 'Chi đoàn A',
      avatar:
        'https://images2.thanhnien.vn/Uploaded/nuvuong/2022_12_04/316131890-10230107628260392-757716651156732241-n-8044.jpg' // Thay bằng URL ảnh thật
    }
  ]

  const renderMemberItem = ({ item }: { item: Member }) => (
    <TouchableOpacity
      className='bg-white p-4 mb-2 rounded-lg flex-row items-center'
      onPress={() =>
        router.push({
          pathname: '/(app)/admin/accounts/detail',
          params: {
            id: item.id,
            name: item.name,
            cardNumber: item.cardNumber,
            phone: item.phone,
            branch: item.branch
          }
        })
      }
    >
      {/* Ảnh đại diện */}
      <Image
        source={{ uri: item.avatar }}
        className='w-12 h-12 rounded-full mr-4'
      />
      <View className='flex-1'>
        <Text className='font-bold text-base'>{item.name}</Text>
        <View className='flex-row items-center mt-1'>
          <Ionicons name='card-outline' size={16} color='#666' />
          <Text className='text-gray-600 ml-1'>
            Số thẻ đoàn: {item.cardNumber}
          </Text>
        </View>
        <View className='flex-row items-center mt-1'>
          <Ionicons name='call-outline' size={16} color='#666' />
          <Text className='text-gray-600 ml-1'>
            Số điện thoại: {item.phone}
          </Text>
        </View>
        <View className='flex-row items-center mt-1'>
          <Ionicons name='people-outline' size={16} color='#666' />
          <Text className='text-gray-600 ml-1'>Chi đoàn: {item.branch}</Text>
        </View>
      </View>
      {/* Nút xóa */}
      <TouchableOpacity onPress={() => console.log('Xóa:', item.id)}>
        <Ionicons name='trash-outline' size={24} color='red' />
      </TouchableOpacity>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView className='flex-1 bg-gray-100'>
      {/* Header */}
      <View className='bg-blue-600 p-4 flex-row items-center justify-between'>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name='arrow-back' size={24} color='white' />
        </TouchableOpacity>
        <Text className='text-white text-xl font-bold'>
          Danh sách đoàn viên
        </Text>
        <TouchableOpacity
          onPress={() => router.push('/(app)/admin/accounts/add')}
        >
          <Ionicons name='add' size={24} color='white' />
        </TouchableOpacity>
      </View>

      {/* Ô tìm kiếm */}
      <View className='p-4'>
        <TextInput
          className='border border-gray-300 p-3 rounded-lg bg-white'
          placeholder='Nhập thông tin đoàn viên'
          placeholderTextColor='#6B7280'
        />
      </View>

      {/* Danh sách */}
      <FlatList
        className='px-4'
        data={members}
        renderItem={renderMemberItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  )
}
