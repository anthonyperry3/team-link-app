import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    margin: 30,
  },
  mainText: {
    paddingTop: 400,
    fontSize: 70,
    textAlign: "left",
    fontWeight: "bold",
  },
  subText: {
    fontSize: 24,
    textAlign: "left",
  },
  joinButton: {
    backgroundColor: "#000000",
    borderRadius: 30,
    width: 281,
    height: 62,
    marginTop: 50,
    justifyContent: "center",
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 36,
  },
  circlesImage: {
    width: 543,
    height: 713,
    position: "absolute",
    zIndex: -1,
    left: 85,
    top: -254.28,
    transform: [{ rotate: "140deg" }],
  },
});

export default styles;
