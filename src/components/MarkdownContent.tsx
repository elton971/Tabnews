import React from "react";
import MarkdownDisplay from "react-native-markdown-display";
import { Text, View, StyleSheet } from "react-native";

interface MarkdownContentProps {
  markdownText: string;
}
export const MarkdownContent = ({ markdownText }: MarkdownContentProps) => {
  return (
    <View>
      <Text style={{ padding: 10 }}>
        {/* @ts-ignore */}
        <MarkdownDisplay style={markdownStyles}>{markdownText}</MarkdownDisplay>
      </Text>
    </View>
  );
};
const $COLORS = {
  primary: "rgb(36, 41, 47)",
  primaryDark: "#16191d",
  white: "#FFFFFF",
  black: "rgb(1, 4, 9)",
  green: "rgb(31, 136, 61)",
  greenDark: "#18682e",
  grayLight: "rgb(246, 248, 250)",
  grayDark: "rgb(208, 215, 222)",
  gray300: "rgb(48, 54, 61)",
  blue: "rgb(9, 105, 218)",
  blueLight: "rgb(240, 246, 252)",
  blueLight300: "rgb(221, 244, 255)",
  pink: "rgb(255, 235, 233)",
  pinkDark: "rgb(255, 129, 130, 0.4)",
  red: "rgb(209, 36, 47)",
  redDark: "rgb(207, 34, 46)",
  red300: "rgb(248, 81, 73)",
  redDark300: "rgb(218, 54, 51)",
};

const markdownStyles = StyleSheet.create({
  heading1: {
    fontSize: 32,
    fontWeight: "600",
    marginBottom: 10,
    color: $COLORS.primary,
  },
  heading2: {
    fontSize: 24,
    fontWeight: "600",
    borderBottomWidth: 1,
    borderBottomColor: $COLORS.grayDark,
    marginBottom: 10,
    marginTop: 20,
  },
  heading3: {
    fontSize: 18,
    fontWeight: "600",
  },
  heading4: {
    fontSize: 16,
  },
  heading5: {
    fontSize: 14,
  },
  heading6: {
    fontSize: 12,
  },
  text: {
    color: $COLORS.primary,
  },
  image: {
    borderRadius: 6,
  },
  code_inline: {
    color: $COLORS.grayLight,
    backgroundColor: $COLORS.primary,
    borderRadius: 6,
  },
  code_block: {
    color: $COLORS.grayLight,
    backgroundColor: $COLORS.primary,
    borderRadius: 6,
  },
  fence: {
    color: $COLORS.grayLight,
    backgroundColor: $COLORS.primary,
    borderRadius: 6,
  },
  paragraph: {
    fontSize: 18,
  },
  list_item: {
    marginVertical: 10,
    fontSize: 16,
  },
  link: {
    color: $COLORS.blue,
  },
  blocklink: {
    color: $COLORS.blue,
  },
});
