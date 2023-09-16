import { StyleSheet } from "react-native";
import colors from "../config/colors";
import { block } from "react-native-reanimated";

const STYLES = StyleSheet.create({
  inputContainer: { flexDirection: "row" },
  input: {
    color: colors.lightgrey,
    paddingLeft: 30,
    borderBottomWidth: 1,
    borderColor: colors.lightgrey,
    borderBottomWidth: 0.3,
    flex: 1,
    fontSize: 18,
  },
  inputIcon: { marginTop: 12, marginLeft: 13, position: "absolute" },
  btnPrimary: {
    backgroundColor: colors.Dark_blue,
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },

  btnSecondary: {
    height: 50,
    borderWidth: 1,
    backgroundColor: colors.google,
    borderColor: "none",
    alignItems: "center",
    lineHeight: 48,
    borderRadius: 1,
    flex: 1,
    width: "100%",
    flexDirection: "row",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  textInput: {
    color: colors.lightgrey,
    marginLeft: 28,
  },
  btnImage: {
    width: 48,
    height: 48,
    marginTop: 1,
    marginLeft: 1,
    borderRadius: 1,
  },

  line: { height: 1, width: 30, backgroundColor: colors.lightgrey },
});

export default STYLES;
