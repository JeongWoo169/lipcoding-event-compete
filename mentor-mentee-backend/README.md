# Mentor-Mentee Matching App Backend

이 프로젝트는 Java 17+, Spring Boot 3.x, Gradle, springdoc-openapi, H2, JPA 기반의 멘토-멘티 매칭 백엔드입니다.

## 주요 기술 스택
- Java 17 이상
- Spring Boot 3.x
- Gradle
- springdoc-openapi (Swagger UI, OpenAPI 3.x)
- Spring Security (JWT 인증)
- Spring Data JPA
- H2 Database (로컬 개발용)

## 실행 방법

```sh
./gradlew bootRun
```

- 서버: http://localhost:8080
- Swagger UI: http://localhost:8080/swagger-ui.html
- OpenAPI 문서: http://localhost:8080/v3/api-docs

## 참고
- 모든 API 엔드포인트는 `/api` 하위에 위치합니다.
- API 명세 및 요구사항을 반드시 준수해야 합니다.
