import React, { useState, useEffect } from 'react'
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
import { useRouter, useLocalSearchParams } from 'expo-router'
import { Ionicons, Feather } from '@expo/vector-icons'
import { Document, DocumentScope, DocumentStatus } from './index' // Assuming index.tsx exports Document type
import DateTimePickerModal from 'react-native-modal-datetime-picker'

// --- Dropdown Options (Ideally, these should be in a shared constants file) ---
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

const STATUS_OPTIONS_FORM: DropdownOption[] = [
  { label: 'Kích hoạt', value: 'Kích hoạt' },
  { label: 'Đã xóa', value: 'Đã xóa' }
]

// --- Component CustomDropdown (Copied for standalone use, ideally shared) ---
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
          style={{ zIndex: 1010 }}
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

export default function EditDocumentScreen () {
  const router = useRouter()
  const params = useLocalSearchParams()

  const [documentId, setDocumentId] = useState<string>('')
  const [name, setName] = useState('')
  const [issueDate, setIssueDate] = useState<Date | undefined>(undefined)
  const [issuePlace, setIssuePlace] = useState('')
  const [type, setType] = useState<string>('')
  const [scope, setScope] = useState<DocumentScope | ''>('')
  const [status, setStatus] = useState<DocumentStatus | ''>('')
  const [fileUrl, setFileUrl] = useState('')
  const [description, setDescription] = useState('')

  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false)
  const [scopeDropdownOpen, setScopeDropdownOpen] = useState(false)
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

  useEffect(() => {
    if (params.document) {
      try {
        const docToEdit = JSON.parse(params.document as string) as Document
        setDocumentId(docToEdit.id)
        setName(docToEdit.name)
        setIssueDate(new Date(docToEdit.issueDate)) // Convert string date to Date object
        setIssuePlace(docToEdit.issuePlace)
        setType(docToEdit.type)
        setScope(docToEdit.scope)
        setStatus(docToEdit.status)
        setFileUrl(docToEdit.fileUrl || '')
        setDescription(docToEdit.description || '')
      } catch (e) {
        console.error('Failed to parse document data for editing:', e)
        Alert.alert('Lỗi', 'Không thể tải dữ liệu tài liệu để chỉnh sửa.', [
          { text: 'OK', onPress: () => router.back() }
        ])
      }
    } else {
      Alert.alert('Lỗi', 'Không tìm thấy tài liệu để chỉnh sửa.', [
        { text: 'OK', onPress: () => router.back() }
      ])
    }
  }, [params.document])

  const showDatePicker = () => setDatePickerVisibility(true)
  const hideDatePicker = () => setDatePickerVisibility(false)
  const handleConfirmDate = (date: Date) => {
    setIssueDate(date)
    hideDatePicker()
  }

  const toggleTypeDropdown = () => {
    setScopeDropdownOpen(false)
    setStatusDropdownOpen(false)
    setTypeDropdownOpen(prev => !prev)
  }
  const toggleScopeDropdown = () => {
    setTypeDropdownOpen(false)
    setStatusDropdownOpen(false)
    setScopeDropdownOpen(prev => !prev)
  }
  const toggleStatusDropdown = () => {
    setTypeDropdownOpen(false)
    setScopeDropdownOpen(false)
    setStatusDropdownOpen(prev => !prev)
  }

  const handleSelectFile = () => {
    Alert.alert(
      'Chức năng chọn tệp',
      'Chức năng này sẽ được triển khai sau. Bạn có thể nhập URL hoặc tên tệp vào ô bên dưới.'
    )
  }

  const handleSubmit = () => {
    if (
      !name.trim() ||
      !issueDate ||
      !issuePlace.trim() ||
      !type ||
      !scope ||
      !status
    ) {
      Alert.alert(
        'Lỗi',
        'Vui lòng điền đầy đủ các trường bắt buộc: Tên, Ngày ban hành, Nơi ban hành, Loại, Phạm vi, Trạng thái.'
      )
      return
    }

    const updatedDocument: Document = {
      id: documentId, // Use the original ID
      name: name.trim(),
      issueDate: issueDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
      issuePlace: issuePlace.trim(),
      type: type,
      scope: scope as DocumentScope,
      status: status as DocumentStatus,
      fileUrl: fileUrl.trim() || undefined,
      description: description.trim() || undefined
    }

    // Navigate back to the detail screen with the updated document data
    // The detail screen will then pass this to the list screen upon its own back navigation if needed
    if (router.canGoBack()) {
      router.replace({
        // Use replace to remove edit screen from stack
        pathname: '/(app)/leader/documents/detail',
        params: { document: JSON.stringify(updatedDocument) } // Pass as 'document' so DetailScreen reuses its logic
      })
    } else {
      // Fallback, though unlikely if coming from detail screen
      router.push({
        pathname: '/(app)/leader/documents',
        params: { updatedDocument: JSON.stringify(updatedDocument) }
      })
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name='arrow-back' size={28} color='white' />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Chỉnh sửa Tài liệu</Text>
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
            date={issueDate || new Date()} // Pre-select current date if issueDate is undefined
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
          style={[styles.inputGroup, { zIndex: typeDropdownOpen ? 30 : 1 }]}
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
          style={[styles.inputGroup, { zIndex: scopeDropdownOpen ? 30 : 1 }]}
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

        {/* Trạng thái */}
        <View
          style={[styles.inputGroup, { zIndex: statusDropdownOpen ? 30 : 1 }]}
        >
          <Text style={styles.label}>
            Trạng thái <Text style={styles.required}>*</Text>
          </Text>
          <CustomDropdown
            options={STATUS_OPTIONS_FORM}
            placeholder='Chọn trạng thái'
            selectedValue={status}
            onSelect={value => setStatus(value as DocumentStatus | '')}
            isOpen={statusDropdownOpen}
            onToggle={toggleStatusDropdown}
          />
        </View>

        {/* Tệp tài liệu */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Tệp tài liệu (URL hoặc tên tệp)</Text>
          <View style={styles.fileInputContainer}>
            <TextInput
              style={[styles.input, styles.fileInput]}
              placeholder='Nhập URL hoặc tên tệp đính kèm'
              value={fileUrl}
              onChangeText={setFileUrl}
              placeholderTextColor='#9CA3AF'
            />
            <TouchableOpacity
              style={styles.fileBrowseButton}
              onPress={handleSelectFile}
            >
              <Ionicons name='attach-outline' size={24} color='#3E4FF5' />
            </TouchableOpacity>
          </View>
          <Text style={styles.helperText}>
            Ví dụ: `ke-hoach-abc.pdf` hoặc `https://example.com/tai-lieu.docx`
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
          <Text style={styles.submitButtonText}>Lưu Thay Đổi</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6'
  },
  headerContainer: {
    backgroundColor: '#3E4FF5',
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    paddingTop: Platform.OS === 'android' ? 10 : 30,
    paddingBottom: 20
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  backButton: {
    padding: 8
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center'
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  headerRightPlaceholder: {
    width: 28 + 2 * 8
  },
  scrollView: {
    flex: 1
  },
  scrollViewContent: {
    padding: 20,
    paddingBottom: 40
  },
  inputGroup: {
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8
  },
  required: {
    color: '#EF4444'
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
    height: 50
  },
  textArea: {
    height: 120,
    paddingTop: 12
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
    color: '#9CA3AF'
  },
  fileInputContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  fileInput: {
    flex: 1,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  fileBrowseButton: {
    height: 50,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E7FF',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: '#D1D5DB',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8
  },
  helperText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4
  },
  submitButton: {
    backgroundColor: '#F59E0B', // amber-500 for edit
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
    fontWeight: '600'
  }
})
