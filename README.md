# Todo App

**Next.js**와 **Tailwind CSS**로 만든 간단한 Todo 애플리케이션입니다. 사용자는 할 일 목록을 관리할 수 있으며, 할 일을 추가, 수정, 삭제하고 이미지 파일을 업로드할 수 있는 기능을 제공합니다.

## 주요 기능

- **할 일 추가**: 새 할 일을 추가하고 메모를 작성할 수 있습니다.
- **할 일 수정**: 이미 작성된 할 일의 메모를 수정할 수 있습니다.
- **할 일 삭제**: 할 일을 삭제할 수 있습니다.
- **이미지 업로드**: 각 할 일에 이미지를 업로드하고 미리보기를 제공합니다.
- **반응형 디자인**: 모바일, 태블릿, 데스크탑에서 모두 잘 동작합니다.

## 기술 스택

- **Next.js**: 서버 사이드 렌더링을 지원하는 React 프레임워크.
- **Tailwind CSS**: 유틸리티 클래스 기반의 CSS 프레임워크.
- **React**: 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리.
- **TypeScript**: 정적 타입을 지원하는 JavaScript의 상위 집합.
- **API**: 할 일 항목을 위한 CRUD 연산을 처리하는 서비스 계층.

## 실행 방법
1. 리포지토리 클론:
```bash
   git clone https://github.com/your-username/todo-app.git
   cd todo-app
```
2. 의존성 설치:
```bash
    yarn install
```
3. 개발 서버 시작:
```bash
    yarn dev
```
4. 브라우저에서 아래 주소로 접속:
    http://localhost:3000

## 기능 상세 설명
### 할 일 추가
사용자는 새로운 할 일을 추가하고 완료 여부, 메모를 작성할 수 있습니다. 
### 할 일 수정
 할 일이 생성된 후, 사용자는 해당 항목의 메모를 수정할 수 있습니다. 텍스트를 수정하고 저장하면 변경 사항이 서버에 반영됩니다.

### 할 일 삭제
사용자는 할 일 항목을 삭제할 수 있으며, 삭제된 항목은 목록에서 제거됩니다.

### 이미지 업로드
각 할 일 항목에는 이미지 업로드 기능이 있습니다. 이미지를 클릭하여 파일을 업로드할 수 있으며, 업로드된 이미지는 미리보기로 표시됩니다. 사용자는 언제든지 이미지를 변경할 수 있습니다.

## 폴더 구조
```bash
/pages
  /todo
    [itemId].tsx     // 할 일 상세 페이지
/components
  /Header.tsx        // 헤더 컴포넌트
  /TodoItem.tsx      // 할 일 항목 컴포넌트
/services
  /todoService.ts    // API와의 연동을 위한 서비스 함수들
/utils
  /apiClient.ts      // API 클라이언트 설정
/styles
  /globals.css       // 전역 스타일
  ```