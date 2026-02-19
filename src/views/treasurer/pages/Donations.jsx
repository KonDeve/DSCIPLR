import { useState, useEffect } from 'react';
import { FinanceModel } from '@/models';
import { formatCurrency, formatDate } from '@/utils/helpers';
import Loader from '@/views/shared/components/Loader';

export default function Donations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await FinanceModel.getDonations();
        setDonations(data || []);
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
        <h1 className="text-2xl font-bold text-gray-800">Donations</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors cursor-pointer">
          + Record Donation
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 text-gray-500 font-medium">Date</th>
              <th className="text-left px-6 py-3 text-gray-500 font-medium">Donor</th>
              <th className="text-left px-6 py-3 text-gray-500 font-medium">Amount</th>
              <th className="text-left px-6 py-3 text-gray-500 font-medium">Type</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((d) => (
              <tr key={d.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-600">{formatDate(d.created_at)}</td>
                <td className="px-6 py-4 text-gray-800">{d.donor_name || '—'}</td>
                <td className="px-6 py-4 font-medium text-green-600">
                  {formatCurrency(d.amount)}
                </td>
                <td className="px-6 py-4 text-gray-600">{d.type || 'General'}</td>
              </tr>
            ))}
            {donations.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                  No donations recorded.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
