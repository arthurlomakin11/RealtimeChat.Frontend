import { gql } from "@apollo/client";

export const GET_MESSAGES = gql`
  query GetMessages($id: Int!) {
    messages(chatRoomId: $id) {
      chatRoomId
      id
      senderId
      sentAt
      content {
        ... on TextMessageContentGraph {
          text
        }
      }
    }
  }
`;

export const GET_FILTERED_MESSAGES = gql`
  query GetFilteredMessages($chatRoomId: Int!, $searchString: String!) {
    filteredMessages(chatRoomId: $chatRoomId, searchString: $searchString) {
      chatRoomId
      id
      senderId
      sentAt
      content {
        ... on TextMessageContentGraph {
          text
        }
      }
    }
  }
`;

export const MESSAGE_SUBSCRIPTION = gql`
  subscription subscription {
    onMessageUpdated {
      eventType
      message {
        id
        senderId
        sentAt
        content {
          ... on TextMessageContentGraph {
            text
          }
        }
      }
    }
}
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($chatRoomId: Int!, $senderId: String!, $text: String!) {
    sendMessage(chatRoomId: $chatRoomId, senderId: $senderId, text: $text) {
      id
      senderId
      sentAt
      content {
        __typename
        ... on TextMessageContentGraph {
          text
        }
      }
    }
  }
`;

export const EDIT_MESSAGE = gql`
  mutation EditMessage($messageId: Int!, $newText: String!) {
    editMessage(messageId: $messageId, newText: $newText) {
      id
      content {
        __typename
        ... on TextMessageContentGraph {
          text
        }
      }
    }
  }
`;

export const DELETE_MESSAGE = gql`
  mutation DeleteMessage($messageId: Int!) {
    deleteMessage(messageId: $messageId) {
      id
    }
  }
`;