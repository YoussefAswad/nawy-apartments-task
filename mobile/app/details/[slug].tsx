import { Apartment } from "@/types/Apartment.type";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";

import { Text, View } from "react-native";
import { urlContext } from "../_layout";
import { useContext } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default function Page() {
  const { slug } = useLocalSearchParams();

  const { url } = useContext(urlContext);
  const {
    data: item,
    error,
    isPending,
  } = useQuery({
    queryKey: ["apartment", slug],
    queryFn: () =>
      getApartmentDetails({
        id: parseInt(slug as string, 10),
        url: url as string,
      }),
  });

  if (isPending) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Stack.Screen options={{ title: item?.title }} />

      <View
        key={item?.id}
        style={{
          padding: 10,
          width: "100%",
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
            currency: item?.currency,
          }).format(item?.price as number)}
        </Text>
        <Text>{item?.title}</Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginTop: 10,
          }}
        >
          <FontAwesome name="location-arrow" size={15} color="black" />
          <Text>{item?.location}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            columnGap: 20,
            rowGap: 10,
            marginHorizontal: 20,

            flexWrap: "wrap",
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
            <Text>{item?.bed_rooms} Room(s)</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <FontAwesome name="bath" size={15} color="black" />
            <Text>{item?.bath_rooms} Bathroom(s)</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <FontAwesome name="expand" size={15} color="black" />
            <Text>{item?.area} m²</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <FontAwesome name="building" size={15} color="black" />
            <Text>Floor {item?.floor}</Text>
          </View>
        </View>
        {item?.details.description && item?.details.description.length > 0 && (
          <View>
            <Text
              style={{
                marginTop: 10,
                fontSize: 20,
              }}
            >
              Desciption
            </Text>
            <Text style={{ marginHorizontal: 20, marginVertical: 10 }}>
              {item?.details.description}
            </Text>
          </View>
        )}
        <View>
          <Text
            style={{
              marginTop: 10,
              fontSize: 20,
            }}
          >
            Contact
          </Text>
          <View
            style={{
              marginHorizontal: 20,
              marginVertical: 10,
              flexDirection: "column",
              gap: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <MaterialIcons name="perm-contact-cal" size={20} color="black" />
              <Text>{item?.details.contact_person}</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <MaterialIcons name="phone" size={20} color="black" />
              <Text>{item?.details.contact_phone}</Text>
            </View>
            {item?.details.contact_email && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <MaterialIcons name="email" size={20} color="black" />
                <Text>{item?.details.contact_email}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

async function getApartmentDetails({ id, url }: { id: number; url: string }) {
  const res = await fetch(`${url}/apartments/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json() as Promise<Apartment>;
}
