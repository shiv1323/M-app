import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { firebase } from "@firebase/app";
import colors from "../config/colors";

const ForgotModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const auth = firebase.auth();

  const resetPassword = () => {
    if (email !== null) {
      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          alert("suucessfully send");
          setEmail("");
          setModalVisible(false);
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            // HEY
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Reset Your Password </Text>
              <Text style={styles.modalText}>
                Enter your email address and we’ll send you a link to reset your
                password.
              </Text>
              {/* form */}
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Your e-mail"
                  autoCapitalize="none"
                  autoCompleteType="email"
                  keyboardType="email-address"
                  keyboardAppearance="dark"
                  returnKeyType="next"
                  returnKeyLabel="next"
                  autoFocus
                  value={email}
                  onChangeText={setEmail}
                />
                <TouchableOpacity
                  style={styles.SubmitButtonStyle}
                  onPress={() => resetPassword()}
                >
                  <Text style={styles.TextStyle}> SUBMIT </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Text
                  style={[
                    styles.modalText,
                    { marginTop: 30, fontWeight: "bold" },
                  ]}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text
          style={{
            color: colors.radicalRed,
            fontWeight: "bold",
            fontSize: 18,
            marginBottom: 12,
            marginLeft: 8,
            marginTop: 12,
          }}
        >
          Forget password
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.Grey,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: colors.dogerBlueBackground,
  },
  textStyle: {
    color: colors.white,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: colors.white,
    fontWeight: "400",
    fontSize: 14,
  },
  input: {
    width: 250,
    height: 40,
    backgroundColor: colors.lightgrey,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 28,
    fontSize: 16,
    color: colors.white,
    fontWeight: "600",
  },
  SubmitButtonStyle: {
    marginTop: 10,
    paddingTop: 10,
    height: 50,
    backgroundColor: colors.dogerBlueBackground,
    borderRadius: 28,
    borderWidth: 1,
    elevation: 2,
  },

  TextStyle: {
    color: colors.white,
    fontSize: 20,
    textAlign: "center",
  },
});
