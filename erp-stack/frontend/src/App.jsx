import { useState } from "react";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (e) => {
    e.preventDefault();
    // Hier könnte ein echter API-Call stattfinden
    setIsLoggedIn(true);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      {!isLoggedIn ? (
        <form onSubmit={login} className="space-y-4">
          <h1 className="text-2xl font-bold">ERP Login</h1>
          <input className="border p-2 w-full" placeholder="Benutzername" required />
          <input className="border p-2 w-full" type="password" placeholder="Passwort" required />
          <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Login</button>
        </form>
      ) : (
        <div>
          <h2 className="text-xl font-bold mb-4">ERP Kategorien</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Mietverträge</li>
            <li>Objektverwaltung</li>
            <li>Dokumentenmanagement</li>
            <li>Kommunikation</li>
          </ul>
        </div>
      )}
    </div>
  );
}
