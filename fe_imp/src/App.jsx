import { getToken } from "./utils/utils";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import PasswordForm from "./pages/PasswordForm";
import Home from "./pages/Home";
import { ViewSchedule } from "./pages/ViewSchedule";
import { User } from "./pages/User";
import { Drop } from "./pages/Drop";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RequireAuth>{<Home />}</RequireAuth>} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/passchange"
          element={<RequireAuth>{<PasswordForm />}</RequireAuth>}
        />
        <Route path="/home" element={<RequireAuth>{<Home />}</RequireAuth>} />
        <Route path="/user" element={<RequireAuth>{<User />}</RequireAuth>} />
        <Route path="/drop" element={<Drop />} />
        <Route
          path="/viewsch"
          element={<RequireAuth>{<ViewSchedule />}</RequireAuth>}
        />
      </Routes>
    </>
  );
}

function RequireAuth({ children }) {
  const token = getToken();
  console.log("token", token);
  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}
