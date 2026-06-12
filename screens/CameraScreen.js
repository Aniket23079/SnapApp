import { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

const CameraScreen = ({ navigation, route }) => {
  const { device, foundList } = route.params;
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(false);
  const [detected, setDetected] = useState(false);

  if (!permission) {
    return (
      <View style={styles.centered}>
        <Text style={styles.whiteText}>Loading camera...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emoji}>📷</Text>
        <Text style={styles.permTitle}>Camera Permission Needed</Text>
        <Text style={styles.permSub}>
          We need camera to snap the {device.name}!
        </Text>
        <TouchableOpacity style={styles.allowBtn} onPress={requestPermission}>
          <Text style={styles.allowBtnText}>Allow Camera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function handleSnap() {
    if (scanning || detected) return;

    setScanning(true);

    setTimeout(() => {
      setScanning(false);
      setDetected(true);

      setTimeout(() => {
        const newFoundList = [...foundList, device.id];
        navigation.navigate("Success", { device, foundList: newFoundList });
      }, 1500);
    }, 2000);
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <CameraView style={styles.camera} facing="back" />

      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backBtnText}>✕</Text>
        </TouchableOpacity>
        <View style={styles.counterPill}>
          <Text style={styles.counterText}>{foundList.length} / 5 found</Text>
        </View>
      </View>

      <View style={styles.targetBox}>
        <Text style={styles.targetEmoji}>{device.emoji}</Text>
        <View>
          <Text style={styles.targetLabel}>Find this:</Text>
          <Text style={styles.targetName}>{device.name}</Text>
          <Text style={styles.targetHint}>{device.hint}</Text>
        </View>
      </View>

      <View style={styles.frameContainer}>
        <View style={styles.cornerTL} />
        <View style={styles.cornerTR} />
        <View style={styles.cornerBL} />
        <View style={styles.cornerBR} />
        {detected && (
          <View style={styles.detectedBox}>
            <Text style={styles.detectedTag}>{device.name} detected ✓</Text>
          </View>
        )}
      </View>

      <Text style={styles.statusMsg}>
        {detected
          ? `✅ ${device.name} found!`
          : scanning
            ? "🔍 Scanning..."
            : `Point at the ${device.name} and tap Snap!`}
      </Text>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[
            styles.snapBtn,
            (scanning || detected) && styles.snapBtnDisabled,
          ]}
          onPress={handleSnap}
          disabled={scanning || detected}
        >
          {scanning ? (
            <ActivityIndicator color="#13132B" size="large" />
          ) : (
            <Text style={styles.snapBtnText}>
              {detected ? "✓ Found!" : "📷 Snap!"}
            </Text>
          )}
        </TouchableOpacity>
        <Text style={styles.snapHint}>
          {scanning ? "Hold still..." : "Tap when you see the device!"}
        </Text>
      </View>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  centered: {
    flex: 1,
    backgroundColor: "#0F0F2E",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  camera: {
    flex: 1,
  },
  whiteText: {
    color: "#fff",
    fontSize: 16,
  },
  emoji: {
    fontSize: 60,
    marginBottom: 16,
  },
  permTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  permSub: {
    color: "#aaa",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 28,
  },
  allowBtn: {
    backgroundColor: "#F5C842",
    borderRadius: 14,
    paddingHorizontal: 32,
    paddingVertical: 14,
  },
  allowBtnText: {
    color: "#13132B",
    fontSize: 16,
    fontWeight: "bold",
  },
  topBar: {
    position: "absolute",
    top: 52,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backBtn: {
    backgroundColor: "rgba(0,0,0,0.6)",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  backBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  counterPill: {
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#F5C842",
  },
  counterText: {
    color: "#F5C842",
    fontSize: 13,
    fontWeight: "bold",
  },
  targetBox: {
    position: "absolute",
    top: 110,
    left: 20,
    right: 20,
    backgroundColor: "rgba(10,10,40,0.85)",
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  targetEmoji: {
    fontSize: 38,
    marginRight: 4,
  },
  targetLabel: {
    color: "#aaa",
    fontSize: 11,
    textTransform: "uppercase",
  },
  targetName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  targetHint: {
    color: "#aaaacc",
    fontSize: 12,
  },
  frameContainer: {
    position: "absolute",
    top: "38%",
    left: "15%",
    right: "15%",
    height: 220,
  },
  cornerTL: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 30,
    height: 30,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: "#F5C842",
    borderTopLeftRadius: 6,
  },
  cornerTR: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 30,
    height: 30,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: "#F5C842",
    borderTopRightRadius: 6,
  },
  cornerBL: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 30,
    height: 30,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: "#F5C842",
    borderBottomLeftRadius: 6,
  },
  cornerBR: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: "#F5C842",
    borderBottomRightRadius: 6,
  },
  detectedBox: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
    borderWidth: 2,
    borderColor: "#4CAF7D",
    borderRadius: 8,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  detectedTag: {
    backgroundColor: "#4CAF7D",
    color: "#fff",
    fontSize: 11,
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    margin: 6,
  },
  statusMsg: {
    position: "absolute",
    bottom: 200,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(10,10,30,0.9)",
    padding: 24,
    paddingBottom: 44,
    alignItems: "center",
  },
  snapBtn: {
    backgroundColor: "#F5C842",
    borderRadius: 50,
    width: 140,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  snapBtnDisabled: {
    backgroundColor: "#555",
  },
  snapBtnText: {
    color: "#13132B",
    fontSize: 18,
    fontWeight: "bold",
  },
  snapHint: {
    color: "#888",
    fontSize: 12,
  },
});
