import React, { ReactNode, useEffect, useMemo, useState } from "react";
import {
  Image,
  Linking,
  ScrollView,
  Text,
  TextStyle,
  useWindowDimensions,
  View,
} from "react-native";

type Props = {
  htmlContent: string;
  fontSize?: number;
};

type Tag = {
  name: string;
  styles: TextStyle[];
  href?: string; // для <a>
};

export const HTMLParser = ({ htmlContent, fontSize = 16 }: Props) => {
  const { width } = useWindowDimensions();

  const tagStyles: Record<string, TextStyle> = {
    b: { fontWeight: "bold" },
    strong: { fontWeight: "bold" },
    i: { fontStyle: "italic" },
    em: { fontStyle: "italic" },
    a: { color: "#007AFF", textDecorationLine: "underline" },
  };

  const baseTextStyle: TextStyle = {
    fontSize,
    color: "#333",
    lineHeight: fontSize * 1.4,
  };

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
      .replace(/&raquo;/g, '"')
      .replace(/&bull;/g, "•")
      .replace(/&deg;/g, "°")
      .replace(/&rdquo;/g, '"')
      .replace(/&ldquo;/g, '"')
      .replace(/&bdquo;/g, '"')
      .replace(/&rsquo;/g, '"');
  };

  const normalizeUrl = (url: string) => {
    if (
      url.startsWith("http") ||
      url.startsWith("mailto:") ||
      url.startsWith("tel:")
    ) {
      return url;
    }

    if (url.startsWith("//")) {
      return `https:${url}`;
    }

    return `https://goldfishnet.in.ua${url}`;
  };

  // 🔹 компонент для авто-висоти картинки
  const AutoImage = ({ uri }: { uri: string }) => {
    const [ratio, setRatio] = useState(1);

    useEffect(() => {
      Image.getSize(
        uri,
        (w, h) => {
          if (w && h) setRatio(w / h);
        },
        () => {},
      );
    }, [uri]);

    return (
      <Image
        source={{ uri }}
        style={{
          width: width - 20,
          height: (width - 20) / ratio,
          resizeMode: "contain",
          marginVertical: 10,
        }}
      />
    );
  };

  const parse = (): ReactNode[] => {
    const stack: Tag[] = [{ name: "root", styles: [baseTextStyle] }];
    const result: ReactNode[] = [];

    const regex = /<\/?[^>]+>|[^<]+/g;
    let match;
    let key = 0;

    let currentText: ReactNode[] = [];

    const flushText = () => {
      if (currentText.length) {
        result.push(
          <Text key={key++} style={baseTextStyle}>
            {currentText}
          </Text>,
        );
        currentText = [];
      }
    };

    while ((match = regex.exec(htmlContent)) !== null) {
      const token = match[0];

      // TEXT
      if (!token.startsWith("<")) {
        let text = decodeHTMLEntities(token);
        text = text.replace(/\s+/g, " ");
        if (!text.trim()) continue;

        const currentTag = stack[stack.length - 1];

        currentText.push(
          <Text
            key={key++}
            style={currentTag.styles}
            onPress={
              currentTag.href
                ? () => Linking.openURL(currentTag.href!)
                : undefined
            }
          >
            {text}
          </Text>,
        );
        continue;
      }

      const isClosing = /^<\//.test(token);
      const tagNameMatch = token.match(/^<\/?(\w+)/);
      const tagName = tagNameMatch?.[1]?.toLowerCase();

      if (!tagName) continue;

      // --- P ---
      if (tagName === "p") {
        if (!isClosing) {
          flushText();
        } else {
          flushText();
          result.push(<View key={key++} style={{ height: 12 }} />);
        }
        continue;
      }

      if (tagName === "br") {
        currentText.push(<Text key={key++}>{"\n"}</Text>);
        continue;
      }

      // --- OL ---
      if (tagName === "ol") {
        flushText();
        continue;
      }

      // --- UL ---
      if (tagName === "ul") {
        flushText();
        continue;
      }

      // --- LI ---
      if (tagName === "li") {
        if (!isClosing) {
          flushText();
          currentText.push(
            <Text key={key++} style={baseTextStyle}>
              {"• "}
            </Text>,
          );
        } else {
          flushText();
          result.push(<View key={key++} style={{ height: 6 }} />);
        }
        continue;
      }

      // --- IMG ---
      if (tagName === "img") {
        flushText();

        const srcMatch = token.match(/src=["'](.*?)["']/);
        if (srcMatch) {
          const src = srcMatch[1];
          const uri = src.startsWith("http")
            ? src
            : `https://goldfishnet.in.ua${src}`;

          result.push(<AutoImage key={key++} uri={uri} />);
        }
        continue;
      }

      // --- A ---
      if (tagName === "a") {
        if (!isClosing) {
          const hrefMatch = token.match(/href=["'](.*?)["']/);
          let href = hrefMatch?.[1];

          if (href) {
            href = normalizeUrl(href);
          }

          const parent = stack[stack.length - 1];

          stack.push({
            name: "a",
            href,
            styles: [...parent.styles, tagStyles.a],
          });
        } else {
          stack.pop();
        }
        continue;
      }

      // --- INLINE ---
      if (!isClosing) {
        const parent = stack[stack.length - 1];
        const style = tagStyles[tagName];

        stack.push({
          name: tagName,
          styles: style ? [...parent.styles, style] : [...parent.styles],
        });
      } else {
        if (stack.length > 1) stack.pop();
      }
    }

    flushText();
    return result;
  };

  const parsedContent = useMemo(parse, [htmlContent]);

  return <ScrollView style={{ padding: 10 }}>{parsedContent}</ScrollView>;
};
