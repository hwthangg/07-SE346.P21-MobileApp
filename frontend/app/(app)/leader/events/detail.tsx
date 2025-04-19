import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Image,
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
        status: 'Đang thực hiện',
        requirements:
            'Mang theo đồ bảo hộ cá nhân, thuốc đặc trị (nếu có), sức khỏe tốt, tinh thần tích cực.',
        participants: 'Đoàn viên Chi đoàn A, Chi đoàn B, Chi đoàn C',
        createdAt: '01/03/2025',
        updatedAt: '05/03/2025',
        likes: 48,
        comments: 23,
        image: 'https://placehold.co/360x198',
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-100">
            {/* Header */}
            <View className="bg-blue-600 p-4 flex-row items-center">
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-white text-xl font-bold ml-4">Thông tin sự kiện</Text>
            </View>

            {/* Content */}
            <ScrollView className="flex-1">
                {/* Event Image */}
                <Image
                    source={{ uri: event.image }}
                    className="w-full h-48 rounded-b-lg"
                />

                {/* Event Details */}
                <View className="p-4">
                    <Text className="text-lg font-bold text-blue-600">{event.title}</Text>
                    <View className="mt-4">
                        <Text className="text-gray-600 text-sm">Thời gian:</Text>
                        <Text className="text-gray-800">{event.time}</Text>
                    </View>
                    <View className="mt-4">
                        <Text className="text-gray-600 text-sm">Địa điểm:</Text>
                        <Text className="text-gray-800">{event.location}</Text>
                    </View>
                    <View className="mt-4">
                        <Text className="text-gray-600 text-sm">Tình trạng:</Text>
                        <Text className="text-white bg-blue-600 px-3 py-1 rounded-full w-fit">
                            {event.status}
                        </Text>
                    </View>
                    <View className="mt-4">
                        <Text className="text-gray-600 text-sm">Mô tả:</Text>
                        <Text className="text-gray-800">{event.description}</Text>
                    </View>
                    <View className="mt-4">
                        <Text className="text-gray-600 text-sm">Người tham gia:</Text>
                        <Text className="text-gray-800">{event.participants}</Text>
                    </View>
                    <View className="mt-4">
                        <Text className="text-gray-600 text-sm">Yêu cầu:</Text>
                        <Text className="text-gray-800">{event.requirements}</Text>
                    </View>
                    <View className="mt-4 flex-row justify-between">
                        <View>
                            <Text className="text-gray-600 text-sm">Tạo:</Text>
                            <Text className="text-gray-800">{event.createdAt}</Text>
                        </View>
                        <View>
                            <Text className="text-gray-600 text-sm">Cập nhật:</Text>
                            <Text className="text-gray-800">{event.updatedAt}</Text>
                        </View>
                    </View>
                    <View className="mt-4 flex-row justify-between">
                        <View>
                            <Text className="text-gray-600 text-sm">Lượt thích:</Text>
                            <Text className="text-gray-800">{event.likes}</Text>
                        </View>
                        <View>
                            <Text className="text-gray-600 text-sm">Bình luận:</Text>
                            <Text className="text-gray-800">{event.comments}</Text>
                        </View>
                    </View>
                </View>

                {/* Action Buttons */}
                <View className="flex-row justify-between p-4">
                    <TouchableOpacity
                        className="bg-red-600 p-3 rounded-lg flex-1 mr-2 flex-row justify-center items-center"
                        onPress={() => console.log('Xóa sự kiện:', event.id)}
                    >
                        <Ionicons name="trash-outline" size={24} color="white" />
                        <Text className="text-white font-bold ml-2">Xóa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="bg-blue-600 p-3 rounded-lg flex-1 ml-2 flex-row justify-center items-center"
                        onPress={() =>
                            router.push({
                                pathname: '/(app)/leader/events/create',
                                params: { ...event, isEdit: 'true' },
                            })
                        }
                    >
                        <Ionicons name="pencil-outline" size={24} color="white" />
                        <Text className="text-white font-bold ml-2">Chỉnh sửa</Text>
                    </TouchableOpacity>
                </View>

                {/* Comment Section */}
                <View className="p-4 border-t border-gray-300">
                    <Text className="text-lg font-bold mb-4">Bình luận</Text>
                    <View className="flex-row items-center border border-gray-300 rounded-lg p-3 bg-white">
                        <Ionicons name="chatbubble-outline" size={20} color="#666" />
                        <Text className="ml-2 text-gray-600 flex-1">Nhập bình luận...</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default EventDetail;