import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

const devices = [
  { id: 1, name: "Fan", emoji: "🌀" },
  { id: 2, name: "Light Bulb", emoji: "💡" },
  { id: 3, name: "TV", emoji: "📺" },
  { id: 4, name: "Refrigerator", emoji: "🧊" },
  { id: 5, name: "Laptop", emoji: "💻" },
];

const RewardScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.trophyCircle}>
        <Text style={styles.trophyEmoji}>🏆</Text>
      </View>

      <Text style={styles.stars}>⭐ ⭐ ⭐ ⭐ ⭐</Text>

      <Text style={styles.title}>You Did It!</Text>
      <Text style={styles.subtitle}>All 5 electrical devices found! 🎉</Text>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>
          ⚡ Electrical Explorer Badge Earned!
        </Text>
      </View>

      <Text style={styles.sectionLabel}>Devices you found:</Text>

      {devices.map((device) => (
        <View key={device.id} style={styles.deviceRow}>
          <Text style={styles.deviceEmoji}>{device.emoji}</Text>
          <Text style={styles.deviceName}>{device.name}</Text>
          <Text style={styles.checkmark}>✓</Text>
        </View>
      ))}

      <View style={styles.factBox}>
        <Text style={styles.factTitle}>⚡ Fun Fact!</Text>
        <Text style={styles.factText}>
          All these devices use electricity to work! Electricity travels through
          wires at nearly the speed of light — 300,000 km per second!
        </Text>
      </View>

      <TouchableOpacity
        style={styles.playAgainBtn}
        onPress={() => navigation.navigate("Home", { foundList: [] })}
      >
        <Text style={styles.playAgainText}>🔄 Play Again!</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RewardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F2E",
  },
  content: {
    alignItems: "center",
    padding: 24,
    paddingTop: 70,
    paddingBottom: 50,
  },
  trophyCircle: {
    width: 140,
    height: 140,
    borderRadius: 40,
    backgroundColor: "#2A2000",
    borderWidth: 3,
    borderColor: "#F5C842",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  trophyEmoji: {
    fontSize: 80,
  },
  stars: {
    fontSize: 28,
    letterSpacing: 4,
    marginBottom: 16,
  },
  title: {
    color: "#ffffff",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    color: "#aaaaaa",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  badge: {
    backgroundColor: "#0A2A1A",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1.5,
    borderColor: "#4CAF7D",
    marginBottom: 28,
  },
  badgeText: {
    color: "#4CAF7D",
    fontSize: 13,
    fontWeight: "bold",
  },
  sectionLabel: {
    color: "#888",
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  deviceRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1A46",
    borderRadius: 12,
    padding: 14,
    width: "100%",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#4CAF7D",
  },
  deviceEmoji: {
    fontSize: 26,
    marginRight: 12,
  },
  deviceName: {
    flex: 1,
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  checkmark: {
    color: "#4CAF7D",
    fontSize: 20,
    fontWeight: "bold",
  },
  factBox: {
    backgroundColor: "#1A1A46",
    borderRadius: 14,
    padding: 16,
    width: "100%",
    marginTop: 16,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: "#2E2E6E",
  },
  factTitle: {
    color: "#F5C842",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
  },
  factText: {
    color: "#cccccc",
    fontSize: 13,
    lineHeight: 20,
  },
  playAgainBtn: {
    backgroundColor: "#F5C842",
    borderRadius: 14,
    padding: 18,
    width: "100%",
    alignItems: "center",
  },
  playAgainText: {
    color: "#13132B",
    fontSize: 18,
    fontWeight: "bold",
  },
});
