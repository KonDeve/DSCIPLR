export default function Reports() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-800 mb-2">Membership Report</h3>
          <p className="text-sm text-gray-500">
            Overview of member registrations, demographics, and activity.
          </p>
          <button className="mt-4 text-sm text-indigo-600 hover:underline cursor-pointer">
            Generate Report
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-800 mb-2">Event Report</h3>
          <p className="text-sm text-gray-500">
            Summary of events, attendance, and participation trends.
          </p>
          <button className="mt-4 text-sm text-indigo-600 hover:underline cursor-pointer">
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
}
