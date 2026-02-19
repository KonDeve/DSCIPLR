export default function Announcements() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">Announcements</h1>
        <button className="bg-[#137fec] text-white px-4 py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-[#1170d4] transition-colors cursor-pointer">
          + New Announcement
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <p className="text-gray-400 text-center py-8 text-sm sm:text-base">No announcements posted.</p>
      </div>
    </div>
  );
}
