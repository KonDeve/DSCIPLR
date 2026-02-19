export default function FinancialReports() {
  return (
    <div>
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-6">Financial Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">Monthly Summary</h3>
          <p className="text-sm text-gray-500">
            Donations, expenses, and net income for the current month.
          </p>
          <button className="mt-4 text-sm text-[#137fec] hover:underline cursor-pointer">
            Generate Report
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">Annual Summary</h3>
          <p className="text-sm text-gray-500">
            Year-to-date financial overview and trends.
          </p>
          <button className="mt-4 text-sm text-[#137fec] hover:underline cursor-pointer">
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
}
