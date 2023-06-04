import { View, SafeAreaView, ScrollView, Text } from "react-native";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native-paper";
import { CardContent } from "../components/CardContent";
import { get_content } from "../../services/AxiosRequest";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setContent, setLoading } from "../../store/slice/Content.slice";

export const HomeScreen = () => {
  const dispatch = useDispatch();
  const content = useSelector((state: RootState) => state.content.content);
  const loading = useSelector((state: RootState) => state.content.loading);
  const handleScroll = (event: any) => {};

  useEffect(() => {
    if (content.length == 0) {
      get_content(1).then((response) => {
        dispatch(setLoading(true));
        dispatch(setContent(response));
      });
    }
    return;
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#f2f2f0",
      }}
    >
      <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
        <View
          style={{
            flex: 1,
          }}
        >
          {loading ? (
            <View
              style={{
                flex: 1,
                paddingTop: 350,
              }}
            >
              <ActivityIndicator size="large" color={"#fff"} />
            </View>
          ) : (
            <View style={{ paddingHorizontal: 15 }}>
              {content.length > 0 ? (
                content?.map((item, index: number) => (
                  <CardContent item={item} key={index} />
                ))
              ) : (
                <View>Nao temos nada aqui</View>
              )}

              {/* {loading_more ? (
                  <View
                    style={{
                      paddingVertical: 10,
                    }}
                  >
                    <ActivityIndicator size="small" color="gray" />
                  </View>
                ) : null} */}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
