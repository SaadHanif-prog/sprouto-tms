import { useState } from "react";
// Components
import AuthNotice from "../components/authnotice";
import Navbar from "../components/navbar";
import TaskList from "../components/tasklist";

//Modals
import AuthBox from "../modals/authbox";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <>
      <AuthNotice setIsAuthModalOpen={setIsAuthModalOpen} />
      <Navbar setTasks={setTasks} />;
      <TaskList tasks={tasks} setTasks={setTasks} />
      {isAuthModalOpen && <AuthBox setIsAuthModalOpen={setIsAuthModalOpen} />}
    </>
  );
}
