
import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { LEVELS } from "./levels";
import { trySlide } from "./logic";
import EduModal from "../../edu/EduModal";
import { QUIZ } from "../../edu/quizData";

const DIRS = [
  { key: "UP", dr: -1, dc: 0 },
  { key: "DOWN", dr: 1, dc: 0 },
  { key: "LEFT", dr: 0, dc: -1 },
  { key: "RIGHT", dr: 0, dc: 1 }
];

export default function BlockJamScreen() {
  const level = useMemo(() => LEVELS[0], []);
  const [tiles, setTiles] = useState(level.tiles);
  const [movesLeft, setMovesLeft] = useState(level.moveLimit);
  const [selectedId, setSelectedId] = useState(null);
  const [win, setWin] = useState(false);

  const [quizOpen, setQuizOpen] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);

  function handleMove(dr, dc) {
    if (!selectedId || movesLeft <= 0 || win) return;
    const res = trySlide(level, tiles, selectedId, dr, dc, movesLeft);
    if (!res.moved) return;
    setTiles(res.newTiles);
    setMovesLeft(res.movesLeft);
    if (res.win) {
      setWin(true);
    } else if (res.movesLeft % 5 === 0) {
      setQuizOpen(true);
    }
  }

  function handleQuizAnswer(correct) {
    setQuizOpen(false);
    if (correct) setMovesLeft(m => m + 2);
    setQuizIdx(i => (i + 1) % QUIZ.length);
  }

  const cellSize = 52;
  const gridW = level.cols * cellSize;
  const gridH = level.rows * cellSize;

  return (
    <View style={S.container}>
      <Text style={S.title}>Block‑Jam (Edu)</Text>
      <View style={S.infoRow}>
        <Text style={S.info}>Moves left: {movesLeft}</Text>
        {win && <Text style={[S.info, { color: "#2ecc71" }]}>Level complete! 🎉</Text>}
      </View>

      <View style={[S.grid, { width: gridW, height: gridH }]}>
        {Array.from({ length: level.rows * level.cols }).map((_, idx) => {
          const row = Math.floor(idx / level.cols);
          const col = idx % level.cols;
          const t = tiles.find(tt => tt.goal && tt.goal.row === row && tt.goal.col === col);
          return <View key={idx} style={[S.cell, { width: cellSize, height: cellSize, borderColor: "#e5e7eb" }]}>
            {!!t?.goal && <View style={[S.goalDot, { backgroundColor: t.color }]} />}
          </View>;
        })}

        {tiles.map(t => (
          <Animated.View
            key={t.id}
            entering={FadeIn}
            exiting={FadeOut}
            style={[
              S.tile,
              {
                width: cellSize - 6,
                height: cellSize - 6,
                backgroundColor: t.color,
                left: t.pos.col * cellSize + 3,
                top: t.pos.row * cellSize + 3,
                borderWidth: selectedId === t.id ? 3 : 1,
                borderColor: selectedId === t.id ? "#111827" : "#374151",
                opacity: t.locked ? 0.55 : 1
              }
            ]}
          >
            <TouchableOpacity style={{ flex: 1 }} onPress={() => setSelectedId(t.id)}>
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={S.tileText}>{t.locked ? "⛔" : "⏿"}</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>

      <FlatList
        data={DIRS}
        keyExtractor={d => d.key}
        contentContainerStyle={{ gap: 8, marginTop: 16 }}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity style={S.ctrl} onPress={() => handleMove(item.dr, item.dc)}>
            <Text style={S.ctrlText}>{item.key}</Text>
          </TouchableOpacity>
        )}
      />

      <EduModal visible={quizOpen} question={QUIZ[quizIdx]} onAnswer={handleQuizAnswer} />
    </View>
  );
}

const S = StyleSheet.create({
  container: { alignItems: "center", paddingTop: 12, backgroundColor: "#ffffff" },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 8 },
  infoRow: { flexDirection: "row", gap: 20, marginBottom: 8 },
  info: { fontSize: 16, color: "#111827" },
  grid: { position: "relative", backgroundColor: "#fafafa", borderWidth: 1, borderColor: "#e5e7eb" },
  cell: { position: "relative", borderWidth: 1 },
  goalDot: { position: "absolute", width: 10, height: 10, right: 4, bottom: 4, borderRadius: 5 },
  tile: {
    position: "absolute",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2
  },
  tileText: { fontSize: 16, color: "#fff", fontWeight: "700" },
  ctrl: { paddingHorizontal: 12, paddingVertical: 10, backgroundColor: "#111827", borderRadius: 8 },
  ctrlText: { color: "#fff", fontWeight: "600" }
});
