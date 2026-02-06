import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const SERVER_URL = import.meta.env.SERVER_URL;

export default function ProtectedRoutes() {
  const [isLoading, setIsLoading] = useState(true);
  const nav = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    verifyUser();
  }, []);

  async function verifyUser() {
    try {
      const userVerificationResponse = await axios.get(
        `${SERVER_URL}/auth/verify`,
        { withCredentials: true },
      );

      setAuthenticated(true);
    } catch (error) {
      console.log(error);

      setAuthenticated(false);
      nav("/login");
    }
    setIsLoading(false);
  }
  if (isLoading) {
    return (
      <div>
        <h1>Loading.....</h1>
      </div>
    );
  }
  if (!authenticated) {
    return null;
  }
  return <Outlet />;
}
