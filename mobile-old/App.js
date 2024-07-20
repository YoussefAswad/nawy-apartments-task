import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View, Pressable } from "react-native";
import React from "react";
import Button from "./components/Button";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

function AppContent() {
  const [text, onChangeText] = React.useState("");

  const { data, isError, error, isPending } = useQuery({
    queryKey: ["apartments"],
    queryFn: getData,
  });

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TextInput
          placeholder="Search"
          //style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          onChangeText={onChangeText}
          value={text}
        />
        <Button label="Add" />
      </View>

      {isPending && <Text>Loading...</Text>}

      {isError && <Text>Error: {error.message}</Text>}

      {data && (
        <View>
          {data.map((apartment) => (
            <Text key={apartment.id}>{apartment.title}</Text>
          ))}
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    padding: 20,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  topBar: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
    gap: 10,
  },
});

async function getData() {
  const res = await fetch(`http://192.168.1.51:8000/apartments`);

  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function addApartment(data) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/apartments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
