import { useGlobalStore } from "./store";

function Logout() {
  const setGlobalValue = useGlobalStore((state) => state.setGlobalValue);

  const handleLogout = () => {
    localStorage.removeItem("google_credential");
    console.log("User logged out!");
    setGlobalValue(false)
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}

export default Logout;