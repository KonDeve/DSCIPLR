import { supabase } from '@/config/supabaseClient';

export const UserModel = {
  async getAll() {
    const { data, error } = await supabase.from('users').select('*');
    return { data, error };
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    return { data, error };
  },

  async create(userData) {
    const { data, error } = await supabase.from('users').insert(userData).select();
    return { data, error };
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select();
    return { data, error };
  },

  async delete(id) {
    const { data, error } = await supabase.from('users').delete().eq('id', id);
    return { data, error };
  },
};
