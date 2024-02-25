import { StripeProvider } from "@stripe/stripe-react-native";
import PaymentScreen from "./PaymentScreen";
import Config from 'react-native-config';

const publishableKey = Config.STRIPE_PUBLIC_TEST_KEY;

const ProcessPayment = () => {
  return (
    <StripeProvider publishableKey={string:publishableKey} children={null}>
      {/* Rest of your app components */}
      <PaymentScreen />
    </StripeProvider>
  );
};
