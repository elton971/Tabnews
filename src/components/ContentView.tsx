import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import {
  get_content_comment,
  get_content_slug,
} from "../../services/AxiosRequest";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView, State } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../store/slice/Content.slice";
import { RootState } from "../../store/store";
import { ActivityIndicator } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { Comment } from "./Comment";
import { MarkdownContent } from "./MarkdownContent";

export default function ContentView() {
  const [content, setContent] = useState({} as any);
  const route: any = useRoute();
  const { item } = route.params;
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.content.loading);
  const [coment, setComment] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(setLoading(true));
    getContent();
    getComment();
    setNavigaiton();
  }, []);
  const setNavigaiton = () => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity>
          <MaterialIcons name="favorite-border" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  };

  const getContent = () => {
    get_content_slug(item.slug, item.owner_username).then((response) => {
      setContent(response);
      dispatch(setLoading(false));
    });
  };
  const getComment = () => {
    if (item.children_deep_count > 0) {
      get_content_comment(item.slug, item.owner_username).then((response) => {
        setComment(response);
      });
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ height: "100%" }}
      >
        {loading ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              marginTop: "50%",
            }}
          >
            <ActivityIndicator color="#e0e0e0" size={50} />
          </View>
        ) : content && content.length !== 0 ? (
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
          >
            <View>
              <View>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: "bold",
                    marginBottom: 10,
                  }}
                >
                  {content.title}
                </Text>
              </View>
              <View>
                <View>
                  <View>
                    <MarkdownContent markdownText={content.body} />
                  </View>
                  <View>
                    <View style={styles.commentContainer}>
                      <TouchableOpacity style={styles.replyButton}>
                        <Text>Responder</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View>
                  <Text
                    style={{
                      color: "#000",
                      fontSize: 20,
                      fontWeight: "bold",
                      paddingVertical: 10,
                    }}
                  >
                    {coment.length > 0 && "Comentarios"}
                  </Text>
                  {coment.length > 0 &&
                    coment.map((comment: any) => {
                      return (
                        <Comment
                          key={comment.id}
                          comment={comment}
                          onReply={() => {}}
                        />
                      );
                    })}
                </View>
              </View>
            </View>
          </View>
        ) : (
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
              style={{
                width: "100%",
                height: 300,
              }}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  commentContainer: {
    borderColor: "#e0e0e0",
    borderWidth: 1,
    padding: 20,
    borderRadius: 5,
  },
  replyButton: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 5,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#e0e0h1",
    borderWidth: 1,
  },
});
