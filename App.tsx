import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import Navigation from "./src/screens/Navigation";
import { Provider } from "react-redux";
import { store } from "./src/store";
import { initializeStore } from "./src/services/utils/axios";

export default function App() {
  initializeStore(store);

  return (
    <Provider store={store}>
      <SafeAreaProvider style={styles.container}>
        <Navigation />
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
});
