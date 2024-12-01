// components/TodoItem.tsx
import React from 'react';

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggleComplete: (id: string, isCompleted: boolean) => void;
  onViewDetails?: (id: string) => void;
  isDetailPage?: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, completed, onToggleComplete, onViewDetails, isDetailPage = false }) => {
  const toggleCompletion = () => {
    onToggleComplete(id, completed);
  };

  return (
    <div
      className="todo-item flex items-center gap-2 p-2 mb-2 border-b"
      style={{
        backgroundImage: `url('/Property 1=${completed ? 'Variant2' : 'Default'}.png')`, // 완료 상태에 따라 배경 이미지 변경
        backgroundRepeat: 'no-repeat', // 배경 이미지 반복 금지
        backgroundSize: 'contain', // 이미지 비율 유지하며 크기 조정
        height: '40px', // 항목 높이 설정
        paddingLeft: '20px',
        display: 'flex', // 내용 정렬
        alignItems: 'center', // 수직 정렬
        marginBottom: '16px',
      }}
    >
      <img
        src={`/Property 1=${completed ? 'Done' : 'Todo'}.png`} // 완료 상태에 따라 다른 이미지
        alt={completed ? 'Done' : 'Todo'}
        onClick={() => onToggleComplete(id, completed)} // 이미지 클릭 시 완료 상태 변경
        className="cursor-pointer w-6 h-6" // 이미지 크기 설정
        style={{
          padding: '10px',
        }}
      />
      {/* 텍스트 부분, isDetailPage가 false일 때만 onClick을 활성화 */}
      <span
        onClick={isDetailPage ? undefined : () => onViewDetails?.(id)} // 상세 페이지에서는 클릭 안됨
        className={`flex-1 ${completed ? 'line-through text-gray-400' : ''} cursor-pointer`} // 완료 상태에 따라 스타일 변경
        style={{
          pointerEvents: isDetailPage ? 'none' : 'auto', // 클릭 비활성화
        }}
      >
        {text}
      </span>
    </div>
  );
};

export default TodoItem;
