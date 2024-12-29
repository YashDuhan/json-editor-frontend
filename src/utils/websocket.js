let ws = null;

export const setupWebSocket = (onMessage) => {
  ws = new WebSocket(
    "ws://ec2-13-49-68-118.eu-north-1.compute.amazonaws.com:8000/ws"
  );

  ws.onopen = () => {
    console.log("WebSocket Connected");
  };

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      onMessage(data);
    } catch (error) {
      console.error("Error parsing WebSocket message:", error);
    }
  };

  ws.onclose = () => {
    console.log("WebSocket Disconnected");
  };

  ws.onerror = (error) => {
    console.error("WebSocket Error:", error);
  };

  return () => {
    if (ws) ws.close();
  };
};

export const sendWebSocketMessage = (data) => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(data));
  } else {
    console.error("WebSocket is not connected");
  }
};
