import { Text, View } from "react-native";
import { GoogleInputProps } from "../../types/type";
import {
  GooglePlacesAutocomplete,
  GooglePlaceData,
  GooglePlaceDetail,
} from "react-native-google-places-autocomplete";
import "react-native-get-random-values"; // fix for crypto.getRandomValues error

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
      placeholder="Where do you want to go?"
      fetchDetails={true}
      debounce={100}
      minLength={1} // must be explicitly defined for Expo SDK 53
      query={{
        key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY || "",
        language: "en",
      }}
      predefinedPlaces={[]} // prevents `.filter` of undefined error
      onPress={(
        data: GooglePlaceData,
        details: GooglePlaceDetail | null = null,
      ) => {
        if (handlePress) {
          handlePress(data, details);
        }
      }}
      onFail={() => console.warn("Google Places API request failed")}
      onNotFound={() => console.warn("No places found")}
      onTimeout={() => console.warn("Google Places API request timed out")}
      textInputProps={{
        onFocus: () => {},
        onBlur: () => {},
        onChangeText: () => {},
        placeholderTextColor: "#999",
        style: {
          backgroundColor: textInputBackgroundColor || "white",
          height: 44,
          paddingHorizontal: 10,
          borderRadius: 8,
          fontSize: 16,
        },
      }}
      styles={{
        textInputContainer: {
          backgroundColor: "transparent",
        },
        listView: {
          backgroundColor: "white",
          borderRadius: 8,
          marginTop: 4,
        },
      }}
    />
  </View>
);

export default GoogleTextInput;
