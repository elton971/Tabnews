import { TouchableOpacity, View, Text } from "react-native";
import moment from "moment";
import { Button } from "react-native-paper";
import { useEffect, useReducer, useState } from "react";
import { ContentProps } from "../../constants/types";
import {
  getFavorite,
  removeFavorite,
  saveFavorite,
} from "../../services/storage";
import { reducerHome } from "../../store/reducer/reducer";
import { initialState } from "../../store/state/state";
import { useNavigation } from "@react-navigation/native";

interface Props {
  item: ContentProps;
}

export const CardContent = ({ item }: Props) => {
  const daysSinceLaunch = moment().diff(item.published_at, "days");
  const launchTime = moment(item.published_at).format("h:mm A");
  const [fav, setFav] = useState(false);
  const [state, dispatch] = useReducer(reducerHome, initialState);

  const navigation = useNavigation();
  const handleFavorite = () => {
    if (fav) {
      removeFavorite(item.id).then((response) => {
        dispatch({ type: "SET_CONTENT", payload: response });
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
        borderColor: "#2e2e2f",
        backgroundColor: "#1b1b1d",
      }}
    >
      <View
        style={{
          paddingVertical: 8,
          gap: 5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "#e8e7e7", fontSize: 20, fontWeight: "bold" }}>
            @{item.owner_username}
          </Text>
          {daysSinceLaunch > 0 ? (
            <Text style={{ color: "#e8e7e7" }}>
              {daysSinceLaunch} {daysSinceLaunch > 1 ? "dias" : "dia"} atrás
            </Text>
          ) : (
            <Text style={{ color: "#e8e7e7" }}>{launchTime}</Text>
          )}
        </View>
        <View style={{}}>
          <Text
            style={{
              color: "#a29b98",
              fontSize: 18,
              fontWeight: "400",
            }}
          >
            {item.title}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: 10,
          }}
        >
          <Text style={{ color: "#e8e7e7" }}>{item.tabcoins} tabcoins </Text>
          <Text style={{ color: "#e8e7e7" }}>
            {item.children_deep_count} Comentarios{" "}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
