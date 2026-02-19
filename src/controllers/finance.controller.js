import { FinanceModel } from '@/models';

export const FinanceController = {
  async getDonations() {
    const { data, error } = await FinanceModel.getDonations();
    if (error) throw new Error(error.message);
    return data;
  },

  async getExpenses() {
    const { data, error } = await FinanceModel.getExpenses();
    if (error) throw new Error(error.message);
    return data;
  },

  async recordDonation(donationData) {
    if (!donationData.amount || donationData.amount <= 0) {
      throw new Error('A valid donation amount is required.');
    }
    const { data, error } = await FinanceModel.createDonation(donationData);
    if (error) throw new Error(error.message);
    return data;
  },

  async recordExpense(expenseData) {
    if (!expenseData.amount || expenseData.amount <= 0) {
      throw new Error('A valid expense amount is required.');
    }
    const { data, error } = await FinanceModel.createExpense(expenseData);
    if (error) throw new Error(error.message);
    return data;
  },

  async getFinancialSummary() {
    return await FinanceModel.getFinancialSummary();
  },
};
