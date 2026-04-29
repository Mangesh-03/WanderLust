# 🌍 WanderLust – Travel Listing Platform

WanderLust is a full-stack web application inspired by Airbnb that allows users to explore, create, and manage travel listings. It provides features like user authentication, listing management, reviews, and interactive maps.

---

## 🚀 Features

* 🔐 User Authentication (Signup/Login/Logout)
* 🏡 Create, Edit, Delete Listings
* 📸 Image Upload (Cloud storage support)
* ⭐ Review & Rating System
* 🗺️ Location Mapping (Geocoding API integration)
* 🔎 Search & Filter Listings
* 📱 Responsive Design

---

## 🛠️ Tech Stack

### Frontend

* HTML, CSS, JavaScript
* EJS (Embedded JavaScript Templates)
* Bootstrap

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Mongoose ODM)

### Other Tools

* Cloudinary (Image Storage)
* Map API (Geolocation)
* JWT / Session-based Authentication
* Multer (File Uploads)

---

## 📂 Project Structure

```
WanderLust/
│
├── models/          # Mongoose schemas
├── routes/          # Express routes
├── controllers/     # Business logic
├── views/           # EJS templates
├── public/          # Static files (CSS, JS)
├── utils/           # Helper functions
├── middleware/      # Custom middleware
├── app.js           # Entry point
└── package.json
```

---

## ⚙️ Installation

1. Clone the repository:

```
git clone https://github.com/your-username/wanderlust.git
```

2. Navigate into the project:

```
cd wanderlust
```

3. Install dependencies:

```
npm install
```

4. Create a `.env` file and add:

```
MONGO_URI=your_mongodb_connection
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_key
CLOUDINARY_SECRET=your_secret
MAP_API=your_map_api_key
SESSION_SECRET=your_secret
```

5. Start the server:

```
npm start
```

---

## 🌐 Usage

* Visit: `http://localhost:3000`
* Register a new account
* Add new travel listings
* Explore listings created by others
* Leave reviews and ratings

---

## 📸 Screenshots

(Add screenshots of your UI here)

---

## 🔒 Authentication Flow

* User registers with email/password
* Password is hashed using bcrypt
* Session used for maintaining login state
* Protected routes require authentication

---

## 🧠 Key Concepts Used

* MVC Architecture
* RESTful Routing
* Middleware Handling
* Error Handling & Validation
* Async/Await & Promises

---

## ⚠️ Common Issues & Fixes

* **MongoDB connection error** → Check URI & network access
* **Image upload not working** → Verify Cloudinary config
* **Map not loading** → Ensure API key is valid

---

## 📌 Future Improvements

* Wishlist functionality
* Booking system
* Payment integration
* Advanced filters (price, location, ratings)
* Admin dashboard

---

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you would like to change.

---

## 📄 License

This project is licensed under the MIT License.

---

## Project Running : 

https://wanderlust-m5tr.onrender.com

---

## 👨‍💻 Author

**Mangesh Bedre**

---

