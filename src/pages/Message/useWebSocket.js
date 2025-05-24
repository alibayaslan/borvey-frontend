import { useEffect, useRef, useState } from "react";

const useWebSocket = (url) => {
  const [messages, setMessages] = useState([]); // Gelen mesajları saklamak için state
  const [status, setStatus] = useState("disconnected"); // Bağlantı durumu
  const socketRef = useRef(null); // WebSocket referansı

  useEffect(() => {
    // WebSocket'e bağlan
    socketRef.current = new WebSocket(url);

    // Bağlantı açıldığında
    socketRef.current.onopen = () => {
      setStatus("connected");
      console.log("WebSocket bağlantısı açıldı.");
    };

    // Mesaj alındığında
    socketRef.current.onmessage = (event) => {
      const currentMessage = JSON.parse(event.data);
      const values = Object.values(currentMessage);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          ...values[0],
          messageId: values[1],
        },
      ]);
    };

    // Bağlantı kapandığında
    socketRef.current.onclose = () => {
      setStatus("disconnected");
      console.log("WebSocket bağlantısı kapandı.");
    };

    // Bağlantı hatası oluştuğunda
    socketRef.current.onerror = (error) => {
      setStatus("error");
      console.error("WebSocket hatası:", error);
    };

    // Component unmount olduğunda WebSocket bağlantısını kapat
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [url]); // url değiştiğinde WebSocket bağlantısını yeniden kur

  // Mesaj göndermek için fonksiyon
  const sendMessage = (message) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
    }
  };

  return {
    messages, // Gelen mesajları kullanmak için
    status, // Bağlantı durumunu izlemek için
    sendMessage, // Mesaj göndermek için
  };
};

export default useWebSocket;
