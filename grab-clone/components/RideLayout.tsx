import { Image, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { router } from "expo-router";
import { icons } from "@/constants";
import Map from "@/components/Map";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useMemo, useRef } from "react";

const RideLayout = ({
  children,
  title,
  customSnapPoints,
}: {
  children: React.ReactNode;
  title?: string;
  customSnapPoints?: string[];
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(
    () => customSnapPoints || ["50%", "85%"],
    [customSnapPoints],
  );

  return (
    <GestureHandlerRootView>
      <View className={"flex-1 bg-white"}>
        <View className={"flex flex-col h-screen bg-amber-200"}>
          <View
            className={
              "flex flex-row absolute z-10 top-16 items-center justify-start px-5"
            }
          >
            <TouchableOpacity onPress={() => router.back()}>
              <View
                className={
                  "w-10 h-10 bg-white rounded-full items-center justify-center"
                }
              >
                <Image
                  source={icons.backArrow}
                  className={"w-6 h-6"}
                  resizeMode={"contain"}
                />
              </View>
            </TouchableOpacity>
            <Text className={"text-md font-JakartaMedium ml-2"}>
              {title || "Go back"}
            </Text>
          </View>
          <Map />
        </View>
        <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints} index={0}>
          <BottomSheetView style={{ flex: 1, padding: 20 }}>
            {children}
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default RideLayout;
