import React, { useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { login } from "../../services/auth";
import { useDispatch } from "react-redux";
import { saveAuthUserCredential } from "../../services/storage";

export default function LoginScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity onPress={() => {}}>
              <Text
                style={{
                  color: "#05739c",
                  paddingHorizontal: 20,
                  fontWeight: "bold",
                }}
              >
                Recuperar a senha
              </Text>
            </TouchableOpacity>
          ),
        });
      },
    });
  }, []);

  const textInputValue = [
    {
      name: "email",
      placeholder: "Email",
      type: "password",
    },
    {
      name: "password",
      placeholder: "Senha",
      type: "password",
    },
  ];
  function setInfoModal(arg0: boolean, message: any): any {
    throw new Error("Function not implemented.");
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          paddingHorizontal: 10,
        }}
      >
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            login(values.email, values.password)
              .then((res) => {
                console.log("logado", res);
                saveAuthUserCredential(res);
              })
              .catch((error) => {
                dispatch(setInfoModal(true, error.message));
              });
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View
              style={{
                height: "80%",
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
                gap: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 40,
                  fontWeight: "bold",
                }}
              >
                Login
              </Text>
              {textInputValue.map((item) => {
                return (
                  <TextInput
                    style={{
                      width: "100%",
                      height: 40,
                      borderColor: "gray",
                      borderWidth: 2,
                      borderRadius: 10,
                      paddingHorizontal: 10,
                    }}
                    key={item.name}
                    onChangeText={handleChange(item.name)}
                    onBlur={handleBlur(item.name)}
                    value={
                      item.name === "email" ? values.email : values.password
                    }
                    placeholder={item.placeholder}
                    secureTextEntry={item.name === "email" ? false : true}
                  />
                );
              })}

              <View
                style={{
                  width: "100%",
                  gap: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    height: 40,
                    backgroundColor: "#1F883D",
                    borderRadius: 10,
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    handleSubmit();
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 25,
                      color: "#fff",
                    }}
                  >
                    Login
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    textAlign: "center",
                    color: "#025e6e",
                  }}
                >
                  Para caso de nao ter a conta, clica em:
                </Text>
                <TouchableOpacity
                  style={{
                    height: 40,
                    borderRadius: 10,
                    justifyContent: "center",
                    backgroundColor: "#e6eef0",
                  }}
                  onPress={() => {
                    handleSubmit();
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 20,
                      color: "#000",
                      fontWeight: "700",
                    }}
                  >
                    Cadastrar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
}
