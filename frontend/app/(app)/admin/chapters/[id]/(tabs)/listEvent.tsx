import React from "react";
import { ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import EventItem from "@/components/EventItem";

interface EventType {
  id: string;
  title: string;
  time: string;
  location: string;
  status: string;
}

const ListEvent = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  // Sample 
  const events: EventType[] = [
    {
      id: "1",
      title:
        "Lễ trao giải thanh niên xung phong hoạt động tích cực trong mùa hè xanh 2025",
      time: "13:00 25/06/2025",
      location: "Hội trường A1, Đại học Quốc Gia TP.HCM",
      status: "Đang diễn ra",
    },
    {
      id: "2",
      title:
        "Lễ trao giải thanh niên xung phong hoạt động tích cực trong mùa hè xanh 2025",
      time: "13:00 25/06/2025",
      location: "Hội trường A1, Đại học Quốc Gia TP.HCM",
      status: "Sắp diễn ra",
    },
    {
      id: "3",
      title:
        "Lễ trao giải thanh niên xung phong hoạt động tích cực trong mùa hè xanh 2025",
      time: "13:00 25/06/2025",
      location: "Hội trường A1, Đại học Quốc Gia TP.HCM",
      status: "Sắp diễn ra",
    },
  ];

  const navigateToEventDetail = (eventId: string) => {
    // Implement navigation to event detail page
    console.log(`Navigate to event detail: ${eventId}`);
  };

  const handleDeleteEvent = (eventId: string) => {
    // Implement delete event logic
    console.log(`Delete event: ${eventId}`);
  };

  return (
    <ScrollView className='flex-1 bg-white px-4 py-3'>
      {events.map((event) => (
        <EventItem
          key={event.id}
          title={event.title}
          time={event.time}
          location={event.location}
          status={event.status}
          onPress={() => navigateToEventDetail(event.id)}
          onDelete={() => handleDeleteEvent(event.id)}
        />
      ))}
    </ScrollView>
  );
};

export default ListEvent;
