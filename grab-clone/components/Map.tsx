import { Text, View } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";

const Map = () => {
  return (
    <View className={"w-full h-full"}>
      <MapView
        provider={PROVIDER_DEFAULT}
        className={"w-full h-full rounded-2xl"}
      >
        <View className={"w-full h-full"}></View>
      </MapView>
    </View>
  );
};

export default Map;
