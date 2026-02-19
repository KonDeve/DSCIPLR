export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Pastor Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Upcoming Sermons</p>
          <p className="text-3xl font-bold text-indigo-600 mt-1">—</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Prayer Requests</p>
          <p className="text-3xl font-bold text-indigo-600 mt-1">—</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Active Members</p>
          <p className="text-3xl font-bold text-indigo-600 mt-1">—</p>
        </div>
      </div>
    </div>
  );
}
