import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Image,
    StatusBar,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const EventDetail = () => {
    const router = useRouter();
    const params = useLocalSearchParams();

    // Mock event data
    const event = {
        id: params.eventId as string,
        title: 'Chiến dịch thanh niên tình nguyện Mùa hè xanh 2025',
        time: '07:00 - 17:00, 15/03/2025 - 16/03/2025',
        location: 'Xã Tân Phú, Huyện Tân Châu, Tỉnh Tây Ninh',
        description:
            'Chiến dịch tình nguyện Mùa hè xanh là hoạt động thường niên của Đoàn Thanh niên nhằm phát huy vai trò xung kích, tình nguyện của đoàn viên trong việc tham gia phát triển kinh tế - xã hội, giải quyết các vấn đề an sinh xã hội.',
        status: 'Sắp diễn ra',
        requirements:
            'Mang theo đồ bảo hộ cá nhân, thuốc đặc trị (nếu có), sức khỏe tốt, tinh thần tích cực.',
        participants: 'Đoàn viên Chi đoàn A, Chi đoàn B, Chi đoàn C',
        scope: 'Chi đoàn',
        createdAt: '01/03/2025',
        updatedAt: '05/03/2025',
        images: [
            'https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/482032651_1033663062119428_6517174517474946357_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=MLPXFPC_ffwQ7kNvwEfSsuc&_nc_oc=AdlBlU7NTP7Bko76xxpJGDl8oSSQfjFfDQuyG9eHj_dn7gWyVe4Uknx-1V4Gz_UKmGY&_nc_zt=23&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=goRjnKSyl0ewsJerVIwpyA&oh=00_AfGglQZB6o2VKvEdEIhkSECOwj_l_WNLi5gpm3K7hIyxuA&oe=680A88E8',
            'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1540317700647-ec69694d70d0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ],
    };

    const [currentStatus, setCurrentStatus] = useState<EventStatus>(event.status as EventStatus);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

    const statuses = [
        'Sắp diễn ra',
        'Đang diễn ra',
        'Đã hoàn thành',
        'Khóa'
    ];


    type EventStatus = 'Sắp diễn ra' | 'Đang diễn ra' | 'Đã hoàn thành' | 'Khóa';

    const getStatusColor = (status: EventStatus): string => {
        switch (status) {
            case 'Sắp diễn ra': return 'bg-blue-500';
            case 'Đang diễn ra': return 'bg-green-500';
            case 'Đã hoàn thành': return 'bg-purple-500';
            case 'Khóa': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar barStyle="light-content" />
            {/* Header */}
            <View className="bg-blue-600 p-4">
                <View className="flex-row items-center justify-between">
                    <TouchableOpacity
                        className="bg-white/20 rounded-full p-2"
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={22} color="white" />
                    </TouchableOpacity>

                    <View>
                        <Text className="text-white text-xl font-bold text-center">
                            Chi tiết sự kiện
                        </Text>
                        <Text className="text-white text-xs text-center">
                            Đoàn Thanh niên - Hội Sinh viên
                        </Text>
                    </View>

                    <View style={{ width: 30 }} />
                </View>
            </View>

            {/* Content */}
            <ScrollView className="flex-1">
                {/* Event Image */}
                <View className="relative">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} pagingEnabled>
                        {event.images.map((image, index) => (
                            <Image
                                key={index}
                                source={{ uri: image }}
                                className="w-screen h-72"
                                style={{ resizeMode: 'cover' }}
                            />))}
                    </ScrollView>
                    <View className="absolute inset-0 bg-black opacity-30" />

                    {/* Status - with dropdown */}
                    <TouchableOpacity
                        className={`absolute bottom-4 right-4 px-3 py-1 rounded-full ${getStatusColor(currentStatus)}`}
                        onPress={() => setIsStatusModalOpen(true)}
                    >
                        <Text className="text-white font-medium text-sm">
                            {currentStatus}
                        </Text>
                    </TouchableOpacity>
                </View>                {/* Status change modal */}
                {isStatusModalOpen && (
                    <View className="absolute inset-0 z-50 bg-black bg-opacity-50 items-center justify-center">
                        <View className="bg-white rounded-lg w-4/5 p-4">
                            <Text className="text-lg font-bold mb-4 text-center">Cập nhật trạng thái</Text>
                            {statuses.map((status, index) => (
                                <TouchableOpacity
                                    key={index}
                                    className={`p-3 mb-2 rounded-lg ${currentStatus === status ? 'bg-blue-100 border border-blue-500' : ''}`}
                                    onPress={() => {
                                        setCurrentStatus(status as EventStatus);
                                        setIsStatusModalOpen(false);
                                    }}
                                >
                                    <Text className={`${currentStatus === status ? 'text-blue-600 font-bold' : 'text-gray-700'}`}>
                                        {status}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                            <TouchableOpacity
                                className="mt-2 p-3 rounded-lg bg-gray-100"
                                onPress={() => setIsStatusModalOpen(false)}
                            >
                                <Text className="text-center font-bold">Hủy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}                {/* Title */}
                <View className="px-4 pt-4">
                    <Text className="text-gray-900 text-2xl font-bold">
                        {event.title}
                    </Text>

                    {/* Ngày tạo/cập nhật */}
                    <View className="flex-row mt-1 mb-3">
                        <Text className="text-gray-500 text-xs">
                            Tạo ngày {event.createdAt} • Cập nhật {event.updatedAt}
                        </Text>
                    </View>
                </View>

                {/* Event Details */}
                <View className="px-4">
                    {/* Time and Location */}
                    <View className="mt-1 mb-4">
                        <View className="flex-row items-center mb-2">
                            <Ionicons name="time-outline" size={16} color="#666" />
                            <Text className="ml-1 text-gray-500 text-xs">{event.time}</Text>
                        </View>

                        <View className="flex-row items-center">
                            <Ionicons name="location-outline" size={16} color="#666" />
                            <Text className="ml-1 text-gray-500 text-xs">{event.location}</Text>
                        </View>
                    </View>

                    {/* Scope */}
                    <View className="bg-white rounded-lg p-4 mb-4 border border-gray-300">
                        <View className="flex-row items-center mb-3">
                            <Ionicons
                                name="people-outline"
                                size={20}
                                color="#3b82f6"
                            />
                            <Text className="text-lg font-bold ml-2 text-blue-600">
                                Phạm vi
                            </Text>
                        </View>
                        <Text className="text-gray-900 leading-6">
                            {event.scope}
                        </Text>
                    </View>

                    {/* Participants */}
                    <View className="bg-white rounded-lg p-4 mb-4 border border-gray-300">
                        <View className="flex-row items-center mb-3">
                            <Ionicons
                                name="people-circle-outline"
                                size={20}
                                color="#3b82f6"
                            />
                            <Text className="text-lg font-bold ml-2 text-blue-600">
                                Người tham gia
                            </Text>
                        </View>
                        <Text className="text-gray-900 leading-6">
                            {event.participants}
                        </Text>
                    </View>

                    {/* Requirements */}
                    <View className="bg-white rounded-lg p-4 mb-4 border border-gray-300">
                        <View className="flex-row items-center mb-3">
                            <Ionicons
                                name="list-outline"
                                size={20}
                                color="#3b82f6"
                            />
                            <Text className="text-lg font-bold ml-2 text-blue-600">
                                Yêu cầu
                            </Text>
                        </View>
                        <Text className="text-gray-900 leading-6">
                            {event.requirements}
                        </Text>
                    </View>

                    {/* Description */}
                    <View className="bg-white rounded-lg p-4 mb-8 border border-gray-300">
                        <View className="flex-row items-center mb-3">
                            <Ionicons
                                name="information-circle-outline"
                                size={20}
                                color="#3b82f6"
                            />
                            <Text className="text-lg font-bold ml-2 text-blue-600">
                                Mô tả
                            </Text>
                        </View>
                        <Text className="text-gray-900 leading-6">
                            {event.description}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default EventDetail;
