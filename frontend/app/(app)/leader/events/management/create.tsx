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

        console.log('Created event:', eventData);
        // Here you would normally send this data to your API

        // Navigate back to the events list
        router.back();
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-100">
            <StatusBar barStyle="light-content" />
            {/* Header */}
            <View className="bg-blue-600 p-4 flex-row items-center justify-between">
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-white text-xl font-bold">Tạo sự kiện mới</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* Event form */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView
                    className="flex-1 p-4"
                    showsVerticalScrollIndicator={false}
                    ref={scrollViewRef}
                >
                    {/* Title */}
                    <View className="mb-4">
                        <View className="flex-row items-center mb-2">
                            <Ionicons name="document-text-outline" size={20} color="#000" />
                            <Text className="text-lg font-bold ml-2 text-gray-900">Tiêu đề</Text>
                        </View>
                        <TextInput
                            className="border border-gray-300 p-3 rounded-lg bg-white"
                            placeholder="Nhập tiêu đề sự kiện"
                            placeholderTextColor="#9ca3af"
                            value={title}
                            onChangeText={setTitle}
                        />
                    </View>

                    {/* Description */}
                    <View className="mb-4">
                        <View className="flex-row items-center mb-2">
                            <Ionicons name="information-circle-outline" size={20} color="#000" />
                            <Text className="text-lg font-bold ml-2 text-gray-900">Mô tả</Text>
                        </View>
                        <TextInput
                            className="border border-gray-300 p-3 rounded-lg bg-white"
                            placeholder="Nhập mô tả sự kiện"
                            placeholderTextColor="#9ca3af"
                            value={description}
                            onChangeText={setDescription}
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                        />
                    </View>

                    {/* Image picker */}
                    <View className="mb-4">
                        <View className="flex-row items-center mb-2">
                            <Ionicons name="image-outline" size={20} color="#000" />
                            <Text className="text-lg font-bold ml-2 text-gray-900">Hình ảnh</Text>
                        </View>
                        <TouchableOpacity
                            className="border border-dashed border-gray-300 p-4 rounded-lg bg-white items-center justify-center"
                            onPress={handleImagePick}
                        >
                            {imageUri ? (
                                <Image
                                    source={{ uri: imageUri }}
                                    className="w-full h-40 rounded-lg"
                                    resizeMode="cover"
                                />
                            ) : (
                                <View className="items-center py-4">
                                    <Ionicons name="cloud-upload-outline" size={40} color="#9ca3af" />
                                    <Text className="text-gray-500 mt-2">Tải ảnh lên</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>

                    {/* Location */}
                    <View className="mb-4">
                        <View className="flex-row items-center mb-2">
                            <Ionicons name="location-outline" size={20} color="#000" />
                            <Text className="text-lg font-bold ml-2 text-gray-900">Địa điểm</Text>
                        </View>
                        <TextInput
                            className="border border-gray-300 p-3 rounded-lg bg-white flex-1"
                            placeholder="Nhập địa điểm tổ chức"
                            placeholderTextColor="#9ca3af"
                            value={location}
                            onChangeText={setLocation}
                        />
                    </View>

                    {/* Map Modal */}
                    <Modal
                        visible={mapModalVisible}
                        animationType="slide"
                        transparent={false}
                        onRequestClose={() => setMapModalVisible(false)}
                    >
                        <SafeAreaView className="flex-1">
                            <View className="bg-blue-600 p-4 flex-row items-center justify-between">
                                <TouchableOpacity onPress={() => setMapModalVisible(false)}>
                                    <Ionicons name="close" size={24} color="white" />
                                </TouchableOpacity>
                                <Text className="text-white text-xl font-bold">Chọn địa điểm</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (selectedLocation) {
                                            setMapModalVisible(false);
                                        }
                                    }}
                                >
                                    <Text className="text-white text-base">Xong</Text>
                                </TouchableOpacity>
                            </View>
                            <MapView
                                className="flex-1 w-full"
                                initialRegion={{
                                    latitude: 10.762622,
                                    longitude: 106.660172,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
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
                        </SafeAreaView>
                    </Modal>

                    {/* Start Time */}
                    <DateTimePickerField
                        label="Thời gian bắt đầu"
                        dateValue={startTime}
                        onDateChange={(event, selectedDate) => handleDateChange('start', event, selectedDate)}
                    />

                    {/* End Time */}
                    <DateTimePickerField
                        label="Thời gian kết thúc"
                        dateValue={endTime}
                        onDateChange={(event, selectedDate) => handleDateChange('end', event, selectedDate)}
                    />

                    {/* Requirements */}
                    <View className="mb-4">
                        <View className="flex-row items-center mb-2">
                            <Ionicons name="list-outline" size={20} color="#000" />
                            <Text className="text-lg font-bold ml-2 text-gray-900">Yêu cầu</Text>
                        </View>
                        <TextInput
                            className="border border-gray-300 p-3 rounded-lg bg-white"
                            placeholder="Nhập yêu cầu khi tham gia"
                            placeholderTextColor="#9ca3af"
                            value={requirements}
                            onChangeText={setRequirements}
                            multiline
                            numberOfLines={3}
                            textAlignVertical="top"
                        />
                    </View>

                    {/* Status - Dropdown */}
                    <View className="mb-8">
                        <View className="flex-row items-center mb-2">
                            <Ionicons name="alert-circle-outline" size={20} color="#000" />
                            <Text className="text-lg font-bold ml-2 text-gray-900">Trạng thái</Text>
                        </View>
                        <TouchableOpacity
                            className="border border-gray-300 p-3 rounded-lg bg-white flex-row justify-between items-center"
                            onPress={() =>
                                showDropdown('status', ['Chờ', 'Sắp diễn ra', 'Đang diễn ra', 'Đã hoàn thành'], 'Chọn trạng thái')
                            }
                        >
                            <Text className="text-gray-900">{status}</Text>
                            <Ionicons name="chevron-down" size={20} color="#000" />
                        </TouchableOpacity>
                    </View>

                    {/* Dropdown Modal */}
                    <Modal visible={modalVisible} transparent={true} animationType="fade">
                        <TouchableOpacity
                            className="flex-1 justify-center items-center bg-black/50"
                            activeOpacity={1}
                            onPress={() => setModalVisible(false)}
                        >
                            <View className="bg-white rounded-xl w-4/5 p-4">
                                <Text className="text-lg font-bold text-center mb-4">{dropdownTitle}</Text>
                                <FlatList
                                    data={dropdownOptions}
                                    keyExtractor={(item) => item}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            className="p-3 border-b border-gray-100"
                                            onPress={() => handleDropdownChange(item)}
                                        >
                                            <Text className="text-lg text-center">{item}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                                <TouchableOpacity
                                    className="mt-4 bg-gray-200 p-3 rounded-lg"
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text className="text-center font-medium">Đóng</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </Modal>

                    {/* Submit button */}
                    <TouchableOpacity
                        className="bg-blue-600 p-4 rounded-lg items-center mb-8"
                        onPress={handleSubmit}
                    >
                        <Text className="text-white text-lg font-bold">Tạo sự kiện</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default CreateEvent;
