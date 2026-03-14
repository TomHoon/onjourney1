# Docker 배포 절차

## 개요

로컬 환경에서 Docker 이미지를 생성한 뒤 Docker Hub에 업로드하고,
운영 서버에서 이미지를 내려받아 배포하는 방식의 배포 절차이다.

---

## 1. 로컬 Dockerfile로 이미지 생성

프로젝트 루트에 있는 `Dockerfile`을 이용해 Docker 이미지를 생성한다.

```bash
docker build -t <dockerhub-id>/<image-name>:<tag> .
```

예시

```bash
docker build -t tomhoon/photo-print:latest .
```

---

## 2. 로컬 Docker 로그인

Docker Hub에 이미지를 업로드하기 위해 로그인한다.

```bash
docker login
```

로그인 후 Docker Hub 계정 정보를 입력한다.

---

## 3. 로컬 Docker 이미지 Docker Hub에 업로드

생성한 이미지를 Docker Hub에 push 한다.

```bash
docker push <dockerhub-id>/<image-name>:<tag>
```

예시

```bash
docker push tomhoon/photo-print:latest
```

---

## 4. 운영 배포 환경 Docker 로그인

운영 서버에서 Docker Hub에 로그인한다.

```bash
docker login
```

---

## 5. 운영 배포 환경 Docker 이미지 Pull

Docker Hub에 업로드된 이미지를 운영 서버에서 다운로드한다.

```bash
docker pull <dockerhub-id>/<image-name>:<tag>
```

예시

```bash
docker pull tomhoon/photo-print:latest
```

---

## 6. Deploy 실행

다운로드한 이미지를 이용하여 컨테이너를 실행한다.

```bash
docker run -d \
  -p 3000:3000 \
  --name photo-print \
  <dockerhub-id>/<image-name>:<tag>
```

예시

```bash
docker run -d -p 3000:3000 --name photo-print tomhoon/photo-print:latest
```

---

## 전체 흐름 요약

```
로컬 개발환경
  ↓
Docker 이미지 build
  ↓
Docker Hub push
  ↓
운영 서버에서 pull
  ↓
컨테이너 실행 (deploy)
```
