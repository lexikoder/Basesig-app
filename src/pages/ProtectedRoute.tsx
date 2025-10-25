import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";



interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/verify`, {
          withCredentials: true, // crucial for sending cookies
        });
        if (res.data.valid) setIsAuth(true);
      } catch {
        setIsAuth(false);
      }
    };
    verifyUser();
  }, []);

  if (isAuth === null) return <div>Loading...</div>;

  return isAuth ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;


