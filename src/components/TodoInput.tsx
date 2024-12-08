import React from "react";
import Image from "next/image";

interface TodoInputProps {
  newTodo: string;
  setNewTodo: React.Dispatch<React.SetStateAction<string>>;
  addTodo: () => void;
}

const TodoInput: React.FC<TodoInputProps> = ({
  newTodo,
  setNewTodo,
  addTodo,
}) => {
  return (
    <div className="flex items-center gap-0 w-full">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") addTodo();
        }}
        placeholder="할 일을 입력하세요"
        className="text-gray-700 flex-grow rounded-l-lg sm:w-[calc(100%-168px)] w-full h-14 bg-[url('/search.png')] bg-center bg-no-repeat bg-contain bg-transparent"
        style={{ backgroundSize: "100% 80%" }}
      />
      <button
        onClick={addTodo}
        className="bg-center bg-no-repeat mb-3 bg-contain w-[168px] h-14 sm:w-[56px] sm:h-12 rounded-r-lg"
        disabled={!newTodo.trim()}
      >
        <span className="sm:hidden">
          <Image
            src={
              newTodo.trim()
                ? "/Type=Add, Size=Small, State=Active.png"
                : "/Type=Add, Size=Small, State=Default.png"
            }
            alt="Button Image"
            width={40}
            height={40}
          />
        </span>
        <span className="hidden sm:block">
          <Image
            src={
              newTodo.trim()
                ? "/Type=Add, Size=Large, State=Active.png"
                : "/Type=Add, Size=Large, State=Default.png"
            }
            alt="Button Image"
            width={168}
            height={56}
          />
        </span>
      </button>
    </div>
  );
};

export default TodoInput;
