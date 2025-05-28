import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { useRef, useState } from "react";
import "../../global.css";
import { onboarding } from "@/constants";

const OnBoarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <TouchableOpacity
        onPress={() => {
          router.replace("/(auth)/register");
        }}
        className="w-full flex justify-end items-end p-5"
      >
        <Text className="text-black text-md font-PlusJakartaSans-Bold">
          Skip
        </Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />
        }
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.title} className="flex items-center justify-center">
            <Image source={item.image} className="w-80 h-80 mt-10" />
            <Text className="text-black text-2xl font-PlusJakartaSans-Bold">
              {item.title}
            </Text>
            <Text className="text-[#7C8AA0] text-md font-PlusJakartaSans-Medium">
              {item.subtitle}
            </Text>
          </View>
        ))}
      </Swiper>
    </SafeAreaView>
  );
};

export default OnBoarding;
