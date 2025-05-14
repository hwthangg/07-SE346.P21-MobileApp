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
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

// Define the event post type
type EventPost = {
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
    _flatListRef?: any; // Reference to the image FlatList
};

const PostScreen = () => {
    const router = useRouter();    // Mock data for completed events
    const [completedEvents, setCompletedEvents] = useState<EventPost[]>([
        {
            id: '1',
            chapterName: 'Chi đoàn Khoa Công Nghệ Thông Tin', title: 'Chiến dịch thanh niên tình nguyện Mùa hè xanh 2024',
            time: '15/07/2024 - 30/07/2024',
            location: 'Xã Tân Phú, Huyện Tân Châu, Tỉnh Tây Ninh',
            scope: 'Chi đoàn',
            participants: 'Đoàn viên Chi đoàn Khoa Công Nghệ Thông Tin, 40 sinh viên',
            requirements: 'Sức khỏe tốt, tinh thần tích cực, kỹ năng làm việc nhóm',
            description: 'Chiến dịch tình nguyện Mùa hè xanh là hoạt động thường niên của Đoàn Thanh niên nhằm phát huy vai trò xung kích, tình nguyện của đoàn viên trong việc tham gia phát triển kinh tế - xã hội, giải quyết các vấn đề an sinh xã hội. Qua đó đã xây dựng 5 căn nhà tình thương, trao tặng 200 suất quà cho các hộ khó khăn, khám chữa bệnh miễn phí cho hơn 500 người dân.',
            images: [
                'https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-6/482032651_1033663062119428_6517174517474946357_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeFPhsXdnpGPjmfQl6jcU7yl08fFuiDzQWfTx8W6IPNBZ2T4ayFuGDnWTaIU7G5stZV-wIHhwfVDzv03XWfjaAZF&_nc_ohc=van9DFnBhV8Q7kNvwHMZvgG&_nc_oc=Admu_TjshsCV4ssl-8ZBvDbT3zWyhUXFxNRL20iMoZIiL0yiMfH1Ziz1GRLZ8tVuunc&_nc_zt=23&_nc_ht=scontent.fsgn5-14.fna&_nc_gid=TA6OGt60AH9Fxa3B7ZqNEQ&oh=00_AfKuqElFyG6TNaB3u1QmKjedLTZ48r08xoCEob3-fTqAbg&oe=6829F4A8',
                'https://images.unsplash.com/photo-1593113630400-ea4288922497?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'https://images.unsplash.com/photo-1560252829-804f1aedf1be?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            ],
            likes: 125,
            comments: 42,
            isLiked: false,
        },
        {
            id: '2',
            chapterName: 'Chi đoàn Khoa Quản Trị Kinh Doanh', title: 'Hội trại Kỷ niệm Ngày thành lập Đoàn TNCS Hồ Chí Minh',
            time: '26/03/2024',
            location: 'Sân vận động Trường Đại học ABC',
            scope: 'Cộng đồng',
            participants: 'Đoàn viên các Chi đoàn Khoa, 200 sinh viên tham gia',
            requirements: 'Tinh thần đồng đội, kỹ năng dựng trại, khả năng tổ chức hoạt động tập thể',
            description: 'Hội trại Kỷ niệm 93 năm Ngày thành lập Đoàn TNCS Hồ Chí Minh 26/3 được tổ chức với nhiều hoạt động ý nghĩa như duyệt đội nghi thức, thi trại đẹp, văn nghệ, trò chơi dân gian và các hoạt động gắn kết tập thể.',
            images: [
                'https://images.unsplash.com/photo-1527525443983-6e60c75fff46?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            ],
            likes: 87,
            comments: 23,
            isLiked: true,
        },
        {
            id: '3',
            chapterName: 'Chi đoàn Khoa Môi trường',
            title: 'Chiến dịch Làm sạch bờ biển 2024',
            time: '05/04/2024 - 07/04/2024',
            location: 'Bãi biển Vũng Tàu, Tỉnh Bà Rịa - Vũng Tàu',
            scope: 'Liên Chi đoàn',
            participants: 'Đoàn viên các Chi đoàn, 120 sinh viên tham gia',
            requirements: 'Sức khỏe tốt, trang bị đồ bảo hộ cá nhân, kỹ năng bơi cơ bản',
            description: 'Chiến dịch "Làm sạch bờ biển" là hoạt động bảo vệ môi trường được tổ chức thường niên nhằm nâng cao ý thức bảo vệ môi trường biển cho cộng đồng. Qua đó đã thu gom được hơn 2 tấn rác thải nhựa, tổ chức các buổi tuyên truyền cho người dân và du khách về tác hại của rác thải nhựa đối với môi trường biển.',
            images: [
                'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'https://images.unsplash.com/photo-1626328409968-b11d5d977439?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'https://images.unsplash.com/photo-1621451651659-e6736b4c7eba?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'https://images.unsplash.com/photo-1590931499803-bd75f72845c1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            ],
            likes: 156,
            comments: 37,
            isLiked: false,
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
                text: 'Hoạt động rất ý nghĩa, mình đã học hỏi được rất nhiều điều!',
                user: 'Nguyễn Thanh Tùng',
                time: '2 giờ trước',
                avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
                likes: 5,
                isLiked: false,
            },
            {
                id: 2,
                text: 'Mong có thêm nhiều hoạt động như thế này.',
                user: 'Trần Minh Anh',
                time: '5 giờ trước',
                avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
                likes: 12,
                isLiked: true,
            },
        ],
        '2': [
            {
                id: 1,
                text: 'Hoạt động thật tuyệt vời, mong được tham gia lần sau!',
                user: 'Lê Hoàng Nam',
                time: '1 giờ trước',
                avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
                likes: 3,
                isLiked: false,
            },
        ]
    });    // Modal states
    const [commentModalVisible, setCommentModalVisible] = useState(false);
    const [shareModalVisible, setShareModalVisible] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
    const [commentText, setCommentText] = useState('');
    const [searchContact, setSearchContact] = useState('');

    // Image carousel states
    const [activeImageIndex, setActiveImageIndex] = useState<{ [eventId: string]: number }>({});

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

    // Handle like for an event
    const toggleLike = (id: string) => {
        setCompletedEvents(events =>
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
            setCompletedEvents(events =>
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

    // Render an event post
    const renderEventPost = ({ item }: { item: EventPost }) => {
        return (
            <View className="bg-white mb-4 rounded-lg overflow-hidden">
                {/* Post header */}
                <View className="p-4 flex-row items-center">
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

                {/* Post title */}
                <View className="px-4 mb-2">
                    <Text className="font-bold text-lg text-gray-900">{item.title}</Text>
                </View>                {/* Post image - Instagram style */}                <View className="relative">
                    {/* Main image display */}                    <FlatList
                        data={item.images}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        snapToInterval={undefined} // Giúp snap chính xác vào từng ảnh
                        snapToAlignment="center"
                        decelerationRate="fast" // Giúp dừng mượt mà hơn khi vuốt
                        onScroll={(e) => {
                            const contentOffset = e.nativeEvent.contentOffset;
                            const viewWidth = e.nativeEvent.layoutMeasurement.width;
                            const currentIndex = Math.floor(contentOffset.x / viewWidth);

                            // Update active image index for this post
                            setActiveImageIndex(prev => ({
                                ...prev,
                                [item.id]: currentIndex
                            }));
                        }}
                        scrollEventThrottle={16}
                        renderItem={({ item: image }) => (
                            <Image
                                source={{ uri: image }}
                                className="w-screen aspect-square"
                                style={{ resizeMode: 'cover' }}
                            />
                        )}
                        keyExtractor={(_, index) => `image-${index}`}
                    />

                    {/* Instagram-style dots pagination */}
                    {item.images.length > 1 && (
                        <View className="absolute bottom-4 left-0 right-0 flex-row justify-center">
                            {item.images.map((_, index) => {
                                const isActive = (activeImageIndex[item.id] || 0) === index;
                                return (
                                    <View
                                        key={index}
                                        className={`h-2 rounded-full mx-1 ${isActive ? 'w-4 bg-blue-500' : 'w-2 bg-white opacity-70'
                                            }`}
                                    />
                                );
                            })}
                        </View>
                    )}
                    {/* Image number indicator */}
                    {item.images.length > 1 && (
                        <View className="absolute top-4 right-4 bg-black/50 px-2 py-1 rounded-full">
                            <Text className="text-white text-xs font-medium">
                                {(activeImageIndex[item.id] || 0) + 1}/{item.images.length}
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
                <View className="p-4">                    {/* Time, Location and Scope - Vertical Layout */}                    {/* Time, Location, Scope, Participants and Requirements */}                    <View className="mt-1 mb-3">
                    <View className="flex-row items-center mb-2">
                        <Ionicons name="time-outline" size={16} color="#666" />
                        <Text className="ml-1 text-gray-500 text-sm">{item.time}</Text>
                    </View>

                    <View className="flex-row items-center mb-2">
                        <Ionicons name="location-outline" size={16} color="#666" />
                        <Text className="ml-1 text-gray-500 text-sm">{item.location}</Text>
                    </View>

                    <View className="flex-row items-center mb-2">
                        <Ionicons name="people-outline" size={16} color="#666" />
                        <Text className="ml-1 text-gray-500 text-sm">{item.scope}</Text>
                    </View>

                    <View className="flex-row items-center mb-2">
                        <Ionicons name="people-circle-outline" size={16} color="#666" />
                        <Text className="ml-1 text-gray-500 text-sm">{item.participants}</Text>
                    </View>

                    <View className="flex-row items-center mb-3">
                        <Ionicons name="list-outline" size={16} color="#666" />
                        <Text className="ml-1 text-gray-500 text-sm">{item.requirements}</Text>
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
                        Bài đăng sự kiện
                    </Text>
                    <TouchableOpacity>
                        <Ionicons name="search-outline" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Event posts */}
            <FlatList
                data={completedEvents}
                keyExtractor={(item) => item.id}
                renderItem={renderEventPost}
                contentContainerStyle={{ paddingBottom: 20 }}
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

export default PostScreen;
