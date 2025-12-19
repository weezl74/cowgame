
node_modules/
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import BlockJamScreen from './src/games/blockjam/BlockJamScreen';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

export default function App() {
  const [showGame, setShowGame] = React.useState(true);

  return (
    <SafeAreaView style={S.container}>
      <ExpoStatusBar style="dark" />
      <View style={S.header}>
        <Text style={S.title}>Cowgame</View style={S.placeholder}>        <Text style={S.title}>Cowgame</Text>
          <Text>Tap "Play" to start.</Text>
        </View>
      )}

      <View style={S.footer}>
        <TouchableOpacity style={S.btn} onPress={() => setShowGame(true)}>
          <Text style={S.btnText}>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[S.btn, { backgroundColor: '#6b7280' }]} onPress={() => setShowGame(false)}>
          <Text style={S.btnText}>Stop</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { paddingHorizontal: 20, paddingTop: StatusBar.currentHeight || 20, paddingBottom: 8 },
  title: { fontSize: 22, fontWeight: '800' },
  sub: { color: '#6b7280', marginTop: 4 },
  placeholder: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  footer: { padding: 16, flexDirection: 'row', gap: 12, justifyContent: 'center' },
  btn: { backgroundColor: '#111827', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 },
  btnText: { color: '#fff', fontWeight: '700' }
});

        <Text style={S.sub}>Frontend-only RN (JS) + quizzes for power-ups</Text>
      </View>

      {showGame ? (
        <BlockJamScreen />
      ) : (

.expo/
dist/
build/
.expo-shared/
.DS_Store
Thumbs.db
