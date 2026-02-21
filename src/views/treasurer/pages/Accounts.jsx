import { useState } from 'react';
import {
  Download,
  PlusCircle,
  Layers,
  Landmark,
  Pencil,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

/* ── Static demo data ─────────────────────────────────────── */

const categories = [
  {
    id: 'ACC-001',
    name: 'Tithes & Offerings',
    code: 'ACC-001',
    description: 'General congregation contributions and weekly offerings',
    accumulated: '₱245,300.00',
    allocation: '100% (Unrestricted)',
    allocationPercent: 100,
    allocationColor: 'bg-[#137fec]',
    status: 'Active',
  },
  {
    id: 'ACC-002',
    name: 'Building Fund',
    code: 'ACC-002',
    description: 'Dedicated funds for sanctuary expansion and renovation',
    accumulated: '₱120,450.50',
    allocation: '₱150,000.00 Goal',
    allocationPercent: 80,
    allocationColor: 'bg-orange-500',
    status: 'Active',
  },
  {
    id: 'ACC-003',
    name: 'Community Outreach',
    code: 'ACC-003',
    description: 'Missions, food bank programs, and local aid',
    accumulated: '₱45,200.00',
    allocation: '₱50,000.00 / yr',
    allocationPercent: 90,
    allocationColor: 'bg-blue-500',
    status: 'Active',
  },
  {
    id: 'ACC-004',
    name: 'Maintenance & Utilities',
    code: 'ACC-004',
    description: 'Operational costs for church facility management',
    accumulated: '₱32,140.00',
    allocation: '₱40,000.00 / yr',
    allocationPercent: 80,
    allocationColor: 'bg-[#137fec]',
    status: 'Active',
  },
  {
    id: 'ACC-005',
    name: 'Disaster Relief 2022',
    code: 'ACC-005',
    description: 'Historical fund for hurricane relief efforts',
    accumulated: '₱9,799.95',
    allocation: 'N/A (Closed)',
    allocationPercent: 0,
    allocationColor: 'bg-gray-400',
    status: 'Inactive',
  },
];

const summaryCards = [
  {
    label: 'Total Active Categories',
    value: '18 Categories',
    note: 'Managed across 4 main ledger groups',
    noteColor: 'text-[#137fec]',
    icon: <Layers className="w-5 h-5 text-[#137fec]" />,
  },
  {
    label: 'Total Fund Balance',
    value: '₱452,890.45',
    note: 'Combined aggregate across all active funds',
    noteColor: 'text-green-500',
    icon: <Landmark className="w-5 h-5 text-green-500" />,
  },
];

/* ── Component ────────────────────────────────────────────── */

export default function Accounts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* ── Header Row ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900">Account Categories</h1>
          <p className="text-sm text-gray-500">Manage church financial funds and budget allocations</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-lg bg-white border border-gray-200 px-4 py-2.5 text-sm font-bold hover:bg-gray-50 transition-colors cursor-pointer">
            <Download className="w-4 h-4" /> Export Report
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-[#137fec] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#1170d4] transition-colors cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" /> New Category
          </button>
        </div>
      </div>

      {/* ── Summary Cards ──────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl bg-white p-5 sm:p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">{card.label}</h3>
              {card.icon}
            </div>
            <p className="text-lg sm:text-xl lg:text-2xl font-black text-gray-900">{card.value}</p>
            <p className={`text-[10px] font-bold mt-1 ${card.noteColor}`}>{card.note}</p>
          </div>
        ))}
      </div>

      {/* ── Categories Table ───────────────────────────────── */}
      <div className="rounded-xl bg-white border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">
                <th className="px-6 py-4">Category Name</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Total Accumulated</th>
                <th className="px-6 py-4">Budget Allocation</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-200">
              {categories.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* Category Name */}
                  <td className="px-6 py-4">
                    <div className="font-bold text-[#137fec]">{row.name}</div>
                    <div className="text-[10px] text-gray-500">Code: {row.code}</div>
                  </td>

                  {/* Description */}
                  <td className="px-6 py-4">
                    <div className="max-w-xs truncate text-gray-500">{row.description}</div>
                  </td>

                  {/* Total Accumulated */}
                  <td className="px-6 py-4 font-black">{row.accumulated}</td>

                  {/* Budget Allocation */}
                  <td className="px-6 py-4 text-gray-500">
                    {row.allocationPercent > 0 ? (
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold">{row.allocation}</span>
                        <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`${row.allocationColor} h-full`}
                            style={{ width: `${row.allocationPercent}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs">{row.allocation}</span>
                    )}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    {row.status === 'Active' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700">
                        <span className="h-1 w-1 rounded-full bg-green-500" /> Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-gray-100 text-gray-700">
                        <span className="h-1 w-1 rounded-full bg-gray-500" /> Inactive
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-500 hover:text-[#137fec] transition-colors cursor-pointer">
                      <Pencil className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-xs text-gray-500">Showing 1–5 of 18 categories</p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1 text-xs font-bold rounded border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Previous
            </button>
            {[1, 2].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 text-xs font-bold rounded cursor-pointer transition-colors ${
                  currentPage === page
                    ? 'bg-[#137fec] text-white'
                    : 'border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1 text-xs font-bold rounded border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* ── New Category Modal ───────────────────────────────── */}
      {modalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-white rounded-xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-gray-50">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-[#137fec]" />
                <h3 className="text-base sm:text-lg font-bold">New Category</h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form className="p-6 space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Category Name */}
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider" htmlFor="catName">
                    Category Name
                  </label>
                  <input
                    id="catName"
                    type="text"
                    placeholder="Enter category name..."
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#137fec] focus:border-[#137fec]"
                  />
                </div>

                {/* Category Code */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider" htmlFor="catCode">
                    Category Code
                  </label>
                  <input
                    id="catCode"
                    type="text"
                    placeholder="e.g., ACC-006"
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#137fec] focus:border-[#137fec]"
                  />
                </div>

                {/* Status */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider" htmlFor="catStatus">
                    Status
                  </label>
                  <select
                    id="catStatus"
                    defaultValue="active"
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#137fec] focus:border-[#137fec]"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                {/* Budget Allocation */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider" htmlFor="catBudget">
                    Budget Allocation
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-bold">₱</span>
                    <input
                      id="catBudget"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="w-full rounded-lg border border-gray-200 bg-white pl-8 pr-4 py-2.5 text-sm font-bold focus:ring-2 focus:ring-[#137fec] focus:border-[#137fec]"
                    />
                  </div>
                </div>

                {/* Allocation Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider" htmlFor="catAllocType">
                    Allocation Type
                  </label>
                  <select
                    id="catAllocType"
                    defaultValue=""
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#137fec] focus:border-[#137fec]"
                  >
                    <option disabled value="">Select type</option>
                    <option value="unrestricted">Unrestricted</option>
                    <option value="goal">Goal-based</option>
                    <option value="annual">Annual Budget</option>
                  </select>
                </div>

                {/* Description — full width */}
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider" htmlFor="catDesc">
                    Description
                  </label>
                  <textarea
                    id="catDesc"
                    placeholder="Describe the purpose of this category..."
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#137fec] focus:border-[#137fec] min-h-[80px]"
                  />
                </div>
              </div>
            </form>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setModalOpen(false)}
                className="px-5 py-2.5 rounded-lg border border-gray-200 text-sm font-bold hover:bg-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button className="px-6 py-2.5 rounded-lg bg-[#137fec] text-white text-sm font-bold hover:bg-blue-600 transition-colors cursor-pointer">
                Save Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
