import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabRouter from "./TabRouter";
import ContentView from "../src/screen/ContentView";

export default function StackRouter() {
  const { Screen, Navigator } = createNativeStackNavigator();
  return (
    <Navigator screenOptions={{}} initialRouteName="Home">
      <Screen
        name="index"
        component={TabRouter}
        options={{
          headerShown: false,
        }}
      />
      <Screen name="content" component={ContentView} />
    </Navigator>
  );
}
