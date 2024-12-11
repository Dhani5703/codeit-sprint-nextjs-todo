import React from "react";
import Image from "next/image";

export interface TodoItemProps {
  id: number;
  name: string;
  completed: boolean;
  onToggleComplete: (id: number, isCompleted: boolean) => void;
  onViewDetails?: (id: number) => void;
  onEditName: (newName: string) => void; // 이름 수정 콜백
  isDetailPage?: boolean;
  isEditable?: boolean; // 이름 수정 가능 여부
}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  name,
  completed,
  onToggleComplete,
  onViewDetails,
  onEditName,
  isDetailPage = false,
  isEditable = false,
}) => {
  return (
    <div
      className="todo-item flex items-center p-2 mb-2 border-b"
      style={{
        backgroundImage: `url('/Property 1=${completed ? "Variant2" : "Default"}.png')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        padding: "8px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Image
        src={`/Property 1=${completed ? "Done" : "Todo"}.png`}
        alt={completed ? "Done" : "Todo"}
        onClick={() => onToggleComplete(id, completed)}
        className="cursor-pointer w-6 h-6"
        width={32}
        height={32}
      />
      {isEditable ? (
        <div className="flex items-center flex-1">
          <input
            type="text"
            value={name}
            onChange={(e) => onEditName(e.target.value)} // 이름 변경 처리
            className="flex-1 p-2 rounded"
          />
        </div>
      ) : (
        <span
          onClick={isDetailPage ? undefined : () => onViewDetails?.(id)}
          className={`flex-1 ${completed ? "text-gray-400" : ""} cursor-pointer`}
          style={{
            pointerEvents: isDetailPage ? "none" : "auto",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {name}
        </span>
      )}
    </div>
  );
};

export default TodoItem;
