import React, { useState, useRef, useEffect } from 'react' // Thêm useEffect
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
  FlatList,
  Alert // Thêm Alert
} from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { Ionicons, Feather } from '@expo/vector-icons' // Thêm Feather cho icon hiện/ẩn mật khẩu

export default function AddMember () {
  const router = useRouter()
  const params = useLocalSearchParams<{
    isEdit?: 'true' | 'false'
    id?: string // Giữ lại id cho chế độ edit
    // Các trường từ RegisterScreen có thể được truyền qua params khi edit
    name?: string // Sẽ là fullname
    email?: string
    phone?: string
    dob?: string // Dự kiến format "DD/MM/YYYY"
    gender?: string // "Nam" hoặc "Nữ"
    // Mật khẩu thường không truyền qua params
  }>()

  const scrollViewRef = useRef<ScrollView>(null)
  const isEdit = params.isEdit === 'true'

  // States cho các trường giống RegisterSreen
  const [name, setName] = useState('') // Đổi từ fullname cho nhất quán với params
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [dob, setDob] = useState('') // Ngày sinh dạng text input
  const [gender, setGender] = useState('') // Sẽ dùng modal dropdown

  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isRePasswordVisible, setIsRePasswordVisible] = useState(false)

  // Modal state for custom dropdowns (chỉ giữ lại cho Gender)
  const [modalVisible, setModalVisible] = useState(false)
  const [dropdownOptions, setDropdownOptions] = useState<string[]>([])
  const [dropdownTitle, setDropdownTitle] = useState('')

  // Khởi tạo giá trị form nếu là chế độ chỉnh sửa
  useEffect(() => {
    if (isEdit) {
      setName(params.name || '')
      setEmail(params.email || '')
      setPhone(params.phone || '')
      setDob(params.dob || '') // Giả sử dob từ params là string "DD/MM/YYYY"
      setGender(params.gender || '') // "Nam" hoặc "Nữ"

      // Mật khẩu không điền sẵn khi edit
      setPassword('')
      setRePassword('')
    }
  }, [params, isEdit])

  // Function to handle dropdown selection (chỉ cho Gender)
  const handleGenderChange = (value: string) => {
    setGender(value)
    setModalVisible(false)
  }

  // Function to show dropdown modal (chỉ cho Gender)
  const showGenderDropdown = () => {
    setDropdownOptions(['Nam', 'Nữ', 'Khác']) // Các tùy chọn giới tính
    setDropdownTitle('Chọn giới tính')
    setModalVisible(true)
  }

  const handleSubmit = () => {
    // --- VALIDATION ---
    if (!name.trim()) {
      Alert.alert('Lỗi', 'Họ và tên không được để trống.')
      return
    }
    if (!email.trim()) {
      Alert.alert('Lỗi', 'Email không được để trống.')
      return
    }
    // (Thêm regex cho email nếu cần)
    if (!phone.trim()) {
      Alert.alert('Lỗi', 'Số điện thoại không được để trống.')
      return
    }
    // (Thêm regex cho SĐT nếu cần)
    if (!dob.trim()) {
      Alert.alert('Lỗi', 'Ngày sinh không được để trống.')
      return
    }
    // (Thêm validation cho format ngày sinh nếu cần)
    if (!gender) {
      Alert.alert('Lỗi', 'Vui lòng chọn giới tính.')
      return
    }

    // Đối với tạo mới, hoặc khi edit mà người dùng có nhập mật khẩu mới
    if (!isEdit || (isEdit && password)) {
      if (password.length < 6) {
        Alert.alert('Lỗi', 'Mật khẩu phải có ít nhất 6 ký tự.')
        return
      }
      if (password !== rePassword) {
        Alert.alert('Lỗi', 'Mật khẩu nhập lại không khớp.')
        return
      }
    }

    const memberData: any = {
      id: params.id, // Giữ lại ID cho trường hợp edit
      name: name, // Họ tên
      email: email,
      phone: phone,
      dob: dob, // Ngày sinh dạng "DD/MM/YYYY"
      gender: gender
    }

    // Chỉ thêm mật khẩu vào dữ liệu gửi đi nếu tạo mới, hoặc nếu đang edit và có nhập mật khẩu mới
    if (!isEdit || (isEdit && password)) {
      memberData.password = password
    }

    console.log(
      isEdit ? 'Chỉnh sửa thành viên:' : 'Thêm thành viên:',
      memberData
    )
    Alert.alert(
      isEdit ? 'Thành công' : 'Thành công',
      isEdit ? 'Thông tin tài khoản đã được cập nhật.' : 'Đã tạo tài khoản mới.'
    )
    router.back() // Quay lại trang danh sách
  }

  // Hàm cuộn không đổi
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
          {isEdit ? 'Chỉnh sửa Tài khoản' : 'Tạo Tài khoản Mới'}
        </Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className='flex-1'
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0} // Điều chỉnh nếu cần
      >
        <ScrollView
          ref={scrollViewRef}
          className='flex-1'
          keyboardShouldPersistTaps='handled'
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <View className='p-4 space-y-4'>
            <View>
              <Text className='mb-1 text-gray-700 font-medium'>Họ và tên</Text>
              <TextInput
                className='border border-gray-300 p-3 rounded-lg bg-white text-gray-800 text-base'
                placeholder='Nhập họ và tên'
                placeholderTextColor='#9CA3AF'
                value={name}
                onChangeText={setName}
                onFocus={() => scrollToInput(0)} // Điều chỉnh Y-offset nếu cần
              />
            </View>
            {/* Email */}
            <View>
              <Text className='mb-1 text-gray-700 font-medium'>Email</Text>
              <TextInput
                className='border border-gray-300 p-3 rounded-lg bg-white text-gray-800 text-base'
                placeholder='Nhập địa chỉ email'
                placeholderTextColor='#9CA3AF'
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                autoCapitalize='none'
                onFocus={() => scrollToInput(50)}
              />
            </View>
            {/* Số điện thoại */}
            <View>
              <Text className='mb-1 text-gray-700 font-medium'>
                Số điện thoại
              </Text>
              <TextInput
                className='border border-gray-300 p-3 rounded-lg bg-white text-gray-800 text-base'
                placeholder='Nhập số điện thoại'
                placeholderTextColor='#9CA3AF'
                value={phone}
                onChangeText={setPhone}
                keyboardType='phone-pad'
                onFocus={() => scrollToInput(100)}
              />
            </View>
            {/* Ngày sinh */}
            <View>
              <Text className='mb-1 text-gray-700 font-medium'>
                Ngày sinh (DD/MM/YYYY)
              </Text>
              <TextInput
                className='border border-gray-300 p-3 rounded-lg bg-white text-gray-800 text-base'
                placeholder='Ví dụ: 20/03/2000'
                placeholderTextColor='#9CA3AF'
                value={dob}
                onChangeText={setDob}
                keyboardType='numeric' // Cho phép nhập số và dấu /
                onFocus={() => scrollToInput(150)}
              />
            </View>
            {/* Giới tính - Dùng Modal Dropdown hiện có */}
            <View>
              <Text className='mb-1 text-gray-700 font-medium'>Giới tính</Text>
              <TouchableOpacity
                className='border border-gray-300 p-3.5 rounded-lg bg-white flex-row justify-between items-center' // Tăng padding chút
                onPress={showGenderDropdown}
              >
                <Text
                  className={
                    gender
                      ? 'text-gray-800 text-base'
                      : 'text-gray-400 text-base'
                  }
                >
                  {gender || 'Chọn giới tính'}
                </Text>
                <Ionicons name='chevron-down' size={20} color='#9CA3AF' />
              </TouchableOpacity>
            </View>
            {/* Mật khẩu */}
            <View>
              <Text className='mb-1 text-gray-700 font-medium'>Mật khẩu</Text>
              <View className='flex-row items-center border border-gray-300 rounded-lg bg-white'>
                <TextInput
                  className='flex-1 p-3 text-gray-800 text-base'
                  placeholder={
                    isEdit
                      ? 'Để trống nếu không đổi mật khẩu'
                      : 'Nhập mật khẩu (ít nhất 6 ký tự)'
                  }
                  placeholderTextColor='#9CA3AF'
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!isPasswordVisible}
                  autoCapitalize='none'
                  onFocus={() => scrollToInput(250)}
                />
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  className='p-3'
                >
                  <Feather
                    name={isPasswordVisible ? 'eye-off' : 'eye'}
                    size={20}
                    color='#6B7280'
                  />
                </TouchableOpacity>
              </View>
            </View>
            {/* Nhập lại Mật khẩu */}
            <View>
              <Text className='mb-1 text-gray-700 font-medium'>
                Nhập lại mật khẩu
              </Text>
              <View className='flex-row items-center border border-gray-300 rounded-lg bg-white'>
                <TextInput
                  className='flex-1 p-3 text-gray-800 text-base'
                  placeholder={
                    isEdit ? 'Nhập lại (nếu đổi MK)' : 'Nhập lại mật khẩu'
                  }
                  placeholderTextColor='#9CA3AF'
                  value={rePassword}
                  onChangeText={setRePassword}
                  secureTextEntry={!isRePasswordVisible}
                  autoCapitalize='none'
                  onFocus={() => scrollToInput(300)}
                />
                <TouchableOpacity
                  onPress={() => setIsRePasswordVisible(!isRePasswordVisible)}
                  className='p-3'
                >
                  <Feather
                    name={isRePasswordVisible ? 'eye-off' : 'eye'}
                    size={20}
                    color='#6B7280'
                  />
                </TouchableOpacity>
              </View>
            </View>
            {/* Nút Submit */}
            <TouchableOpacity
              className='bg-blue-600 p-4 rounded-lg flex-row justify-center items-center mt-6' // Thêm margin top
              onPress={handleSubmit}
            >
              <Ionicons
                name={isEdit ? 'save-outline' : 'person-add-outline'}
                size={22}
                color='white'
              />
              <Text className='text-white font-bold ml-2 text-base'>
                {isEdit ? 'Lưu thay đổi' : 'Tạo tài khoản'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Custom Dropdown Modal cho Giới tính */}
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)} // Đóng khi bấm ra ngoài
        >
          <View className='flex-1 justify-end'>
            <TouchableOpacity
              activeOpacity={1}
              style={{
                backgroundColor: 'white',
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12
              }}
            >
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
                style={{ maxHeight: 250 }} // Giới hạn chiều cao modal
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className='p-4 border-b border-gray-100' // Tăng padding, sửa màu border
                    onPress={() => handleGenderChange(item)}
                  >
                    <Text className='text-gray-700 text-base'>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  )
}
