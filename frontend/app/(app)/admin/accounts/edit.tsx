import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  Platform,
  Alert
} from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'
import DateTimePicker, {
  DateTimePickerEvent
} from '@react-native-community/datetimepicker'

type PersonalInfo = {
  avatar?: string
  name: string
  email: string
  phone: string
  gender: 'Nam' | 'Nữ' | 'Khác'
  dob: string // Ngày sinh
  role: 'QTV' | 'NQL' | 'ĐV'
  status: 'Hoạt động' | 'Chờ phê duyệt' | 'Khóa'
}

type UnionInfo = {
  chapterName: string
  unionCardNumber: string
  unionJoinDate: string
  unionPosition: 'Bí thư' | 'Phó Bí thư' | 'Ủy viên BCH' | 'Đoàn viên'
  address: string
  hometown: string
  ethnicity: string
  religion: string
  educationLevel: string
}

type MemberDetailData = PersonalInfo & {
  id: string
  unionInfo?: UnionInfo
  // managedChapterInfo không chỉnh sửa ở đây để đơn giản
}

// Helper component cho một trường nhập liệu
const FormField: React.FC<{
  label: string
  value: string | undefined
  onChangeText: (text: string) => void
  placeholder?: string
  keyboardType?: 'default' | 'email-address' | 'phone-pad' | 'numeric'
  multiline?: boolean
  numberOfLines?: number
}> = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1
}) => (
  <View className='mb-4'>
    <Text className='text-base text-gray-600 mb-1'>{label}</Text>
    <TextInput
      className='border border-gray-300 p-3 rounded-lg bg-white text-base'
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder || `Nhập ${label.toLowerCase()}`}
      placeholderTextColor='#9CA3AF'
      keyboardType={keyboardType}
      multiline={multiline}
      numberOfLines={numberOfLines}
      textAlignVertical={multiline ? 'top' : 'center'}
    />
  </View>
)

// Helper component cho Picker
const FormPicker: React.FC<{
  label: string
  selectedValue: any
  onValueChange: (itemValue: any, itemIndex: number) => void
  items: { label: string; value: any }[]
}> = ({ label, selectedValue, onValueChange, items }) => (
  <View className='mb-4'>
    <Text className='text-base text-gray-600 mb-1'>{label}</Text>
    <View className='border border-gray-300 rounded-lg bg-white'>
      <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
        {items.map(item => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>
    </View>
  </View>
)

// Helper component cho DatePicker
const FormDatePicker: React.FC<{
  label: string
  value: string // Format "DD/MM/YYYY"
  onPress: () => void
}> = ({ label, value, onPress }) => (
  <View className='mb-4'>
    <Text className='text-base text-gray-600 mb-1'>{label}</Text>
    <TouchableOpacity
      className='border border-gray-300 p-3 rounded-lg bg-white flex-row justify-between items-center'
      onPress={onPress}
    >
      <Text className='text-base'>{value || 'Chọn ngày'}</Text>
      <Ionicons name='calendar-outline' size={20} color='#6B7280' />
    </TouchableOpacity>
  </View>
)

export default function MemberEditScreen () {
  const router = useRouter()
  const params = useLocalSearchParams<{ memberDataString?: string }>()

  const [formData, setFormData] = useState<Partial<MemberDetailData>>({})
  const [initialData, setInitialData] = useState<Partial<MemberDetailData>>({}) // Để so sánh khi hủy

  // State cho DatePicker
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [datePickerField, setDatePickerField] = useState<
    'dob' | 'unionJoinDate' | null
  >(null)
  const [currentDateForPicker, setCurrentDateForPicker] = useState<Date>(
    new Date()
  )

  useEffect(() => {
    if (params.memberDataString) {
      try {
        const parsedData: MemberDetailData = JSON.parse(params.memberDataString)
        setFormData(parsedData)
        setInitialData(parsedData) // Lưu trạng thái ban đầu
      } catch (error) {
        console.error('Failed to parse memberDataString:', error)
        Alert.alert('Lỗi', 'Không thể tải dữ liệu để chỉnh sửa.')
        router.back()
      }
    } else {
      Alert.alert('Lỗi', 'Không có dữ liệu để chỉnh sửa.')
      router.back()
    }
  }, [params.memberDataString])

  const handleInputChange = (
    field: keyof MemberDetailData | keyof UnionInfo,
    value: any
  ) => {
    // Nếu field thuộc UnionInfo, cập nhật lồng nhau
    if (
      [
        'chapterName',
        'unionCardNumber',
        'unionJoinDate',
        'unionPosition',
        'address',
        'hometown',
        'ethnicity',
        'religion',
        'educationLevel'
      ].includes(field as string)
    ) {
      setFormData(prev => ({
        ...prev,
        unionInfo: {
          ...(prev.unionInfo || ({} as UnionInfo)), // Khởi tạo unionInfo nếu chưa có
          [field]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field as keyof MemberDetailData]: value
      }))
    }
  }

  const parseDateString = (dateString?: string): Date => {
    if (!dateString) return new Date()
    const parts = dateString.split('/')
    if (parts.length === 3) {
      // DD/MM/YYYY
      const day = parseInt(parts[0], 10)
      const month = parseInt(parts[1], 10) - 1 // Tháng trong JS là 0-indexed
      const year = parseInt(parts[2], 10)
      const date = new Date(year, month, day)
      return isNaN(date.getTime()) ? new Date() : date // Kiểm tra ngày hợp lệ
    }
    return new Date() // Mặc định nếu format sai
  }

  const openDatePickerModal = (fieldKey: 'dob' | 'unionJoinDate') => {
    setDatePickerField(fieldKey)
    const dateStringToParse =
      fieldKey === 'dob' ? formData.dob : formData.unionInfo?.unionJoinDate
    setCurrentDateForPicker(parseDateString(dateStringToParse))
    setShowDatePicker(true)
  }

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios') // Giữ modal mở trên iOS cho đến khi người dùng xong
    if (selectedDate && datePickerField) {
      const day = String(selectedDate.getDate()).padStart(2, '0')
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0') // +1 vì tháng là 0-indexed
      const year = selectedDate.getFullYear()
      const formattedDate = `${day}/${month}/${year}`

      if (datePickerField === 'dob') {
        handleInputChange('dob', formattedDate)
      } else if (datePickerField === 'unionJoinDate') {
        handleInputChange('unionJoinDate', formattedDate) // Sẽ được xử lý bởi logic lồng nhau trong handleInputChange
      }
    }
    // Đóng DatePicker trên Android sau khi chọn
    if (Platform.OS === 'android') {
      setShowDatePicker(false)
    }
  }

  const handleSave = () => {
    // --- VALIDATION (Thêm nếu cần) ---
    // Ví dụ: if (!formData.name) { Alert.alert("Lỗi", "Họ tên không được để trống"); return; }

    Alert.alert('Xác nhận lưu', 'Bạn có chắc chắn muốn lưu các thay đổi này?', [
      { text: 'Hủy' },
      {
        text: 'Lưu',
        onPress: () => {
          console.log('Dữ liệu đã lưu:', formData)
          // --- GỌI API ĐỂ LƯU DỮ LIỆU Ở ĐÂY ---
          // Sau khi API thành công:
          Alert.alert('Thành công', 'Thông tin đã được cập nhật.')
          router.back() // Quay lại màn hình chi tiết (hoặc màn hình danh sách)
          // Bạn có thể cần cơ chế để refresh dữ liệu ở màn hình trước đó.
        }
      }
    ])
  }

  const handleCancel = () => {
    // So sánh formData với initialData để xem có thay đổi không
    if (JSON.stringify(formData) !== JSON.stringify(initialData)) {
      Alert.alert(
        'Hủy thay đổi',
        'Bạn có thay đổi chưa lưu. Bạn có chắc muốn hủy?',
        [
          { text: 'Không', style: 'cancel' },
          {
            text: 'Có, Hủy',
            style: 'destructive',
            onPress: () => router.back()
          }
        ]
      )
    } else {
      router.back()
    }
  }

  // Các tùy chọn cho Picker
  const genderOptions = [
    { label: 'Nam', value: 'Nam' },
    { label: 'Nữ', value: 'Nữ' },
    { label: 'Khác', value: 'Khác' }
  ]
  const roleOptions = [
    { label: 'Đoàn viên (ĐV)', value: 'ĐV' },
    { label: 'Người Quản lý (NQL)', value: 'NQL' },
    { label: 'Quản trị viên (QTV)', value: 'QTV' }
  ]
  const statusOptions = [
    { label: 'Hoạt động', value: 'Hoạt động' },
    { label: 'Chờ phê duyệt', value: 'Chờ phê duyệt' },
    { label: 'Khóa', value: 'Khóa' }
  ]
  const unionPositionOptions = [
    { label: 'Đoàn viên', value: 'Đoàn viên' },
    { label: 'Bí thư', value: 'Bí thư' },
    { label: 'Phó Bí thư', value: 'Phó Bí thư' },
    { label: 'Ủy viên BCH', value: 'Ủy viên BCH' }
  ]

  if (!formData.id) {
    // Chưa có dữ liệu để sửa
    return (
      <SafeAreaView className='flex-1 justify-center items-center bg-gray-100'>
        <Text>Đang tải dữ liệu chỉnh sửa...</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className='flex-1 bg-gray-100'>
      {/* Header */}
      <View
        className='w-full bg-[#3E4FF5] px-4 rounded-b-2xl shadow-lg'
        style={{
          paddingTop: Platform.OS === 'android' ? 10 : 30,
          paddingBottom: 18
        }}
      >
        <View className='flex-row items-center justify-between'>
          <TouchableOpacity onPress={handleCancel} className='p-1'>
            <Ionicons name='close-outline' size={28} color='white' />
          </TouchableOpacity>
          <View className='flex-1'>
            <Text className='text-white text-2xl font-bold text-center'>
              Danh sách Tài khoản
            </Text>
          </View>
          <TouchableOpacity onPress={handleSave} className='p-1'>
            <Ionicons name='checkmark-outline' size={28} color='white' />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        className='flex-1'
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <View className='p-4'>
          {/* Ảnh đại diện (hiện tại chỉ hiển thị, chưa cho sửa) */}
          {formData.avatar && (
            <View className='items-center mb-6'>
              <Image
                source={{ uri: formData.avatar }}
                className='w-24 h-24 rounded-full'
              />
              {/* <TouchableOpacity className="mt-2 bg-blue-100 p-2 rounded-md">
                        <Text className="text-blue-600">Thay đổi ảnh</Text>
                    </TouchableOpacity> */}
            </View>
          )}

          <Text className='text-lg font-semibold mb-3 text-blue-700'>
            Thông tin cá nhân
          </Text>
          <FormField
            label='Họ tên'
            value={formData.name}
            onChangeText={text => handleInputChange('name', text)}
          />
          <FormField
            label='Email'
            value={formData.email}
            onChangeText={text => handleInputChange('email', text)}
            keyboardType='email-address'
          />
          <FormField
            label='Số điện thoại'
            value={formData.phone}
            onChangeText={text => handleInputChange('phone', text)}
            keyboardType='phone-pad'
          />
          <FormPicker
            label='Giới tính'
            selectedValue={formData.gender}
            onValueChange={val => handleInputChange('gender', val)}
            items={genderOptions}
          />
          <FormDatePicker
            label='Ngày sinh'
            value={formData.dob || ''}
            onPress={() => openDatePickerModal('dob')}
          />
          <FormPicker
            label='Vai trò hệ thống'
            selectedValue={formData.role}
            onValueChange={val => handleInputChange('role', val)}
            items={roleOptions}
          />
          <FormPicker
            label='Trạng thái tài khoản'
            selectedValue={formData.status}
            onValueChange={val => handleInputChange('status', val)}
            items={statusOptions}
          />

          {/* Thông tin đoàn viên (nếu có) */}
          {(formData.role === 'ĐV' || formData.role === 'NQL') && (
            <>
              <Text className='text-lg font-semibold mt-6 mb-3 text-blue-700'>
                Thông tin Đoàn viên
              </Text>
              <FormField
                label='Thuộc Chi đoàn'
                value={formData.unionInfo?.chapterName}
                onChangeText={text => handleInputChange('chapterName', text)}
              />
              <FormField
                label='Số thẻ Đoàn'
                value={formData.unionInfo?.unionCardNumber}
                onChangeText={text =>
                  handleInputChange('unionCardNumber', text)
                }
              />
              <FormDatePicker
                label='Ngày vào Đoàn'
                value={formData.unionInfo?.unionJoinDate || ''}
                onPress={() => openDatePickerModal('unionJoinDate')}
              />
              <FormPicker
                label='Chức vụ Đoàn'
                selectedValue={formData.unionInfo?.unionPosition}
                onValueChange={val => handleInputChange('unionPosition', val)}
                items={unionPositionOptions}
              />
              <FormField
                label='Địa chỉ thường trú'
                value={formData.unionInfo?.address}
                onChangeText={text => handleInputChange('address', text)}
                multiline
              />
              <FormField
                label='Quê quán'
                value={formData.unionInfo?.hometown}
                onChangeText={text => handleInputChange('hometown', text)}
              />
              <FormField
                label='Dân tộc'
                value={formData.unionInfo?.ethnicity}
                onChangeText={text => handleInputChange('ethnicity', text)}
              />
              <FormField
                label='Tôn giáo'
                value={formData.unionInfo?.religion}
                onChangeText={text => handleInputChange('religion', text)}
              />
              <FormField
                label='Trình độ học vấn'
                value={formData.unionInfo?.educationLevel}
                onChangeText={text => handleInputChange('educationLevel', text)}
              />
            </>
          )}
        </View>

        {/* Modal DatePicker */}
        {showDatePicker && (
          <DateTimePicker
            testID='dateTimePicker'
            value={currentDateForPicker}
            mode='date'
            is24Hour={true}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onDateChange}
            // maximumDate={new Date()} // Ví dụ: không cho chọn ngày tương lai cho ngày sinh
          />
        )}
      </ScrollView>
    </SafeAreaView>
  )
}
