import { View, SafeAreaView, ScrollView, Text } from "react-native";
import { useEffect, useReducer } from "react";
import { ActivityIndicator } from "react-native-paper";
import { CardContent } from "../components/CardContent";
import { APIErrorProps, ContentProps } from "../../constants/types";
import { get_content } from "../../services/AxiosRequest";
import { reducerHome } from "../../store/reducer/reducer";
import { initialState } from "../../store/state/state";
import * as React from "react";

export const HomeScreen = () => {
  const [state, dispatch] = useReducer(reducerHome, initialState);
  const { content, error, loading, strategy, page, loading_more } = state;

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isEnd =
      layoutMeasurement.height + contentOffset.y >= contentSize.height;
    if (isEnd) {
      dispatch({ type: "SET_PAGE", payload: page + 1 });
    }
  };

  const isAPIErrorProps = (data: any): data is APIErrorProps => {
    return "error_id" in data && "message" in data && "status_code" in data;
  };

  const handleContent = () => {
    page == 1
      ? dispatch({ type: "SET_LOADING", payload: true })
      : dispatch({ type: "SET_LOADING_MORE", payload: true });
    get_content(page, strategy)
      .then((data) => {
        if (isAPIErrorProps(data)) {
          dispatch({ type: "SET_ERROR", payload: data });
        } else {
          dispatch({ type: "SET_CONTENT", payload: data });
        }
        dispatch({ type: "SET_LOADING_MORE", payload: false });
        dispatch({ type: "SET_LOADING", payload: false });
      })
      .catch((error) => {
        console.error("Error:", error);
        dispatch({ type: "SET_LOADING_MORE", payload: false });
        dispatch({ type: "SET_LOADING", payload: false });
      });
  };

  useEffect(() => {
    handleContent();
  }, [strategy, page]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#1b1b1d",
      }}
    >
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#1b1b1d",
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
                {content[0]?.id ? (
                  content?.map((item: ContentProps, index: number) => (
                    <CardContent item={item} key={index} />
                  ))
                ) : (
                  <View>
                    <Text>{error?.message}</Text>
                  </View>
                )}

                {loading_more ? (
                  <View
                    style={{
                      paddingVertical: 10,
                    }}
                  >
                    <ActivityIndicator size="small" color="gray" />
                  </View>
                ) : null}
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
