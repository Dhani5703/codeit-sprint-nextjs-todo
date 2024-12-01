import React from 'react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  onToggleComplete: (id: string, isCompleted: boolean) => void;
  onViewDetails: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggleComplete, onViewDetails }) => {
  return (
    <div className="todo-list p-4">
      {todos.map((todo) => (
        <p
          key={todo.id}
          className="todo-item flex justify-between items-center mb-2 p-2 border-b"
          style={{
            backgroundImage: `url('/Property 1=${todo.completed ? 'Variant2' : 'Default'}.png')`, // 완료 상태에 따라 배경 이미지 변경
            backgroundRepeat: "no-repeat", // 배경 이미지 반복 금지
            backgroundSize: "contain", // 이미지 비율 유지하며 크기 조정
            height: "40px", // 항목 높이 설정
            paddingLeft: "20px", // 텍스트와 이미지 간격
            display: "flex", // 내용 정렬
            alignItems: "center", // 수직 정렬
          }}
        >
          <img
            src={`/Property 1=${todo.completed ? "Done" : "Todo"}.png`} // 완료 상태에 따라 다른 이미지
            alt={todo.completed ? "Done" : "Todo"}
            onClick={() => onToggleComplete(todo.id, todo.completed)} // 완료 상태 변경 함수 호출
            className="mr-2 cursor-pointer" // 이미지 클릭 가능하도록
          />
          <span
            onClick={() => onViewDetails(todo.id)} // 클릭 시 상세 페이지로 이동
            className={`cursor-pointer ${todo.completed ? 'line-through' : ''}`} // 완료 상태에 따라 스타일 변경
          >
            {todo.text}
          </span>
        </p>
      ))}
    </div>
  );
};

export default TodoList;
