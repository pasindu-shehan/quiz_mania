import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import http from "../../api/axiosInstance";

export default function ProtectedRoutes() {
  const [isLoading, setIsLoading] = useState(true);
  const nav = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    verifyUser();
  }, []);

  async function verifyUser() {
    try {
      const userVerificationResponse = await http.get(`/auth/verify`);
      if (userVerificationResponse) {
        setAuthenticated(true);
      } else {
        nav("/login");
      }
    } catch (error) {
      console.log(error);

      setAuthenticated(false);
      nav("/login");
    }
    setIsLoading(false);
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!authenticated) {
    return null;
  }

  return <Outlet />;
}
