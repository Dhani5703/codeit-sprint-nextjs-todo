// pages/items/[itemId].tsx

import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const ItemDetail = () => {
  const router = useRouter();
  const { itemId } = router.query;
  const [todo, setTodo] = useState<Todo | null>(null);
  const [updatedText, setUpdatedText] = useState('');

  useEffect(() => {
    if (itemId) {
      // 할 일 데이터 가져오기 (여기서는 임시 데이터 사용)
      const fetchedTodo = { id: Number(itemId), text: 'Next.js 배우기', completed: false };
      setTodo(fetchedTodo);
      setUpdatedText(fetchedTodo.text);
    }
  }, [itemId]);

  const handleUpdate = () => {
    if (todo) {
      // 할 일 수정 (API 연동 부분)
      setTodo({ ...todo, text: updatedText });
      // 수정된 텍스트를 서버에 저장하는 API 요청 추가 예정
      router.push('/'); // 수정 후 목록 페이지로 이동
    }
  };

  if (!todo) return <div>Loading...</div>;

  return (
    <div className="todo-detail-container">
      <h2>할 일 상세</h2>
      <input
        type="text"
        value={updatedText}
        onChange={(e) => setUpdatedText(e.target.value)} // 텍스트 변경 시 상태 업데이트
      />
      <button onClick={handleUpdate}>수정 완료</button>
      <button onClick={() => router.push('/')}>취소</button>
    </div>
  );
};

export default ItemDetail;
