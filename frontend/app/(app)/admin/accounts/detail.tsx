import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  Alert,
  Platform
} from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

// --- Định nghĩa kiểu dữ liệu (Giữ nguyên) ---
type PersonalInfo = {
  avatar?: string
  name: string
  email: string
  phone: string
  gender: 'Nam' | 'Nữ' | 'Khác'
  dob: string
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

type ManagedChapterInfo = {
  name: string
  establishmentDate: string
  address: string
  parentUnion: string
  managerName: string
  status: 'Hoạt động' | 'Khóa'
}

type MemberDetailData = PersonalInfo & {
  id: string
  unionInfo?: UnionInfo
  managedChapterInfo?: ManagedChapterInfo
}

// --- Component DetailRow ĐÃ CẬP NHẬT ---
const DetailRow: React.FC<{
  icon?: keyof typeof Ionicons.glyphMap
  label: string
  value?: string | null
  valueClassName?: string
  isLast?: boolean // Thêm prop để biết đây có phải item cuối không (để không vẽ đường kẻ)
}> = ({
  icon,
  label,
  value,
  valueClassName = 'text-gray-800',
  isLast = false
}) => {
  if (value === null || value === undefined || value === '') return null // Không render nếu giá trị không hợp lệ hoặc rỗng

  return (
    // View container cho mỗi dòng, có padding và đường kẻ dưới (trừ item cuối)
    <View className={`py-3 ${!isLast ? 'border-b border-gray-200' : ''}`}>
      {/* Phần Label và Icon */}
      <View className='flex-row items-center mb-1'>
        {icon && (
          <Ionicons name={icon} size={16} color='#6B7280' className='mr-2' />
        )}
        <Text className='text-sm text-gray-500 font-medium'>{label}</Text>
      </View>
      {/* Phần Value */}
      <Text className={`text-base ml-1 ${valueClassName}`}>{value}</Text>
    </View>
  )
}

// Định nghĩa kiểu cho activeTab (Giữ nguyên)
type ActiveTabType = 'personal' | 'union' | 'managedChapter'

export default function MemberDetailScreen () {
  const router = useRouter()
  const params = useLocalSearchParams<{
    id: string
    name?: string
    avatar?: string
    email?: string
    phone?: string
    role?: 'QTV' | 'NQL' | 'ĐV'
    status?: 'Hoạt động' | 'Chờ phê duyệt' | 'Khóa'
    cardNumber?: string
    branch?: string
    chapterName?: string
    unionCardNumber?: string
    unionJoinDate?: string
    unionPosition?: string
    address?: string
    hometown?: string
    ethnicity?: string
    religion?: string
    educationLevel?: string
    gender?: 'Nam' | 'Nữ' | 'Khác' // Thêm gender vào params type
    dob?: string // Thêm dob vào params type
  }>()

  const [memberData, setMemberData] = useState<MemberDetailData | null>(null)
  const [activeTab, setActiveTab] = useState<ActiveTabType>('personal')

  useEffect(() => {
    if (params.id) {
      if (!memberData || memberData.id !== params.id) {
        const roleFromParams = params.role || 'ĐV'
        const statusFromParams = params.status || 'Hoạt động'
        const data: MemberDetailData = {
          id: params.id,
          name: params.name || 'N/A',
          avatar: params.avatar,
          email: params.email || 'N/A',
          phone: params.phone || 'N/A',
          gender: params.gender || 'Nam', // Lấy từ params hoặc mock
          dob: params.dob || 'N/A', // Lấy từ params hoặc mock
          role: roleFromParams,
          status: statusFromParams,
          unionInfo:
            roleFromParams === 'ĐV' || roleFromParams === 'NQL'
              ? {
                  chapterName: params.chapterName || params.branch || 'Chưa rõ',
                  unionCardNumber:
                    params.unionCardNumber || params.cardNumber || 'Chưa rõ',
                  unionJoinDate: params.unionJoinDate || 'Chưa rõ',
                  unionPosition:
                    (params.unionPosition as UnionInfo['unionPosition']) ||
                    'Đoàn viên',
                  address: params.address || 'Chưa rõ',
                  hometown: params.hometown || 'Chưa rõ',
                  ethnicity: params.ethnicity || 'Chưa rõ',
                  religion: params.religion || 'Chưa rõ',
                  educationLevel: params.educationLevel || 'Chưa rõ'
                }
              : undefined,
          managedChapterInfo:
            roleFromParams === 'QTV'
              ? {
                  name: `Chi đoàn do ${params.name || 'QTV'} quản lý`,
                  establishmentDate: '01/01/2020',
                  address: 'Địa chỉ chi đoàn mẫu',
                  parentUnion: 'Đoàn cấp trên mẫu',
                  managerName: params.name || 'QTV',
                  status: 'Hoạt động'
                }
              : undefined
        }
        setMemberData(data)
        setActiveTab('personal')
      }
    } else if (!memberData) {
      // console.log('MemberDetailScreen: Missing ID in params, cannot load data.');
    }
  }, [
    params.id,
    params.name,
    params.avatar,
    params.email,
    params.phone,
    params.role,
    params.status,
    params.cardNumber,
    params.branch,
    params.chapterName,
    params.unionCardNumber,
    params.unionJoinDate,
    params.unionPosition,
    params.address,
    params.hometown,
    params.ethnicity,
    params.religion,
    params.educationLevel,
    params.gender,
    params.dob
  ])

  // --- Các hàm xử lý hành động (giữ nguyên) ---
  const handleEdit = () => {
    if (!memberData) return
    router.push({
      pathname: '/(app)/admin/accounts/edit',
      params: { memberDataString: JSON.stringify(memberData) }
    })
  }
  const handleToggleLock = () => {
    if (!memberData) return
    const newStatus = memberData.status === 'Hoạt động' ? 'Khóa' : 'Hoạt động'
    Alert.alert(
      `${newStatus === 'Khóa' ? 'Khóa' : 'Mở khóa'} tài khoản`,
      `Bạn có chắc muốn ${newStatus.toLowerCase()} tài khoản "${
        memberData.name
      }"?`,
      [
        { text: 'Hủy' },
        {
          text: 'Xác nhận',
          onPress: () =>
            setMemberData(prev =>
              prev ? { ...prev, status: newStatus } : null
            )
        }
      ]
    )
  }
  const handleApprove = () => {
    if (!memberData) return
    Alert.alert(
      'Duyệt tài khoản',
      `Bạn có chắc muốn duyệt tài khoản "${memberData.name}"?`,
      [
        { text: 'Hủy' },
        {
          text: 'Duyệt',
          onPress: () =>
            setMemberData(prev =>
              prev ? { ...prev, status: 'Hoạt động' } : null
            )
        }
      ]
    )
  }
  const handleReject = () => {
    if (!memberData) return
    Alert.alert(
      'Từ chối tài khoản',
      `Bạn có chắc muốn từ chối tài khoản "${memberData.name}"?`,
      [
        { text: 'Hủy' },
        {
          text: 'Từ chối',
          onPress: () =>
            setMemberData(prev => (prev ? { ...prev, status: 'Khóa' } : null)),
          style: 'destructive'
        }
      ]
    )
  }

  if (!memberData) {
    return (
      <SafeAreaView className='flex-1 justify-center items-center bg-gray-100'>
        <Text>Đang tải dữ liệu hoặc không tìm thấy...</Text>
      </SafeAreaView>
    )
  }

  const getStatusColor = (status: MemberDetailData['status']) => {
    if (status === 'Hoạt động') return 'text-green-600'
    if (status === 'Khóa') return 'text-red-600'
    if (status === 'Chờ phê duyệt') return 'text-yellow-600'
    return 'text-gray-700'
  }

  const TabButton: React.FC<{
    title: string
    onPress: () => void
    isActive: boolean
  }> = ({ title, onPress, isActive }) => (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-1 py-3 items-center border-b-2 ${
        isActive ? 'border-blue-500 bg-blue-50' : 'border-transparent bg-white'
      }`}
    >
      <Text
        className={`text-base font-semibold ${
          isActive ? 'text-blue-600' : 'text-gray-600'
        }`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  )

  let secondTabInfo: { type: ActiveTabType; title: string } | null = null
  if (memberData.role === 'ĐV' || memberData.role === 'NQL') {
    if (memberData.unionInfo) {
      secondTabInfo = { type: 'union', title: 'Thông tin Đoàn viên' }
    }
  } else if (memberData.role === 'QTV') {
    if (memberData.managedChapterInfo) {
      secondTabInfo = { type: 'managedChapter', title: 'Chi đoàn Quản lý' }
    }
  }

  // --- Render các mục thông tin cho từng tab ---
  const renderPersonalContent = () => (
    <View className='p-4 mt-1 bg-white rounded-lg shadow'>
      {/* Thêm bg-white, rounded, shadow cho khối content */}
      <DetailRow label='Email' value={memberData.email} />
      <DetailRow label='Số điện thoại' value={memberData.phone} />
      <DetailRow label='Giới tính' value={memberData.gender} />
      <DetailRow label='Ngày sinh' value={memberData.dob} />
      <DetailRow
        label='Vai trò hệ thống'
        value={memberData.role}
        isLast={true}
      />
    </View>
  )

  const renderUnionContent = () =>
    memberData.unionInfo && (
      <View className='p-4 mt-4 bg-white rounded-lg shadow'>
        <DetailRow
          label='Thuộc Chi đoàn'
          value={memberData.unionInfo.chapterName}
        />
        <DetailRow
          label='Số thẻ Đoàn'
          value={memberData.unionInfo.unionCardNumber}
        />
        <DetailRow
          label='Ngày vào Đoàn'
          value={memberData.unionInfo.unionJoinDate}
        />
        <DetailRow
          label='Chức vụ Đoàn'
          value={memberData.unionInfo.unionPosition}
        />
        <DetailRow label='Địa chỉ' value={memberData.unionInfo.address} />
        <DetailRow label='Quê quán' value={memberData.unionInfo.hometown} />
        <DetailRow label='Dân tộc' value={memberData.unionInfo.ethnicity} />
        <DetailRow label='Tôn giáo' value={memberData.unionInfo.religion} />
        <DetailRow
          label='Trình độ học vấn'
          value={memberData.unionInfo.educationLevel}
          isLast={true}
        />
      </View>
    )

  const renderManagedChapterContent = () =>
    memberData.managedChapterInfo && (
      <View className='p-4 mt-4 bg-white rounded-lg shadow'>
        {/* Thêm bg-white, rounded, shadow và mt-4 */}
        <Text className='text-xl font-semibold mb-4 text-blue-700'>
          Chi đoàn Quản lý
        </Text>
        <DetailRow
          label='Tên Chi đoàn'
          value={memberData.managedChapterInfo.name}
        />
        <DetailRow
          label='Ngày thành lập'
          value={memberData.managedChapterInfo.establishmentDate}
        />
        <DetailRow
          label='Địa chỉ CĐ'
          value={memberData.managedChapterInfo.address}
        />
        <DetailRow
          label='Đoàn trực thuộc'
          value={memberData.managedChapterInfo.parentUnion}
        />
        <DetailRow
          label='Trạng thái CĐ'
          value={memberData.managedChapterInfo.status}
          valueClassName={
            memberData.managedChapterInfo.status === 'Hoạt động'
              ? 'text-green-600'
              : 'text-red-600'
          }
          isLast={true}
        />
      </View>
    )

  return (
    <SafeAreaView className='flex-1 bg-gray-100'>
      {/* Header Section */}
      <View
        className='w-full bg-[#3E4FF5] px-4 rounded-b-2xl shadow-lg'
        style={{
          paddingTop: Platform.OS === 'android' ? 10 : 30,
          paddingBottom: 15
        }}
      >
        <View className='flex-row items-center justify-between'>
          <TouchableOpacity
            onPress={() => (router.canGoBack() ? router.back() : null)}
            className='p-2'
          >
            <Ionicons name='arrow-back' size={28} color='white' />
          </TouchableOpacity>
          <View className='flex-1'>
            <Text className='text-white text-2xl font-bold text-center'>
              Chi tiết Tài khoản
            </Text>
          </View>
          <View style={{ width: 28 + 2 * 8 }} />
        </View>
      </View>

      {/* Ảnh đại diện và Tên */}
      <View className='items-center py-6 px-4 bg-white shadow-md'>
        {/* Giảm p-6 thành py-6 px-4 */}
        <Image
          source={
            memberData.avatar
              ? { uri: memberData.avatar }
              : require('../../../../assets/images/avatar-placeholder.png')
          }
          className='w-24 h-24 rounded-full border-4 border-blue-200' // Giảm kích thước avatar một chút
        />
        <Text className='text-2xl font-bold mt-3 text-gray-800'>
          {memberData.name}
        </Text>
        <Text
          className={`text-sm font-semibold ${getStatusColor(
            memberData.status
          )}`}
        >
          ({memberData.status})
        </Text>
      </View>

      {/* Tab Buttons */}
      <View className='flex-row bg-white border-b border-gray-200 shadow-sm'>
        {/* Bỏ px-2 pt-1 */}
        <TabButton
          title='Thông tin cá nhân'
          onPress={() => setActiveTab('personal')}
          isActive={activeTab === 'personal'}
        />
        {secondTabInfo && (
          <TabButton
            title={secondTabInfo.title}
            onPress={() => setActiveTab(secondTabInfo.type)}
            isActive={activeTab === secondTabInfo.type}
          />
        )}
      </View>

      <ScrollView
        className='flex-1 px-4 pt-4'
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Thêm px-4 pt-4 cho ScrollView */}
        {activeTab === 'personal' && renderPersonalContent()}
        {activeTab === 'union' && renderUnionContent()}
        {activeTab === 'managedChapter' && renderManagedChapterContent()}
      </ScrollView>

      {/* Các nút hành động */}
      <View className='p-4 bg-white border-t border-gray-200 flex-col gap-y-3'>
        {memberData.status === 'Chờ phê duyệt' && (
          <View className='flex-row gap-x-3'>
            <TouchableOpacity
              className='bg-green-500 p-3 rounded-lg flex-1 flex-row justify-center items-center shadow'
              onPress={handleApprove}
            >
              <Ionicons
                name='checkmark-circle-outline'
                size={20}
                color='white'
              />
              <Text className='text-white font-bold ml-2'>Duyệt</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className='bg-red-500 p-3 rounded-lg flex-1 flex-row justify-center items-center shadow'
              onPress={handleReject}
            >
              <Ionicons name='close-circle-outline' size={20} color='white' />
              <Text className='text-white font-bold ml-2'>Từ chối</Text>
            </TouchableOpacity>
          </View>
        )}
        {memberData.status !== 'Chờ phê duyệt' && (
          <TouchableOpacity
            className={`${
              memberData.status === 'Hoạt động'
                ? 'bg-yellow-500'
                : 'bg-green-500'
            } p-3 rounded-lg flex-row justify-center items-center shadow`}
            onPress={handleToggleLock}
          >
            <Ionicons
              name={
                memberData.status === 'Hoạt động'
                  ? 'lock-closed-outline'
                  : 'lock-open-outline'
              }
              size={20}
              color='white'
            />
            <Text className='text-white font-bold ml-2'>
              {memberData.status === 'Hoạt động'
                ? 'Khóa Tài khoản'
                : 'Mở khóa Tài khoản'}
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          className='bg-blue-600 p-3 rounded-lg flex-row justify-center items-center shadow'
          onPress={handleEdit}
        >
          <Ionicons name='pencil-outline' size={20} color='white' />
          <Text className='text-white font-bold ml-2'>Chỉnh sửa Thông tin</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
