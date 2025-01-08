import React, { useEffect } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";

export default function RootRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Use a short delay (0ms) so the Root Layout is mounted first
    const id = setTimeout(() => router.replace("/login"), 0);
    return () => clearTimeout(id);
  }, [router]);

  return <View />;
}
