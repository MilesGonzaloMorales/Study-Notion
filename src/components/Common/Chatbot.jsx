import React, { useState } from "react";
const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const handleSend = async () => {
    const message = userInput.trim();
    if (!message) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: message }]);
    setUserInput("");
    setLoading(true);

    try {
      // const response = await fetch("/chat/message", {
      const response = await fetch("http://localhost:4000/chat/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      // Add bot response
      setMessages((prev) => [...prev, { sender: "bot", text: data.response }]);
    } catch (error) {
      console.log("This line")
      console.error("Error:", error);
      setMessages((prev) => [...prev, { sender: "bot", text: "Something went wrong." }]);
    } finally {
      setLoading(false);
    }
  };    

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };


  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700"
        >
          💬 Chat
        </button>
      </div>
    );
  }
  return (
    <div className="fixed bottom-4 right-4 w-[30%] h-[50%] shadow-lg rounded-lg border border-gray-300 flex flex-col bg-white overflow-hidden z-50">
      <div className="bg-blue-900 text-white px-4 py-2 font-bold text-center">
        <span>StudyNotion ChatBot    </span> 
        <button onClick={() => setIsOpen(false)} className="text-white font-bold">
          ✖
        </button>
      </div>

      <div className="flex-1 p-3 overflow-y-auto space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-lg max-w-[80%] ${
              msg.sender === "user"
                ? "bg-blue-600 text-white self-end ml-auto"
                : "bg-gray-200 text-gray-800 self-start mr-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
         {loading && (
          <div className="bg-gray-200 text-gray-800 p-2 rounded-lg self-start w-fit">
            Typing...
          </div>
        )}
      </div>

      <div className="p-3 border-t flex gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-grow px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
