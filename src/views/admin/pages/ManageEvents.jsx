import { useState, useEffect } from 'react';
import { EventController } from '@/controllers';
import Loader from '@/views/shared/components/Loader';
import { formatDate } from '@/utils/helpers';

export default function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await EventController.getAllEvents();
        setEvents(data);
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
        <h1 className="text-2xl font-bold text-gray-800">Manage Events</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors cursor-pointer">
          + Create Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5"
          >
            <h3 className="font-semibold text-gray-800">{event.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{formatDate(event.event_date)}</p>
            <p className="text-sm text-gray-600 mt-2">{event.description || 'No description.'}</p>
            <div className="mt-4 flex gap-3">
              <button className="text-sm text-indigo-600 hover:underline cursor-pointer">Edit</button>
              <button className="text-sm text-red-500 hover:underline cursor-pointer">Delete</button>
            </div>
          </div>
        ))}
        {events.length === 0 && (
          <p className="text-gray-400 col-span-full text-center py-8">No events found.</p>
        )}
      </div>
    </div>
  );
}
