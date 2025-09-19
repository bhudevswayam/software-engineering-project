import { createContext, useContext, useState, useEffect } from "react";
import { getProfile } from "../api/auth"; // API call to /users/profile

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    setUser(null);
    setLoading(false);
    return;
  }

  try {
    const profileData = await getProfile(token);
    // Preserve the token in state so it doesn't get lost
    setUser({ ...profileData, token });
  } catch (err) {
    console.error(err);
    setUser(null);
    localStorage.removeItem("token");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
    } else {
      loadUser(); // optional: fetch from /users/profile
    }
  }, []);
  
  const loginUser = (data) => {
    localStorage.setItem("token", data.token);
    setUser(data);
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
