import  { useContext } from "react"; 
import { Context }  from "@/context";
import { useRouter } from "next/router";
import axios from "axios";

const Auth = () => {
  const { username, setUsername, secret, setSecret } = useContext(Context);
  const router = useRouter();

  function onSubmit(e) {
    e.preventDefault();

    if (username.length < 1 || secret.length < 1) {
      return;
    }
    axios.post(`/api/set_task`,{username:username,secret:secret})
    .then((res)=>console.log(res)).catch(err=>console.log(err))
    axios
      .put(
        "https://api.chatengine.io/users/",
        { username, secret },
        { headers: { "Private-Key": "7807a946-c2ac-41b9-b47a-47bcac684e2d" }
      })
      .then((r) => {
        router.push("/chats");
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors or provide user feedback here
      });
  }

  return (
    <div className="background">
      <div className="auth-container">
        <form className="auth-form" onSubmit={(e) => onSubmit(e)}>
          <div className="auth-title">NextJS Chat</div>
          <div className="input-container">
            <input
              placeholder="Email"
              className="text-input"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Password"
              className="text-input"
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
