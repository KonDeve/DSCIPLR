import { useState, useEffect } from 'react';
import { FinanceModel } from '@/models';
import { formatCurrency } from '@/utils/helpers';

export default function Dashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await FinanceModel.getFinancialSummary();
        setSummary(data);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Treasurer Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Total Donations</p>
          <p className="text-3xl font-bold text-green-600 mt-1">
            {summary ? formatCurrency(summary.totalDonations) : '—'}
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Total Expenses</p>
          <p className="text-3xl font-bold text-red-500 mt-1">
            {summary ? formatCurrency(summary.totalExpenses) : '—'}
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Balance</p>
          <p className="text-3xl font-bold text-indigo-600 mt-1">
            {summary ? formatCurrency(summary.balance) : '—'}
          </p>
        </div>
      </div>
    </div>
  );
}
