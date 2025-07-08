import { Alert, Image, ScrollView, Text, View } from "react-native";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignUp } from "@clerk/clerk-expo";
import { ReactNativeModal } from "react-native-modal";

const Register = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setVerification({
        ...verification,
        state: "failed",
        error: "Please fill out all fields",
      });
      return;
    }

    if (form.password !== form.confirmPassword) {
      setVerification({
        ...verification,
        state: "failed",
        error: "Passwords do not match",
      });
      setVerification({
        ...verification,
        state: "failed",
        error: "Passwords do not match",
      });
      return;
    }

    if (!isLoaded) return;
    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });
      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // code
      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      setVerification({
        ...verification,
        state: "failed",
        error: err.errors[0].longMessage,
      });
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await fetch("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: signUpAttempt.createdUserId,
          }),
        });
        await setActive({ session: signUpAttempt.createdSessionId });
        setVerification({ ...verification, state: "success" });
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        setVerification({
          ...verification,
          state: "failed",
          error: "Verification failed",
        });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        state: "failed",
        error: err.errors[0].longMessage,
      });
    }
  };

  return (
    <ScrollView className={"flex-1 bg-white"}>
      <View className={"flex-1 bg-white mb-20"}>
        <View className={"relative w-full h-[150px]"}>
          <Image source={""} className={"z-0 w-ful h-[150px]"} />
          <Text
            className={
              "text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5"
            }
          >
            Create Your Account
          </Text>
        </View>
        <View className={"p-7"}>
          {verification.error && (
            <View
              className={
                "bg-red-100 border border-red-400 rounded-md p-5 mt-2 mb-4"
              }
            >
              <Text className={"text-red-500 text-sm text-center"}>
                {verification.error}
              </Text>
            </View>
          )}
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
            onChangeText={(value: any) => setForm({ ...form, password: value })}
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
          <OAuth />
          <Link
            href={"/login"}
            className={"text-lg text-center text-general-200 mt-10"}
          >
            <Text>Already have an account? </Text>
            <Text className={"text-primary-500"}>Log In</Text>
          </Link>
        </View>
        <ReactNativeModal
          isVisible={verification.state === "pending"}
          onModalHide={() => {
            if (verification.state === "success") setShowSuccessModal(true);
          }}
        >
          <View className={"bg-white px-7 py-9 rounded-2xl min-h-[300px]"}>
            <Text className={"text-2xl font-JakartaBold text-center mb-2"}>
              Verification
            </Text>
            <Text className={"font-Jakarta mb-5"}>
              We've sent a verification code to {form.email}
            </Text>
            <InputField
              label={"Code"}
              icon={icons.lock}
              placeholder={"12345"}
              // value={verification.code}
              keyboardType={"numeric"}
              onChangeText={(code) =>
                setVerification({
                  ...verification,
                  code,
                })
              }
            />
            {verification.error && (
              <Text className={"text-red-500 text-sm mt-1 text-center"}>
                {verification.error}
              </Text>
            )}
            <CustomButton
              title={"Verify Email"}
              onPress={onVerifyPress}
              className={"mt-5 bg-success-500"}
            />
          </View>
        </ReactNativeModal>
        <ReactNativeModal isVisible={showSuccessModal}>
          <View className={"bg-white px-7 py-9 rounded-2xl min-h-[300px]"}>
            <Image
              source={images.check}
              className={"w-[110] h-[110] mx-auto my-5"}
            />
            <Text className={"text-2xl font-JakartaBold text-center mb-2"}>
              Verified
            </Text>
            <Text
              className={"text-base text-gray-400 font-Jakarta text-center"}
            >
              You have successfully verified your account.
            </Text>
            <CustomButton
              title={"Go To Home"}
              onPress={() => {
                setShowSuccessModal(false);
                router.replace("/(root)/(tabs)/home");
              }}
              className={"mt-5"}
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default Register;
