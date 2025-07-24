export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">ERP Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-xl shadow">Kategorie 1</div>
        <div className="p-4 bg-white rounded-xl shadow">Kategorie 2</div>
        <div className="p-4 bg-white rounded-xl shadow">Kategorie 3</div>
        <div className="p-4 bg-white rounded-xl shadow">Kategorie 4</div>
      </div>
    </div>
  );
}