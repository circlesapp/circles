export enum Permission {
  ACCESS_POST_CREATE = 1, // 글 생성 권한
  ACCESS_POST_READ = 2, // 글 읽기 권한
  ACCESS_POST_DELETE = 3, // 글 삭제 권한

  ACCESS_AWARDS_CREATE = 11, // 수상 생성 권한
  ACCESS_AWARDS_READ = 12, // 수상 읽기 권한
  ACCESS_AWARDS_DELETE = 13, // 수상 삭제 권한

  ACCESS_BUDGETS_CREATE = 21, // 에산서 생성 권한
  ACCESS_BUDGETS_READ = 22, // 예산서 읽기 권한
  ACCESS_BUDGETS_DELETE = 23, // 예산서 삭제 권한

  ACCESS_APPLYCANT_ACCEPT = 31, // 지원서 수락 권한
  ACCESS_APPLYCANT_READ = 32, // 지원서 읽기 권한
  ACCESS_APPLYCANT_DELETE = 32, // 지원서 삭제 권한

  ACCESS_CALENDAR_CREATE = 41, // 캘린더 생성 권한
  ACCESS_CALENDAR_READ = 42, // 캘린더 읽기 권한
  ACCESS_CALENDAR_DELETE = 42, // 캘린더 삭제 권한
}
