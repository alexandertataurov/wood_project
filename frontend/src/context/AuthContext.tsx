import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AuthContextType {
  user: { email: string } | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      fetchUser(token);
    }
  }, []);

  const fetchUser = async (token: string) => {
    try {
      const response = await fetch("http://localhost:8000/auth/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setUser(await response.json());
      } else {
        logout();
      }
    } catch {
      logout();
    }
  };

  const login = async (token: string) => {
    localStorage.setItem("access_token", token);
  
    // Ждём загрузки данных профиля перед обновлением состояния
    try {
      const response = await fetch("http://localhost:8000/auth/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        setUser(await response.json());
      }
    } catch {
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
