import React from "react";
import { Link } from "expo-router";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const menuItems: { id: string; name: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { id: "1", name: "Хяналтын самбар", icon: "home-outline" },
  { id: "2", name: "Гэрийн даалгавар", icon: "book-outline" },
  { id: "3", name: "Ирцийн мэдээлэл", icon: "calendar-outline" },
  { id: "4", name: "Төлбөрийн мэдээлэл", icon: "cash-outline" },
  { id: "5", name: "Шалгалт", icon: "clipboard-outline" },
  { id: "6", name: "Дүнгийн хуудас", icon: "document-text-outline" },
  { id: "7", name: "Календарь", icon: "calendar-number-outline" },
  { id: "8", name: "Мэдэгдлийн самбар", icon: "notifications-outline" },
  { id: "9", name: "Хувийн мэдээлэл", icon: "person-outline" }
];


const MenuScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }: { item: { id: string; name: string; icon: keyof typeof Ionicons.glyphMap } }) => (
    <Link href={"/home"} style={styles.menuItem}>
      <View style={styles.menuIcon}>
        <Ionicons name={item.icon} size={30} color="#822321" />
      </View>
      <Text style={styles.menuText}>{item.name}</Text>
    </Link>
  );

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../../assets/images/profile.jpg')}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.userName}>Болд-Эрдэнэ Ган-Эрдэнэ</Text>
            <Text style={styles.userClass}>se401</Text>
          </View>
        </View>
        <Link href={'/home'}>
          <Ionicons name="close" size={28} color="white" />
        </Link>
      </View>

      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.menuGrid}
      />

      <Link href={'/'} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#822321",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  userClass: {
    fontSize: 14,
    color: "white",
    opacity: 0.8,
  },
  menuGrid: {
    width:"100%", 
    alignItems: "center",
  },
  menuItem: {
    width: "30%",
    alignItems: "center",
    marginVertical: 15,
  },
  menuIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  menuText: {
    fontSize: 14,
    color: "white",
    textAlign: "center"
  },
  logoutButton: {
    alignSelf: "center",
  },
  logoutText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});

export default MenuScreen;
