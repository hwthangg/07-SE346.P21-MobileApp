import React from 'react';
import { Stack } from 'expo-router';

const UpcomingEventLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerShown: false, // Hide the default header
            }}
        >
            <Stack.Screen name="index" />
        </Stack>
    );
};

export default UpcomingEventLayout;
