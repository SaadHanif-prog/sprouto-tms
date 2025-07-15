import { useState } from "react";

//Modals
import AddTaskModal from "../modals/add-task-modal";

// Icons
import { Plus } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="max-w-5xl mx-auto px-1 border-b border-b-primary ">
        <div className="flex justify-between items-center">
          <div className="hidden md:block">
            <img src="/images/logo-full.svg" alt="Sprouto Logo" />
          </div>
          <div className="w-[100px] md:w-[150px]">
            <img src="/images/tms.png" alt="TMS Logo" />
          </div>
          <div
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-x-2 text-primary border border-primary p-1 md:p-2 rounded-md hover:rounded-full cursor-pointer mr-1.5 md:mr-0 "
          >
            <span className="text-lg md:text-2xl ">Create Task</span>
            <Plus className="text-green-400" size={30} />
          </div>
        </div>
      </header>

      {isOpen && (
        <AddTaskModal
          onClose={() => setIsOpen(false)}
          // onSubmit={handleAddTask}
        />
      )}
    </>
  );
}
