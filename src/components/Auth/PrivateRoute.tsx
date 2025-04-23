import { useAppSelector } from "@/hooks/useApp";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { data } = useAppSelector((state) => state.auth);
  return data ? <>{children}</> : <Navigate to="/" replace />;
}