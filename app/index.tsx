import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Link, Redirect, router, Stack } from "expo-router";
import { supabase } from "@/lib/supabase";
import { Button } from "react-native-elements";
import { useAuth } from "@/providers/AuthProvider";

const index = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href={"/sign-in"} />;
  }
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        gap: 10,
      }}
    >
      <Stack.Screen options={{ title: "Sign up", headerShown: false }} />
      <Text
        style={{ alignItems: "center", justifyContent: "center", fontSize: 30 }}
      >
        Welcome to Wise Guru
      </Text>
      <Text>{session.user.email}</Text>

      <Button title="Sign out" onPress={() => supabase.auth.signOut()}></Button>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
