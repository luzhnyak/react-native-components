import React, { FC } from "react";
import { View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type StarRatingProps = {
  starSize: number;
  rating?: number;
  onChange?: (rating: number) => void;
};

const StarRating: FC<StarRatingProps> = ({
  starSize = 24,
  rating = 0,
  onChange,
}) => {
  return (
    <View style={{ flexDirection: "row" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => {
            onChange && onChange(star);
          }}
        >
          <FontAwesome
            name={star <= rating ? "star" : "star-o"}
            size={starSize}
            color={star <= rating ? "gold" : "gray"}
            style={{ marginRight: 4 }}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default StarRating;
