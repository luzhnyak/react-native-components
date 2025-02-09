import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import React, { FC, Fragment } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Link } from "expo-router";

type InfoBoxProps = {
  title: string;
  icon: string;
  content: {
    text: string;
    link?: { pathname: any; params?: { id: string } };
  }[];
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  linkStyle?: StyleProp<TextStyle>;
};

const InfoBoxLink: FC<InfoBoxProps> = ({
  title,
  icon,
  content,
  containerStyle,
  titleStyle,
  linkStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View
        style={{
          width: 18,
        }}
      >
        <Icon name={icon} size={16} />
      </View>

      <Text style={[styles.title, titleStyle]}>{title}</Text>
      {content.map((item, index) => (
        <Fragment key={`fragment-${index}`}>
          {index > 0 && <Text>,</Text>}
          {item.link ? (
            <Link
              style={[styles.link, linkStyle]}
              href={{
                pathname: item.link.pathname,
                params: { id: item.link?.params?.id },
              }}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {item.text}
            </Link>
          ) : (
            <Text style={[styles.text, linkStyle]} numberOfLines={1}>
              {item.text}
            </Text>
          )}
        </Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    marginTop: 4,
    marginBottom: 4,
    flexDirection: "row",
    // flexWrap: "wrap",
    alignItems: "center",
    width: "100%",
  },
  title: {
    marginLeft: 4,
    marginRight: 0,
    fontSize: 16,
    color: "#222222",
    fontWeight: "bold",
  },
  link: {
    marginLeft: 4,
    fontSize: 16,
    color: "#0000ff",
    fontWeight: 500,
    flexShrink: 1,
  },
  text: {
    marginLeft: 4,
    fontSize: 16,
    color: "#333",
    fontWeight: 500,
    flexShrink: 1,
  },
});

export default InfoBoxLink;
