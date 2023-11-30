import { StripeProvider } from "@stripe/stripe-react-native";
import PaymentScreen from "./PaymentScreen";

const publishableKey = "your_stripe_publishable_key_here";

const App = () => {
  return (
    <StripeProvider publishableKey={publishableKey}>
      {/* Rest of your app components */}
      <PaymentScreen />
    </StripeProvider>
  );
};
