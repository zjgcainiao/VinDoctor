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
      paymentMethodType: "Card",
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
        postalCodeEnabled={true}
        placeholder={{
          number: "4242 4242 4242 4242",
        }}
        cardStyle={{
          backgroundColor: "#FFFFFF",
          textColor: "#000000",
        }}
        style={{
          width: "90%",
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

  // Determine the current hostname
  const hostname = window.location.hostname;

  // Set the URL based on the environment: testing (127.0.0.1) or Production
  let url = "";
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    url = "https://127.0.0.1:8000/shops/create_payment_intent/prod_PKOol19RtrtGTG";
  } else if (hostname === "new76prolubeplus.com") {
    url = "https://new76prolubeplus.com/shops/create_payment_intent/prod_PKOol19RtrtGTG";
  }


  // Fetch the client secret from the backend
  const response = await fetch(url);
  const data = await response.json();
  return data.clientSecret;
  
};


export default PaymentScreen;
