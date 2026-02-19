import { supabase } from '@/config/supabaseClient';

export const MemberModel = {
  async getAll() {
    const { data, error } = await supabase.from('members').select('*');
    return { data, error };
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('id', id)
      .single();
    return { data, error };
  },

  async create(memberData) {
    const { data, error } = await supabase.from('members').insert(memberData).select();
    return { data, error };
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from('members')
      .update(updates)
      .eq('id', id)
      .select();
    return { data, error };
  },

  async delete(id) {
    const { data, error } = await supabase.from('members').delete().eq('id', id);
    return { data, error };
  },

  async search(query) {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .ilike('name', `%${query}%`);
    return { data, error };
  },
};
