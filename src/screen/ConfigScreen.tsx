import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ConfigScreen() {
  const navigation = useNavigation();
  const configOptions = [
    {
      name: "Publicar conteudo",
      icon: <MaterialIcons name="article" size={24} color="black" />,
      onPress: () => {
        console.log("deslogar");
      },
    },
    {
      name: "Meus conteudos",
      icon: (
        <MaterialCommunityIcons
          name="content-save-outline"
          size={24}
          color="black"
        />
      ),
      onPress: () => {
        console.log("deslogar");
      },
    },
    {
      name: "Editar perfil",
      icon: <FontAwesome name="user-o" size={24} color="black" />,
    },
    {
      name: "Deslogar",
      icon: <MaterialCommunityIcons name="logout" size={24} color="black" />,
      onPress: () => {
        // @ts-ignore
        navigation.navigate("login");
      },
    },
  ];
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
            gap: 10,
          }}
        >
          <View
            style={{
              marginTop: 20,
              backgroundColor: "lightgray",
              padding: 15,
              borderRadius: 100,
            }}
          >
            <AntDesign name="user" size={50} color="black" />
          </View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Text>20: TabCoins</Text>
            <Text>@Elton</Text>
            <Text>10 TabCash</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Text>EltonCavele8@gmail.com</Text>
          </View>
        </View>

        <View>
          {configOptions.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginVertical: 5,
                  paddingHorizontal: 20,
                }}
                onPress={item.onPress}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    padding: 10,
                    alignItems: "center",
                  }}
                >
                  {item.icon}
                  <Text>{item.name}</Text>
                </View>
                <View>
                  <AntDesign name="arrowright" size={24} color="black" />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}
