// React Toastify
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

// Pages
import Tasks from "./pages/task.page";

export default function App() {
  return (
    <>
      <Tasks />
      <ToastContainer />
    </>
  );
}
