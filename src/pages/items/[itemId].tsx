import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchTodoItemById, updateTodoItem, deleteTodoItem } from '../../services/todoService';
import { tenantId } from '../../utils/apiClient';

const TodoDetailPage = () => {
  const [todo, setTodo] = useState(null);
  const [editedMemo, setEditedMemo] = useState<string>('');
  const router = useRouter();
  const { itemId } = router.query;

  // 상세 항목 데이터 로드
  useEffect(() => {
    if (!itemId) return;

    const loadTodo = async () => {
      try {
        const todoDetails = await fetchTodoItemById(tenantId, Number(itemId));
        setTodo(todoDetails);
        setEditedMemo(todoDetails.memo);
      } catch (error) {
        console.error('Failed to fetch todo item details:', error);
      }
    };

    loadTodo();
  }, [itemId]);

  // 완료 여부 토글
  const toggleCompletion = async () => {
    try {
      const updatedTodo = await updateTodoItem(Number(itemId), { isCompleted: !todo.isCompleted });
      setTodo(updatedTodo);
      alert('완료 상태가 업데이트되었습니다.');
    } catch (error) {
      console.error('Failed to update completion status:', error);
      alert('완료 상태 수정에 실패했습니다.');
    }
  };

  // 상세 페이지에서 메모 항목을 수정하는 부분
  const handleUpdate = async () => {
    if (!todo) return;
    
    try {
      const updatedItem = await updateTodoItem(Number(itemId), {memo: editedMemo});
      setTodo(updatedItem);  // 수정된 항목을 todo 상태에 반영
      //console.log("메모 수정됨: ", updatedItem);  // 수정된 메모를 콘솔에서 확인
      alert('메모가 수정되었습니다.');
    } catch (error) {
      console.error("Error updating todo item:", error);
      alert('메모 수정에 실패했습니다.');
    }
  };

const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  setEditedMemo(e.target.value);  // 메모를 변경할 때마다 memo 상태 업데이트
};

  // 삭제
  const handleDelete = async () => {
    if (!itemId) return;

    try {
      await deleteTodoItem(tenantId, Number(itemId));
      alert('할 일이 삭제되었습니다.');
      router.push('/'); // 목록 페이지로 이동
    } catch (error) {
      console.error('Failed to delete todo item:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  if (!todo) return <div>Loading...</div>;

  return (
    <div>
      <h1>Todo 상세 보기</h1>
      <div>
        <label>
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={toggleCompletion}
          />
          {todo.name}
        </label>
      </div>
      <div>
        <strong>메모:</strong>
        <textarea
          id="memo"
          value={editedMemo || ''}
          onChange={handleMemoChange}
          rows={4}
          cols={40}
          style={{ display: 'block', marginTop: '8px' }}
        />
        <button onClick={handleUpdate} style={{ marginTop: '8px' }}>
          수정 완료
        </button>
      </div>
      <button onClick={handleDelete} style={{ marginTop: '16px', color: 'red' }}>
        삭제하기
      </button>
    </div>
  );
};

export default TodoDetailPage;
