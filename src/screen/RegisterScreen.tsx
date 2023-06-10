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
import InfoModal from "../components/modal/InfoModal";
import { login } from "../../services/auth";
import { saveAuthUserCredential } from "../../services/storage";
import { setProblem } from "../../store/slice/Content.slice";
import { useDispatch } from "react-redux";

export default function RegisterScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
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
      type: "text",
    },
    {
      name: "userName",
      placeholder: "UserName",
      type: "text",
    },
    {
      name: "password",
      placeholder: "Senha",
      type: "password",
    },
    {
      name: "confirm_password",
      placeholder: "Confirma a Senha",
      type: "password",
    },
  ];

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
          initialValues={{
            email: "",
            password: "",
            userName: "",
            confirm_password: "",
          }}
          onSubmit={(values) => {
            login(values.email, values.password)
              .then((res) => {
                console.log("logado", res);
                saveAuthUserCredential(res);
              })
              .catch((error) => {
                dispatch(setProblem({ visible: true, message: error.message }));
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
                Cadastro
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
                    //@ts-ignore
                    value={() => {
                      if (item.name === "email") {
                        return values.email;
                      } else if (item.name === "password") {
                        return values.password;
                      } else if (item.name === "userName") {
                        return values.userName;
                      } else {
                        return values.confirm_password;
                      }
                    }}
                    placeholder={item.placeholder}
                    secureTextEntry={
                      item.name === "password" ||
                      item.name === "confirm_password"
                        ? true
                        : false
                    }
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
                    Cadastrar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
        <InfoModal />
      </View>
    </SafeAreaView>
  );
}
