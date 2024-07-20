import Button from "@/components/Button";
import { Apartment } from "@/types/Apartment.type";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { urlContext } from "./_layout";

export default function Index() {
  const [search, setSearch] = React.useState("");
  const queryClient = useQueryClient();

  const { url } = useContext(urlContext);
  const { data, isError, error, isPending } = useQuery({
    queryKey: ["apartments"],
    queryFn: () => getData(url as string),
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Stack.Screen options={{ title: "Apartments" }} />
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
        <TextInput
          placeholder="Search"
          style={{
            padding: 10,
            width: "100%",
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 10,
          }}
          onChangeText={setSearch}
          value={search}
        />
        <Link href="/add" asChild>
          <Button label="Add" onPress={() => {}} />
        </Link>
      </View>
      <ScrollView style={{ width: "100%" }}>
        <View
          style={{ flex: 1, width: "100%", flexDirection: "column", gap: 10 }}
        >
          {isPending && <Text>Loading...</Text>}
          {data
            ?.filter((apartment) => {
              return (
                apartment.title.toLowerCase().includes(search.toLowerCase()) ||
                apartment.location.toLowerCase().includes(search.toLowerCase())
              );
            })
            .map((item: any) => (
              <Link key={item.id} href={`/details/${item.id}`} asChild>
                <Pressable>
                  <View
                    key={item.id}
                    style={{
                      padding: 10,
                      width: "100%",
                      borderColor: "gray",
                      backgroundColor: "#fff",
                      borderWidth: 1,
                      borderRadius: 5,
                      paddingHorizontal: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                      }}
                    >
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: item.currency,
                      }).format(item.price)}
                    </Text>
                    <Text>{item.title}</Text>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                        marginTop: 10,
                      }}
                    >
                      <FontAwesome
                        name="location-arrow"
                        size={15}
                        color="black"
                      />
                      <Text>{item.location}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 10,
                        gap: 30,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <FontAwesome name="bed" size={15} color="black" />
                        <Text>{item.bed_rooms}</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <FontAwesome name="bath" size={15} color="black" />
                        <Text>{item.bath_rooms}</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <FontAwesome name="expand" size={15} color="black" />
                        <Text>{item.area} m²</Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
              </Link>
            ))}
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <Pressable
          onPress={() => {
            queryClient.invalidateQueries({
              queryKey: ["apartments"],
            });
            queryClient.invalidateQueries({
              queryKey: ["apartment"],
            });
          }}
        >
          <Text>Refresh</Text>
        </Pressable>
        <Link href="/settings" asChild>
          <Pressable>
            <Text>Settings</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

async function getData(url: string) {
  const res = await fetch(`${url}/apartments`);

  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json() as Promise<Apartment[]>;
}
