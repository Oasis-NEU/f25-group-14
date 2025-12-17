import { GoogleLogin } from "@react-oauth/google";
import { useGlobalStore } from "./store";


function Login() {
  const GlobalValue = useGlobalStore((state) => state.GlobalValue);
  const setGlobalValue = useGlobalStore((state) => state.setGlobalValue);

  const handleLoginSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    localStorage.setItem("google_credential", token);
    const payload = JSON.parse(atob(token.split(".")[1]));
    console.log("User Info:", payload);
    setGlobalValue(true)
  };

  const handleLoginError = () => {
    console.log("LOGIN FAILED");
  };

  return (
    <div id="signInButton">
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginError}
      />
    </div>
  );
}

export default Login;