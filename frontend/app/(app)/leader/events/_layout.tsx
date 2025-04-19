import React from 'react';
import { Stack } from 'expo-router';

const EventLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerShown: false, // Hide the default header
            }}
        >
            {/* Define the stack for event-related screens */}
            <Stack.Screen name="index" />
            <Stack.Screen name="create" />
            <Stack.Screen name="detail" />
        </Stack>
    );
};

export default EventLayout;
