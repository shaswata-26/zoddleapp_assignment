import { useState } from "react";
import { View, Alert } from "react-native";
import { Link, router } from "expo-router";
import AuthForm from "../../components/AuthForm";
import { auth, db } from "../../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// Define the user data interface
interface UserData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export default function Register() {
  const [loading, setLoading] = useState<boolean>(false);

  const handleRegister = async (email: string, password: string, userData: UserData): Promise<void> => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save additional user data
      await setDoc(doc(db, "users", user.uid), {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        createdAt: new Date(),
      });

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
        type="register"
        onSubmit={handleRegister}
        loading={loading}
      />
      <Link href="/(auth)/login" style={{ textAlign: "center", marginTop: 20, color: "blue" }}>
        Already have an account? Login here
      </Link>
    </View>
  );
}