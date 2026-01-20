import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Home() {
    const { user, loading } = useAuth();

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
        {!user ?
            <p>Not logged in!</p> :
            <p>Welcome, {loading ? "" : user.username}!</p>
        }
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

export default Home;