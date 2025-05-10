import React, { useState, useMemo, useCallback } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  TextInput,
  Alert,
  Platform,
  StyleSheet,
  ScrollView as DropdownScrollView
} from 'react-native'
import { useRouter, useLocalSearchParams, useFocusEffect } from 'expo-router'
import { Ionicons, Feather } from '@expo/vector-icons'

// --- Kiểu dữ liệu ---
export type DocumentScope = 'Mật' | 'Chi đoàn' | 'Công khai' // Thêm 'Công khai' hoặc các phạm vi khác nếu cần
export type DocumentStatus = 'Kích hoạt' | 'Đã xóa'

export type Document = {
  id: string
  name: string // Tên tài liệu
  issueDate: string // Ngày ban hành (YYYY-MM-DD)
  issuePlace: string // Nơi ban hành
  type: string // Loại tài liệu (e.g., 'Công văn', 'Quyết định')
  fileUrl?: string // Tệp tài liệu (URL hoặc tên file mang tính mô tả)
  scope: DocumentScope // Phạm vi
  status: DocumentStatus // Trạng thái
  description?: string // Mô tả thêm nếu cần
}

interface DropdownOption {
  label: string
  value: string
}

// --- Dữ liệu mẫu và Options ---
const initialDocuments: Document[] = [
  {
    id: 'doc1',
    name: 'Kế hoạch tổ chức Đại hội Chi đoàn nhiệm kỳ 2025-2027',
    issueDate: '2025-03-15',
    issuePlace: 'BCH Chi đoàn ABC',
    type: 'Kế hoạch',
    scope: 'Chi đoàn',
    status: 'Kích hoạt',
    fileUrl: 'ke_hoach_dai_hoi.pdf',
    description:
      'Kế hoạch chi tiết cho công tác chuẩn bị và tổ chức Đại hội Chi đoàn.'
  },
  {
    id: 'doc2',
    name: 'Quyết định khen thưởng Đoàn viên xuất sắc năm 2024',
    issueDate: '2025-01-20',
    issuePlace: 'Đoàn trường XYZ',
    type: 'Quyết định',
    scope: 'Công khai',
    status: 'Kích hoạt',
    fileUrl: 'quyet_dinh_khen_thuong.doc',
    description:
      'Quyết định về việc khen thưởng các cá nhân có thành tích xuất sắc.'
  },
  {
    id: 'doc3',
    name: 'Báo cáo tổng kết công tác Đoàn và phong trào thanh niên năm 2024',
    issueDate: '2024-12-28',
    issuePlace: 'BCH Đoàn phường Q',
    type: 'Báo cáo',
    scope: 'Mật', // Ví dụ tài liệu mật
    status: 'Kích hoạt',
    description: 'Báo cáo chi tiết các hoạt động và kết quả đạt được trong năm.'
  },
  {
    id: 'doc4',
    name: 'Công văn triệu tập Hội nghị BCH Đoàn trường mở rộng',
    issueDate: '2025-04-01',
    issuePlace: 'Văn phòng Đoàn trường',
    type: 'Công văn',
    scope: 'Chi đoàn',
    status: 'Đã xóa', // Ví dụ tài liệu đã xóa
    fileUrl: 'cong_van_trieu_tap.pdf',
    description:
      'Triệu tập các Ủy viên BCH và Bí thư các Chi đoàn tham dự Hội nghị.'
  }
]

const SCOPE_OPTIONS: DropdownOption[] = [
  { label: 'Tất cả phạm vi', value: 'Tất cả' },
  { label: 'Mật', value: 'Mật' },
  { label: 'Chi đoàn', value: 'Chi đoàn' },
  { label: 'Công khai', value: 'Công khai' }
]

const TYPE_OPTIONS: DropdownOption[] = [
  { label: 'Tất cả loại', value: 'Tất cả' },
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

// --- Component CustomDropdown (Giữ nguyên từ ví dụ của bạn) ---
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
    <View className={containerClassName} style={{ zIndex: isOpen ? 30 : 10 }}>
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
          style={{ zIndex: 40 }}
        >
          <DropdownScrollView nestedScrollEnabled={true}>
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
          </DropdownScrollView>
        </View>
      )}
    </View>
  )
}

// --- Component chính ---
export default function DocumentsListScreen () {
  const router = useRouter()
  const params = useLocalSearchParams()

  // State for documents, initialized with initialDocuments
  // This will be updated by add, edit, delete operations passed via params
  const [documents, setDocuments] = useState<Document[]>(initialDocuments)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedScope, setSelectedScope] = useState<string>('Tất cả')
  const [selectedType, setSelectedType] = useState<string>('Tất cả')

  const [scopeDropdownOpen, setScopeDropdownOpen] = useState(false)
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false)

  // Effect to handle updates from other screens (Add, Edit, Detail for delete)
  useFocusEffect(
    useCallback(() => {
      let updated = false
      if (params.newDocument) {
        const newDoc = JSON.parse(params.newDocument as string) as Document
        setDocuments(prevDocs => {
          // Avoid duplicates if user navigates back and forth
          if (prevDocs.find(doc => doc.id === newDoc.id)) return prevDocs
          return [newDoc, ...prevDocs]
        })
        updated = true
      }
      if (params.updatedDocument) {
        const updatedDoc = JSON.parse(
          params.updatedDocument as string
        ) as Document
        setDocuments(prevDocs =>
          prevDocs.map(doc => (doc.id === updatedDoc.id ? updatedDoc : doc))
        )
        updated = true
      }
      if (params.deletedDocumentId) {
        setDocuments(prevDocs =>
          prevDocs.filter(doc => doc.id !== params.deletedDocumentId)
        )
        updated = true
      }

      if (updated) {
        // Clean up params to prevent re-triggering on focus without new data
        const newParams = { ...params }
        delete newParams.newDocument
        delete newParams.updatedDocument
        delete newParams.deletedDocumentId
        // While this might not be the standard way to clean params in expo-router,
        // for this example, we'll assume it helps prevent re-processing.
        // A more robust solution might involve a global state manager or context.
        if (router.canGoBack()) {
          // router.setParams(newParams) // This method is not available directly.
          // For now, we rely on the fact that params are read on focus.
        }
      }
    }, [params, router])
  )

  const toggleScopeDropdown = () => {
    setTypeDropdownOpen(false) // Close other dropdown
    setScopeDropdownOpen(prev => !prev)
  }

  const toggleTypeDropdown = () => {
    setScopeDropdownOpen(false) // Close other dropdown
    setTypeDropdownOpen(prev => !prev)
  }

  const handleDeleteDocument = (docId: string, docName: string) => {
    Alert.alert(
      'Xác nhận xóa',
      `Bạn có chắc muốn xóa tài liệu "${docName}" không? Thao tác này sẽ chuyển tài liệu vào trạng thái "Đã xóa".`,
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          onPress: () => {
            setDocuments(prevDocuments =>
              prevDocuments.map(doc =>
                doc.id === docId ? { ...doc, status: 'Đã xóa' } : doc
              )
            )
            // Optionally, you might want to filter out 'Đã xóa' from the main view
            // or have a separate filter for it. For now, we just update status.
          },
          style: 'destructive'
        }
      ],
      { cancelable: true }
    )
  }

  const filteredDocuments = useMemo(() => {
    let tempDocuments = documents.filter(doc => doc.status !== 'Đã xóa') // Default: không hiển thị tài liệu đã xóa

    if (selectedScope !== 'Tất cả') {
      tempDocuments = tempDocuments.filter(doc => doc.scope === selectedScope)
    }
    if (selectedType !== 'Tất cả') {
      tempDocuments = tempDocuments.filter(doc => doc.type === selectedType)
    }
    if (searchQuery.trim()) {
      const lowercasedQuery = searchQuery.toLowerCase().trim()
      tempDocuments = tempDocuments.filter(
        doc =>
          doc.name.toLowerCase().includes(lowercasedQuery) ||
          doc.issuePlace.toLowerCase().includes(lowercasedQuery)
      )
    }
    // Sort by issueDate descending (newest first)
    tempDocuments.sort(
      (a, b) =>
        new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime()
    )
    return tempDocuments
  }, [documents, searchQuery, selectedScope, selectedType])

  const renderDocumentItem = ({ item }: { item: Document }) => {
    let scopeColorClass = 'text-gray-600'
    if (item.scope === 'Mật') scopeColorClass = 'text-red-600'
    else if (item.scope === 'Chi đoàn') scopeColorClass = 'text-blue-600'
    else if (item.scope === 'Công khai') scopeColorClass = 'text-green-600'

    return (
      <TouchableOpacity
        className='bg-white p-4 mb-3 rounded-lg shadow-sm active:bg-gray-100'
        onPress={() => {
          // Pass the whole document object as a JSON string
          router.push({
            pathname: '/(app)/leader/documents/detail', // Ensure this path matches your file structure
            params: { document: JSON.stringify(item) }
          })
        }}
      >
        <View className='flex-row items-start'>
          <Ionicons
            name='document-text-outline'
            size={36}
            color='#4A5568'
            className='mr-4 mt-1'
          />
          <View className='flex-1'>
            <Text
              className='font-bold text-lg text-gray-800 mb-1'
              numberOfLines={2}
            >
              {item.name}
            </Text>
            <View className='flex-row items-center mt-1'>
              <Ionicons name='calendar-outline' size={14} color='#6B7280' />
              <Text className='text-gray-600 ml-2 text-sm'>
                Ngày ban hành:
                {new Date(item.issueDate).toLocaleDateString('vi-VN')}
              </Text>
            </View>
            <View className='flex-row items-center mt-1'>
              <Ionicons name='location-outline' size={14} color='#6B7280' />
              <Text className='text-gray-600 ml-2 text-sm'>
                Nơi ban hành: {item.issuePlace}
              </Text>
            </View>
            <View className='flex-row items-center mt-1'>
              <Ionicons name='folder-outline' size={14} color='#6B7280' />
              <Text className='text-gray-600 ml-2 text-sm'>
                Loại: {item.type}
              </Text>
            </View>
            <View className='flex-row items-center mt-1'>
              <Ionicons
                name='shield-checkmark-outline'
                size={14}
                color={
                  item.scope === 'Mật'
                    ? '#EF4444'
                    : item.scope === 'Chi đoàn'
                    ? '#3B82F6'
                    : '#10B981'
                }
              />
              <Text className={`ml-2 text-sm font-medium ${scopeColorClass}`}>
                Phạm vi: {item.scope}
              </Text>
            </View>
            {item.status === 'Đã xóa' && (
              <View className='flex-row items-center mt-1 bg-red-100 px-2 py-1 rounded-md self-start'>
                <Ionicons name='trash-bin-outline' size={14} color='#EF4444' />
                <Text className='text-red-600 ml-1 text-xs font-semibold'>
                  ĐÃ XÓA
                </Text>
              </View>
            )}
          </View>
          {item.status !== 'Đã xóa' && (
            <TouchableOpacity
              onPress={() => handleDeleteDocument(item.id, item.name)}
              className='p-2 ml-2 self-start' // Ensure it's easy to tap
            >
              <Ionicons name='trash-outline' size={24} color='#EF4444' />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => (router.canGoBack() ? router.back() : null)}
            style={styles.backButton}
          >
            <Ionicons name='arrow-back' size={28} color='white' />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Danh sách Tài liệu</Text>
          </View>
          <View style={styles.headerRightPlaceholder} />
        </View>
      </View>

      {/* Search, Filter, Add Section */}
      <View style={styles.controlsContainer}>
        <View style={styles.searchBarContainer}>
          <Feather
            name='search'
            size={22}
            color='#6B7280'
            style={{ marginRight: 12 }}
          />
          <TextInput
            placeholder='Tìm theo tên, nơi ban hành...'
            placeholderTextColor='#9CA3AF'
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.filtersRow}>
          <CustomDropdown
            options={SCOPE_OPTIONS}
            placeholder='Lọc theo phạm vi'
            selectedValue={selectedScope}
            onSelect={value => setSelectedScope(value)}
            isOpen={scopeDropdownOpen}
            onToggle={toggleScopeDropdown}
            containerClassName='flex-1'
          />
          <View style={{ width: 8 }} />
          <CustomDropdown
            options={TYPE_OPTIONS}
            placeholder='Lọc theo loại'
            selectedValue={selectedType}
            onSelect={value => setSelectedType(value)}
            isOpen={typeDropdownOpen}
            onToggle={toggleTypeDropdown}
            containerClassName='flex-1'
          />
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push('/(app)/leader/documents/add')} // Ensure this path is correct
        >
          <Ionicons
            name='add-circle-outline'
            size={22}
            color='white'
            style={{ marginRight: 8 }}
          />
          <Text style={styles.addButtonText}>Tạo tài liệu mới</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredDocuments}
        renderItem={renderDocumentItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <View style={styles.emptyListContainer}>
            <Ionicons name='file-tray-outline' size={48} color='#9CA3AF' />
            <Text style={styles.emptyListText}>
              Không có tài liệu nào phù hợp.
            </Text>
          </View>
        }
        contentContainerStyle={styles.listContentContainer}
        // Handle tap outside dropdowns to close them
        onTouchStart={() => {
          if (scopeDropdownOpen) setScopeDropdownOpen(false)
          if (typeDropdownOpen) setTypeDropdownOpen(false)
        }}
      />
    </SafeAreaView>
  )
}

// --- Styles ---
// Using StyleSheet for better organization and performance
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6' // gray-100
  },
  headerContainer: {
    backgroundColor: '#3E4FF5', // Your primary color
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    paddingTop: Platform.OS === 'android' ? 10 : 30, // Adjust for status bar
    paddingBottom: 40 // Increased padding to push content below
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  backButton: {
    padding: 8, // Make tap area larger
    zIndex: 10
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center' // Center title if back button is present
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  headerRightPlaceholder: {
    width: 28 + 2 * 8 // Same width as back button for balance
  },
  controlsContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: -28, // Pulls this section up over the header's bottom curve
    zIndex: 20, // Ensure it's above the header curve
    marginBottom: 12
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 12 : 0, // Adjust padding for Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 3,
    marginBottom: 12,
    height: 50 // Fixed height for search bar
  },
  searchInput: {
    flex: 1,
    height: '100%', // Fill height of container
    paddingVertical: 0, // Remove default padding if any
    color: '#374151', // gray-700
    fontSize: 16
  },
  filtersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    zIndex: 100 // For dropdowns to overlap list
  },
  addButton: {
    backgroundColor: '#2563EB', // blue-600
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
    height: 50 // Fixed height
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600', // semibold
    fontSize: 16
  },
  listContentContainer: {
    paddingTop: 10,
    paddingHorizontal: 16,
    paddingBottom: 20 // Ensure space at the bottom
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    paddingVertical: 40
  },
  emptyListText: {
    textAlign: 'center',
    color: '#6B7280', // gray-500
    marginTop: 16,
    fontSize: 16
  }
})
