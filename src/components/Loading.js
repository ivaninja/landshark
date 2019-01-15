import React, { Component } from "react";
import { View, Platform } from "react-native";
import { Spinner } from "native-base";
import Modal from "react-native-modal";
import LottieView from 'lottie-react-native';
import { required } from "../validation";

function Loading() {
  if(Platform.OS !== "android") {
    return (
      <Spinner size="large" color="red"/>
    )
  }

  return (
    <Modal
      animationType={"none"}
      isVisible={true}
      hideModalContentWhileAnimating={true}
      useNativeDriver={true}
    >
      <View
        style={{
          width: "100%",
          height: "30%",
          backgroundColor: "#fff",
          marginLeft: "auto",
          marginRight: "auto"
        }}
      >
        <LottieView 
          source={require("../../assets/material_loader.json")}
          autoPlay={true}
        />
      </View>
    </Modal>
  );
}
export default Loading;
