import * as React from "react";
import { Text, Button, View, StyleSheet } from "react-native";
import Constants from "expo-constants";

// or any pure javascript modules available in npm
import { Box } from "./components/Box";

const Tox = () => {
  return (
    <View
      style={{
        width: 50,
        height: 50,
        backgroundColor: "pink",
        borderColor: "black",
        borderWidth: 2,
      }}
    />
  );
};

export default function App() {
  const [style, setStyle] = React.useState({ justifyContent: "flex-start" });
  const ref = React.useRef();
  const [refIsSet, setRefIsSet] = React.useState(false);
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{style.justifyContent}</Text>
      <View
        ref={ref}
        onLayout={() => {
          setRefIsSet();
        }}
        style={[styles.container, style]}
      >
        <Box number={1} parentRef={ref.current} />
        <Box number={2} parentRef={ref.current} />
        <Box number={3} parentRef={ref.current} />
        <Box number={4} parentRef={ref.current} />
      </View>
      <Button
        onPress={() => {
          setStyle({ justifyContent: "flex-start" });
        }}
        title="flex-start"
      />
      <Button
        onPress={() => {
          setStyle({ justifyContent: "flex-end" });
        }}
        title="flex-end"
      />
      {/* <Button
        onPress={() => {
          setStyle({ justifyContent: "space-between" });
        }}
        title="space-between"
      /> */}
      <Button
        onPress={() => {
          setStyle({ justifyContent: "space-evenly" });
        }}
        title="space-evenly"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 200,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    padding: 8,
    height: 40,
    width: "100%",
  },
  text: {
    fontSize: 20,
    alignSelf: "center",
  },
});
