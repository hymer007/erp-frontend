import React from 'react'
import ReactDOM from 'react-dom/client'

function App() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form>
          <input type="text" placeholder="Username" className="w-full mb-3 p-2 border rounded" />
          <input type="password" placeholder="Password" className="w-full mb-3 p-2 border rounded" />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
        </form>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)