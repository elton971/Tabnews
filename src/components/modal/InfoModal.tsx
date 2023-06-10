import { View, Text, Modal, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import styled from "styled-components/native";
import { setProblemClose } from "../../../store/slice/Content.slice";

const InfoModal = () => {
  const dispatch = useDispatch();
  const visible = useSelector(
    (state: RootState) => state.content.infoModal.visible
  );

  const message = useSelector(
    (state: RootState) => state.content.infoModal.message
  );

  return (
    <>
      <Modal
        visible={visible}
        animationType="slide"
        transparent
        hardwareAccelerated
        statusBarTranslucent
      >
        <Background>
          <Row>
            <Container style={{ elevation: 2 }}>
              <View
                style={{
                  height: 300,
                }}
              >
                <View>
                  <Image
                    source={require("../../../assets/error.jpg")}
                    resizeMode="contain"
                    style={{ width: "100%", height: 200 }}
                  />
                </View>
                <Text style={{ textAlign: "center", fontSize: 30 }}>Ops</Text>
                <Text>{message}</Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: "red",
                    padding: 10,
                    marginTop: 10,
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    dispatch(setProblemClose(false));
                  }}
                >
                  <Text
                    style={{ textAlign: "center", fontSize: 30, color: "#fff" }}
                  >
                    Fechar
                  </Text>
                </TouchableOpacity>
              </View>
            </Container>
          </Row>
        </Background>
      </Modal>
    </>
  );
};

export default InfoModal;

const Background = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #0005;
`;

const Container = styled.View`
  flex: 1;
  background-color: white;
  border-radius: 12px;
  padding: 16px;
  justify-content: center;
  margin: 10px 16px;
  align-items: center;
`;

const Row = styled.View`
  flex-direction: row;
`;
