import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";

interface AuthFormProps {
  type: "login" | "register";
  onSubmit: (email: string, password: string, userData?: any) => void;
  onGoogleAuth?: () => void;
  loading: boolean;
}

interface UserData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export default function AuthForm({ type, onSubmit, onGoogleAuth, loading }: AuthFormProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const handleSubmit = (): void => {
    if (type === "register") {
      const userData: UserData = { name, email, phone, address };
      onSubmit(email, password, userData);
    } else {
      onSubmit(email, password);
    }
  };

  return (
    <View>
      {type === "register" && (
        <>
          <TextInput
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            style={styles.input}
          />
          <TextInput
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
            multiline
            style={[styles.input, styles.addressInput]}
          />
        </>
      )}

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity
        onPress={handleSubmit}
        disabled={loading}
        style={[styles.button, loading && styles.buttonDisabled]}
      >
        <Text style={styles.buttonText}>
          {type === "login" ? "Login" : "Create Account"}
        </Text>
      </TouchableOpacity>

      {type === "login" && onGoogleAuth && (
        <TouchableOpacity
          onPress={onGoogleAuth}
          disabled={loading}
          style={[styles.googleButton, loading && styles.buttonDisabled]}
        >
          <Text style={styles.buttonText}>
            Login with Google
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "white",
  },
  addressInput: {
    height: 80,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  googleButton: {
    backgroundColor: "#DB4437",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});