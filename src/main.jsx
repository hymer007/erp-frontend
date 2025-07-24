
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

const App = () => (
  <div className="p-4">
    <h1 className="text-2xl font-bold text-center text-blue-600">ERP Dashboard</h1>
    <p className="text-center mt-4">Login erfolgreich. Willkommen im ERP-System!</p>
  </div>
)

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
