// src/services/todoService.ts
import apiClient from '../utils/apiClient';
import { tenantId } from '../utils/apiClient';

//export const tenantId = process.env.NEXT_PUBLIC_TENANT_ID; // 테넌트 ID

/**
 * Todo 항목 등록 API
 * @param todoData - 등록할 Todo 데이터 (title, description 등)
 */
export const createTodoItem = async (tenantId: string, todoData: { name: string }) => {
    try {
      const response = await apiClient.post(`/${tenantId}/items`, todoData); // 백틱 사용
      //console.log('추가된 todo: ',response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating todo item:', error);
      throw error;
    }
  };

/**
 * Todo 항목 목록 조회 API
 * @param page - 현재 페이지 번호 (기본값: 1)
 * @param pageSize - 한 페이지 당 보여줄 항목 수 (기본값: 10)
 */
export const fetchTodoItems = async (tenantId: string, page = 1, pageSize = 10) => {
  const response = await apiClient.get(`/${tenantId}/items`, {
    params: { page, pageSize },
  });
  //console.log('todo 목록: ',response.data);
  return response.data;
};

/**
 * Todo 항목 상세 조회 API
 * @param tenantId - 조회할 테넌트 ID
 * @param itemId - 조회할 Todo 항목의 ID
 */
export const fetchTodoItemById = async (tenantId: string, itemId: number) => {
  if (!tenantId || !itemId) {
    throw new Error('Invalid tenantId or itemId');
  }
  try {
    const response = await apiClient.get(`/${tenantId}/items/${itemId}`);
    //console.log('상세 조회:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch todo item details:', error);
    throw error;
  }
};

 /**
  * Todo 항목 수정 API(상태 변경)
  * @param itemId - 수정할 Todo 항목의 ID
  * @param updatedData - 수정할 데이터 (title, status, iscomplete, memo 등)
  */
 export const updateTodoItem = async (
  itemId: number,  // itemId는 숫자여야 합니다.
  updatedData: { isCompleted?: boolean, memo?: string, name?: string, imageUrl?: string }
) => {
  try {
    const response = await apiClient.patch(`/${tenantId}/items/${itemId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating todo item:", error.response?.data || error.message);
    throw error;  // 오류를 호출자에게 전달
  }
};

/**
 * Todo 항목 삭제 API
 * @param itemId - 이미지를 업로드할 Todo 항목의 ID
 */
export const deleteTodoItem = async (
  tenantId: string,
  itemId: number) => {
  const response = await apiClient.delete(`/${tenantId}/items/${itemId}`);
  return response.data;
};

/**
 * 이미지 업로드 API
 * @param file - 업로드할 이미지 파일
 */
export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);  // 'file' 필드에 실제 이미지 파일 추가

  try {
    // axios로 이미지 파일을 업로드
    const response = await apiClient.post(`/${tenantId}/images/upload`, formData);

    if (response.status === 200) {
      return response.data.url;  // 성공적으로 URL을 반환
    } else {
      throw new Error(`Failed to upload image. Server responded with status ${response.status}`);
    }
  } catch (error: any) {
    console.error('Error uploading image:', error.response.data);  // 서버 오류 메시지
  };
};
