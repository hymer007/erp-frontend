import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, createContext, useContext } from "react";
import { User, LogOut, Home, Package, Users, FileText, Settings, BarChart3 } from "lucide-react";

// Types
interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

// Auth Context
const AuthContext = createContext<AuthContextType | null>(null);

// Auth Provider
function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on app start
    const token = localStorage.getItem("access_token");
    if (token) {
      // In a real app, validate token with backend
      setUser({
        id: "1",
        username: "admin",
        email: "admin@erp.com",
        role: "administrator"
      });
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call - replace with real backend call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (username === "admin" && password === "admin") {
        const mockUser = {
          id: "1",
          username: "admin",
          email: "admin@erp.com",
          role: "administrator"
        };
        
        localStorage.setItem("access_token", "mock-jwt-token");
        setUser(mockUser);
        setIsLoading(false);
        return true;
      } else {
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth context
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

// Protected Route Component
function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return user ? <>{children}</> : <Navigate to="/login" />;
}

// Login Page
function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    const success = await login(username, password);
    if (!success) {
      setError("Ungültige Anmeldedaten. Versuchen Sie admin/admin");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ERP System</h1>
          <p className="text-gray-600">Melden Sie sich an, um fortzufahren</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Benutzername
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Benutzername eingeben"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Passwort
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Passwort eingeben"
              required
            />
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Anmeldung läuft..." : "Anmelden"}
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Demo-Zugangsdaten:</p>
          <p className="font-mono">admin / admin</p>
        </div>
      </div>
    </div>
  );
}

// Navigation Component
function Navigation() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold text-gray-900">ERP System</h1>
            <div className="hidden md:flex space-x-4">
              <NavLink icon={<Home size={18} />} text="Dashboard" />
              <NavLink icon={<Package size={18} />} text="Inventar" />
              <NavLink icon={<Users size={18} />} text="Kunden" />
              <NavLink icon={<FileText size={18} />} text="Rechnungen" />
              <NavLink icon={<BarChart3 size={18} />} text="Berichte" />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User size={18} className="text-gray-600" />
              <span className="text-sm text-gray-700">{user?.username}</span>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <LogOut size={18} />
              <span className="text-sm">Abmelden</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <a
      href="#"
      className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
    >
      {icon}
      <span>{text}</span>
    </a>
  );
}

// Dashboard Component
function Dashboard() {
  const { user } = useAuth();

  const modules = [
    { title: "Inventarverwaltung", icon: <Package size={24} />, color: "bg-blue-500", count: "1,234" },
    { title: "Kundenverwaltung", icon: <Users size={24} />, color: "bg-green-500", count: "456" },
    { title: "Rechnungswesen", icon: <FileText size={24} />, color: "bg-yellow-500", count: "89" },
    { title: "Berichte", icon: <BarChart3 size={24} />, color: "bg-purple-500", count: "12" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto py-6 px-4">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Willkommen zurück, {user?.username}!
          </h2>
          <p className="text-gray-600">Hier ist Ihr ERP-Dashboard</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {modules.map((module, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className={`${module.color} text-white p-3 rounded-lg`}>
                  {module.icon}
                </div>
                <span className="text-2xl font-bold text-gray-900">{module.count}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{module.title}</h3>
              <p className="text-sm text-gray-600">Klicken Sie hier zum Öffnen</p>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Letzte Aktivitäten</h3>
            <div className="space-y-3">
              {[
                "Neue Rechnung #2024-001 erstellt",
                "Kunde Max Mustermann hinzugefügt", 
                "Lagerbestand für Artikel A001 aktualisiert",
                "Monatsbericht generiert"
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">{activity}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Schnellzugriff</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { text: "Neue Rechnung", icon: <FileText size={16} /> },
                { text: "Kunde hinzufügen", icon: <Users size={16} /> },
                { text: "Lager prüfen", icon: <Package size={16} /> },
                { text: "Einstellungen", icon: <Settings size={16} /> }
              ].map((item, index) => (
                <button
                  key={index}
                  className="flex items-center space-x-2 p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                >
                  {item.icon}
                  <span className="text-sm">{item.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;