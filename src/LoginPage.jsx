import Login from "./Login";
import Logout from "./Logout";
import "./LoginPage.css";
import { useGlobalStore } from "./store";
import { useEffect } from "react";

function LoginPage() {
  let GlobalValue = useGlobalStore((state) => state.GlobalValue);

  return (
    <div className="LoginPage">
      <h2>Login</h2>
      {!GlobalValue ? <Login /> : <Logout />}
    </div>
  );
}

export default LoginPage;