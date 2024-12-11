import axios from 'axios';

// 이미지 업로드 전용 axios 인스턴스
const uploadApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // 이미지 업로드 기본 URL
  headers: {
    'Content-Type': 'multipart/form-data', // 이미지 업로드 시 사용
  },
});

export default uploadApiClient;
