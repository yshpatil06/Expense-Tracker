import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { logout } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Welcome 🎉</h1>
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}