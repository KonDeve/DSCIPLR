export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Total Members</p>
          <p className="text-3xl font-semibold text-indigo-600 mt-1">—</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Upcoming Events</p>
          <p className="text-3xl font-semibold text-indigo-600 mt-1">—</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-500">New Registrations</p>
          <p className="text-3xl font-semibold text-indigo-600 mt-1">—</p>
        </div>
      </div>
    </div>
  );
}
