import { Image, Text, View } from "react-native";
import { GoogleInputProps } from "../../types/type";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import "react-native-get-random-values";
import { icons } from "@/constants"; // fix for crypto.getRandomValues error

const googlePlacesApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

const GoogleTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) => (
  <View
    className={`flex flex-row items-center justify-center relative z-50 rounded-xl ${containerStyle} mb-5`}
  >
    <GooglePlacesAutocomplete
      placeholder="Where to?"
      fetchDetails={true}
      debounce={200}
      enablePoweredByContainer={true}
      minLength={2}
      enableHighAccuracyLocation={true}
      predefinedPlaces={[]}
      styles={{
        textInputContainer: {
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 20,
          marginHorizontal: 20,
          position: "relative",
          shadowColor: "#d4d4d4",
        },
        textInput: {
          backgroundColor: textInputBackgroundColor || "white",
          fontWeight: "600",
          fontSize: 16,
          marginTop: 5,
          width: "100%",
          fontFamily: "JakartaSans-Medium",
          color: "#000",
        },
        listView: {
          backgroundColor: textInputBackgroundColor || "white",
          position: "relative",
          top: 0,
          width: "100%",
          zIndex: 99,
          borderRadius: 10,
          shadowColor: "#d4d4d4",
        },
      }}
      query={{
        key: googlePlacesApiKey,
        language: "en",
        types: "geocode",
      }}
      onPress={(data, details = null) => {
        console.log("Selected data:", data);
        console.log("Details:", details);

        if (!details?.geometry?.location) {
          console.warn("Missing geometry details!");
          return;
        }

        handlePress({
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
          address: data.description,
        });
      }}
      renderLeftButton={() => (
        <View className="justify-center items-center w-6 h-6">
          <Image
            source={icon || icons.search}
            className="w-6 h-6"
            resizeMode="contain"
          />
        </View>
      )}
      textInputProps={{
        placeholderTextColor: "gray",
        placeholder: initialLocation ?? "Where do you want to go?",
      }}
    />
  </View>
);

export default GoogleTextInput;
