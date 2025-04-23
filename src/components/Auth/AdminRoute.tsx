import { useAppSelector } from "@/hooks/useApp";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }: { children: React.ReactNode }) {
    const { data } = useAppSelector((state) => state.user);
    return data.role === "ADMIN" ? <>{children}</> : <Navigate to="/" replace />;
  }