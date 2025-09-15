import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { auth } from "@/services/firebase";
import { signOut } from "firebase/auth";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

export default function Welcome() {
  useEffect(() => {
    // Send welcome notification
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Welcome back!",
        body: "Thank you for logging in to our app.",
      },
      trigger: { seconds: 1 },
    });
  }, []);

  const handleLogout = async (): Promise<void> => {
    try {
      await signOut(auth);
      router.replace("/(auth)/login");
    } catch (error: any) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Thanks for Login!</Text>
      <Text style={styles.subText}>You have successfully logged in to the app.</Text>
      
      <TouchableOpacity
        onPress={handleLogout}
        style={styles.logoutButton}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#007AFF",
  },
  subText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
    color: "#666",
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    padding: 15,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  logoutButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});