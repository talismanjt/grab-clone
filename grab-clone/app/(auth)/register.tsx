import { Image, ScrollView, Text, View } from "react-native";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onSignUpPress = async () => {};
  return (
    <ScrollView className={"flex-1 bg-white"}>
      <View className={"flex-1 bg-white"}>
        <View className={"relative w-full h-[250px]"}>
          <Image source={images.signUpCar} className={"z-0 w-ful h-[250px]"} />
          <Text
            className={
              "text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5"
            }
          >
            Create Your Account
          </Text>
        </View>
        <View className={"p-5"}>
          <InputField
            label={"Name"}
            placeholder={"Enter your name"}
            icon={icons.person}
            value={form.name}
            onChangeText={(value: any) => setForm({ ...form, name: value })}
          />
          <InputField
            label={"Email"}
            placeholder={"Enter your Email"}
            icon={icons.email}
            value={form.email}
            onChangeText={(value: any) => setForm({ ...form, email: value })}
          />
          <InputField
            label={"Password"}
            placeholder={"Enter your Password"}
            icon={icons.lock}
            secureTextEntry={true}
            value={form.password}
            onChangeText={(value: any) => setForm({ ...form, name: value })}
          />
          <InputField
            label={"Confirm Password"}
            placeholder={"Re-enter your Password"}
            icon={icons.lock}
            secureTextEntry={true}
            value={form.confirmPassword}
            onChangeText={(value: any) =>
              setForm({ ...form, confirmPassword: value })
            }
          />
          <CustomButton
            title={"Sign Up"}
            onPress={onSignUpPress}
            className={"mt-6"}
          />
          {/*  OAuth special button to allow login to google */}
          <Link
            href={"/(auth)/login"}
            className={"text-lg text-center text-general-200 mt-10"}
          >
            <Text>Already have an account? </Text>
            <Text className={"text-primary-500"}>Log In</Text>
          </Link>
        </View>
        {/*  Verification modal to be added*/}
      </View>
    </ScrollView>
  );
};

export default Register;
