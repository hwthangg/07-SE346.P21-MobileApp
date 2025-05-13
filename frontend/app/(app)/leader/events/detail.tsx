import React, { useEffect } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const EventDetail = () => {
    const router = useRouter();
    const params = useLocalSearchParams();    // Redirect to the management/detail
    useEffect(() => {
        // Navigate to the management/detail
        router.replace({
            pathname: "/(app)/leader/events/management/detail",
            params: { eventId: params.id }
        });
    }, []);

    // Show loading while redirect happens
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#2563EB" />
            <Text className="mt-4 text-gray-600">Đang tải thông tin sự kiện...</Text>
        </View>
    );
};

export default EventDetail;
