import { useState, useEffect } from "react";
// Components
import AuthNotice from "../components/authnotice";
import Navbar from "../components/navbar";
import TaskList from "../components/tasklist";

// Modals
import AuthBox from "../modals/authbox";

// API Functions
import { checkAuth, logout } from "../api/auth.api";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Verify Auth
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const result = await checkAuth();
        if (result?.user) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.log("Auth check failed:", err.response?.data || err.message);

        if (err.response?.status === 401) {
          console.warn("Session expired. Prompting re-login.");
          setIsAuthModalOpen(true);
        }

        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin h-10 w-10 border-2 border-black border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <>
      {!isLoggedIn && <AuthNotice setIsAuthModalOpen={setIsAuthModalOpen} />}

      {isLoggedIn && (
        <div className="max-w-5xl mx-auto flex justify-end mt-2">
          <button
            onClick={async () => {
              try {
                await logout();
                setIsLoggedIn(false);
              } catch (err) {
                console.error("Logout failed:", err.message);
              }
            }}
            className="border-b border-b-primary text-white hover:text-red-600 cursor-pointer mr-2"
          >
            Logout
          </button>
        </div>
      )}

      <Navbar setTasks={setTasks} />
      <TaskList tasks={tasks} setTasks={setTasks} />

      {isAuthModalOpen && (
        <AuthBox
          setIsAuthModalOpen={setIsAuthModalOpen}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
    </>
  );
}
