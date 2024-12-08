// import React from "react";
// import Image from "next/image";
// import { Todo } from "../types/types";
// import TodoList from "./TodoList";

// interface TodoSectionProps {
//   title: string;
//   todos: Todo[];
//   onToggleComplete: (itemId: number, isCompleted: boolean) => void;
//   onViewDetails: (itemId: number) => void;
// }

// const TodoSection: React.FC<TodoSectionProps> = ({
//   title,
//   todos,
//   onToggleComplete,
//   onViewDetails,
// }) => {
//   return (
//     <div className="flex-1 rounded-lg shadow-md p-6 flex flex-col">
//       <div className="flex items-center h-10">
//         <Image
//           src={`/${title.toLowerCase()}.png`}
//           alt={title}
//           width={100}
//           height={36}
//         />
//       </div>
//       {todos.length === 0 ? (
//         <div className="flex flex-col items-center justify-center mt-8">
//           <Image
//             src={`/Type=${title}, Size=Large.png`}
//             alt={`${title} Empty`}
//             width={150}
//             height={150}
//           />
//           <p className="text-state-400 mt-4 text-center">
//             {title === "TODO"
//               ? "할 일이 없어요. TODO를 새롭게 추가해주세요!"
//               : "아직 다 한 일이 없어요. 해야 할 일을 체크해보세요!"}
//           </p>
//         </div>
//       ) : (
//         <TodoList
//           todos={todos}
//           onToggleComplete={onToggleComplete}
//           onViewDetails={onViewDetails}
//         />
//       )}
//     </div>
//   );
// };

// export default TodoSection;
