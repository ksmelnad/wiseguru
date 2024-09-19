import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";

import Colors from "../../constants/Colors";
import { Link, Stack } from "expo-router";
import { supabase } from "@/lib/supabase";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Sign in", headerShown: false }} />

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 30, color: "white" }}>
          Welcome to Wise Guru
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder=""
          style={styles.input}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder=""
          style={styles.input}
          secureTextEntry
        />

        <Pressable
          onPress={isRegistered ? signInWithEmail : signUpWithEmail}
          disabled={loading}
          style={{
            padding: 8,
            alignItems: "center",
            borderRadius: 8,
            backgroundColor: "lemonchiffon",
          }}
        >
          <Text>{isRegistered ? "Sign in" : "Register"}</Text>
        </Pressable>

        <Pressable
          onPress={
            !isRegistered
              ? () => setIsRegistered(true)
              : () => setIsRegistered(false)
          }
        >
          <Text style={styles.textButton}>
            {!isRegistered
              ? "Already have an account?"
              : "Don't have an account?"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "teal",
    padding: 20,
    justifyContent: "center",
  },
  label: {
    color: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 5,
  },
  textButton: {
    alignSelf: "center",
    // fontWeight: "bold",
    textDecorationLine: "underline",
    color: "white",
    marginVertical: 10,
  },
});

export default SignInScreen;
