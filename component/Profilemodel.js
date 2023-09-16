import { useContext, useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Icon from "./Icon";
import { AuthContext } from "../context/Message";
import colors from "../config/colors";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";

const Profilemodel = () => {
  const navigation = useNavigation();
  const { modalVisible, setModalVisible } = useContext(AuthContext);
  const profile = () => {
    auth.signOut().then(() => {
      navigation.navigate("Login");
    });
  };

  // alert function
  const createAlert = () =>
    Alert.alert("Logout", "Are you sure want to logout?", [
      {
        text: "No",
        style: "cancel",
        onPress: () => setModalVisible(!modalVisible),
      },
      { text: "Yes", onPress: () => profile() },
    ]);
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
          TouchableOpacity
          onPress={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.centeredView}>
            <View style={styles.midView}>
              <View>
                <Icon
                  name="caret-up-outline"
                  size={100}
                  style={[
                    styles.modalText,
                    { top: -41, fontSize: 65, color: colors.Grey },
                  ]}
                />
                <Image
                  source={{ uri: auth?.currentUser?.photoURL }}
                  style={styles.img}
                />
                <Text style={[styles.modalText, { top: 31, left: "28%" }]}>
                  {auth?.currentUser?.displayName}
                </Text>
                <Text style={[styles.modalText, { top: 55, left: "28%" }]}>
                  {auth?.currentUser?.email}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.SubmitButtonStyle}
                onPress={createAlert}
              >
                <Text
                  style={[
                    styles.modalText,
                    {
                      color: colors.Vivid_red,
                      left: "15.7%",
                      fontSize: 18,
                      alignItems: "center",
                      top: 6,
                    },
                  ]}
                >
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <ImageBackground
          source={{ uri: auth?.currentUser?.photoURL }}
          style={{ width: 40, height: 40 }}
          imageStyle={{ borderRadius: 25 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Profilemodel;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    marginTop: 50,
    marginLeft: 5,
  },
  midView: {
    backgroundColor: colors.Grey,
    marginTop: 29,
    marginLeft: 0.5,
    marginRight: 6.3,
    height: 150,
    borderRadius: 20,
    shadowColor: "rgb(69 65 78 / 20%)",
    elevation: 6,
    shadowOpacity: 0.25,
  },

  img: {
    height: 50,
    borderRadius: 40,
    marginBottom: 10,
    width: 50,
    marginTop: 30,
    marginLeft: 30,
  },

  modalText: {
    fontSize: 16,
    color: colors.white,
    textAlign: "center",
    position: "absolute",
  },
  SubmitButtonStyle: {
    top: 100,
    position: "absolute",
    width: 98,
    height: 37.5,
    left: "8%",
    backgroundColor: colors.white,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: colors.Grey,
    elevation: 2,
  },
});
