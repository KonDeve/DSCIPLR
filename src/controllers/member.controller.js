import { MemberModel } from '@/models';

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

  async registerMember(memberData) {
    if (!memberData.name) {
      throw new Error('Member name is required.');
    }
    const { data, error } = await MemberModel.create(memberData);
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
