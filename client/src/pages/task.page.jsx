import { useState, useEffect } from "react";
// Components
import AuthNotice from "../components/authnotice";
import Navbar from "../components/navbar";
import TaskList from "../components/tasklist";

//Modals
import AuthBox from "../modals/authbox";

// Api Functions
import { checkAuth, logout } from "../api/auth.api";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Verify Auth
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const result = await checkAuth();
        console.log("checkAuth() result:", result);

        if (result?.user) {
          console.log("User is logged in:", result.user.username);
          setIsLoggedIn(true);
        } else {
          console.log("No user in response");
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.log("User is NOT logged in:", err.message);
        setIsLoggedIn(false);
      }
    };

    verifyAuth();
  }, [isLoggedIn]);

  return (
    <>
      {!isLoggedIn && <AuthNotice setIsAuthModalOpen={setIsAuthModalOpen} />}

      {isLoggedIn && (
        <div className="max-w-5xl mx-auto flex justify-end mt-2 ">
          <button
            onClick={async () => {
              try {
                await logout();
                setIsLoggedIn(false);
              } catch (err) {
                console.error("Logout failed:", err.message);
              }
            }}
            className="border-b border-b-primary text-white  hover:text-red-600 cursor-pointer mr-2"
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
