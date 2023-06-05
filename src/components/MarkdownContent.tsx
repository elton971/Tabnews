import React from "react";
import MarkdownDisplay from "react-native-markdown-display";
import { Text, View } from "react-native";

interface MarkdownContentProps {
  markdownText: string;
}
export const MarkdownContent = ({ markdownText }: MarkdownContentProps) => {
  return (
    <View>
      <Text style={{ padding: 10 }}>
        {/* @ts-ignore */}
        <MarkdownDisplay style={{}}>{markdownText}</MarkdownDisplay>
      </Text>
    </View>
  );
};
