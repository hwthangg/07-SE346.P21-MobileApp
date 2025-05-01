import React, { useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { useRouter } from "expo-router";

interface TabProps {
  activeTab: string;
  onChangeTab: (tab: string) => void;
  tabs: string[];
}

const ChapterTabs: React.FC<TabProps> = ({ activeTab, onChangeTab, tabs }) => {
  const slideAnim = useRef(new Animated.Value(0)).current;

  // Calculate the active tab position for the animation
  useEffect(() => {
    const activeIndex = tabs.indexOf(activeTab);
    const newPosition = activeIndex * (100 / tabs.length);

    Animated.timing(slideAnim, {
      toValue: newPosition,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [activeTab, tabs]);

  return (
    <View className='flex-row relative'>
      {/* Animated indicator line */}
      <Animated.View
        style={{
          position: "absolute",
          bottom: 0,
          left: slideAnim.interpolate({
            inputRange: [0, 100],
            outputRange: ["0%", "100%"],
          }),
          width: `${100 / tabs.length}%`,
          height: 2,
          backgroundColor: "#3E4FF5",
        }}
      />

      {/* Tabs */}
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => onChangeTab(tab)}
          className='flex-1 py-3 px-1'
        >
          <Text
            className={`text-center text-sm ${
              activeTab === tab ? "text-[#3E4FF5] font-medium" : "text-gray-600"
            }`}
            numberOfLines={1}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ChapterTabs;
