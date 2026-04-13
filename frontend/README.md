# Hostel Lite - Frontend

The modern, responsive web interface for the **Hostel Management System**. Built with React, Vite, and Tailwind CSS, featuring a beautiful UI powered by Shadcn UI and clean animations via Framer Motion.

## 🚀 Features

- **Responsive Dashboards**: Specialized views for Students, Staff, and Admins.
- **Real-time Notifications**: Keep track of room assignments, fee statuses, and more.
- **Complaint Management**: Log and track maintenance or service issues effortlessly.
- **Fee Payments**: Integrated payment tracking (Razorpay support).
- **Secure Authentication**: Protected routes with persistent JWT-based session management.
- **Dark Mode**: Sleek dark-themed interface by default.

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context API
- **Networking**: [Axios](https://axios-http.com/)
- **Routing**: [React Router Dom](https://reactrouter.com/)

## 📦 Installation & Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root of the `frontend` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api/v1
   VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
   ```

4. **Run in development mode**:
   ```bash
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

## 📂 Project Structure

- `src/components`: Reusable UI components.
- `src/context`: Authentication and global state management.
- `src/layouts`: Dashboard layouts for different user roles.
- `src/lib`: API clients and utility functions.
- `src/pages`: Page-level components.
- `src/assets`: Static assets, images, and fonts.

## 👨‍💻 Contributing

1. Fork the project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---
Built with ❤️ for **Hostel Management System**
