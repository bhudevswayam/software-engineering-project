# Service Booking Backend

A **Node.js + Express + MongoDB** backend for a service marketplace app.  
Supports **multi-tenant architecture** with three profile types:  

- **Super Admin** → Manages all businesses and users  
- **Admin/Business** → Registers businesses and manages their services  
- **User** → Books services from businesses  

---

## 🚀 Setup

### 1. Clone & Install
```bash
git clone <repo-url>
cd backend
npm install
```

### 2. Environment
Create a `.env` file:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/service-booking
JWT_SECRET=your_jwt_secret
```

### 3. Run
Development (with nodemon):
```bash
npm run dev
```

Production:
```bash
npm start
```

---

## 📂 Project Structure
```
service-booking-backend/
│-- models/        # MongoDB Schemas
│-- routes/        # Express Routes
│-- middleware/    # Auth middleware
│-- server.js      # App entrypoint
│-- package.json
│-- .env
```

---

## 🔑 Authentication & Roles
Each user has:
- `role` → `superadmin | business | user`
- `tenantId` → Used to separate tenants

JWT is used for authentication.  
Pass token in headers:
```
Authorization: Bearer <token>
```

---

## 📌 API Endpoints

### Auth
| Method | Endpoint        | Description |
|--------|----------------|-------------|
| POST   | `/api/auth/register` | Register a new user (role: user, business, or superadmin) |
| POST   | `/api/auth/login`    | Login and get JWT token |

**Register body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "role": "user",
  "tenantId": "tenant123"
}
```

---

### Business
| Method | Endpoint              | Description |
|--------|-----------------------|-------------|
| POST   | `/api/business`       | Create a new business (business role only) |
| GET    | `/api/business`       | Get all businesses |
| GET    | `/api/business/:id`   | Get business details |

---

### Services
| Method | Endpoint                  | Description |
|--------|---------------------------|-------------|
| POST   | `/api/services`           | Create a service (business role only) |
| GET    | `/api/services`           | Get all services |
| GET    | `/api/services/:id`       | Get service details |

**Service body:**
```json
{
  "name": "House Cleaning",
  "description": "Full home cleaning service",
  "price": 100,
  "businessId": "BUSINESS_ID"
}
```

---

### Bookings
| Method | Endpoint                | Description |
|--------|-------------------------|-------------|
| POST   | `/api/bookings`         | Book a service (user only) |
| GET    | `/api/bookings`         | Get all bookings for logged-in user or business |

**Booking body:**
```json
{
  "serviceId": "SERVICE_ID",
  "userId": "USER_ID",
  "date": "2025-09-18"
}
```

---

## 🛡️ Role Permissions
- **Super Admin** → Can view all businesses & users  
- **Business Admin** → Can manage their own business & services  
- **User** → Can browse and book services  

---

✅ You’re ready to go!
