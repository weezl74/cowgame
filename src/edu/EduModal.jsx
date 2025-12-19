
import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function EduModal({ visible, question, onAnswer }) {
  if (!question) return null;
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={S.backdrop}>
        <View style={S.card}>
          <Text style={S.title}>Quick quiz</Text>
          <Text style={S.prompt}>{question.prompt}</Text>
          {question.choices.map((c, i) => (
            <TouchableOpacity key={i} style={S.choice} onPress={() => onAnswer(i === question.answerIndex)}>
              <Text style={S.choiceText}>{c}</Text>
            </TouchableOpacity>
          ))}
          <Text style={S.help}>Correct answers grant +2 moves or a hint.</Text>
          {question.factOnCorrect && (
            <Text style={[S.help, { marginTop: 6 }]}>Tip: {question.factOnCorrect}</Text>
          )}
        </View>
      </View>
    </Modal>
  );
}

const S = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  card: { width: "88%", backgroundColor: "#fff", borderRadius: 12, padding: 16 },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  prompt: { fontSize: 16, marginBottom: 12 },
  choice: { padding: 12, backgroundColor: "#f3f4f6", borderRadius: 8, marginBottom: 8 },
  choiceText: { fontSize: 16 },
  help: { marginTop: 8, color: "#6b7280" }
});
