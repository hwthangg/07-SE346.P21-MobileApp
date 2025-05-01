import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Image,
    TextInput,
    StatusBar,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

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
        image: 'https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/482032651_1033663062119428_6517174517474946357_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=MLPXFPC_ffwQ7kNvwEfSsuc&_nc_oc=AdlBlU7NTP7Bko76xxpJGDl8oSSQfjFfDQuyG9eHj_dn7gWyVe4Uknx-1V4Gz_UKmGY&_nc_zt=23&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=goRjnKSyl0ewsJerVIwpyA&oh=00_AfGglQZB6o2VKvEdEIhkSECOwj_l_WNLi5gpm3K7hIyxuA&oe=680A88E8',
    };

    const [likes, setLikes] = useState(event.likes);
    const [liked, setLiked] = useState(false);
    const [comment, setComment] = useState('');
    const [allComments, setAllComments] = useState<
        { id: number; text: string; user: string; time: string; avatar?: string; likes?: number; isLiked?: boolean }[]
    >([
        {
            id: 1,
            text: 'Rất mong được tham gia sự kiện này cùng mọi người!',
            user: 'Nguyễn Thanh Tùng',
            time: '2 giờ trước',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            likes: 5,
            isLiked: false,
        },
        {
            id: 2,
            text: 'Lần trước mình đã tham gia và có nhiều trải nghiệm rất tuyệt vời. Các bạn nên tham gia nhé!',
            user: 'Trần Minh Anh',
            time: '5 giờ trước',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            likes: 12,
            isLiked: true,
        },
    ]);

    const toggleLike = () => {
        setLiked(!liked);
        setLikes(liked ? likes - 1 : likes + 1);
    };

    const toggleCommentLike = (commentId: number) => {
        setAllComments(
            allComments.map(item =>
                item.id === commentId
                    ? { ...item, isLiked: !item.isLiked, likes: item.isLiked ? (item.likes || 1) - 1 : (item.likes || 0) + 1 }
                    : item
            )
        );
    };

    const submitComment = () => {
        if (comment.trim()) {
            setAllComments([
                {
                    id: Date.now(),
                    text: comment,
                    user: 'Bạn',
                    time: 'Vừa xong',
                    avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
                    likes: 0,
                    isLiked: false,
                },
                ...allComments,
            ]);
            setComment('');
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar barStyle="light-content" />
            {/* Header - Phong cách đoàn khoa với màu sắc rõ ràng */}
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
                            Thông tin sự kiện
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
                    <Image
                        source={{ uri: event.image }}
                        className="w-full h-72"
                        style={{ resizeMode: 'cover' }}
                    />
                    <View className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                    {/* Status - đã dời xuống góc dưới phải */}
                    <View className="absolute bottom-4 right-4 bg-red-500 px-3 py-1 rounded-full">
                        <Text className="text-white font-medium text-sm">
                            {event.status}
                        </Text>
                    </View>
                </View>

                {/* Title - đã tách ra khỏi ảnh và để ở dưới */}
                <View className="px-4 pt-4">
                    <Text className="text-gray-900 text-2xl font-bold">
                        {event.title}
                    </Text>

                    {/* Ngày tạo/cập nhật - đã đơn giản hóa */}
                    <View className="flex-row mt-1 mb-3">
                        <Text className="text-gray-500 text-xs">
                            Tạo ngày {event.createdAt} • Cập nhật {event.updatedAt}
                        </Text>
                    </View>
                </View>

                {/* Event Details */}
                <View className="px-4">
                    {/* Location - Đã gộp phần địa chỉ theo format giống phần thời gian */}
                    <View className="bg-white rounded-lg p-4 mb-4 border border-gray-300">
                        <View className="flex-row items-center">
                            <View className="h-10 w-10 rounded-full bg-green-100 items-center justify-center">
                                <Ionicons
                                    name="location-outline"
                                    size={20}
                                    color="#10b981"
                                />
                            </View>
                            <View className="ml-3">
                                <Text className="text-sm text-green-600 font-semibold">
                                    ĐỊA ĐIỂM
                                </Text>
                                <Text className="text-gray-900">
                                    {event.location}
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Time */}
                    <View className="bg-white rounded-lg p-4 mb-4 border border-gray-300">
                        <View className="flex-row items-center">
                            <View className="h-10 w-10 rounded-full bg-blue-100 items-center justify-center">
                                <Ionicons
                                    name="time-outline"
                                    size={20}
                                    color="#3b82f6"
                                />
                            </View>
                            <View className="ml-3">
                                <Text className="text-sm text-blue-600 font-semibold">
                                    THỜI GIAN
                                </Text>
                                <Text className="text-gray-900">
                                    {event.time}
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Description */}
                    <View className="bg-white rounded-lg p-4 mb-4 border border-gray-300">
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

                    {/* Participants */}
                    <View className="bg-white rounded-lg p-4 mb-4 border border-gray-300">
                        <View className="flex-row items-center mb-3">
                            <Ionicons
                                name="people-outline"
                                size={20}
                                color="#3b82f6"
                            />
                            <Text className="text-lg font-bold ml-2 text-blue-600">
                                Người tham gia
                            </Text>
                        </View>
                        <Text className="text-gray-900">{event.participants}</Text>
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
                        <Text className="text-gray-900">{event.requirements}</Text>
                    </View>

                    {/* Social Interaction Bar - Kiểu Facebook - đã bỏ nút chia sẻ */}
                    <View className="bg-white rounded-lg p-4 mb-4 border border-gray-300">
                        <View className="flex-row justify-between items-center mb-2">
                            {likes > 0 && (
                                <View className="flex-row items-center">
                                    <FontAwesome5 name="thumbs-up" size={14} color="#1877f2" solid />
                                    <Text className="text-gray-700 ml-2 text-sm">
                                        {likes}
                                    </Text>
                                </View>
                            )}
                            {event.comments > 0 && (
                                <Text className="text-gray-700 text-sm ml-auto">
                                    {event.comments} bình luận
                                </Text>
                            )}
                        </View>

                        <View className="h-px bg-gray-300 w-full my-1" />

                        <View className="flex-row justify-around mt-1">
                            <TouchableOpacity
                                className="flex-1 flex-row items-center justify-center py-2"
                                onPress={toggleLike}
                                activeOpacity={0.7}
                            >
                                <FontAwesome5
                                    name="thumbs-up"
                                    size={18}
                                    color={liked ? "#1877f2" : "#65676b"}
                                    solid={liked}
                                />
                                <Text className={`ml-2 ${liked ? "text-blue-600" : "text-gray-700"}`}>
                                    Thích
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                className="flex-1 flex-row items-center justify-center py-2"
                                activeOpacity={0.7}
                            >
                                <Ionicons name="chatbubble-outline" size={18} color="#65676b" />
                                <Text className="ml-2 text-gray-700">
                                    Bình luận
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Comment Section - Đã đơn giản hóa và đưa xuống dưới cùng */}
                    <View className="bg-white rounded-lg p-4 mb-8 border border-gray-300">
                        {/* Phần tiêu đề bình luận đơn giản, bỏ icon */}
                        <Text className="text-base font-medium text-gray-900 mb-4">
                            Bình luận ({allComments.length})
                        </Text>

                        {/* Input */}
                        <View className="flex-row mb-6">
                            <Image
                                source={{ uri: 'https://randomuser.me/api/portraits/men/85.jpg' }}
                                className="h-10 w-10 rounded-full mr-3"
                            />
                            <View className="flex-1 border border-gray-300 rounded-full bg-gray-50 flex-row items-center pr-2">
                                <TextInput
                                    placeholder="Viết bình luận..."
                                    className="flex-1 text-gray-900 px-4 py-2"
                                    value={comment}
                                    onChangeText={setComment}
                                    multiline
                                />

                                <TouchableOpacity
                                    className={`h-8 w-8 rounded-full items-center justify-center mx-1 ${!comment.trim() ? 'opacity-50' : 'bg-blue-500'}`}
                                    onPress={submitComment}
                                    disabled={!comment.trim()}
                                >
                                    <Ionicons name="send" size={16} color={comment.trim() ? "white" : "#666"} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Comment List */}
                        {allComments.map((item) => (
                            <View key={item.id} className="mb-5">
                                <View className="flex-row">
                                    <Image
                                        source={{ uri: item.avatar || 'https://randomuser.me/api/portraits/lego/1.jpg' }}
                                        className="h-10 w-10 rounded-full mr-3"
                                    />
                                    <View className="flex-1">
                                        <View className="bg-gray-100 rounded-lg px-4 py-3">
                                            <Text className="text-sm font-bold text-gray-900">
                                                {item.user}
                                            </Text>
                                            <Text className="text-gray-900 mt-1">
                                                {item.text}
                                            </Text>
                                        </View>

                                        <View className="flex-row items-center mt-1.5 ml-1">
                                            <TouchableOpacity
                                                className="mr-4 flex-row items-center"
                                                onPress={() => toggleCommentLike(item.id)}
                                            >
                                                <Text className={`text-xs font-medium ${item.isLiked ? 'text-blue-600' : 'text-gray-700'}`}>
                                                    Thích
                                                </Text>
                                                {(item.likes ?? 0) > 0 && (
                                                    <Text className="text-xs text-gray-700 ml-1">
                                                        · {item.likes}
                                                    </Text>
                                                )}
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <Text className="text-xs font-medium text-gray-700 mr-4">
                                                    Phản hồi
                                                </Text>
                                            </TouchableOpacity>
                                            <Text className="text-xs text-gray-500">
                                                {item.time}
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                {/* Reply preview (mocked) */}
                                {item.id === 2 && (
                                    <View className="flex-row mt-2 ml-12">
                                        <TouchableOpacity>
                                            <Text className="text-blue-600 text-xs">
                                                Xem 2 phản hồi trước đó...
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                        ))}

                        {/* Show more comments button */}
                        {allComments.length > 0 && (
                            <TouchableOpacity className="mt-2 self-center">
                                <Text className="text-blue-600 font-medium text-sm">
                                    Xem thêm bình luận
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default EventDetail;
