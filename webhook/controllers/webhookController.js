// import { sendReplyMessage, markMessageAsRead } from "../services/whatsappService.js";

// // Handle incoming webhook requests
// export const handleWebhook = async (req, res) => {
//   console.log("Incoming webhook message:", JSON.stringify(req.body, null, 2));

//   const message = req.body.entry?.[0]?.changes[0]?.value?.messages?.[0];

//   if (message?.type === "text") {
//     const businessPhoneNumberId = req.body.entry?.[0].changes?.[0].value?.metadata?.phone_number_id;
    
//     let replyMessage = message.text.body; // Default reply message

//     // Customize the response based on the message content
//     if (message.text.body.toLowerCase().includes("hi")) {
//       replyMessage = "Hello! How can I assist you today?";
//     } else if (message.text.body.toLowerCase().includes("help")) {
//       replyMessage = "Sure! How can I help you? Feel free to ask any questions.";
//     } else if (message.text.body.toLowerCase().includes("bye")) {
//       replyMessage = "Goodbye! Have a great day!";
//     }

//     try {
//       // Send the reply to the user
//       await sendReplyMessage(businessPhoneNumberId, message.from, replyMessage, message.id);
      
//       // Mark the message as read
//       await markMessageAsRead(businessPhoneNumberId, message.id);

//       console.log("Reply sent successfully!");
//     } catch (error) {
//       console.error("Error sending reply:", error);
//     }
//   }

//   // Send a response back to Facebook to acknowledge the webhook
//   res.sendStatus(200);
// };

// // Verify webhook subscription with Facebook
// export const verifyWebhook = (req, res) => {
//   const mode = req.query["hub.mode"];
//   const token = req.query["hub.verify_token"];
//   const challenge = req.query["hub.challenge"];

//   if (mode === "subscribe" && token === process.env.WEBHOOK_VERIFY_TOKEN) {
//     res.status(200).send(challenge); // Respond with challenge token
//     console.log("Webhook verified successfully!");
//   } else {
//     res.sendStatus(403); // Forbidden if tokens don't match
//   }
// };
import { sendReplyMessage, markMessageAsRead } from "../services/whatsappService.js";

// Handle incoming webhook requests
export const handleWebhook = async (req, res) => {
  console.log("Incoming webhook message:", JSON.stringify(req.body, null, 2));

  const message = req.body.entry?.[0]?.changes[0]?.value?.messages?.[0];

  if (message?.type === "text") {
    const businessPhoneNumberId = req.body.entry?.[0].changes?.[0].value?.metadata?.phone_number_id;
    
    let replyMessage = message.text.body; // Default reply message

    // Customize the response based on the message content
    if (message.text.body.toLowerCase().includes("hi")) {
      replyMessage = "Hello! How can I assist you today?";
    } else if (message.text.body.toLowerCase().includes("help")) {
      replyMessage = "Sure! How can I help you? Feel free to ask any questions.......";
    }
     else if (message.text.body.toLowerCase().includes("bye")) {
      replyMessage = "Goodbye! Have a great day!";
    }
     else if (message.text.body.toLowerCase().includes("opt")) {
      replyMessage = "Subsription opr-out Sucessfully!";
    }
     else if (message.text.body.toLowerCase().includes("image")) {
      // If the user asks for an image, respond with an image URL
      replyMessage = "Here is an image for you: https://example.com/sample-image.jpg"; // Replace with your actual image URL
    } else if (message.text.body.toLowerCase().includes("document")) {
      // If the user asks for a document, respond with a document URL
      replyMessage = "Here is a document for you: https://example.com/sample-document.pdf"; // Replace with your actual document URL
    }

    try {
      // Send the reply to the user (could be text, image, or document)
      await sendReplyMessage(businessPhoneNumberId, message.from, replyMessage, message.id);
      
      // Mark the message as read
      await markMessageAsRead(businessPhoneNumberId, message.id);

      console.log("Reply sent successfully!");
    } catch (error) {
      console.error("Error sending reply:", error);
    }
  }

  // Send a response back to Facebook to acknowledge the webhook
  res.sendStatus(200);
};

// Verify webhook subscription with Facebook
export const verifyWebhook = (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === process.env.WEBHOOK_VERIFY_TOKEN) {
    res.status(200).send(challenge); // Respond with challenge token
    console.log("Webhook verified successfully!");
  } else {
    res.sendStatus(403); // Forbidden if tokens don't match
  }
};
