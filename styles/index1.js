import { StyleSheet } from 'react-native';

const STYLES = StyleSheet.create({
  inputContainer: { flexDirection: 'row' },
  input: {
    color: "#a5a5a5",
    paddingLeft: 30,
    borderBottomWidth: 1,
    borderColor: "#a5a5a5",
    borderBottomWidth: 0.3,
    flex: 1,
    fontSize: 18,
  },
  inputIcon: { marginTop: 12, marginLeft: 13, position: 'absolute' },
  btnPrimary: {
    backgroundColor: "#28388f",
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 29,
  },

  btnSecondary: {
    height: 40,
    borderWidth: 1,
    borderColor: '#a5a5a5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    flex: 1,
    flexDirection: 'row',
  },
  textInput:
  {
    color: '#a5a5a5',
    marginLeft: 28
  },
  btnImage: { width: 23, height: 30 },

  line: { height: 1, width: 30, backgroundColor: '#a5a5a5' },
});

export default STYLES;
