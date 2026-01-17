import { Tabs } from "expo-router";

// This component defines the bottom tab navigation layout
export default function TabLayout() {
  return (
    <Tabs>
      {/* Home tab → maps to app/index.tsx */}
      <Tabs.Screen name="index" options={{ title: "Home" }} />

      {/* Dashboard tab → maps to app/dashboard.tsx */}
      <Tabs.Screen name="dashboard" options={{ title: "Dashboard" }} />

      {/* History tab → maps to app/history.tsx */}
      <Tabs.Screen name="history" options={{ title: "History" }} />

      {/* About tab → maps to app/about.tsx */}
      <Tabs.Screen name="about" options={{ title: "About" }} />
    </Tabs>
  );
}
