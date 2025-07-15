import { useState } from "react";
// Components
import AuthNotice from "../components/authnotice";
import Navbar from "../components/navbar";
import TaskList from "../components/tasklist";

//Modals
import AuthBox from "../modals/authbox";

export default function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <>
      <AuthNotice setIsAuthModalOpen={setIsAuthModalOpen} />
      <Navbar />;
      <TaskList />
      {isAuthModalOpen && <AuthBox setIsAuthModalOpen={setIsAuthModalOpen} />}
    </>
  );
}
