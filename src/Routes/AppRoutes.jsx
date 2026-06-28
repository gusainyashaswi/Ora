import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import StopWatch from "../Pages/StopWatch/StopWatch";
import Timer from "../Pages/Timer/Timer";
import WorldClock from "../Pages/WorldClock/WorldClock";
import Todo from "../Pages/Todo/Todo";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import PublicRoute from "../components/PublicRoute/PublicRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/stopwatch" element={<StopWatch />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/worldclock" element={<WorldClock />} />
        <Route path="/todo" element={<Todo />} />
      </Route>

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;