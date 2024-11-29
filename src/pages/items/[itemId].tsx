// pages/items/[itemId].tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchTodoItemById } from '../../services/todoService';
import { tenantId } from '../../utils/apiClient';


const TodoDetailPage = () => {
  const [todo, setTodo] = useState(null);
  const router = useRouter();
  const { itemId } = router.query; // URL에서 itemId 추출

  useEffect(() => {
    if (itemId && router.isReady) {  // router.isReady를 사용하여 query 값이 준비되었는지 확인
      const loadTodoDetails = async () => {
        try {
          const todoDetails = await fetchTodoItemById(tenantId, itemId);
          setTodo(todoDetails);
        } catch (error) {
          console.error('Failed to fetch todo details:', error);
        }
      };
      loadTodoDetails();
    }
  }, [itemId, router.isReady]);  // itemId와 router.isReady를 의존성으로 추가

  if (!todo) return <p>Loading...</p>;

  return (
    <div>
      <h3>Todo Details</h3>
      <p>Title: {todo.name}</p>
      <p>Memo: {todo.memo}</p>
      <p>Status: {todo.isCompleted ? 'Completed' : 'Not Completed'}</p>
      <img src={todo.imageUrl} alt="Todo Image" />
      {/* 수정, 삭제 버튼 추가 */}
    </div>
  );
};

export default TodoDetailPage;
