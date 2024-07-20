import { AddFrom } from "@/components/AddForm";
import { Apartment } from "@/types/Apartment.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { View, Text, ScrollView } from "react-native";
import { router } from "expo-router";
import { useContext } from "react";
import { urlContext } from "./_layout";

export default function Add() {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: addApartment,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["apartments"],
      });
    },
  });

  const { url } = useContext(urlContext);

  const handleFormSubmit = (data: any) => {
    addMutation.mutate(
      {
        data: data,
        url: url as string,
      },
      {
        onSuccess: () => {
          // Navigate back to the list
          router.back();
        },
      },
    );
  };

  return (
    <ScrollView
      style={{
        padding: 20,
      }}
    >
      <Stack.Screen options={{ title: "Add Apartment" }} />
      <AddFrom
        onFormSubmit={handleFormSubmit}
        isPending={addMutation.isPending}
      />
      <Text>{addMutation.isError ? "Failed to add apartment" : ""}</Text>
    </ScrollView>
  );
}

async function addApartment({ data, url }: { data: Apartment; url: string }) {
  const res = await fetch(`${url}/apartments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json() as Promise<Apartment>;
}
