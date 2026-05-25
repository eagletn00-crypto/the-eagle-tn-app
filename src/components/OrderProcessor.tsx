import { supabase } from './supabaseClient'; // تأكد أن لديك هذا الملف

export const OrderProcessor = {
  // دالة لجلب الطلبات النشطة
  async getActiveOrders() {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('status', 'pending');
      
    if (error) throw error;
    return data;
  },

  // دالة لمعالجة حالة الطلب
  async updateOrderStatus(orderId: string, status: string) {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);
      
    if (error) throw error;
    return data;
  }
};
