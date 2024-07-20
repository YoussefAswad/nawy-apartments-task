import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import React from "react";
import { createContext, useContext } from "react";

const queryClient = new QueryClient();

export const urlContext = createContext({
  url: process.env.EXPO_PUBLIC_API_URL,
  setUrl: (url: string) => {},
});

export default function RootLayout() {
  const [url, setUrl] = React.useState(process.env.EXPO_PUBLIC_API_URL);

  return (
    <urlContext.Provider
      value={{
        url,
        setUrl,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Stack></Stack>
      </QueryClientProvider>
    </urlContext.Provider>
  );
}
