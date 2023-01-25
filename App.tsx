import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import VerificationScreen from "./src/screens/VerificationScreen";

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <VerificationScreen />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
});
