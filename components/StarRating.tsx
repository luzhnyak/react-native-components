import React, { FC } from "react";
import { View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type StarRatingProps = {
  size: number;
  rating?: number;
  setRating: (rating: number) => void;
};

const StarRating: FC<StarRatingProps> = ({ size, rating = 0, setRating }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity key={star} onPress={() => setRating(star)}>
          <FontAwesome
            name={star <= rating ? "star" : "star-o"}
            size={size}
            color={star <= rating ? "gold" : "gray"}
            style={{ marginRight: 4 }}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default StarRating;
