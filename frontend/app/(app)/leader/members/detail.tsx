import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView
} from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function MemberDetail () {
  const router = useRouter()
  const params = useLocalSearchParams()

  const member = {
    id: params.id as string,
    name: params.name as string,
    cardNumber: params.cardNumber as string,
    phone: params.phone as string,
    branch: params.branch as string,
    gender: 'Nam',
    role: 'Admin',
    dob: '12/04/2004',
    email: 'vtquyen@gmail.com',
    hometown: 'Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
    address: 'Số 1 Phạm Ngọc Thạch, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
    ethnicity: 'Kinh',
    religion: 'Không',
    education: 'Đại học',
    joinDate: '26/03/2020',
    avatar:
      'https://images2.thanhnien.vn/Uploaded/nuvuong/2022_12_04/316131890-10230107628260392-757716651156732241-n-8044.jpg' // Thay bằng URL ảnh thật
  }

  return (
    <SafeAreaView className='flex-1 bg-gray-100'>
      {/* Header */}
      <View className='bg-blue-600 p-4 flex-row items-center'>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name='arrow-back' size={24} color='white' />
        </TouchableOpacity>
        <Text className='text-white text-xl font-bold ml-4'>{member.name}</Text>
      </View>

      {/* Nội dung cuộn */}
      <ScrollView className='flex-1'>
        {/* Ảnh đại diện và thông tin cơ bản */}
        <View className='items-center mt-4'>
          <Image
            source={{ uri: member.avatar }}
            className='w-24 h-24 rounded-full'
          />
          <Text className='text-xl font-bold mt-2'>{member.name}</Text>
        </View>

        {/* Thông tin chi tiết */}
        <View className='p-4'>
          <Text className='text-lg font-bold mb-2'>Quyền tài khoản</Text>
          <Text className='border border-gray-300 p-3 rounded-lg bg-white mb-4'>
            {member.role}
          </Text>

          <Text className='text-lg font-bold mb-2'>Số thẻ đoàn</Text>
          <Text className='border border-gray-300 p-3 rounded-lg bg-white mb-4'>
            {member.cardNumber}
          </Text>

          <Text className='mb-2'>Giới tính</Text>
          <Text className='border border-gray-300 p-3 rounded-lg bg-white mb-4'>
            {member.gender}
          </Text>

          <Text className='mb-2'>Ngày sinh</Text>
          <Text className='border border-gray-300 p-3 rounded-lg bg-white mb-4'>
            {member.dob}
          </Text>

          <Text className='mb-2'>Chức vụ</Text>
          <Text className='border border-gray-300 p-3 rounded-lg bg-white mb-4'>
            {member.branch}
          </Text>

          <Text className='mb-2'>Số điện thoại</Text>
          <Text className='border border-gray-300 p-3 rounded-lg bg-white mb-4'>
            {member.phone}
          </Text>

          <Text className='mb-2'>Email</Text>
          <Text className='border border-gray-300 p-3 rounded-lg bg-white mb-4'>
            {member.email}
          </Text>

          <Text className='mb-2'>Quê quán</Text>
          <Text className='border border-gray-300 p-3 rounded-lg bg-white mb-4'>
            {member.hometown}
          </Text>

          <Text className='mb-2'>Địa chỉ</Text>
          <Text className='border border-gray-300 p-3 rounded-lg bg-white mb-4'>
            {member.address}
          </Text>

          <Text className='mb-2'>Dân tộc</Text>
          <Text className='border border-gray-300 p-3 rounded-lg bg-white mb-4'>
            {member.ethnicity}
          </Text>

          <Text className='mb-2'>Tôn giáo</Text>
          <Text className='border border-gray-300 p-3 rounded-lg bg-white mb-4'>
            {member.religion}
          </Text>

          <Text className='mb-2'>Trình độ học vấn</Text>
          <Text className='border border-gray-300 p-3 rounded-lg bg-white mb-4'>
            {member.education}
          </Text>

          <Text className='mb-2'>Ngày vào đoàn</Text>
          <Text className='border border-gray-300 p-3 rounded-lg bg-white mb-4'>
            {member.joinDate}
          </Text>
        </View>

        {/* Nút Xóa và Chỉnh sửa */}
        <View className='flex-row justify-between p-4'>
          <TouchableOpacity
            className='bg-red-600 p-3 rounded-lg flex-1 mr-2 flex-row justify-center items-center'
            onPress={() => console.log('Xóa:', member.id)}
          >
            <Ionicons name='trash-outline' size={24} color='white' />
            <Text className='text-white font-bold ml-2'>Xóa</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className='bg-blue-600 p-3 rounded-lg flex-1 ml-2 flex-row justify-center items-center'
            onPress={() =>
              router.push({
                pathname: '/(app)/leader/members/add',
                params: { ...member, isEdit: 'true' }
              })
            }
          >
            <Ionicons name='pencil-outline' size={24} color='white' />
            <Text className='text-white font-bold ml-2'>Chỉnh sửa</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
