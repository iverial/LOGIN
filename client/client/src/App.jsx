import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/authContext";

import TasksPage from "./pages/TasksPage";
import TaskFormPage from "./pages/TaskFormPage"
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./routes.jsx";
import { TaskProvider } from "./context/TasksContext";
import { Navbar } from "./components/NavBar";

function App() {
  return (
    <AuthProvider>
    <TaskProvider>
      <BrowserRouter>
        <main className="container content-container mx-auto px-10 md:px-0">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/add-task" element={<TaskFormPage />} />
              <Route path="/tasks/:id" element={<TaskFormPage />} />
              <Route path="/profile" element={<ProfilePage/>} />
            </Route>
          </Routes>
        </main>
      </BrowserRouter>
    </TaskProvider>
  </AuthProvider>
  );
}

export default App;
