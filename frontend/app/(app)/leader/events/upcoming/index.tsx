import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    Image,
    TextInput,
    StatusBar,
    Modal,
    Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

// Define the upcoming event type
type UpcomingEvent = {
    id: string;
    chapterName: string;
    title: string;
    time: string;
    location: string;
    scope: string;
    description: string;
    participants: string;
    requirements: string;
    images: string[];
    likes: number;
    comments: number;
    isLiked: boolean;
    isRegistered: boolean;
};

const UpcomingScreen = () => {
    const router = useRouter();

    // Mock data for upcoming events
    const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([
        {
            id: '1',
            chapterName: 'Chi đoàn Khoa Công Nghệ Thông Tin', title: 'Hội thảo Chuyển đổi Số trong Doanh nghiệp',
            time: '15/06/2025',
            location: 'Hội trường A, Trường Đại học ABC',
            scope: 'Chi đoàn',
            participants: 'Sinh viên năm 3 và năm 4, tối đa 100 người',
            requirements: 'Kiến thức cơ bản về CNTT, laptop cá nhân, tinh thần học hỏi',
            description: 'Hội thảo Chuyển đổi Số trong Doanh nghiệp với sự tham gia của các chuyên gia hàng đầu trong lĩnh vực công nghệ thông tin. Đây sẽ là cơ hội để các bạn sinh viên được trao đổi, học hỏi và nắm bắt xu hướng mới trong thời đại công nghệ.',
            images: [
                'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            ],
            likes: 48,
            comments: 12,
            isLiked: false,
            isRegistered: false,
        },
        {
            id: '2',
            chapterName: 'Chi đoàn Khoa Kinh Tế',
            title: 'Ngày hội việc làm 2025',
            time: '20/05/2025',
            location: 'Nhà thi đấu Trường Đại học ABC',
            scope: 'Cộng đồng',
            description: 'Ngày hội việc làm với sự tham gia của hơn 50 doanh nghiệp lớn nhỏ trong và ngoài nước. Cơ hội việc làm, thực tập dành cho sinh viên các ngành. Tham gia để có cơ hội phỏng vấn trực tiếp và nhận việc ngay tại chỗ.',
            images: [
                'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            ],
            likes: 87,
            comments: 23,
            isLiked: true,
            isRegistered: true,
        }
    ]);

    // Comments state
    const [comments, setComments] = useState<{
        [key: string]: {
            id: number;
            text: string;
            user: string;
            time: string;
            avatar?: string;
            likes?: number;
            isLiked?: boolean;
        }[]
    }>({
        '1': [
            {
                id: 1,
                text: 'Chủ đề rất thú vị, mình sẽ tham gia!',
                user: 'Nguyễn Thanh Tùng',
                time: '2 giờ trước',
                avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
                likes: 5,
                isLiked: false,
            }
        ],
        '2': [
            {
                id: 1,
                text: 'Mong chờ sự kiện này từ lâu rồi!',
                user: 'Lê Hoàng Nam',
                time: '1 giờ trước',
                avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
                likes: 3,
                isLiked: false,
            },
            {
                id: 2,
                text: 'Các bạn nên tham gia, mình thấy năm trước rất bổ ích.',
                user: 'Trần Minh Anh',
                time: '3 giờ trước',
                avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
                likes: 8,
                isLiked: true,
            },
        ]
    });

    // Modal states
    const [commentModalVisible, setCommentModalVisible] = useState(false);
    const [shareModalVisible, setShareModalVisible] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
    const [commentText, setCommentText] = useState('');
    const [searchContact, setSearchContact] = useState('');

    // Mock contacts for sharing
    const contacts = [
        { id: '1', name: 'Nguyễn Văn A', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
        { id: '2', name: 'Trần Thị B', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
        { id: '3', name: 'Lê Hoàng C', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
        { id: '4', name: 'Phạm Minh D', avatar: 'https://randomuser.me/api/portraits/women/46.jpg' },
        { id: '5', name: 'Hoàng Văn E', avatar: 'https://randomuser.me/api/portraits/men/47.jpg' },
    ];

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchContact.toLowerCase())
    );

    // Handle event registration
    const toggleRegistration = (id: string) => {
        setUpcomingEvents(events =>
            events.map(event =>
                event.id === id
                    ? { ...event, isRegistered: !event.isRegistered }
                    : event
            )
        );

        // Find the event
        const event = upcomingEvents.find(e => e.id === id);
        if (event) {
            // Show confirmation based on current registration status
            if (!event.isRegistered) {
                Alert.alert(
                    "Đăng ký thành công",
                    `Bạn đã đăng ký tham gia sự kiện "${event.title}".`,
                    [{ text: "OK" }]
                );
            } else {
                Alert.alert(
                    "Hủy đăng ký",
                    `Bạn đã hủy đăng ký tham gia sự kiện "${event.title}".`,
                    [{ text: "OK" }]
                );
            }
        }
    };

    // Handle like for an event
    const toggleLike = (id: string) => {
        setUpcomingEvents(events =>
            events.map(event =>
                event.id === id
                    ? {
                        ...event,
                        isLiked: !event.isLiked,
                        likes: event.isLiked ? event.likes - 1 : event.likes + 1
                    }
                    : event
            )
        );
    };

    // Handle comment submit
    const handleCommentSubmit = () => {
        if (commentText.trim() && selectedEventId) {
            const newComment = {
                id: Date.now(),
                text: commentText,
                user: 'Bạn',
                time: 'Vừa xong',
                avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
                likes: 0,
                isLiked: false,
            };

            setComments(prevComments => ({
                ...prevComments,
                [selectedEventId]: [newComment, ...(prevComments[selectedEventId] || [])]
            }));

            setCommentText('');

            // Also update the comment count in the event
            setUpcomingEvents(events =>
                events.map(event =>
                    event.id === selectedEventId
                        ? { ...event, comments: event.comments + 1 }
                        : event
                )
            );
        }
    };

    // Handle like for a comment
    const toggleCommentLike = (eventId: string, commentId: number) => {
        if (!comments[eventId]) return;

        setComments(prevComments => ({
            ...prevComments,
            [eventId]: prevComments[eventId].map(comment =>
                comment.id === commentId
                    ? {
                        ...comment,
                        isLiked: !comment.isLiked,
                        likes: comment.isLiked ? (comment.likes || 1) - 1 : (comment.likes || 0) + 1
                    }
                    : comment
            )
        }));
    };

    // Render more/less text component
    type ExpandableTextProps = {
        text: string;
        maxLength?: number;
    };

    const ExpandableText: React.FC<ExpandableTextProps> = ({ text, maxLength = 150 }) => {
        const [isExpanded, setIsExpanded] = useState(false);

        if (text.length <= maxLength) {
            return <Text className="text-gray-900">{text}</Text>;
        }

        return (
            <View>
                <Text className="text-gray-900">
                    {isExpanded ? text : `${text.substring(0, maxLength)}...`}
                </Text>
                <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
                    <Text className="text-blue-600 mt-1">
                        {isExpanded ? 'Thu gọn' : 'Xem thêm'}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    // Render an upcoming event item
    const renderEventItem = ({ item }: { item: UpcomingEvent }) => {
        return (
            <View className="bg-white mb-4 rounded-lg overflow-hidden">
                {/* Post header */}
                <View className="p-4 flex-row items-center justify-between">
                    <View className="flex-row items-center">
                        <View className="h-12 w-12 rounded-full bg-blue-500 items-center justify-center">
                            <Text className="text-white font-bold text-lg">
                                {item.chapterName.charAt(0)}
                            </Text>
                        </View>
                        <View className="ml-3">
                            <Text className="font-bold text-gray-900">{item.chapterName}</Text>
                            <Text className="text-xs text-gray-500">{item.time}</Text>
                        </View>
                    </View>

                    {/* Register button */}
                    <TouchableOpacity
                        className={`px-3 py-1.5 rounded-full ${item.isRegistered ? 'bg-gray-200' : 'bg-blue-600'}`}
                        onPress={() => toggleRegistration(item.id)}
                    >
                        <Text
                            className={`font-medium text-sm ${item.isRegistered ? 'text-gray-700' : 'text-white'}`}
                        >
                            {item.isRegistered ? 'Đã đăng ký' : 'Đăng ký'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Post title */}
                <View className="px-4 mb-2">
                    <Text className="font-bold text-lg text-gray-900">{item.title}</Text>
                </View>

                {/* Post image */}
                <View>
                    <FlatList
                        data={item.images}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item: image }) => (
                            <Image
                                source={{ uri: image }}
                                className="w-screen aspect-video"
                                style={{ resizeMode: 'cover' }}
                            />
                        )}
                        keyExtractor={(_, index) => `image-${index}`}
                    />

                    {/* Image pagination indicator */}
                    {item.images.length > 1 && (
                        <View className="absolute bottom-3 right-3 bg-black/50 px-2 py-1 rounded-full">
                            <Text className="text-white text-xs">
                                1/{item.images.length}
                            </Text>
                        </View>
                    )}
                </View>

                {/* Post actions */}
                <View className="flex-row justify-between px-4 pt-3">
                    <View className="flex-row">
                        <TouchableOpacity
                            className="flex-row items-center mr-4"
                            onPress={() => toggleLike(item.id)}
                        >
                            <Ionicons
                                name={item.isLiked ? "heart" : "heart-outline"}
                                size={24}
                                color={item.isLiked ? "#ef4444" : "#666"}
                            />
                            <Text className="ml-1 text-gray-600">{item.likes}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="flex-row items-center"
                            onPress={() => {
                                setSelectedEventId(item.id);
                                setCommentModalVisible(true);
                            }}
                        >
                            <Ionicons name="chatbubble-outline" size={22} color="#666" />
                            <Text className="ml-1 text-gray-600">{item.comments}</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        className="flex-row items-center"
                        onPress={() => {
                            setSelectedEventId(item.id);
                            setShareModalVisible(true);
                        }}
                    >
                        <Ionicons name="share-social-outline" size={22} color="#666" />
                    </TouchableOpacity>
                </View>                {/* Post content */}
                <View className="p-4">                    {/* Time, Location, Scope, Participants and Requirements */}
                    <View className="mt-1 mb-3">
                        <View className="flex-row items-center mb-2">
                            <Ionicons name="time-outline" size={16} color="#666" />
                            <Text className="ml-1 text-gray-500 text-xs">{item.time}</Text>
                        </View>

                        <View className="flex-row items-center mb-2">
                            <Ionicons name="location-outline" size={16} color="#666" />
                            <Text className="ml-1 text-gray-500 text-xs">{item.location}</Text>
                        </View>

                        <View className="flex-row items-center mb-2">
                            <Ionicons name="people-outline" size={16} color="#666" />
                            <Text className="ml-1 text-gray-500 text-xs">{item.scope}</Text>
                        </View>

                        <View className="flex-row items-center mb-2">
                            <Ionicons name="people-circle-outline" size={16} color="#666" />
                            <Text className="ml-1 text-gray-500 text-xs">{item.participants}</Text>
                        </View>

                        <View className="flex-row items-center mb-3">
                            <Ionicons name="list-outline" size={16} color="#666" />
                            <Text className="ml-1 text-gray-500 text-xs">{item.requirements}</Text>
                        </View>
                    </View>

                    {/* Description */}                    <View className="bg-gray-50 rounded-lg p-3">
                        <View className="flex-row items-center mb-2">
                            <Ionicons
                                name="information-circle-outline"
                                size={16}
                                color="#666"
                            />
                            <Text className="text-sm font-medium ml-2 text-gray-600">
                                Mô tả
                            </Text>
                        </View>
                        <ExpandableText text={item.description} />
                    </View>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-100">
            <StatusBar barStyle="light-content" />
            {/* Header */}
            <View className="bg-blue-600 p-4">
                <View className="flex-row items-center justify-between">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Text className="text-white text-xl font-bold">
                        Sự kiện sắp diễn ra
                    </Text>
                    <TouchableOpacity>
                        <Ionicons name="search-outline" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Event list */}
            <FlatList
                data={upcomingEvents}
                keyExtractor={(item) => item.id}
                renderItem={renderEventItem}
                contentContainerStyle={{ padding: 10, paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            />

            {/* Comment Modal */}
            <Modal
                visible={commentModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setCommentModalVisible(false)}
            >
                <View className="flex-1 bg-black/50">
                    <View className="flex-1 mt-20 bg-white rounded-t-2xl">
                        <View className="p-4 border-b border-gray-200 flex-row justify-between items-center">
                            <Text className="text-xl font-bold">Bình luận</Text>
                            <TouchableOpacity onPress={() => setCommentModalVisible(false)}>
                                <Ionicons name="close-outline" size={24} color="#000" />
                            </TouchableOpacity>
                        </View>

                        {/* Comment list */}
                        <FlatList
                            data={selectedEventId ? comments[selectedEventId] || [] : []}
                            keyExtractor={(item) => item.id.toString()}
                            contentContainerStyle={{ padding: 16 }}
                            renderItem={({ item }) => (
                                <View className="flex-row mb-4">
                                    <Image
                                        source={{ uri: item.avatar || 'https://randomuser.me/api/portraits/lego/1.jpg' }}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <View className="ml-3 flex-1">
                                        <View className="bg-gray-100 p-3 rounded-2xl">
                                            <Text className="font-bold text-gray-900">{item.user}</Text>
                                            <Text className="text-gray-900">{item.text}</Text>
                                        </View>
                                        <View className="flex-row mt-1 items-center">
                                            <Text className="text-gray-500 text-xs">{item.time}</Text>
                                            <TouchableOpacity
                                                className="ml-4 flex-row items-center"
                                                onPress={() => selectedEventId && toggleCommentLike(selectedEventId, item.id)}
                                            >
                                                <Text className="text-gray-500 text-xs mr-1">Thích</Text>
                                                {item.isLiked && <Ionicons name="heart" size={12} color="#ef4444" />}
                                            </TouchableOpacity>
                                            {(item.likes || 0) > 0 && (
                                                <View className="ml-2 flex-row items-center">
                                                    <Ionicons name="heart" size={12} color="#ef4444" />
                                                    <Text className="text-gray-500 text-xs ml-1">{item.likes}</Text>
                                                </View>
                                            )}
                                        </View>
                                    </View>
                                </View>
                            )}
                        />

                        {/* Comment input */}
                        <View className="p-3 border-t border-gray-200 flex-row items-center">
                            <TextInput
                                className="flex-1 border border-gray-300 rounded-full px-4 py-2 mr-2"
                                placeholder="Viết bình luận..."
                                value={commentText}
                                onChangeText={setCommentText}
                            />
                            <TouchableOpacity
                                className={`rounded-full p-2 ${commentText.trim() ? 'bg-blue-600' : 'bg-gray-300'}`}
                                onPress={handleCommentSubmit}
                                disabled={!commentText.trim()}
                            >
                                <Ionicons
                                    name="send"
                                    size={20}
                                    color={commentText.trim() ? 'white' : '#999'}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Share Modal */}
            <Modal
                visible={shareModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShareModalVisible(false)}
            >
                <View className="flex-1 bg-black/50">
                    <View className="flex-1 mt-20 bg-white rounded-t-2xl">
                        <View className="p-4 border-b border-gray-200 flex-row justify-between items-center">
                            <Text className="text-xl font-bold">Chia sẻ</Text>
                            <TouchableOpacity onPress={() => setShareModalVisible(false)}>
                                <Ionicons name="close-outline" size={24} color="#000" />
                            </TouchableOpacity>
                        </View>

                        {/* Search contacts */}
                        <View className="px-4 py-3">
                            <TextInput
                                className="bg-gray-100 p-2 rounded-lg"
                                placeholder="Tìm kiếm người dùng..."
                                value={searchContact}
                                onChangeText={setSearchContact}
                            />
                        </View>

                        {/* Contacts list */}
                        <FlatList
                            data={filteredContacts}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={{ padding: 16 }}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    className="flex-row items-center py-2"
                                    onPress={() => {
                                        // Share action would go here
                                        setShareModalVisible(false);
                                    }}
                                >
                                    <Image
                                        source={{ uri: item.avatar }}
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <Text className="ml-3 font-medium text-gray-900">{item.name}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default UpcomingScreen;
