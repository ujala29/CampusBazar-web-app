# 🎓 CampusBazar – Buy & Sell on Campus

CampusBazar is a MERN-based web application designed for campus students to **buy & sell second-hand products** like electronics, study material, clothes, cosmetics, and more.

---

## 🚀 Features Implemented (Till Now)

### ✅ Authentication Module
- Signup with **college email verification** (`@nitj.ac.in`)
- OTP is sent to user email for verification
- Secure Login/Logout using **JWT + HttpOnly Cookie**

### ✅ Product Module
- Add Product (title, actual price, selling price, description, image upload, category selection)
- Categories implemented:
  - Electronics
  - Study Material
  - Clothes
  - Cosmetics
  - Others
- All Products page
- Product details page with option to proceed for ordering

### ✅ User Module
- Profile page (user details shown)
- Order page shows all placed orders (for logged in user)

### ✅ Search Functionality
- Search bar on Navbar
- Search by keyword (title/category)

### ✅ Protected Routes (Frontend)
- User **must be logged in** to:
  - View All Products
  - Add Product
  - View Orders
  - Access Profile

If not logged-in → redirected to login page.

---

## 🛠 Tech Stack

| Tech         | Used For |
|--------------|----------|
| **MongoDB**  | Database |
| **Express.js** | Backend API |
| **React.js** | Frontend UI |
| **Node.js**  | Server |
| **JWT + Cookies** | Auth & protected routes |
| **Axios**     | API requests |


---

## 📌 Installation & Setup

### 1️⃣ Clone Repo
```sh
git clone <repo-url>
cd CampusBazar-web-app
