import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import {
  Stack,
  useRouter,
  useLocalSearchParams,
  useSegments,
  usePathname,
} from "expo-router";
import ChapterTabs from "@/components/ChapterTabs";

export default function ChapterLayout() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const segments = useSegments();
  const pathname = usePathname();
  const [imageError, setImageError] = useState(false);
  const [activeTab, setActiveTab] = useState("Thông tin chung");

  // Get chapter info 
  const chapterInfo = {
    id: params.id as string,
    name: (params.name as string) || "Thành Đoàn TP. Hồ Chí Minh",
    image:
      (params.image as string) ||
      "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    affiliated:
      (params.affiliated as string) || "Trung ương Đoàn TNCS Hồ Chí Minh",
  };

  const tabs = ["Thông tin chung", "DS sự kiện", "DS đoàn viên", "DS văn bản"];

  // Handle back navigation to ensure proper routing
  const handleBackNavigation = () => {
    // Navigate back to the chapters index
    router.push("/admin/chapters");
  };

  // Handle tab navigation 
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const id = chapterInfo.id;

    switch (tab) {
      case "Thông tin chung":
        router.replace(`/admin/chapters/${id}/(tabs)/general`);
        break;
      case "DS sự kiện":
        router.replace(`/admin/chapters/${id}/(tabs)/listEvent`);
        break;
      case "DS đoàn viên":
        router.replace(`/admin/chapters/${id}/(tabs)/listMember`);
        break;
      case "DS văn bản":
        router.replace(`/admin/chapters/${id}/(tabs)/listDocument`);
        break;
    }
  };

  // Set active tab based on current route on initial render or route change
  useEffect(() => {
    const currentPath = segments[segments.length - 1];

    if (currentPath === "general") setActiveTab("Thông tin chung");
    else if (currentPath === "listEvent") setActiveTab("DS sự kiện");
    else if (currentPath === "listMember") setActiveTab("DS đoàn viên");
    else if (currentPath === "listDocument") setActiveTab("DS văn bản");
  }, [pathname]);

  return (
    <SafeAreaView className='flex-1 bg-white'>
      {/* Hide default header */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* Main header - Updated to match index.tsx */}
      <View className='w-full bg-[#3E4FF5] py-8 px-4 rounded-b-xl'>
        <View className='flex-row items-center justify-center'>
          <TouchableOpacity
            onPress={handleBackNavigation}
            className='absolute left-0'
          >
            <Feather name='chevron-left' size={26} color='white' />
          </TouchableOpacity>
          <Text className='text-white text-2xl font-bold text-center'>
            {chapterInfo.name}
          </Text>
        </View>
      </View>

      {/* Logo and Organization Name */}
      <View className='items-center mt-4 mb-3'>
        <View className='w-28 h-28 rounded-xl bg-[#DEF1FC] items-center justify-center overflow-hidden'>
          {imageError || !chapterInfo.image ? (
            <Feather name='image' size={40} color='#888' />
          ) : (
            <Image
              source={{
                uri: chapterInfo.image,
              }}
              onError={() => setImageError(true)}
              className='w-28 h-28'
              resizeMode='cover'
            />
          )}
        </View>
      </View>

      <Text className='text-xl font-bold text-center mb-4'>
        {chapterInfo.name}
      </Text>

      {/* Tab Navigation*/}
      <ChapterTabs
        activeTab={activeTab}
        onChangeTab={handleTabChange}
        tabs={tabs}
      />

      {/* Content Area - displays the routes without secondary header */}
      <View className='flex-1'>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </SafeAreaView>
  );
}
