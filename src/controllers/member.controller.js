import { supabase } from '@/config/supabaseClient';
import { MemberModel } from '@/models';

/** Generates a unique member_id string, e.g. "MEM-83042" or "GST-51209" */
function generateMemberId(type) {
  const prefix = type === 'guest' ? 'GST' : 'MEM';
  const num = Math.floor(10000 + Math.random() * 89999);
  return `${prefix}-${num}`;
}

export const MemberController = {
  async getAllMembers() {
    const { data, error } = await MemberModel.getAll();
    if (error) throw new Error(error.message);
    return data;
  },

  async getMemberById(id) {
    const { data, error } = await MemberModel.getById(id);
    if (error) throw new Error(error.message);
    return data;
  },

  async getMemberByMemberId(memberId) {
    const { data, error } = await MemberModel.getByMemberId(memberId);
    if (error) throw new Error(error.message);
    return data;
  },

  async getMembersByType(type) {
    const { data, error } = await MemberModel.getByType(type);
    if (error) throw new Error(error.message);
    return data;
  },

  async getMembersByStatus(status) {
    const { data, error } = await MemberModel.getByStatus(status);
    if (error) throw new Error(error.message);
    return data;
  },

  /**
   * Upload a file to Supabase Storage and return its public URL.
   * Requires a 'member-files' bucket in Supabase Storage (public or with signed URLs).
   */
  async uploadFile(filePath, file) {
    const { error } = await supabase.storage
      .from('member-files')
      .upload(filePath, file, { upsert: true });
    if (error) throw new Error(error.message);
    const { data: urlData } = supabase.storage
      .from('member-files')
      .getPublicUrl(filePath);
    return urlData.publicUrl;
  },

  /**
   * Registers a new member/guest.
   * @param {object} formData  - fields from the form (matches members table columns)
   * @param {File|null} profileFile - File object for profile photo
   * @param {File|null} idFile      - File object for ID document
   */
  async registerMember(formData, profileFile = null, idFile = null) {
    if (!formData.full_name?.trim()) {
      throw new Error('Full name is required.');
    }
    if (!formData.member_type) {
      throw new Error('Registration type is required.');
    }

    let profile_image_url = null;
    let id_document_url = null;

    if (profileFile) {
      const path = `profiles/${Date.now()}_${profileFile.name}`;
      profile_image_url = await this.uploadFile(path, profileFile);
    }
    if (idFile) {
      const path = `ids/${Date.now()}_${idFile.name}`;
      id_document_url = await this.uploadFile(path, idFile);
    }

    const payload = {
      ...formData,
      member_id: generateMemberId(formData.member_type),
      profile_image_url,
      id_document_url,
      // coerce empty strings to null for optional date fields
      date_of_birth: formData.date_of_birth || null,
      membership_date: formData.membership_date || null,
      gender: formData.gender || null,
      department: formData.department || null,
    };

    const { data, error } = await MemberModel.create(payload);
    if (error) throw new Error(error.message);
    return data;
  },

  async updateMember(id, updates) {
    const { data, error } = await MemberModel.update(id, updates);
    if (error) throw new Error(error.message);
    return data;
  },

  async deleteMember(id) {
    const { data, error } = await MemberModel.delete(id);
    if (error) throw new Error(error.message);
    return data;
  },

  async searchMembers(query) {
    const { data, error } = await MemberModel.search(query);
    if (error) throw new Error(error.message);
    return data;
  },
};
