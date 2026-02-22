export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Super Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Total Admins</p>
          <p className="text-3xl font-semibold text-indigo-600 mt-1">—</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="text-3xl font-semibold text-indigo-600 mt-1">—</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-500">System Status</p>
          <p className="text-3xl font-semibold text-green-600 mt-1">Active</p>
        </div>
      </div>
    </div>
  );
}
