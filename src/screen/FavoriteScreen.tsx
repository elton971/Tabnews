import { useEffect, useReducer, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaView, View, Text } from "react-native";
import { ContentProps, APIErrorProps } from "../../constants/types";
import { get_content_slug } from "../../services/AxiosRequest";
import { getFavorites } from "../../services/storage";
import { reducerHome } from "../../store/reducer/reducer";
import { initialState } from "../../store/state/state";
import { CardContent } from "../components/CardContent";

export const Favorite = () => {
  const [state, dispatch] = useReducer(reducerHome, initialState);
  const [content, setContent] = useState<any>([]);

  const { error, loading } = state;

  const isAPIErrorProps = (data: any): data is APIErrorProps => {
    return "error_id" in data && "message" in data && "status_code" in data;
  };

  const handleFavorite = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    const favorite = await getFavorites();
    console.log(favorite);
    if (favorite) {
      const newContent: ContentProps[] = [];
      for (const item of favorite) {
        const existingItem = content.find(
          (contentItem: any) => contentItem.id === item.id
        );
        if (existingItem) {
          newContent.push(existingItem);
        } else {
          const data = await get_content_slug(item.slug, item.owner_username);
          if (isAPIErrorProps(data)) {
            dispatch({ type: "SET_ERROR", payload: data });
          } else {
            newContent.push(data);
          }
        }
      }
      setContent(newContent);
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  useEffect(() => {
    handleFavorite();
  }, [content]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#fff",
        }}
      >
        <ScrollView>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <View style={{ padding: 15 }}>
                {content[0]?.id ? (
                  content?.map((item: ContentProps, index: number) => (
                    <CardContent item={item} key={index} />
                  ))
                ) : (
                  <View>
                    <Text>{error?.message}</Text>
                  </View>
                )}
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
