import React, { useState, useMemo } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
  TextInput,
  Alert,
  ScrollView as DropdownScrollView,
  Platform
} from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons, Feather } from '@expo/vector-icons'

// --- Kiểu dữ liệu ---
type SystemRole = 'QTV' | 'NQL' | 'ĐV' // Vai trò hệ thống

type Member = {
  id: string
  name: string
  email: string
  phone: string
  role: string // Vai trò mô tả để hiển thị trong danh sách (ví dụ: 'Bí thư Chi đoàn')
  systemRole: SystemRole // Vai trò hệ thống để logic và truyền cho DetailScreen
  status: 'Hoạt động' | 'Chờ phê duyệt' | 'Khóa' | 'Đã xóa'
  avatar?: string
  // Các trường này có thể được dùng để truyền cho UnionInfo của DetailScreen
  cardNumber?: string // Sẽ được truyền như unionCardNumber
  branch?: string // Sẽ được truyền như chapterName
  // Nếu bạn có các thông tin khác của UnionInfo ở đây, hãy thêm vào
  address?: string // Địa chỉ của đoàn viên (nếu có trong danh sách)
  hometown?: string // Quê quán của đoàn viên (nếu có trong danh sách)
  // ... các trường khác của UnionInfo nếu bạn muốn truyền từ list
}

interface DropdownOption {
  label: string
  value: string
}

// --- Dữ liệu mẫu và Options ---
const initialMembers: Member[] = [
  {
    id: '1',
    name: 'Võ Thế Quyền',
    email: 'thequyen.vo@example.com',
    phone: '0946001469',
    role: 'Bí thư Chi đoàn',
    systemRole: 'NQL',
    status: 'Hoạt động',
    branch: 'Chi đoàn TH.HCM',
    avatar:
      'https://images2.thanhnien.vn/Uploaded/nuvuong/2022_12_04/317097199-9077169845630020-6360913673153753956-n-2121.jpg',
    cardNumber: '75TD6712',
    address: '123 Đường Quyền, TP.HCM',
    hometown: 'Tỉnh Quyền'
  },
  {
    id: '7',
    name: 'Admin Cao Cấp',
    email: 'admin.cc@example.com',
    phone: '0900000000',
    role: 'Quản trị Hệ thống',
    systemRole: 'QTV',
    status: 'Hoạt động',
    branch: 'Văn phòng Đoàn', // QTV có thể thuộc một "chi nhánh" chung
    avatar:
      'https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg'
  },
  {
    id: '4',
    name: 'Phạm Thị Mai',
    email: 'mai.pham@example.com',
    phone: '0905111222',
    role: 'Đoàn viên ưu tú',
    systemRole: 'ĐV',
    status: 'Chờ phê duyệt',
    branch: 'Chi đoàn B',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsynwv-5qtogtOwKmFN جامعMAXQ2Y2zOoOyHhRYA&s',
    cardNumber: '75TD0002',
    address: '456 Đường Mai, Hà Nội',
    hometown: 'Tỉnh Mai'
  },
  {
    id: '2',
    name: 'Nguyễn Thị Lan',
    email: 'lan.nguyen@example.com',
    phone: '0912345678',
    role: 'Đoàn viên',
    systemRole: 'ĐV',
    status: 'Khóa',
    branch: 'Chi đoàn A',
    avatar:
      'https://images2.thanhnien.vn/Uploaded/nuvuong/2022_12_04/316131890-10230107628260392-757716651156732241-n-8044.jpg',
    cardNumber: '75TD0001'
  },
  {
    id: '5',
    name: 'Lê Văn Long',
    email: 'long.le@example.com',
    phone: '0988777666',
    role: 'Ủy viên BCH',
    systemRole: 'NQL',
    status: 'Chờ phê duyệt', // Giả sử Ủy viên là NQL
    branch: 'Chi đoàn C',
    cardNumber: '75TD0003'
  },
  {
    id: '3',
    name: 'Trần Văn Minh',
    email: 'vanminh.tran@example.com',
    phone: '0905123789',
    role: 'Phó Bí thư',
    systemRole: 'NQL',
    status: 'Hoạt động',
    branch: 'Chi đoàn Cơ sở B',
    cardNumber: '76TD9900'
  },
  {
    id: '6',
    name: 'Hoàng Anh Tuấn',
    email: 'tuan.ha@example.com',
    phone: '0333444555',
    role: 'Đoàn viên',
    systemRole: 'ĐV',
    status: 'Đã xóa',
    branch: 'Chi đoàn D',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_z_2Co8x9p5yYSAzGzQQFUd5Ym5Yj1w8hfw&s'
  }
]

const STATUS_OPTIONS: DropdownOption[] = [
  { label: 'Tất cả trạng thái', value: 'Tất cả' },
  { label: 'Hoạt động', value: 'Hoạt động' },
  { label: 'Chờ phê duyệt', value: 'Chờ phê duyệt' },
  { label: 'Khóa', value: 'Khóa' },
  { label: 'Đã xóa', value: 'Đã xóa' }
]

// --- Component CustomDropdown (giữ nguyên) ---
const CustomDropdown: React.FC<{
  options: DropdownOption[]
  placeholder: string
  onSelect: (value: string) => void
  selectedValue: string
  isOpen: boolean
  onToggle: () => void
  containerClassName?: string
  dropdownListClassName?: string
}> = ({
  options,
  placeholder,
  onSelect,
  selectedValue,
  isOpen,
  onToggle,
  containerClassName = 'w-full',
  dropdownListClassName = ''
}) => {
  const displayLabel =
    options.find(opt => opt.value === selectedValue)?.label || placeholder
  return (
    <View className={containerClassName} style={{ zIndex: isOpen ? 30 : 10 }}>
      <TouchableOpacity
        onPress={onToggle}
        className='flex-row items-center justify-between p-3 border border-gray-300 bg-white rounded-lg shadow-sm h-[50px]'
      >
        <Text className='text-gray-700 text-base' numberOfLines={1}>
          {displayLabel}
        </Text>
        <Feather
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={20}
          color='#6B7280'
        />
      </TouchableOpacity>
      {isOpen && (
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

export default function MembersListScreen () {
  const router = useRouter()
  const [members, setMembers] = useState<Member[]>(initialMembers)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('Tất cả')
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false)

  const toggleStatusDropdown = () => {
    setStatusDropdownOpen(prev => !prev)
  }

  const handleDeleteMember = (memberId: string, memberName: string) => {
    Alert.alert(
      'Xác nhận xóa',
      `Bạn có chắc muốn xóa tài khoản "${memberName}" không?`,
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          onPress: () => {
            setMembers(prevMembers =>
              prevMembers.filter(member => member.id !== memberId)
            )
          },
          style: 'destructive'
        }
      ],
      { cancelable: true }
    )
  }

  const processedMembers = useMemo(() => {
    let tempMembers = [...members]
    if (selectedStatus !== 'Tất cả') {
      tempMembers = tempMembers.filter(
        member => member.status === selectedStatus
      )
    }
    if (searchQuery.trim()) {
      const lowercasedQuery = searchQuery.toLowerCase().trim()
      tempMembers = tempMembers.filter(
        m =>
          m.name.toLowerCase().includes(lowercasedQuery) ||
          m.email.toLowerCase().includes(lowercasedQuery) ||
          m.phone.includes(lowercasedQuery)
      )
    }
    tempMembers.sort((a, b) => {
      if (a.status === 'Chờ phê duyệt' && b.status !== 'Chờ phê duyệt')
        return -1
      if (a.status !== 'Chờ phê duyệt' && b.status === 'Chờ phê duyệt') return 1
      return a.name.localeCompare(b.name)
    })
    return tempMembers
  }, [members, searchQuery, selectedStatus])

  const renderMemberItem = ({ item }: { item: Member }) => {
    let statusIconName: keyof typeof Ionicons.glyphMap = 'alert-circle-outline'
    let statusColorClass = 'text-gray-600'
    let iconColor = '#4B5563'
    if (item.status === 'Hoạt động') {
      statusIconName = 'checkmark-circle-outline'
      statusColorClass = 'text-green-600'
      iconColor = '#10B981'
    } else if (item.status === 'Chờ phê duyệt') {
      statusIconName = 'hourglass-outline'
      statusColorClass = 'text-yellow-600'
      iconColor = '#F59E0B'
    } else if (item.status === 'Khóa') {
      statusIconName = 'lock-closed-outline'
      statusColorClass = 'text-red-600'
      iconColor = '#EF4444'
    } else if (item.status === 'Đã xóa') {
      statusIconName = 'trash-bin-outline'
      statusColorClass = 'text-gray-500'
      iconColor = '#6B7280'
    }

    return (
      <TouchableOpacity
        className='bg-white p-4 mb-3 rounded-lg shadow-sm'
        onPress={() => {
          // Truyền dữ liệu cần thiết, bao gồm systemRole dưới tên 'role'
          // và các thông tin khác mà MemberDetailScreen có thể sử dụng
          const paramsToPass: any = {
            id: item.id,
            name: item.name,
            email: item.email,
            phone: item.phone,
            role: item.systemRole, // QUAN TRỌNG: truyền systemRole thành 'role'
            status: item.status,
            avatar: item.avatar,
            // Các trường cho UnionInfo (nếu có)
            chapterName: item.branch, // Giả sử branch là chapterName
            unionCardNumber: item.cardNumber,
            address: item.address,
            hometown: item.hometown
            // Thêm các trường khác của UnionInfo nếu bạn đã định nghĩa trong Member type
            // unionJoinDate: item.unionJoinDate,
            // unionPosition: item.unionPosition,
            // ethnicity: item.ethnicity,
            // religion: item.religion,
            // educationLevel: item.educationLevel,
          }
          // Loại bỏ các trường undefined để params gọn gàng hơn
          Object.keys(paramsToPass).forEach(
            key => paramsToPass[key] === undefined && delete paramsToPass[key]
          )

          router.push({
            pathname: '/(app)/admin/accounts/detail',
            params: paramsToPass
          })
        }}
      >
        <View className='flex-row items-center'>
          <Image
            source={
              item.avatar
                ? { uri: item.avatar }
                : require('../../../../assets/images/avatar-placeholder.png')
            }
            className='w-16 h-16 rounded-full mr-4'
          />
          <View className='flex-1'>
            <Text className='font-bold text-lg text-gray-800'>{item.name}</Text>
            <View className='flex-row items-center mt-1'>
              <Ionicons name='mail-outline' size={16} color='#4B5563' />
              <Text className='text-gray-600 ml-2 text-sm'>{item.email}</Text>
            </View>
            <View className='flex-row items-center mt-1'>
              <Ionicons name='call-outline' size={16} color='#4B5563' />
              <Text className='text-gray-600 ml-2 text-sm'>{item.phone}</Text>
            </View>
            {/* Hiển thị vai trò mô tả trong danh sách */}
            <View className='flex-row items-center mt-1'>
              <Ionicons
                name='person-circle-outline'
                size={16}
                color='#4B5563'
              />
              <Text className='text-gray-600 ml-2 text-sm'>
                Chức vụ: {item.role}
              </Text>
            </View>
            <View className='flex-row items-center mt-1'>
              <Ionicons name={statusIconName} size={16} color={iconColor} />
              <Text className={`ml-2 text-sm font-medium ${statusColorClass}`}>
                {item.status}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => handleDeleteMember(item.id, item.name)}
            className='p-2 ml-2 self-start'
          >
            <Ionicons name='trash-outline' size={24} color='#EF4444' />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView className='flex-1 bg-gray-100'>
      {/* Header Section */}
      <View
        className='w-full bg-[#3E4FF5] px-4 rounded-b-2xl shadow-lg'
        style={{
          paddingTop: Platform.OS === 'android' ? 10 : 30,
          paddingBottom: 40
        }}
      >
        <View className='flex-row items-center justify-between'>
          <TouchableOpacity
            onPress={() => (router.canGoBack() ? router.back() : null)}
            className='p-2 z-10'
          >
            <Ionicons name='arrow-back' size={28} color='white' />
          </TouchableOpacity>
          <View className='flex-1'>
            <Text className='text-white text-2xl font-bold text-center'>
              Danh sách Tài khoản
            </Text>
          </View>
          <View style={{ width: 28 + 2 * 8 }} />
        </View>
      </View>

      {/* Cụm Search, Filter, Add */}
      <View
        className='w-[90%] mx-auto pb-3'
        style={{ marginTop: -28, zIndex: 20 }}
      >
        <View className='flex-row items-center bg-white rounded-xl p-3 shadow-md mb-3'>
          <Feather name='search' size={22} color='#6B7280' className='mr-3' />
          <TextInput
            placeholder='Tìm theo tên, email, SĐT...'
            placeholderTextColor='#9CA3AF'
            className='flex-1 h-[38px] py-0 text-gray-700 text-base'
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <View className='flex-row items-center gap-x-2'>
          <View
            className='flex-1'
            style={{ zIndex: statusDropdownOpen ? 100 : 10 }}
          >
            <CustomDropdown
              options={STATUS_OPTIONS}
              placeholder='Lọc theo trạng thái'
              selectedValue={selectedStatus}
              onSelect={value => setSelectedStatus(value)}
              isOpen={statusDropdownOpen}
              onToggle={toggleStatusDropdown}
            />
          </View>
          <TouchableOpacity
            className='bg-blue-600 p-3 rounded-lg flex-row items-center justify-center shadow-md h-[50px]'
            onPress={() => router.push('/(app)/admin/accounts/add')}
          >
            <Ionicons
              name='add-circle-outline'
              size={22}
              color='white'
              className='mr-1 md:mr-2'
            />
            <Text className='text-white font-semibold text-base'>
              Tạo tài khoản mới
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={processedMembers}
        renderItem={renderMemberItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <View className='flex-1 justify-center items-center mt-10 py-10'>
            <Ionicons
              name='information-circle-outline'
              size={48}
              color='#9CA3AF'
            />
            <Text className='text-center text-gray-500 mt-4 text-base'>
              Không có tài khoản nào.
            </Text>
          </View>
        }
        contentContainerStyle={{ paddingTop: 10, paddingHorizontal: 16 }}
      />
    </SafeAreaView>
  )
}
