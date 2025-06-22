
export default function DashboardHeader() {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-green-900 text-white p-4 rounded-b-2xl shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-bold">🌀 Tasko</h1>
          <nav className="hidden md:flex space-x-6 text-green-300 font-semibold">
            <a href="#" className="hover:text-white transition">Task List</a>
            <a href="#" className="hover:text-white transition">Spin</a>
          </nav>
        </div>

        <div className="flex items-center space-x-2">
          <img
            src="https://via.placeholder.com/32"
            alt="User"
            className="w-8 h-8 rounded-full border-2 border-white"
          />
          <span className="font-medium">Thomas M.</span>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg text-green-300">Hi Thomas</h2>
        <h1 className="text-3xl font-bold mt-1">Welcome to Dashboard</h1>
      </div>
    </div>
  );
}
