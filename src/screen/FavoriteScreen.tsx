import { useEffect, useReducer, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaView, View, Text } from "react-native";
import { get_content_slug } from "../../services/AxiosRequest";
import { getFavorites } from "../../services/storage";
import { CardContent } from "../components/CardContent";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ContentState, setLoading } from "../../store/slice/Content.slice";

export const Favorite = () => {
  const [content, setContent] = useState<any>([]);
  const loading = useSelector((state: RootState) => state.content.loading);
  const dispatch = useDispatch();
  const handleFavorite = async () => {};

  useEffect(() => {
    dispatch(setLoading(true));
    getFavorites().then((res) => {
      setContent(res);
      dispatch(setLoading(false));
    });
  }, []);

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
                  content?.map((item: ContentState, index: number) => (
                    <CardContent item={item} key={index} />
                  ))
                ) : (
                  <View>
                    <Text>Pasta vazia</Text>
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
