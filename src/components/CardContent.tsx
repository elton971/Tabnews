import { TouchableOpacity, View, Text } from "react-native";
import moment from "moment";
import { Button } from "react-native-paper";
import { useEffect, useReducer, useState } from "react";
import {
  getFavorite,
  removeFavorite,
  saveFavorite,
} from "../../services/storage";

import { useNavigation } from "@react-navigation/native";
import { ContentState } from "../../store/slice/Content.slice";

interface Props {
  item: ContentState;
}

export const CardContent = ({ item }: Props) => {
  const daysSinceLaunch = moment().diff(item.published_at, "days");
  const launchTime = moment(item.published_at).format("h:mm A");
  const [fav, setFav] = useState(false);

  const navigation = useNavigation();
  const handleFavorite = () => {
    if (fav) {
      removeFavorite(item.id).then((response) => {
        setFav(false);
      });
    } else {
      saveFavorite(item.owner_username, item.slug, item.id).then((response) => {
        setFav(true);
      });
    }
  };

  useEffect(() => {
    getFavorite(item.owner_username, item.slug, item.id).then((response) => {
      if (response) {
        setFav(response);
      }
    });
  });

  return (
    <TouchableOpacity
      style={{
        borderBottomWidth: 2,
        borderBottomColor: "#e0e0e0",
        paddingHorizontal: 10,
        paddingVertical: 8,
      }}
      // @ts-ignore
      onPress={() => navigation.navigate("content", { item })}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>
          {item.title}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Text style={{ color: "#424242", fontSize: 15 }}>
          {item.tabcoins} tabcoins{" "}
        </Text>
        <Text style={{ color: "#424242", fontSize: 15 }}>
          {item.children_deep_count} Comentários{" "}
        </Text>
        <Text style={{ color: "#424242", fontSize: 15 }}>
          @{item.owner_username}
        </Text>
        {daysSinceLaunch > 0 ? (
          <Text style={{ color: "#424242", fontSize: 15 }}>
            {daysSinceLaunch} {daysSinceLaunch > 1 ? "dias" : "dia"} atrás
          </Text>
        ) : (
          <Text style={{ color: "#424242", fontSize: 15 }}>{launchTime}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
