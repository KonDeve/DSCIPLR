import { UserModel } from '@/models';

export const UserController = {
  async getAllUsers() {
    const { data, error } = await UserModel.getAll();
    if (error) throw new Error(error.message);
    return data;
  },

  async getUserById(id) {
    const { data, error } = await UserModel.getById(id);
    if (error) throw new Error(error.message);
    return data;
  },

  async createUser(userData) {
    if (!userData.email || !userData.role) {
      throw new Error('Email and role are required.');
    }
    const { data, error } = await UserModel.create(userData);
    if (error) throw new Error(error.message);
    return data;
  },

  async updateUser(id, updates) {
    const { data, error } = await UserModel.update(id, updates);
    if (error) throw new Error(error.message);
    return data;
  },

  async deleteUser(id) {
    const { data, error } = await UserModel.delete(id);
    if (error) throw new Error(error.message);
    return data;
  },
};
