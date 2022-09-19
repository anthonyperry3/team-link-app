import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // margin: 30,
    padding: 30,
    backgroundColor: "#fff",
    justifyContent: "space-between",
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
    marginTop: 60,
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
    marginBottom: 30,
  },
  inputTitles: {
    fontSize: 14,
    color: "#898989",
  },
  boxOne: {
    // borderColor: "#000",
    // borderWidth: 2,
  },
  boxTwo: {
    // borderColor: "#000",
    // borderWidth: 2,
  },
});

export default styles;
