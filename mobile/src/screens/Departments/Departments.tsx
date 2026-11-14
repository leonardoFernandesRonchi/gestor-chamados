import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCompany } from "@src/hooks/useCompany";

const Departments = () => {
  const { company } = useCompany();

  const departments = company?.company_to_show?.departments ?? [];

  const icons = ["code-slash", "trending-up", "people"];

  const colors = ["#5EEAC0", "#1E293B", "#1E293B"];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Cabeçalho */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Departments</Text>
          <Text style={styles.subtitle}>Manage organizational structure</Text>
        </View>

        <Pressable
          style={styles.addButton}
          onPress={() => {
            // Adicione aqui a navegação para criar departamento
          }}
        >
          <Ionicons name="add" size={25} color="#FFFFFF" />
        </Pressable>
      </View>

      {/* Lista de departamentos */}
      <View style={styles.departmentList}>
        {departments.map((department, index) => {
          const members = department.users ?? [];

          return (
            <View key={department.id} style={styles.departmentCard}>
              <View style={styles.cardTop}>
                <View style={styles.departmentInfo}>
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: colors[index % colors.length] },
                    ]}
                  >
                    <Ionicons
                      name={icons[index % icons.length] as any}
                      size={21}
                      color={index === 0 ? "#087F65" : "#FFFFFF"}
                    />
                  </View>

                  <View style={styles.departmentTexts}>
                    <Text style={styles.departmentName}>{department.name}</Text>

                    <Text style={styles.departmentDescription}>
                      {department.description ?? "Department"}
                    </Text>
                  </View>
                </View>

                <Pressable style={styles.moreButton}>
                  <Ionicons
                    name="ellipsis-vertical"
                    size={18}
                    color="#64748B"
                  />
                </Pressable>
              </View>

              {/* Rodapé do card */}
              <View style={styles.cardBottom}>
                <View style={styles.membersAvatars}>
                  {members.slice(0, 3).map((member: any, i: number) => (
                    <View
                      key={member.id ?? i}
                      style={[styles.avatar, { marginLeft: i === 0 ? 0 : -8 }]}
                    >
                      <Text style={styles.avatarText}>
                        {member.name?.charAt(0)?.toUpperCase() ?? "?"}
                      </Text>
                    </View>
                  ))}

                  {members.length > 3 && (
                    <View style={[styles.avatar, styles.extraAvatar]}>
                      <Text style={styles.extraAvatarText}>
                        +{members.length - 3}
                      </Text>
                    </View>
                  )}
                </View>

                <Text style={styles.memberCount}>{members.length} Members</Text>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Departments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F3F6",
  },

  content: {
    paddingHorizontal: 10,
    paddingTop: 12,
    paddingBottom: 30,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  title: {
    fontSize: 21,
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    fontSize: 12,
    color: "#8491A5",
    marginTop: 3,
  },

  addButton: {
    width: 42,
    height: 42,
    backgroundColor: "#071C30",
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },

  departmentList: {
    gap: 10,
  },

  departmentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 9,
    padding: 11,
    minHeight: 86,
    justifyContent: "space-between",
    elevation: 1,
  },

  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  departmentInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  iconContainer: {
    width: 39,
    height: 39,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 9,
  },

  departmentTexts: {
    flex: 1,
  },

  departmentName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  departmentDescription: {
    fontSize: 11,
    color: "#8491A5",
    marginTop: 2,
  },

  moreButton: {
    paddingHorizontal: 5,
    paddingVertical: 4,
  },

  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 9,
  },

  membersAvatars: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 23,
    height: 23,
    borderRadius: 15,
    backgroundColor: "#CBD5E1",
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 9,
    fontWeight: "700",
    color: "#334155",
  },

  extraAvatar: {
    backgroundColor: "#E2E8F0",
    marginLeft: -5,
    width: 25,
  },

  extraAvatarText: {
    fontSize: 9,
    color: "#64748B",
    fontWeight: "600",
  },

  memberCount: {
    fontSize: 10,
    fontWeight: "700",
    color: "#071C30",
  },
});
