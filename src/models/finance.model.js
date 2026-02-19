import { supabase } from '@/config/supabaseClient';

export const FinanceModel = {
  async getDonations() {
    const { data, error } = await supabase
      .from('donations')
      .select('*')
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async getExpenses() {
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async createDonation(donationData) {
    const { data, error } = await supabase
      .from('donations')
      .insert(donationData)
      .select();
    return { data, error };
  },

  async createExpense(expenseData) {
    const { data, error } = await supabase
      .from('expenses')
      .insert(expenseData)
      .select();
    return { data, error };
  },

  async getFinancialSummary() {
    const [donations, expenses] = await Promise.all([
      supabase.from('donations').select('amount'),
      supabase.from('expenses').select('amount'),
    ]);

    const totalDonations = (donations.data || []).reduce((sum, d) => sum + d.amount, 0);
    const totalExpenses = (expenses.data || []).reduce((sum, e) => sum + e.amount, 0);

    return {
      totalDonations,
      totalExpenses,
      balance: totalDonations - totalExpenses,
    };
  },
};
