import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Define the event type
type Event = {
  id: string;
  title: string;
  time: string;
  location: string;
  status: string;
};

const EventList = () => {
  const router = useRouter();

  // Sample event data
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Lễ trao giải thanh niên xung phong',
      time: '15/03/2025',
      location: 'Hà Nội',
      status: 'Đang thực hiện',
    },
    {
      id: '2',
      title: 'Chiến dịch mùa hè xanh',
      time: '20/04/2025',
      location: 'TP.HCM',
      status: 'Sắp diễn ra',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteEvent = (id: string) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
    console.log('Deleted event:', id);
  };

  const renderEventItem = ({ item }: { item: Event }) => (
    <TouchableOpacity
      className="bg-white p-4 mb-2 rounded-lg flex-row items-center"
      onPress={() =>
        router.push({
          pathname: '/(app)/leader/events/detail',
          params: { id: item.id },
        })
      }
    >
      <View className="flex-1">
        <Text className="font-bold text-base">{item.title}</Text>
        <View className="flex-row items-center mt-1">
          <Ionicons name="time-outline" size={16} color="#666" />
          <Text className="text-gray-600 ml-1">{item.time}</Text>
        </View>
        <View className="flex-row items-center mt-1">
          <Ionicons name="location-outline" size={16} color="#666" />
          <Text className="text-gray-600 ml-1">{item.location}</Text>
        </View>
        <View className="flex-row items-center mt-1">
          <Ionicons name="checkmark-circle-outline" size={16} color="#666" />
          <Text className="text-gray-600 ml-1">{item.status}</Text>
        </View>
      </View>
      {/* Delete button */}
      <TouchableOpacity onPress={() => handleDeleteEvent(item.id)}>
        <Ionicons name="trash-outline" size={24} color="red" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="bg-blue-600 p-4 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold">Danh sách sự kiện</Text>
        <TouchableOpacity
          onPress={() => router.push('/(app)/leader/events/create')}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Search bar */}
      <View className="p-4">
        <TextInput
          className="border border-gray-300 p-3 rounded-lg bg-white"
          placeholder="Tìm kiếm sự kiện"
          placeholderTextColor="#6B7280"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Create Event Button */}
      <View className="px-4 mb-4">
        <TouchableOpacity
          className="bg-blue-600 p-3 rounded-lg flex-row items-center justify-center"
          onPress={() => router.push('/(app)/leader/events/create')}
        >
          <Ionicons name="add-circle-outline" size={20} color="white" />
          <Text className="text-white font-bold ml-2">Tạo sự kiện mới</Text>
        </TouchableOpacity>
      </View>

      {/* Event list */}
      <FlatList
        className="px-4"
        data={filteredEvents}
        renderItem={renderEventItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default EventList;