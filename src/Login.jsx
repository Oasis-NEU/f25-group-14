import { GoogleLogin } from "@react-oauth/google";

function Login() {
  const handleLoginSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    localStorage.setItem("google_credential", token);
    const payload = JSON.parse(atob(token.split(".")[1]));
    console.log("User Info:", payload);
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