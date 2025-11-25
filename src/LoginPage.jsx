import Login from "./Login";
import Logout from "./Logout";
import "./LoginPage.css";

function LoginPage() {

  return (
    <div className="LoginPage">
      <h2>Login</h2>
      <Login/>
      <Logout/>
    </div>
  );
}

export default LoginPage;