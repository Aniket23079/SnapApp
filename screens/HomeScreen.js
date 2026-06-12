import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

const devices = [
  { id: 1, name: "Fan", emoji: "🌀", hint: "It spins to keep you cool!" },
  {
    id: 2,
    name: "Light Bulb",
    emoji: "💡",
    hint: "It glows bright in the dark!",
  },
  { id: 3, name: "TV", emoji: "📺", hint: "You watch cartoons on it!" },
  {
    id: 4,
    name: "Refrigerator",
    emoji: "🧊",
    hint: "It keeps your food cold!",
  },
  { id: 5, name: "Laptop", emoji: "💻", hint: "You can play games on it!" },
];

const HomeScreen = ({ navigation, route }) => {
  const foundList = route.params?.foundList || [];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Snap & Learn! 📸</Text>
      <Text style={styles.subtitle}>Find 5 electrical devices around you</Text>

      <View style={styles.progressBox}>
        <Text style={styles.progressText}>
          {foundList.length} / 5 devices found
        </Text>
        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${(foundList.length / 5) * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.stars}>
          {devices
            .map((d) => (foundList.includes(d.id) ? "⭐" : "☆"))
            .join("  ")}
        </Text>
      </View>

      <Text style={styles.sectionLabel}>Devices to find:</Text>

      {devices.map((device) => {
        const isFound = foundList.includes(device.id);
        return (
          <View
            key={device.id}
            style={[styles.card, isFound && styles.cardFound]}
          >
            <Text style={styles.cardEmoji}>{device.emoji}</Text>
            <View style={styles.cardInfo}>
              <Text style={[styles.cardName, isFound && styles.cardNameFound]}>
                {device.name}
              </Text>
              <Text style={styles.cardHint}>{device.hint}</Text>
            </View>
            {isFound ? (
              <View style={styles.foundBadge}>
                <Text style={styles.foundBadgeText}>✓ Found!</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.snapBtn}
                onPress={() =>
                  navigation.navigate("Camera", { device, foundList })
                }
              >
                <Text style={styles.snapBtnText}>📷 Snap</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      })}

      {foundList.length === 5 && (
        <TouchableOpacity
          style={styles.rewardBtn}
          onPress={() => navigation.navigate("Reward")}
        >
          <Text style={styles.rewardBtnText}>🏆 Collect Your Reward!</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F2E",
  },
  content: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: "#aaaaaa",
    marginBottom: 24,
  },
  progressBox: {
    backgroundColor: "#1A1A46",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  progressText: {
    color: "#F5C842",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  progressBarBg: {
    backgroundColor: "#12122E",
    borderRadius: 6,
    height: 10,
    marginBottom: 12,
  },
  progressBarFill: {
    backgroundColor: "#F5C842",
    borderRadius: 6,
    height: 10,
  },
  stars: {
    fontSize: 20,
    textAlign: "center",
    letterSpacing: 4,
  },
  sectionLabel: {
    color: "#888888",
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#1A1A46",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#2E2E6E",
  },
  cardFound: {
    borderColor: "#4CAF7D",
    backgroundColor: "#0E1F18",
  },
  cardEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 3,
  },
  cardNameFound: {
    color: "#4CAF7D",
  },
  cardHint: {
    fontSize: 12,
    color: "#888888",
  },
  foundBadge: {
    backgroundColor: "#0A2A1A",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#4CAF7D",
  },
  foundBadgeText: {
    color: "#4CAF7D",
    fontSize: 12,
    fontWeight: "bold",
  },
  snapBtn: {
    backgroundColor: "#F5C842",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  snapBtnText: {
    color: "#13132B",
    fontSize: 13,
    fontWeight: "bold",
  },
  rewardBtn: {
    backgroundColor: "#4CAF7D",
    borderRadius: 14,
    padding: 18,
    alignItems: "center",
    marginTop: 16,
  },
  rewardBtnText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
