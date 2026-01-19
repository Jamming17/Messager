import { useState } from "react";

function App() {

    const [messages, setMessages] = useState<string[]>([]);
    const [typedMessage, setTypedMessage] = useState<string>("");

    function writeMessage(e: React.ChangeEvent<HTMLInputElement>): void {
        setTypedMessage(e.target.value);
    }
    
    function sendMessage(): void {
        setMessages([
            ...messages,
            ("me: " + typedMessage)
        ]);
        setTypedMessage("");
    }

  return (
    <>
        {/* Messages */}
        <div>
            {messages.map((message) => {
                return <p>{message}</p>
            })}
        </div>
        <input type="text" className="w-auto p-2 m-3 border border-black" onChange={writeMessage} value={typedMessage}/>
        <button className="p-2 border border-red-800 m-3" onClick={sendMessage}>Send</button>
    </>
  )
}

export default App;