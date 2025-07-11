import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Text, TouchableOpacity, View, Button } from "react-native";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { useRef, useState } from "react";
import "../../global.css";
import { onboarding } from "@/constants";
import CustomButton from "@/components/CustomButton";

const OnBoarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;

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
          <View
            key={item.title}
            className="flex items-center justify-center p-5"
          >
            <Image
              source={item.image}
              className="w-full h-[300px]"
              resizeMode={"contain"}
            />
            <View className="flex flex-row items-center justify-center w-full mt-10">
              <Text className="text-black text-3xl font-bold mx-10 text-center">
                {item.title}
              </Text>
            </View>
            <Text
              className={
                "text-lg font-JakartaSemiBold text-center text-[#858585 mx-10 mt-3"
              }
            >
              {item.description}
            </Text>
            {isLastSlide && (
              <CustomButton
                onPress={() => {
                  router.replace("/(auth)/register");
                }}
                title={"Get Started"}
                className={"mt-5 w-full shadow-none"}
                bgVariant={"primary"}
                textVariant={"default"}
              />
            )}
          </View>
        ))}
      </Swiper>
    </SafeAreaView>
  );
};

export default OnBoarding;
