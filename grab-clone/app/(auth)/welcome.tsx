import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import "../../global.css";

const Welcome = () => {
  return (
    <SafeAreaView
      className={"flex h-full items-center justify-between bg-white"}
    >
      <TouchableOpacity
        onPress={() => {
          router.replace("/(auth)/login");
        }}
        className={"w-full flex justify-end items-end p-5"}
      >
        <Text className={"text-black text-md font-PlusJakartaSans-Bold"}>
          Skip
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Welcome;
