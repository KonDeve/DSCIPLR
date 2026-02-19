import { supabase } from '@/config/supabaseClient';

export const EventModel = {
  async getAll() {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('event_date', { ascending: true });
    return { data, error };
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();
    return { data, error };
  },

  async create(eventData) {
    const { data, error } = await supabase.from('events').insert(eventData).select();
    return { data, error };
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from('events')
      .update(updates)
      .eq('id', id)
      .select();
    return { data, error };
  },

  async delete(id) {
    const { data, error } = await supabase.from('events').delete().eq('id', id);
    return { data, error };
  },

  async getUpcoming() {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .gte('event_date', new Date().toISOString())
      .order('event_date', { ascending: true });
    return { data, error };
  },
};
