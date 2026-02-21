import { supabase } from '@/config/supabaseClient';

/**
 * Columns: id, member_id, member_type ('member'|'guest'),
 *   full_name, date_of_birth, gender, marital_status,
 *   phone, email, address,
 *   membership_date, department,
 *   profile_image_url, id_document_url,
 *   status ('active'|'inactive'|'deceased'|'transferred'),
 *   created_by, created_at, updated_at
 */
export const MemberModel = {
  async getAll() {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .order('created_at', { ascending: false });
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

  async getByMemberId(memberId) {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('member_id', memberId)
      .single();
    return { data, error };
  },

  async getByType(memberType) {
    // memberType: 'member' | 'guest'
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('member_type', memberType)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async getByStatus(status) {
    // status: 'active' | 'inactive' | 'deceased' | 'transferred'
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async create(memberData) {
    const { data, error } = await supabase
      .from('members')
      .insert(memberData)
      .select();
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
    const { data, error } = await supabase
      .from('members')
      .delete()
      .eq('id', id);
    return { data, error };
  },

  async search(query) {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .or(`full_name.ilike.%${query}%,email.ilike.%${query}%,member_id.ilike.%${query}%`)
      .order('created_at', { ascending: false });
    return { data, error };
  },
};
