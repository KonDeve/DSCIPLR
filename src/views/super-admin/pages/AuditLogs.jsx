export default function AuditLogs() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Audit Logs</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 text-gray-500 font-medium">Timestamp</th>
              <th className="text-left px-6 py-3 text-gray-500 font-medium">User</th>
              <th className="text-left px-6 py-3 text-gray-500 font-medium">Action</th>
              <th className="text-left px-6 py-3 text-gray-500 font-medium">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                No audit logs available.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
