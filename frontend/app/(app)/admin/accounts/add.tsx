import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  FlatList
} from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function AddMember () {
  const router = useRouter()
  const params = useLocalSearchParams()
  // Fix ScrollView reference with proper typing
  const scrollViewRef = useRef<ScrollView>(null)

  // Kiểm tra nếu là chỉnh sửa
  const isEdit = params.isEdit === 'true'

  // Ép kiểu các giá trị từ params thành string
  const [cardNumber, setCardNumber] = useState(
    (params.cardNumber as string) || ''
  )
  const [name, setName] = useState((params.name as string) || '')
  const [gender, setGender] = useState((params.gender as string) || 'Nam')
  const [dob, setDob] = useState((params.dob as string) || '')
  const [branch, setBranch] = useState((params.branch as string) || '')
  const [phone, setPhone] = useState((params.phone as string) || '')
  const [email, setEmail] = useState((params.email as string) || '')
  const [hometown, setHometown] = useState((params.hometown as string) || '')
  const [address, setAddress] = useState((params.address as string) || '')
  const [ethnicity, setEthnicity] = useState((params.ethnicity as string) || '')
  const [religion, setReligion] = useState((params.religion as string) || '')
  const [education, setEducation] = useState((params.education as string) || '')
  const [joinDate, setJoinDate] = useState((params.joinDate as string) || '')

  // Modal state for custom dropdowns
  const [modalVisible, setModalVisible] = useState(false)
  const [currentDropdown, setCurrentDropdown] = useState('')
  const [dropdownOptions, setDropdownOptions] = useState<string[]>([])
  const [dropdownTitle, setDropdownTitle] = useState('')

  // Function to handle dropdown selection
  const handleDropdownChange = (value: string) => {
    switch (currentDropdown) {
      case 'gender':
        setGender(value)
        break
      case 'ethnicity':
        setEthnicity(value)
        break
      case 'religion':
        setReligion(value)
        break
      case 'education':
        setEducation(value)
        break
    }
    setModalVisible(false)
  }

  // Function to show dropdown modal
  const showDropdown = (type: string, options: string[], title: string) => {
    setCurrentDropdown(type)
    setDropdownOptions(options)
    setDropdownTitle(title)
    setModalVisible(true)
  }

  const handleSubmit = () => {
    const memberData = {
      cardNumber,
      name,
      gender,
      dob,
      branch,
      phone,
      email,
      hometown,
      address,
      ethnicity,
      religion,
      education,
      joinDate
    }
    console.log(isEdit ? 'Chỉnh sửa đoàn viên:' : 'Thêm đoàn viên:', memberData)
    router.back() // Quay lại trang danh sách
  }

  // Improved function to scroll to input positions
  const scrollToInput = (y: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y, animated: true })
    }
  }

  return (
    <SafeAreaView className='flex-1 bg-gray-50'>
      {/* Header */}
      <View className='bg-blue-600 p-4 flex-row items-center'>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name='arrow-back' size={24} color='white' />
        </TouchableOpacity>
        <Text className='text-white text-xl font-bold ml-4'>
          {isEdit ? 'Chỉnh sửa đoàn viên' : 'Thêm đoàn viên mới'}
        </Text>
      </View>

      {/* KeyboardAvoidingView for handling keyboard */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className='flex-1'
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {/* Form nhập liệu cuộn */}
        <ScrollView
          ref={scrollViewRef}
          className='flex-1'
          keyboardShouldPersistTaps='handled'
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <View className='p-4'>
            <Text className='mb-2 text-gray-700'>Số thẻ đoàn</Text>
            <TextInput
              className='border border-gray-200 p-3 rounded-lg bg-white mb-4 text-gray-700'
              placeholder='Nhập số thẻ đoàn của đoàn viên'
              placeholderTextColor='#9CA3AF'
              value={cardNumber}
              onChangeText={setCardNumber}
              onFocus={() => scrollToInput(0)}
              style={{ shadowColor: 'transparent', elevation: 0 }}
            />

            <Text className='mb-2 text-gray-700'>Họ và tên đoàn viên</Text>
            <TextInput
              className='border border-gray-200 p-3 rounded-lg bg-white mb-4 text-gray-700'
              placeholder='Nhập tên đoàn viên'
              placeholderTextColor='#9CA3AF'
              value={name}
              onChangeText={setName}
              onFocus={() => scrollToInput(60)}
              style={{ shadowColor: 'transparent', elevation: 0 }}
            />

            <Text className='mb-2 text-gray-700'>Giới tính</Text>
            <TouchableOpacity
              className='border border-gray-200 p-3 rounded-lg bg-white mb-4 flex-row justify-between items-center'
              style={{ shadowColor: 'transparent', elevation: 0 }}
              onPress={() =>
                showDropdown('gender', ['Nam', 'Nữ'], 'Chọn giới tính')
              }
            >
              <Text className={gender ? 'text-gray-700' : 'text-gray-400'}>
                {gender || 'Chọn giới tính'}
              </Text>
              <Ionicons name='chevron-down' size={20} color='#9CA3AF' />
            </TouchableOpacity>

            <Text className='mb-2 text-gray-700'>Chức vụ</Text>
            <TextInput
              className='border border-gray-200 p-3 rounded-lg bg-white mb-4 text-gray-700'
              placeholder='Chọn chức vụ của đoàn viên'
              placeholderTextColor='#9CA3AF'
              value={branch}
              onChangeText={setBranch}
              onFocus={() => scrollToInput(180)}
              style={{ shadowColor: 'transparent', elevation: 0 }}
            />

            <Text className='mb-2 text-gray-700'>Số điện thoại</Text>
            <TextInput
              className='border border-gray-200 p-3 rounded-lg bg-white mb-4 text-gray-700'
              placeholder='Nhập số điện thoại của đoàn viên'
              placeholderTextColor='#9CA3AF'
              value={phone}
              onChangeText={setPhone}
              keyboardType='phone-pad'
              onFocus={() => scrollToInput(240)}
              style={{ shadowColor: 'transparent', elevation: 0 }}
            />

            <Text className='mb-2 text-gray-700'>Email</Text>
            <TextInput
              className='border border-gray-200 p-3 rounded-lg bg-white mb-4 text-gray-700'
              placeholder='Nhập địa chỉ Email của đoàn viên'
              placeholderTextColor='#9CA3AF'
              value={email}
              onChangeText={setEmail}
              keyboardType='email-address'
              onFocus={() => scrollToInput(300)}
              style={{ shadowColor: 'transparent', elevation: 0 }}
            />

            <Text className='mb-2 text-gray-700'>Quê quán</Text>
            <View
              className='flex-row items-center border border-gray-200 p-3 rounded-lg bg-white mb-4'
              style={{ shadowColor: 'transparent', elevation: 0 }}
            >
              <TextInput
                className='flex-1 text-gray-700'
                placeholder='Nhập quê quán của đoàn viên'
                placeholderTextColor='#9CA3AF'
                value={hometown}
                onChangeText={setHometown}
                onFocus={() => scrollToInput(360)}
              />
              <Ionicons name='location-outline' size={24} color='#9CA3AF' />
            </View>

            <Text className='mb-2 text-gray-700'>Địa chỉ</Text>
            <View
              className='flex-row items-center border border-gray-200 p-3 rounded-lg bg-white mb-4'
              style={{ shadowColor: 'transparent', elevation: 0 }}
            >
              <TextInput
                className='flex-1 text-gray-700'
                placeholder='Nhập địa chỉ của đoàn viên'
                placeholderTextColor='#9CA3AF'
                value={address}
                onChangeText={setAddress}
                onFocus={() => scrollToInput(420)}
              />
              <Ionicons name='location-outline' size={24} color='#9CA3AF' />
            </View>

            <Text className='mb-2 text-gray-700'>Dân tộc</Text>
            <TouchableOpacity
              className='border border-gray-200 p-3 rounded-lg bg-white mb-4 flex-row justify-between items-center'
              style={{ shadowColor: 'transparent', elevation: 0 }}
              onPress={() =>
                showDropdown('ethnicity', ['Kinh', 'Khác'], 'Chọn dân tộc')
              }
            >
              <Text className={ethnicity ? 'text-gray-700' : 'text-gray-400'}>
                {ethnicity || 'Chọn dân tộc'}
              </Text>
              <Ionicons name='chevron-down' size={20} color='#9CA3AF' />
            </TouchableOpacity>

            <Text className='mb-2 text-gray-700'>Tôn giáo</Text>
            <TouchableOpacity
              className='border border-gray-200 p-3 rounded-lg bg-white mb-4 flex-row justify-between items-center'
              style={{ shadowColor: 'transparent', elevation: 0 }}
              onPress={() =>
                showDropdown(
                  'religion',
                  ['Không', 'Phật giáo'],
                  'Chọn tôn giáo'
                )
              }
            >
              <Text className={religion ? 'text-gray-700' : 'text-gray-400'}>
                {religion || 'Chọn tôn giáo'}
              </Text>
              <Ionicons name='chevron-down' size={20} color='#9CA3AF' />
            </TouchableOpacity>

            <Text className='mb-2 text-gray-700'>Trình độ học vấn</Text>
            <TouchableOpacity
              className='border border-gray-200 p-3 rounded-lg bg-white mb-4 flex-row justify-between items-center'
              style={{ shadowColor: 'transparent', elevation: 0 }}
              onPress={() =>
                showDropdown(
                  'education',
                  ['Đại học', 'Cao đẳng'],
                  'Chọn trình độ học vấn'
                )
              }
            >
              <Text className={education ? 'text-gray-700' : 'text-gray-400'}>
                {education || 'Chọn trình độ học vấn'}
              </Text>
              <Ionicons name='chevron-down' size={20} color='#9CA3AF' />
            </TouchableOpacity>

            <Text className='mb-2 text-gray-700'>Ngày vào đoàn</Text>
            <TextInput
              className='border border-gray-200 p-3 rounded-lg bg-white mb-4 text-gray-700'
              placeholder='Chọn ngày vào đoàn của đoàn viên'
              placeholderTextColor='#9CA3AF'
              value={joinDate}
              onChangeText={setJoinDate}
              onFocus={() => scrollToInput(600)}
              style={{ shadowColor: 'transparent', elevation: 0 }}
            />

            <TouchableOpacity
              className='bg-blue-600 p-4 rounded-lg flex-row justify-center items-center mt-2'
              onPress={handleSubmit}
            >
              <Ionicons name='save' size={24} color='white' />
              <Text className='text-white font-bold ml-2 text-base'>
                {isEdit ? 'Lưu thay đổi' : 'Lưu'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Custom Dropdown Modal */}
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          className='flex-1 justify-end'
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} // Thay bg-black bg-opacity-50
        >
          <View className='bg-white rounded-t-xl'>
            <View className='p-4 border-b border-gray-200 flex-row justify-between items-center'>
              <Text className='text-lg font-bold text-gray-800'>
                {dropdownTitle}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name='close' size={24} color='#4B5563' />
              </TouchableOpacity>
            </View>

            <FlatList
              data={dropdownOptions}
              keyExtractor={item => item}
              style={{ maxHeight: 300 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className='p-6 border-b border-gray-100'
                  onPress={() => handleDropdownChange(item)}
                >
                  <Text className='text-gray-700 text-base'>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}
