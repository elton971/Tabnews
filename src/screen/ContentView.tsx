import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  get_content_comment,
  get_content_slug,
} from "../../services/AxiosRequest";
import { useRoute } from "@react-navigation/native";
import { ScrollView, State } from "react-native-gesture-handler";
import MarkdownDisplay from "react-native-markdown-display";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../store/slice/Content.slice";
import { RootState } from "../../store/store";
import { ActivityIndicator } from "react-native-paper";
import Timeline from "react-native-timeline-flatlist";

export const MarkdownContent = ({ markdownText }: { markdownText: string }) => {
  return (
    <Text style={{ padding: 10 }}>
      {/* @ts-ignore */}
      <MarkdownDisplay style={{}}>{markdownText}</MarkdownDisplay>
    </Text>
  );
};

export default function ContentView() {
  const [content, setContent] = useState({} as any);
  const route: any = useRoute();
  const { item } = route.params;
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.content.loading);
  const [coment, setComment] = useState([]);

  useEffect(() => {
    dispatch(setLoading(true));
    get_content_slug(item.slug, item.owner_username).then((response) => {
      setContent(response);
      dispatch(setLoading(false));
    });
    if (item.children_deep_count > 0) {
      get_content_comment(item.slug, item.owner_username).then((response) => {
        setComment(response);
        console.log(response);
      });
    }
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
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
        ) : (
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
              <Timeline
                showTime={false}
                data={[
                  {
                    description: (
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
                    ),
                  },
                  {
                    description: coment.map((content) => (
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
                    )),
                  },
                ]}
              />
            </View>
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
