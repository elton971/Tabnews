import * as React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import Router from "./routes/index";
import { Provider } from "react-redux";
import store from "./store/store";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <StatusBar style="auto" />
        <Router />
      </PaperProvider>
    </Provider>
  );
}
