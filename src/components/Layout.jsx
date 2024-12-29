import { useEffect, useState } from "react";
import Editor from "./layout/Editor";
import { setupWebSocket, sendWebSocketMessage } from "../utils/websocket";
import AIAssistant from "./layout/AIAssistant";
import Preview from "./layout/Preview";

const Layout = () => {
  // Select Text
  const [selectedText, setSelectedText] = useState("");
  // Handle text selection across the entire layout
  const handleTextSelection = () => {
    const selection = window.getSelection().toString();
    if (selection) {
      setSelectedText(selection);
    }
  };
  // Json data (to be pre-fetched)
  const [jsonData, setJsonData] = useState({
    template: {
      sections: [
        {
          id: "section1",
          content: "This is editable text",
          style: {
            font: "Arial",
            size: "16px",
          },
        },
        {
          id: "section2",
          content: "Another text block",
          style: {
            font: "Times New Roman",
            size: "14px",
          },
        },
      ],
    },
  });

  useEffect(() => {
    const cleanupWebSocket = setupWebSocket((data) => {
      // Merge incoming updates into jsonData
      setJsonData((prevData) => ({
        ...prevData,
        ...data,
      }));
    });

    // Cleanup WebSocket on unmount
    return cleanupWebSocket;
  }, []);

  // Handle JSON updates from the editor and sync them via WebSocket
  const handleJsonUpdate = (updatedData) => {
    setJsonData(updatedData); // Update local state with the new JSON
    sendWebSocketMessage(updatedData); // Send updates to the server
  };

  return (
    <div
      className="container mx-auto p-4 space-y-4"
      onMouseUp={handleTextSelection}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Editor jsonData={jsonData} setJsonData={handleJsonUpdate} />
        <AIAssistant
          selectedText={selectedText}
          jsonData={jsonData}
          setJsonData={setJsonData}
        />
      </div>
      <Preview jsonData={jsonData} />
    </div>
  );
};

export default Layout;
