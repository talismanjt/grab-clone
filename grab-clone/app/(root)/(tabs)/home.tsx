import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SignOutButton } from "@/app/components/SignOutButton";

export default function Page() {
  const { user } = useUser();

  return (
    <View>
      <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
    </View>
  );
}
