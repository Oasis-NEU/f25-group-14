function Logout() {
  const handleLogout = () => {
    localStorage.removeItem("google_credential");
    console.log("User logged out!");
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}

export default Logout;