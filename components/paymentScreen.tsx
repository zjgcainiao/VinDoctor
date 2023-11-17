import React, { useState, useEffect } from "react";
import { View, Button, Text } from "react-native";
import {
  useStripe,
  CardField,
  PaymentIntent,
} from "@stripe/stripe-react-native";

const PaymentScreen: React.FC = () => {
  const { confirmPayment } = useStripe();
  const [clientSecret, setClientSecret] = useState<string>("");

  useEffect(() => {
    // Fetch the client secret from your backend
    fetchClientSecret().then((secret) => setClientSecret(secret));
  }, []);

  const handlePayPress = async () => {
    if (!clientSecret) {
      return;
    }

    const { paymentIntent, error } = await confirmPayment(clientSecret, {
      type: "Card",
      // You can gather more billing details if necessary
    });

    if (error) {
      console.log("Payment confirmation error", error);
    } else if (paymentIntent) {
      console.log("Payment successful", paymentIntent);
    }
  };

  return (
    <View>
      <CardField
        postalCodeEnabled={false}
        placeholder={{
          number: "4242 4242 4242 4242",
        }}
        cardStyle={{
          backgroundColor: "#FFFFFF",
          textColor: "#000000",
        }}
        style={{
          width: "100%",
          height: 50,
          marginVertical: 30,
        }}
      />
      <Button onPress={handlePayPress} title="Pay" />
    </View>
  );
};

const fetchClientSecret = async (): Promise<string> => {
  // Implement a method to fetch the client secret from your backend
  // Example:
  const response = await fetch(
    "your_backend_endpoint_to_create_payment_intent"
  );
  const data = await response.json();
  return data.clientSecret;
};

export default PaymentScreen;
