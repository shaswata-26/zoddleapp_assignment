import { Stack } from "expo-router";
import { useAuth } from "../hooks/useAuth";
import Loading from "../components/Loading";

export default function RootLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="(tabs)" />
      ) : (
        <Stack.Screen name="(auth)" />
      )}
    </Stack>
  );
}