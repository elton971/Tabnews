import { View, Text, Modal } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import styled from "styled-components/native";

const InfoModal = () => {
  const { visible, message } = useSelector(
    (state: RootState) => state.content.infoModal
  );
  return (
    <>
      <Modal
        visible={visible}
        animationType="fade"
        transparent
        hardwareAccelerated
        statusBarTranslucent
      >
        <Background>
          <Row>
            <Container style={{ elevation: 2 }}>
              <Text>{message}</Text>
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
