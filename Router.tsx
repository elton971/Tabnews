import * as React from "react";
import { HomeScreen } from "./src/screen/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Favorite } from "./src/screen/FavoriteScreen";
import { Feather, Ionicons, MaterialIcons, Entypo } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function Router() {
  const Stack = createBottomTabNavigator();
  const { Screen, Navigator } = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#121212",
            borderTopColor: "transparent",
          },
          headerTitleAlign: "left",
          headerStyle: {
            backgroundColor: "#121212",
            borderBottomColor: "transparent",
          },
          headerTitleStyle: {
            color: "#fff",
            fontSize: 20,
          },
          tabBarActiveTintColor: "#119e97",
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
                <Entypo name="home" size={24} color="#119e97" />
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
                <MaterialIcons name="favorite" size={24} color="#119e97" />
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
                <Ionicons name="settings" size={24} color="#119e97" />
              ) : (
                <Feather name="settings" size={24} color="gray" />
              );
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
