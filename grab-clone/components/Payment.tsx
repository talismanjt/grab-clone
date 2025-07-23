import CustomButton from "@/components/CustomButton";
import { useStripe } from "@stripe/stripe-react-native";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { PaymentProps } from "../../types/type";
// import { fetchAPI } from "@/lib/fetch";

const Payment = ({
  fullName,
  email,
  amount,
  driverId,
  rideTime,
}: PaymentProps) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/payment-sheet`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({
        //   name: fullName || email.split("@")[0],
        //   email,
        //   amount,
        // }),
      },
    );

    console.log(response);
    const { paymentIntent, ephemeralKey, customer } = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } =
      await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: "Jane Doe",
      },
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    await initializePaymentSheet();
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert("Success", "Your order is confirmed!");
    }
  };

  return (
    <>
      <CustomButton
        title={"Confirm Ride"}
        className={"my-10"}
        onPress={openPaymentSheet}
      />
    </>
  );
};

export default Payment;
