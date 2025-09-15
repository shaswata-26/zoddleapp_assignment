import { useState } from "react";
import { View, Alert } from "react-native";
import { Link, router } from "expo-router";
import AuthForm from "../../components/AuthForm";
import { auth } from "../../services/firebase";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default function Login() {
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/(tabs)/Welcome");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (): Promise<void> => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.replace("/(tabs)/Welcome");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <AuthForm
        type="login"
        onSubmit={handleLogin}
        onGoogleAuth={handleGoogleLogin}
        loading={loading}
      />
      <Link href="/(auth)/register" style={{ textAlign: "center", marginTop: 20, color: "blue" }}>
        Don't have an account? Register here
      </Link>
    </View>
  );
}