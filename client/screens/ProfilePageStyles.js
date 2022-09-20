import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // margin: 30,
    padding: 30,
    backgroundColor: "#fff",
    // justifyContent: "space-between",
  },
  pageTitle: {
    fontSize: 36,
    fontWeight: "bold",
  },
  topUserInfo: {
    justifyContent: "center",
    textAlign: "center",
  },
  topUserInfoImage: {
    width: 150,
    height: 150,
    borderWidth: 1,
    borderColor: "#000",
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  topUserInfoName: {
    marginTop: 10,
    fontSize: 20,
  },
  topUserInfoLocation: {
    marginTop: 10,
    fontSize: 16,
  },
  aboutTitle: {
    fontSize: 21,
    color: "#EB5757",
    marginBottom: 20,
  },
  inputTitles: {
    fontSize: 14,
    color: "#898989",
    marginBottom: 10,
  },
  inputInfo: {
    fontSize: 14,
    marginBottom: 15,
  },
  inputContainers: {
    borderBottomWidth: 1,
    borderColor: "#E0DCDC",
    marginTop: 5,
    marginBottom: 5,
  },
  boxOne: {
    // borderColor: "#000",
    // borderWidth: 2,
    marginBottom: 50,
  },
  boxTwo: {
    // borderColor: "#000",
    // borderWidth: 2,
    // top: -50,
  },
});

export default styles;
