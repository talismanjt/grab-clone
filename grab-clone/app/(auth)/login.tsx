import { Image, ScrollView, Text, View } from "react-native";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Link, useRouter } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignIn } from "@clerk/clerk-expo";

const Login = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loginVerification, setLoginVerification] = useState({
    state: "default",
    error: "",
  });

  const onLoginPress = async () => {
    setLoginVerification({
      ...loginVerification,
      state: "default",
    });

    if (!form.email || !form.password) {
      setLoginVerification({
        ...loginVerification,
        state: "failed",
        error: "Please fill out all fields",
      });
      return;
    }

    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        setLoginVerification({ ...loginVerification, state: "success" });
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        setLoginVerification({
          ...loginVerification,
          state: "failed",
          error: "Login failed",
        });
      }
    } catch (err: any) {
      setLoginVerification({
        ...loginVerification,
        state: "failed",
        error: err.errors[0].longMessage,
      });
    }
  };
  return (
    <ScrollView className={"flex-1 bg-white"}>
      <View className={"flex-1 bg-white mb-20"}>
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
        <View className={"p-7"}>
          {loginVerification.error && (
            <View
              className={
                "bg-red-100 border border-red-400 rounded-md p-5 mt-2 mb-4"
              }
            >
              <Text className={"text-red-500 text-sm text-center"}>
                {loginVerification.error}
              </Text>
            </View>
          )}
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
            onChangeText={(value: any) => setForm({ ...form, password: value })}
          />

          <CustomButton
            title={"Log In"}
            onPress={onLoginPress}
            className={"mt-6"}
          />
          <CustomButton
            title={"Go To Home"}
            onPress={() => {
              router.replace("/(root)/(tabs)/home");
            }}
            className={"mt-5"}
          />
          <OAuth />
          <Link
            href={"/register"}
            className={"text-lg text-center text-general-200 mt-10"}
          >
            <Text>Don't have an account? </Text>
            <Text className={"text-primary-500"}>Sign Up</Text>
          </Link>
        </View>
        {/*  Verification modal to be added*/}
      </View>
    </ScrollView>
  );
};

export default Login;
