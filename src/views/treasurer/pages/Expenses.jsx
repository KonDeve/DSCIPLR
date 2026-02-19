import { useState, useEffect } from 'react';
import { FinanceModel } from '@/models';
import { formatCurrency, formatDate } from '@/utils/helpers';
import Loader from '@/views/shared/components/Loader';

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await FinanceModel.getExpenses();
        setExpenses(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Expenses</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors cursor-pointer">
          + Record Expense
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 text-gray-500 font-medium">Date</th>
              <th className="text-left px-6 py-3 text-gray-500 font-medium">Description</th>
              <th className="text-left px-6 py-3 text-gray-500 font-medium">Amount</th>
              <th className="text-left px-6 py-3 text-gray-500 font-medium">Category</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((e) => (
              <tr key={e.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-600">{formatDate(e.created_at)}</td>
                <td className="px-6 py-4 text-gray-800">{e.description || '—'}</td>
                <td className="px-6 py-4 font-medium text-red-500">
                  {formatCurrency(e.amount)}
                </td>
                <td className="px-6 py-4 text-gray-600">{e.category || 'General'}</td>
              </tr>
            ))}
            {expenses.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                  No expenses recorded.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
