import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./view/pages/Dashboard";
import { AppLayout } from "./view/layout/AppLayout";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
