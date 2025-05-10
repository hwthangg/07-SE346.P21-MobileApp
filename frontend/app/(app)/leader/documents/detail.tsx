import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  Platform,
  StyleSheet,
  Linking // For opening file URLs
} from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Document, DocumentScope, DocumentStatus } from './index' // Assuming index.tsx exports Document type

// Helper function to get color based on scope (can be moved to a shared utils file)
const getScopeStyle = (scope: DocumentScope) => {
  switch (scope) {
    case 'Mật':
      return {
        icon: 'lock-closed-outline' as keyof typeof Ionicons.glyphMap,
        color: '#EF4444', // red-500
        bgColor: 'bg-red-100',
        textColor: 'text-red-700'
      }
    case 'Chi đoàn':
      return {
        icon: 'people-outline' as keyof typeof Ionicons.glyphMap,
        color: '#3B82F6', // blue-500
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-700'
      }
    case 'Công khai':
      return {
        icon: 'eye-outline' as keyof typeof Ionicons.glyphMap,
        color: '#10B981', // green-500
        bgColor: 'bg-green-100',
        textColor: 'text-green-700'
      }
    default:
      return {
        icon: 'help-circle-outline' as keyof typeof Ionicons.glyphMap,
        color: '#6B7280', // gray-500
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-700'
      }
  }
}

// Helper function to get color based on status
const getStatusStyle = (status: DocumentStatus) => {
  switch (status) {
    case 'Kích hoạt':
      return {
        icon: 'checkmark-circle-outline' as keyof typeof Ionicons.glyphMap,
        color: '#10B981', // green-500
        bgColor: 'bg-green-100',
        textColor: 'text-green-700'
      }
    case 'Đã xóa':
      return {
        icon: 'trash-bin-outline' as keyof typeof Ionicons.glyphMap,
        color: '#EF4444', // red-500
        bgColor: 'bg-red-100',
        textColor: 'text-red-700'
      }
    default:
      return {
        icon: 'information-circle-outline' as keyof typeof Ionicons.glyphMap,
        color: '#6B7280', // gray-500
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-700'
      }
  }
}

export default function DocumentDetailScreen () {
  const router = useRouter()
  const params = useLocalSearchParams()
  const [document, setDocument] = useState<Document | null>(null)

  useEffect(() => {
    if (params.document) {
      try {
        const docData = JSON.parse(params.document as string) as Document
        setDocument(docData)
      } catch (e) {
        console.error('Failed to parse document data:', e)
        Alert.alert('Lỗi', 'Không thể tải dữ liệu tài liệu.', [
          { text: 'OK', onPress: () => router.back() }
        ])
      }
    } else if (params.updatedDocument) {
      // Handle updates from Edit screen
      try {
        const updatedDocData = JSON.parse(
          params.updatedDocument as string
        ) as Document
        setDocument(updatedDocData)
      } catch (e) {
        console.error('Failed to parse updated document data:', e)
      }
    } else {
      Alert.alert('Lỗi', 'Không tìm thấy tài liệu.', [
        { text: 'OK', onPress: () => router.back() }
      ])
    }
  }, [params.document, params.updatedDocument]) // Re-run if document or updatedDocument param changes

  const handleDeleteDocument = () => {
    if (!document) return

    Alert.alert(
      'Xác nhận xóa',
      `Bạn có chắc muốn xóa tài liệu "${document.name}" không? Thao tác này sẽ chuyển trạng thái tài liệu thành "Đã xóa" và không thể hoàn tác trực tiếp từ đây.`,
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          onPress: () => {
            const updatedDoc = {
              ...document,
              status: 'Đã xóa' as DocumentStatus
            }
            // Navigate back and pass the ID or the updated document to the list screen
            // The list screen should then update its state
            if (router.canGoBack()) {
              router.replace({
                // Use replace to avoid going back to detail screen of deleted item
                pathname: '/(app)/leader/documents', // Adjust if your list screen path is different
                params: { updatedDocument: JSON.stringify(updatedDoc) } // Or deletedDocumentId: document.id
              })
            }
          },
          style: 'destructive'
        }
      ],
      { cancelable: true }
    )
  }

  const handleEditDocument = () => {
    if (!document) return
    router.push({
      pathname: '/(app)/leader/documents/edit', // Path to your edit screen
      params: { document: JSON.stringify(document) }
    })
  }

  const handleOpenFile = async (url?: string) => {
    if (!url) {
      Alert.alert(
        'Không có tệp',
        'Tài liệu này không có tệp đính kèm hoặc URL tệp không hợp lệ.'
      )
      return
    }
    try {
      const supported = await Linking.canOpenURL(url)
      if (supported) {
        await Linking.openURL(url)
      } else {
        Alert.alert('Không thể mở tệp', `Không thể mở URL: ${url}`)
      }
    } catch (error) {
      console.error('An error occurred', error)
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi cố gắng mở tệp.')
    }
  }

  if (!document) {
    // Optional: Show a loading indicator or a placeholder
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Đang tải dữ liệu tài liệu...</Text>
        </View>
      </SafeAreaView>
    )
  }

  const scopeStyle = getScopeStyle(document.scope)
  const statusStyle = getStatusStyle(document.status)

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
            <Text style={styles.headerTitle} numberOfLines={1}>
              Chi tiết Tài liệu
            </Text>
          </View>
          {/* Placeholder for balance, or add more actions here if needed */}
          <View style={styles.headerRightPlaceholder} />
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.card}>
          <Text style={styles.documentName}>{document.name}</Text>

          <InfoRow
            icon='calendar-outline'
            label='Ngày ban hành:'
            value={new Date(document.issueDate).toLocaleDateString('vi-VN')}
          />
          <InfoRow
            icon='location-outline'
            label='Nơi ban hành:'
            value={document.issuePlace}
          />
          <InfoRow
            icon='document-text-outline'
            label='Loại tài liệu:'
            value={document.type}
          />

          <View style={styles.tagRow}>
            <TagItem
              icon={scopeStyle.icon}
              text={document.scope}
              color={scopeStyle.color}
              backgroundColor={scopeStyle.bgColor}
              textColor={scopeStyle.textColor}
            />
            <TagItem
              icon={statusStyle.icon}
              text={document.status}
              color={statusStyle.color}
              backgroundColor={statusStyle.bgColor}
              textColor={statusStyle.textColor}
            />
          </View>

          {document.fileUrl && (
            <TouchableOpacity
              style={styles.fileLinkButton}
              onPress={() => handleOpenFile(document.fileUrl)}
            >
              <Ionicons
                name='attach-outline'
                size={20}
                color='#3E4FF5'
                style={{ marginRight: 8 }}
              />
              <Text style={styles.fileLinkText} numberOfLines={1}>
                {document.fileUrl.startsWith('http')
                  ? document.fileUrl
                  : `Tệp: ${document.fileUrl}`}
              </Text>
              <Ionicons
                name='open-outline'
                size={20}
                color='#3E4FF5'
                style={{ marginLeft: 'auto' }}
              />
            </TouchableOpacity>
          )}

          {document.description && (
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionLabel}>Mô tả chi tiết:</Text>
              <Text style={styles.descriptionText}>{document.description}</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {document.status !== 'Đã xóa' && (
        <View style={styles.footerActions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={handleDeleteDocument}
          >
            <Ionicons name='trash-outline' size={22} color='white' />
            <Text style={styles.actionButtonText}>Xóa</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            onPress={handleEditDocument}
          >
            <Ionicons name='pencil-outline' size={22} color='white' />
            <Text style={styles.actionButtonText}>Chỉnh sửa</Text>
          </TouchableOpacity>
        </View>
      )}
      {document.status === 'Đã xóa' && (
        <View style={styles.deletedMessageContainer}>
          <Ionicons
            name='information-circle-outline'
            size={24}
            color='#6B7280'
          />
          <Text style={styles.deletedMessageText}>
            Tài liệu này đã được chuyển vào mục lưu trữ (Đã xóa).
          </Text>
        </View>
      )}
    </SafeAreaView>
  )
}

// Reusable InfoRow component for displaying document details
const InfoRow: React.FC<{
  icon: keyof typeof Ionicons.glyphMap
  label: string
  value: string
}> = ({ icon, label, value }) => (
  <View style={styles.infoRow}>
    <Ionicons name={icon} size={20} color='#4B5563' style={styles.infoIcon} />
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue} numberOfLines={2}>
      {value}
    </Text>
  </View>
)

// Reusable TagItem component
const TagItem: React.FC<{
  icon: keyof typeof Ionicons.glyphMap
  text: string
  color: string
  backgroundColor: string
  textColor: string
}> = ({ icon, text, color, backgroundColor, textColor }) => (
  <View
    style={[
      styles.tag,
      {
        backgroundColor:
          Platform.OS === 'android' ? color + '20' : 'transparent'
      }
    ]}
    className={`${backgroundColor} ${Platform.OS === 'ios' ? 'border' : ''}`} // Tailwind classes for bg, conditional border for iOS
    // For iOS, Tailwind bg classes might not work with hex+alpha, so use inline style or ensure full color name
    // The className approach is generally preferred for Tailwind.
  >
    <Ionicons name={icon} size={16} color={color} style={{ marginRight: 6 }} />
    <Text style={[styles.tagText, { color: color }]} className={`${textColor}`}>
      {text}
    </Text>
  </View>
)

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6' // gray-100
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    fontSize: 18,
    color: '#6B7280' // gray-500
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
    marginHorizontal: 8 // Give some space if title is long
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  headerRightPlaceholder: {
    width: 28 + 2 * 8 // Match back button tap area
  },
  scrollView: {
    flex: 1
  },
  scrollViewContent: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 100 : 120 // Ensure space for footer actions
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2
  },
  documentName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937', // gray-800
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 30
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Align items to the start for potentially long values
    marginBottom: 12,
    paddingVertical: 4
  },
  infoIcon: {
    marginRight: 12,
    marginTop: 2 // Align icon nicely with text
  },
  infoLabel: {
    fontSize: 16,
    color: '#4B5563', // gray-600
    fontWeight: '500',
    marginRight: 8
  },
  infoValue: {
    fontSize: 16,
    color: '#1F2937', // gray-800
    flexShrink: 1 // Allow text to wrap if it's too long
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    marginBottom: 15,
    justifyContent: 'center', // Center tags if they wrap
    gap: 10
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16, // Pill shape
    // backgroundColor is applied via className or inline for iOS
    borderColor: 'rgba(0,0,0,0.1)' // For iOS border
  },
  tagText: {
    fontSize: 14,
    fontWeight: '500'
    // color is applied via className
  },
  fileLinkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF', // blue-50
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#DBEAFE' // blue-200
  },
  fileLinkText: {
    fontSize: 15,
    color: '#3E4FF5', // blue-600
    fontWeight: '500',
    flexShrink: 1
  },
  descriptionContainer: {
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB' // gray-200
  },
  descriptionLabel: {
    fontSize: 16,
    fontWeight: '600', // semibold
    color: '#374151', // gray-700
    marginBottom: 8
  },
  descriptionText: {
    fontSize: 15,
    color: '#4B5563', // gray-600
    lineHeight: 22
  },
  footerActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: Platform.OS === 'ios' ? 20 : 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF', // White background for the footer
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB', // gray-200
    paddingBottom: Platform.OS === 'ios' ? 30 : 15 // Extra padding for home indicator on iOS
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1, // Make buttons take equal width
    marginHorizontal: 5, // Add some space between buttons
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  deleteButton: {
    backgroundColor: '#EF4444' // red-500
  },
  editButton: {
    backgroundColor: '#F59E0B' // amber-500
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8
  },
  deletedMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#E5E7EB', // gray-200
    borderTopWidth: 1,
    borderTopColor: '#D1D5DB', // gray-300
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: Platform.OS === 'ios' ? 30 : 15
  },
  deletedMessageText: {
    marginLeft: 10,
    fontSize: 15,
    color: '#4B5563', // gray-600
    textAlign: 'center'
  }
})
