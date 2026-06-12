import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const allDevices = [
  { id: 1, name: "Fan", emoji: "🌀" },
  { id: 2, name: "Light Bulb", emoji: "💡" },
  { id: 3, name: "TV", emoji: "📺" },
  { id: 4, name: "Refrigerator", emoji: "🧊" },
  { id: 5, name: "Laptop", emoji: "💻" },
];

const SuccessScreen = ({ navigation, route }) => {
  const { device, foundList } = route.params;
  const totalFound = foundList.length;
  const allDone = totalFound === 5;

  const nextDevice = allDevices.find((d) => !foundList.includes(d.id));

  return (
    <View style={styles.container}>
      {/* Big device emoji */}
      <View style={styles.emojiCircle}>
        <Text style={styles.bigEmoji}>{device.emoji}</Text>
      </View>

      <Text style={styles.foundTag}>✅ Device Found!</Text>
      <Text style={styles.deviceName}>{device.name}</Text>
      <Text style={styles.congrats}>
        Amazing! You snapped the {device.name}!
      </Text>

      <Text style={styles.stars}>
        {allDevices
          .map((d) => (foundList.includes(d.id) ? "⭐" : "☆"))
          .join("  ")}
      </Text>

      <View style={styles.counterBox}>
        <Text style={styles.counterBig}>{totalFound}</Text>
        <Text style={styles.counterSmall}> / 5 devices found</Text>
      </View>

      <View style={styles.progressBg}>
        <View
          style={[styles.progressFill, { width: `${(totalFound / 5) * 100}%` }]}
        />
      </View>

      {!allDone && nextDevice && (
        <View style={styles.nextBox}>
          <Text style={styles.nextLabel}>Next up:</Text>
          <Text style={styles.nextEmoji}>{nextDevice.emoji}</Text>
          <Text style={styles.nextName}>{nextDevice.name}</Text>
        </View>
      )}

      <View style={styles.btnArea}>
        {allDone ? (
          <TouchableOpacity
            style={styles.rewardBtn}
            onPress={() => navigation.navigate("Reward")}
          >
            <Text style={styles.rewardBtnText}>🏆 Collect Your Reward!</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              style={styles.nextBtn}
              onPress={() =>
                navigation.navigate("Camera", { device: nextDevice, foundList })
              }
            >
              <Text style={styles.nextBtnText}>
                📷 Snap {nextDevice?.name}!
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.homeBtn}
              onPress={() => navigation.navigate("Home", { foundList })}
            >
              <Text style={styles.homeBtnText}>← Back to List</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default SuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F2E",
    alignItems: "center",
    justifyContent: "center",
    padding: 28,
  },
  emojiCircle: {
    width: 130,
    height: 130,
    borderRadius: 35,
    backgroundColor: "#1A1A46",
    borderWidth: 2,
    borderColor: "#4CAF7D",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  bigEmoji: {
    fontSize: 70,
  },
  foundTag: {
    color: "#4CAF7D",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  deviceName: {
    color: "#F5C842",
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 8,
  },
  congrats: {
    color: "#aaaaaa",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 16,
  },
  stars: {
    fontSize: 24,
    letterSpacing: 4,
    marginBottom: 20,
  },
  counterBox: {
    flexDirection: "row",
    alignItems: "baseline",
    backgroundColor: "#1A1A46",
    borderRadius: 14,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginBottom: 14,
  },
  counterBig: {
    color: "#F5C842",
    fontSize: 36,
    fontWeight: "bold",
  },
  counterSmall: {
    color: "#aaa",
    fontSize: 16,
  },
  progressBg: {
    width: "100%",
    height: 8,
    backgroundColor: "#12122E",
    borderRadius: 4,
    marginBottom: 20,
    overflow: "hidden",
  },
  progressFill: {
    height: 8,
    backgroundColor: "#F5C842",
    borderRadius: 4,
  },
  nextBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#1A1A46",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginBottom: 28,
  },
  nextLabel: { color: "#888", fontSize: 12 },
  nextEmoji: { fontSize: 18 },
  nextName: { color: "#fff", fontSize: 14, fontWeight: "bold" },
  btnArea: {
    width: "100%",
    gap: 10,
  },
  nextBtn: {
    backgroundColor: "#F5C842",
    borderRadius: 14,
    padding: 18,
    alignItems: "center",
  },
  nextBtnText: {
    color: "#13132B",
    fontSize: 17,
    fontWeight: "bold",
  },
  rewardBtn: {
    backgroundColor: "#4CAF7D",
    borderRadius: 14,
    padding: 18,
    alignItems: "center",
  },
  rewardBtnText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  homeBtn: {
    alignItems: "center",
    padding: 12,
  },
  homeBtnText: {
    color: "#888",
    fontSize: 14,
  },
});
