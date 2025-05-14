import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Image,
    StatusBar,
    Dimensions,
    FlatList,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const EventDetail = () => {
    const router = useRouter();
    const params = useLocalSearchParams();    // Mock event data
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
            'https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-6/482032651_1033663062119428_6517174517474946357_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeFPhsXdnpGPjmfQl6jcU7yl08fFuiDzQWfTx8W6IPNBZ2T4ayFuGDnWTaIU7G5stZV-wIHhwfVDzv03XWfjaAZF&_nc_ohc=van9DFnBhV8Q7kNvwHMZvgG&_nc_oc=Admu_TjshsCV4ssl-8ZBvDbT3zWyhUXFxNRL20iMoZIiL0yiMfH1Ziz1GRLZ8tVuunc&_nc_zt=23&_nc_ht=scontent.fsgn5-14.fna&_nc_gid=TA6OGt60AH9Fxa3B7ZqNEQ&oh=00_AfKuqElFyG6TNaB3u1QmKjedLTZ48r08xoCEob3-fTqAbg&oe=6829F4A8',
            'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1540317700647-ec69694d70d0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1546900703-cf06143d1239?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1526976668912-1a811878dd37?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ],
    }; const [currentStatus, setCurrentStatus] = useState<EventStatus>(event.status as EventStatus);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false); const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const flatListRef = React.useRef<FlatList>(null);
    const screenWidth = Dimensions.get('window').width;

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

                    <View className="w-[30px]" />
                </View>
            </View>

            {/* Content */}            <ScrollView className="flex-1">                {/* Event Image */}                <View className="relative">                <FlatList
                ref={flatListRef}
                data={event.images}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                decelerationRate="fast"
                snapToInterval={screenWidth}
                snapToAlignment="center"
                keyExtractor={(_, index) => `image-${index}`}
                onScroll={(event) => {
                    const contentOffset = event.nativeEvent.contentOffset;
                    const viewSize = event.nativeEvent.layoutMeasurement;
                    const index = Math.floor(contentOffset.x / viewSize.width);
                    setCurrentImageIndex(index);
                }}
                scrollEventThrottle={16}
                renderItem={({ item: image }) => (
                    <View style={{ width: screenWidth }}>
                        <Image
                            source={{ uri: image }}
                            className="w-full aspect-square"
                            style={{ resizeMode: 'cover' }}
                        />
                    </View>
                )}
            />

                {/* Image number indicator - Instagram style */}
                {event.images.length > 1 && (
                    <View className="absolute top-4 right-4 bg-black/50 px-2 py-1 rounded-full">
                        <Text className="text-white text-xs font-medium">
                            {currentImageIndex + 1}/{event.images.length}
                        </Text>
                    </View>
                )}

                {/* Image pagination indicators */}
                <View className="absolute bottom-4 left-0 right-0 flex-row justify-center">
                    {event.images.map((_, index) => (<TouchableOpacity
                        key={index}
                        onPress={() => {
                            setCurrentImageIndex(index);
                            flatListRef.current?.scrollToIndex({
                                index: index,
                                animated: true
                            });
                        }}
                        className="px-1 py-2"
                    >
                        <View
                            className={`h-2 rounded-full mx-1 ${index === currentImageIndex
                                ? 'bg-blue-500 w-4'
                                : 'bg-white opacity-70 w-2'
                                }`}
                        />
                    </TouchableOpacity>
                    ))}
                </View>

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
