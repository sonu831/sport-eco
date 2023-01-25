import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import Navigation from "./src/screens/Navigation";

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <Navigation />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
});
