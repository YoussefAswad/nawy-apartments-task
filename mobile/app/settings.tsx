import { useContext } from "react";
import { urlContext } from "./_layout";
import { TextInput, View, Text } from "react-native";
import { Stack } from "expo-router";

export default function Settings() {
  const { url, setUrl } = useContext(urlContext);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: 20,
      }}
    >
      <Stack.Screen options={{ title: "Settings" }} />
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginBottom: 20,
          gap: 10,
        }}
      >
        <Text>API URL</Text>
        <TextInput
          placeholder="API URL"
          style={{
            padding: 10,
            width: "100%",
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 10,
          }}
          onChangeText={setUrl}
          value={url}
        />
      </View>
    </View>
  );
}
