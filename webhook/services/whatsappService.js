
import axios from "axios";

// Function to send a reply message to the user
export const sendReplyMessage = async (businessPhoneNumberId, to, message, messageId) => {
  const url = `https://graph.facebook.com/v18.0/${businessPhoneNumberId}/messages`;

  const data = {
    messaging_product: "whatsapp",
    to: to,
    text: { body: message }, // Default text message
    context: { message_id: messageId },
  };

  try {
    // You can extend this to handle other types of messages (e.g., media, documents, etc.)
    if (message.startsWith("http")) {
      // If the message starts with 'http', assume it's a URL (like an image or document)
      data.type = "image";
      data.image = { link: message };
    }

    // Send the request to WhatsApp API
    await axios({
      method: "POST",
      url: url,
      headers: {
        Authorization: `Bearer ${process.env.GRAPH_API_TOKEN}`,
      },
      data: data,
    });
  } catch (error) {
    console.error("Error sending reply:", error.response ? error.response.data : error.message);
    throw new Error("Error sending reply message");
  }
};

// Function to mark the message as read
export const markMessageAsRead = async (businessPhoneNumberId, messageId) => {
  const url = `https://graph.facebook.com/v18.0/${businessPhoneNumberId}/messages`;

  try {
    await axios({
      method: "POST",
      url: url,
      headers: {
        Authorization: `Bearer ${process.env.GRAPH_API_TOKEN}`,
      },
      data: {
        messaging_product: "whatsapp",
        status: "read",
        message_id: messageId,
      },
    });
  } catch (error) {
    console.error("Error marking message as read:", error.response ? error.response.data : error.message);
    throw new Error("Error marking message as read");
  }
};
