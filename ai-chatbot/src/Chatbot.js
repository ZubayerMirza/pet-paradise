import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./Chatbot.css";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const chatWithGPT3 = async (userInput) => {
    // Define set responses for specific questions
    const setResponses = {
      "hello": "Hello there! How can I assist you today?",
      "how are you?": "I'm just a simple AI chatbot, but I'm here to help you with any questions you have about pets!",
      "pet adoption": "Pet adoption is a wonderful way to give a loving home to a furry friend in need. You can check out local animal shelters or rescue organizations for pets available for adoption.",
      // Add more set responses for other specific questions as needed
    };

    // Check if the user's input matches any set responses
    const userInputLowercase = userInput.toLowerCase();
    if (setResponses[userInputLowercase]) {
      return setResponses[userInputLowercase];
    }

    // Check if the user's input is about pet care
    if (userInput.toLowerCase().startsWith("how do i take care of my")) {
      // Extract the type of pet from the user's input
      const petType = userInput.split("my ")[1];
      // Generate a response based on the pet type using the AI model
      const aiResponse = await generateAIResponse(`How do I take care of my ${petType}?`);
      return aiResponse;
    }

    // Check if the user's input contains time-related phrases
    const timePhrases = ["time", "clock", "hour", "minute", "second", "today", "now"];
    if (timePhrases.some(phrase => userInput.toLowerCase().includes(phrase))) {
      return "I'm sorry, I cannot provide the current time. As an AI, I do not have access to real-time information.";
    }

    // Generate a response using the AI model for any other user input
    const aiResponse = await generateAIResponse(userInput);
    return aiResponse;
  };

  const generateAIResponse = async (input) => {
    const apiEndpoint =
      "https://api.openai.com/v1/engines/gpt-3.5-turbo-instruct/completions";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer sk-proj-vIdyEY6fxIz0X78kS631T3BlbkFJb4CLP3PzLirFfcDoMhse`,
    };

    const data = {
      prompt: input,
      max_tokens: 150,
    };

    try {
      const response = await axios.post(apiEndpoint, data, { headers });
      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error("Error communicating with the API:", error.message);
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { text: input, user: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    const aiMessage = { text: "...", user: false };
    setMessages((prevMessages) => [...prevMessages, aiMessage]);
    const response = await chatWithGPT3(input);
    const newAiMessage = { text: response, user: false };
    setMessages((prevMessages) => [...prevMessages.slice(0, -1), newAiMessage]);
    setInput("");
  };

  return (
    <div className="chatbot-container">
      <div className="sidebar">
        <div classname="sidebar-button-container">
          <button className="sidebar-button" onClick={() => console.log("Go to homepage")}>
            Homepage
          </button>
          <button className="sidebar-button2" onClick={() => console.log("Open settings")}>
            Settings
          </button>
        </div>
      </div>
      <div className="chatbot-content">
        <h1 className="chatbot-heading">Pet Paradise AI</h1> {/* Added heading */}
        {/* Your existing JSX for chat container */}
        <div className="chatbot-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.user ? "user-message" : "ai-message"
              }`}
            >
              {message.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {/* Your existing JSX for input form */}
        <form className="chatbot-input-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Send a message"
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
