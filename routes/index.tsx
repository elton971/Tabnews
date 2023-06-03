import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import StackRouter from "./StackRouter";

export default function Router() {
  return (
    <NavigationContainer>
      <StackRouter />
    </NavigationContainer>
  );
}
