import { useContext } from "react";
import { Context } from "../context";
import { useRouter } from "next/router";
import axios from "axios";

const Auth = () => {
  const { username, setUsername, secret, setSecret } = useContext(Context);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (username.length < 1 || secret.length < 1) {
      return;
    }

    try {
  
      const setTaskResponse = await axios.post("/api/set_task", {
        username: username,
        secret: secret,
      });
      console.log(setTaskResponse);

      const chatEngineResponse = await axios.put(
        
        "https://api.chatengine.io/users/",
        { username, secret },
        {
          headers: { "Private-Key": "7807a946-c2ac-41b9-b47a-47bcac684e2d" },

        }

      );
    console.log(chatEngineResponse)

      router.push("/chats");
    } catch (error) {
      console.error("Error:", error);
    
    }
  };

  return (
    <div className="background">
    <div className="auth-container">
      <form className="auth-form" onSubmit={onSubmit}>
        <div className="auth-title">NextJS Chat</div>
        <div className="input-container">
          <input
            placeholder="Email"
            className="text-input"
            id="input"
            name="email"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Password"
            className="text-input"
            id="inputt"
            name="password"
            onChange={(e) => setSecret(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">
          Login / Sign Up
        </button>
      </form>
    </div>
  </div>
);
};

  


export default Auth;
