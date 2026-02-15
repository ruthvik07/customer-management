# Customer Management App

A full-stack customer management application with JWT authentication, built with Spring Boot, React, and PostgreSQL — all containerized with Docker.

---

## Tech Stack

**Backend**
- Java 21 + Spring Boot 3.5
- Spring Security + JWT
- Spring Data JPA + Hibernate
- PostgreSQL

**Frontend**
- React + TypeScript
- Tailwind CSS
- Axios
- React Router

**Infrastructure**
- Docker + Docker Compose
- Nginx

---

## Features

- Admin login with JWT authentication
- Protected routes
- Add, view, edit and delete customers
- Persistent database storage
- Fully containerized

---

## Prerequisites

- Docker Desktop
- Java 21
- Node.js 20+
- Maven

---

## Running the App

### Option A — Full Docker (recommended)

1. Clone the repository:
```bash
git clone <your-repo-url>
cd customer-management
```

2. Create a `.env` file in the root folder:
```
SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/customerManagement
SPRING_DATASOURCE_USERNAME=user
SPRING_DATASOURCE_PASSWORD=password
JWT_SECRET=your-super-secret-key-that-is-long-enough
JWT_EXPIRATION=86400000
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

3. Start everything:
```bash
docker compose up --build
```

4. Open the app:
- Frontend: http://localhost:3000
- Backend: http://localhost:8080

---

### Option B — Local Development

1. Start the database:
```bash
docker compose up db -d
```

2. Run the backend:
```bash
cd backend
mvn spring-boot:run
```

3. Run the frontend:
```bash
cd frontend
npm install
npm run dev
```

4. Open the app:
- Frontend: http://localhost:5173
- Backend: http://localhost:8080

---

## Default Admin Credentials
```
Username: admin
Password: admin123
```

---

## Project Structure
```
customer-management/
├── backend/
│   ├── src/main/java/com/customermanagement/backend/
│   │   ├── config/
│   │   ├── controller/
│   │   ├── dto/
│   │   ├── entity/
│   │   ├── exception/
│   │   ├── filter/
│   │   ├── repository/
│   │   ├── service/
│   │   └── util/
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   └── pages/
│   ├── nginx.conf
│   └── Dockerfile
└── docker-compose.yml
```

---

## API Endpoints

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | /api/auth/login | Public | Login and get JWT token |
| GET | /api/customers | Protected | Get all customers |
| GET | /api/customers/{id} | Protected | Get one customer |
| POST | /api/customers | Protected | Create customer |
| PUT | /api/customers/{id} | Protected | Update customer |
| DELETE | /api/customers/{id} | Protected | Delete customer |

---

## Docker Commands
```bash
# Start everything
docker compose up --build

# Start in background
docker compose up -d

# Stop everything
docker compose down

# Stop and wipe database
docker compose down -v

# View logs
docker compose logs backend
docker compose logs frontend
```
