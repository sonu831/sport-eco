import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import Navigation from "./screens/Navigation";
import { Provider } from "react-redux";
import { store } from "./store";

const App = () => {
  return (
    <Provider store={store}>
    <SafeAreaProvider style={styles.container}>
      <Navigation />
    </SafeAreaProvider>
  </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
});

export default App