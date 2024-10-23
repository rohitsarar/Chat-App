import Conversation from "../models/conversation.models.js";  // Import Conversation model
import Message from "../models/message.model.js";  // Import Message model if you are using it



export const sendMessage = async (req, res) => {
   try {
       const { message } = req.body;
       const { id: receiverId } = req.params;
       const senderId = req.user._id;  // यह देखने के लिए लॉग करें कि senderId सही है
       
       console.log("Sender ID:", senderId);
       console.log("Receiver ID:", receiverId);
       console.log("Message:", message);

       // यहाँ conversation को खोजें
       let conversation = await Conversation.findOne({
           participants: { $all: [senderId, receiverId] },
       });

       if (!conversation) {
           console.log("Creating new conversation");
           conversation = await Conversation.create({
               participants: [senderId, receiverId],
           });
       }

       const newMessage = new Message({
           senderId,
           receiverId,
           message,
       });

       // नए संदेश को कन्वर्सेशन में जोड़ें
       if (newMessage) {
           conversation.messages.push(newMessage._id);
       }

       await conversation.save();
       await newMessage.save();

       console.log("Message sent successfully");
       return res.status(200).json({ message: "Message sent successfully" });
   } catch (error) {
       console.log("Error in sendMessage Controller:", error.message);
       return res.status(500).json({ error: "Internal server error" });
   }
};









export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");  // Make sure this field matches your schema


        console.log("Retrieved Conversation:", conversation);


        if (!conversation) 
            return res.status(404).json([]);
        
        const messages=conversation.messages;


        console.log("Messages in Conversation:", messages);

        res.status(200).json(messages);
    } catch (error) {
        console.error("Error in getMessages Controller:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};


