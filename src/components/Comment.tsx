import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { MarkdownContent } from "./MarkdownContent";
import { get_content_comment } from "../../services/AxiosRequest";

interface CommentProps {
  comment: any;
  onReply: () => void;
}
export const Comment = ({ comment, onReply }: CommentProps) => {
  const [replyText, setReplyText] = useState("");
  const [replies, setReplies] = useState<any>([]);
  const [commentChild, setCommentChild] = useState<any>([]);

  const handleReply = () => {
    // if (replyText.trim() !== "") {
    //   const newReply = { id: replies.length + 1, text: replyText };
    //   setReplies([...replies, newReply]);
    //   setReplyText("");
    // }
  };

  useEffect(() => {
    if (comment.children_deep_count > 0) {
      get_content_comment(comment.slug, comment.owner_username).then(
        (response) => {
          setCommentChild(response);
        }
      );
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          marginLeft: 20,
          padding: 10,
          borderLeftColor: "#cfd3d4",
          borderLeftWidth: 1,
          borderBottomStartRadius: 10,
        }}
      >
        <View
          style={{
            backgroundColor: "#09a5de",
            width: 100,
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "#05739c",
              padding: 2,
            }}
          >
            {comment.owner_username}
          </Text>
        </View>
        <View
          style={{
            borderBottomColor: "gray",
            borderBottomWidth: 2,
          }}
        >
          <MarkdownContent markdownText={comment.body} />
        </View>
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity onPress={onReply}>
            <Text>Responder</Text>
          </TouchableOpacity>

          {commentChild.length > 0 &&
            commentChild.map((reply: any) => (
              <Comment key={reply.id} comment={reply} onReply={() => {}} />
            ))}
        </View>
      </View>
    </View>
  );
};
