import { View, SafeAreaView, ScrollView, Image } from "react-native";
import { useEffect, useMemo } from "react";
import { ActivityIndicator } from "react-native-paper";
import { CardContent } from "../components/CardContent";
import { get_content } from "../../services/AxiosRequest";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setContent, setLoading } from "../../store/slice/Content.slice";
import { getAuthUserCredential } from "../../services/storage";
import { setToken } from "../../store/slice/Auth.slice";

export const HomeScreen = () => {
  const dispatch = useDispatch();
  const content = useSelector((state: RootState) => state.content.content);
  const loading = useSelector((state: RootState) => state.content.loading);
  const token = useSelector((state: RootState) => state.auth.token);
  const handleScroll = (event: any) => {};

  useEffect(() => {
    if (!content || content.length === 0) {
      const fetchData = async () => {
        try {
          const res = await getAuthUserCredential();
          dispatch(setToken(res.token));
          const response = await get_content(1, res.token);
          dispatch(setLoading(true));
          dispatch(setContent(response));
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, []);

  const contentToRender = useMemo(() => {
    if (content && content.length !== 0) {
      return content.map((item, index: number) => (
        <CardContent item={item} key={index} />
      ));
    } else {
      return (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: "50%",
          }}
        >
          <Image
            source={require("../../assets/error.jpg")}
            resizeMode="contain"
            style={{ width: "100%", height: 300 }}
          />
        </View>
      );
    }
  }, [content]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
        <View style={{ flex: 1 }}>
          {loading ? (
            <View style={{ flex: 1, paddingTop: 350 }}>
              <ActivityIndicator size="large" color={"#fff"} />
            </View>
          ) : (
            <View style={{ paddingHorizontal: 15 }}>{contentToRender}</View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
