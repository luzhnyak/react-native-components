import React, { JSXElementConstructor, ReactElement } from "react";
import {
  ScrollView,
  Text,
  Image,
  View,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useWindowDimensions } from "react-native";

type Props = {
  htmlContent: string;
  fontSize?: number;
};

type TagStylesType = {
  b: TextStyle;
  strong: TextStyle;
  i: TextStyle;
  em: TextStyle;
  h1: TextStyle;
  h2: TextStyle;
  h3: TextStyle;
  h4: TextStyle;
  h5: TextStyle;
  h6: TextStyle;
  li: TextStyle;
  a: TextStyle;
};

const HTMLParser = ({ htmlContent, fontSize = 16 }: Props) => {
  const { width } = useWindowDimensions();

  const tagStyles: TagStylesType = {
    b: { fontSize, fontWeight: "bold" },
    strong: { fontSize, fontWeight: "bold" },
    i: { fontSize, fontStyle: "italic" },
    em: { fontSize, fontStyle: "italic" },
    h1: { fontSize: fontSize + 10, fontWeight: "bold" },
    h2: { fontSize: fontSize + 6, fontWeight: "bold" },
    h3: { fontSize: fontSize + 4, fontWeight: "bold" },
    h4: { fontSize: fontSize + 2, fontWeight: "bold" },
    h5: { fontSize, fontWeight: "bold" },
    h6: { fontSize, fontWeight: "bold" },
    li: { fontSize, marginVertical: 2, marginLeft: 10 },
    a: { fontSize, color: "#007AFF" },
  };

  const tagRegex = /<\/?(\w+)([^>]*)>/g;

  const decodeHTMLEntities = (text: string) => {
    return text
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&nbsp;/g, " ")
      .replace(/&ndash;/g, "-")
      .replace(/&mdash;/g, "—")
      .replace(/&hellip;/g, "…")
      .replace(/&copy;/g, "©")
      .replace(/&laquo;/g, '"')
      .replace(/&raquo;/g, '"');
  };

  const parseHTML = (html: string) => {
    const elements: ReactElement<any, string | JSXElementConstructor<any>>[] =
      [];
    let lastIndex = 0;
    let match;

    while ((match = tagRegex.exec(html)) !== null) {
      const [fullMatch, tag, attrs] = match;
      let textBefore = html.substring(lastIndex, match.index).trim();
      textBefore = decodeHTMLEntities(textBefore);

      if (textBefore) {
        if (tagStyles[tag as keyof TagStylesType]) {
          elements.push(
            <Text
              key={elements.length}
              style={[
                { marginVertical: 5 },
                tagStyles[tag as keyof TagStylesType],
              ]}
            >
              {tag === "li" ? `- ${textBefore}` : textBefore}
            </Text>
          );
        } else {
          elements.push(
            <Text
              key={elements.length}
              style={{ fontSize, color: "#333", marginVertical: 5 }}
            >
              {textBefore}
            </Text>
          );
        }
      }

      if (tag === "img") {
        const srcMatch = attrs.match(/src="(.*?)"/);
        if (srcMatch) {
          elements.push(
            <Image
              key={elements.length}
              source={{
                uri:
                  srcMatch[1].slice(4) === "http"
                    ? srcMatch[1]
                    : "https://goldfishnet.in.ua" + srcMatch[1],
              }}
              style={{
                width: "100%",
                height: 200,
                resizeMode: "contain",
                marginVertical: 10,
              }}
            />
          );
        }
      }

      lastIndex = tagRegex.lastIndex;
    }

    let remainingText = html.substring(lastIndex).trim();
    remainingText = decodeHTMLEntities(remainingText);
    if (remainingText) {
      elements.push(
        <Text
          key={elements.length}
          style={{ fontSize, color: "red", marginVertical: 5 }}
        >
          {remainingText}
        </Text>
      );
    }
    return elements;
  };

  return (
    <ScrollView style={{ padding: 10 }}>{parseHTML(htmlContent)}</ScrollView>
  );
};

export default HTMLParser;
