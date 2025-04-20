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
    Image,
    StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateTimePickerField = ({
    label,
    dateValue,
    onDateChange,
}: {
    label: string;
    dateValue: Date;
    onDateChange: (event: any, selectedDate?: Date) => void;
}) => {
    const [showPicker, setShowPicker] = useState(false);

    const handlePress = () => setShowPicker(true);

    const handleDateChangeInternal = (event: any, selectedDate?: Date) => {
        if (event.type === 'dismissed') {
            setShowPicker(false); // Close picker only when dismissed explicitly
        } else {
            onDateChange(event, selectedDate);
        }
    };

    return (
        <View className="mb-4">
            <View className="flex-row items-center mb-2">
                <Ionicons name="calendar-outline" size={20} color="#000" />
                <Text className="text-lg font-bold ml-2 text-gray-900">{label}</Text>
            </View>
            <TouchableOpacity
                className="border border-gray-300 p-3 rounded-lg bg-white flex-row justify-between items-center"
                onPress={handlePress}
            >
                <Text className="text-gray-900">
                    {`${dateValue.getFullYear()}-${(dateValue.getMonth() + 1)
                        .toString()
                        .padStart(2, '0')}-${dateValue.getDate().toString().padStart(2, '0')} ${dateValue
                            .getHours()
                            .toString()
                            .padStart(2, '0')}:${dateValue.getMinutes().toString().padStart(2, '0')}`}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#000" />
            </TouchableOpacity>
            {showPicker && (
                <DateTimePicker
                    value={dateValue}
                    mode="datetime"
                    display="default"
                    onChange={handleDateChangeInternal}
                />
            )}
        </View>
    );
};

const CreateEvent = () => {
    const router = useRouter();
    const scrollViewRef = useRef<ScrollView>(null);

    // Event fields
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUri, setImageUri] = useState('');
    const [location, setLocation] = useState('');
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [requirements, setRequirements] = useState('');
    const [status, setStatus] = useState('Chờ');

    // Dropdown state
    const [modalVisible, setModalVisible] = useState(false);
    const [currentDropdown, setCurrentDropdown] = useState('');
    const [dropdownOptions, setDropdownOptions] = useState<string[]>([]);
    const [dropdownTitle, setDropdownTitle] = useState('');

    // Map state
    const [mapModalVisible, setMapModalVisible] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<{ latitude: number; longitude: number } | null>(null);

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

    const handleImagePick = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const handleMapSelect = (event: any) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setSelectedLocation({ latitude, longitude });
        setLocation(`Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`);
        setMapModalVisible(false);
    };

    const handleDateChange = (type: 'start' | 'end', event: any, selectedDate?: Date) => {
        if (selectedDate) {
            if (type === 'start') {
                setStartTime(selectedDate);
            } else {
                setEndTime(selectedDate);
            }
        }
    };

    const handleSubmit = () => {
        const eventData = {
            title,
            description,
            imageUri,
            location,
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
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
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar barStyle="light-content" />

            {/* Header - Phong cách đoàn khoa đồng bộ với detail */}
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
                            Tạo sự kiện mới
                        </Text>
                        <Text className="text-white text-xs text-center">
                            Đoàn Thanh niên - Hội Sinh viên
                        </Text>
                    </View>

                    <View style={{ width: 30 }} />
                </View>
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
                        {/* Tiêu đề - Định dạng theo kiểu detail */}
                        <View className="mb-4">
                            <View className="flex-row items-center mb-2">
                                <Ionicons name="document-text-outline" size={20} color="#000" />
                                <Text className="text-lg font-bold ml-2 text-gray-900">Tiêu đề</Text>
                            </View>
                            <TextInput
                                className="border border-gray-300 p-3 rounded-lg bg-white text-gray-900"
                                placeholder="Nhập tiêu đề sự kiện"
                                placeholderTextColor="#666"
                                value={title}
                                onChangeText={setTitle}
                                onFocus={() => scrollToInput(0)}
                            />
                        </View>

                        {/* Mô tả - Định dạng theo kiểu detail */}
                        <View className="mb-4">
                            <View className="flex-row items-center mb-2">
                                <Ionicons name="information-circle-outline" size={20} color="#000" />
                                <Text className="text-lg font-bold ml-2 text-gray-900">Mô tả</Text>
                            </View>
                            <TextInput
                                className="border border-gray-300 p-3 rounded-lg bg-white text-gray-900"
                                placeholder="Nhập mô tả sự kiện"
                                placeholderTextColor="#666"
                                value={description}
                                onChangeText={setDescription}
                                multiline
                                numberOfLines={4}
                                style={{ textAlignVertical: 'top', minHeight: 100 }}
                                onFocus={() => scrollToInput(60)}
                            />
                        </View>

                        {/* Hình ảnh - Định dạng theo kiểu detail */}
                        <View className="mb-4">
                            <View className="flex-row items-center mb-2">
                                <Ionicons name="image-outline" size={20} color="#000" />
                                <Text className="text-lg font-bold ml-2 text-gray-900">Hình ảnh</Text>
                            </View>
                            <TouchableOpacity
                                className="border border-gray-300 p-3 rounded-lg bg-white flex-row justify-between items-center"
                                onPress={handleImagePick}
                            >
                                <Text className="text-gray-900">
                                    {imageUri ? 'Đã chọn hình ảnh' : 'Chọn hình ảnh từ thư viện'}
                                </Text>
                                <Ionicons name="cloud-upload-outline" size={20} color="#000" />
                            </TouchableOpacity>
                            {imageUri ? (
                                <Image source={{ uri: imageUri }} className="w-full h-40 rounded-lg mt-2" />
                            ) : null}
                        </View>

                        {/* Vị trí - Định dạng theo kiểu detail */}
                        <View className="mb-4">
                            <View className="flex-row items-center mb-2">
                                <Ionicons name="location-outline" size={20} color="#000" />
                                <Text className="text-lg font-bold ml-2 text-gray-900">Địa điểm</Text>
                            </View>
                            <TouchableOpacity
                                className="border border-gray-300 bg-white p-3 rounded-lg flex-row justify-between items-center"
                                onPress={() => setMapModalVisible(true)}
                            >
                                <Text className="text-gray-900">
                                    {location || 'Chọn vị trí từ bản đồ'}
                                </Text>
                                <Ionicons name="map" size={20} color="#000" />
                            </TouchableOpacity>
                        </View>

                        {/* Thời gian bắt đầu - sử dụng component đã điều chỉnh */}
                        <DateTimePickerField
                            label="Thời gian bắt đầu"
                            dateValue={startTime}
                            onDateChange={(event, date) => handleDateChange('start', event, date)}
                        />

                        {/* Thời gian kết thúc - sử dụng component đã điều chỉnh */}
                        <DateTimePickerField
                            label="Thời gian kết thúc"
                            dateValue={endTime}
                            onDateChange={(event, date) => handleDateChange('end', event, date)}
                        />

                        {/* Yêu cầu - Định dạng theo kiểu detail */}
                        <View className="mb-4">
                            <View className="flex-row items-center mb-2">
                                <Ionicons name="list-outline" size={20} color="#000" />
                                <Text className="text-lg font-bold ml-2 text-gray-900">Yêu cầu</Text>
                            </View>
                            <TextInput
                                className="border border-gray-300 p-3 rounded-lg bg-white text-gray-900"
                                placeholder="Nhập yêu cầu sự kiện"
                                placeholderTextColor="#666"
                                value={requirements}
                                onChangeText={setRequirements}
                                multiline
                                numberOfLines={3}
                                style={{ textAlignVertical: 'top', minHeight: 80 }}
                                onFocus={() => scrollToInput(300)}
                            />
                        </View>

                        {/* Trạng thái - Định dạng theo kiểu detail */}
                        <View className="mb-6">
                            <View className="flex-row items-center mb-2">
                                <Ionicons name="checkmark-circle-outline" size={20} color="#000" />
                                <Text className="text-lg font-bold ml-2 text-gray-900">Trạng thái</Text>
                            </View>
                            <TouchableOpacity
                                className="border border-gray-300 p-3 rounded-lg bg-white flex-row justify-between items-center"
                                onPress={() =>
                                    showDropdown('status', ['Đã hoàn thành', 'Đang bắt đầu', 'Chờ', 'Đã xóa'], 'Chọn trạng thái')
                                }
                            >
                                <Text className="text-gray-900">
                                    {status || 'Chọn trạng thái'}
                                </Text>
                                <Ionicons name="chevron-down" size={20} color="#000" />
                            </TouchableOpacity>
                        </View>

                        {/* Nút lưu - Cải thiện giao diện */}
                        <TouchableOpacity
                            className="bg-blue-600 p-4 rounded-lg flex-row justify-center items-center mt-4"
                            onPress={handleSubmit}
                        >
                            <Ionicons name="save" size={22} color="white" />
                            <Text className="text-white font-bold ml-2 text-base">Lưu sự kiện</Text>
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
                            <Text className="text-lg font-bold text-gray-900">{dropdownTitle}</Text>
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
                                    <Text className="text-gray-900 text-base">{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>

            {/* Map Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={mapModalVisible}
                onRequestClose={() => setMapModalVisible(false)}
            >
                <View className="flex-1">
                    <MapView
                        style={{ flex: 1 }}
                        initialRegion={{
                            latitude: 10.8231,
                            longitude: 106.6297,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05,
                        }}
                        onPress={handleMapSelect}
                    >
                        {selectedLocation && (
                            <Marker
                                coordinate={{
                                    latitude: selectedLocation.latitude,
                                    longitude: selectedLocation.longitude,
                                }}
                            />
                        )}
                    </MapView>
                    <TouchableOpacity
                        className="absolute top-4 left-4 bg-white p-3 rounded-full"
                        onPress={() => setMapModalVisible(false)}
                    >
                        <Ionicons name="close" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default CreateEvent;