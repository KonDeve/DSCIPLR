import { EventModel } from '@/models';

export const EventController = {
  async getAllEvents() {
    const { data, error } = await EventModel.getAll();
    if (error) throw new Error(error.message);
    return data;
  },

  async getEventById(id) {
    const { data, error } = await EventModel.getById(id);
    if (error) throw new Error(error.message);
    return data;
  },

  async createEvent(eventData) {
    if (!eventData.title || !eventData.event_date) {
      throw new Error('Event title and date are required.');
    }
    const { data, error } = await EventModel.create(eventData);
    if (error) throw new Error(error.message);
    return data;
  },

  async updateEvent(id, updates) {
    const { data, error } = await EventModel.update(id, updates);
    if (error) throw new Error(error.message);
    return data;
  },

  async deleteEvent(id) {
    const { data, error } = await EventModel.delete(id);
    if (error) throw new Error(error.message);
    return data;
  },

  async getUpcomingEvents() {
    const { data, error } = await EventModel.getUpcoming();
    if (error) throw new Error(error.message);
    return data;
  },
};
