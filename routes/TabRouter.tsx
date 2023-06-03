import * as React from "react";
import { HomeScreen } from "../src/screen/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Favorite } from "../src/screen/FavoriteScreen";
import { Feather, Ionicons, MaterialIcons, Entypo } from "@expo/vector-icons";

export default function TabRouter() {
  const Stack = createBottomTabNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopColor: "transparent",
        },

        headerTitleAlign: "left",
        headerStyle: {
          backgroundColor: "#fff",
          borderBottomColor: "transparent",
        },
        headerTitleStyle: {
          color: "#000",
          fontSize: 30,
        },
        tabBarActiveTintColor: "#000",
      }}
      initialRouteName="Home"
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: "Tabnews",
          tabBarIcon({ focused }) {
            return focused ? (
              <Entypo name="home" size={24} color="#000" />
            ) : (
              <Feather name="home" size={24} color="gray" />
            );
          },
        }}
      />
      <Stack.Screen
        options={{
          tabBarIcon({ focused }) {
            return focused ? (
              <MaterialIcons name="favorite" size={24} color="#000" />
            ) : (
              <MaterialIcons name="favorite-border" size={24} color="gray" />
            );
          },
        }}
        name="Favorito"
        component={Favorite}
      />
      <Stack.Screen
        name="Configurações"
        component={Favorite}
        options={{
          headerShown: false,
          tabBarIcon({ focused }) {
            return focused ? (
              <Ionicons name="settings" size={24} color="#000" />
            ) : (
              <Feather name="settings" size={24} color="gray" />
            );
          },
        }}
      />
    </Stack.Navigator>
  );
}
