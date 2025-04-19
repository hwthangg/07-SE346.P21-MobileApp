import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Modal,
    FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const CreateEvent = () => {
    const router = useRouter();
    const scrollViewRef = useRef<ScrollView>(null);

    // Event fields
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState('');
    const [location, setLocation] = useState('');
    const [time, setTime] = useState('');
    const [requirements, setRequirements] = useState('');
    const [status, setStatus] = useState('Chờ');

    // Dropdown state
    const [modalVisible, setModalVisible] = useState(false);
    const [currentDropdown, setCurrentDropdown] = useState('');
    const [dropdownOptions, setDropdownOptions] = useState<string[]>([]);
    const [dropdownTitle, setDropdownTitle] = useState('');

    const handleDropdownChange = (value: string) => {
        if (currentDropdown === 'status') setStatus(value);
        setModalVisible(false);
    };

    const showDropdown = (type: string, options: string[], title: string) => {
        setCurrentDropdown(type);
        setDropdownOptions(options);
        setDropdownTitle(title);
        setModalVisible(true);
    };

    const handleSubmit = () => {
        const eventData = {
            title,
            description,
            images,
            location,
            time,
            requirements,
            status,
        };
        console.log('Tạo sự kiện:', eventData);
        router.back(); // Navigate back
    };

    const scrollToInput = (y: number) => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y, animated: true });
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            {/* Header */}
            <View className="bg-blue-600 p-4 flex-row items-center">
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-white text-xl font-bold ml-4">Tạo sự kiện</Text>
            </View>

            {/* Form */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                <ScrollView
                    ref={scrollViewRef}
                    className="flex-1"
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ paddingBottom: 40 }}
                >
                    <View className="p-4">
                        <Text className="mb-2 text-gray-700">Tiêu đề</Text>
                        <TextInput
                            className="border border-gray-200 p-3 rounded-lg bg-white mb-4 text-gray-700"
                            placeholder="Nhập tiêu đề sự kiện"
                            value={title}
                            onChangeText={setTitle}
                            onFocus={() => scrollToInput(0)}
                        />

                        <Text className="mb-2 text-gray-700">Mô tả</Text>
                        <TextInput
                            className="border border-gray-200 p-3 rounded-lg bg-white mb-4 text-gray-700"
                            placeholder="Nhập mô tả sự kiện"
                            value={description}
                            onChangeText={setDescription}
                            multiline
                            onFocus={() => scrollToInput(60)}
                        />

                        <Text className="mb-2 text-gray-700">Hình ảnh</Text>
                        <TextInput
                            className="border border-gray-200 p-3 rounded-lg bg-white mb-4 text-gray-700"
                            placeholder="Nhập URL hình ảnh"
                            value={images}
                            onChangeText={setImages}
                            onFocus={() => scrollToInput(120)}
                        />

                        <Text className="mb-2 text-gray-700">Vị trí</Text>
                        <TextInput
                            className="border border-gray-200 p-3 rounded-lg bg-white mb-4 text-gray-700"
                            placeholder="Nhập vị trí sự kiện"
                            value={location}
                            onChangeText={setLocation}
                            onFocus={() => scrollToInput(180)}
                        />

                        <Text className="mb-2 text-gray-700">Thời gian</Text>
                        <TextInput
                            className="border border-gray-200 p-3 rounded-lg bg-white mb-4 text-gray-700"
                            placeholder="Nhập thời gian sự kiện"
                            value={time}
                            onChangeText={setTime}
                            onFocus={() => scrollToInput(240)}
                        />

                        <Text className="mb-2 text-gray-700">Yêu cầu</Text>
                        <TextInput
                            className="border border-gray-200 p-3 rounded-lg bg-white mb-4 text-gray-700"
                            placeholder="Nhập yêu cầu sự kiện"
                            value={requirements}
                            onChangeText={setRequirements}
                            onFocus={() => scrollToInput(300)}
                        />

                        <Text className="mb-2 text-gray-700">Trạng thái</Text>
                        <TouchableOpacity
                            className="border border-gray-200 p-3 rounded-lg bg-white mb-4 flex-row justify-between items-center"
                            onPress={() =>
                                showDropdown('status', ['Đã hoàn thành', 'Đang bắt đầu', 'Chờ', 'Đã xóa'], 'Chọn trạng thái')
                            }
                        >
                            <Text className={status ? 'text-gray-700' : 'text-gray-400'}>
                                {status || 'Chọn trạng thái'}
                            </Text>
                            <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="bg-blue-600 p-4 rounded-lg flex-row justify-center items-center mt-2"
                            onPress={handleSubmit}
                        >
                            <Ionicons name="save" size={24} color="white" />
                            <Text className="text-white font-bold ml-2 text-base">Lưu</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Dropdown Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View
                    className="flex-1 justify-end"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                >
                    <View className="bg-white rounded-t-xl">
                        <View className="p-4 border-b border-gray-200 flex-row justify-between items-center">
                            <Text className="text-lg font-bold text-gray-800">{dropdownTitle}</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Ionicons name="close" size={24} color="#4B5563" />
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            data={dropdownOptions}
                            keyExtractor={(item) => item}
                            style={{ maxHeight: 300 }}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    className="p-6 border-b border-gray-100"
                                    onPress={() => handleDropdownChange(item)}
                                >
                                    <Text className="text-gray-700 text-base">{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default CreateEvent;