import React from "react";
import ErrorBoundary from "react-native-error-boundary";
import * as Sentry from "sentry-expo";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import Navigation from "./src/screens/Navigation";
import { Provider } from "react-redux";
import { store } from "./src/store";
import { initializeStore } from "./src/services/utils/axios";

Sentry.init({
  dsn: "https://49ddde955e544dbfb13a2d3b4a6ccbd6@o4504739695689728.ingest.sentry.io/4504739706699776",
  enableInExpoDevelopment: false,
  debug: false, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});

import { Text, View, Button } from "react-native";

const CustomFallback = (props: { error: Error; resetError: Function }) => (
  <View>
    <Text>Something happened!</Text>
    <Text>{props.error.toString()}</Text>
    <Button onPress={() => props.resetError} title={"Try again"} />
  </View>
);

const App = () => {
  initializeStore(store);
  const errorHandler = (error: Error, stackTrace: string) => {
    Sentry.Native.captureException(
      `Error Boundary error - ${error} stackTrace- ${stackTrace}`
    );
  };
  return (
    <ErrorBoundary onError={errorHandler} FallbackComponent={CustomFallback}>
      <Provider store={store}>
        <SafeAreaProvider style={styles.container}>
          <Navigation />
        </SafeAreaProvider>
      </Provider>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
});

export default App;
