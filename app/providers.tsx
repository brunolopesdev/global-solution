// app/providers.tsx
"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { APIProvider } from '@vis.gl/react-google-maps'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <APIProvider apiKey="AIzaSyDY_L51Oi5DxPJbOat6jbAiXyXA-ibtfqA">
      <ChakraProvider>{children}</ChakraProvider>
    </APIProvider>
  );
}
