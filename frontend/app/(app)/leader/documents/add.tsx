import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  Alert,
  Platform,
  StyleSheet
} from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons, Feather } from '@expo/vector-icons'
import * as DocumentPicker from 'expo-document-picker' // Thêm import này
import DateTimePickerModal from 'react-native-modal-datetime-picker'

// Giả sử Document, DocumentScope được định nghĩa ở nơi khác
// export type DocumentScope = 'Mật' | 'Chi đoàn' | 'Công khai';
// export interface Document {
//   id: string;
//   name: string;
//   issueDate: string; // YYYY-MM-DD
//   issuePlace: string;
//   type: string;
//   scope: DocumentScope;
//   fileUrl?: string;
//   description?: string;
//   status: 'Kích hoạt' | 'Vô hiệu'; // Hoặc các trạng thái khác
// }

// Để mã này có thể chạy độc lập, chúng ta sẽ định nghĩa tạm DocumentScope và Document ở đây
// Trong ứng dụng thực tế, bạn sẽ import chúng từ file chung.
export type DocumentScope = 'Mật' | 'Chi đoàn' | 'Công khai'
export interface Document {
  id: string
  name: string
  issueDate: string // YYYY-MM-DD
  issuePlace: string
  type: string
  scope: DocumentScope
  fileUrl?: string // Sẽ lưu URI của tệp đã chọn
  fileName?: string // Tên tệp gốc
  description?: string
  status: 'Kích hoạt' | 'Vô hiệu'
}

interface DropdownOption {
  label: string
  value: string
}

const SCOPE_OPTIONS_FORM: DropdownOption[] = [
  { label: 'Mật', value: 'Mật' },
  { label: 'Chi đoàn', value: 'Chi đoàn' },
  { label: 'Công khai', value: 'Công khai' }
]

const TYPE_OPTIONS_FORM: DropdownOption[] = [
  { label: 'Công văn', value: 'Công văn' },
  { label: 'Quyết định', value: 'Quyết định' },
  { label: 'Kế hoạch', value: 'Kế hoạch' },
  { label: 'Báo cáo', value: 'Báo cáo' },
  { label: 'Thông báo', value: 'Thông báo' },
  { label: 'Tờ trình', value: 'Tờ trình' },
  { label: 'Nghị quyết', value: 'Nghị quyết' },
  { label: 'Chương trình', value: 'Chương trình' },
  { label: 'Khác', value: 'Khác' }
]

const CustomDropdown: React.FC<{
  options: DropdownOption[]
  placeholder: string
  onSelect: (value: string) => void
  selectedValue: string
  isOpen: boolean
  onToggle: () => void
  containerClassName?: string
  dropdownListClassName?: string
  disabled?: boolean
}> = ({
  options,
  placeholder,
  onSelect,
  selectedValue,
  isOpen,
  onToggle,
  containerClassName = 'w-full',
  dropdownListClassName = '',
  disabled = false
}) => {
  const displayLabel =
    options.find(opt => opt.value === selectedValue)?.label || placeholder
  return (
    <View className={containerClassName} style={{ zIndex: isOpen ? 1000 : 10 }}>
      <TouchableOpacity
        onPress={!disabled ? onToggle : undefined}
        className={`flex-row items-center justify-between p-3 border ${
          disabled ? 'bg-gray-200 border-gray-300' : 'bg-white border-gray-300'
        } rounded-lg shadow-sm h-[50px]`}
        disabled={disabled}
      >
        <Text
          className={`${
            disabled ? 'text-gray-500' : 'text-gray-700'
          } text-base`}
          numberOfLines={1}
        >
          {displayLabel}
        </Text>
        <Feather
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={disabled ? '#9CA3AF' : '#6B7280'}
        />
      </TouchableOpacity>
      {!disabled && isOpen && (
        <View
          className={`border border-gray-200 rounded-lg mt-1 absolute top-full left-0 right-0 bg-white max-h-48 shadow-lg ${dropdownListClassName}`}
          style={{ zIndex: 1010 }} // Ensure dropdown is above other elements
        >
          <ScrollView nestedScrollEnabled={true}>
            {options.map(option => (
              <TouchableOpacity
                key={option.value}
                onPress={() => {
                  onSelect(option.value)
                  onToggle()
                }}
                className='p-3 border-b border-gray-100'
              >
                <Text className='text-gray-700 text-base'>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  )
}

export default function AddDocumentScreen () {
  const router = useRouter()

  const [name, setName] = useState('')
  const [issueDate, setIssueDate] = useState<Date | undefined>(undefined)
  const [issuePlace, setIssuePlace] = useState('')
  const [type, setType] = useState<string>('')
  const [scope, setScope] = useState<DocumentScope | ''>('')
  const [fileUrl, setFileUrl] = useState('') // Sẽ lưu URI của tệp
  const [fileName, setFileName] = useState('') // Sẽ lưu tên tệp để hiển thị
  const [description, setDescription] = useState('')

  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false)
  const [scopeDropdownOpen, setScopeDropdownOpen] = useState(false)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirmDate = (date: Date) => {
    setIssueDate(date)
    hideDatePicker()
  }

  const toggleTypeDropdown = () => {
    setScopeDropdownOpen(false)
    setTypeDropdownOpen(prev => !prev)
  }

  const toggleScopeDropdown = () => {
    setTypeDropdownOpen(false)
    setScopeDropdownOpen(prev => !prev)
  }

  const handleSelectFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf', // Chỉ cho phép chọn tệp PDF
        copyToCacheDirectory: true // Quan trọng để có thể truy cập tệp sau này
      })

      // console.log('DocumentPicker result:', result); // Ghi log kết quả để debug

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const firstAsset = result.assets[0]
        if (firstAsset.uri) {
          setFileUrl(firstAsset.uri) // Lưu URI của tệp
          setFileName(firstAsset.name || 'Tệp đã chọn') // Lưu tên tệp để hiển thị
        } else {
          // console.warn('DocumentPicker result asset has no URI:', firstAsset);
          Alert.alert(
            'Lỗi chọn tệp',
            'Không thể lấy URI của tệp đã chọn. Vui lòng thử lại.'
          )
        }
      } else if (result.canceled) {
        // console.log('User cancelled document picker');
      } else {
        // console.warn('DocumentPicker result was not successful and not cancelled:', result);
        Alert.alert('Lỗi chọn tệp', 'Không thể chọn tệp. Vui lòng thử lại.')
      }
    } catch (err) {
      // console.warn('Error picking document:', err);
      Alert.alert(
        'Lỗi',
        'Đã xảy ra lỗi khi chọn tệp. Vui lòng kiểm tra quyền truy cập hoặc thử lại.'
      )
    }
  }

  const handleSubmit = () => {
    if (!name.trim() || !issueDate || !issuePlace.trim() || !type || !scope) {
      Alert.alert(
        'Lỗi',
        'Vui lòng điền đầy đủ các trường bắt buộc: Tên tài liệu, Ngày ban hành, Nơi ban hành, Loại tài liệu, Phạm vi.'
      )
      return
    }
    // Kiểm tra xem fileUrl có phải là một URI hợp lệ không nếu nó được cung cấp
    // Hiện tại, nếu người dùng không chọn file, fileUrl sẽ là chuỗi rỗng
    // và fileName cũng sẽ là chuỗi rỗng.

    const newDocument: Document = {
      id: `doc_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`,
      name: name.trim(),
      issueDate: issueDate.toISOString().split('T')[0],
      issuePlace: issuePlace.trim(),
      type: type,
      scope: scope as DocumentScope,
      fileUrl: fileUrl || undefined, // Lưu URI nếu có
      fileName: fileName || undefined, // Lưu tên tệp nếu có
      description: description.trim() || undefined,
      status: 'Kích hoạt'
    }

    // console.log('Submitting new document:', newDocument); // Ghi log dữ liệu gửi đi

    if (router.canGoBack()) {
      router.replace({
        pathname: '/(app)/leader/documents',
        params: { newDocument: JSON.stringify(newDocument) }
      })
    } else {
      router.push({
        pathname: '/(app)/leader/documents',
        params: { newDocument: JSON.stringify(newDocument) }
      })
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() =>
              router.canGoBack()
                ? router.back()
                : router.replace('/(app)/leader/documents')
            }
            style={styles.backButton}
          >
            <Ionicons name='arrow-back' size={28} color='white' />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Tạo Tài liệu Mới</Text>
          </View>
          <View style={styles.headerRightPlaceholder} />
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps='handled'
      >
        {/* Tên tài liệu */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Tên tài liệu <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder='Nhập tên tài liệu'
            value={name}
            onChangeText={setName}
            placeholderTextColor='#9CA3AF'
          />
        </View>

        {/* Ngày ban hành */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Ngày ban hành <Text style={styles.required}>*</Text>
          </Text>
          <TouchableOpacity
            onPress={showDatePicker}
            style={styles.datePickerButton}
          >
            <Text
              style={[
                styles.datePickerText,
                !issueDate && styles.datePickerPlaceholder
              ]}
            >
              {issueDate
                ? issueDate.toLocaleDateString('vi-VN')
                : 'Chọn ngày ban hành'}
            </Text>
            <Ionicons name='calendar-outline' size={20} color='#6B7280' />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode='date'
            onConfirm={handleConfirmDate}
            onCancel={hideDatePicker}
            locale='vi-VN'
            confirmTextIOS='Xác nhận'
            cancelTextIOS='Hủy'
          />
        </View>

        {/* Nơi ban hành */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Nơi ban hành <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder='Nhập nơi ban hành'
            value={issuePlace}
            onChangeText={setIssuePlace}
            placeholderTextColor='#9CA3AF'
          />
        </View>

        {/* Loại tài liệu */}
        <View
          style={[styles.inputGroup, { zIndex: typeDropdownOpen ? 20 : 1 }]}
        >
          <Text style={styles.label}>
            Loại tài liệu <Text style={styles.required}>*</Text>
          </Text>
          <CustomDropdown
            options={TYPE_OPTIONS_FORM}
            placeholder='Chọn loại tài liệu'
            selectedValue={type}
            onSelect={value => setType(value)}
            isOpen={typeDropdownOpen}
            onToggle={toggleTypeDropdown}
          />
        </View>

        {/* Phạm vi */}
        <View
          style={[styles.inputGroup, { zIndex: scopeDropdownOpen ? 20 : 1 }]}
        >
          <Text style={styles.label}>
            Phạm vi <Text style={styles.required}>*</Text>
          </Text>
          <CustomDropdown
            options={SCOPE_OPTIONS_FORM}
            placeholder='Chọn phạm vi'
            selectedValue={scope}
            onSelect={value => setScope(value as DocumentScope | '')}
            isOpen={scopeDropdownOpen}
            onToggle={toggleScopeDropdown}
          />
        </View>

        {/* Tệp tài liệu */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Tệp tài liệu (PDF)</Text>
          <View style={styles.fileInputContainer}>
            <TextInput
              style={[
                styles.input,
                styles.fileInputDisplay,
                !fileName && styles.fileInputPlaceholder
              ]}
              placeholder='Chưa có tệp nào được chọn'
              value={fileName || ''} // Hiển thị tên tệp đã chọn
              editable={false} // Không cho phép chỉnh sửa trực tiếp
              placeholderTextColor='#9CA3AF'
            />
            <TouchableOpacity
              style={styles.fileBrowseButton}
              onPress={handleSelectFile}
            >
              <Ionicons name='attach-outline' size={24} color='#3E4FF5' />
              <Text style={styles.fileBrowseButtonText}>Chọn PDF</Text>
            </TouchableOpacity>
          </View>
          {fileName && ( // Hiển thị nút xóa nếu có tệp được chọn
            <TouchableOpacity
              onPress={() => {
                setFileUrl('')
                setFileName('')
              }}
              style={styles.removeFileButton}
            >
              <Ionicons name='close-circle-outline' size={20} color='#EF4444' />
              <Text style={styles.removeFileButtonText}>Xóa tệp</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.helperText}>
            Nhấn nút "Chọn PDF" để tải lên tệp đính kèm.
          </Text>
        </View>

        {/* Mô tả thêm */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mô tả thêm</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder='Nhập mô tả chi tiết (nếu có)'
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical='top'
            placeholderTextColor='#9CA3AF'
          />
        </View>

        {/* Nút Lưu */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Ionicons
            name='save-outline'
            size={22}
            color='white'
            style={{ marginRight: 8 }}
          />
          <Text style={styles.submitButtonText}>Lưu Tài liệu</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6' // gray-100
  },
  headerContainer: {
    backgroundColor: '#3E4FF5', // Màu xanh dương chủ đạo
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    paddingTop: Platform.OS === 'android' ? 10 : 30, // Điều chỉnh cho status bar
    paddingBottom: 20
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  backButton: {
    padding: 8 // Tăng vùng chạm
  },
  headerTitleContainer: {
    flex: 1, // Để tiêu đề căn giữa
    alignItems: 'center'
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  headerRightPlaceholder: {
    width: 28 + 2 * 8 // Giữ chỗ để căn giữa tiêu đề, bằng kích thước nút back
  },
  scrollView: {
    flex: 1
  },
  scrollViewContent: {
    padding: 20,
    paddingBottom: 40 // Thêm khoảng trống ở dưới
  },
  inputGroup: {
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    fontWeight: '500', // medium
    color: '#374151', // gray-700
    marginBottom: 8
  },
  required: {
    color: '#EF4444' // red-500
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#D1D5DB', // gray-300
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937', // gray-800
    height: 50
  },
  textArea: {
    height: 120,
    paddingTop: 12 // Đảm bảo text bắt đầu từ trên
  },
  datePickerButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  datePickerText: {
    fontSize: 16,
    color: '#1F2937'
  },
  datePickerPlaceholder: {
    color: '#9CA3AF' // gray-400
  },
  fileInputContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  fileInputDisplay: {
    // Kiểu cho TextInput hiển thị tên tệp
    flex: 1,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: '#F9FAFB' // Slightly different background to indicate it's not directly editable
  },
  fileInputPlaceholder: {
    // Kiểu cho placeholder của fileInputDisplay
    fontStyle: 'italic'
  },
  fileBrowseButton: {
    height: 50,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E7FF', // indigo-100
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: '#D1D5DB',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    flexDirection: 'row' // Để icon và text nằm cạnh nhau
  },
  fileBrowseButtonText: {
    color: '#3E4FF5', // indigo-600
    marginLeft: 6,
    fontSize: 15,
    fontWeight: '500'
  },
  removeFileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#FEE2E2', // red-100
    borderRadius: 6,
    alignSelf: 'flex-start' // Chỉ chiếm chiều rộng cần thiết
  },
  removeFileButtonText: {
    marginLeft: 4,
    color: '#DC2626', // red-600
    fontSize: 14
  },
  helperText: {
    fontSize: 12,
    color: '#6B7280', // gray-500
    marginTop: 4
  },
  submitButton: {
    backgroundColor: '#16A34A', // green-600
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600' // semibold
  }
})
