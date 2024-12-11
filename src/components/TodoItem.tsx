import React from "react";
import Image from "next/image";

export interface TodoItem {
  id: number;
  name: string;
  isCompleted: boolean;
  memo?: string;
  imageUrl?: string;
}

export interface TodoItemProps {
  id: number;
  name: string;
  completed: boolean;
  onToggleComplete: (id: number, isCompleted: boolean) => void;
  onViewDetails?: (id: number) => void;
  isDetailPage?: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  name,
  completed,
  onToggleComplete,
  onViewDetails,
  isDetailPage = false,
}) => {
  return (
    <div
      className="todo-item flex items-center p-2 mb-2 border-b"
      style={{
        backgroundImage: `url('/Property 1=${completed ? "Variant2" : "Default"}.png')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%", // 상세 페이지에서 배경 이미지 크기 고정
        backgroundPosition: "center",
        padding: "8px",
        display: "flex",
        justifyContent: "space-between", // 텍스트와 이미지 간격을 맞추기
        alignItems: "center", // 텍스트와 이미지를 수직 정렬
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
    </div>
  );
};

export default TodoItem;
