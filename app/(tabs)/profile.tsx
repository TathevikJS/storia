import { StyleSheet, View } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>{/* Add your profile content here */}</View>
  );
}

export const options = {
  title: "Profile",
  // tabBarIcon: ({ color, focused }) => (
  //   <IconSymbol size={28} name="person.fill" color={color} />
  // ),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
