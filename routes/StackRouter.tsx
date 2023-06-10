import * as React from "react";
import {
  createNativeStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/native-stack";
import TabRouter from "./TabRouter";
import ContentView from "../src/components/ContentView";
import LoginScreen from "../src/screen/LoginScreen";
import { Easing } from "react-native";

export default function StackRouter() {
  const { Screen, Navigator } = createNativeStackNavigator();
  const config = {
    animation: "spring",
    config: {
      stiffness: 1000,
      damping: 50,
      mass: 3,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  const closeConfig = {
    animation: "timing",
    config: {
      duration: 200,
      easing: Easing.linear,
    },
  };

  return (
    <Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
      initialRouteName="Home"
    >
      <Screen
        name="index"
        component={TabRouter}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="content"
        component={ContentView}
        options={{
          headerTitle: "",
        }}
      />
      <Screen
        name="loginAuth"
        component={LoginScreen}
        options={{
          headerTitle: "",
        }}
      />
    </Navigator>
  );
}
