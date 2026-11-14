import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useCompany } from "@src/hooks/useCompany";
import Card from "@src/components/Card";
import Colors from "@src/constants/colors";
import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "node_modules/@react-navigation/native-stack/lib/typescript/src/types";
import { AppRoutesProps } from "@src/navigation/AppRoutes";

const Users = () => {
  type navigationProps = NativeStackNavigationProp<AppRoutesProps>;

  const navigation = useNavigation<navigationProps>();

  const { company, loading, fetchCompany } = useCompany();
  const [search, setSearch] = useState("");

  const users = company?.users?.data ?? [];

  const filteredUsers = users?.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleNavigate = () => {
    navigation.navigate("CreateUser");
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();

  const getAvatarColor = (status: string) =>
    status === "owner" ? "#00785A" : "#07182A";

  const getStatusColor = (status: string) =>
    status === "owner" ? "#20364F" : "#E0E3E7";

  const getStatusTextColor = (status: string) =>
    status === "owner" ? "#FFFFFF" : "#374151";

  return (
    <View style={{ flex: 1, backgroundColor: "#F1F3F6" }}>
      {/* Header */}
      <View
        style={{
          height: 60,
          paddingHorizontal: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#F7F9FC",
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#07182A" }}>
          Users
        </Text>

        <Ionicons name="menu" size={28} color="#07182A" />
      </View>

      {/* Search */}
      <View
        style={{
          margin: 14,
          height: 48,
          backgroundColor: "#E1E4E8",
          borderRadius: 12,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
        }}
      >
        <Ionicons name="search" size={20} color="#7B8490" />

        <TextInput
          placeholder="Search employes..."
          value={search}
          onChangeText={setSearch}
          style={{
            flex: 1,
            marginLeft: 10,
            fontSize: 16,
          }}
        />
      </View>

      {/* Users */}
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 14,
          paddingBottom: 100,
        }}
      >
        {loading ? (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Loading users...
          </Text>
        ) : filteredUsers.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Nenhum usuário encontrado.
          </Text>
        ) : (
          filteredUsers.map((user) => (
            <Card
              key={user.id}
              style={{
                backgroundColor: "#FFFFFF",
                height: 82,
                marginTop: 0,
                marginBottom: 10,
                padding: 16,
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {/* Avatar */}
              {user.avatar_url ? (
                <Image
                  source={{
                    uri: user.avatar_url.startsWith("http")
                      ? user.avatar_url
                      : `http://SEU_IP:3000${user.avatar_url}`,
                  }}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 10,
                    marginRight: 14,
                  }}
                />
              ) : (
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 10,
                    backgroundColor: getAvatarColor(user.status),
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 14,
                  }}
                >
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 22,
                      fontWeight: "bold",
                    }}
                  >
                    {getInitials(user.name)}
                  </Text>
                </View>
              )}

              {/* Name and email */}
              <View style={{ flex: 1 }}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#07182A",
                  }}
                >
                  {user.name}
                </Text>

                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 13,
                    color: "#64748B",
                    marginTop: 2,
                  }}
                >
                  {user.email}
                </Text>
              </View>

              {/* Status badge */}
              <View
                style={{
                  backgroundColor: getStatusColor(user.status),
                  paddingHorizontal: 12,
                  paddingVertical: 5,
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 11,
                    color: getStatusTextColor(user.status),
                  }}
                >
                  {user.status === "owner" ? "Owner" : "User"}
                </Text>
              </View>
            </Card>
          ))
        )}
      </ScrollView>

      {/* Add user button */}
      <View
        style={{
          position: "absolute",
          bottom: 24,
          right: 18,
          width: 56,
          height: 56,
          borderRadius: 14,
          backgroundColor: "#00785A",
          justifyContent: "center",
          alignItems: "center",
          elevation: 5,
        }}
      >
        <Pressable onPress={handleNavigate}>
          <Ionicons name="add" size={48} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
};

export default Users;
